import { lexer } from '../src'

describe('lexer', () => {
  let schema: any

  beforeEach(() => {
    schema = { lib: { test: true } }
  })

  it('gets the data of an schemaect lookup', async () => {
    const src = '{{ lib.test }}'
    const data = await lexer(schema, src)
    expect(data).toEqual(schema)
  })

  it('gets the return value of a function in the schemaect', async () => {
    const src = '{{ lib.test() }}'
    schema = { lib: { async test () { return 'a value' } } }

    const data = await lexer(schema, src)
    expect(data).toMatchSnapshot()
    expect(data.lib.test()).toBe('a value')
  })

  it('gets the return value of a function with arguments', async () => {
    const src = '{{ lib.test("Example") }}'
    schema = { lib: { async test (str: string) { return str } } }

    const data = await lexer(schema, src)
    expect(data).toMatchSnapshot()
    expect(data.lib.test()).toBe('Example')
  })

  it('gets the return value of a function with arguments that are schemaects', async () => {
    const src = '{{ lib.test({ foo: "Example" }) }}'
    schema = { lib: { async test ({ foo }: { foo: string}) { return foo } } }

    const data = await lexer(schema, src)
    expect(data).toMatchSnapshot()
    expect(data.lib.test()).toBe('Example')
  })

  it('gets the return value of a function with arguments that are arrays', async () => {
    const src = '{{ lib.test([1, 2, 3]) }}'
    schema = { lib: { async test (arr: number[]) { return arr[1] } } }

    const data = await lexer(schema, src)
    expect(data).toMatchSnapshot()
    expect(data.lib.test()).toBe(2)
  })

  it('gets the return value of a function with an argument of nested schemaects', async () => {
    const src = '{{ lib.test({ foo: { bar: { bork: false, baz: true } } }) }}'
    schema = { lib: { async test (o: any) { return o.foo.bar.baz } } }

    const data = await lexer(schema, src)
    expect(data).toMatchSnapshot()
    expect(data.lib.test()).toBe(true)
  })

  it('gets the return value of a non-namespaced function', async () => {
    const src = '{{ test() }}'
    schema = { async test () { return 'hiya' } }

    const data = await lexer(schema, src)
    expect(data).toMatchSnapshot()
    expect(data.test()).toBe('hiya')
  })

  it('gets the value calculated after a function\'s execution in a lookup', async () => {
    const src = '{{ lib.test().example }}'
    schema = {
      lib: {
        async test () {
          return { example: true }
        }
      }
    }

    const data = await lexer(schema, src)
    expect(data.lib.test()).toEqual({ example: true })
  })

  // TODO: Allow for nested function execution
  it.skip('gets the value calculated after a nested function\'s execution in a lookup', async () => {
    const src = '{{ lib.test().example().foo }}'
    schema = {
      lib: {
        async test () {
          return {
            async example () {
              return {
                foo: true
              }
            }
          }
        }
      }
    }

    const data = await lexer(schema, src)
    expect(data.lib.test().example()).toEqual({ foo: true })
  })

  describe('tags', () => {
    describe('set', () => {
      it('gets the value', async () => {
        const src = '{% set example = lib.test %}'
        const data = await lexer(schema, src)
        expect(data.lib.test).toBe(true)
      })
    })

    describe('for', () => {
      it('gets the values in the iterable of a for', async () => {
        const src = '{% for thing in lib.test %}hello{% endfor %}'
        schema = { lib: { test: [true, false] } }

        const data = await lexer(schema, src)
        expect(data).toEqual({ lib: { test: [true, false] } })
      })

      it('gets the values in the body of a for', async () => {
        const src = '{% for thing in things %}{{ lib.test }}{% endfor %}'

        const data = await lexer(schema, src)
        expect(data).toEqual({ lib: { test: true } })
      })
    })

    describe('if', () => {
      it('gets the values in the conditional of an if', async () => {
        const src = '{% if lib.test %}hello{% endif %}'

        const data = await lexer(schema, src)
        expect(data).toEqual({ lib: { test: true } })
      })

      it('gets the values in the body of an if', async () => {
        const src = '{% if true %}{{ lib.test }}{% endif %}'

        const data = await lexer(schema, src)
        expect(data).toEqual({ lib: { test: true } })
      })

      it('gets the values in the body of an else', async () => {
        const src = '{% if true %}true{% else %}{{ lib.test }}{% endif %}'

        const data = await lexer(schema, src)
        expect(data).toEqual({ lib: { test: true } })
      })
    })
  })
})
