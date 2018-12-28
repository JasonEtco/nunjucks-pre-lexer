import get from 'get-value'
import set from 'set-value'
import { createObjectLookupString } from '../create-object-lookup-string'
import { Node } from '../types'
import { walkNode } from '../walk-node'

export async function LookupVal (schema: object, node: Node, data: any) {
  await walkNode(schema, node, data)
  const lookupString = createObjectLookupString(node)
  const got = get(schema, lookupString)
  set(data, lookupString, got)
}
