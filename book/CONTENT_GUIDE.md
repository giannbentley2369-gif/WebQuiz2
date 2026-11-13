# Authoring guide (content of the quiz book)

This guide is the contract for everyone who writes or edits `book/content/**`. The build script
turns these YAML files into the Persian PDF; `npm run verify` executes every code question and
fails if the keyed option is not the only option that matches reality.

## 1. Files and order

| Path | Purpose |
|---|---|
| `book/content/book.yaml` | Book metadata and the chapter list. |
| `book/content/guide.md` | "How to use this book" front matter (Persian). |
| `book/content/chN/NN-slug.yaml` | One file per subtopic, ordered by the numeric prefix. |
| `book/content/chN/99-review.yaml` | The chapter review test (`review: true`, no lesson). |

Question numbers are assigned automatically, in reading order across the whole book, so never
write question numbers yourself. Refer to slides as "اسلاید ۲۱" and to other subtopics by title.

## 2. Subtopic file schema

```yaml
id: ch1-coercion                     # unique, lowercase [a-z0-9-]; used for links
title: "تبدیل نوع ضمنی (Type coercion)" # Persian title, English term in parentheses
slides: "Introduction to JS، اسلایدهای ۲۰ تا ۲۲"   # source pages, Persian digits
lesson: |
  ...Markdown lesson (section 3)...
questions:
  - ...question objects (section 4)...
```

Review file: `id: ch1-review`, `review: true`, `title: "آزمون جامع فصل اول"`, optional `intro:`
(Markdown), and `questions:`.

YAML tips: use `|` block scalars for every multi-line text (lesson, stem, code, explain).
Quote one-line strings that contain `: `, `#`, backticks, quotes, `[`, `{`, `*`, `&`, `!`, `%`, `@`
or start with a special character. Single quotes are simplest: `'`"51"`'`; inside single-quoted
YAML a literal `'` is written as `''`. Run `npm run verify -- <file>` after every edit; it reports
YAML errors with line numbers.

## 3. Lesson (درسنامه) rules

The reader is a university student with **zero** knowledge of the subject and a quiz in four days.

1. **Language and tone**: simple, friendly, encouraging Persian (e.g. «فرض کن…»، «بیا ببینیم…»).
   Correct orthography with ZWNJ (نیم‌فاصله): «می‌شود»، «آرایه‌ها»، «کلاس‌ها»، «نمی‌توان».
2. **Terms**: keep technical terms in English (Promise, hoisting, closure, callback, DOM, …). The
   first time a term appears in a subtopic, add a short Persian explanation, e.g.
   «**hoisting** (بالا بردن اعلان‌ها به ابتدای محدوده)».
3. **Shape of a lesson**: intuition or analogy → definition → small code examples → rules
   (lists/tables) → at least one `::: tip` (نکته) box and at least one `::: trap` (دام تستی) box
   after the main explanation → optional `::: summary`. Long subtopics use `###` / `####` headings.
4. **Coverage**: teach 100% of the slide concepts assigned to the subtopic, including content that
   exists only as images on the slides (code examples, diagrams, "Class Activity" questions — see
   the transcripts in `book/sources/`). Re-create slide code examples and fully solve every class
   activity inside the lesson (label it «فعالیت کلاسی اسلاید N»). Closely related background that
   is needed for real understanding is welcome; unrelated topics are not.
5. **Code** in fenced blocks with a language tag (`js`, `ts`, `html`, `json`, `bash`, `text`).
   All code comments and all console messages are **English**. Show results as comments
   (`console.log("5" + 1); // "51"`). Every output you claim must be checked by running it
   (Node.js / tsc). Fence options: ```` ```js lines ```` shows line numbers,
   ```` ```js title=app.js ```` adds a file-name caption.
6. **Digits**: Persian digits in Persian prose («۷ نوع داده»), Latin digits inside code.
7. **No emoji** (the PDF has no emoji font). Use the boxes instead:
   `::: tip`, `::: trap`, `::: note`, `::: info` (بیشتر بدانیم), `::: analogy`, `::: example`,
   `::: summary`, `::: warning`; an optional custom title may follow the name
   (`::: tip نکته‌ی طلایی`). Close each box with `:::`.
8. Mention browser vs. Node.js differences whenever the result depends on the environment.

## 4. Questions

### 4.1 Rules
- Exactly **4 options** and exactly **one** correct option. `answer` is 1–4.
- Decide the count per subtopic so that the student fully masters it: light/historical topics
  ~8–12, ordinary topics ~12–20, core pitfall topics (coercion, hoisting/TDZ, closures, `this`,
  array methods, Promises and the event loop, DOM events, …) ~20–35.
- Difficulty mix ≈ 30% `easy` (direct concept), 40% `medium` (apply the concept), 30% `hard`
  (tricky, multi-concept, output prediction).
- Use all question types: conceptual; «خروجی کد زیر چیست؟»; «کدام خط خطا می‌دهد؟»;
  «کدام گزینه صحیح/نادرست است؟»; fill-in-the-blank («در جای خالی کدام گزینه قرار می‌گیرد؟»).
- Distractors must be plausible misconceptions. Avoid «همه‌ی موارد» / «هیچ‌کدام» unless unavoidable.
- Spread the correct answers roughly evenly over options 1–4.
- State the environment when it matters («در مرورگر»، «در Node.js»، «در حالت strict»).
- Put code in `code:` (or `files:` / `html:`) rather than inside the stem, so it is highlighted and
  verified. Short expressions may appear inline in the stem when a `value`/`claims` check verifies
  them.
- `explain` (Persian): why the correct option is right **and** why each tempting wrong option is
  wrong (2–6 sentences; code allowed).

### 4.2 Question fields

| Field | Meaning |
|---|---|
| `level` | `easy` \| `medium` \| `hard` (rendered as آسان / متوسط / سخت) |
| `stem` | Markdown question text |
| `code` | Code shown under the stem (JS by default; TS for TS checks; override with `lang`) |
| `lang` | `js`, `ts`, `html`, `json`, `bash`, `text` |
| `lines` | `true` to show line numbers (automatic for `error-line` / `tsc-line`) |
| `files` / `entry` | Multi-file code: mapping `name -> source`; `entry` is the file to run |
| `html` | HTML for `dom-output` questions (shown unless `showHtml: false`) |
| `options` | 4 items: a Markdown string, or an object (fields depend on the check) |
| `answer` | 1–4 |
| `check` | How the answer is verified (section 4.3); omit for pure concept questions |
| `manual` | Required when code is shown but no automatic check is possible: the reason |
| `explain` | Markdown explanation for the answer key |
| `columns` | Force 1, 2 or 4 option columns (normally automatic) |

Option objects may contain `text` (displayed Markdown). If `text` is omitted the option is
displayed from its check field: `out` as console-line chips, `line` as «خط N», `code` as code.

### 4.3 Automatic checks (mandatory for every answer that depends on running code)

| `check` | Inputs | Each option needs | Passes when |
|---|---|---|---|
| `output` | `code` (or `files`+`entry`; `module: true` for ESM) | `out` | only the keyed option's `out` equals real stdout |
| `value` | `expr`, optional hidden `setup` | `value`, or `text` that is one inline-code literal | only the keyed literal equals the real value |
| `claims` | optional `setup`; `want: true` (default) or `false` | `text`, `expr`, `equals` | only the keyed claim is true (`want: true`) / false (`want: false`) |
| `error-line` | `code` (or `files`); optional `errorName` | `line` (0 = no error; `"file.js:3"` with `files`) | the first thrown error is on the keyed line |
| `option-output` | `expect`, optional `prelude` | `code` | only the keyed option's code prints `expect` |
| `option-throws` | optional `prelude`, `want: error` (default) or `ok`, `errorName` | `code` | only the keyed option throws / does not throw |
| `dom-output` | `html`, `code`, optional `events`, `after`, `dialogs`, `wait` | `out` | only the keyed `out` equals the console output in jsdom |
| `tsc-line` | `code` (or `files`) | `line` (0 = compiles) | the only line with tsc errors is the keyed line |
| `option-tsc` | optional `prelude`, `want: error` (default) or `ok` | `code` | only the keyed option fails / passes type-checking |
| `ts-output` | `code` (must compile without errors) | `out` | only the keyed `out` equals the program's stdout |
| *(none)* | — | — | concept question; needs `manual:` if code is shown |

`out` is a string or a list of lines: `out: ["51", "4"]`. An uncaught error is written as a last
line `"!! TypeError"` (rendered as «Uncaught TypeError»). No output at all is `out: ""`.

`value` literals use JS notation with **double-quoted** strings: `"51"`, `51`, `NaN`, `true`,
`undefined`, `null`, `10n`, `[1, 2]`, `{ a: 1 }`, `"!! TypeError"` (if evaluating throws).
Whitespace outside strings is ignored when comparing.

`events` (dom-output) is a list such as
`- { type: click, target: "#btn" }`, `- { type: input, target: "#name", value: "Ali" }`,
`- { type: submit, target: "form" }`, `- { type: keydown, target: "#box", key: "Enter" }`,
`- { type: change, target: "#agree", checked: true }`; add `times: 3` to repeat and
`reportDefault: true` to log `[default runs]` / `[default prevented]` after dispatch.
`after:` is JS evaluated in the page after the events (e.g. to log the final DOM state).
`eventsNote:` (Markdown) can describe the user's actions under the code.

### 4.4 Execution environment (know this to key answers correctly)

- `code` runs as a **CommonJS script in Node.js v24**, sloppy mode unless `"use strict"`:
  top-level `this` is `{}` (module.exports) and top-level `var` does **not** create a global
  property. A plain function call gets `this === globalThis` (sloppy) or `undefined` (strict).
  For browser-script semantics (top-level `var` → `window` property, top-level `this === window`)
  use `dom-output`. `module: true` runs the code as an ES module (strict, top-level `await`).
- `console.log` formatting is Node's: top-level strings print without quotes; strings inside
  arrays/objects use single quotes (`[ 'a', 'b' ]`); objects print as `{ a: 1 }`; `-0` prints `-0`.
  Spaces after `[`/`{` and before `]`/`}` are ignored when comparing, so write `['a', 'b']`.
  Node prints arrays with **more than 6 numbers** in columns over several lines and objects
  nested deeper than 2 levels as `[Object]`; keep printed arrays short or print
  `arr.join(", ")` / `JSON.stringify(x)`.
- An uncaught synchronous error stops the script; async callbacks that already ran keep their
  output. Unhandled Promise rejections crash Node (`!! Error`, or `!! UnhandledPromiseRejection`
  for non-Error reasons).
- `dom-output` runs in **jsdom** like a classic browser script. `alert` logs `[alert] msg`;
  `confirm` logs `[confirm] msg` and returns `dialogs.confirm` (default `true`); `prompt` logs
  `[prompt] msg` and returns `dialogs.prompt` (default `null`). Layout numbers (`innerWidth`,
  `offsetHeight`, …) are not realistic in jsdom. `localStorage`/`sessionStorage` work. Do not log
  DOM nodes directly; log `tagName`, `id`, `textContent`, `className`, `length`, ….
- TypeScript checks use `tsc` 7 with `--strict --target es2022 --module nodenext --lib es2022,dom`.
  When a snippet has no `import`/`export`, `export {}` is appended (each snippet is a module);
  line numbers refer to your lines. Some errors are reported on two lines (e.g. a redeclaration);
  design `tsc-line` questions so that exactly one line is reported.

### 4.5 Example

```yaml
  - level: medium
    stem: خروجی کد زیر کدام است؟
    check: output
    code: |
      console.log(1 + 2 + "3");
      console.log("10" - 5 * "2");
    options:
      - out: ["33", "0"]
      - out: ["123", "0"]
      - out: ["33", "10"]
      - out: ["123", "!! TypeError"]
    answer: 1
    explain: |
      ارزیابی از چپ به راست است: `1 + 2` می‌شود `3` و `3 + "3"` می‌شود `"33"`. در خط دوم ضرب
      اولویت دارد: `5 * "2"` برابر `10` و `"10" - 10` برابر `0`. گزینه‌ی ۲ فرض کرده رشته از ابتدا
      ساخته می‌شود و گزینه‌ی ۴ فکر کرده تفریق رشته خطا می‌دهد، در حالی که فقط به عدد تبدیل می‌شود.
```

## 5. Commands

```bash
npm run verify                                   # validate + verify every question
npm run verify -- book/content/ch1/07-coercion   # only files whose path contains the text
npm run build -- --skip-verify --html-only       # quick draft HTML in output/
npm run build                                    # verify, then HTML + PDF
npm run check                                    # slide-concept coverage report
```
