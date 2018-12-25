<h3 align="center">Nunjucks Pre-Lexer</h3>
<p align="center">A tool for identifying and fetcihng the data that a <a href="https://mozilla.github.io/nunjucks">Nunjucks</a> template expects.<p>
<p align="center"><a href="https://npmjs.com/package/nunjucks-pre-lexer"><img src="https://badgen.net/npm/v/nunjucks-pre-lexer" alt="NPM"></a><a href="https://travis-ci.org/JasonEtco/nunjucks-pre-lexer"><img src="https://badgen.now.sh/travis/JasonEtco/nunjucks-pre-lexer" alt="Build Status"></a> <a href="https://codecov.io/gh/JasonEtco/nunjucks-pre-lexer/"><img src="https://badgen.now.sh/codecov/c/github/JasonEtco/nunjucks-pre-lexer" alt="Codecov"></a></p>

## Usage

### Installation

```sh
$ npm install nunjucks-pre-lexer
```

```js
const lexer = require('nunjucks-pre-lexer')

const templateStr = '{{ myObject.property }}'

// Requires a namespace
const namespace = 'myObject'

// The schema is an object to 
const schema = { property: true }

const data = lexer(namespace, schema, templateStr)
// -> { namespace: { property: true } }
```


## How it works

Like magic!