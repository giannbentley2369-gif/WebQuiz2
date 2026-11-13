#!/usr/bin/env node
// Builds output/WebProgramming_Quiz_Book.html and output/WebProgramming_Quiz_Book.pdf.
// Usage: npm run build [-- --skip-verify] [-- --html-only]
// Chrome/Chromium is located automatically or via the CHROME_PATH environment variable.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadBook } from './lib/content.mjs';
import { renderBook } from './lib/render.mjs';
import { OUTPUT_DIR, ROOT, fa } from './lib/util.mjs';

const args = new Set(process.argv.slice(2));
const HTML_FILE = path.join(OUTPUT_DIR, 'WebProgramming_Quiz_Book.html');
const PDF_FILE = path.join(OUTPUT_DIR, 'WebProgramming_Quiz_Book.pdf');

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    process.env.PUPPETEER_EXECUTABLE_PATH,
    '/usr/local/bin/google-chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  ];
  return candidates.find((p) => p && fs.existsSync(p));
}

async function destinationPages(pdfFile) {
  const { getDocument } = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const doc = await getDocument({ data: new Uint8Array(fs.readFileSync(pdfFile)), verbosity: 0 }).promise;
  const dests = await doc.getDestinations();
  const pages = {};
  for (const [name, dest] of Object.entries(dests)) {
    if (Array.isArray(dest) && dest[0]) pages[decodeURIComponent(name)] = (await doc.getPageIndex(dest[0])) + 1;
  }
  const numPages = doc.numPages;
  await doc.destroy();
  return { pages, numPages };
}

async function buildPdf() {
  const executablePath = findChrome();
  if (!executablePath) {
    console.error('Chrome/Chromium not found. Set CHROME_PATH to a Chrome or Chromium executable.');
    process.exit(1);
  }
  const { default: puppeteer } = await import('puppeteer-core');
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--font-render-hinting=none', '--disable-dev-shm-usage'],
  });
  try {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(HTML_FILE).href, { waitUntil: 'load', timeout: 0 });
    await page.evaluate(() => document.fonts.ready);
    const pdfOptions = {
      preferCSSPageSize: true,
      printBackground: true,
      outline: true,
      tagged: true,
      timeout: 0,
    };
    const pass1 = path.join(OUTPUT_DIR, '.pass1.pdf');
    console.log('PDF pass 1 (layout)…');
    await page.pdf({ ...pdfOptions, path: pass1 });
    const { pages } = await destinationPages(pass1);
    const targets = await page.$$eval('.toc-page', (els) => els.map((e) => e.dataset.target));
    const missing = targets.filter((t) => !pages[t]);
    if (missing.length) console.warn(`  warning: no page found for TOC targets: ${missing.join(', ')}`);
    const numbers = Object.fromEntries(targets.map((t) => [t, pages[t] ? fa(pages[t]) : '']));
    await page.evaluate((map) => {
      for (const el of document.querySelectorAll('.toc-page')) el.textContent = map[el.dataset.target] ?? '';
    }, numbers);
    console.log('PDF pass 2 (table of contents page numbers)…');
    await page.pdf({ ...pdfOptions, path: PDF_FILE });
    fs.rmSync(pass1, { force: true });
    const final = await destinationPages(PDF_FILE);
    const moved = targets.filter((t) => final.pages[t] !== pages[t]);
    if (moved.length) console.warn(`  warning: TOC targets moved between passes: ${moved.join(', ')}`);
    console.log(`PDF written: ${path.relative(ROOT, PDF_FILE)} (${final.numPages} pages)`);
  } finally {
    await browser.close();
  }
}

async function main() {
  const book = loadBook();
  if (book.problems.length) {
    console.error(`Content validation failed (${book.problems.length} problems):`);
    for (const p of book.problems) console.error(`  ✗ ${p}`);
    process.exit(1);
  }
  if (!args.has('--skip-verify')) {
    console.log('Verifying answers (npm run verify)…');
    const r = spawnSync(process.execPath, [path.join(ROOT, 'book/scripts/verify.mjs')], { stdio: 'inherit' });
    if (r.status !== 0) {
      console.error('Verification failed; fix the content (or pass --skip-verify for a draft build).');
      process.exit(1);
    }
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(HTML_FILE, renderBook(book));
  console.log(`HTML written: ${path.relative(ROOT, HTML_FILE)} (${book.totalQuestions} questions)`);
  if (!args.has('--html-only')) await buildPdf();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
