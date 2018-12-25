function getValues (node, pieces = []) {
  if (node.val && 'value' in node.val) {
    pieces.unshift(node.val.value)
  }

  if ('value' in node) {
    pieces.unshift(node.value)
  }

  // LookupVal and nested object use `node.target`
  if (node.target) {
    return getValues(node.target, pieces)
  }

  // FunCall uses `node.name`
  if (node.name) {
    return getValues(node.name, pieces)
  }

  return pieces
}

module.exports = function createObjectLookupString (node) {
  const values = getValues(node)
  return values.join('.')
}
