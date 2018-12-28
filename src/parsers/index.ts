import { Node } from '../types'
import { FunCall } from './FunCall'
import { LookupVal } from './LookupVal'

interface Parsers {
  FunCall: (schema: object, node: Node, data: any) => any
  LookupVal: (schema: object, node: Node, data: any) => any
  Set: (schema: object, node: Node, data: any) => any
}

export type ParserKeys = keyof Parsers

export const parsers: Parsers = {
  FunCall,
  LookupVal,
  Set: LookupVal // Set and LookupVal use the same logic
}
