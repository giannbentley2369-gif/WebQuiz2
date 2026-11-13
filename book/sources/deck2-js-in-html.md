# Transcript — "4 - JS in HTML.pdf" (Web Programming CE 40419, Sharif University of Technology, Spring 2026)

- Source: `/tmp/hoplite/workspace/4 - JS in HTML.pdf`, 40 pages, lecturer **Ali Abrishami**. Lecture title: **"Structure Meets Behaviour!"**
- Method: every page image (150 DPI) was viewed, and every code window and diagram was re-rendered at 300 DPI and cropped (`pdftoppm`) to read it exactly. The text layer (`pdftotext -layout`) was used for the bullet text.
- Code is transcribed in plain ASCII (the slides' ligature font draws `=>` as "⇒"). Indentation, quotes and semicolons are copied exactly as shown. Every code window shows a file path at the top (`Projects/University/web-ta/sampleprojects/dom/...`), which is reproduced as the first line of the description.
- Verification: the DOM examples were run in **jsdom 31.0.1** (`runScripts: "dangerously"`, VirtualConsole forwarding the page's console output, and synthetic `click`, `input`, `submit` and `keydown` events). The plain JS was run in **Node v24.22.2**. The scripts are in `/tmp/work/scratch-deck2/` (`harness.js`, `t01_p10_tree.js` … `t12_this_browser.js`), and each can be re-run with `node <file>`.
- jsdom limitations (these affect only the verification, not the slides): it has no `innerText` (the harness adds a shim that maps it to `textContent` where noted), no `alert`/`confirm`/`prompt` (they report "Not implemented"), no real layout (`innerWidth`/`innerHeight` are fixed at 1024×768), and no navigation on form submit.
- Every slide has the same decorative frame: a grey header bar reading "▶ Web Programming" on the left and "Spring - 2026" on the right, a light grid background, macOS-style red/yellow/green window dots on the content cards, and the page number in the bottom-right corner. These are not repeated below.

---

## Page 1 — Structure Meets Behaviour! (title slide)
**Text:** Header: "Web Programming   CE 40419   Sharif University of Technology … Spring - 2026". Title: **"Structure Meets Behaviour!"** Author (top right): "Ali Abrishami". Page number 1.
**Image content:** none (decorative only). It shows a drawn grid with a yellow rectangle, a blue right triangle and an orange-red circle, which are abstract shapes with no technical meaning.
**Verified behaviour:** n/a
**Notes:** The title connects to page 3: HTML is the **structure** layer and JavaScript is the **behaviour** layer. The lecture is about JS working on HTML through the DOM.

## Page 2 — In This Lecture You Will…
**Text:** Three cards: (a) "Learn What DOM is"; (b) "Figure out a way to make your pages interactive"; (c) "Understand async programming usages in web".
**Image content:** none (decorative only). Each card shows a pixel-art letter (a, b, c) on a red, yellow or green background.
**Verified behaviour:** n/a
**Notes:** Goal (c), async, is covered in this deck only by the reminder slide on page 6, the timers (`setTimeout`/`setInterval`) on page 36, and the statement on pages 38–39 that storage is **synchronous**. There is no dedicated async-in-browser example (such as `fetch`) in this deck.

## Page 3 — REMINDER: The Three Layers of a Website
**Text:** Three cards:
- **Structure**: "What the **content** is"
- **Style**: "How it **looks**"
- **Behaviour**: "How it **reacts**"

(The words content, looks and reacts are bold on the slide.)
**Image content:** none (decorative only).
**Verified behaviour:** n/a
**Notes:** The slide does not name the technologies, but the conventional mapping (from the previous lecture) is Structure = HTML, Style = CSS, Behaviour = JavaScript.

## Page 4 — REMINDER: Objects
**Text:**
- Objects group related data and behavior.
- Made of key-value pairs.
- Values can be data (properties) or functions (methods).
- JSON (JavaScript Object Notation) is a common way to store & share object data.
- Caption box (italic): "Technically speaking, in JavaScript, almost everything is an object."

**Image content:** The "Always has been" astronaut meme (imgflip.com watermark):
- the Earth is labelled with the JavaScript logo (the word "JavaScript" above a yellow "JS" shield);
- the first astronaut, looking at Earth, says "Wait it's all **OBJECTS**";
- the second astronaut, behind him and pointing a gun, says "Always has been".

The joke is that in JS (almost) everything is an object.
**Verified behaviour (Node, `t11_reminders.js`):**
- An object with a property and a method: `student.name` → `Ali`, and `student.greet()` → `Hi, I am Ali`.
- `JSON.stringify(student)` → `{"name":"Ali","age":20}`, so **methods are dropped** by JSON.
- `JSON.parse('{"name":"Sara","age":21}')` → an object whose `age` is a `number`.
- `typeof []` → `object`, `typeof function(){}` → `function`, and `typeof null` → `object`.
- Primitives behave like objects through wrapper objects: `(5).toFixed(1)` → `"5.0"`, and `"abc".length` → `3`. This is why the slide says "almost".

**Notes:** This is a recap from the previous lecture. The DOM, which is introduced later in this deck, is made of exactly such objects.

## Page 5 — REMINDER: `this` Keyword
**Text:**
- Refers to the object that is calling the function.
- In objects, `this` points to the object itself.
- In classes, `this` points to the created instance.
- In arrow functions, `this` is inherited from the outer scope.
- The value of this depends on how a function is called, not where it's defined.

(The title word "this" and the inline `this` are shown in green monospace.)
**Image content:** none (decorative only).
**Verified behaviour (Node, `t11_reminders.js`):**
- `obj.regular()` → `"obj"`.
- The same function called through another object, `other.regular()`, → `"other"`. The result depends on the caller.
- A detached call (`const f = obj.regular; f()`) → `undefined`, because `this` is the global object in sloppy mode, which has no `name`.
- An arrow function written as an object-literal property does not get the object as `this`; it inherits the outer `this`. In a Node CommonJS module that is `module.exports` (`{}`); in a browser classic script it would be `window`.
- An arrow function inside a method inherits the method's `this` → `"obj"`.
- `new Person("Reza").hello()` → `"I am Reza"`, so `this` is the instance.
- `call` and `bind` override `this` → `"called"`, `"bound"`.
- The same code in a browser-like classic script (jsdom, `t12_this_browser.js`): the detached `f()` returns **`""`** (an empty string), not `undefined`, because `this` is `window` and **`window.name` is a built-in property equal to `""`**. The arrow function in the object literal gives `this === window` → `true`. Questions that use a `name` property with `this` should therefore specify Node or browser.

**Notes:** This connects to DOM events (page 18). In a `function` listener `this` is the element, but in an arrow listener `this` is the outer `this`. The jsdom check: an arrow listener at the top level had `this === window` → `true`, while a named `function` listener had `this.id` equal to the button's id.

## Page 6 — REMINDER: Async JS
**Text:**
- Callbacks: Pass a function to run later.
- Promises: Represent a future value with states.
- `async`/`await`: Built on Promises, but cleaner syntax.
- Callbacks: can cause nested "callback hell."
- Promises: chain with `.then()` / `.catch()`.
- `async`/`await`: looks synchronous, easier to read.
- Error handling: callbacks → manual, promises → `.catch()`, async → `try...catch`.

**Image content:** none (decorative only).
**Verified behaviour (Node, `t11_reminders.js`):**
- A callback with a manual `err` check printed `cb failed`.
- `.then` printed `promise data`, and `.catch` printed `promise failed`.
- `await` inside `try...catch` printed `promise data`, then caught `promise failed`.
- The ordering reminder printed `order: synchronous log` → `order: promise microtask` → `order: setTimeout 0`, i.e. synchronous code, then microtasks, then timers.

**Notes:** The slide does not name the Promise states. They are pending, fulfilled and rejected (background knowledge).

## Page 7 — A Deeper View on Markup Languages
**Text:**
- Markup languages describe structure using tags
- Examples: HTML, XML, Markdown
- Documents are arranged in a **hierarchical tree**
- Parent and child elements show how content nests
- This tree model is the foundation of the **DOM**

**Image content:** A generic tree diagram (caption "Source: Board Infinity") made of red-outlined circles and blue edges:
```text
        A
     /  |  \
    B   C   D        (A→B, A→C, A→D drawn as arrows)
   / \
  E   F              (B→E, B→F drawn as arrows)
  |   |
  G   H              (E–G and F–H drawn as plain lines, no arrowheads)
```
A is the root. B, C and D are children of A (and siblings of each other). E and F are children of B. G is the child of E and H is the child of F. C, D, G and H are leaves.
**Verified behaviour:** n/a (concept slide).
**Notes:** The tree vocabulary (root, parent, child, sibling, leaf) is implied by the slide but not written on it.

## Page 8 — From Markup To DOM
**Text:**
- Browser parses HTML into a tree of nodes
- Each tag becomes an element node in the tree
- Text inside tags becomes text nodes
- Attributes become node properties
- This DOM tree is what JavaScript can access & modify
- Caption box (italic): "Look how the DOM tree organizes the elements."

**Image content:** The W3Schools DOM tree diagram (caption "Source: W3Schools"), drawn as rectangular boxes joined by lines:
```text
Document
└── Root element: <html>
    ├── Element: <head>
    │   └── Element: <title>
    │       └── Text: "My title"
    └── Element: <body>
        ├── Element: <a>   ──── Attribute: "href"   (attribute box drawn to the LEFT of <a>, joined by a horizontal line)
        │   └── Text: "My link"
        └── Element: <h1>
            └── Text: "My header"
```
**Verified behaviour (jsdom, `t10_hierarchy.js`):**
- Parsing `<html><head><title>My title</title></head><body><a href="#">My link</a><h1>My header</h1></body></html>` gives exactly this tree: `#document → html → head → title → #text "My title"`, and `body → a{href} → #text "My link"` and `h1 → #text "My header"`.
- **The attribute is not a child node.** The `Attr` object hangs off its element; `a.childNodes` contains only the text node.
- When the same HTML is written with newlines and indentation, **whitespace-only `#text` nodes** appear between the elements: `body.childNodes.length = 5` but `body.children.length = 2`, and `body.firstChild` is a `#text` node while `body.firstElementChild` is `A`. Also `a.parentNode` is `BODY` and `a.nextElementSibling` is `H1`.

**Notes:** In this diagram `<a>` comes before `<h1>`; on page 9 the order is reversed.

## Page 9 — What is the DOM?
**Text:**
- DOM is short for **Document Object Model**
- A tree-based representation of a webpage
- Connects HTML structure with JavaScript
- Lets programs read, modify, add, or remove elements
- Acts as a bridge between content and interactivity

**Image content:** A coloured DOM diagram (caption "Source: Milne Publishing"). A grey band on the left carries the vertical text "**DOM**" and "Document Object Model". The tree:
```text
document                              (pink box)
└── Root element: <html>              (lavender box)
    ├── Element: <head>               (blue box)
    │   └── Element: <title>          (yellow box)
    │       └── Text: "My title"      (tan box)
    └── Element: <body>               (blue box)
        ├── Element: <h1>             (yellow)
        │   └── Text: "A heading"     (tan)
        └── Element: <a>  ── Attribute: href   (grey/lilac box attached to the RIGHT of <a>)
            └── Text: "Link text"     (tan)
```
**Verified behaviour (jsdom, `t10_hierarchy.js`):** `<html><head><title>My title</title></head><body><h1>A heading</h1><a href="#">Link text</a></body></html>` parses to exactly this tree.
**Notes:** The diagram's root box is written in lowercase, `document`, matching the JS object name.

## Page 10 — Class Activity Time! (Draw the DOM tree)
**Text:** "Draw the DOM tree for this HTML code"
**Image content:** A code window titled `Projects/University/web-ta/sampleprojects/dom/sample.html`:
```html
<html>
    <head>
        <title>sample page here :)</sample>
        <link rel="stylesheet" href="./style.css">
    </head>
    <body>
        <h1>SAMPLE PAGE!</h1>
        <div class="sampleclass">
            <p>sample paragraph in sample class in sample page!</p>
            <h3 id="2223">wait wha-?</h3>
        </div>
    </body>
</html>
```
The 300 DPI crop confirms that the title line really closes with **`</sample>`**, not `</title>`. It also confirms that there is no `<!DOCTYPE html>`.

**Verified behaviour (jsdom/parse5, `t01_p10_tree.js`):**

1. **Intended answer**, with `</sample>` corrected to `</title>` (whitespace-only text nodes hidden):
```text
#document
└── html
    ├── head
    │   ├── title
    │   │   └── #text "sample page here :)"
    │   └── link  {rel="stylesheet", href="./style.css"}
    └── body
        ├── h1
        │   └── #text "SAMPLE PAGE!"
        └── div  {class="sampleclass"}
            ├── p
            │   └── #text "sample paragraph in sample class in sample page!"
            └── h3  {id="2223"}
                └── #text "wait wha-?"
```
   With whitespace shown, the real tree also contains `#text "\n        "` nodes between the siblings, for example `head` has 5 child nodes: ws, title, ws, link, ws. In that version, `document.title` → `"sample page here :)"`, `getElementById("2223")` → `<h3 id="2223">wait wha-?</h3>`, and `body.children` → `H1, DIV`.

2. **Verbatim slide code**, with `</sample>`: `<title>` is a raw-text (RCDATA) element, so the parser treats **everything** up to a matching `</title>` as text. Because none exists, the entire rest of the file becomes the title's single text node, and **`<body>` is empty**:
   - `title #text = "sample page here :)</sample>\n        <link rel=\"stylesheet\" href=\"./style.css\">\n    </head>\n    <body>\n        <h1>SAMPLE PAGE!</h1> … </html>"`
   - `document.title` = `sample page here :)</sample> <link rel="stylesheet" href="./style.css"> </head> <body> <h1>SAMPLE PAGE!</h1> <div class="sampleclass"> <p>sample paragraph in sample class in sample page!</p> <h3 id="2223">wait wha-?</h3> </div> </body> </html>`
   - `getElementById("2223")` → `null`, and `body.children` → (none).

   Browsers use the same HTML5 parsing algorithm, so a real browser would show a blank page with that long text as the tab title.

3. With no `<!DOCTYPE html>`, `document.compatMode` is `"BackCompat"` (quirks mode) and `document.doctype` is `null`.

4. The id `"2223"` starts with a digit. `document.querySelector("#2223")` **throws `SyntaxError: Invalid selector`**. `getElementById("2223")` works, and so does `querySelector('[id="2223"]')`.

**Notes:** The intended learning goal is the corrected tree. The `</sample>` is almost certainly a typo, but it is a usable trap ("which closing tag is wrong?"). The `class` and `id` attributes belong in the tree as properties of their element nodes (page 11), not as children.

## Page 11 — DOM Structure
**Text:**
- Root node is `document`
- Elements: tags (`<div>`, `<p>`)
- Attributes: properties (`id`, `class`)
- Text: text nodes
- All connected in a hierarchical tree

**Image content:** A class (inheritance) hierarchy diagram (caption "Source: StackOverflow"). It uses rounded light-blue boxes, and the tree is drawn left to right:
```text
Node
├── Document ──── HTMLDocument
├── CharacterData
│   ├── Text
│   └── Comment
├── Element ──── HTMLElement
│                ├── HTMLHeadElement
│                ├── HTMLBodyElement
│                ├── HTMLTitleElement
│                ├── HTMLParagraphElement
│                ├── HTMLInputElement
│                ├── HTMLTableElement
│                └── … etc.        (a dotted line continues below, meaning many more element types)
└── Attr
```
**Verified behaviour (jsdom, `t10_hierarchy.js`):** the prototype chains are:
- `<head>`: HTMLHeadElement → HTMLElement → Element → Node → EventTarget.
- `<body>`, `<title>`, `<p>`, `<input>` and `<table>` follow the same pattern with HTMLBodyElement, HTMLTitleElement, HTMLParagraphElement, HTMLInputElement and HTMLTableElement.
- Text node: Text → CharacterData → Node → EventTarget.
- Comment node: Comment → CharacterData → Node → EventTarget.
- Attr: Attr → Node → EventTarget. It is **not** in any element's `childNodes`.
- `document`: `document instanceof HTMLDocument` is `true`. jsdom reports its constructor as `Document`; real browsers report `HTMLDocument` (chain HTMLDocument → Document → Node → EventTarget).
- `nodeType` values: element `1`, attr `2`, text `3`, comment `8`, document `9`.
- `nodeName` values: document `#document`, text `#text`, element uppercase tag (e.g. `BODY`).
- `document.documentElement` is the `<html>` element (the "root element"), while `document` itself is the root **node**.

**Notes:** The top of the chain, `EventTarget`, is not shown in the diagram. It is why every node can call `addEventListener`.

## Page 12 — DOM Hierarchy In JS
**Text:**
- `window`: the top-level browser object (global context, remember?)
- `document`: represents the web page inside the window
- Elements: tags (`<div>`, `<p>`, `<h1>`) as objects in the DOM tree
- Attributes & Text: properties of element nodes
- Events: methods & listeners that connect JS to user actions

**Image content:** An object hierarchy diagram (caption "Source: CIS") made of green boxes:
```text
window
├── document
│     (children drawn as two columns on either side of a vertical line)
│     left column:  anchors, applets, embeds, frames, images
│     right column: links, plugins, scripts, stylesheets, forms
│     forms ──── elements
├── event
├── frames
├── location
├── history
├── navigator
│   ├── plugins
│   └── mimeTypes
└── screen
```
The rows pair up as follows: anchors | links; applets | plugins; embeds | scripts; frames | stylesheets; images | forms → elements.

**Verified behaviour (jsdom, `t10_hierarchy.js`):**
- These all exist: `window.document`, `window.frames` (which **equals `window` itself**), `window.location`, `window.history`, `window.navigator` and `window.screen`.
- `window.event` is `undefined` outside an event handler. It is a deprecated legacy property.
- `navigator.plugins` and `navigator.mimeTypes` exist (both empty in jsdom).
- `document.anchors`, `links`, `applets`, `plugins`, `embeds`, `scripts`, `images` and `forms` are all `HTMLCollection`s. `document.applets` is always empty, because applets are obsolete.
- `document.frames` is **undefined**; frames belong to `window`.
- The real property is **`document.styleSheets`** (capital S, a `StyleSheetList`); `document.stylesheets` is undefined.
- `document.forms[0].elements` is an `HTMLFormControlsCollection`, and `document.forms.f === document.forms[0]` (forms can be accessed by id or name).

**Notes:** This is an old, "classic BOM" diagram. Its key message is that `window` sits at the top, `document` is one of its children, and `window` has other children too, which links to the page 37 question.

## Page 13 — The `document` Object
**Text:**
- Represents the entire web page in the browser
- Acts as the entry point to the DOM tree
- Provides methods to find elements (`getElementById`, `querySelector`)
- Lets JS create, remove, or update nodes

**Image content:** A code window titled `Projects/University/web-ta/sampleprojects/dom/doc.html` (2-space indentation):
```html
<!DOCTYPE html>
<html>
  <body>
    <h1 id="title">Hello World</h1>
    <button id="btn">Change Text</button>

    <script>
      // Access an element
      const heading = document.getElementById("title");

      // Add event to button
      document.getElementById("btn").addEventListener("click", () => {
        heading.textContent = "Text Changed via document!";
      });
    </script>
  </body>
</html>
```
**Verified behaviour (jsdom, `t02_p13_p14.js`):**
- Before the click: `<h1 id="title">Hello World</h1>`.
- After clicking `#btn`: `<h1 id="title">Text Changed via document!</h1>`.
- A second click changes nothing visible, because it sets the same text again.

**Notes:** The script sits at the end of `<body>`, after the elements it uses, so `getElementById` finds them. The listener is an arrow function. `heading` is captured in a closure, so it is looked up only once.

## Page 14 — The `document` Object (cont.)
**Text (callout boxes):** "Let's run this code" / "It has JavaScript embedded inside HTML (remember?)" / "Can you predict what's going to be printed in the console?"
**Image content:** A code window titled `Projects/University/web-ta/sampleprojects/dom/doc.html`:
```html
<!DOCTYPE html>
<html>
  <body>
    <h1 id="title">Hello World</h1>

    <script>
      const heading = document.getElementById("title");
      console.log(heading)
      </script>
  </body>
</html>
```
`console.log(heading)` has **no semicolon**; automatic semicolon insertion makes this fine. `</script>` is indented 6 spaces, which is cosmetic only.

**Verified behaviour (jsdom, `t02_p13_p14.js`):**
- The page logs the element object itself: `[HTMLHeadingElement] <h1 id="title">Hello World</h1>`.
- The `console.log(...)` call is on **line 8, column 15** of the file, which matches the Firefox source link `doc.html:8:15` on page 15.
- Variant 1: the same script placed in `<head>`, **before** the `<h1>`, logs **`null`**, because the element has not been parsed yet.
- Variant 2: wrapping the code in `document.addEventListener("DOMContentLoaded", …)` inside `<head>` logs the element again.

**Notes:** The answer to the slide's question is that the `<h1>` element node is printed, not its text and not a string.

## Page 15 — The `document` Object (cont.)
**Text (right-hand box):** "The element itself has been printed in the console, which makes sense, since we logged the element to the console. Now, let's ask ourselves, what other cool things can `document` do?!"
**Image content:** A Firefox screenshot (window title "Mozilla Firefox", dark custom theme):
- **URL bar:** `file:///home/mani/Projects/University/web-ta/sampleprojects/dom/doc…` (truncated), zoom badge `133%`.
- **Page (left):** a large bold serif heading, "Hello World".
- **DevTools (right), Console tab active.**
  - Top toolbar: element-picker icon, "Console" (active), "»", a red error badge **"1"**, responsive-mode icon, "•••", and close "X".
  - Second row: trash-can (clear) icon, a "Filter Output" box, and a settings gear.
  - Filter toggles: **"Errors (1)"** is not highlighted, i.e. errors are hidden. "Warnings", "Info", "Logs" and "Debug" are highlighted. A further button at the right edge is cut off.
  - Output row: **`▶ <h1 id="title">`**, followed by a crosshair "select element in page" icon, with the clickable source link **`doc.html:8:15`** on the right.
  - Below it is the input prompt `»` with a cursor.

**Verified behaviour:** This matches the jsdom result on page 14. Firefox shows the element collapsed (only the opening tag, with ▶ to expand its children).
**Notes:** The slide does not explain the "Errors (1)" badge, and the error is hidden by the filter. It is unrelated to the example.

## Page 16 — Querying DOM Elements
**Text:**
- Use JavaScript to find elements on the page
- `getElementById("id")`: finds one element by its ID
- `getElementsByClassName("class")`: finds all elements with that class
- `getElementsByTagName("tag")`: finds all elements with that tag
- `querySelector("selector")`: finds the first match using CSS selectors
- `querySelectorAll("selector")`: finds all matches using CSS selectors

**Image content:** none (decorative only).
**Verified behaviour:** see page 17.
**Notes:** Method names use camelCase. `getElementById` is singular ("Element"), while `getElementsByClassName` and `getElementsByTagName` are plural ("Elements").

## Page 17 — Class Activity Time! (What does each line do?)
**Text:** "What does each line of this JavaScript code snippet do?"
**Image content:** A code window titled `Projects/University/web-ta/sampleprojects/dom/sample.js`:
```js
const title = document.getElementById("title");
const buttons = document.getElementsByClassName("btn");
const paragraphs = document.getElementsByTagName("p");
const firstInput = document.querySelector("input[type='text']");
const allLinks = document.querySelectorAll("a.nav-link");
```
**Verified behaviour (jsdom, `t03_p17_query.js`, run against a test page with matching elements):**

| Line | What it does | Result (verified) |
|---|---|---|
| `getElementById("title")` | the one element whose `id` is `title` (no `#`) | `HTMLHeadingElement <h1 id="title">`; returns `null` if there is no match |
| `getElementsByClassName("btn")` | every element having the class `btn`, including `class="btn primary"` | `HTMLCollection`, length 2; **live**; no `.forEach` |
| `getElementsByTagName("p")` | every `<p>` | `HTMLCollection`, length 2; **live** (became 3 after a `<p>` was appended) |
| `querySelector("input[type='text']")` | the **first** `<input>` whose `type` attribute is `text` (CSS attribute selector), in document order | skipped an earlier checkbox input and returned the first text input; `null` if there is no match |
| `querySelectorAll("a.nav-link")` | every `<a>` with the class `nav-link` (tag.class selector) | `NodeList`, length 2; **static** (stayed 2 after another `a.nav-link` was added); has `.forEach` |

Other verified facts:
- On a miss, `getElementById('nope')` → `null`, `querySelector('.nope')` → `null`, `querySelectorAll('.nope').length` → `0`, and `getElementsByClassName('nope').length` → `0`. The collection methods **never return null**.
- `getElementById('#title')` → `null`, because a `#` is wrongly included.
- `querySelector('title')` is a **tag** selector, so it found no `<title>` element here (`null`). It needs `'#title'`.
- `getElementsByClassName('btn primary')` matches elements that have **both** classes (1 element).
- `Array.from(buttons).map(b => b.textContent)` → `["A","B"]`. Items can be read with `buttons[0]` or `buttons.item(1)`.

**Notes:** In the slide code the results are stored with `const`. The `input[type='text']` selector uses single quotes inside a double-quoted string.

## Page 18 — Events
**Text:**
- Events let webpages react to user actions
- Common events: `click`, `input`, `submit`, `keydown`, `load`, etc.
- Handlers can be set using HTML attributes or JavaScript
- `addEventListener` is the modern way to attach events
- Multiple handlers can be added to the same event
- Events enable interactive and dynamic user experiences

**Image content:** none (decorative only).
**Verified behaviour (jsdom, `t05_events.js`):**
- **HTML attribute handler** (`onclick="console.log('…', this.id)"`): runs on click, and `this` is the element (printed `attr`). `getAttribute('onclick')` returns the code string, and `.onclick` is a `function`.
- **JS property handler**: assigning `el.onclick = …` twice keeps **only the last one** (printed only "onclick property #2 (overwrote #1)").
- **`addEventListener`**: several listeners on the same event **all run, in registration order** ("listener A", then "listener B").
  - The same function reference added twice for the same event runs **only once**.
  - A `function` listener's `this` is the element. An arrow listener's `this` is the outer `this` (here `window`); use `e.target` or `e.currentTarget` instead.
  - `e.type` is `"click"`.
  - `removeEventListener` with the same function reference removes it (that listener never printed).
- **Common events:**
  - `input` fired with `e.target.value` = `"hi"`.
  - `keydown` gave `e.key` = `"Enter"`.
  - `DOMContentLoaded` fired, then window `load` fired.
  - `submit` with `event.preventDefault()` gave `defaultPrevented = true`.
- **Bubbling:** clicking the inner `<span>` ran its own listener first, then the outer `<div>`'s listener (`target` = inner, `currentTarget` = outer).

**Notes:** Events are written without the "on" prefix in `addEventListener('click', …)`, but with it in the attribute or property (`onclick`).

## Page 19 — Example: Button Action
**Text:** (title only)
**Image content:** A code window titled `Projects/University/web-ta/sampleprojects/dom/doc.html`:
```html
<!DOCTYPE html>
<html>
  <body>
    <h1 id="title">Hello World</h1>
    <button>CLICK ME!</button>

    <script>
      const btn = document.querySelector('button');

      btn.addEventListener('click', () => {
        const title = document.querySelector('#title');
        title.textContent = 'Goodbye World';
        title.style.color = 'red';
      });
    </script>
  </body>
</html>
```
**Verified behaviour (jsdom, `t04_examples.js`):**
- Before the click: `<h1 id="title">Hello World</h1>  <button>CLICK ME!</button>`.
- After one click: `<h1 id="title" style="color: red;">Goodbye World</h1>`, and `title.style.color` → `"red"`.
- `style.color` writes an inline `style` attribute.

**Notes:** `querySelector('button')` is a tag selector that picks the first button. `querySelector('#title')` uses `#` because it takes a CSS selector, unlike `getElementById("title")`.

## Page 20 — Example: Button Action (cont.)
**Text:** (title only)
**Image content:** A Firefox screenshot ("Mozilla Firefox"; URL `file:///home/mani/Projects/University/web-ta/sampleprojects/dom/doc.html`, partly hidden by the theme artwork; zoom `133%`). The page shows a large bold serif heading, **"Hello World"** (black), and below it a button labelled **"CLICK ME!"**. This is the state **before** the click.
**Verified behaviour:** matches the jsdom "before" state.
**Notes:** —

## Page 21 — Example: Button Action (cont.)
**Text:** (title only)
**Image content:** The same Firefox window **after** the click. The heading now reads **"Goodbye World"** in **red**, and the "CLICK ME!" button is unchanged.
**Verified behaviour:** matches the jsdom "after" state (`style="color: red;"`, text "Goodbye World").
**Notes:** —

## Page 22 — Manipulating The DOM
**Text:**
- The DOM represents the page as a tree of objects
- JavaScript can change text, HTML, and styles dynamically
- You can create, insert, and remove elements on the fly
- Attributes like `id`, `class`, and `src` can be modified easily
- Methods like `getElementById` and `querySelector` help find elements
- DOM manipulation powers interactive, dynamic web pages

**Image content:** none (decorative only).
**Verified behaviour:** see pages 23, 27 and 31. Style changes use camelCase properties: `p.style.backgroundColor = 'yellow'; p.style.fontSize = '20px'` produced `style="background-color: yellow; font-size: 20px;"`.
**Notes:** —

## Page 23 — Adding New Elements
**Text:**
- Use `document.createElement("tag")` to create a new element
- Set text using `.innerText` or `.innerHTML`
- Add attributes with `.setAttribute("name", "value")`
- Append the element using `.appendChild()` or `.append()`
- Insert elements before others with `.insertBefore()`
- Combine with events for dynamic UI changes

**Image content:** none (decorative only).
**Verified behaviour (jsdom, `t06_add_remove_modify.js`):**
- `createElement('li')` returns an `HTMLLIElement` that is **not in the page yet** (`isConnected = false`) until it is appended.
- `appendChild(node)` adds the node as the last child and **returns the appended node**. `appendChild("string")` throws `TypeError … parameter 1 is not of type 'Node'`.
- `append(d, 'text-node')` accepts **several nodes and/or strings** (strings become text nodes) and **returns `undefined`**.
- `insertBefore(newNode, referenceNode)` is called on the **parent**: `list.insertBefore(z, #a)` put Z before A. `insertBefore(node, null)` behaves like append.
- Appending a node that is **already in the DOM moves it** rather than copying it (`#a` moved to the end).
- `innerHTML = '<b>bold</b> text'` **parses tags**: 1 child element, and `textContent` is `"bold text"`.
- `textContent = '<b>bold</b> text'` keeps the tags as literal text: 0 children, and `innerHTML` is `&lt;b&gt;bold&lt;/b&gt; text`.
- `innerHTML += '<i>more</i>'` re-parses and appends.
- `setAttribute('href', …)` and `setAttribute('class', 'nav-link')` on a new `<a>` gave `className` = `nav-link`. The `a.href` property returns the normalised URL with a trailing `/`.

**Notes:** `innerText` (on the slide) and `textContent` both set plain text. `innerText` depends on layout and is not implemented in jsdom.

## Page 24 — Example: New Div!
**Text:** (title only)
**Image content:** A code window titled `Projects/University/web-ta/sampleprojects/dom/doc.html`. Here `<body>` is not indented and the indentation is 4 spaces:
```html
<!DOCTYPE html>
<html>
<body>
    <h1 id="title">Hello World</h1>
    <button>CLICK ME!</button>
    <script>
        const btn = document.querySelector('button');
        btn.addEventListener('click', () => {
            const div = document.createElement("div");
            div.innerText = "Hello DOM!";
            div.setAttribute("class", "box");
            document.body.appendChild(div);
        });
    </script>
</body>
</html>
```
**Verified behaviour (jsdom, `t04_examples.js`):**
- With the `innerText` shim (browser-like): one click appends `<div class="box">Hello DOM!</div>` as the **last child of `<body>`, after the `<script>`**. It renders just below the button.
- Every further click adds **another** div: after 3 clicks there were 3 `div.box` elements.
- Raw jsdom has no `innerText`, so the div was appended empty (`<div class="box"></div>`) and `innerText` became just a JS property on the object. A real browser shows the text, as page 26 proves.

**Notes:** `setAttribute("class", "box")` is equivalent to `div.className = "box"` or `div.classList.add("box")`. No CSS for `.box` is shown, so the div renders as plain text.

## Page 25 — Example: New Div! (cont.)
**Text:** (title only)
**Image content:** A Firefox screenshot (same `file:///…/dom/doc.html`, `133%`) of the state **before** the click: heading **"Hello World"** and button **"CLICK ME!"**.
**Verified behaviour:** matches the jsdom initial state.
**Notes:** —

## Page 26 — Example: New Div! (cont.)
**Text:** (title only)
**Image content:** The same window **after one click**: "Hello World", the "CLICK ME!" button, and on the line directly below the button a new plain serif text line, **"Hello DOM!"**. This is the appended div, which is a block element, so it starts on a new line.
**Verified behaviour:** matches jsdom (one `div.box` appended to the end of `body`).
**Notes:** —

## Page 27 — Removing Elements
**Text:**
- Use `.remove()` to delete an element directly
- Or call `.removeChild()` on the parent element
- `replaceChild()` can swap one element for another
- Always query the element first before removing
- Useful for dynamic UIs like todo lists or notifications
- Combine with events for interactive removals

**Image content:** none (decorative only).
**Verified behaviour (jsdom, `t06_add_remove_modify.js`):**
- `el.remove()` removes the element itself and needs no parent reference.
- `parent.removeChild(child)` **returns the removed node**, which still exists in memory (`isConnected = false`) and can be re-inserted. Calling it with a node that is not a child throws **`NotFoundError: The node to be removed is not a child of this node.`**
- `parent.replaceChild(newChild, oldChild)`: the **new node is the first argument**. It returns the old node; `replaceChild(NEW, C)` replaced C with NEW.
- `replaceWith` also exists (modern alternative).
- "Always query first": `document.getElementById('nope').remove()` throws **`TypeError: Cannot read properties of null (reading 'remove')`**.

**Notes:** —

## Page 28 — Example: Title Goes Away!
**Text:** (title only)
**Image content:** A code window titled `Projects/University/web-ta/sampleprojects/dom/doc.html`:
```html
<!DOCTYPE html>
<html>
<body>
    <h1 id="title">Hello World</h1>
    <button>CLICK ME!</button>
    <script>
        const btn = document.querySelector('button');
        btn.addEventListener('click', () => {
            const element = document.getElementById("title");
            element.remove();
        });
    </script>
</body>
</html>
```
**Verified behaviour (jsdom, `t04_examples.js`):**
- Before: `<h1 id="title">Hello World</h1>  <button>CLICK ME!</button>`.
- After 1 click: only `<button>CLICK ME!</button>` remains (plus the script).
- **A second click throws** `TypeError: Cannot read properties of null (reading 'remove')`, reported as an uncaught exception in the listener. The `<h1>` is gone, so `getElementById` returns `null`. The page is otherwise unaffected, and the button stays.

**Notes:** This is a good "what happens on the second click?" trap.

## Page 29 — Example: Title Goes Away! (cont.)
**Text:** (title only)
**Image content:** A Firefox screenshot (`file:///…/dom/doc.html`, `133%`) of the state **before** the click: heading **"Hello World"** and button **"CLICK ME!"**.
**Verified behaviour:** matches jsdom.
**Notes:** —

## Page 30 — Example: Title Goes Away! (cont.)
**Text:** (title only)
**Image content:** The same window **after** the click. The heading has disappeared; only the **"CLICK ME!"** button remains, now at the top of the page.
**Verified behaviour:** matches jsdom.
**Notes:** —

## Page 31 — Modifying… Everything!
**Text:**
- Use `.setAttribute("name", "value")` to add or change an attribute
- `.getAttribute("name")` reads an attribute's value
- `.removeAttribute("name")` deletes an attribute
- Use `element.classList.add("class")` to add classes dynamically
- `classList.remove("class")` and `classList.toggle("class")` for flexibility
- Useful for dynamic styling and state changes

**Image content:** none (decorative only).
**Verified behaviour (jsdom, `t06_add_remove_modify.js`):**
- **Attributes:**
  - `setAttribute` adds a new attribute (`data-x="5"`) or changes an existing one (`id` from `msg` to `msg2`).
  - `getAttribute('data-x')` → `"5"`, which is **always a string**. `setAttribute('title', 42)` is stored as `"42"`.
  - `getAttribute('missing')` → **`null`**.
  - `removeAttribute('data-x')` deletes it, after which `hasAttribute` is `false`. Removing an attribute that does not exist does **not** throw.
- **classList:**
  - `add('active')` twice leaves only one `active` (no duplicates). `add('x','y')` accepts several classes.
  - `remove('note')` removes one class and keeps the others.
  - `toggle('dark')` **returns `true` when it adds and `false` when it removes**. `toggle('dark', true)` forces the class on.
  - `contains('x')` → `true`, and `length` → 4.
- **class attribute vs classList:** `setAttribute('class', 'reset')` **replaces all classes**, leaving `classList` as `['reset']`. `className += ' extra'` → `"reset extra"`.

**Notes:** —

## Page 32 — Example: Change Image
**Text:** (title only)
**Image content:** A code window titled `Projects/University/web-ta/sampleprojects/dom/doc.html`:
```html
<!DOCTYPE html>
<html>
<body>
    <img src="dambooldor.png" id="dambooldor" width="300" height="300">
    <button>clickme</button>
    <script>
        const btn = document.querySelector('button');
        btn.addEventListener('click', () => {
            const img = document.getElementById("dambooldor");
            img.setAttribute("src", "dambooldor2.png");
        });
    </script>
</body>
</html>
```
**Verified behaviour (jsdom, `t04_examples.js`, page URL `file:///home/mani/Projects/University/web-ta/sampleprojects/dom/doc.html`):**
- Before: `getAttribute("src")` → `dambooldor.png`. The `img.src` **property** is the resolved absolute URL, `file:///home/mani/Projects/University/web-ta/sampleprojects/dom/dambooldor.png`.
- After the click: `getAttribute("src")` → `dambooldor2.png`, and `img.src` → `…/dom/dambooldor2.png`.
- `outerHTML` after the click: `<img src="dambooldor2.png" id="dambooldor" width="300" height="300">`. The `width` and `height` attributes are unchanged (`img.width` is the number `300`).

**Notes:** `img.src = "dambooldor2.png"` would have the same effect. The id spelling is "dambooldor", a playful spelling of Dumbledore.

## Page 33 — Example: Change Image (cont.)
**Text:** (title only)
**Image content:** A Firefox screenshot (URL clearly readable here: `file:///home/mani/Projects/University/web-ta/sampleprojects/dom/doc.html`; `133%`) of the state **before** the click.
- The page shows a **300×300 picture**: a reddish-toned video-game render of Dumbledore (long white beard, robe, arms gesturing) facing Harry Potter in a hall with long wooden tables.
- The **"clickme"** button sits immediately to the right of the image, aligned with the image's bottom edge. Both are inline elements on the same line.

**Verified behaviour:** n/a (visual).
**Notes:** —

## Page 34 — Example: Change Image (cont.)
**Text:** (title only)
**Image content:** The same window **after** the click.
- The picture has been replaced by a different 300×300 image (`dambooldor2.png`): Dumbledore in blue-green tones with rain, arms spread wide.
- The image keeps the same size, because the `width` and `height` attributes are fixed. The "clickme" button is in the same place.

**Verified behaviour:** matches jsdom (only `src` changed).
**Notes:** —

## Page 35 — Forms
**Text:**
- Access form elements with `getElementById` or `querySelector`
- Read user input using `.value` or `.checked` for checkboxes/radios
- Attach submit or input events for real-time interaction
- Prevent page reload on submit with `event.preventDefault()`
- Validate user input before processing
- Combine with DOM methods for dynamic feedback

**Image content:** none (decorative only).
**Verified behaviour (jsdom, `t07_forms.js`):**
- **Reading values:**
  - `username.value` → `"ali"`. `<input type="number" value="20">`.value → `"20"`, which is a **string**, so `age.value + 1` → `"201"`. Use `Number(age.value) + 1` → `21`, or `valueAsNumber` → `20`.
  - Checkbox: `.checked` → `false`, while its `.value` is `"on"`, so `.value` is not the checked state.
  - Checked radio via `querySelector("input[name='plan']:checked").value` → `"free"`.
  - `<select>.value` → the selected option's value, `"isf"`; `<textarea>.value` → `"hello"`.
- **Real-time feedback:** an `input` listener showed `feedback: "Typing: sara"`.
- **Submit handler with `preventDefault()` and validation:**
  - with terms unchecked: `"Please accept the terms"`;
  - after checking: `"Welcome, sara!"`;
  - with a whitespace-only username: `"Username is required"`.
- **Without `preventDefault()`:** the submit event fires with `defaultPrevented = false`, and jsdom then reports "Not implemented: HTMLFormElement's requestSubmit() method", meaning it would try to submit and navigate. In a browser the page reloads or navigates, which wipes any DOM feedback.
- **Property vs attribute:** after setting `.value = 'typed'`, `.value` → `typed` but `getAttribute("value")` → `initial`. The property holds the current value; the attribute holds the initial value.

**Notes:** —

## Page 36 — The `window` Object
**Text:**
- Represents the browser window containing the web page
- All global JavaScript objects, functions, and variables belong to it
- Provides methods like `alert()`, `confirm()`, and `prompt()`
- Gives access to `location`, `history`, `navigator`, and more
- Offers timers: `setTimeout()` and `setInterval()`
- Accessible properties: `innerWidth`, `innerHeight`, `scrollX`, `scrollY`

**Image content:** none (decorative only).
**Verified behaviour (jsdom, `t08_window.js`, page URL `https://example.com/shop/cart.html?item=5#top`):**
- **Globals:**
  - `var gVar = 1` → `window.gVar` = `1`, and `function gFunc(){}` → `typeof window.gFunc` = `"function"`.
  - **But `let gLet` and `const gConst` → `window.gLet` and `window.gConst` are `undefined`.** Only `var` and function declarations become window properties.
  - `window.document === document`, `window.window === window`, `self === window` and `globalThis === window` are all `true`.
  - At the top level of a classic script, `this === window` is `true`.
- **Sizes:** `innerWidth × innerHeight` = `1024 × 768` (jsdom default), and `scrollX`, `scrollY` = `0 0`.
- **Dialogs:** `typeof alert/confirm/prompt` are all `"function"`. jsdom reports "Not implemented: Window's alert() method" (likewise for confirm and prompt), because they need a real browser UI.
- **Navigation objects:**
  - `location.href` gives the full URL.
  - `location.protocol` / `host` / `pathname` / `search` / `hash` = `https:` / `example.com` / `/shop/cart.html` / `?item=5` / `#top`.
  - `history.length` = 1, and `history.back` is a function.
  - `navigator.userAgent` is a UA string.
  - `screen` is an object.
  - `window.frames === window`, and `frames.length` = 0.
- **Timers:** `setInterval` ticked 1, 2 and 3, then `clearInterval` stopped it; `setTimeout(…, 50)` fired after. The synchronous log "sync code finished first" printed **before** any timer callback.
- **Resize:** a `resize` listener on `window` ran when a `resize` event was dispatched.

**Notes:** Because globals live on `window`, `alert()` can be called without `window.`.

## Page 37 — Class Activity Time! (window)
**Text:** Four questions:
1. "What does `alert` do? How is it different from `prompt` and `confirm`?"
2. "What does `location` represent?"
3. "How would you use `window` to make your pages responsive?"
4. "Does `window` have any other children than `document`?"

**Image content:** none (decorative only; the questions are in the text layer).
**Verified behaviour:** see page 36. The dialogs cannot run in jsdom.
**Notes — suggested answers (NOT on the slide; standard browser behaviour):**
1. All three are `window` methods that open a **blocking (synchronous) modal dialog**.
   - `alert(msg)` shows a message with an **OK** button and returns `undefined`.
   - `confirm(msg)` shows **OK/Cancel** and returns `true` (OK) or `false` (Cancel).
   - `prompt(msg, default?)` shows a text field with **OK/Cancel** and returns the typed text **as a string** (even when digits are typed), or **`null`** on Cancel.
2. `window.location` is a `Location` object for the **current page URL**. It has `href`, `protocol`, `host`, `hostname`, `port`, `pathname`, `search` and `hash`, plus `assign()`, `reload()` and `replace()`. Assigning `location.href = "…"` navigates (verified values above).
3. Read `window.innerWidth` / `innerHeight` and listen for the window `resize` event (verified in jsdom), then change classes or styles or show and hide elements. `window.matchMedia(...)` is another option but is not on the slide. `scrollX` / `scrollY` can be used for scroll-based behaviour.
4. **Yes.** The page 12 diagram shows `event`, `frames`, `location`, `history`, `navigator` (which has `plugins` and `mimeTypes`) and `screen`. Window also holds `localStorage`, `sessionStorage`, `console`, the timer functions, and every global `var` or function.

## Page 38 — The `localStorage` Object
**Text:**
- Local storage lets websites store data persistently in the browser.
- Data is saved as key–value pairs using `localStorage.setItem()` and `getItem()`.
- The data stays even after closing the tab or browser.
- Browsers usually allow about 5–10 MB of space per site.
- It follows the same-origin policy, so data is isolated per domain.
- Only strings are stored, it's synchronous, and not safe for sensitive info.

**Image content:** none (decorative only). There is a stray backtick glyph "`" below the 4th bullet, a slide artifact with no meaning; it also appears in the text layer.
**Verified behaviour (jsdom, `t09_storage.js`, origin `https://example.com`):**
- **Basic use:**
  - `setItem("theme","dark")` then `getItem("theme")` → `dark`.
  - `getItem("missing")` → **`null`**.
  - `setItem` returns `undefined`.
  - The value is readable on the very next line, because storage is **synchronous**.
- **Only strings:**
  - `setItem("count", 5)` stores `"5"` (a string), so `getItem("count") + 1` → **`"51"`**.
  - `setItem("flag", false)` stores `"false"`, which is **truthy**.
  - `setItem("user", {name:"Ali"})` stores **`"[object Object]"`**.
  - `setItem("arr", [1,2,3])` stores `"1,2,3"`.
  - `setItem("n", null)` stores the string `"null"`.
  - The correct pattern is `JSON.stringify` and then `JSON.parse`, which round-trips and gives `age` back as a number.
- **Other API:**
  - `length` and `key(0)` work. `removeItem("flag")` lowers `length` by 1.
  - Property-style `localStorage.theme2 = "light"` also stores a value.
  - `clear()` empties localStorage only; sessionStorage still had 2 items.
  - `Object.prototype.toString.call(localStorage)` → `[object Storage]`.
- **Opaque origin:** with `about:blank`, accessing `localStorage` threw `SecurityError: localStorage is not available for opaque origins`, which shows that storage is per-origin.
- Not verifiable in jsdom: persistence after closing the browser and the 5–10 MB quota.

**Notes:** —

## Page 39 — The `sessionStorage`
(The title is "The sessionStorage", without the word "Object".)
**Text:**
- sessionStorage stores data only for the current browser tab.
- Data is saved as key–value pairs using `sessionStorage.setItem()` and `getItem()`.
- The data is cleared when the tab or window is closed.
- It usually has the same storage limit as localStorage (around 5–10 MB).
- It also follows the same-origin policy for security isolation.
- Stores only strings, is synchronous, and not meant for sensitive data.

**Image content:** none (decorative only).
**Verified behaviour (jsdom, `t09_storage.js`):**
- `sessionStorage.setItem("step","2")` → `getItem` gives `"2"`, but `localStorage.getItem("step")` → `null`. They are **separate stores**.
- A counter pattern `setItem("visits", Number(getItem("visits")) + 1)` gave `"2"`, a string again.
- Tab and window lifetime cannot be verified in jsdom.

**Notes:** It has the same API as localStorage: `setItem`, `getItem`, `removeItem`, `clear`, `key` and `length`.

## Page 40 — Class Activity Time! (storage)
**Text:** Three questions:
1. "What is the key difference between local storage and session storage?"
2. "Provide an example usage of local storage."
3. "Provide an example usage of session storage."

**Image content:** none (decorative only; the questions are in the text layer).
**Verified behaviour:** see pages 38–39.
**Notes — suggested answers (NOT on the slide):**
1. **Lifetime and scope.** localStorage persists with no expiry, survives closing the tab or browser, and is shared by all tabs of the same origin. sessionStorage lives only as long as that one tab or window and is cleared when it closes. Both are same-origin, string-only, synchronous, about 5–10 MB, and not for sensitive data.
2. localStorage examples: remembering a dark/light theme or language preference, or keeping a shopping cart or to-do list between visits.
3. sessionStorage examples: the progress of a multi-step form in one tab, a one-time "welcome" banner per visit, or temporary filter/search state that should reset when the tab closes.

---

## Verified background facts (not on the slides; useful for questions)
- The script position matters: `getElementById` in a `<script>` placed **before** the element returns `null`. A script at the end of `<body>`, or code inside `DOMContentLoaded`, finds it (page 14 variants).
- `querySelector` and `querySelectorAll` take **CSS selectors** (`#id`, `.class`, `tag`, `[attr='v']`, `a.nav-link`). `getElementById` takes a **bare id**: `getElementById('#title')` → `null`.
- Collections:
  - `getElementsBy…` return a **live `HTMLCollection`** (no `forEach`) that is never `null`.
  - `querySelectorAll` returns a **static `NodeList`** (has `forEach`) that is never `null`.
  - The single-element methods return the element or **`null`**.
- An id that starts with a digit cannot be written as `#2223` in a CSS selector (`SyntaxError`).
- A mismatched closing tag for `<title>` (`</sample>`) swallows the rest of the document into the title text, leaving `<body>` empty.
- Whitespace and newlines between tags create `#text` nodes. `childNodes` / `firstChild` include them; `children` / `firstElementChild` do not.
- `appendChild` returns the node and accepts only Nodes. `append` accepts nodes and strings and returns `undefined`. `insertBefore(new, ref)` is called on the parent. Appending an existing node moves it.
- `removeChild` returns the removed node and throws `NotFoundError` for a non-child. `replaceChild(new, old)` takes the new node first. `null.remove()` throws `TypeError` (as on the second click of "Title Goes Away!").
- `innerHTML` parses markup; `textContent` / `innerText` insert literal text.
- `getAttribute` returns a string or `null`. `setAttribute('class', …)` replaces all classes. `classList.toggle` returns a boolean.
- `onclick =` keeps a single handler (the last one assigned). `addEventListener` can stack listeners, which run in order. Events bubble from target to ancestors. `preventDefault()` sets `defaultPrevented`.
- Form `.value` is always a string (`"20" + 1 === "201"`). A checkbox's state is `.checked` (its `.value` defaults to `"on"`).
- `var` and function globals become `window` properties; `let` and `const` globals do not.
- In a browser, a detached method call such as `const f = obj.m; f()` with `return this.name` gives `""`, because `window.name` exists. In Node it gives `undefined`.
- Storage converts everything to strings (`5` → `"5"`, `false` → `"false"` which is truthy, `{}` → `"[object Object]"`, `[1,2,3]` → `"1,2,3"`). A missing key gives `null`.

---

## Concept inventory
- **p1:** Lecture "Structure Meets Behaviour!"; Web Programming CE 40419, Sharif University of Technology, Spring 2026; lecturer Ali Abrishami.
- **p2:** Lecture goals: (a) learn what the DOM is; (b) make pages interactive; (c) understand async programming usages in web.
- **p3:** Three layers of a website: Structure = what the content is (HTML); Style = how it looks (CSS); Behaviour = how it reacts (JavaScript).
- **p4:** Objects group related data and behavior; objects are key-value pairs; values are properties (data) or methods (functions); JSON (JavaScript Object Notation) stores and shares object data; "in JavaScript, almost everything is an object" (meme: "Wait it's all OBJECTS" / "Always has been").
- **p5:** `this` refers to the object calling the function; in an object method `this` = the object; in a class `this` = the created instance; in an arrow function `this` is inherited from the outer scope; the value of `this` depends on how a function is called, not where it is defined.
- **p6:** Callbacks (pass a function to run later; nested "callback hell"; manual error handling); Promises (future value with states; chain `.then()` / `.catch()`; errors handled by `.catch()`); `async`/`await` (built on Promises; cleaner, synchronous-looking syntax; errors handled by `try...catch`).
- **p7:** Markup languages describe structure using tags; examples HTML, XML, Markdown; documents form a hierarchical tree; parent/child elements show nesting; the tree model is the foundation of the DOM; generic tree diagram (root A → B, C, D; B → E, F; E → G; F → H).
- **p8:** The browser parses HTML into a tree of nodes; each tag → element node; text inside tags → text node; attributes → node properties; JS can access and modify the DOM tree; W3Schools tree: Document → Root element `<html>` → `<head>` → `<title>` → "My title"; `<body>` → `<a>` (+ Attribute "href") → "My link"; `<h1>` → "My header".
- **p9:** DOM = Document Object Model; a tree-based representation of a webpage; connects HTML structure with JavaScript; lets programs read, modify, add or remove elements; a bridge between content and interactivity; Milne tree: document → `<html>` → `<head>` → `<title>` → "My title"; `<body>` → `<h1>` → "A heading", and `<a>` (+ Attribute href) → "Link text".
- **p10 class activity:** draw the DOM tree of `sample.html` (html → head[title "sample page here :)", link rel=stylesheet href=./style.css] and body[h1 "SAMPLE PAGE!", div.sampleclass → p "sample paragraph in sample class in sample page!", h3#2223 "wait wha-?"]). Slide typo: `<title>` closed with `</sample>`; there is no DOCTYPE.
- **p11:** The root node is `document`; elements are tags (`<div>`, `<p>`); attributes are properties (`id`, `class`); text is text nodes; everything is connected in a hierarchical tree. Class hierarchy: Node → Document → HTMLDocument; Node → CharacterData → Text, Comment; Node → Element → HTMLElement → HTMLHeadElement, HTMLBodyElement, HTMLTitleElement, HTMLParagraphElement, HTMLInputElement, HTMLTableElement, … etc.; Node → Attr.
- **p12:** `window` = top-level browser object / global context; `document` = the web page inside the window; elements (`<div>`, `<p>`, `<h1>`) are objects in the DOM tree; attributes and text are properties of element nodes; events = methods and listeners connecting JS to user actions. Diagram: window → document, event, frames, location, history, navigator (→ plugins, mimeTypes), screen; document → anchors, links, applets, plugins, embeds, scripts, frames, stylesheets, images, forms (→ elements).
- **p13:** The `document` object represents the entire page; it is the entry point to the DOM tree; it provides finder methods (`getElementById`, `querySelector`); it lets JS create, remove and update nodes. Example: `getElementById("title")`, `getElementById("btn").addEventListener("click", () => {...})`, `heading.textContent = "Text Changed via document!"`; JS embedded in HTML with `<script>` at the end of `<body>`; JS comments `// ...`.
- **p14:** Example: `console.log(heading)` after `getElementById("title")`; "Can you predict what's going to be printed in the console?"; JavaScript embedded inside HTML.
- **p15:** Answer: the element itself is printed (Firefox DevTools Console shows `<h1 id="title">`, source `doc.html:8:15`); "what other cool things can document do?"
- **p16:** Querying DOM elements: `getElementById("id")` finds one element by ID; `getElementsByClassName("class")` finds all elements with that class; `getElementsByTagName("tag")` finds all elements with that tag; `querySelector("selector")` finds the first match by CSS selector; `querySelectorAll("selector")` finds all matches by CSS selector.
- **p17 class activity:** explain each line of `sample.js`: `getElementById("title")`, `getElementsByClassName("btn")`, `getElementsByTagName("p")`, `querySelector("input[type='text']")` (attribute selector, first text input), `querySelectorAll("a.nav-link")` (all links with class nav-link).
- **p18:** Events let pages react to user actions; common events `click`, `input`, `submit`, `keydown`, `load`; handlers via HTML attributes or JavaScript; `addEventListener` is the modern way; multiple handlers can be attached to the same event; events enable interactive and dynamic UX.
- **p19–21:** Example "Button Action": `querySelector('button')`; `addEventListener('click', () => {...})`; `querySelector('#title')`; `textContent = 'Goodbye World'`; `style.color = 'red'`. Screenshots: "Hello World" (black) before, and "Goodbye World" in red after the click.
- **p22:** Manipulating the DOM: the page is a tree of objects; JS changes text, HTML and styles dynamically; elements can be created, inserted and removed on the fly; attributes `id`, `class`, `src` can be modified; `getElementById` and `querySelector` find elements; DOM manipulation powers interactive pages.
- **p23:** Adding elements: `document.createElement("tag")`; set text with `.innerText` or `.innerHTML`; `.setAttribute("name", "value")`; append with `.appendChild()` or `.append()`; `.insertBefore()`; combine with events.
- **p24–26:** Example "New Div!": `createElement("div")`, `div.innerText = "Hello DOM!"`, `div.setAttribute("class", "box")`, `document.body.appendChild(div)`. Screenshots: "Hello DOM!" appears under the button after the click (each click adds one more).
- **p27:** Removing elements: `.remove()` deletes directly; `.removeChild()` is called on the parent; `replaceChild()` swaps one element for another; always query the element first; use cases: todo lists and notifications; combine with events.
- **p28–30:** Example "Title Goes Away!": `getElementById("title")` then `element.remove()`. Screenshots: the heading disappears and only the "CLICK ME!" button remains.
- **p31:** `.setAttribute("name","value")` adds or changes; `.getAttribute("name")` reads; `.removeAttribute("name")` deletes; `element.classList.add("class")`; `classList.remove("class")`; `classList.toggle("class")`; used for dynamic styling and state changes.
- **p32–34:** Example "Change Image": `<img src="dambooldor.png" id="dambooldor" width="300" height="300">`, `getElementById("dambooldor")`, `img.setAttribute("src", "dambooldor2.png")`. Screenshots: the image is swapped on click, with size and button unchanged.
- **p35:** Forms: access elements with `getElementById` / `querySelector`; read input with `.value`, and `.checked` for checkboxes and radios; `submit` or `input` events for real-time interaction; `event.preventDefault()` prevents the page reload on submit; validate input before processing; give dynamic feedback with DOM methods.
- **p36:** The `window` object represents the browser window containing the page; all global JS objects, functions and variables belong to it; it provides `alert()`, `confirm()`, `prompt()`; it gives access to `location`, `history`, `navigator` and more; timers `setTimeout()` and `setInterval()`; properties `innerWidth`, `innerHeight`, `scrollX`, `scrollY`.
- **p37 class activity:** `alert` vs `prompt` vs `confirm`; what `location` represents; using `window` to make pages responsive; whether `window` has children other than `document`.
- **p38:** `localStorage`: persistent browser storage; key–value pairs via `localStorage.setItem()` / `getItem()`; survives closing the tab or browser; about 5–10 MB per site; same-origin policy (isolated per domain); strings only; synchronous; not safe for sensitive info.
- **p39:** `sessionStorage`: data only for the current tab; `sessionStorage.setItem()` / `getItem()`; cleared when the tab or window closes; same about 5–10 MB limit; same-origin policy; strings only; synchronous; not for sensitive data.
- **p40 class activity:** the key difference between local and session storage; an example usage of local storage; an example usage of session storage.
