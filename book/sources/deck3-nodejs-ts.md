# Deck 3 transcript — "5- NodeJS & TS.pdf" (on-slide title: "Beyond JavaScript")

- Course: Web Programming, CE 40419, Sharif University of Technology, Fall 2026. Instructor: Ali Abrishami.
- 25 pages, 16:9 (720 x 405 pt). All 25 page images were viewed; the code windows (p19–p22), the meme (p7) and the logos (p13) were also re-rendered at 300 DPI and checked.
- Layout on every slide: a grey header bar with "▶ Web Programming" on the left and "Fall - 2026" on the right (p1 also shows "CE 40419  Sharif University of Technology"; **p15 shows "Fall -2025"**). The page number is at the bottom right. Bullet text sits inside a white "window" card with red/yellow/green dots (macOS-style window chrome, decorative only).
- Conventions used below: **bold** = bold on the slide; `code` = green monospace inline code on the slide. Code windows (p19–p22) are dark-themed editor screenshots, each labelled with the file name `weee.ts`.
- Verification environment: Node.js v24.22.2, npm 11.19.1, TypeScript 7.0.2 (`/tmp/work/tools/node_modules/.bin/tsc`).
  - Type-check: `tsc --noEmit --strict --target es2022 --module esnext <file>` (plus `--pretty false` for one-line diagnostics).
  - Compile and run: `tsc --strict --target es2022 --module esnext --outDir <dir> <file> && node <dir>/<file>.js`. No flag changes were needed for the slide code. Files without import/export are compiled as plain scripts, which Node runs directly.
  - Inferred types were read from declaration output (`--declaration --emitDeclarationOnly`).
  - Verbatim slide code is in `/tmp/work/scratch-deck3/slide/`. Supplementary checks are in `/tmp/work/scratch-deck3/checks/` and are **not on the slides**. They were written to verify the slides' bullet claims and are labelled "Supplementary" below.
- Pages whose key content is image-only: **p6** (the whole Node.js feature chart, with no text layer), **p7** (meme), **p19, p20, p21, p22** (all code). Minor image-only content: logos on p5 (Node.js), p9 (npm) and p13 (Express, React, Lodash, Socket.io).

---

## Page 1 — Beyond JavaScript (title slide)
**Text:** Header: "Web Programming | CE 40419 | Sharif University of Technology | Fall - 2026". Title: "Beyond JavaScript". Instructor: "Ali Abrishami". Page number 1.
**Image content:** none (decorative only). It shows a grid drawing with a yellow rectangle, a blue right triangle and a coral circle.
**Verified behaviour:** n/a
**Notes:** The file is named "5- NodeJS & TS", but the slide title is "Beyond JavaScript". Part 1 (p3–p14) covers Node.js, npm and packages. Part 2 (p15–p24) covers TypeScript.

## Page 2 — In This Lecture You Will…
**Text:** Three cards:
- a — "Make console applications with JS"
- b — "Learn how JS runs on servers"
- c — "Solve the old JS typing issues"
**Image content:** none (decorative only). The cards are coral (a), yellow (b) and green (c). Each has a pixel-art letter "a"/"b"/"c" on a small grid inside a mock window. All of the words are in the text layer.
**Verified behaviour:** n/a
**Notes:** These are the three learning goals: console apps with Node.js, server-side JS, and TypeScript as the fix for JS typing problems.

## Page 3 — Limitations of JavaScript
**Text:**
- Originally designed for simple browser interactions, not **full-scale applications** or **backend logic**.
- **Single-threaded** execution caused blocking issues during heavy computations or I/O operations.
- **Dynamic typing** led to unpredictable runtime errors and maintenance challenges in large projects.
- Early JavaScript lacked a proper **module system**, making code organization and reuse difficult.
- Limited tooling and poor scalability made building and maintaining complex applications hard.
**Image content:** none (decorative only)
**Verified behaviour:** n/a
**Notes:** Five limitations: browser-only origins, single thread blocking on heavy CPU or I/O work, dynamic typing, no module system, and weak tooling and scalability. Later slides answer each one: Node.js (p5–p7), npm and modules (p9–p12, p23) and TypeScript (p16–p24).

## Page 4 — Inception
**Text:**
- Developers wanted to reuse JavaScript skills beyond the browser, especially for **backend** logic.
- Web apps grew more dynamic, and client–server data exchange needed faster, unified handling.
- The rise of AJAX and JSON showed JS could efficiently handle **asynchronous** operations.
- **Engine improvements** like Google’s V8 made JavaScript fast enough for server workloads.
- This shift inspired the idea of running JS outside the browser, starting the move toward **server-side** JavaScript.
**Image content:** none (decorative only)
**Verified behaviour:** n/a
**Notes:** This is the motivation for Node.js: AJAX and JSON, asynchronous handling, and the V8 engine led to server-side JS.

## Page 5 — Then Came Node.js
**Text:**
- Powered by Google’s fast **V8 engine**.
- **Event-driven**, **non-blocking** I/O model.
- Same language for frontend and backend.
- Massive **npm ecosystem** for packages.
- Turned JavaScript into a **full platform**.
**Image content:** The Node.js logo: a green hexagon with the word "node", where the "o" is a white hexagon and the "d" and "e" contain small hexagons. It carries no other information.
**Verified behaviour:** n/a
**Notes:** —

## Page 6 — Node.js Features
**Text:** Title only. The text layer contains nothing else.
**Image content (IMAGE-ONLY):** A chart with a central white circle holding the Node.js logo ("node" wordmark plus a green hexagon "JS" badge with ™). Eight coloured label bars are arranged around it, four on each side:

| Row | Left column | Right column | Bar colour |
|---|---|---|---|
| 1 | **Fast Data Streaming** | **Single - Threaded** | pale yellow |
| 2 | **Highly Scalable** | **Event - Driven** | pink |
| 3 | **JavaScript** | **No Buffering** | pale green |
| 4 | **Cross - Platform Compatibility** | **Asynchronous** | lavender |

The eight normalised features are: Fast Data Streaming, Highly Scalable, JavaScript, Cross-Platform Compatibility, Single-Threaded, Event-Driven, No Buffering and Asynchronous.
**Verified behaviour:** n/a
**Notes:** The slide gives only the labels, with no explanations. Background (not on the slide) using the standard meanings from the usual "Features of Node.js" lists:
- **Asynchronous / Event-Driven:** APIs are non-blocking. The server does not wait for an operation to finish; it moves on and is notified through events and callbacks when the result is ready.
- **Single-Threaded:** JS runs on one main thread with an event loop, and non-blocking I/O lets that one thread serve many concurrent requests.
- **Highly Scalable:** follows from the event-driven, non-blocking design.
- **No Buffering:** applications output data in chunks (streams) rather than buffering it all first.
- **Fast Data Streaming:** V8 makes execution fast, and data is processed as streams of chunks.
- **Cross-Platform:** runs on Windows, Linux and macOS.
- **JavaScript:** the same language as the browser.

## Page 7 — Node.js Features (cont.)
**Text:**
- Built on **async/await** for cleaner, modern concurrency.
- Uses **ES** modules and import/export syntax natively.
- Embraces TypeScript, ESM, and modern tooling by default.
- Supports powerful frameworks like Express, NestJS, and Fastify.
- Integrates seamlessly with containers, cloud, and edge runtimes.
**Image content (IMAGE-ONLY meme):** The caption at the top reads "JavaScript programming". The photo shows a man wearing an enormous camouflage military backpack that is almost as big as he is. The label on the man reads "app 300kb" and the label on the backpack reads "Node_modules, 12GB". A store sign "GEA… & GE…" is cut off in the background and is irrelevant.
**Verified behaviour:** Node v24.22.2 ran the p20 TypeScript file directly (`node slide/p20_functions.ts`, using Node's built-in type stripping). It printed the same output as the compiled JS, `{ name: 'Alice', age: 30, hobbies: [ 'Reading', 'Cycling' ] }`, with no warning on stderr. This illustrates "Embraces TypeScript … by default". (This is an environment check, not slide content.)
**Notes:** The meme jokes that a project's own code is tiny compared with its installed dependencies folder, `node_modules`, which the meme writes as "Node_modules". It ties to "dependency overload" on p8 and "size" on p9. ESM = ECMAScript Modules.

## Page 8 — External Packages
**Text:**
- Open-source community began sharing **reusable** JS libraries.
- Developers could import external code instead of reinventing features.
- Enabled rapid development through **modular building blocks**.
- Popular libraries shaped best practices and common patterns.
- Also raised issues of trust, maintenance, and dependency overload.
**Image content:** none (decorative only)
**Verified behaviour:** n/a
**Notes:** Pros: reuse, speed and shared patterns. Cons: trust, maintenance and dependency overload.

## Page 9 — NPM (Node Package Manager)
**Text:**
- Introduced a **central registry** to manage and distribute packages.
- Made installing and updating dependencies effortless.
- Standardized project setup with `package.json`.
- Fueled explosive growth of the JavaScript ecosystem.
- Later faced challenges with security, size, and version chaos.
**Image content:** The npm logo: white "npm" letters on a red background. It carries no other information.
**Verified behaviour:** See p10 and p11.
**Notes:** NPM = **Node Package Manager**.

## Page 10 — NPM Commands
**Text:** (all commands are green monospace on the slide)
- `npm init`: Create a new project and generate a package.json file.
- `npm install <package>`: Add a dependency to your project.
- `npm uninstall <package>`: Remove a previously installed package.
- `npm update`: Update all dependencies to newer versions.
- `npm run <script>`: Execute custom scripts defined in package.json.

**Setting npm mirror:** (bold heading on the slide)
- `npm config set registry <url>` (or set it in .npmrc file)
- `npm config get registry`

**Image content:** none (decorative only). All of the commands are in the text layer.
**Verified behaviour:** Run with npm 11.19.1 in scratch folders, with npm's cache and logs pointed at the scratch directory.
- `npm init -y` (`-y` accepts all defaults; plain `npm init` asks questions interactively) wrote this `package.json`:
```json
{
  "name": "npmtest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs"
}
```
  The `name` defaults to the folder name. Recent npm versions also add `"type": "commonjs"`.
- `npm install is-number` printed `added 1 package …`. It added the following to package.json and created `node_modules/is-number` and `package-lock.json`:
```json
  "dependencies": {
    "is-number": "^7.0.0"
  }
```
  The caret `^` range is npm's default when saving.
- `npm update` printed `up to date …`.
- `npm uninstall is-number` printed `removed 1 package …` and removed the `dependencies` entry from package.json.
- `npm config get registry` with empty user and global config printed `https://registry.npmjs.org/`, the default public registry.
- `npm config set registry https://registry.npmmirror.com/` (aimed at a scratch user config with `--userconfig`) wrote exactly one line to that npmrc file: `registry=https://registry.npmmirror.com/`. A following `npm config get registry` printed `https://registry.npmmirror.com/`.
- A project-level `.npmrc` containing `registry=https://mirror.example.com/` made `npm config get registry`, run in that folder, print `https://mirror.example.com/`. So `npm config set registry …` and a `registry=<url>` line in `.npmrc` are equivalent.

**Notes:** `<package>`, `<script>` and `<url>` are placeholders. A "mirror" is an alternative registry URL that npm downloads packages from.

## Page 11 — NPM Scripts
**Text:**
- Define custom commands in the scripts section of `package.json`.
- Run scripts with `npm run <script>` from the terminal.
- Can **automate tasks** like building, testing, or starting servers.
- Supports chaining commands and using environment variables.
- Widely used to **standardize project workflows** across teams.
**Image content:** none (decorative only). The deck contains **no** package.json example image.
**Verified behaviour:** Supplementary. The scratch file `/tmp/work/scratch-deck3/npmscripts/package.json` (not on the slide) contains:
```json
{
  "name": "scripts-demo",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js",
    "test": "echo running tests",
    "greet": "echo Hello from an npm script",
    "build": "echo step 1: clean && echo step 2: compile",
    "show-env": "node -e \"console.log(process.env.npm_package_name, process.env.npm_lifecycle_event, process.env.GREETING)\""
  }
}
```
`index.js` contains `console.log("index.js is running");`. The observed results were:
- `npm run` with no name lists the scripts, split into "Lifecycle scripts included in scripts-demo@1.0.0:" (`start`, `test`) and "available via `npm run`:" (`greet`, `build`, `show-env`).
- `npm run greet` printed:
```text
> scripts-demo@1.0.0 greet
> echo Hello from an npm script

Hello from an npm script
```
- `npm start` printed the header and then `index.js is running`. `npm test` printed `running tests`. `start` and `test` work **without** `run`.
- `npm greet` failed with `Unknown command: "greet"` and the hint `Did you mean this? npm run greet`. Custom scripts need `npm run`.
- Chaining: `npm run build` printed `step 1: clean` and then `step 2: compile`, joined with `&&`.
- Environment variables: `GREETING=salam npm run show-env` printed `scripts-demo show-env salam`. npm also injects variables such as `npm_package_name` and `npm_lifecycle_event`.
- `npm run deploy` (not defined) printed `npm error Missing script: "deploy"` and exited with code 1.
- `npm run greet --silent` printed only `Hello from an npm script`, without the `>` header lines.

The default `test` script from `npm init` (`echo "Error: no test specified" && exit 1`) is itself an example of `&&` chaining.
**Notes:** —

## Page 12 — Bundling for Browsers
**Text:**
- Combines multiple JS files into **a single output** for browsers.
- Reduces HTTP requests and improves load performance.
- Handles module resolution, imports, and exports automatically.
- Often includes **optimizations** like minification and tree-shaking.
- Popular tools: Webpack, Rollup, and Parcel.
**Image content:** none (decorative only)
**Verified behaviour:** n/a
**Notes:** Background (not on the slide):
- **Minification:** strips whitespace and comments and shortens names to make the file smaller.
- **Tree-shaking:** removes unused (dead) code and exports from the bundle. It relies on static ES `import`/`export`.

## Page 13 — Popular Packages
**Text:**
- **Express**: minimalist web framework for building APIs and servers.
- **React**: library for building interactive UIs with components.
- **Lodash**: utility functions for arrays, objects, and more.
- **Axios**: promise-based HTTP client for API requests.
- **Socket.io**: real-time bidirectional communication for web apps.
**Image content:** Logos only:
- the "Express" wordmark (thin font) next to a yellow square with "JS";
- the React atom logo (cyan);
- the Lodash "Lo" logo with a blue underline;
- the socket.io logo (a lightning bolt in a circle with "socket.io").

There is no Axios logo.
**Verified behaviour:** n/a
**Notes:** —

## Page 14 — Popular Packages (cont.)
**Text:**
- **Moment.js / Day.js**: date and time manipulation utilities.
- **Jest**: testing framework for JavaScript and Node.js.
- **Three.js**: 3D graphics and animations in the browser.
- **Chalk**: style and colorize terminal output.
- **Electron**: build cross-platform desktop apps with web technologies.
**Image content:** none (decorative only)
**Verified behaviour:** n/a
**Notes:** "(cont.)" is set in a smaller font in the title.

## Page 15 — TypeScript (section divider)
**Text:** "TypeScript" (large, centred). The header reads "Fall -2025", unlike "Fall - 2026" on every other slide.
**Image content:** none (decorative only)
**Verified behaviour:** n/a
**Notes:** This marks the start of the TypeScript part (p16–p24).

## Page 16 — JS Typing Issues
**Text:**
- JavaScript is **dynamically typed**, so variables can change type at runtime.
- **Type coercion** can lead to unexpected results (e.g., `"5" + 2 → "52"`).
- Harder to maintain large codebases due to hidden type bugs.
- Lacks **compile-time checks**, so many errors appear only during execution.
- Inconsistent behavior across engines and versions can introduce subtle bugs.
**Image content:** none (decorative only). The example `"5" + 2 → "52"` is green monospace in the text layer.
**Verified behaviour:**
- `node`: `console.log("5" + 2);` printed `52`. Supplementary: `typeof ("5" + 2)` is `"string"`.
- Supplementary (`checks/p16_ts_coercion.ts`), showing how TypeScript treats the same example:
```ts
// How TypeScript treats the slide's coercion example
const a = "5" + 2;
const b = "5" - 2;
let c: number = "5" + 2;
export {};
```
  - Line 2 is **allowed** with type `string`. TypeScript does **not** flag string + number concatenation.
  - Line 3 gives `error TS2362: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.`
  - Line 4 gives `error TS2322: Type 'string' is not assignable to type 'number'.`

**Notes:** `→` on the slide means "evaluates to".

## Page 17 — TypeScript
**Text:**
- Created by Microsoft in 2012.
- Anders Hejlsberg, lead architect of C# and Delphi, led its design.
- Developed to add **static typing and tooling** to JavaScript for large-scale projects.
- Designed to be a **gradual, optional superset**. developers can adopt it incrementally.
  (Verbatim: the slide has a lowercase "developers" after the full stop.)
- Quickly gained popularity for enterprise applications and complex web apps.
- You write TypeScript → it becomes JavaScript → it runs anywhere JS runs.
**Image content:** none (decorative only)
**Verified behaviour:** TypeScript compiles to plain JavaScript and all types are erased. See the emitted JS on p18–p22: the interface-only file on p19 compiles to just `"use strict";`. `tsc` **still emits JS when there are type errors**, unless `noEmitOnError` is set. Compiling the error-laden `checks/p21_classes.ts` produced `p21_classes.js` with tsc exit code 2 (errors, outputs generated). With `--noEmit` and errors, the exit code was 1.
**Notes:** "Superset" means valid JS is (essentially) valid TS. "Gradual/optional" means you can add types file by file.

## Page 18 — Variables in TypeScript
**Text:**
- Use `let` and `const` like in JavaScript, but with optional type annotations.
- Example: `let age: number = 25;` ensures age is always a number.
- `const` creates immutable bindings, preventing reassignment.
- Supports union types: `let id: number | string;` can hold either type.
- TypeScript **infers types automatically** if not explicitly declared.
**Image content:** none (decorative only). The examples are inline green monospace in the text layer.
**Verified behaviour:**
- The slide examples (`slide/p18_inline.ts`: `let age: number = 25;` and `let id: number | string;`) type-check cleanly under `--strict`. The emitted JS is `"use strict"; let age = 25; let id;` and the declarations are `declare let age: number; declare let id: number | string;`.
- Supplementary (`checks/p18_vars.ts`), with diagnostics as `(line,col)`:
```ts
let age: number = 25;
age = 26;
age = "26";
const PI = 3.14;
PI = 3;
let id: number | string;
id = 101;
id = "A-101";
id = true;
let city = "Tehran";
city = 42;
const list = [1, 2];
list.push(3);
list = [4];
let later: number;
console.log(later);
export {};
```
  - (3,1) `age = "26";` gives `error TS2322: Type 'string' is not assignable to type 'number'.`
  - (5,1) `PI = 3;` gives `error TS2588: Cannot assign to 'PI' because it is a constant.`
  - Lines 7 and 8 are OK: a union variable accepts both a number and a string.
  - (9,1) `id = true;` gives `error TS2322: Type 'boolean' is not assignable to type 'string | number'.` TypeScript prints the union as `string | number`.
  - (11,1) `city = 42;` gives `error TS2322: Type 'number' is not assignable to type 'string'.` The type of `city` was inferred as `string`.
  - Line 13 `list.push(3);` is OK. `const` prevents reassignment, not mutation.
  - (14,1) `list = [4];` gives `error TS2588: Cannot assign to 'list' because it is a constant.`
  - (16,13) gives `error TS2454: Variable 'later' is used before being assigned.`
- Supplementary inference (`checks/p18_infer.ts`, from declaration output):

| Declaration | Inferred type |
|---|---|
| `let city = "Tehran"` | `string` |
| `const PI = 3.14` | `3.14` (literal type) |
| `const greeting = "hi"` | `"hi"` |
| `let flag = true` | `boolean` |
| `let nums = [1, 2, 3]` | `number[]` |
| `let mixed = [1, "a"]` | `(string \| number)[]` |
| `let nothing = null` | `null` (under strict) |
| `let id: number \| string = 7` | `number \| string` (the annotation wins) |

- Supplementary union usage (`checks/p18_union.ts`):
```ts
function show(id: number | string) {
  console.log(id.toUpperCase());
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  }
}
export {};
```
  - (2,18) gives `error TS2339: Property 'toUpperCase' does not exist on type 'string | number'. Property 'toUpperCase' does not exist on type 'number'.`
  - Line 4 is OK because `typeof` narrowing makes `id` a `string` there.

**Notes:** —

## Page 19 — Interfaces
**Text:**
- Define the **shape of an object**: what **properties** and **types** it must have.
- Can be implemented by classes to enforce structure.
- Supports optional and readonly properties for flexibility and safety.
- Can be extended to create more complex types from simpler ones.
**Image content (IMAGE-ONLY code window, file label `weee.ts`):**
```ts
interface User {
  id: number;
  name: string;
  email?: string;
}
```
**Verified behaviour:**
- `tsc --noEmit --strict` reports no errors. The compiled JS file contains only `"use strict";`: interfaces exist only at compile time and produce no JavaScript. There is no runtime output.
- Supplementary (`checks/p19_interfaces.ts`). Lines 1–5 are the slide's interface; the rest is:
```ts
const u1: User = { id: 1, name: "Ali" };                              // line 6: OK (email is optional)
const u2: User = { id: 2, name: "Sara", email: "sara@example.com" };  // line 7: OK
const u3: User = { name: "Reza" };                                    // line 8
const u4: User = { id: 4, name: "Mina", age: 20 };                    // line 9
const u5: User = { id: "5", name: "Navid" };                          // line 10
const len: number = u1.email.length;                                  // line 11
interface Point {
  readonly x: number;
  y: number;
}
const p: Point = { x: 1, y: 2 };
p.y = 20;                                                             // line 17: OK
p.x = 10;                                                             // line 18
interface Admin extends User {
  role: string;
}
const a1: Admin = { id: 6, name: "Neda", role: "owner" };             // line 22: OK
const a2: Admin = { id: 7, name: "Omid" };                            // line 23
class Customer implements User {                                      // line 24: OK (email may be omitted)
  id = 8;
  name = "Hamed";
}
class Broken implements User {                                        // line 28
  id = 9;
}
const extra = { id: 10, name: "Leila", age: 30 };
const u6: User = extra;                                               // line 32: OK (!)
export {};
```
  (The line-number comments were added here for reference; they are not in the checked file.)
  - (8,7) gives `error TS2741: Property 'id' is missing in type '{ name: string; }' but required in type 'User'.`
  - (9,41) gives `error TS2353: Object literal may only specify known properties, and 'age' does not exist in type 'User'.`
  - (10,20) gives `error TS2322: Type 'string' is not assignable to type 'number'.`
  - (11,21) gives `error TS18048: 'u1.email' is possibly 'undefined'.` An optional property has type `string | undefined`.
  - (18,3) gives `error TS2540: Cannot assign to 'x' because it is a read-only property.`
  - (23,7) gives `error TS2741: Property 'role' is missing in type '{ id: number; name: string; }' but required in type 'Admin'.`
  - (28,7) gives `error TS2420: Class 'Broken' incorrectly implements interface 'User'. Property 'name' is missing in type 'Broken' but required in type 'User'.`
  - Line 32 has **no error**. The excess-property check applies only to fresh object literals; a variable with extra properties is accepted (structural typing).

**Notes:** `?` marks an optional property. `readonly` is mentioned in the bullets but not shown in the slide code.

## Page 20 — Functions
**Text:**
- Functions have **typed parameters** and return values for safety.
- Can include optional and default parameters.
- Supports **rest** parameters for **variable-length** arguments.
- Arrow functions provide concise syntax with type inference.
**Image content (IMAGE-ONLY code window, file label `weee.ts`):**
```ts
function createUser(
  name: string,
  age: number,
  ...hobbies: string[]
): { name: string; age: number; hobbies: string[] } {
  return {
    name,
    age,
    hobbies,
  };
}

const user = createUser("Alice", 30, "Reading", "Cycling");
console.log(user);
```
The editor font draws the rest operator `...` as a tight ellipsis glyph; it is three ASCII dots. The return type is an inline object type with `;` separators. The returned object uses shorthand properties with a trailing comma.

**Verified behaviour:**
- `tsc --noEmit --strict` reports no errors.
- Emitted JS (types erased):
```js
"use strict";
function createUser(name, age, ...hobbies) {
    return {
        name,
        age,
        hobbies,
    };
}
const user = createUser("Alice", 30, "Reading", "Cycling");
console.log(user);
```
- Runtime output (compiled JS run by node, and identical with `node weee.ts` through Node 24 type stripping):
```text
{ name: 'Alice', age: 30, hobbies: [ 'Reading', 'Cycling' ] }
```
- Supplementary runtime (`checks/p20_runtime.ts`, not on the slide):

| Call | Output |
|---|---|
| `createUser("Bob", 25)` | `{ name: 'Bob', age: 25, hobbies: [] }` (no extra args gives an empty array) |
| `createUser("Alice", 30, "Reading", "Cycling").hobbies.length` | `2` |
| `greet("Ali")` with `` function greet(person: string, greeting?: string): string { return `${greeting ?? "Hello"}, ${person}`; } `` | `Hello, Ali` |
| `greet("Ali", "Salam")` | `Salam, Ali` |
| `greet2("Ali")` with `` function greet2(person: string, greeting = "Hi"): string { return `${greeting}, ${person}`; } `` | `Hi, Ali` |
| `greet2("Ali", undefined)` | `Hi, Ali` (`undefined` triggers the default) |
| `add(2, 3)` with `const add = (a: number, b: number) => a + b;` | `5` |

- Supplementary errors (`checks/p20_funcs.ts`). Lines 1–7 are `createUser` (same signature as the slide, with a one-line body), followed by:
```ts
createUser("Ali", 20);               // line 8: OK
createUser("Ali");                   // line 9
createUser("Ali", "20");             // line 10
createUser("Ali", 20, "Chess", 5);   // line 11
function greet(person: string, greeting?: string): string {
  return `${greeting ?? "Hello"}, ${person}`;
}
function greet2(person: string, greeting = "Hi"): string {
  return `${greeting}, ${person}`;
}
greet("Ali");                        // line 18: OK
greet2("Ali");                       // line 19: OK
greet2("Ali", 5);                    // line 20
const add = (a: number, b: number) => a + b;
const s: string = add(1, 2);         // line 22
function bad(x: number): string {
  return x;                          // line 24
}
function wrongOrder(a?: number, b: number) {}   // line 26
function noReturn(x: number): number {          // line 27
  if (x > 0) return x;
}
function untyped(x) {                // line 30
  return x;
}
export {};
```
  (The line-number comments were added here for reference.)
  - (9,1) gives `error TS2555: Expected at least 2 arguments, but got 1.`
  - (10,19) gives `error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.`
  - (11,32) gives `error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.` Every rest argument must be a string.
  - (20,15) gives `error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.` The default `"Hi"` makes the parameter's type `string`.
  - (22,7) gives `error TS2322: Type 'number' is not assignable to type 'string'.` The arrow function's return type was inferred as `number`.
  - (24,3) gives `error TS2322: Type 'number' is not assignable to type 'string'.`
  - (26,33) gives `error TS1016: A required parameter cannot follow an optional parameter.`
  - (27,31) gives `error TS2366: Function lacks ending return statement and return type does not include 'undefined'.`
  - (30,18) gives `error TS7006: Parameter 'x' implicitly has an 'any' type.` `--strict` turns on `noImplicitAny`.
  - `checks/p20_rest.ts`, `function badRest(...hobbies: string[], name: string) {}`, gives (1,18) `error TS1014: A rest parameter must be last in a parameter list.`

**Notes:** —

## Page 21 — Classes
**Text:**
- Support object-oriented programming with constructors, **properties**, and methods.
- Can **implement interfaces** to enforce structure.
- Supports inheritance with `extends` and method overriding.
- **Access modifiers** (`public`, `private`, `protected`) control property and method visibility.
**Image content (IMAGE-ONLY code window, file label `weee.ts`):**
```ts
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  greet() {
    console.log(`Hello, ${this.name}`);
  }
}
```
The caption box below the code (in the text layer) reads: **"Just like JS, but better!"**

**Verified behaviour:**
- `tsc --noEmit --strict` reports no errors.
- Emitted JS (ES2022 class field kept as `name;`):
```js
"use strict";
class Person {
    name;
    constructor(name) {
        this.name = name;
    }
    greet() {
        console.log(`Hello, ${this.name}`);
    }
}
```
- The slide code alone prints **nothing**: the class is never instantiated. A harness (`checks/p21_harness.ts`) that appends `const p = new Person("Alice"); p.greet();` prints `Hello, Alice`.
- Supplementary (`checks/p21_init.ts`): the same class **without** the constructor gives (2,3) `error TS2564: Property 'name' has no initializer and is not definitely assigned in the constructor.` This comes from `strictPropertyInitialization`, which `--strict` enables.
- Supplementary errors (`checks/p21_classes.ts`):
```ts
interface Greeter {
  greet(): void;
}
class Person implements Greeter {
  public name: string;
  private secret: string;
  protected age: number;
  constructor(name: string, secret: string, age: number) {
    this.name = name;
    this.secret = secret;
    this.age = age;
  }
  greet() {
    console.log(`Hello, ${this.name}`);
  }
}
class Student extends Person {
  school: string;
  constructor(name: string, age: number, school: string) {
    super(name, "hidden", age);
    this.school = school;
  }
  greet() {
    console.log(`Hi, I am ${this.name} (${this.age}) from ${this.school}`);
  }
  leak() {
    return this.secret;
  }
}
const p = new Person("Ali", "s3cr3t", 30);
console.log(p.name);
console.log(p.secret);
console.log(p.age);
class Silent implements Greeter {}
class Child extends Person {
  constructor() {
    this.name = "x";
  }
}
export {};
```
  - Line 24 is OK: a `protected` member (`this.age`) is accessible in a subclass.
  - Line 31 `p.name` is OK because it is `public`.
  - (27,17) `return this.secret;` inside the subclass gives `error TS2341: Property 'secret' is private and only accessible within class 'Person'.`
  - (32,15) `p.secret` gives `error TS2341: Property 'secret' is private and only accessible within class 'Person'.`
  - (33,15) `p.age` gives `error TS2445: Property 'age' is protected and only accessible within class 'Person' and its subclasses.`
  - (34,7) gives `error TS2420: Class 'Silent' incorrectly implements interface 'Greeter'. Property 'greet' is missing in type 'Silent' but required in type 'Greeter'.`
  - (36,3) gives `error TS2377: Constructors for derived classes must contain a 'super' call.`
  - (37,5) gives `error TS17009: 'super' must be called before accessing 'this' in the constructor of a derived class.`
- Supplementary runtime (`checks/p21_runtime.ts`, compiles cleanly). It uses the same `Person`/`Student` without the error lines, plus:
```ts
const people: Person[] = [new Person("Ali", "s3cr3t", 30), new Student("Sara", 20, "Sharif")];
for (const x of people) x.greet();
console.log(people[1] instanceof Person);
// @ts-expect-error private is enforced only at compile time
console.log(people[0].secret);
```
  It printed:
```text
Hello, Ali
Hi, I am Sara (20) from Sharif
true
s3cr3t
```
  The overridden `greet` runs for the `Student`, and a `Student` is an `instanceof Person`. TypeScript's `private` is a **compile-time** check only: the JS object still has the property at runtime.

**Notes:** The caption is "Just like JS, but better!". Members are `public` by default.

## Page 22 — Generics
**Text:**
- Allow creating reusable, type-safe components or functions.
- Can be applied to functions, classes, and interfaces.
- Provide flexibility while still enforcing type safety.
- Prevents code duplication by working with any data type without losing type checking.
**Image content (IMAGE-ONLY code window, file label `weee.ts`):**
```ts
function identity<T>(value: T): T
{
  return value;
}

let num = identity<number>(42);
let str = identity<string>("Hello");
```
The opening `{` is on its own line, as on the slide. The caption box below (in the text layer) reads: **"You remember generic from Java, right?"**

**Verified behaviour:**
- `tsc --noEmit --strict` reports no errors.
- Emitted JS (generics erased):
```js
"use strict";
function identity(value) {
    return value;
}
let num = identity(42);
let str = identity("Hello");
```
- The declaration output gives `declare function identity<T>(value: T): T; declare let num: number; declare let str: string;`.
- The slide code alone prints **nothing**. A harness (`checks/p22_runtime.ts`) that appends `console.log(num, str, typeof num, typeof str);` prints `42 Hello number string`.
- Supplementary errors (`checks/p22_generics.ts`, which starts with the slide's `identity`, `num` and `str` on lines 1–6):
  - (7,30) `let wrong = identity<number>("Hello");` gives `error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.`
  - (8,1) `num = str;` gives `error TS2322: Type 'string' is not assignable to type 'number'.`
  - Generic interface: `interface Pair<K, V> { key: K; value: V; }`. `const pr1: Pair<string, number> = { key: "age", value: 30 };` is OK. (14,49) `const pr2: Pair<string, number> = { key: "age", value: "30" };` gives `error TS2322: Type 'string' is not assignable to type 'number'.`
  - Generic class: `class Box<T> { content: T; constructor(content: T) { this.content = content; } get(): T { return this.content; } }`. With `const b1 = new Box<string>("hi");`, (25,7) `const n1: number = b1.get();` gives `error TS2322: Type 'string' is not assignable to type 'number'.`
- Supplementary inference without explicit type arguments (`checks/p22_infer.ts`, from declaration output):

| Declaration | Inferred type |
|---|---|
| `let a = identity(42)` | `number` |
| `const b = identity(42)` | `42` |
| `let c = identity("Hello")` | `string` |
| `const d = identity("Hello")` | `"Hello"` |
| `let e = identity(true)` | `boolean` |
| `let f = identity([1, 2])` | `number[]` |
| `let g = identity<number \| string>(5)` | `string \| number` |
| `let h = firstItem([10, 20])` with `function firstItem<T>(items: T[]): T \| undefined` | `number \| undefined` |
| `let i = firstItem(["x", "y"])` | `string \| undefined` |

**Notes:** The caption is "You remember generic from Java, right?". `T` is a type parameter, and `<number>`/`<string>` are explicit type arguments that can be omitted because TypeScript infers them.

## Page 23 — Modules
**Text:**
- A module is simply a **file** that has imports or exports.
- TypeScript (and modern JavaScript) uses the ES module system.
- Each file is its own **private** scope.
- You make things visible to other files using **export.**
- You use code from other files using **import.**
- **Types of Exports:** Named Exports, Default Export, Mixed Exports
**Image content:** none (decorative only). There is no code on this slide.
**Verified behaviour:** Supplementary only (`checks/mod/`, `checks/scope/`).
- Example modules:
```ts
// math.ts — Named exports
export const PI = 3.14;
export function add(a: number, b: number): number {
  return a + b;
}
const secret = 42; // not exported: private to this file
export function useSecret(): number {
  return secret;
}
```
```ts
// logger.ts — Default export
export default function log(message: string): void {
  console.log(`[LOG] ${message}`);
}
```
```ts
// shapes.ts — Mixed exports: one default export plus named exports
export default class Circle {
  radius: number;
  constructor(radius: number) {
    this.radius = radius;
  }
}
export function area(c: Circle): number {
  return Math.round(Math.PI * c.radius * c.radius);
}
```
```ts
// main.ts
import { PI, add, useSecret } from "./math.js";
import log from "./logger.js";
import Circle, { area } from "./shapes.js";
import * as MathUtils from "./math.js";
import { add as sum } from "./math.js";
import printer from "./logger.js";

log(`PI = ${PI}`);
log(`add(2, 3) = ${add(2, 3)}`);
log(`sum(4, 5) = ${sum(4, 5)}`);
log(`MathUtils.PI = ${MathUtils.PI}`);
log(`useSecret() = ${useSecret()}`);
log(`area = ${area(new Circle(2))}`);
printer("default import can use any name");
```
- The modules were compiled with the same flags. The import specifiers use `.js` extensions, which resolve to the `.ts` sources. `{"type":"module"}` was added to the output folder so that Node runs the files as ESM. `node out/mod/main.js` printed:
```text
[LOG] PI = 3.14
[LOG] add(2, 3) = 5
[LOG] sum(4, 5) = 9
[LOG] MathUtils.PI = 3.14
[LOG] useSecret() = 42
[LOG] area = 13
[LOG] default import can use any name
```
  The emitted `main.js` keeps the `import` lines unchanged under `--module esnext`.
- Import mistakes (`checks/mod/errors.ts`):
  - (1,10) `import { secret } from "./math.js";` gives `error TS2459: Module '"./math.js"' declares 'secret' locally, but it is not exported.`
  - (2,10) `import { log } from "./logger.js";` (a default export imported with braces) gives `error TS2614: Module '"./logger.js"' has no exported member 'log'. Did you mean to use 'import log from "./logger.js"' instead?`
  - (3,10) `import { missing } from "./math.js";` gives `error TS2305: Module '"./math.js"' has no exported member 'missing'.`
  - `import Circle from "./shapes.js";` (the default from a mixed module) is OK.
- Script vs module ("a module is a file that has imports or exports"):
  - Two files, each containing only `let counter = …;`, compiled together give `error TS2451: Cannot redeclare block-scoped variable 'counter'.` in **both** files (scripts share one global scope).
  - Adding `export {};` to each file makes them modules, and the same compile has **no** errors because each module has its own private scope.

**Notes:** The three export types are named exports (many per file; imported with `{ }` using the exact name, renamable with `as`), a default export (one per file; imported without braces under any name) and mixed exports (default plus named in one file: `import Def, { named } from …`). There is also `import * as NS from …`.

## Page 24 — Best Practices
**Text:**
- Use **interfaces** to define contracts for classes and objects.
- Prefer `readonly` and `private` for encapsulation and immutability.
- Use inheritance sparingly; prefer composition when possible.
- Leverage generics for reusable, type-safe code.
- Keep classes small and focused; follow the Single Responsibility Principle (SRP).
**Image content:** none (decorative only)
**Verified behaviour:** The behaviour of `readonly` (TS2540) and `private` (TS2341, compile-time only) is verified on p19 and p21.
**Notes:** Composition means building objects from other objects ("has-a") instead of inheriting from them ("is-a"). This background is not on the slide.

## Page 25 — References
**Text:** (pink underlined links)
- https://nodejs.org/learn/getting-started/introduction-to-nodejs
- https://nodejs.org/learn/getting-started/an-introduction-to-the-npm-package-manager
- https://www.typescripttutorial.net/
**Image content:** none (decorative only)
**Verified behaviour:** n/a
**Notes:** —

---

## Concept inventory
(In slide order, deduplicated. "img" marks content that is only in an image.)

- p1: Lecture title "Beyond JavaScript"; instructor Ali Abrishami; Web Programming CE 40419, Sharif University of Technology, Fall 2026.
- p2: Lecture goals:
  - (a) make console applications with JS;
  - (b) learn how JS runs on servers;
  - (c) solve the old JS typing issues.
- p3: Limitations of JavaScript:
  - originally designed for simple browser interactions, not full-scale applications or backend logic;
  - single-threaded execution, which blocks during heavy computations or I/O operations;
  - dynamic typing, which causes unpredictable runtime errors and maintenance problems in large projects;
  - early JS lacked a proper module system, making code organization and reuse hard;
  - limited tooling and poor scalability.
- p4: Inception of server-side JS:
  - reuse JS skills beyond the browser, especially for backend logic;
  - dynamic web apps needed faster, unified client–server data exchange;
  - the rise of AJAX and JSON showed JS can handle asynchronous operations efficiently;
  - engine improvements (Google's V8) made JS fast enough for servers;
  - which led to running JS outside the browser: server-side JavaScript.
- p5: Node.js:
  - powered by Google's V8 engine;
  - event-driven, non-blocking I/O model;
  - same language for frontend and backend;
  - massive npm ecosystem;
  - turned JS into a full platform.
- p6 (img): Node.js features chart: Fast Data Streaming; Highly Scalable; JavaScript; Cross-Platform Compatibility; Single-Threaded; Event-Driven; No Buffering; Asynchronous.
- p7: Node.js features (cont.):
  - built on async/await for modern concurrency;
  - ES modules with native import/export syntax (ESM);
  - embraces TypeScript, ESM and modern tooling by default;
  - frameworks: Express, NestJS, Fastify;
  - integrates with containers, cloud and edge runtimes.
- p7 (img): Meme "JavaScript programming": "app 300kb" vs "Node_modules, 12GB" (`node_modules` dependency bloat).
- p8: External packages:
  - the open-source community shares reusable JS libraries;
  - import external code instead of reinventing it;
  - rapid development through modular building blocks;
  - popular libraries shaped best practices and patterns;
  - downsides: trust, maintenance, dependency overload.
- p9: NPM = Node Package Manager:
  - central registry to manage and distribute packages;
  - effortless installing and updating of dependencies;
  - standardized project setup with `package.json`;
  - fueled ecosystem growth;
  - later challenges: security, size, version chaos.
- p10: `npm init` creates a new project and generates package.json (`-y` accepts defaults; verified default fields: name, version "1.0.0", description, main "index.js", scripts.test, keywords, author, license "ISC", type "commonjs").
- p10: `npm install <package>` adds a dependency (verified: `"dependencies": { "<pkg>": "^x.y.z" }`, plus `node_modules/` and `package-lock.json`).
- p10: `npm uninstall <package>` removes a previously installed package (verified: the entry is removed from dependencies).
- p10: `npm update` updates all dependencies to newer versions.
- p10: `npm run <script>` executes custom scripts defined in package.json.
- p10: Setting an npm mirror:
  - `npm config set registry <url>`, or set it in a `.npmrc` file (verified: writes the line `registry=<url>`; a project `.npmrc` line works the same);
  - `npm config get registry` (verified default: `https://registry.npmjs.org/`).
- p11: NPM scripts:
  - defined in the `scripts` section of package.json;
  - run with `npm run <script>`;
  - automate tasks such as building, testing and starting servers;
  - support chaining commands (`&&`) and environment variables;
  - standardize project workflows across teams.
- p11 (verified, not on the slide):
  - `npm start` and `npm test` work without `run`, but `npm <custom>` gives "Unknown command";
  - `npm run` alone lists the scripts;
  - a missing script gives `Missing script: "<name>"`;
  - npm injects env vars `npm_package_name` and `npm_lifecycle_event`;
  - `--silent` hides the `>` header lines.
- p12: Bundling for browsers:
  - combines multiple JS files into a single output;
  - fewer HTTP requests and better load performance;
  - handles module resolution, imports and exports automatically;
  - optimizations: minification and tree-shaking;
  - tools: Webpack, Rollup, Parcel.
- p13: Popular packages:
  - Express = minimalist web framework for APIs and servers;
  - React = library for interactive UIs with components;
  - Lodash = utility functions for arrays, objects and more;
  - Axios = promise-based HTTP client for API requests;
  - Socket.io = real-time bidirectional communication for web apps.
  - (img: logos of Express, React, Lodash, socket.io.)
- p14: Popular packages (cont.):
  - Moment.js / Day.js = date and time manipulation;
  - Jest = testing framework for JS and Node.js;
  - Three.js = 3D graphics and animations in the browser;
  - Chalk = style and colorize terminal output;
  - Electron = cross-platform desktop apps with web technologies.
- p15: Section divider "TypeScript" (header says "Fall -2025").
- p16: JS typing issues:
  - dynamically typed (variables can change type at runtime);
  - type coercion surprises, e.g. `"5" + 2 → "52"` (verified in Node: prints `52`, a string; in TS `"5" + 2` is allowed with type string, but `"5" - 2` gives TS2362);
  - hidden type bugs make large codebases hard to maintain;
  - no compile-time checks (errors appear only at runtime);
  - inconsistent behaviour across engines and versions.
- p17: TypeScript:
  - created by Microsoft in 2012;
  - design led by Anders Hejlsberg (lead architect of C# and Delphi);
  - adds static typing and tooling to JS for large-scale projects;
  - a gradual, optional superset that can be adopted incrementally;
  - popular for enterprise and complex web apps;
  - TS is compiled to JS and runs anywhere JS runs (verified: types are erased; tsc still emits JS when there are type errors, with exit code 2, unless `noEmitOnError`).
- p18: Variables in TS:
  - `let`/`const` with optional type annotations;
  - `let age: number = 25;` (assigning a string gives TS2322);
  - `const` = immutable binding that prevents reassignment (TS2588), although contents such as array elements can still be mutated;
  - union types `let id: number | string;` (assigning a boolean gives TS2322; string-only methods need narrowing, otherwise TS2339);
  - automatic type inference (`let city = "Tehran"` is `string`; a `const` gets a literal type);
  - use before assignment gives TS2454.
- p19 (img code): Interfaces:
  - define the shape of an object (its properties and types);
  - can be implemented by classes (`implements`; a missing member gives TS2420);
  - optional properties `email?: string` (type `string | undefined`; possibly-undefined use gives TS18048) and `readonly` properties (assignment gives TS2540);
  - can be extended (`interface Admin extends User`);
  - slide example: `interface User { id: number; name: string; email?: string; }` in `weee.ts`;
  - a missing required property gives TS2741; an excess property in an object literal gives TS2353, but not for a non-fresh variable (structural typing); interfaces produce no JS.
- p20 (img code): Functions:
  - typed parameters and return values;
  - optional (`?`) and default parameters (a required parameter after an optional one gives TS1016);
  - rest parameters `...hobbies: string[]` for variable-length arguments (must be last, otherwise TS1014; zero extra arguments give `[]`);
  - arrow functions with type inference;
  - slide example `createUser(name, age, ...hobbies)` with an inline object return type `{ name: string; age: number; hobbies: string[] }` and shorthand properties;
  - output `{ name: 'Alice', age: 30, hobbies: [ 'Reading', 'Cycling' ] }`;
  - too few arguments give TS2555; a wrong argument type gives TS2345; an implicit any parameter under strict gives TS7006; a missing return gives TS2366.
- p21 (img code): Classes:
  - OOP with constructors, properties and methods;
  - implement interfaces;
  - inheritance with `extends` and method overriding (a derived constructor must call `super`, otherwise TS2377/TS17009);
  - access modifiers `public` (default), `private` (TS2341, compile-time only: still readable at runtime) and `protected` (accessible in subclasses, otherwise TS2445);
  - slide example `` class Person { name: string; constructor(name: string) {…} greet() { console.log(`Hello, ${this.name}`); } } `` (prints nothing by itself; `new Person("Alice").greet()` prints `Hello, Alice`);
  - an uninitialized property gives TS2564;
  - template literal `${}`;
  - caption "Just like JS, but better!".
- p22 (img code): Generics:
  - reusable, type-safe components and functions;
  - apply to functions, classes and interfaces;
  - flexibility plus type safety;
  - prevent code duplication without losing type checking;
  - slide example `function identity<T>(value: T): T { return value; }`, `identity<number>(42)` and `identity<string>("Hello")` (`num: number`, `str: string`; no output);
  - type parameter `T` and explicit type arguments; type arguments can be inferred (`let` widens to `number`, `const` keeps literal `42`);
  - a wrong argument for an explicit type argument gives TS2345;
  - caption "You remember generic from Java, right?".
- p23: Modules:
  - a module is a file with imports or exports (a file without them is a global script; verified with TS2451 redeclaration across scripts);
  - TS and modern JS use the ES module system;
  - each file has its own private scope;
  - `export` makes things visible to other files and `import` uses code from them;
  - types of exports: Named Exports, Default Export, Mixed Exports (verified syntax: `import { a, b }`, `import x from`, `import X, { y } from`, `import * as NS`, `import { a as b }`; errors TS2459, TS2614, TS2305).
- p24: Best practices:
  - interfaces as contracts for classes and objects;
  - prefer `readonly` and `private` (encapsulation and immutability);
  - use inheritance sparingly and prefer composition;
  - leverage generics for reusable, type-safe code;
  - keep classes small and focused (Single Responsibility Principle, SRP).
- p25: References: nodejs.org "Introduction to Node.js"; nodejs.org "An introduction to the npm package manager"; typescripttutorial.net.
