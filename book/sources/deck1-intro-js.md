# Transcript — "3- Introduction to JS.pdf" (61 pages)

Course: Web Programming, CE 40419, Sharif University of Technology, Fall 2026. Lecturer: Ali Abrishami. Lecture title: "Make 'em Interactive!".

**Conventions used in this transcript**
- Every slide uses the same template: a grey header bar ("▶ Web Programming" on the left, "Fall - 2026" on the right), a light grid-paper background, white rounded "window" cards with red/yellow/green dots, and the slide number at the bottom right. This template is not repeated per page.
- Code screenshots are dark editor windows (traffic-light dots plus a grey file-path line at the top) drawn with a ligature font. Ligatures are transcribed as plain ASCII: ⇒ = `=>`, ≥ = `>=`, ≤ = `<=`, triple bar = `===`, the ellipsis glyph = `...`. Emoji inside code comments (✅ ❌ 🌍) are kept as they appear.
- **Bold** and *italic* in the "Text" sections mirror the emphasis on the slide. Inline `code` marks text the slide shows in green monospace.
- Every runnable snippet was saved under `/tmp/work/scratch-deck1/snippets/` and run with Node.js v24.22.2. "Actual Node output" is copied from those runs. Stack-trace lines (`at Module._compile ...`) are omitted from error outputs; the error type and message are exact.
- "Extra verification" means a check of a claim that the slide makes in words but does not show as code. These are clearly labelled and are not slide content.

---

## Page 1 — Make 'em Interactive! (title slide)
**Text:** Header: "Web Programming · CE 40419 · Sharif University of Technology" / "Fall - 2026". Title: "Make 'em Interactive!". Lecturer: "Ali Abrishami".
**Image content:** Sharif University of Technology logo (top right, under the lecturer's name). An abstract graphic: a grid with a yellow rectangle, a blue right triangle and an orange-red circle. No technical content.
**Notes:** Title slide of the JavaScript introduction lecture.

## Page 2 — In This Lecture You Will…
**Text:** Three learning objectives on coloured cards:
- (a) Learn What JavaScript is
- (b) Understand it's features and limitations
- (c) Learn how async programming works in JS
**Image content:** none (decorative only). The cards (orange-red, yellow, green) carry pixel-art letters "a", "b", "c" and the text above.
**Notes:** The objectives are: what JS is, its features and limitations, and asynchronous programming.

## Page 3 — REMINDER: The Three Layers of a Website
**Text:** Three cards:
- **Structure** — What the **content** is
- **Style** — How it **looks**
- **Behaviour** — How it **reacts**
**Image content:** none (decorative only).
**Notes:** The slide does not name the languages. In the course sequence, Structure = HTML, Style = CSS and Behaviour = JavaScript (the subject of this lecture).

## Page 4 — What We Can Do So Far…
**Text:**
- We learned how to specify the **structure** for our web pages.
- We learned how to **divide** our **contents** into meaningful **sections**.
- We learned how to **style** our web pages.
- We learned the **abilities** and **limits** of **CSS**.
- We still CAN'T make our web pages **interactive**…
**Image content:** none (decorative only).
**Notes:** none.

## Page 5 — What is JavaScript? (Introduction)
**Text:** Blue label: "Introduction".
- JavaScript (JS) is an actual programming language
- It is able to run in your browser AND your machine (via Node.JS, but more on that later!).
- Brendan Eich created the initial prototype of JavaScript.
- He created it in just **10** days in May 1995 while working at Netscape.
**Image content:** The official JavaScript logo (yellow square with black "JS"). The title word "JavaScript?" is drawn inside a design-tool selection box with a mouse cursor (decoration).
**Notes:** none.

## Page 6 — History of JavaScript
**Text:**
- **1995:** Brendan Eich creates the very first version of JavaScript in just 10 days. It was called Mocha.
- **1996:** Mocha changes to LiveScript and then to JavaScript, in order to attract Java developers. However, <u>JavaScript has almost nothing to do with Java</u> (underlined on the slide).
- **1996:** Microsoft launches Internet Explorer, copying JavaScript from Netscape and calling it JScript.
- **1997:** With a need to standardize the language, ECMA releases ECMAScript 1 (ES1), the first official standard for JavaScript (ECMAScript is the standard, JavaScript the language in practice)
**Image content:** none (decorative only).
**Notes:** Name sequence: Mocha → LiveScript → JavaScript. JScript = Microsoft's copy in Internet Explorer. ECMAScript = the standard; JavaScript = the language used in practice.

## Page 7 — A Modern JavaScript
**Text:**
- **2009:** ES5 (ECMAScript 5) is released with lots of great new features.
- **2015:** ES6/ES2015 (ECMAScript 2015) was released (the biggest update to the language ever).
- **2015:** ECMAScript changes to an annual release cycle in order to ship less features per update.
- **2016 - Present:** Release of ES2016 / ES2017 / ES2018 / ES2019 / ES2020 / ES2021 / …
- Caption: "Source: Medium"
**Image content:** Illustration on a yellow background titled "JAVASCRIPT EVOLUTION". It parodies the "march of progress": a crouching ape, an upright ape holding a tool, a caveman holding a stone, a man with a spear, and finally a businessman in a suit with a briefcase looking at a smartphone. They walk left to right in front of a grey city skyline. The point is that JS has evolved a great deal since 1995.
**Notes:** none.

## Page 8 — JS Transpile
**Text:**
- Converts new JS to older syntax
- Keeps code working on **old browsers**
- Uses tools like Babel or SWC
- Lets devs use future JS features
- Adds a small build step
- Caption: "Source: X"
**Image content:** Two-panel courtroom meme (film still, "pucham.com" watermark).
- Top panel: a man in a grey shirt labelled **"ES5+"** stands silently. Next to him, a man in a dark patterned shirt labelled **"\*Babel"** speaks and gestures for him, acting as his interpreter.
- Bottom panel: the judge, labelled **"\*Browser"**, listens.
- Joke: the browser (the judge) cannot understand modern JavaScript directly, so Babel translates it into syntax the browser understands. This is transpiling.
**Notes:** The meme's label reads "ES5+" (it means "newer JS").

## Page 9 — Class Activity Time!
**Text:** "These are some of the features of JavaScript. What does each one of them mean?" Nine pill labels in a 3×3 grid:
- High Level | Garbage Collected | Interpreted/JIT Compiled
- Multi-paradigm | Prototype-based OO | First-class functions
- Dynamic | Single threaded | Non-blocking event loop
**Image content:** none beyond the labels (the pills are images containing only the text above).
**Notes:** CLASS ACTIVITY: explain each of the 9 features. The slide gives no answers.

## Page 10 — How Does It Run?
**Text:**
- Runs **line-by-line** inside the browser via an engine or on your machine via Node.js.
- Chrome uses **V8**, Firefox uses **SpiderMonkey**, etc.
- Code is parsed, optimized, and compiled to **machine code**.
- Handles async tasks (timers, promises, user events) without blocking.
- Browser or Node.js provides APIs (DOM, HTTP, File system, etc.). We'll talk about these APIs further in the course!.
**Image content:** none (decorative only).
**Notes:** none.

## Page 11 — JavaScript APIs
**Text:**
- JavaScript isn't just about data and functions.
- It runs inside an **environment** (a browser, Node.js, etc.)
- These environments provide **APIs** (Application Programming Interfaces).
- APIs let JavaScript interact with the outside world (show messages, fetch data, manipulate the page).
- Without these APIs, JavaScript alone couldn't do much beyond calculations.
- Caption: "Source: wanganator414.github.io"
**Image content:** Diagram of two boxes side by side:
- Left, orange box titled **"JS"**. Its top inner box holds the V8 engine logo and its bottom inner box reads **"Web APIs"**. The label under it reads **"Client Side"**.
- Right, green box titled **"Node JS"**. Its top inner box holds the V8 engine logo and its bottom inner box reads **"System APIs"**. The label under it reads **"Server Side"**.
- Meaning: the same V8 engine runs JS in both places. The browser adds Web APIs (client side); Node.js adds System APIs (server side).
**Notes:** none.

## Page 12 — The Console API
**Text:**
- A built-in tool provided by browsers.
- Used mainly for **debugging** and **inspecting** values.
- Accessible through the global console object.
- Provides many methods (log, warn, error, table, etc.).
- The **most common** and first one we use: console.log().
- Caption box: "What does each line do?"
**Image content:** Code window, path `Projects/University/web-ta/sampleprojects/js/console.js`:
```js
console.log("Hello, world!");

console.info("THIS IS AN INFO MESSAGE.");

console.warn("YOU WERE WARNED WHAT DEFEAT WOULD BRING!!!");

console.error("AH DOODOO, HERE WE GO AGAIN!");
```
**Actual Node output:** (`p12_console.js`) In a terminal the four lines print in order:
```
Hello, world!
THIS IS AN INFO MESSAGE.
YOU WERE WARNED WHAT DEFEAT WOULD BRING!!!
AH DOODOO, HERE WE GO AGAIN!
```
Split by stream: `console.log` and `console.info` write to stdout (`Hello, world!`, `THIS IS AN INFO MESSAGE.`); `console.warn` and `console.error` write to stderr (`YOU WERE WARNED WHAT DEFEAT WOULD BRING!!!`, `AH DOODOO, HERE WE GO AGAIN!`). Node shows no icons or colours. The browser rendering is on page 14.
**Notes:** Slide question: "What does each line do?" `log` prints a normal message, `info` an informational message, `warn` a warning (yellow) and `error` an error (red, with a stack trace). `console.table` is mentioned but not demonstrated.

## Page 13 — But Where Do I Code?
**Text:**
- Browser Console: 1. Open "DevTools" 2. Go to "Console" tab 3. Type JS codes directly.
- Inside HTML: Write your JS code between `<script> ... </script>`.
- External JS File: 1. Create a .js file 2. Link your .js file with `<script src="...">` (like what you did with your CSS)
- Online Playgrounds: e.g. CodePen, JSFiddle, StackBlitz.
**Image content:** Rage-comic drawing of a bearded stick figure at a computer desk, hand on chin, squinting sceptically ("hmm, where do I write my code?"). Decorative.
**Notes:** Four ways to run JS: the browser console, inline `<script>`, an external .js file linked with `<script src>`, and online playgrounds. The snippets are HTML and cannot run in Node.

## Page 14 — Testing That Console Code
**Text:**
- For the sake of simplicity, we'll run our JS codes inside the developer tools console (for now).
- It runs our JS code line by line (like Python shell).
- This method is great when you're learning the basics of JavaScript.
- You can see that our codes works properly :).
- You can see that there is an obvious difference between different types of messages. Since console methods return nothing, the return values are `undefined`.
**Image content:** Screenshot of the Firefox DevTools console (dark theme). The toolbar has a trash-can icon, "Filter Output" and a gear icon. Filter buttons: "Errors | Warnings | Info | Logs | Debug" (highlighted) and "CSS | XHR | Requests". The console lines are (» = input prompt, ← = the value the expression returned, right-aligned link = source location):
```
» console.log("Hello, world!");
  Hello, world!                                            main.js:2:232306
← undefined
» console.info("THIS IS AN INFO MESSAGE.");
ⓘ THIS IS AN INFO MESSAGE.                                 main.js:2:232306
← undefined
» console.warn("YOU WERE WARNED WHAT DEFEAT WOULD BRING!!!");
⚠ YOU WERE WARNED WHAT DEFEAT WOULD BRING!!!               main.js:2:232306
← undefined
» console.error("AH DOODOO, HERE WE GO AGAIN!");
❗ ▶ AH DOODOO, HERE WE GO AGAIN!                          main.js:2:232306
← undefined
» |
```
The warning row has a yellow-brown background and a ⚠ icon. The error row has a red background, a red ❗ icon and a ▶ toggle that expands the stack trace. The info row has an ⓘ icon.
**Actual Node output:** Same as page 12: Node prints only the message text. As a script, it prints no `undefined` lines; in the Node REPL each call is followed by an `undefined` line (confirmed on page 23's REPL run).
**Notes:** Key point: console methods return `undefined`, so the console shows `← undefined` after every call.

## Page 15 — Data In JavaScript
**Text:**
- Data has two main types in JavaScript: Everything is either a **primitive**, or an **object**.
- There are **7 primitive data** types in JavaScript: `number`, `string`, `boolean`, `undefined`, `null`, `Symbol`, and `BigInt` (more on this in the next slide!).
- Variables can hold **any type** and change at runtime (dynamic typing).
- Arrays, functions, and even dates are specialized objects.
- Conversion of types can happen either automatically (**coercion**) or explicitly (**casting**).
**Image content:** none (decorative only).
**Notes:** none.

## Page 16 — The Primitives
**Text:**
- `number`: integers & floating-point values
- `string`: sequence of characters in quotes
- `boolean`: only `true` or `false`
- `undefined`: variable declared but not assigned
- `null` → intentional absence of a value
- `Symbol` → unique, immutable identifier
  - Represents a unique and immutable identifier (often used as keys for object properties).
- `BigInt` → integers larger than `Number.MAX_SAFE_INTEGER`
**Image content:** none (decorative only).
**Actual Node output:** Extra verification (`p16_p20_p21_p22_coercion.js`): `Number.MAX_SAFE_INTEGER` → `9007199254740991`; `typeof 10n` → `"bigint"`; `Symbol("id") === Symbol("id")` → `false`.
**Notes:** none.

## Page 17 — More Complex Objects
**Text:**
- **Objects** group related data and behavior into **key-value pairs**.
- Objects can nest other objects, arrays, or functions.
- **Arrays** hold ordered collections, accessed with numeric indices.
- Arrays provide **built-in methods** (like Java).
- **Functions** are **first-class objects** (can be passed, stored, and returned).
- Functions can act as object methods or standalone code blocks.
**Image content:** none (decorative only).
**Notes:** none.

## Page 18 — Arithmetic Operators
**Text:**
- `+`: addition
- `-`: subtraction
- `*`: multiplication
- `/`: division
- `%`: remainder (modulo)
- `**`: exponentiation
**Image content:** "Boardroom Meeting Suggestion" meme (imgflip.com), three panels:
- Panel 1: the boss asks "What is 1 + 1?".
- Panel 2: the employee with the Python logo says "2", the one with the C++ logo says "2", and the one with the JS logo, leaning back casually, says "11".
- Panel 3: the furious boss throws the JS employee out of the window.
- Joke: in JS, `+` concatenates when one operand is a string, so `"1" + 1` gives `"11"`.
**Actual Node output:** Extra verification: `"1" + 1` → `"11"`; `1 + 1` → `2`.
**Notes:** Purely numeric `1 + 1` is `2` in JS too. "11" only happens when an operand is a string; the meme exaggerates.

## Page 19 — Assignment Operators
**Text:**
- `=` assign value
- `+=` add & assign
- `-=` subtract & assign
- `*=` multiply & assign
- `/=` divide & assign
- `%=` remainder & assign
**Image content:** Two-panel meme (stills of two people in two cars).
- Top: a smiling woman leaning out of a car window, captioned "PROGRAMMERS DOING X = X+1".
- Bottom: a young man in the other car staring in disbelief, captioned "MATHEMATICIANS".
- Joke: in maths x = x+1 is impossible, but in programming `=` is assignment, so `x = x + 1` increments x (the same as `x += 1`).
**Notes:** none.

## Page 20 — Casting
**Text:**
- Casting is converting one type of value into another. JavaScript has **explicit** casting:
  - `Number("42") → 42`
  - `String(99) → "99"`
  - `Boolean(1) → true`
- Also has implicit casting (**type coercion**):
  - `"5" + 1 → "51"`
  - `2 * "3" → 6`
  - What is the result of `"5" - 1` ?
**Image content:** none (decorative only).
**Actual Node output:** (`p16_p20_p21_p22_coercion.js`)
- `Number("42")` → `42` (number)
- `String(99)` → `"99"` (string)
- `Boolean(1)` → `true`
- `"5" + 1` → `"51"` (string)
- `2 * "3"` → `6` (number)
- `"5" - 1` → `4` (number)
**Notes:** Slide question: "What is the result of "5" - 1 ?" Answer: `4`. Minus has no string meaning, so "5" becomes the number 5.

## Page 21 — Casting Pitfalls
**Text:**
- `"5" + 1 → "51"` (string concatenation instead of math).
- `true + true → 2` (booleans become numbers).
- `null + 1 → 1` but `undefined + 1 → NaN`.
- `[] == false → true`, also `[] == 0 → true`
- `==` can cause unexpected coercion, so prefer `===`.
- Look at the meme in the right; can you tell what's going on when that happens?
**Image content:** Meme. Text at the top: People learning JavaScript: "I'll use array.sort() to sort this list of numbers!". Then "JavaScript:" above a still of Leonardo DiCaprio laughing with a wine glass (Django Unchained), captioned "[1, 100000, 21, 30, 4]". Joke: `array.sort()` with no compare function converts the elements to strings and sorts them in dictionary order. So "100000" comes before "21", and "4" comes last.
**Actual Node output:**
- `"5" + 1` → `"51"`
- `true + true` → `2`
- `null + 1` → `1`
- `undefined + 1` → `NaN`
- `[] == false` → `true`
- `[] == 0` → `true`
- Extra: `[] === false` → `false`; `[] === 0` → `false`
- Meme: `[1, 4, 21, 30, 100000].sort()` → `[ 1, 100000, 21, 30, 4 ]`
- With a numeric comparator: `[1, 100000, 21, 30, 4].sort((a, b) => a - b)` → `[ 1, 4, 21, 30, 100000 ]`
**Notes:** Slide question: "can you tell what's going on when that happens?" Answer: the default sort compares strings. Why the pitfalls happen: in numeric context `null` becomes 0 and `undefined` becomes NaN. `[]` becomes `""` and then `0`, and `false` becomes 0, so `[] == false` and `[] == 0` are both true.

## Page 22 — Type Coercion
**Text:**
- Automatically converting one data type to another when operations involve values of **different types**.
- It's one of the key features of JavaScript's **dynamic typing system** — variables don't have fixed types, and the engine tries to make sense of operations even if the operands aren't of the same type.:
  - ➕ String + Anything → String
    `'10' + 5; // "105"`
  - ➖, ✖️, ➗ → Numeric Context
    `'10' - 5;   // 5`
    `'10' * 2;   // 20`
  - Comparison Operators:
    `'5' == 5;   // true  (string → number)`
    `false == 0; // true  (boolean → number)`
    `null == undefined; // true (special rule)`
**Image content:** only the emoji icons (➕ ➖ ✖️ ➗) next to the rules. All code is in the text layer.
**Actual Node output:**
- `'10' + 5` → `"105"`
- `'10' - 5` → `5`
- `'10' * 2` → `20`
- `'5' == 5` → `true`
- `false == 0` → `true`
- `null == undefined` → `true`
- Extra: `null === undefined` → `false`
**Notes:** none.

## Page 23 — Variables in JavaScript
**Text:**
- Variables are containers for storing data.
- Declared using `let`, `const`, or the older `var`.
- `let`: **changeable values** (mutable).
- `const`: **fixed values** (cannot be reassigned).
- `var`: *outdated*, function-scoped (avoid in modern code).
- Variables let us reuse and manipulate data in programs.
**Image content:** Firefox DevTools console screenshot (dark theme). Exact lines:
```
» let a = 12
← undefined
» const b = 13
← undefined
» b = 12
❗ ▶ Uncaught TypeError: invalid assignment to const 'b'
      <anonymous> debugger eval code:1
    [Learn More]
                                              debugger eval code:1:1
» a = "Hello!"
← "Hello!"
» console.log(a)
  Hello!
                                              main.js:2:232306
← undefined
```
The error block has a red background.
**Actual Node output:** As a script (`p23_console_session.js`), Node stops at line 3 with exit code 1, and nothing after it runs:
```
b = 12
  ^

TypeError: Assignment to constant variable.
```
In the Node REPL (`node -i` fed the same 5 lines):
```
> undefined
> undefined
> Uncaught TypeError: Assignment to constant variable.
> 'Hello!'
> Hello!
undefined
```
**Notes:** The error message depends on the engine. Firefox (SpiderMonkey) says "invalid assignment to const 'b'"; Chrome and Node (V8) say "Assignment to constant variable." Both are a TypeError. A declaration returns `undefined` in the console, and an assignment expression returns the assigned value (`"Hello!"`).

## Page 24 — let vs. const
**Text:**
- with `let`, your variables can be reassigned to new values.
- with `const`, however, your variables cannot be reassigned once set.
- Both are **block-scoped** (only exist inside `{ ... }`).
- Banner: **BEST PRACTICE** Use `const` by default, switch to `let` when reassignment is needed.
**Image content:** Code window, path `Projects/University/web-ta/sampleprojects/js/letconst.js`:
```js
let age = 21;

age = 22;  // ✅ works

const pi = 3.14;

pi = 3.1415;  // ❌ error
```
**Actual Node output:** (`p24_letconst.js`, exit code 1; the `age` lines run silently first)
```
pi = 3.1415;  // ❌ error
   ^

TypeError: Assignment to constant variable.
```
**Notes:** none.

## Page 25 — Blocks & Scopes
**Text:**
- A block is code inside { ... }.
- Variables declared with let or const exist only inside that block.
- Outside the block, they are **not** accessible.
- The code in the right shows a block.
- Caption (italic): "blocks aren't just syntax, they're a tool to organize and protect variables."
**Image content:** Code window, path `Projects/University/web-ta/sampleprojects/js/scopes.js`:
```js
{
  let x = 10;
  console.log(x); // ✅ works
}
console.log(x);   // ❌ error: x is not defined
```
**Actual Node output:** (`p25_scopes.js`, exit code 1)
```
10
/tmp/work/scratch-deck1/snippets/p25_scopes.js:5
console.log(x);   // ❌ error: x is not defined
            ^

ReferenceError: x is not defined
```
**Notes:** none.

## Page 26 — Global Scope
**Text:**
- A variable declared **outside** any block is global.
- Global variables can be accessed from anywhere in the code.
- They live for as long as the program runs.
- In browsers, global variables become properties of the `window` object (more on that later).
- Caption (italic): "Too many globals can cause naming conflicts and bugs. They make code harder to maintain and debug."
**Image content:** Code window, path `Projects/University/web-ta/sampleprojects/js/global.js`:
```js
let message = "Hello";  // 🌍 global

function greet() {
  console.log(message); // ✅ accessible here
}

greet();
console.log(message);   // ✅ accessible here too
```
**Actual Node output:**
```
Hello
Hello
```
**Notes:** Transcriber's caveat (not on the slide): in a browser, only top-level `var` variables and function declarations become `window` properties. A top-level `let`/`const` such as `message` is global but is not `window.message`. Page 27 makes the `var` version of this claim. In Node, a file's top level is module scope, not the true global object.

## Page 27 — var Problems
**Text:**
- Function-scoped, not block-scoped: can leak outside `{}` blocks.
- Variable hoisting: declarations move to the top, causing unexpected undefined.
- Allows redeclaration: same variable can be defined multiple times without error.
- Global scope pollution: `var` in global context attaches to window.
- Inconsistent behavior: makes debugging and reasoning about code harder.
**Image content:** Lord of the Rings meme (imgflip.com), three panels:
1. A hand holding the One Ring, labelled "VAR".
2. Elrond, labelled "EVERYONE ELSE", saying "Cast it into the fire! Destoy it!" [sic].
3. Isildur, labelled "OLD JS DEVS", replying "No.".
- Joke: everyone wants to get rid of `var`, but old-school JS developers refuse to give it up.
**Actual Node output:** Extra verification (`extra_claims.js`):
- A `var` declared inside an `if` block is readable after the block → `yes`
- A `let` inside the block is not visible outside: `typeof inner` → `undefined`
- `var r = 1; var r = 2;` → no error, `r` is `2`
- Reading a `var` before its declaration → `undefined`
**Notes:** No code on this slide. The five `var` problems are quiz material.

## Page 28 — Closure
**Text:**
- A closure is when a function keeps access to its parent's variables (A function that remembers variables from its outer scope).
- Keeps access even after the outer function ends
- Used for encapsulation, state, and callbacks
- Common in JS and other functional languages
- **BEWARE OF PITFALL:** But closures can cause problems when combined with *var*.
**Image content:** Code window, path `sample.js`:
```js
function counter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const c = counter();
console.log(c()); // 1
console.log(c()); // 2
```
**Actual Node output:**
```
1
2
```
**Notes:** The `var` pitfall is only mentioned, not shown. Extra verification (`extra_claims.js`, not slide code): `for (var i = 0; i < 3; i++) setTimeout(() => console.log("var loop  i =", i), 0);` prints `i = 3` three times. The same loop with `let j` prints `0`, `1`, `2`. All `var` callbacks share one function-scoped `i`, while `let` creates a new binding per iteration.

## Page 29 — Control Flow
**Text:**
- Control flow decides which code runs and when.
- By default, JS runs top to bottom.
- Conditionals let us branch (e.g. `if`, `else`).
- Loops let us repeat code (`for`, `while`).
- Together, they give logic and structure to programs.
**Image content:** Code window, path `Projects/University/web-ta/sampleprojects/js/cf.js` (`>=` and `<=` drawn as ≥ and ≤ ligatures):
```js
let age = 18;

if (age >= 18) {
  console.log("You can vote!");
} else {
  console.log("Too young to vote.");
}

for (let i = 1; i <= 3; i++) {
  console.log("Count:", i);
}
```
**Actual Node output:**
```
You can vote!
Count: 1
Count: 2
Count: 3
```
**Notes:** none.

## Page 30 — Conditionals
**Text:**
- Allow code to make decisions.
- Run certain blocks only if a condition is true.
- Main forms:
  - `if`: run code if condition is true.
  - `if / else`: choose between two paths.
  - `else if`: chain multiple conditions.
  - `switch`: handle many specific cases.
**Image content:** none (decorative only).
**Notes:** none.

## Page 31 — Comparison Operators
**Text:**
- Equal (`==`) compares values (allows type coercion).
  - Note: Primitives are compared by value, not by reference.
- Strict Equal (`===`) compares values and types.
- Not Equal (`!=`), Strict Not Equal (`!==`).
- Greater / Less Than: `>`, `<`.
- Greater / Less Than or Equal: `>=`, `<=`.
- Logical operators are just like C: `&&` (AND), `||` (OR), `!` (NOT). You can also combine or invert boolean values.
**Image content:** none (decorative only).
**Notes:** none.

## Page 32 — Loops
**Text:**
- Loops let us repeat code without writing it many times.
- Run a block while a condition is true.
- Main types of loops:
  - `for`: repeat a set number of times.
  - `while`: repeat as long as condition is true.
  - `do...while`: run at least once, then check condition.
  - `for...of`: loop over **items** in an array.
  - `for...in`: loop over **keys** in an object.
**Image content:** none (decorative only).
**Notes:** none.

## Page 33 — Functions
**Text:**
- A function is a **reusable** block of code.
- Helps avoid repetition and keeps code **organized**.
- Can take parameters (inputs).
- Can return a value (output).
- Defined once, used many times.
**Image content:** "Tuxedo Winnie the Pooh" ranking meme with six rows. Each row pairs a Pooh picture and a language label (left) with that language's function keyword (right):
1. JAVASCRIPT — `function` (plain Pooh in his red shirt)
2. GOLANG — `func` (Pooh in a tuxedo)
3. KOTLIN — `fun` (tuxedo Pooh with a round white ornament, like a pocket watch)
4. RUST — `fn` (fanciest Pooh: tuxedo, green monocle and moustache)
5. PYTHON — `def` (Pooh in his red shirt with a grimacing, toothy face)
6. java — an annotated diagram of a Java method, next to the ugliest, derpy Pooh (red shirt, mouth hanging open). The method is `public int max (int x, int y) { if (x > y) return x; else return y; }`, with arrows labelled "modifier" (→ `public`), "return-type" (→ `int`), "method-name" (→ `max`), "parameter-list" (→ `(int x, int y)`) and "body of the method" (→ the `{ ... }` block).
- Joke: the shorter the function keyword, the classier the language looks. Python's `def` and Java's verbose method signature get mocked.
**Notes:** The Java diagram is Java, not JS, so it was not run.

## Page 34 — Method I: Function Declaration
**Text:**
- Classic way to define a function.
- Starts with the `function` keyword.
- Can be called before or after it's defined (hoisted).
- Caption (italic): "Remember, this can be hoisted!"
**Image content:** Code window, path `Projects/University/web-ta/sampleprojects/js/fn.js`:
```js
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5
```
**Actual Node output:** `5`
**Notes:** Extra verification (`extra_claims.js`): calling `add(2, 3)` *before* the declaration also returns `5`, so function declarations are hoisted.

## Page 35 — Method II: ES6 Arrow Functions
**Text:**
- Introduced in **ES6** (modern JS).
- Shorter syntax; often used for quick functions.
- **Not hoisted** (must be defined before use).
- Caption (italic): "Remember, this **cannot** be hoisted!"
**Image content:** Code window, path `Projects/University/web-ta/sampleprojects/js/fn.js` (`=>` drawn as ⇒):
```js
const multiply = (a, b) => {
  return a * b;
};

console.log(multiply(4, 5)); // 20
```
**Actual Node output:** `20`
**Notes:** Extra verification (`extra_claims.js`):
- Calling `multiply(4, 5)` before `const multiply = ...` throws `ReferenceError: Cannot access 'multiply' before initialization` (temporal dead zone).
- If the arrow is stored in a `var` instead, calling it early throws `TypeError: mult2 is not a function`, because the variable is hoisted as `undefined`.

## Page 36 — Method I vs. Method II
**Text:**
- Function: declared with function keyword.
- Arrow: **shorter** => syntax.
- Functions are **hoisted** (usable before definition).
- Arrows are **not hoisted**.
- Functions have their own `this`; arrows **inherit** `this` (more on that later!).
**Image content:** "Tuxedo Winnie the Pooh" meme, three rows, each with a small dark code panel:
1. Plain Pooh (red shirt):
```js
function foo() {
    //
}
foo();
```
2. Tuxedo Pooh:
```js
const foo = () => {
    //
}
foo();
```
3. Fanciest Pooh (tuxedo, monocle, moustache):
```js
(() => {
    //
})();
```
- Joke: function declaration < arrow function stored in a `const` < immediately invoked arrow function (IIFE), ranked by "classiness".
**Actual Node output:** All three panels (`p36_panel1.js`, `p36_panel2.js`, `p36_panel3.js`) run with no output and no error (exit code 0). The function bodies are empty.
**Notes:** Panel 3 is an IIFE (Immediately Invoked Function Expression) written with an arrow function.

## Page 37 — What is hoisting?
**Text:**
- Moving declarations before execution
- Common in languages like JavaScript
- Means code runs as if declared at top
- Variables/functions exist before use
- Can cause unexpected behavior
**Image content:** Two-panel meme (film stills; watermark "ProgrammerHumor.io").
- Top: Peter Parker, captioned "Using variable before declaration".
- Bottom: Doctor Strange, labelled "Javascript", saying "That feels weird, but I'll allow it".
- Joke: because of hoisting, JS lets you use `var` variables and functions before their declaration.
**Notes:** none.

## Page 38 — Hoisting in JavaScript
**Text:**
- JS moves declarations to the top of scope
- Works for `var`, `function`, and `class` (partially)
- Variables are hoisted but not initialized
- Access before init gives `undefined` or error
- Makes code order confusing if misused
**Image content:** none (decorative only).
**Actual Node output:** Extra verification (`extra_claims.js`):
- Reading a `var` before its declaration → `undefined`
- Reading a `let` before its declaration → `ReferenceError: Cannot access 'l' before initialization`
- `new K()` before `class K {}` → `ReferenceError: Cannot access 'K' before initialization`
- A function declaration called before its definition works (`5`)
**Notes:** "undefined or error": `var` gives `undefined`; `let`, `const` and `class` throw a ReferenceError because they sit in the temporal dead zone until their declaration runs.

## Page 39 — Classes
**Text:**
- Introduced in ES6 as a cleaner way to create objects.
- Use the `class` keyword.
- Classes define a blueprint for creating objects.
**Image content:** Code window, path `Projects/University/web-ta/sampleprojects/js/classes.js`:
```js
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    console.log("Hello, " + this.name);
  }
}

const kermit = new User("Kermit", 22);
kermit.greet();
```
**Actual Node output:** `Hello, Kermit`
**Notes:** none.

## Page 40 — Objects
**Text:**
- Objects group related **data** and **behavior**.
- Made of **key-value** pairs.
- Values can be data (properties) or functions (methods).
- **JSON** (JavaScript Object Notation) is a common way to store & share object data.
- Caption (italic): "Technically speaking, in JavaScript, almost everything is an object."
**Image content:** "Always has been" astronaut meme (imgflip.com). The Earth, seen from space, has a yellow JS shield logo labelled "JavaScript" pasted on it. Astronaut 1 says "Wait it's all OBJECTS". Astronaut 2, pointing a gun at him from behind, says "Always has been". Point: almost everything in JS is an object.
**Notes:** none.

## Page 41 — Object Literals
**Text:**
- Define objects with { key: value } pairs
- Store related data & behavior together
- Keys are strings (or symbols), values any type
- Support methods and nested objects
- Basis for JSON structure in JS
**Image content:** Code window, path `Projects/University/web-ta/sampleprojects/js/ol.js`:
```js
const user = {
  name: "Barry Allen",
  age: 24,
  isTheFlash: true,
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
};

user.greet();
```
**Actual Node output:** `Hello, I'm Barry Allen`
**Notes:** none.

## Page 42 — Destructing [sic, i.e. Destructuring]
**Text:**
- Extract values from arrays or objects easily
- Uses {} for objects, [] for arrays
- Can rename variables during destructuring
- Supports default values if property is missing
- Makes code clearer
**Image content:** Code window, path `Projects/University/web-ta/sampleprojects/js/destructing.js`:
```js
const person = {
  first: "Alice",
  last: "Doe",
  age: 30 };
const { first, age } = person;

const colors = ["red", "green", "blue"];
const [primary, secondary] = colors;

console.log(first, age);         // Alice 30
console.log(primary, secondary); // red green
```
**Actual Node output:**
```
Alice 30
red green
```
**Notes:** The bullets mention renaming and default values, but the code does not show them. Extra verification (`extra_claims.js`): `const { first: firstName, middle = "N/A" } = person;` gives `firstName` = `Alice` and `middle` = `N/A`.

## Page 43 — The this Keyword
**Text:**
- Refers to the object that is calling the function.
- In objects, `this` points to the object itself.
- In classes, `this` points to the created instance.
- In arrow functions, `this` is inherited from the outer scope.
- The value of this depends on how a function is called, not where it's defined.
**Image content:** none (decorative only).
**Notes:** none.

## Page 44 — The this Keyword (cont.)
**Text:**
- Refers to the object that calls the function
- Value depends on call context, not declaration
- In global scope: window (browser) or undefined (strict mode)
- In methods: the object before the dot
- In arrow functions: inherits this from outer scope (lexical this)
- Can be bound manually using call, apply, or bind
**Image content:** Code window, path `sample.js`:
```js
const obj = {
  name: "Robert",
  say() {
    console.log(this.name);
  }
};
obj.say(); // "Robert"
const f = obj.say;
f(); // undefined (or global)
```
**Actual Node output:** As a CommonJS script in sloppy mode (`p44_this.js`):
```
Robert
undefined
```
As an ES module in strict mode (`p44_this_strict.mjs`, exit code 1):
```
Robert
TypeError: Cannot read properties of undefined (reading 'name')
```
Extra verification (`extra_claims.js`): `f.call(obj)`, `f.apply(obj)` and `f.bind(obj)()` all return `Robert`. An arrow-function method's `this` comes from the enclosing scope (in a CommonJS file that is `module.exports`, printed as `{}`).
**Notes:** `f()` is called without an object before the dot, so it loses `obj`. In sloppy mode `this` is the global object, which has no `name` in Node, so it logs `undefined`. In a browser's sloppy script `this` is `window`, and `window.name` is a real string property (normally `""`), so it would log an empty line. In strict mode `this` is `undefined`, so reading `.name` throws a TypeError.

## Page 45 — Arrays
**Text:**
- Arrays store **ordered** collections of values.
- Elements are accessed by **index** (starting at 0).
- Can hold mixed types (`number`s, `string`s, `object`s, etc.).
- Have **built-in** methods for adding, removing, and transforming data.
- Common methods: `push`, `pop`, `map`, `filter`, `forEach`.
- Caption: "What's the output of this code?"
**Image content:** Code window, path `Projects/University/web-ta/sampleprojects/js/array.js`:
```js
const numbers = [1, 2, 3];
numbers.push(4);
console.log(numbers[0]);
```
**Actual Node output:** `1`
**Notes:** Slide question: "What's the output of this code?" Answer: `1`. `push` adds 4 at the end, so index 0 is still 1. A `const` array can still be changed with `push`, because `const` prevents reassignment, not mutation.

## Page 46 — Array Methods
**Text:**
- `push` / `pop`: add/remove from the **end**.
- `shift` / `unshift`: remove/add at the **start**.
- `filter`: keep only elements that match a condition.
- `forEach`: run a function for each element.
- `find` / `findIndex` → get the first element (or index) that matches.
- `for...of`: loop through iterable values (arrays, strings, etc.) directly.
**Image content:** none (decorative only).
**Notes:** The word order matches the method order: `shift` removes from the start and `unshift` adds to the start.

## Page 47 — map and reduce Methods
**Text:**
- `map`
  - Transforms each element into a new array
  - Does not change the original array
  - Often used for formatting or calculations
- `reduce`
  - Combines all elements into a single value
  - Uses an accumulator + current value
  - Useful for sums, averages, objects, etc.
**Image content:** none (decorative only).
**Notes:** none.

## Page 48 — An Example…
**Text:** Title only.
**Image content:** Large code window, path `Projects/University/web-ta/sampleprojects/js/mapred.js` (`=>`, `>=` and `...` drawn as ligatures):
```js
const students = [{ name: "Alice", score: 85 }, { name: "Bob", score: 72 }];

const scores = students.map(s => s.score);
console.log("Scores:", scores);

const total = scores.reduce((acc, s) => acc + s, 0);
const average = total / scores.length;

console.log("Total:", total);
console.log("Average:", average);

const results = students.map(s => ({
  ...s,
  passed: s.score >= 70
}));

console.log("Results:", results);
```
**Actual Node output:**
```
Scores: [ 85, 72 ]
Total: 157
Average: 78.5
Results: [
  { name: 'Alice', score: 85, passed: true },
  { name: 'Bob', score: 72, passed: true }
]
```
**Notes:** The example shows four techniques:
- `map` to extract a field
- `reduce` with the initial accumulator `0`
- the spread `...s` to copy an object's properties
- returning an object literal from an arrow function by wrapping it in parentheses: `({ ... })`

Both students pass (72 >= 70).

## Page 49 — Class Activity Time!
**Text:** "Predict the output of this code. Trace the state of elements in nums in each step and explicitly tell what happens to them."
**Image content:** Code window, path `Projects/University/web-ta/sampleprojects/js/arraymethods.js` (`=>` drawn as ⇒, `===` as a triple-bar ligature):
```js
const nums = [1, 2, 3, 4];

nums.push(5);
nums.pop();

nums.unshift(0);
nums.shift();

const doubled = nums.map(n => n * 2);

const evens = nums.filter(n => n % 2 === 0);

nums.forEach(n => console.log(n));

console.log(nums.find(n => n > 2));
console.log(nums.findIndex(n => n > 2));
```
**Actual Node output:** The slide code as-is (`p49_arraymethods.js`):
```
1
2
3
4
3
2
```
Step trace (`p49_trace_harness.js`; the harness only adds logging):
```
start            nums = [1,2,3,4]
push(5)  returns 5   nums = [1,2,3,4,5]
pop()    returns 5   nums = [1,2,3,4]
unshift(0) returns 5 nums = [0,1,2,3,4]
shift()  returns 0   nums = [1,2,3,4]
doubled = [2,4,6,8]  nums = [1,2,3,4]
evens   = [2,4]      nums = [1,2,3,4]
forEach output:
1
2
3
4
forEach returns undefined
find(n > 2)      -> 3
findIndex(n > 2) -> 2
final nums = [1,2,3,4]
```
**Notes:** CLASS ACTIVITY.
- `push`, `pop`, `unshift` and `shift` mutate `nums`; their net effect here leaves it unchanged.
- `push` and `unshift` return the new length; `pop` and `shift` return the removed element.
- `map` and `filter` return new arrays and do not mutate `nums`.
- `forEach` returns `undefined`.
- `find` returns the first matching element (`3`) and `findIndex` its index (`2`).
- `doubled` and `evens` are computed but never printed.

## Page 50 — Error Handling
**Text:**
- Errors happen when code breaks at runtime.
- Without handling, they stop the whole program.
- Use `try...catch` to safely run risky code.
- `throw` lets you create your own errors.
- `finally` runs code whether an error happened or not.
- Box: **BEST PRACTICE** Catch only errors you can actually handle.
**Image content:** Code window, path `Projects/University/web-ta/sampleprojects/js/errorhandling.js`:
```js
try {
  JSON.parse("{ bad json }");
} catch (err) {
  console.log("Oops:", err.message);
} finally {
  console.log("Done!");
}
```
**Actual Node output:**
```
Oops: Expected property name or '}' in JSON at position 2 (line 1 column 3)
Done!
```
**Notes:** The caught error is a `SyntaxError` (`err.name` → `SyntaxError`, verified). The exact message text depends on the engine; this is V8 in Node 24. `throw` is mentioned but not shown. Extra verification: `throw new Error("Custom failure")` is caught as `Error: Custom failure`, and `finally` still runs.

## Page 51 — Template Literals
**Text:**
- Introduced in ES6 (use **backticks** \`).
- Allow multi-line strings without `\n`.
- Support string interpolation with `${expression}`.
**Image content:** Code window, path `Projects/University/web-ta/sampleprojects/js/templateliterals.js` (several blank lines separate the path from the first statement; they are just spacing in the screenshot):
```js
const product = "Laptop";
const price = 1200;
const quantity = 2;

const message = `
You ordered: ${quantity} × ${product}
Total price: $${price * quantity}
Thank you for shopping with us!
`;

console.log(message);
```
**Actual Node output:** (`p51_templateliterals.js`) The first and last printed lines are empty, because the template starts and ends with a line break:
```

You ordered: 2 × Laptop
Total price: $2400
Thank you for shopping with us!

```
**Notes:**
- In `$${price * quantity}` the first `$` is a literal dollar sign and `${...}` is the interpolation, so it prints `$2400`. Expressions inside `${}` are evaluated (`price * quantity` = 2400).
- The character between `${quantity}` and `${product}` is drawn as a small centred multiplication sign, unlike the letter x in this font. It is transcribed as the literal `×` (U+00D7); if it were the letter x, the line would read `You ordered: 2 x Laptop`. This is the one character in the deck I could not confirm with certainty.

## Page 52 — JavaScript Object Notation
**Text:**
- JSON (JavaScript Object Notation) is a text format for **storing** and **exchanging** data.
- Looks like JavaScript objects, but stricter (keys & strings in quotes).
- JS provides two key methods:
  - `JSON.stringify(obj)`: converts object to JSON string.
  - `JSON.parse(jsonStr)`: converts JSON string to object.
**Image content:** Code window, path `Projects/University/web-ta/sampleprojects/js/json.js`:
```js
const order = {
  id: 101,
  customer: {
    name: "Alex",
    email: "alex@example.com"
  },
  items: [
    { product: "Laptop", qty: 1, price: 1200 },
    { product: "Mouse", qty: 2, price: 25 }
  ],
  paid: true
};

const json = JSON.stringify(order, null, 2);
console.log(json);

const obj = JSON.parse(json);
console.log(obj.customer.email);
```
**Actual Node output:** (`p52_json.js`)
```
{
  "id": 101,
  "customer": {
    "name": "Alex",
    "email": "alex@example.com"
  },
  "items": [
    {
      "product": "Laptop",
      "qty": 1,
      "price": 1200
    },
    {
      "product": "Mouse",
      "qty": 2,
      "price": 25
    }
  ],
  "paid": true
}
alex@example.com
```
**Notes:** In `JSON.stringify(order, null, 2)`, the second argument `null` means "no replacer" and the third argument `2` pretty-prints with a 2-space indent. In the JSON text every key is in double quotes. Extra verification (`extra_async_claims.js`): `typeof JSON.stringify(...)` → `string`, and `typeof JSON.parse(...)` → `object`.

## Page 53 — Asynchronous JavaScript
**Text:**
- By default, JS is **single-threaded** → runs one task at a time.
- Some operations take time (e.g. fetching data, waiting for timers).
- Instead of blocking everything, JS uses **asynchronous code**.
- Async code lets other tasks run while waiting.
- Caption: "Source: Ramotion"
**Image content:** Two sequence diagrams side by side (Ramotion "R" logo at the bottom right):
- **"Synchronous"**: lifelines "Process A" (green header) and "Process B" (red header). A has a short green activity bar, then sends an arrow → to B. B shows a long red activity bar while A's lifeline has no bar, labelled **"Wait for response"**. An arrow ← then returns from B to A, and only after it does A get another short green bar (it resumes after the response).
- **"Asynchronous"**: the same two processes. A sends an arrow → to B, but A's green bar continues without a break, labelled **"Continue working"**. B's red bar runs in parallel. The return arrow ← from B to A is labelled **"Get response"** and arrives while A is still working.
- Meaning: in synchronous code the caller blocks until the response arrives; in asynchronous code the caller keeps working and handles the response when it comes.
**Notes:** none.

## Page 54 — Method I: Callback
**Text:**
- A **callback** is a simple function that's passed as a value to another function, and will only be executed when the event happens.
- One common example is by using timers
- Every callback adds a level of nesting, and when you have lots of callbacks, the code starts to be **complicated** very quickly.
- Box: **BEST PRACTICE** Callbacks are great for **simple cases**! Break logic into smaller functions instead of nesting too deep.
**Image content:** Code window, path `Projects/University/web-ta/sampleprojects/js/callback.js` (`=>` drawn as ⇒):
```js
function fetchData(callback) {
  setTimeout(() => {
    callback("Data received!");
  }, 1000);
}

fetchData(result => {
  console.log(result); // ✅ "Data received!" (after 1 sec)
});
```
**Actual Node output:** (`p54_callback.js`) `Data received!`, printed after about 1 second (the whole run took 1.03 s of wall-clock time).
**Notes:** The arrow function `result => { ... }` is the callback. `fetchData` passes `"Data received!"` to it when the 1000 ms timer fires.

## Page 55 — Method II: Promises
**Text:**
- A `Promise` represents a value that may arrive now, later, or never.
- Has 3 states: pending → fulfilled → rejected.
- Use `.then()` for success, `.catch()` for errors.
- Avoids deep nesting from callbacks.
- Box: **BEST PRACTICE** Always add `.catch()` to handle errors; unhandled rejections can crash apps.
**Image content:** Code window, path `Projects/University/web-ta/sampleprojects/js/promises.js` (`=>` drawn as ⇒; the `reject` line is a grey comment):
```js
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Data received!");
    // reject("Error occurred!");
  }, 1000);
});

fetchData
  .then(result => console.log(result))   // ✅ "Data received!"
  .catch(error => console.log(error));
```
**Actual Node output:**
- As on the slide (`p55_promises.js`): `Data received!` after about 1 s.
- Variant with `resolve` commented out and `reject` uncommented (`p55_promises_reject_variant.js`): `.catch` prints `Error occurred!` (exit code 0).
- Extra verification of the BEST PRACTICE (`p55_unhandled_rejection.js`: a rejection with no `.catch()`): Node crashes with exit code 1, and a later `setTimeout` callback never runs:
```
UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "Error occurred!".
    ...
  code: 'ERR_UNHANDLED_REJECTION'
```
**Notes:**
- The slide writes the states as "pending → fulfilled → rejected". In fact a promise starts *pending* and settles exactly once, to *either* fulfilled *or* rejected; it never goes from fulfilled to rejected. Extra verification: `new Promise((resolve, reject) => { resolve("first"); reject("second"); })` ends up fulfilled with `first`, and the later `reject` is ignored.
- Here `fetchData` is a Promise *object*, not a function. It starts running as soon as it is created, so the code uses `fetchData.then(...)`, not `fetchData()`.

## Page 56 — Method III: async/await
**Text:**
- Built on top of Promises (ES8+).
- Lets you write async code that **looks like** sync code.
- Use `async` before a function to return a Promise.
- Use `await` to pause until a Promise resolves.
- Must be inside an `async` function.
- Box: **BEST PRACTICE** Always wrap `await` calls in `try...catch` to handle errors gracefully.
**Image content:** Code window, path `Projects/University/web-ta/sampleprojects/js/asyncawait.js`:
```js
async function getData() {
  try {
    const result = await fetchData();
    console.log(result);
  } catch (err) {
    console.error("Error:", err);
  }
}
```
**Actual Node output:**
- As on the slide (`p56_asyncawait_asis.js`): no output, exit code 0. `getData` is defined but never called, and `fetchData` is not defined in this snippet.
- Harness (`p56_asyncawait_harness.js`): I added `function fetchData() { return new Promise((resolve, reject) => { setTimeout(() => { resolve("Data received!"); }, 1000); }); }` before the slide code, and `const p = getData(); console.log("getData() returned:", p);` after it:
```
getData() returned: Promise { <pending> }
Data received!
```
- Rejecting harness (`p56_asyncawait_reject_harness.js`, where `fetchData` rejects with `"Error occurred!"`): stderr shows `Error: Error occurred!` (from `console.error("Error:", err)`), exit code 0.
- Using slide 55's `fetchData`, which is a Promise object, with this `getData` (`p56_with_p55_promise.js`): `await fetchData()` throws inside the `try` and is caught, so stderr shows `Error: TypeError: fetchData is not a function` followed by a stack trace.
- Checks of "Must be inside an async function":
  - `await` inside a normal function → `SyntaxError: await is only valid in async functions and the top level bodies of modules`
  - top-level `await` in an ES module (`.mjs`) works and prints `top-level await works in an ES module`
**Notes:** An `async` function always returns a Promise, as the `Promise { <pending> }` line shows. ES8 = ES2017.

## Page 57 — Comparison of Methods
**Text:**
- Callbacks: Pass a function to run later.
- Promises: Represent a future value with states.
- `async`/`await`: Built on Promises, but cleaner syntax.
- Callbacks: can cause nested "callback hell."
- Promises: chain with `.then()` / `.catch()`.
- `async`/`await`: looks synchronous, easier to read.
- Error handling: callbacks → manual, promises → `.catch()`, `async` → `try...catch`.
**Image content:** none (decorative only).
**Notes:** none.

## Page 58 — Async Problems & Pitfalls
**Text:**
- Callback hell: deeply nested, hard-to-read code.
- Forgetting `await`: unexpected Promises instead of values.
- Uncaught rejections: crashes if `.catch()` or `try...catch` missing.
- Race conditions: multiple `async` tasks finish in the wrong order.
- Blocking awaits in loops: slow performance vs running in parallel.
- Mixing sync & async code: bugs from assumptions about timing.
**Image content:** none (decorative only).
**Actual Node output:** Extra verification (`extra_async_claims.js`):
- Forgetting `await` gives `Promise { <pending> }`; with `await` you get `value`.
- Three 300 ms waits awaited one by one in a `for...of` loop take about 900 ms. The same three run with `Promise.all` take about 300 ms.
- The uncaught-rejection crash is shown on page 55, and a race condition on page 60.
**Notes:** none.

## Page 59 — Class Activity Time! (async challenge)
**Text:** Three pill boxes: "Predict the output" / "What's the order of tasks being done?" / "How did you came to that conclusion?"
**Image content:** Code window, path `Projects/University/web-ta/sampleprojects/js/asyncchallenge.js` (`=>` drawn as ⇒; the string is `"Waiting..."` with the three dots drawn as a ligature, and a character-cell count confirms no spaces):
```js
function task(name, time) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(name, "done");
      resolve(name);
    }, time);
  });
}

async function run() {
  const a = task("A", 1000);
  const b = task("B", 500);
  const c = await task("C", 300);

  console.log("Waiting...");
  const results = await Promise.all([a, b, c]);
  console.log("All finished:", results);
}

run();
```
**Actual Node output:** (`p59_asyncchallenge.js`)
```
C done
Waiting...
B done
A done
All finished: [ 'A', 'B', 'C' ]
```
Timed harness (`p59_timed_harness.js`; it only adds an elapsed-ms prefix, a `typeof c` log and one log after `run()`):
```
[   0 ms] (synchronous code after run() finished)
[ 301 ms] C done
[ 301 ms] typeof c = string | c = C
[ 301 ms] Waiting...
[ 501 ms] B done
[1001 ms] A done
[1001 ms] All finished: [ 'A', 'B', 'C' ]
```
**Notes:** CLASS ACTIVITY. Explanation:
- `task("A", 1000)` and `task("B", 500)` start their timers immediately (there is no `await`), so all three timers run at the same time.
- `await task("C", 300)` pauses `run()` for 300 ms. C finishes first ("C done"), then "Waiting..." prints.
- `Promise.all` then waits for B (500 ms after the start) and A (1000 ms).
- `results` follows the array order `[A, B, C]`, not the completion order.
- The total time is about 1 s, not 1.8 s, because the tasks overlap.
- `c` is already the string `"C"` because `await` unwraps the Promise, and `Promise.all` accepts non-promise values.
- Code after `run()` runs before anything inside it finishes.

## Page 60 — Class Activity Time! (race challenge)
**Text:** The same three pill boxes: "Predict the output" / "What's the order of tasks being done?" / "How did you came to that conclusion?"
**Image content:** Code window, path `Projects/University/web-ta/sampleprojects/js/racechallenge.js` (`=>` drawn as ⇒):
```js
let winner = null;

function race(name, time) {
  return new Promise(resolve => {
    setTimeout(() => {
      if (!winner) winner = name;
      resolve(name);
    }, time);
  });
}

async function run() {
  const results = await Promise.all([
    race("A", Math.random() * 500),
    race("B", Math.random() * 500),
    race("C", Math.random() * 500)
  ]);
  console.log("Winner:", winner);
  console.log("All finished:", results);
}

run();
```
**Actual Node output:** Non-deterministic. Over 12 runs of `p60_racechallenge.js`, the winners were B, A, A, A, B, C, C, A, A, B, A, C. The second line was always `All finished: [ 'A', 'B', 'C' ]`. Example run:
```
Winner: C
All finished: [ 'A', 'B', 'C' ]
```
The timed harness (`p60_timed_harness.js`) prints the random delays:
- Run 1: A = 324 ms, B = 300 ms, C = 262 ms. The finish order was C, B, A, so `Winner: C`.
- Run 2: A = 247 ms, B = 448 ms, C = 467 ms. The finish order was A, B, C, so `Winner: A`.
**Notes:** CLASS ACTIVITY.
- The winner is the task with the smallest random delay. The first timer to fire sets the shared `winner`; later ones skip because `!winner` is then false.
- This is a race condition (page 58): the order of completion is random on every run.
- `results` is always in input order `['A', 'B', 'C']`, because `Promise.all` preserves order whatever the finishing order.
- Both lines print only after all three tasks finish, because `Promise.all` waits for all of them.

## Page 61 — Resources
**Text:**
- https://javascript.info
- https://www.geeksforgeeks.org
**Image content:** none (decorative only).
**Notes:** none.

---

## Concept inventory

Every concept, term, keyword, API, operator, pitfall, example output and class-activity question in the deck (text and images), in slide order. Outputs marked "→" were verified with Node v24.22.2 unless marked otherwise.

- **p1:** Lecture "Make 'em Interactive!" (JavaScript makes pages interactive). CE 40419, Sharif University of Technology, Fall 2026, Ali Abrishami.
- **p2:** Lecture goals: what JavaScript is; its features and limitations; how async programming works in JS.
- **p3:** The three layers of a website: Structure (what the content is), Style (how it looks), Behaviour (how it reacts). JS is the behaviour layer.
- **p4:** Recap: structure, dividing content into sections, styling, the abilities and limits of CSS. Pages still can't be interactive without JS.
- **p5:** JavaScript is a real programming language. It runs in the browser AND on your machine (via Node.js). Created by Brendan Eich in 10 days in May 1995 at Netscape.
- **p6:** History:
  - 1995: first version, called Mocha.
  - 1996: Mocha → LiveScript → JavaScript, a name chosen to attract Java developers. JS has almost nothing to do with Java.
  - 1996: Microsoft's Internet Explorer copies it as JScript.
  - 1997: ECMA releases ECMAScript 1 (ES1), the first standard. ECMAScript = the standard; JavaScript = the language in practice.
- **p7:** 2009 ES5. 2015 ES6/ES2015, the biggest update ever. Since 2015 an annual release cycle (fewer features per update): ES2016, ES2017 … ES2021 …. "JavaScript Evolution" image.
- **p8:** Transpiling: converts new JS to older syntax, keeps code working on old browsers, uses tools like Babel or SWC, lets devs use future features, adds a small build step. Meme: Babel interprets "ES5+" code for the Browser.
- **p9 class activity:** explain 9 JS features: High Level; Garbage Collected; Interpreted/JIT Compiled; Multi-paradigm; Prototype-based OO; First-class functions; Dynamic; Single threaded; Non-blocking event loop.
- **p10:**
  - JS runs line by line in the browser via an engine, or on a machine via Node.js.
  - Engines: V8 (Chrome) and SpiderMonkey (Firefox).
  - Code is parsed, optimized and compiled to machine code.
  - Async tasks (timers, promises, user events) are handled without blocking.
  - The host provides APIs: DOM, HTTP, File system.
- **p11:**
  - JS runs inside an environment, which provides APIs (Application Programming Interfaces).
  - APIs let JS show messages, fetch data and manipulate the page; without them JS can only calculate.
  - Diagram: browser = V8 + Web APIs (Client Side); Node JS = V8 + System APIs (Server Side).
- **p12:** Console API: a built-in browser tool for debugging and inspecting values, reached through the global `console` object.
  - Methods: `console.log` (most common), `console.info`, `console.warn`, `console.error`, `console.table` (the last is mentioned only).
  - Slide question: "What does each line do?"
- **p13:** Where to write JS:
  - the browser DevTools → Console tab
  - inline `<script> ... </script>` in HTML
  - an external `.js` file linked with `<script src="...">` (like a CSS link)
  - online playgrounds: CodePen, JSFiddle, StackBlitz
- **p14:**
  - The DevTools console runs code line by line, like the Python shell.
  - Message types look different: info ⓘ; warn yellow ⚠; error red ❗ with an expandable stack trace.
  - Console methods return nothing, so the console shows `← undefined` after each call.
- **p15:**
  - Everything is either a primitive or an object.
  - 7 primitive types: number, string, boolean, undefined, null, Symbol, BigInt.
  - Dynamic typing: a variable can hold any type and change at runtime.
  - Arrays, functions and dates are specialized objects.
  - Type conversion is automatic (coercion) or explicit (casting).
- **p16:**
  - `number`: integers and floats. `string`: characters in quotes. `boolean`: only true/false.
  - `undefined`: declared but not assigned. `null`: intentional absence of a value.
  - `Symbol`: unique, immutable identifier, often used as object property keys (`Symbol("id") === Symbol("id")` → false).
  - `BigInt`: integers larger than `Number.MAX_SAFE_INTEGER` (→ 9007199254740991; `typeof 10n` → "bigint").
- **p17:**
  - Objects are key-value pairs grouping data and behaviour, and can nest objects, arrays and functions.
  - Arrays are ordered and accessed by numeric index, with built-in methods.
  - Functions are first-class objects (can be passed, stored and returned) and act as methods or standalone code.
- **p18:** Arithmetic operators `+`, `-`, `*`, `/`, `%` (remainder/modulo), `**` (exponentiation). Meme: "What is 1 + 1?" — Python 2, C++ 2, JS "11" (`"1" + 1` → "11"; `1 + 1` → 2).
- **p19:** Assignment operators `=`, `+=`, `-=`, `*=`, `/=`, `%=`. Meme "PROGRAMMERS DOING X = X+1" vs "MATHEMATICIANS" (assignment is not equality).
- **p20:**
  - Casting = converting a value's type.
  - Explicit: `Number("42")` → 42; `String(99)` → "99"; `Boolean(1)` → true.
  - Implicit (type coercion): `"5" + 1` → "51"; `2 * "3"` → 6.
  - Slide question: `"5" - 1` → 4.
- **p21:** Casting pitfalls:
  - `"5" + 1` → "51"; `true + true` → 2.
  - `null + 1` → 1, but `undefined + 1` → NaN.
  - `[] == false` → true; `[] == 0` → true.
  - `==` coerces, so prefer `===` (`[] === false` → false).
  - Meme / slide question: `array.sort()` on numbers gives `[1, 100000, 21, 30, 4]`, because the default sort compares strings. A numeric sort needs `(a, b) => a - b`.
- **p22:** Type coercion = automatic conversion when operand types differ; a key feature of dynamic typing.
  - String + anything → string: `'10' + 5` → "105".
  - `-`, `*`, `/` → numeric context: `'10' - 5` → 5; `'10' * 2` → 20.
  - Comparisons: `'5' == 5` → true (string→number); `false == 0` → true (boolean→number); `null == undefined` → true (special rule; `null === undefined` → false).
- **p23:**
  - Variables are containers for data, declared with `let`, `const`, or the older `var`.
  - `let` = changeable (mutable); `const` = fixed, cannot be reassigned; `var` = outdated, function-scoped, avoid.
  - Console demo: `const b = 13; b = 12` → Firefox "Uncaught TypeError: invalid assignment to const 'b'"; Node/V8 "TypeError: Assignment to constant variable."
  - `let a = 12` returns undefined in the console; `a = "Hello!"` returns "Hello!".
- **p24:**
  - `let` can be reassigned; `const` cannot. Both are block-scoped (exist only inside `{ ... }`).
  - BEST PRACTICE: `const` by default, `let` when reassignment is needed.
  - `pi = 3.1415` on a const → TypeError.
- **p25:**
  - A block is code inside `{ ... }`; `let`/`const` exist only inside their block.
  - Using `x` outside its block → `ReferenceError: x is not defined` (prints 10 first).
  - "blocks … organize and protect variables".
- **p26:** Global scope:
  - A global is declared outside any block, is accessible everywhere, and lives as long as the program.
  - In browsers globals become properties of `window` (strictly, only `var` and function declarations do).
  - Too many globals cause naming conflicts and are harder to maintain and debug.
  - `greet()` and the top level both print "Hello".
- **p27:** `var` problems:
  - function-scoped, not block-scoped, so it leaks out of `{}`
  - hoisting gives an unexpected `undefined`
  - allows redeclaration without error
  - global `var` attaches to `window` (global scope pollution)
  - inconsistent behaviour
  - LOTR meme: "old JS devs" refuse to destroy VAR.
- **p28:** Closure:
  - A function remembers the variables of its outer (parent) scope, even after the outer function ends.
  - Used for encapsulation, state and callbacks; common in functional languages.
  - `counter()` → `c()` 1, then 2.
  - BEWARE OF PITFALL: closures + `var` (verified: `var` loop + `setTimeout` → 3, 3, 3; `let` → 0, 1, 2).
- **p29:**
  - Control flow decides which code runs and when; JS runs top to bottom by default.
  - Conditionals (`if`, `else`) branch; loops (`for`, `while`) repeat.
  - Example: `age >= 18` → "You can vote!"; `for (let i = 1; i <= 3; i++)` → "Count: 1", "Count: 2", "Count: 3".
- **p30:** Conditionals: `if`; `if / else` (two paths); `else if` (chain conditions); `switch` (many specific cases).
- **p31:** Comparison operators:
  - `==` compares values with coercion; primitives are compared by value, not by reference.
  - `===` compares values and types.
  - `!=`, `!==`, `>`, `<`, `>=`, `<=`.
  - Logical `&&` (AND), `||` (OR), `!` (NOT), "just like C".
- **p32:** Loops:
  - `for` (a set number of times)
  - `while` (as long as the condition is true)
  - `do...while` (runs at least once, then checks)
  - `for...of` (items/values of an array)
  - `for...in` (keys of an object)
- **p33:**
  - A function is a reusable block of code that avoids repetition and keeps code organized.
  - Parameters are inputs; the return value is the output. Defined once, used many times.
  - Meme: function keywords JS `function`, Go `func`, Kotlin `fun`, Rust `fn`, Python `def`, plus Java's verbose method anatomy (modifier, return-type, method-name, parameter-list, body of the method).
- **p34:** Method I, function declaration:
  - Classic syntax with the `function` keyword.
  - Hoisted, so callable before or after the definition (verified: calling first → 5).
  - `add(2, 3)` → 5. "Remember, this can be hoisted!"
- **p35:** Method II, ES6 arrow function `const multiply = (a, b) => { return a * b; };`:
  - Shorter syntax, used for quick functions.
  - Not hoisted, so it must be defined before use (verified: `const` → ReferenceError "Cannot access 'multiply' before initialization"; `var` → TypeError "is not a function").
  - `multiply(4, 5)` → 20. "Remember, this cannot be hoisted!"
- **p36:** Declaration vs arrow:
  - `function` keyword vs shorter `=>`.
  - Declarations are hoisted; arrows are not.
  - Functions have their own `this`; arrows inherit `this`.
  - Meme: `function foo() {}` < `const foo = () => {}` < IIFE `(() => { })();`.
- **p37:** Hoisting:
  - Moving declarations before execution, so code runs as if declared at the top and variables/functions exist before use. Can cause unexpected behaviour.
  - Meme: "Using variable before declaration" — JS: "That feels weird, but I'll allow it".
- **p38:** Hoisting in JS:
  - Declarations move to the top of their scope; works for `var`, `function` and `class` (partially).
  - Variables are hoisted but not initialized.
  - Access before initialization gives `undefined` (`var`) or an error: `let`/`const`/`class` → ReferenceError "Cannot access … before initialization" (temporal dead zone).
  - Makes code order confusing.
- **p39:** Classes (ES6):
  - A cleaner way to create objects, with the `class` keyword; a blueprint for objects.
  - `constructor(name, age)`, `this.name = name`, method `greet()`, instance via `new User("Kermit", 22)`.
  - `kermit.greet()` → "Hello, Kermit".
- **p40:** Objects:
  - Group data and behaviour as key-value pairs; values are properties (data) or methods (functions).
  - JSON is a common way to store and share object data.
  - "Technically … almost everything is an object" (meme "Wait it's all OBJECTS" / "Always has been").
- **p41:** Object literals `{ key: value }`:
  - Keys are strings (or symbols); values can be any type.
  - Support methods (shorthand `greet() {}`) and nested objects; the basis of JSON.
  - `user.greet()` with `` `Hello, I'm ${this.name}` `` → "Hello, I'm Barry Allen".
- **p42:** Destructuring (slide title "Destructing"):
  - Extracts values from arrays or objects: `{}` for objects, `[]` for arrays.
  - Can rename and give default values (verified: `{ first: firstName, middle = "N/A" }` → Alice N/A).
  - `const { first, age } = person` → "Alice 30"; `const [primary, secondary] = colors` → "red green".
- **p43:** The `this` keyword:
  - Refers to the object calling the function.
  - In object methods it is the object; in classes, the created instance; in arrow functions, inherited from the outer scope.
  - Depends on how a function is called, not where it is defined.
- **p44:** `this` (cont.):
  - Global scope: `window` (browser) or `undefined` (strict mode).
  - Methods: the object before the dot. Arrow functions: lexical `this`.
  - Manual binding with `call`, `apply` and `bind` (verified: `f.call(obj)`, `f.apply(obj)` and `f.bind(obj)()` → "Robert").
  - `obj.say()` → "Robert".
  - `const f = obj.say; f()` loses `this`: → undefined (Node, sloppy), TypeError "Cannot read properties of undefined (reading 'name')" (strict/ES module), "" (browser, where `window.name` is a string; not run).
- **p45:** Arrays:
  - Ordered, with indexes starting at 0, and can hold mixed types.
  - Built-in methods for adding, removing and transforming; common ones: `push`, `pop`, `map`, `filter`, `forEach`.
  - Slide question: `const numbers = [1, 2, 3]; numbers.push(4); console.log(numbers[0]);` → 1. A `const` array can still be mutated.
- **p46:** Array methods:
  - `push`/`pop`: add/remove at the end.
  - `shift`/`unshift`: remove/add at the start.
  - `filter`: keep matches. `forEach`: run a function per element.
  - `find`/`findIndex`: the first matching element / its index.
  - `for...of`: iterates arrays, strings and other iterables.
- **p47:**
  - `map`: transforms each element into a NEW array, does not change the original; used for formatting/calculations.
  - `reduce`: combines all elements into a single value using an accumulator + current value; used for sums, averages, objects.
- **p48:** Example:
  - `students.map(s => s.score)` → `[ 85, 72 ]`
  - `scores.reduce((acc, s) => acc + s, 0)` → 157; average → 78.5
  - `students.map(s => ({ ...s, passed: s.score >= 70 }))` → both `passed: true`. Uses the spread operator `...`, and parentheses to return an object literal from an arrow function.
- **p49 class activity:** "Predict the output … trace the state of nums":
  - `nums` [1,2,3,4] → push(5) [1,2,3,4,5] → pop() [1,2,3,4] → unshift(0) [0,1,2,3,4] → shift() [1,2,3,4]
  - `map(n => n * 2)` → doubled [2,4,6,8]; `filter(n => n % 2 === 0)` → evens [2,4]; neither mutates `nums`.
  - `forEach(console.log)` prints 1 2 3 4 and returns undefined.
  - `find(n => n > 2)` → 3; `findIndex(n => n > 2)` → 2. Printed output: 1, 2, 3, 4, 3, 2.
  - `push`/`unshift` return the new length (5); `pop` returns 5; `shift` returns 0.
- **p50:** Error handling:
  - Runtime errors stop the program if unhandled.
  - `try...catch` runs risky code safely; `throw` creates custom errors; `finally` always runs.
  - BEST PRACTICE: catch only errors you can handle.
  - `JSON.parse("{ bad json }")` → SyntaxError → "Oops: Expected property name or '}' in JSON at position 2 (line 1 column 3)" then "Done!".
- **p51:** Template literals (ES6):
  - Backticks; multi-line strings without `\n`; interpolation `${expression}`.
  - Output "You ordered: 2 × Laptop" / "Total price: $2400" (a literal `$` before `${}`) / "Thank you for shopping with us!", with an empty first and last line.
- **p52:** JSON:
  - A text format for storing and exchanging data. Like JS objects but stricter: keys and strings in double quotes.
  - `JSON.stringify(obj)` → string; `JSON.stringify(order, null, 2)` = pretty-print with a 2-space indent.
  - `JSON.parse(jsonStr)` → object; `obj.customer.email` → "alex@example.com".
- **p53:**
  - JS is single-threaded (one task at a time); slow operations (fetching data, timers) shouldn't block, so JS uses asynchronous code that lets other tasks run while waiting.
  - Diagram: Synchronous (A waits for B's response) vs Asynchronous (A continues working and gets the response later).
- **p54:** Method I, callbacks:
  - A function passed as a value to another function, executed when the event happens.
  - Timers are the common example: `setTimeout(fn, 1000)` → "Data received!" after 1 s.
  - Each callback adds nesting, so code gets complicated quickly (callback hell).
  - BEST PRACTICE: callbacks for simple cases; break logic into smaller functions.
- **p55:** Method II, Promises:
  - A value that may arrive now, later or never.
  - States: pending, then fulfilled or rejected; it settles only once (the slide writes "pending → fulfilled → rejected").
  - `new Promise((resolve, reject) => …)`; `.then()` for success, `.catch()` for errors; avoids callback nesting.
  - → "Data received!"; the reject variant → "Error occurred!" via `.catch`.
  - BEST PRACTICE: always add `.catch()`. Unhandled rejections crash apps (verified: Node exits with code 1, ERR_UNHANDLED_REJECTION).
- **p56:** Method III, async/await (built on Promises, ES8+/ES2017):
  - Async code that looks synchronous.
  - `async` makes a function return a Promise (verified: `Promise { <pending> }`).
  - `await` pauses until a Promise resolves. It must be inside an `async` function (or the top level of an ES module, verified); elsewhere → SyntaxError.
  - BEST PRACTICE: wrap `await` in `try...catch`; the example uses `console.error("Error:", err)`.
- **p57:** Comparison:
  - Callbacks: pass a function to run later; "callback hell"; manual error handling.
  - Promises: a future value with states; chain `.then()`/`.catch()`; errors via `.catch()`.
  - `async`/`await`: built on Promises with cleaner syntax; looks synchronous and is easier to read; errors via `try...catch`.
- **p58:** Async pitfalls:
  - callback hell
  - forgetting `await` gives a Promise instead of the value (verified: `Promise { <pending> }`)
  - uncaught rejections crash the app without `.catch()`/`try...catch`
  - race conditions: async tasks finish in the wrong order
  - blocking awaits in loops are slower than running in parallel (verified: 3 × 300 ms sequential ≈ 900 ms vs `Promise.all` ≈ 300 ms)
  - mixing sync and async code causes timing bugs
- **p59 class activity:** "Predict the output / What's the order of tasks being done? / How did you came to that conclusion?":
  - Code: `task("A", 1000)` and `task("B", 500)` started without await, `await task("C", 300)`, then `console.log("Waiting...")` and `await Promise.all([a, b, c])`.
  - → `C done`, `Waiting...`, `B done`, `A done`, `All finished: [ 'A', 'B', 'C' ]`.
  - About 1 s total; results in array order.
- **p60 class activity:** same three questions:
  - Code: `race("A"/"B"/"C", Math.random() * 500)` with a shared `winner` (`if (!winner) winner = name;`) and `await Promise.all([...])`.
  - → `Winner: <random A/B/C>` (the shortest random delay wins, a race condition), then always `All finished: [ 'A', 'B', 'C' ]` (`Promise.all` keeps input order). Both print after all three finish.
- **p61:** Resources: https://javascript.info, https://www.geeksforgeeks.org.


