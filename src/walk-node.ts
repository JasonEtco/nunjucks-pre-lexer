import { FunCall } from './parsers/FunCall'
import { Node } from './types'

export async function walkNode (schema: object, node: Node, data: any): Promise<any> {
  if (node.typename === 'FunCall') {
    await FunCall(schema, node, data)
  }

  if (node.target) {
    return walkNode(schema, node.target, data)
  }

  if (node.name) {
    return walkNode(schema, node.name, data)
  }
}
