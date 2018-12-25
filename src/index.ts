import { parser } from 'nunjucks'
import { parseChildren } from './parse-children'
import { collectData } from './collect-data'

export async function getLibraryData (schema: object, templateString: string) {
  const ast = parser.parse(templateString)
  const nodes = parseChildren(ast.children)
  return collectData({ schema, nodes })
}
