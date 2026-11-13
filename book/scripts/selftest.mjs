#!/usr/bin/env node
// Self-test for the verifier: the fixture contains one question per check type, one deliberately
// wrong key (question 3) and one code question without a check (question 16). The verifier must
// pass every other question and report exactly those two problems.
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { ROOT } from './lib/util.mjs';

const fixture = path.join(ROOT, 'book', 'tests', 'verifier-selftest');
const r = spawnSync(process.execPath, [path.join(ROOT, 'book/scripts/verify.mjs')], {
  env: { ...process.env, QUIZBOOK_CONTENT: fixture },
  encoding: 'utf8',
});
const out = r.stdout + r.stderr;
const failures = [...out.matchAll(/✗ Q(\d+) /g)].map((m) => Number(m[1]));
const problems = [...out.matchAll(/✗ .*question #(\d+): /g)].map((m) => Number(m[1]));
const passed = out.match(/auto-verified: (\d+)\/(\d+) passed/);

const ok =
  r.status === 1 &&
  failures.length === 1 && failures[0] === 3 &&
  problems.length === 1 && problems[0] === 16 &&
  passed && Number(passed[1]) === Number(passed[2]) - 1;

console.log(out.trim());
if (!ok) {
  console.error('\nSELF-TEST FAILED: the verifier did not report exactly the planted problems.');
  process.exit(1);
}
console.log('\nSelf-test passed: the planted wrong key and the unverified code question were caught; all other checks passed.');
