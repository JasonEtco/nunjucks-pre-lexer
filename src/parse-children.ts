import { Node } from './types'

/**
 * We care about:
 * LookupVal: `{{ foo.bar }}`, getting a property in an object
 * FunCall: `{{ foo() }}`, a function as a variable
 * Set: `{% set key = foo.bar %}`, setting a variable in a template
 */
const IMPORTANT_TYPES = ['LookupVal', 'FunCall', 'If', 'For', 'Set']

export function parseChildren (children: Node[], nodes: Node[] = []) {
  for (const child of children) {
    if (child.children) {
      parseChildren(child.children, nodes)
      continue
    }

    if (IMPORTANT_TYPES.includes(child.typename)) {
      nodes.push(child)
    }
  }

  return nodes
}
