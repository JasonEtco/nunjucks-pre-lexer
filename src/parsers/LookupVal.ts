import get from 'get-value'
import set from 'set-value'
import { createObjectLookupString } from '../create-object-lookup-string'
import { Node } from '../types'

export function LookupVal (schema: object, node: Node, data: object) {
  const lookupString = createObjectLookupString(node)
  const got = get(schema, lookupString)
  set(data, lookupString, got)
}
