const { parser } = require('nunjucks')
const isLibrary = require('../lib/is-library')

describe('isLibrary', () => {
  it('returns true if the node is a lookup against the library namespace', () => {
    const str = `{{ test.boo }}`
    const ast = parser.parse(str)
    const actual = isLibrary('test', ast.children[0].children[0])
    expect(actual).toBe(true)
  })

  it('returns false if the node is not a lookup against the library namespace', () => {
    const str = `{{ boo.boo }}`
    const ast = parser.parse(str)
    const actual = isLibrary('test', ast.children[0].children[0])
    expect(actual).toBe(false)
  })
})
