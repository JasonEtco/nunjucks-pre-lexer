import get from 'get-value'
import set from 'set-value'
import { createObjectLookupString } from '../create-object-lookup-string'
import { Node } from '../types'
import { FunCall } from './FunCall'

async function walkNode (schema: object, node: Node, data: any): Promise<any> {
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

export async function LookupVal (schema: object, node: Node, data: any) {
  await walkNode(schema, node, data)
  const lookupString = createObjectLookupString(node)
  const got = get(schema, lookupString)
  set(data, lookupString, got)
}
