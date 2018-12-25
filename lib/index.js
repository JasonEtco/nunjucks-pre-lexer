const { parser } = require('nunjucks')
const parseChildren = require('./parse-children')
const collectData = require('./collect-data')

module.exports = async function getLibraryData (schema, templateString) {
  const ast = parser.parse(templateString)
  const nodes = parseChildren(ast.children)
  return collectData({ schema, nodes })
}
