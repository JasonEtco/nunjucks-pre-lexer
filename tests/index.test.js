const getLibraryData = require('..')

describe('getLibraryData', () => {
  it('gets the data of an object lookup', async () => {
    const src = '{{ lib.test }}'
    const obj = { test: true }

    const data = await getLibraryData('lib', obj, src)
    expect(data).toEqual({ lib: { test: true } })
  })

  it('gets the return value of a function in the object', async () => {
    const src = '{{ lib.test() }}'
    const obj = { async test () { return 'a value' } }

    const data = await getLibraryData('lib', obj, src)
    expect(data).toEqual({ lib: { test: 'a value' } })
  })

  it('gets the return value of a function with arguments', async () => {
    const src = '{{ lib.test("Example") }}'
    const obj = { async test (str) { return str } }

    const data = await getLibraryData('lib', obj, src)
    expect(data).toEqual({ lib: { test: 'Example' } })
  })

  it('gets the return value of a function with arguments that are objects', async () => {
    const src = '{{ lib.test({ foo: "Example" }) }}'
    const obj = { async test ({ foo }) { return foo } }

    const data = await getLibraryData('lib', obj, src)
    expect(data).toEqual({ lib: { test: 'Example' } })
  })

  it('gets the return value of a function with arguments that are arrays', async () => {
    const src = '{{ lib.test([1, 2, 3]) }}'
    const obj = { async test (arr) { return arr[1] } }

    const data = await getLibraryData('lib', obj, src)
    expect(data).toEqual({ lib: { test: 2 } })
  })

  it('gets the return value of a function with an argument of nested objects', async () => {
    const src = '{{ lib.test({ foo: { bar: { bork: false, baz: true } } }) }}'
    const obj = { async test (o) { return o.foo.bar.baz } }

    const data = await getLibraryData('lib', obj, src)
    expect(data).toEqual({ lib: { test: true } })
  })

  it('gets the values in the conditional of an if', async () => {
    const src = '{% if lib.test %}hello{% endif %}'
    const obj = { test: true }

    const data = await getLibraryData('lib', obj, src)
    expect(data).toEqual({ lib: { test: true } })
  })

  it('gets the values in the body of an if', async () => {
    const src = '{% if true %}{{ lib.test }}{% endif %}'
    const obj = { test: true }

    const data = await getLibraryData('lib', obj, src)
    expect(data).toEqual({ lib: { test: true } })
  })

  it('gets the values in the body of an else', async () => {
    const src = '{% if true %}true{% else %}{{ lib.test }}{% endif %}'
    const obj = { test: true }

    const data = await getLibraryData('lib', obj, src)
    expect(data).toEqual({ lib: { test: true } })
  })

  it('gets the values in the iterable of a for', async () => {
    const src = '{% for thing in lib.test %}hello{% endfor %}'
    const obj = { test: [true, false] }

    const data = await getLibraryData('lib', obj, src)
    expect(data).toEqual({ lib: { test: [true, false] } })
  })

  it('gets the values in the body of a for', async () => {
    const src = '{% for thing in things %}{{ lib.test }}{% endfor %}'
    const obj = { test: true }

    const data = await getLibraryData('lib', obj, src)
    expect(data).toEqual({ lib: { test: true } })
  })
})
