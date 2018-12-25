const { parser } = require('nunjucks')
const parseChildren = require('./parse-children')
const collectData = require('./collect-data')

module.exports = async function getLibraryData (identifier, db, templateString) {
  const ast = parser.parse(templateString)
  const nodes = parseChildren(ast.children)
  return { [identifier]: await collectData({ nodes, identifier, db }) }
}
