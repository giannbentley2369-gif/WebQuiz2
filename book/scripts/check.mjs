#!/usr/bin/env node
// Completeness report:
//  1. every slide concept in book/sources/concepts.yaml is taught in the lesson of its subtopic
//     (all keywords present; "a|b" means either alternative) and how many are also tested;
//  2. every question in the built HTML has an answer-key entry (and vice versa).
// Usage: npm run check
import fs from 'node:fs';
import path from 'node:path';
import { load } from 'js-yaml';
import { loadBook } from './lib/content.mjs';
import { BOOK_DIR, OUTPUT_DIR, relPath } from './lib/util.mjs';

const norm = (s) =>
  String(s ?? '')
    .toLowerCase()
    .replace(/[\u200c\u200f\u200e]/g, ' ')
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/\s+/g, ' ');

function questionText(q) {
  const parts = [q.stem, q.code, q.html, q.expr, q.explain];
  for (const o of q.options) parts.push(o.text, o.code, o.out, o.expr);
  if (q.files) parts.push(...Object.values(q.files));
  return parts.filter(Boolean).join('\n');
}

const book = loadBook();
let failed = false;
if (book.problems.length) {
  console.log(`Content validation problems: ${book.problems.length} (run npm run verify for details)`);
  failed = true;
}

const subs = new Map();
for (const ch of book.chapters) for (const s of [...ch.subtopics, ...(ch.review ? [ch.review] : [])]) subs.set(s.id, s);

const conceptsFile = path.join(BOOK_DIR, 'sources', 'concepts.yaml');
const concepts = load(fs.readFileSync(conceptsFile, 'utf8'));
const perDeck = {};
const untaught = [];
let tested = 0;
for (const c of concepts) {
  const deck = c.deck || '?';
  perDeck[deck] ??= { total: 0, taught: 0 };
  perDeck[deck].total += 1;
  const s = subs.get(c.subtopic);
  if (!s) {
    untaught.push(`${c.slide}: ${c.concept}  →  subtopic "${c.subtopic}" does not exist`);
    continue;
  }
  const lesson = norm(s.lesson || '');
  const qtext = norm(s.questions.map(questionText).join('\n'));
  const kws = c.keywords || [];
  const missing = kws.filter((k) => !String(k).split('|').some((alt) => lesson.includes(norm(alt))));
  if (missing.length) {
    untaught.push(`${c.slide}: ${c.concept}  →  ${relPath(path.join(BOOK_DIR, '..', s.file))} lesson lacks ${missing.map((m) => `"${m}"`).join(', ')}`);
    continue;
  }
  perDeck[deck].taught += 1;
  if (kws.some((k) => String(k).split('|').some((alt) => qtext.includes(norm(alt))))) tested += 1;
}

console.log('Slide-concept coverage (taught in the lesson of the mapped subtopic):');
for (const [deck, v] of Object.entries(perDeck)) console.log(`  ${deck}: ${v.taught}/${v.total}`);
console.log(`  concepts also appearing in that subtopic's questions: ${tested}/${concepts.length}`);
if (untaught.length) {
  failed = true;
  console.log(`\nNot covered (${untaught.length}):`);
  for (const u of untaught) console.log(`  ✗ ${u}`);
}

const htmlFile = path.join(OUTPUT_DIR, 'WebProgramming_Quiz_Book.html');
if (fs.existsSync(htmlFile)) {
  const html = fs.readFileSync(htmlFile, 'utf8');
  const qs = new Set([...html.matchAll(/<div class="q" id="q(\d+)"/g)].map((m) => m[1]));
  const as = new Set([...html.matchAll(/<div class="ans" id="a(\d+)"/g)].map((m) => m[1]));
  const noAnswer = [...qs].filter((n) => !as.has(n));
  const orphan = [...as].filter((n) => !qs.has(n));
  const expected = book.totalQuestions;
  console.log(`\nAnswer key (built HTML): ${qs.size} questions, ${as.size} answers (content has ${expected}).`);
  if (noAnswer.length || orphan.length || qs.size !== expected) {
    failed = true;
    if (noAnswer.length) console.log(`  ✗ questions without an answer: ${noAnswer.join(', ')}`);
    if (orphan.length) console.log(`  ✗ answers without a question: ${orphan.join(', ')}`);
    if (qs.size !== expected) console.log('  ✗ the HTML is stale; run npm run build');
  }
} else {
  console.log('\n(output HTML not built yet; skipping answer-key cross-check)');
}

const levels = { easy: 0, medium: 0, hard: 0 };
const answers = [0, 0, 0, 0];
for (const s of subs.values()) for (const q of s.questions) {
  levels[q.level] += 1;
  answers[q.answer - 1] += 1;
}
console.log(`\nDifficulty mix: easy ${levels.easy}, medium ${levels.medium}, hard ${levels.hard}`);
console.log(`Answer positions: 1→${answers[0]}, 2→${answers[1]}, 3→${answers[2]}, 4→${answers[3]}`);

if (failed) process.exit(1);
console.log('\nCoverage and answer-key checks passed.');
