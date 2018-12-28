import { Node } from './types'

function getValues (node: Node, pieces: string[] = []): string[] {
  if (node.val && 'value' in node.val) {
    pieces.unshift(node.val.value)
  }

  if ('value' in node) {
    if (typeof node.value === 'string') {
      pieces.unshift(node.value)
    } else {
      return getValues(node.value)
    }
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

export function createObjectLookupString (node: Node) {
  const values = getValues(node)
  return values.join('.')
}
