const createObjectLookupString = require('../lib/create-object-lookup-string')

describe('createObjectLookupString', () => {
  it('returns the expected string for a LookupVal node', () => {
    const node = {
      val: {
        value: 'baz'
      },
      target: {
        val: { value: 'bar' },
        target: {
          val: { value: 'foo' }
        }
      }
    }

    const actual = createObjectLookupString(node)
    expect(actual).toBe('foo.bar.baz')
  })

  it('returns the expected string for a FunCall node', () => {
    const node = {
      val: {
        value: 'baz'
      },
      name: {
        val: { value: 'bar' },
        name: {
          val: { value: 'foo' }
        }
      }
    }

    const actual = createObjectLookupString(node)
    expect(actual).toBe('foo.bar.baz')
  })

  it('requires val and val.value to add the value', () => {
    const node = {
      val: {},
      name: {
        val: { value: 'bar' },
        name: {
          val: { value: 'foo' }
        }
      }
    }

    const actual = createObjectLookupString(node)
    expect(actual).toBe('foo.bar')
  })
})
