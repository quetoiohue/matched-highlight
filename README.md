`matched-highlight` help us match text to raw html string.

### Get started

`npm i matched-highlight`

### Demo

```javascript
const highlight = require("matched-highlight")

// default: highlight(query, text, opts = { tag: "strong", consecutive: false })

highlight("thin", "this is a thin text on input.")

// => '<strong>thi</strong>s is a thi<strong>n</strong> text on input.'

highlight("thin", "this is a thin text on input.", { consecutive: true })

// => 'this is a <strong>thin</strong> is a thin text on input.'

highlight("thin", "this is a thin text on input.", { tag: "b", consecutive: true })

// => 'this is a <b>thin</b> is a thin text on input.'
```
