import { parser } from 'nunjucks'
import { collectData } from './collect-data'
import { parseChildren } from './parse-children'

export async function lexer (schema: object, templateString: string): Promise<any> {
  const ast = parser.parse(templateString)
  const nodes = parseChildren(ast.children)
  return collectData({ schema, nodes })
}
