export interface Node {
  typename: string
  value?: any
  children?: Node[]
  val?: Node
  target?: Node
  name?: Node
}

interface Body extends Node {
  children: Node[]
}

export interface IfType extends Node {
  typename: 'If'
  cond: Node
  body: Body
  else_?: Body
}

export interface ForType extends Node {
  typename: 'For'
  arr: Node
  body: Body
}

export interface FunCallType extends Node {
  typename: 'FunCall'
  args: Node
}

interface Value {
  value: string
}

export interface ObjectType extends Node {
  key: Value
  value: Value | Node
}
