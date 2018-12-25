const parsers = require('./parsers')
const parseChildren = require('./parse-children')
const isLibrary = require('./is-library')

module.exports = async function collectData ({ identifier, db, nodes }, data = {}) {
  for (const node of nodes) {
    switch (node.typename) {
      case 'If': {
        const promises = [
          collectData({ identifier, db, nodes: [node.cond] }, data),
          collectData({ identifier, db, nodes: parseChildren(node.body.children) }, data)
        ]

        if (node.else_) {
          const elseChildren = parseChildren(node.else_.children)
          promises.push(collectData({ identifier, db, nodes: elseChildren }, data))
        }

        await Promise.all(promises)
        continue
      }

      case 'For': {
        // The iterable of the for loop
        await collectData({ identifier, db, nodes: [node.arr] }, data)

        // The body of the for loop
        const bodyChildren = parseChildren(node.body.children)
        await collectData({ identifier, db, nodes: bodyChildren }, data)
        continue
      }

      default: {
        if (!(node.typename in parsers)) continue
        if (!isLibrary(identifier, node)) continue

        await parsers[node.typename](db, node, data)
        continue
      }
    }
  }

  return data
}
