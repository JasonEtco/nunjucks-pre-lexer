const { parser } = require('nunjucks')
const parseChildren = require('../lib/parse-children')

describe('parseChildren', () => {
  it('returns the expected array', () => {
    const str = `{% if true %}{{ hello }}{% endif %}`
    const ast = parser.parse(str)
    const children = parseChildren(ast.children)
    expect(children).toMatchSnapshot()
  })

  it('returns the expected array with nested children', () => {
    const str = `
      {% if true %}{{ hello }}{% endif %}
      {% for item in array %}
        {{ test.example }}
        {% for nested in nestedArray %}
          {{ eat.pizza() }}
        {% endfor %}
      {% endfor %}`

    const ast = parser.parse(str)
    const children = parseChildren(ast.children)
    expect(children).toMatchSnapshot()
  })
})
