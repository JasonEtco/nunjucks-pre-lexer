import { FunCall } from './FunCall'
import { LookupVal } from './LookupVal'
import { Node } from '../types'

interface Parsers {
  FunCall: (schema: object, node: Node, data: any) => any
  LookupVal: (schema: object, node: Node, data: any) => any
}

export type ParserKeys = keyof Parsers

export const parsers: Parsers = {
  FunCall,
  LookupVal
}
