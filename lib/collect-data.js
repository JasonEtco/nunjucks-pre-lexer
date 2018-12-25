const parsers = require('./parsers')
const parseChildren = require('./parse-children')

module.exports = async function collectData ({ schema, nodes }, data = {}) {
  for (const node of nodes) {
    switch (node.typename) {
      case 'If': {
        const promises = [
          collectData({ schema, nodes: [node.cond] }, data),
          collectData({ schema, nodes: parseChildren(node.body.children) }, data)
        ]

        if (node.else_) {
          const elseChildren = parseChildren(node.else_.children)
          promises.push(collectData({ schema, nodes: elseChildren }, data))
        }

        await Promise.all(promises)
        continue
      }

      case 'For': {
        // The iterable of the for loop
        await collectData({ schema, nodes: [node.arr] }, data)

        // The body of the for loop
        const bodyChildren = parseChildren(node.body.children)
        await collectData({ schema, nodes: bodyChildren }, data)
        continue
      }

      default: {
        if (!(node.typename in parsers)) continue

        await parsers[node.typename](schema, node, data)
        continue
      }
    }
  }

  return data
}
