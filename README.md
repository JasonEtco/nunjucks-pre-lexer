<h3 align="center">Nunjucks Pre-Lexer</h3>
<p align="center">A tool for identifying and fetching the data that a <a href="https://mozilla.github.io/nunjucks">Nunjucks</a> template expects.<p>
<p align="center"><a href="https://npmjs.com/package/nunjucks-pre-lexer"><img src="https://badgen.net/npm/v/nunjucks-pre-lexer" alt="NPM"></a><a href="https://travis-ci.org/JasonEtco/nunjucks-pre-lexer"><img src="https://badgen.now.sh/travis/JasonEtco/nunjucks-pre-lexer" alt="Build Status"></a> <a href="https://codecov.io/gh/JasonEtco/nunjucks-pre-lexer/"><img src="https://badgen.now.sh/codecov/c/github/JasonEtco/nunjucks-pre-lexer" alt="Codecov"></a></p>

## Usage

### Installation

```sh
$ npm install nunjucks-pre-lexer
```

```js
const { lexer } = require('nunjucks-pre-lexer')

const templateStr = '{{ myObject.property }}'

// The schema is an object that tells the lexer
// how to get the data the template is asking for
const schema = { myObject: { property: true } }

const data = lexer(schema, templateStr)
// -> { myObject: { property: true } }
```

This is a pretty mundane example because the value of `myObject.property` is hardcoded; now let's see what it looks like to fetch some data from our database in the same way:

```js
const templateStr = '{{ getPosts() }}'
const schema = {
  async getPosts() {
    // Some asynchronous operation that queries the database.
    // This can be anything at all!
    return db.Post.findAll()
  }
}

const data = lexer(schema, templateStr)
// -> { getPosts: () => ([{ title: 'A post' }]) }
```

Now, when we go to render that template (using `nunjucks.render` as normal), we've prepared the return value of the `getPosts` function - so its evaluates immediately.

## Why

Two main reasons: performance, and ease of writing templates.

### Performance

With this method of understanding the requirements of a template, we can really aggressively cache the template itself, while still ensuring that we're getting the freshest data when we need it.

Additionally, this lets us get the data the the template is using - and nothing more. We're letting the template define the data it needs, and then getting it.

### Ease of writing templates

Asynchronous templating is a challenge - Nunjucks has shaky support, and a good, consistent usage of it requires some funky filters. This avoids any need for "intentional" asynchronicity by pre-fetching any data that the template needs.

---

Question? Comments? [Open an issue](https://github.com/JasonEtco/nunjucks-pre-lexer/issues/new), happy to talk through it!