// Executes question code so that answers can be verified mechanically.
//  - JavaScript runs in a fresh `node` process (CommonJS script unless the file is .mjs).
//  - DOM code runs in jsdom as a classic browser script (top-level `var` becomes a window property).
//  - TypeScript is type-checked (and optionally compiled + run) with the project's `tsc` in --strict mode.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import util from 'node:util';
import { JSDOM, VirtualConsole } from 'jsdom';
import { ROOT } from './util.mjs';

export const RUNNER_VERSION = '1';
const TSC = path.join(ROOT, 'node_modules', '.bin', process.platform === 'win32' ? 'tsc.cmd' : 'tsc');
const TSC_FLAGS = ['--pretty', 'false', '--strict', '--target', 'es2022', '--module', 'nodenext', '--lib', 'es2022,dom'];
const VALUE_MARK = '\u0001VALUE\u0001';

function tmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'quizbook-'));
}

function exec(cmd, args, { cwd, timeout = 15000 } = {}) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { cwd, stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill('SIGKILL');
    }, timeout);
    child.stdout.on('data', (d) => (stdout += d));
    child.stderr.on('data', (d) => (stderr += d));
    child.on('close', (code) => {
      clearTimeout(timer);
      resolve({ code, stdout, stderr, timedOut });
    });
  });
}

/** Normalises console text so that Node's `[ 1, 2 ]` and an author's `[1, 2]` compare equal. */
export function normOutput(s) {
  return String(s ?? '')
    .replace(/\r/g, '')
    .split('\n')
    .map((l) => l.replace(/\s+$/, ''))
    .join('\n')
    .replace(/\n+$/, '')
    .replace(/^\n+/, '')
    .replace(/\[\s+/g, '[')
    .replace(/\s+\]/g, ']')
    .replace(/\{\s+/g, '{')
    .replace(/\s+\}/g, '}');
}

/** Removes whitespace outside double-quoted strings: `[1,2]` == `[1, 2]`, but `"a b"` stays intact. */
export function squash(s) {
  let out = '';
  let inStr = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inStr) {
      out += c;
      if (c === '\\') {
        out += s[++i] ?? '';
      } else if (c === '"') inStr = false;
    } else if (c === '"') {
      inStr = true;
      out += c;
    } else if (!/\s/.test(c)) out += c;
  }
  return out;
}

function parseNodeError(stderr, dir) {
  const nameMatch = stderr.match(/^\[?([A-Z][A-Za-z]*(?:Error|Exception|Rejection))\b/m);
  const name = nameMatch ? nameMatch[1] : 'Uncaught';
  let file = null;
  let line = null;
  const esc = dir.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const head = stderr.match(new RegExp(`^(?:file://)?${esc}/([^\\s:]+):(\\d+)\\s*$`, 'm'));
  const frame = stderr.match(new RegExp(`${esc}/([^\\s:()]+):(\\d+):\\d+`));
  const m = head || frame;
  if (m) {
    file = m[1];
    line = Number(m[2]);
  }
  return { name, file, line };
}

/**
 * Runs JavaScript files with Node.
 * @returns {{ output: string, error: null | { name, file, line } }}
 */
export async function runNode(files, entry) {
  const dir = tmpDir();
  try {
    for (const [name, src] of Object.entries(files)) {
      fs.mkdirSync(path.dirname(path.join(dir, name)), { recursive: true });
      fs.writeFileSync(path.join(dir, name), src);
    }
    const r = await exec(process.execPath, [entry], { cwd: dir });
    let error = null;
    if (r.timedOut) error = { name: 'TIMEOUT', file: null, line: null };
    else if (r.code !== 0) error = parseNodeError(r.stderr, fs.realpathSync(dir));
    const out = normOutput(r.stdout);
    const output = error ? normOutput(`${out}\n!! ${error.name}`) : out;
    return { output, error, stdout: r.stdout, stderr: r.stderr };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

export function entryFor(code, { module } = {}) {
  return module ? 'snippet.mjs' : 'snippet.js';
}

// Canonical serializer used by `value` and `claims` checks (JS-literal style, strings in double quotes).
const SHOW_SRC = String.raw`
function __show(v, seen) {
  seen = seen || new Set();
  if (typeof v === 'string') return JSON.stringify(v);
  if (typeof v === 'number') return Object.is(v, -0) ? '-0' : String(v);
  if (typeof v === 'bigint') return String(v) + 'n';
  if (typeof v === 'symbol') return v.toString();
  if (typeof v === 'function') return v.name ? '[Function: ' + v.name + ']' : '[Function]';
  if (v === null || v === undefined || typeof v === 'boolean') return String(v);
  if (seen.has(v)) return '[Circular]';
  seen.add(v);
  if (Array.isArray(v)) {
    const parts = [];
    for (let i = 0; i < v.length; i++) parts.push(i in v ? __show(v[i], seen) : 'empty');
    return '[' + parts.join(', ') + ']';
  }
  if (v instanceof Date) return 'Date(' + v.toISOString() + ')';
  if (v instanceof Promise) return 'Promise';
  if (v instanceof Error) return v.name + ': ' + v.message;
  const keys = Object.keys(v);
  const ctor = v.constructor && v.constructor !== Object && v.constructor.name ? v.constructor.name + ' ' : '';
  if (!keys.length) return ctor + '{}';
  return ctor + '{ ' + keys.map(function (k) {
    return (/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)) + ': ' + __show(v[k], seen);
  }).join(', ') + ' }';
}
function __emit(tag, fn) {
  let s;
  try { s = __show(fn()); } catch (e) { s = '!! ' + ((e && e.name) || 'Uncaught'); }
  process.stdout.write('${VALUE_MARK}' + tag + '\t' + s + '\n');
}
`;

function evalWrap(expr) {
  // Direct eval sees `setup` bindings; parentheses force expression context ({} + [] is not a block).
  return `() => eval(${JSON.stringify(`(${expr}\n)`)})`;
}

/** Evaluates expressions (after optional setup code) and returns their canonical string forms. */
export async function evalExpressions(setup, exprs) {
  const body = exprs.map((e, i) => `__emit(${i}, ${evalWrap(e)});`).join('\n');
  const src = `${SHOW_SRC}\n${setup || ''}\n;${body}\n`;
  const r = await runNode({ 'snippet.js': src }, 'snippet.js');
  const values = exprs.map(() => null);
  for (const line of r.stdout.split('\n')) {
    if (!line.startsWith(VALUE_MARK)) continue;
    const [tag, ...rest] = line.slice(VALUE_MARK.length).split('\t');
    values[Number(tag)] = rest.join('\t');
  }
  // If setup itself threw, nothing was emitted: every value is that error.
  return values.map((v) => v ?? `!! ${r.error ? r.error.name : 'NoValue'}`);
}

/** Runs HTML + script in jsdom and returns console output (uncaught errors appear as "!! Name"). */
export async function runDom({ html = '', code = '', events = [], after = '', wait = 40, url, dialogs = {} }) {
  const lines = [];
  const vc = new VirtualConsole();
  const push = (...args) => lines.push(util.format(...args));
  for (const level of ['log', 'info', 'warn', 'error', 'debug']) vc.on(level, push);
  vc.on('jsdomError', (err) => {
    if (err.type === 'unhandled-exception') {
      lines.push(`!! ${(err.cause && err.cause.name) || 'Uncaught'}`);
    } else if (err.type === 'not-implemented') {
      lines.push(`!! NotImplemented`);
    }
  });
  let doc = /<html[\s>]/i.test(html) ? html : `<!DOCTYPE html><html><head></head><body>${html}</body></html>`;
  if (code) {
    const script = `<script>\n${code}\n</script>`;
    doc = /<\/body>/i.test(doc) ? doc.replace(/<\/body>/i, `${script}</body>`) : doc + script;
  }
  const dom = new JSDOM(doc, {
    runScripts: 'dangerously',
    url: url || 'https://quiz.example/',
    virtualConsole: vc,
    pretendToBeVisual: true,
    beforeParse(window) {
      window.alert = (msg) => lines.push(`[alert] ${msg}`);
      window.confirm = (msg) => {
        lines.push(`[confirm] ${msg}`);
        return dialogs.confirm ?? true;
      };
      window.prompt = (msg) => {
        lines.push(`[prompt] ${msg}`);
        return dialogs.prompt === undefined ? null : dialogs.prompt;
      };
    },
  });
  const { window } = dom;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  await sleep(wait);
  for (const ev of events) {
    const times = ev.times || 1;
    for (let t = 0; t < times; t++) {
      const el = ev.target === 'window' ? window : ev.target === 'document' ? window.document : window.document.querySelector(ev.target);
      if (!el) {
        lines.push(`!! NoElement(${ev.target})`);
        continue;
      }
      if (ev.value !== undefined) el.value = ev.value;
      if (ev.checked !== undefined) el.checked = ev.checked;
      let event;
      switch (ev.type) {
        case 'click':
          event = new window.MouseEvent('click', { bubbles: true, cancelable: true });
          break;
        case 'keydown':
        case 'keyup':
          event = new window.KeyboardEvent(ev.type, { key: ev.key || 'Enter', bubbles: true, cancelable: true });
          break;
        case 'submit':
          event = new window.Event('submit', { bubbles: true, cancelable: true });
          break;
        default:
          event = new window.Event(ev.type, { bubbles: ev.bubbles ?? true, cancelable: true });
      }
      const notCanceled = el.dispatchEvent(event);
      if (ev.reportDefault) lines.push(`[default ${notCanceled ? 'runs' : 'prevented'}]`);
      await sleep(ev.wait ?? 5);
    }
  }
  if (after) {
    try {
      window.eval(after);
    } catch (e) {
      lines.push(`!! ${(e && e.name) || 'Uncaught'}`);
    }
  }
  await sleep(wait);
  window.close();
  return { output: normOutput(lines.join('\n')) };
}

function withModuleMarker(code) {
  return /^\s*(import|export)\b/m.test(code) ? code : `${code}\nexport {};\n`;
}

function parseTscErrors(stdout) {
  const errors = [];
  const re = /^(.+?)\((\d+),(\d+)\): error (TS\d+): (.*)$/gm;
  let m;
  while ((m = re.exec(stdout))) errors.push({ file: path.basename(m[1]), line: Number(m[2]), code: m[4], message: m[5] });
  return errors;
}

/** Type-checks TypeScript. `files` maps names (e.g. "main.mts") to source. */
export async function runTsc(files, { emit = false } = {}) {
  const dir = tmpDir();
  try {
    const names = [];
    for (const [name, src] of Object.entries(files)) {
      fs.writeFileSync(path.join(dir, name), withModuleMarker(src));
      names.push(name);
    }
    const args = [...TSC_FLAGS, ...(emit ? ['--outDir', 'out'] : ['--noEmit']), ...names];
    const r = await exec(TSC, args, { cwd: dir, timeout: 60000 });
    const errors = parseTscErrors(r.stdout + r.stderr);
    let run = null;
    if (emit && errors.length === 0) {
      const entry = names[0].replace(/\.mts$/, '.mjs').replace(/\.ts$/, '.js');
      const outDir = path.join(dir, 'out');
      const emitted = {};
      for (const f of fs.readdirSync(outDir)) emitted[f] = fs.readFileSync(path.join(outDir, f), 'utf8');
      run = await runNode(emitted, entry);
    }
    return { errors, run, raw: r.stdout + r.stderr };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}
