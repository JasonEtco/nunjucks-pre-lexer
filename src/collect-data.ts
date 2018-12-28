import { parseChildren } from './parse-children'
import { ParserKeys, parsers } from './parsers'
import { ForType, IfType, Node } from './types'

function isIf (node: Node | IfType): node is IfType {
  return node.typename === 'If'
}

function isFor (node: Node | ForType): node is ForType {
  return node.typename === 'For'
}

interface CollectDataArgs {
  schema: any
  nodes: Array<Node | ForType | IfType>
}

export async function collectData ({ schema, nodes }: CollectDataArgs, data = {}) {
  for (const node of nodes) {
    if (isIf(node)) {
      const promises = [
        collectData({ schema, nodes: [node.cond] }, data),
        collectData({ schema, nodes: parseChildren(node.body.children) }, data)
      ]

      if (node.else_) {
        const elseChildren = parseChildren(node.else_.children)
        promises.push(collectData({ schema, nodes: elseChildren }, data))
      }

      await Promise.all(promises)
      continue
    }

    if (isFor(node)) {
      // The iterable of the for loop
      await collectData({ schema, nodes: [node.arr] }, data)

      // The body of the for loop
      const bodyChildren = parseChildren(node.body.children)
      await collectData({ schema, nodes: bodyChildren }, data)
      continue
    }

    if (!(node.typename in parsers)) continue
    await parsers[node.typename as ParserKeys](schema, node, data)
  }

  return data
}
