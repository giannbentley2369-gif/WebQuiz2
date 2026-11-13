# Web Programming Quiz Book (CE 40419)

A complete Persian (Farsi) study and test-prep book for the Web Programming course at Sharif
University of Technology, written in the style of Iranian Konkur test books. It covers the three
lecture slide decks in this repository:

1. `3- Introduction to JS.pdf` → Chapter 1 (JavaScript)
2. `4 - JS in HTML.pdf` → Chapter 2 (JavaScript in HTML / the DOM)
3. `5- NodeJS & TS.pdf` → Chapter 3 (Node.js, npm and TypeScript)

**The book:** [`output/WebProgramming_Quiz_Book.pdf`](output/WebProgramming_Quiz_Book.pdf)
(the self-contained HTML version is next to it).

Every lesson has a beginner-friendly Persian lesson (درسنامه) with "نکته" and "دام تستی" boxes,
followed by four-option practice questions labelled آسان / متوسط / سخت. Each chapter ends with a
review test, and the book ends with a fully explained answer key (پاسخنامه‌ی تشریحی) using the
same global question numbers.

## How correctness is guaranteed

Every question whose answer depends on running code declares an automatic check
(see [`book/CONTENT_GUIDE.md`](book/CONTENT_GUIDE.md)). `npm run verify` actually runs the code
(Node.js for JavaScript, jsdom for DOM code, `tsc --strict` for TypeScript) and fails unless the
keyed option is the **only** option that matches the real result.

## Building

Requirements: Node.js 20+ and Google Chrome or Chromium (found automatically, or set
`CHROME_PATH`).

```bash
npm ci
npm run verify   # run every code question and check the keys
npm run build    # verify, then write output/WebProgramming_Quiz_Book.{html,pdf}
npm run check    # slide-concept coverage + question/answer-key cross-check
```

`npm run build -- --skip-verify --html-only` gives a quick draft of the HTML.

## Layout

| Path | Contents |
|---|---|
| `book/content/book.yaml` | Book metadata and chapter list |
| `book/content/guide.md` | "How to use this book" and the 4-day study plan |
| `book/content/ch1..ch3/*.yaml` | One file per lesson (lesson + questions + explanations); `99-review.yaml` is the chapter review test |
| `book/sources/` | Slide transcripts (including image-only slide content) and the concept checklist |
| `book/scripts/` | `build.mjs` (HTML + two-pass PDF), `verify.mjs`, `check.mjs`, shared libraries |
| `book/styles/book.css` | Print stylesheet (RTL, Vazirmatn, LTR code blocks, page furniture) |
| `book/CONTENT_GUIDE.md` | Authoring rules and the verification contract |

The PDF is rendered with headless Chrome: Vazirmatn (Persian) and JetBrains Mono (code) are
embedded, the whole document is RTL while code is LTR with syntax highlighting, and the table of
contents is clickable with real page numbers (a second render pass fills them in).
