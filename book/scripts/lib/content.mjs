// Loads, validates and numbers the book content (book/content/**/*.yaml).
import fs from 'node:fs';
import path from 'node:path';
import { load as loadYaml } from 'js-yaml';
import { CONTENT_DIR, LEVELS, relPath } from './util.mjs';

export const CHECKS = new Set([
  'none', // not machine-checkable (concepts, browser-only behaviour); needs `manual` when code is involved
  'output', // run `code` (or `files`) with Node; compare stdout with each option's `out`
  'value', // evaluate `expr` (after hidden `setup`); compare with each option's `value`
  'claims', // each option has `expr` + `equals`; exactly one claim is true (want: true) or false (want: false)
  'error-line', // run with Node; the line that throws (0 = no error) must match the answer option's `line`
  'option-output', // run each option's `code` (after `prelude`); only the answer prints `expect`
  'option-throws', // run each option's `code`; only the answer throws (want: error) / does not throw (want: ok)
  'dom-output', // run `html` + `code` in jsdom (plus `events`); compare console output with `out`
  'tsc-line', // type-check `code` with tsc; the only error line must match the answer option's `line`
  'option-tsc', // type-check each option's `code`; only the answer fails (want: error) / passes (want: ok)
  'ts-output', // compile `code` with tsc (no errors allowed) and run it; compare stdout with `out`
]);

const OPTION_FIELD = {
  output: 'out',
  'dom-output': 'out',
  'ts-output': 'out',
  'error-line': 'line',
  'tsc-line': 'line',
  'option-output': 'code',
  'option-throws': 'code',
  'option-tsc': 'code',
};

export class ContentError extends Error {}

function loadYamlFile(file) {
  const src = fs.readFileSync(file, 'utf8');
  try {
    return loadYaml(src);
  } catch (err) {
    throw new ContentError(`${relPath(file)}: YAML parse error: ${err.message}`);
  }
}

/** Inner text of an option written as a single inline code span, e.g. "`\"51\"`" -> "\"51\"". */
export function inlineCodeLiteral(text) {
  if (typeof text !== 'string') return undefined;
  const m = text.trim().match(/^(`+)([\s\S]*?)\1$/);
  if (!m) return undefined;
  return m[2].replace(/^ ([\s\S]*) $/, '$1');
}

export function joinLines(v) {
  if (v === undefined) return undefined;
  if (Array.isArray(v)) return v.map((x) => String(x)).join('\n');
  return String(v);
}

function normalizeOption(opt) {
  if (typeof opt === 'string' || typeof opt === 'number' || typeof opt === 'boolean' || opt === null) {
    return { text: String(opt) };
  }
  const o = { ...opt };
  if (o.out !== undefined) o.out = joinLines(o.out);
  if (o.text !== undefined) o.text = String(o.text);
  if (o.value !== undefined) o.value = String(o.value);
  if (o.equals !== undefined) o.equals = String(o.equals);
  return o;
}

function validateQuestion(q, where, problems) {
  const p = (msg) => problems.push(`${where}: ${msg}`);
  if (!q || typeof q !== 'object') return p('question must be a mapping');
  if (!LEVELS[q.level]) p(`level must be one of ${Object.keys(LEVELS).join('/')} (got ${q.level})`);
  if (typeof q.stem !== 'string' || !q.stem.trim()) p('stem is required');
  if (!Array.isArray(q.options) || q.options.length !== 4) p('exactly 4 options are required');
  if (!Number.isInteger(q.answer) || q.answer < 1 || q.answer > 4) p(`answer must be 1..4 (got ${q.answer})`);
  if (typeof q.explain !== 'string' || !q.explain.trim()) p('explain is required');
  const check = q.check ?? 'none';
  if (!CHECKS.has(check)) return p(`unknown check "${check}"`);
  if (!Array.isArray(q.options)) return;
  const field = OPTION_FIELD[check];
  if (field) {
    q.options.forEach((o, i) => {
      if (o[field] === undefined) p(`option ${i + 1} needs "${field}" for check ${check}`);
    });
  }
  if (['output', 'error-line', 'tsc-line'].includes(check) && !q.code && !q.files) p(`check ${check} needs code or files`);
  if (check === 'ts-output' && !q.code) p('check ts-output needs code');
  if (check === 'dom-output' && !q.code && !q.html) p('check dom-output needs html and/or code');
  if (check === 'value') {
    if (typeof q.expr !== 'string') p('check value needs expr');
    q.options.forEach((o, i) => {
      if (o.value === undefined && inlineCodeLiteral(o.text) === undefined) {
        p(`option ${i + 1} needs "value" (or text that is a single inline-code literal) for check value`);
      }
    });
  }
  if (check === 'claims') {
    q.options.forEach((o, i) => {
      if (o.expr === undefined || o.equals === undefined) p(`option ${i + 1} needs "expr" and "equals" for check claims`);
    });
    if (q.want !== undefined && typeof q.want !== 'boolean') p('want must be true/false for check claims');
  }
  if (check === 'option-output' && q.expect === undefined) p('check option-output needs expect');
  if (['option-throws', 'option-tsc'].includes(check) && q.want !== undefined && !['error', 'ok'].includes(q.want)) {
    p('want must be "error" or "ok"');
  }
  if (q.files !== undefined) {
    if (!q.files || typeof q.files !== 'object' || Array.isArray(q.files)) p('files must be a mapping of filename -> source');
    else if (!q.entry && ['output', 'error-line'].includes(check)) p('files needs entry (the file to run)');
  }
  const hasCode =
    q.code || q.files || q.html || /```/.test(q.stem || '') || q.options.some((o) => o.code || /```/.test(o.text || ''));
  if (check === 'none' && hasCode && !(typeof q.manual === 'string' && q.manual.trim())) {
    p('question shows code but has check: none; add an automatic check or a `manual:` reason');
  }
}

/**
 * Loads book.yaml and all chapter files.
 * @param {{ only?: string[] }} opts  optional list of file paths to restrict loading (for verify)
 */
export function loadBook() {
  const problems = [];
  const meta = loadYamlFile(path.join(CONTENT_DIR, 'book.yaml'));
  const ids = new Set();
  let number = 0;
  const chapters = [];

  for (const ch of meta.chapters) {
    const dir = path.join(CONTENT_DIR, ch.dir);
    const files = fs.existsSync(dir)
      ? fs
          .readdirSync(dir)
          .filter((f) => f.endsWith('.yaml') && !f.startsWith('_'))
          .sort()
      : [];
    const subtopics = [];
    let review = null;
    let lessonIndex = 0;
    for (const f of files) {
      const file = path.join(dir, f);
      const where = relPath(file);
      let data;
      try {
        data = loadYamlFile(file);
      } catch (err) {
        // Keep loading the other files so one broken file does not block everyone else.
        problems.push(err.message);
        continue;
      }
      if (!data || typeof data !== 'object') {
        problems.push(`${where}: empty or invalid file`);
        continue;
      }
      if (!/^[a-z0-9-]+$/.test(data.id || '')) problems.push(`${where}: id must match [a-z0-9-]+ (got ${data.id})`);
      if (ids.has(data.id)) problems.push(`${where}: duplicate id ${data.id}`);
      ids.add(data.id);
      if (typeof data.title !== 'string') problems.push(`${where}: title is required`);
      if (!data.review && typeof data.lesson !== 'string') problems.push(`${where}: lesson is required`);
      if (!Array.isArray(data.questions) || data.questions.length === 0) {
        problems.push(`${where}: questions must be a non-empty list`);
        data.questions = [];
      }
      data.questions = data.questions.map((q, i) => {
        const nq = { ...q, options: Array.isArray(q?.options) ? q.options.map(normalizeOption) : q?.options };
        validateQuestion(nq, `${where} question #${i + 1}`, problems);
        nq.index = i + 1;
        nq.file = where;
        return nq;
      });
      const sub = { ...data, file: where, chapter: ch };
      if (data.review) {
        if (review) problems.push(`${where}: chapter ${ch.id} already has a review file (${review.file})`);
        review = sub;
      } else {
        lessonIndex += 1;
        sub.number = lessonIndex;
        subtopics.push(sub);
      }
    }
    chapters.push({ ...ch, subtopics, review });
  }

  // Global numbering in reading order: each chapter's subtopics, then its review test.
  for (const ch of chapters) {
    for (const sub of [...ch.subtopics, ...(ch.review ? [ch.review] : [])]) {
      for (const q of sub.questions) {
        number += 1;
        q.number = number;
        q.subtopic = sub;
      }
    }
  }

  return { meta, chapters, problems, totalQuestions: number };
}

export function allQuestions(book) {
  const out = [];
  for (const ch of book.chapters) {
    for (const sub of [...ch.subtopics, ...(ch.review ? [ch.review] : [])]) out.push(...sub.questions);
  }
  return out;
}
