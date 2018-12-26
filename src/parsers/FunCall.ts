import get from 'get-value'
import set from 'set-value'
import { createObjectLookupString } from '../create-object-lookup-string'
import { Node, ObjectType } from '../types'

function returnObjectValue (node: ObjectType) {
  const key = node.key.value

  // The value for this key/value pair does not have children
  if ('value' in node.value) {
    return { [key]: node.value.value }
  }

  // This key's value has children (its an array or an object)
  const mapped = mapArguments(node.value)
  return { [key]: mapped.reduce((p, c) => ({ ...p, ...c }), {}) }
}

function mapArguments (args: Node): any[] {
  const returnArgs: any[] = []
  if (!args.children) return returnArgs

  for (const arg of args.children) {
    // This is an object or an array
    if (arg.children) {
      // This is an object, represented as a child Node
      if (arg.children.every((child: any) => 'key' in child && 'value' in child)) {
        const argObject = arg.children.reduce((p: object, c: any) => ({ ...p, ...returnObjectValue(c) }), {})
        returnArgs.push(argObject)
        continue
      }

      // This is an array
      const mapped = mapArguments(arg)
      returnArgs.push(mapped)
      continue
    }

    // This is an object
    if ('key' in arg && 'value' in arg) {
      returnArgs.push(returnObjectValue(arg))
      continue
    }

    // This is a regular value
    if ('value' in arg) {
      returnArgs.push(arg.value)
      continue
    }
  }

  return returnArgs
}

export async function FunCall (schema: object, node: Node, data: any) {
  const lookupString = createObjectLookupString(node)
  const func = get(schema, lookupString)

  // TODO: Throw if options.throwOnUndefined
  if (!func) return

  const argValues = node.args ? mapArguments(node.args) : []
  const val = await func(...argValues)
  set(data, lookupString, () => val)
}
