/**
 * We care about:
 * LookupVal: `{{ foo.bar }}`, getting a property in an object
 * FunCall: `{{ foo() }}`, a function as a variable
 */
const IMPORTANT_TYPES = ['LookupVal', 'FunCall', 'If', 'For']

module.exports = function parseChildren (children, nodes = []) {
  for (const child of children) {
    if (child.children) {
      parseChildren(child.children, nodes)
      continue
    }

    if (IMPORTANT_TYPES.includes(child.typename)) {
      nodes.push({
        typename: child.typename,
        ...child
      })
    }
  }

  return nodes
}
