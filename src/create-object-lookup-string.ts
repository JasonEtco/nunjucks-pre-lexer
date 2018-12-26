import { Node } from './types'

function getValues (node: Node, isFunCall = false, pieces: string[] = []): string[] {
  if (node.val && 'value' in node.val) {
    let value = node.val.value
    if (isFunCall) value += '()'
    pieces.unshift(value)
  }

  if ('value' in node) {
    pieces.unshift(node.value)
  }

  // LookupVal and nested object use `node.target`
  if (node.target) {
    return getValues(node.target, false, pieces)
  }

  // FunCall uses `node.name`
  if (node.name) {
    return getValues(node.name, true, pieces)
  }

  return pieces
}

export function createObjectLookupString (node: Node) {
  const values = getValues(node, node.typename === 'FunCall')
  return values.join('.')
}
