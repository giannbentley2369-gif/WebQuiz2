// Turns the loaded book into one self-contained RTL HTML document.
import fs from 'node:fs';
import path from 'node:path';
import MarkdownIt from 'markdown-it';
import container from 'markdown-it-container';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import plaintext from 'highlight.js/lib/languages/plaintext';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import { inlineCodeLiteral } from './content.mjs';
import { BOOK_DIR, FA_ORDINALS, LEVELS, ROOT, escapeHtml, fa } from './util.mjs';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('css', css);
hljs.registerLanguage('plaintext', plaintext);

const LANG_ALIASES = {
  js: 'javascript', javascript: 'javascript', mjs: 'javascript', cjs: 'javascript', jsx: 'javascript',
  ts: 'typescript', typescript: 'typescript', mts: 'typescript', cts: 'typescript',
  html: 'xml', xml: 'xml', json: 'json', bash: 'bash', sh: 'bash', shell: 'bash', console: 'bash',
  css: 'css', text: 'plaintext', txt: 'plaintext', plaintext: 'plaintext',
};
const LANG_LABEL = { javascript: 'JavaScript', typescript: 'TypeScript', xml: 'HTML', json: 'JSON', bash: 'Terminal', css: 'CSS', plaintext: '' };

/** Splits highlight.js HTML into lines, re-opening spans that cross a newline. */
function splitHighlighted(html) {
  const lines = [];
  const stack = [];
  let cur = '';
  const re = /(<span[^>]*>)|(<\/span>)|(\n)|([^<\n]+)/g;
  let m;
  while ((m = re.exec(html))) {
    if (m[1]) {
      stack.push(m[1]);
      cur += m[1];
    } else if (m[2]) {
      stack.pop();
      cur += m[2];
    } else if (m[3]) {
      cur += '</span>'.repeat(stack.length);
      lines.push(cur);
      cur = stack.join('');
    } else cur += m[4];
  }
  lines.push(cur);
  return lines;
}

export function renderCode(src, lang = 'js', { lines = false, title = '' } = {}) {
  const code = String(src).replace(/\s+$/, '');
  const language = LANG_ALIASES[lang] || 'plaintext';
  const html = hljs.highlight(code, { language, ignoreIllegals: true }).value;
  const rows = splitHighlighted(html)
    .map((l) => `<span class="line">${l === '' ? ' ' : l}</span>`)
    .join('');
  const label = title || LANG_LABEL[language] || '';
  const caption = label ? `<figcaption dir="ltr">${escapeHtml(label)}</figcaption>` : '';
  return `<figure class="code-fig${title ? ' has-title' : ''}">${caption}<pre class="code${lines ? ' numbered' : ''}" dir="ltr"><code class="hljs lang-${language}">${rows}</code></pre></figure>`;
}

const BOXES = {
  tip: { title: 'نکته', icon: 'bulb' },
  trap: { title: 'دام تستی', icon: 'alert' },
  note: { title: 'یادداشت', icon: 'pin' },
  info: { title: 'بیشتر بدانیم', icon: 'info' },
  analogy: { title: 'یک تشبیه ساده', icon: 'spark' },
  example: { title: 'مثال', icon: 'play' },
  summary: { title: 'جمع‌بندی', icon: 'check' },
  warning: { title: 'هشدار', icon: 'alert' },
};

const ICONS = {
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2V17h5v-1.2c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3z"/>',
  alert: '<path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17.5v.01"/>',
  pin: '<path d="M14 3l7 7-4 1-4 4-1 5-3-3-5 5 5-5-3-3 5-1 4-4 1-4z"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5-6-3.5z"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.7 2.7L16.5 9.5"/>',
};

export function icon(name) {
  return `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}

function parseFenceInfo(info) {
  const parts = (info || '').trim().split(/\s+/).filter(Boolean);
  const lang = parts[0] || 'text';
  const opts = { lines: false, title: '' };
  for (const p of parts.slice(1)) {
    if (p === 'lines') opts.lines = true;
    else if (p.startsWith('title=')) opts.title = p.slice(6).replace(/^["']|["']$/g, '');
  }
  return { lang, opts };
}

function createMarkdown() {
  const md = new MarkdownIt({ html: true, linkify: false, typographer: false });
  md.renderer.rules.fence = (tokens, idx) => {
    const t = tokens[idx];
    const { lang, opts } = parseFenceInfo(t.info);
    return renderCode(t.content, lang, opts);
  };
  md.renderer.rules.code_block = (tokens, idx) => renderCode(tokens[idx].content, 'text');
  md.renderer.rules.code_inline = (tokens, idx) => `<code class="ic" dir="ltr">${escapeHtml(tokens[idx].content)}</code>`;
  const defaultTable = md.renderer.rules.table_open || ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));
  md.renderer.rules.table_open = (...args) => `<div class="table-wrap">${defaultTable(...args)}`;
  const defaultTableClose = md.renderer.rules.table_close || ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));
  md.renderer.rules.table_close = (...args) => `${defaultTableClose(...args)}</div>`;
  for (const [name, box] of Object.entries(BOXES)) {
    md.use(container, name, {
      render(tokens, idx) {
        const t = tokens[idx];
        if (t.nesting === 1) {
          const custom = t.info.trim().slice(name.length).trim();
          return `<div class="box box-${name}"><div class="box-title">${icon(box.icon)}<span>${md.renderInline(custom || box.title)}</span></div><div class="box-body">\n`;
        }
        return '</div></div>\n';
      },
    });
  }
  return md;
}

export const md = createMarkdown();

function defaultLang(q) {
  if (q.lang) return q.lang;
  return ['ts-output', 'tsc-line', 'option-tsc'].includes(q.check) ? 'ts' : 'js';
}

function langOfFile(name) {
  const ext = path.extname(name).slice(1);
  return LANG_ALIASES[ext] ? ext : 'text';
}

function renderOutputChips(out) {
  const lines = String(out).split('\n');
  if (lines.length === 1 && lines[0] === '') return '<span class="outs"><span class="out none">(بدون خروجی)</span></span>';
  return `<span class="outs" dir="ltr">${lines
    .map((l) => {
      if (l.startsWith('!! ')) return `<span class="out err">Uncaught ${escapeHtml(l.slice(3))}</span>`;
      return `<span class="out">${l === '' ? '&nbsp;' : escapeHtml(l)}</span>`;
    })
    .join('')}</span>`;
}

function optionHtml(q, o) {
  if (o.text !== undefined) {
    return /```/.test(o.text) ? md.render(o.text) : md.renderInline(o.text);
  }
  if (o.out !== undefined) return renderOutputChips(o.out);
  if (o.line !== undefined) {
    if (String(o.line) === '0') return 'هیچ خطایی رخ نمی‌دهد';
    const [file, line] = String(o.line).includes(':') ? String(o.line).split(':') : [null, o.line];
    return file ? `خط ${fa(line)} از فایل <code class="ic" dir="ltr">${escapeHtml(file)}</code>` : `خط ${fa(line)}`;
  }
  if (o.code !== undefined) {
    const code = String(o.code).trim();
    return code.includes('\n') ? renderCode(code, defaultLang(q)) : `<code class="ic" dir="ltr">${escapeHtml(code)}</code>`;
  }
  if (o.value !== undefined) return `<code class="ic" dir="ltr">${escapeHtml(o.value)}</code>`;
  return '';
}

function optionWeight(q, o) {
  if (o.text !== undefined) {
    if (/```/.test(o.text)) return 999;
    return o.text.replace(/`/g, '').replace(/\*\*/g, '').length;
  }
  if (o.out !== undefined) {
    const lines = String(o.out).split('\n');
    return lines.reduce((n, l) => n + l.length + 4, 0) + (lines.length > 1 ? 4 : 0);
  }
  if (o.line !== undefined) return String(o.line) === '0' ? 22 : 10;
  if (o.code !== undefined) return String(o.code).includes('\n') ? 999 : String(o.code).length + 2;
  if (o.value !== undefined) return String(o.value).length + 2;
  return 10;
}

function optionColumns(q) {
  const w = Math.max(...q.options.map((o) => optionWeight(q, o)));
  if (w <= 15) return 4;
  if (w <= 36) return 2;
  return 1;
}

function questionCode(q) {
  let html = '';
  const numbered = q.lines ?? ['error-line', 'tsc-line'].includes(q.check);
  if (q.files) {
    for (const [name, src] of Object.entries(q.files)) html += renderCode(src, langOfFile(name), { lines: numbered, title: name });
  }
  if (q.html && q.showHtml !== false) html += renderCode(q.html, 'html', { title: 'HTML' });
  if (q.code && q.showCode !== false) html += renderCode(q.code, defaultLang(q), { lines: numbered });
  if (q.events && q.showEvents !== false && q.eventsNote) html += `<div class="q-note">${md.renderInline(q.eventsNote)}</div>`;
  return html;
}

export function renderQuestion(q) {
  const cols = q.columns || optionColumns(q);
  const opts = q.options
    .map((o, i) => `<li><span class="opt-n">${fa(i + 1)}</span><div class="opt-t">${optionHtml(q, o)}</div></li>`)
    .join('');
  return `<div class="q" id="q${q.number}">
<div class="q-head"><a class="q-num" href="#a${q.number}">${fa(q.number)}</a><span class="lvl lvl-${q.level}">${LEVELS[q.level]}</span></div>
<div class="q-body"><div class="q-stem">${md.render(q.stem)}</div>${questionCode(q)}<ol class="opts cols-${cols}">${opts}</ol></div>
</div>`;
}

function renderAnswer(q) {
  return `<div class="ans" id="a${q.number}">
<div class="ans-head"><a class="q-num" href="#q${q.number}">${fa(q.number)}</a><span class="ans-opt">گزینه‌ی ${fa(q.answer)}</span><span class="lvl lvl-${q.level}">${LEVELS[q.level]}</span></div>
<div class="ans-body">${md.render(q.explain)}</div>
</div>`;
}

function subtopicNumber(ch, sub) {
  return `${fa(ch.number)}-${fa(sub.number)}`;
}

function renderSubtopic(ch, sub) {
  const qs = sub.questions;
  const range = `${fa(qs[0].number)} تا ${fa(qs[qs.length - 1].number)}`;
  return `<section class="subtopic" id="${sub.id}">
<header class="sub-head">
  <div class="sub-num">${subtopicNumber(ch, sub)}</div>
  <h2>${md.renderInline(sub.title)}</h2>
  ${sub.slides ? `<div class="sub-src">منبع: ${md.renderInline(sub.slides)}</div>` : ''}
</header>
<div class="part part-lesson"><div class="part-label">${icon('bulb')}<span>درسنامه</span></div>
<div class="lesson">${md.render(sub.lesson)}</div></div>
<div class="part part-practice"><div class="part-label">${icon('check')}<span>تست‌های تمرینی</span><span class="part-meta">${fa(qs.length)} تست · شماره‌ی ${range}</span></div>
<div class="questions">${qs.map(renderQuestion).join('\n')}</div></div>
</section>`;
}

function renderReview(ch, review) {
  const qs = review.questions;
  return `<section class="subtopic review" id="${review.id}">
<header class="sub-head review-head">
  <div class="sub-num">${icon('spark')}</div>
  <h2>${md.renderInline(review.title)}</h2>
  <div class="sub-src">${fa(qs.length)} تست ترکیبی · شماره‌ی ${fa(qs[0].number)} تا ${fa(qs[qs.length - 1].number)}</div>
</header>
${review.intro ? `<div class="review-intro">${md.render(review.intro)}</div>` : ''}
<div class="questions">${qs.map(renderQuestion).join('\n')}</div>
</section>`;
}

function chapterQuestions(ch) {
  return [...ch.subtopics, ...(ch.review ? [ch.review] : [])].flatMap((s) => s.questions);
}

function renderChapter(ch) {
  const qs = chapterQuestions(ch);
  const items = ch.subtopics
    .map((s) => `<li><a href="#${s.id}"><span class="co-num">${subtopicNumber(ch, s)}</span><span>${md.renderInline(s.title)}</span></a></li>`)
    .join('');
  return `<section class="chapter chapter-${ch.number}" id="${ch.id}">
<header class="chapter-opener">
  <div class="co-kicker">فصل ${FA_ORDINALS[ch.number]}</div>
  <div class="co-big">${fa(ch.number)}</div>
  <h1>${md.renderInline(ch.title)}</h1>
  ${ch.source ? `<div class="co-src">بر اساس اسلایدهای <span dir="ltr">«${escapeHtml(ch.source)}»</span></div>` : ''}
  ${ch.intro ? `<div class="co-intro">${md.render(ch.intro)}</div>` : ''}
  <div class="co-stats">${fa(ch.subtopics.length)} درس · ${fa(qs.length)} تست · آزمون جامع پایان فصل</div>
  <ol class="co-list">${items}${ch.review ? `<li><a href="#${ch.review.id}"><span class="co-num">${icon('spark')}</span><span>${md.renderInline(ch.review.title)}</span></a></li>` : ''}</ol>
</header>
${ch.subtopics.map((s) => renderSubtopic(ch, s)).join('\n')}
${ch.review ? renderReview(ch, ch.review) : ''}
</section>`;
}

function renderAnswers(book) {
  const parts = book.chapters.map((ch) => {
    const qs = chapterQuestions(ch);
    const key = qs.map((q) => `<a class="key-cell" href="#a${q.number}"><b>${fa(q.number)}</b><i>${fa(q.answer)}</i></a>`).join('');
    const groups = [...ch.subtopics, ...(ch.review ? [ch.review] : [])]
      .map(
        (s) => `<div class="ans-group" id="ans-${s.id}">
<h3 class="ans-sub">${s.review ? icon('spark') : `<span class="sub-num-sm">${subtopicNumber(ch, s)}</span>`}<span>${md.renderInline(s.title)}</span></h3>
${s.questions.map(renderAnswer).join('\n')}
</div>`,
      )
      .join('\n');
    return `<section class="ans-chapter" id="ans-${ch.id}">
<h2 class="ans-ch-title">پاسخ‌های فصل ${FA_ORDINALS[ch.number]}: ${md.renderInline(ch.title)}</h2>
<div class="quick-key"><div class="qk-title">کلید سریع فصل ${FA_ORDINALS[ch.number]}</div><div class="qk-grid">${key}</div></div>
${groups}
</section>`;
  });
  return `<section class="answers" id="answers">
<header class="answers-opener"><div class="co-kicker">بخش پایانی</div><h1>پاسخنامه‌ی تشریحی</h1>
<p>برای هر تست، گزینه‌ی درست همراه با دلیل درستی آن و دلیل نادرستی گزینه‌های وسوسه‌انگیز آمده است. شماره‌ها با شماره‌ی تست‌ها در متن کتاب یکی است؛ روی شماره‌ی هر پاسخ بزنید تا به خود تست برگردید.</p></header>
${parts.join('\n')}
</section>`;
}

function tocRow(level, href, num, title) {
  return `<a class="toc-row toc-${level}" href="#${href}"><span class="toc-num">${num}</span><span class="toc-title">${title}</span><span class="toc-dots"></span><span class="toc-page" data-target="${href}">۰۰۰</span></a>`;
}

function renderToc(book) {
  const rows = [tocRow('l1', 'guide', '', 'راهنمای استفاده از کتاب و برنامه‌ی مطالعه')];
  for (const ch of book.chapters) {
    rows.push(tocRow('l1', ch.id, `فصل ${fa(ch.number)}`, md.renderInline(ch.title)));
    for (const s of ch.subtopics) rows.push(tocRow('l2', s.id, subtopicNumber(ch, s), md.renderInline(s.title)));
    if (ch.review) rows.push(tocRow('l2 toc-review', ch.review.id, icon('spark'), md.renderInline(ch.review.title)));
  }
  rows.push(tocRow('l1', 'answers', '', 'پاسخنامه‌ی تشریحی'));
  for (const ch of book.chapters) rows.push(tocRow('l2', `ans-${ch.id}`, `فصل ${fa(ch.number)}`, `پاسخ‌های ${md.renderInline(ch.title)}`));
  return `<nav class="toc" id="toc"><h1 class="toc-head">فهرست مطالب</h1>${rows.join('\n')}</nav>`;
}

function fontFace(family, weight, file, format = 'woff2') {
  const data = fs.readFileSync(path.join(ROOT, file)).toString('base64');
  return `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};font-display:block;src:url(data:font/${format};base64,${data}) format('${format}');}`;
}

function fontCss() {
  const vz = 'node_modules/vazirmatn/fonts/webfonts';
  const jb = 'node_modules/@fontsource/jetbrains-mono/files';
  return [
    fontFace('Vazirmatn', 400, `${vz}/Vazirmatn-Regular.woff2`),
    fontFace('Vazirmatn', 500, `${vz}/Vazirmatn-Medium.woff2`),
    fontFace('Vazirmatn', 700, `${vz}/Vazirmatn-Bold.woff2`),
    fontFace('Vazirmatn', 900, `${vz}/Vazirmatn-Black.woff2`),
    fontFace('JetBrains Mono', 400, `${jb}/jetbrains-mono-latin-400-normal.woff2`),
    fontFace('JetBrains Mono', 700, `${jb}/jetbrains-mono-latin-700-normal.woff2`),
  ].join('\n');
}

function pageCss(book) {
  const named = book.chapters
    .map((ch) => `@page ${ch.id} { @top-right { content: ${JSON.stringify(`فصل ${fa(ch.number)} · ${ch.header || ch.title}`)}; } }\n.chapter-${ch.number} { page: ${ch.id}; }`)
    .join('\n');
  return named;
}

export function renderBook(book) {
  const { meta } = book;
  const css = fs.readFileSync(path.join(BOOK_DIR, 'styles', 'book.css'), 'utf8');
  const guide = fs.readFileSync(path.join(BOOK_DIR, 'content', meta.guide || 'guide.md'), 'utf8');
  const total = book.totalQuestions;
  const lessons = book.chapters.reduce((n, ch) => n + ch.subtopics.length, 0);
  const cover = `<section class="cover" id="cover">
<div class="cover-top"><span>${escapeHtml(meta.university)}</span><span dir="ltr">${escapeHtml(meta.course)}</span></div>
<div class="cover-main">
  <div class="cover-kicker">${md.renderInline(meta.kicker)}</div>
  <h1 class="cover-title">${md.renderInline(meta.title)}</h1>
  <div class="cover-sub">${md.renderInline(meta.subtitle)}</div>
  <div class="cover-chips" dir="ltr"><span>JavaScript</span><span>DOM</span><span>Node.js</span><span>npm</span><span>TypeScript</span></div>
  <div class="cover-code" dir="ltr">${renderCode(meta.coverCode, 'js')}</div>
</div>
<div class="cover-stats"><div><b>${fa(book.chapters.length)}</b><span>فصل</span></div><div><b>${fa(lessons)}</b><span>درسنامه</span></div><div><b>${fa(total)}</b><span>تست چهارگزینه‌ای</span></div><div><b>${fa(total)}</b><span>پاسخ تشریحی</span></div></div>
<div class="cover-foot">${md.renderInline(meta.coverNote)}</div>
</section>`;
  const guideHtml = `<section class="front" id="guide">${md.render(guide.replace(/\{\{total\}\}/g, fa(total)).replace(/\{\{lessons\}\}/g, fa(lessons)))}</section>`;
  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="utf-8">
<title>${escapeHtml(meta.pdfTitle || meta.title)}</title>
<style>
${fontCss()}
${css}
${pageCss(book)}
</style>
</head>
<body>
${cover}
${renderToc(book)}
${guideHtml}
${book.chapters.map(renderChapter).join('\n')}
${renderAnswers(book)}
</body>
</html>`;
}

export { inlineCodeLiteral };
