#!/usr/bin/env node
// Verifies every question that has an automatic `check` by actually running its code.
// Usage: npm run verify [-- <path-substring> ...]   (filters questions by content file path)
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { allQuestions, inlineCodeLiteral, loadBook } from './lib/content.mjs';
import { RUNNER_VERSION, evalExpressions, normOutput, runDom, runNode, runTsc, squash } from './lib/runner.mjs';
import { ROOT } from './lib/util.mjs';

const CACHE_FILE = path.join(ROOT, 'node_modules', '.cache', 'quiz-book', 'verify-cache.json');
const CONCURRENCY = 6;

function exactlyAnswer(q, matches, detail) {
  const hits = matches.map((m, i) => (m ? i + 1 : 0)).filter(Boolean);
  if (hits.length === 1 && hits[0] === q.answer) return { ok: true };
  let why;
  if (hits.length === 0) why = 'no option matches the real result';
  else if (hits.length > 1) why = `options ${hits.join(', ')} all match the real result`;
  else why = `option ${hits[0]} matches the real result, but answer is ${q.answer}`;
  return { ok: false, message: `${why}\n      real result: ${detail}` };
}

const show = (s) => JSON.stringify(s);

function nodeFiles(q) {
  if (q.files) return { files: q.files, entry: q.entry };
  const entry = q.module ? 'snippet.mjs' : 'snippet.js';
  return { files: { [entry]: q.code }, entry };
}

function withPrelude(q, code) {
  return q.prelude ? `${q.prelude}\n${code}` : code;
}

async function verifyQuestion(q) {
  const check = q.check ?? 'none';
  switch (check) {
    case 'none':
      return { skipped: true };
    case 'output': {
      const { files, entry } = nodeFiles(q);
      const r = await runNode(files, entry);
      return exactlyAnswer(q, q.options.map((o) => normOutput(o.out) === r.output), show(r.output));
    }
    case 'dom-output': {
      const r = await runDom(q);
      return exactlyAnswer(q, q.options.map((o) => normOutput(o.out) === r.output), show(r.output));
    }
    case 'ts-output': {
      const r = await runTsc({ 'snippet.mts': q.code }, { emit: true });
      if (r.errors.length) {
        return { ok: false, message: `tsc reported errors: ${r.errors.map((e) => `line ${e.line} ${e.code} ${e.message}`).join('; ')}` };
      }
      return exactlyAnswer(q, q.options.map((o) => normOutput(o.out) === r.run.output), show(r.run.output));
    }
    case 'value': {
      const [v] = await evalExpressions(q.setup, [q.expr]);
      const lits = q.options.map((o) => o.value ?? inlineCodeLiteral(o.text));
      return exactlyAnswer(q, lits.map((l) => squash(String(l)) === squash(v)), v);
    }
    case 'claims': {
      const vals = await evalExpressions(q.setup, q.options.map((o) => String(o.expr)));
      const want = q.want ?? true;
      const truth = q.options.map((o, i) => squash(o.equals) === squash(vals[i]));
      return exactlyAnswer(
        q,
        truth.map((t) => t === want),
        `want ${want}; ` + q.options.map((o, i) => `[${i + 1}] ${o.expr} => ${vals[i]} (claimed ${o.equals})`).join(' | '),
      );
    }
    case 'error-line': {
      const { files, entry } = nodeFiles(q);
      const r = await runNode(files, entry);
      const actual = r.error ? (q.files ? `${r.error.file}:${r.error.line}` : String(r.error.line)) : '0';
      if (q.errorName && (!r.error || r.error.name !== q.errorName)) {
        return { ok: false, message: `expected ${q.errorName}, got ${r.error ? r.error.name : 'no error'}` };
      }
      return exactlyAnswer(q, q.options.map((o) => String(o.line) === actual), `line ${actual}${r.error ? ` (${r.error.name})` : ''}`);
    }
    case 'option-output': {
      const results = await Promise.all(q.options.map((o) => runNode({ 'snippet.js': withPrelude(q, o.code) }, 'snippet.js')));
      return exactlyAnswer(
        q,
        results.map((r) => r.output === normOutput(q.expect)),
        results.map((r, i) => `[${i + 1}] ${show(r.output)}`).join(' | '),
      );
    }
    case 'option-throws': {
      const results = await Promise.all(q.options.map((o) => runNode({ 'snippet.js': withPrelude(q, o.code) }, 'snippet.js')));
      const want = q.want ?? 'error';
      const res = exactlyAnswer(
        q,
        results.map((r) => (want === 'error' ? !!r.error : !r.error)),
        `want ${want}; ` + results.map((r, i) => `[${i + 1}] ${r.error ? r.error.name : 'ok'}`).join(' | '),
      );
      const err = results[q.answer - 1].error;
      if (res.ok && q.errorName && want === 'error' && err.name !== q.errorName) {
        return { ok: false, message: `answer throws ${err.name}, expected ${q.errorName}` };
      }
      return res;
    }
    case 'tsc-line': {
      const files = q.files ?? { 'snippet.mts': q.code };
      const r = await runTsc(files);
      const lines = [...new Set(r.errors.map((e) => (q.files ? `${e.file}:${e.line}` : String(e.line))))];
      const actual = lines.length === 0 ? '0' : lines.length === 1 ? lines[0] : `MULTIPLE(${lines.join(',')})`;
      const detail = `${actual}; ${r.errors.map((e) => `${e.file}:${e.line} ${e.code} ${e.message}`).join('; ') || 'no errors'}`;
      return exactlyAnswer(q, q.options.map((o) => String(o.line) === actual), detail);
    }
    case 'option-tsc': {
      const results = await Promise.all(q.options.map((o) => runTsc({ 'snippet.mts': withPrelude(q, o.code) })));
      const want = q.want ?? 'error';
      return exactlyAnswer(
        q,
        results.map((r) => (want === 'error' ? r.errors.length > 0 : r.errors.length === 0)),
        `want ${want}; ` +
          results.map((r, i) => `[${i + 1}] ${r.errors.length ? r.errors.map((e) => `${e.code}@${e.line}`).join(',') : 'ok'}`).join(' | '),
      );
    }
    default:
      return { ok: false, message: `unknown check ${check}` };
  }
}

const CACHE_FIELDS = [
  'check', 'code', 'files', 'entry', 'module', 'html', 'events', 'after', 'wait', 'dialogs',
  'expr', 'setup', 'prelude', 'expect', 'want', 'errorName', 'answer', 'options',
];

function cacheKey(q) {
  const job = { v: RUNNER_VERSION, node: process.version };
  for (const f of CACHE_FIELDS) if (q[f] !== undefined) job[f] = q[f];
  return crypto.createHash('sha1').update(JSON.stringify(job)).digest('hex');
}

async function main() {
  const filters = process.argv.slice(2).map((a) => a.replace(/^\.\//, ''));
  const book = loadBook();
  let questions = allQuestions(book);
  let problems = book.problems;
  if (filters.length) {
    questions = questions.filter((q) => filters.some((f) => q.file.includes(f)));
    problems = problems.filter((p) => filters.some((f) => p.includes(f)));
  }
  if (problems.length) {
    console.log(`\nContent validation problems (${problems.length}):`);
    for (const p of problems) console.log(`  ✗ ${p}`);
  }

  let cache = {};
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  } catch {}
  const newCache = {};

  const results = new Array(questions.length);
  let next = 0;
  async function worker() {
    while (next < questions.length) {
      const i = next++;
      const q = questions[i];
      if ((q.check ?? 'none') === 'none') {
        results[i] = { skipped: true };
        continue;
      }
      const key = cacheKey(q);
      if (cache[key]?.ok) {
        results[i] = cache[key];
      } else {
        try {
          results[i] = await verifyQuestion(q);
        } catch (err) {
          results[i] = { ok: false, message: `runner crashed: ${err.stack || err}` };
        }
      }
      if (results[i].ok) newCache[key] = results[i];
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
  // Atomic replace: several authors may run verify at the same time.
  const tmp = `${CACHE_FILE}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify({ ...cache, ...newCache }));
  fs.renameSync(tmp, CACHE_FILE);

  const byCheck = {};
  let failed = 0;
  let manual = 0;
  questions.forEach((q, i) => {
    const check = q.check ?? 'none';
    byCheck[check] = (byCheck[check] || 0) + 1;
    const r = results[i];
    if (r.skipped) {
      if (q.manual) manual++;
      return;
    }
    if (!r.ok) {
      failed++;
      console.log(`  ✗ Q${q.number} ${q.file} #${q.index} [${check}]: ${r.message}`);
    }
  });
  const auto = questions.length - (byCheck.none || 0);
  console.log(
    `\nQuestions: ${questions.length} | auto-verified: ${auto - failed}/${auto} passed | ` +
      `concept (no code): ${(byCheck.none || 0) - manual} | code reviewed manually: ${manual}`,
  );
  console.log('By check:', Object.entries(byCheck).map(([k, v]) => `${k}=${v}`).join(', '));
  if (failed || problems.length) {
    console.log(`\nFAILED: ${failed} verification failure(s), ${problems.length} validation problem(s).`);
    process.exit(1);
  }
  console.log('All checks passed.');
}

main();
