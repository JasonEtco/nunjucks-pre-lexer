import { createObjectLookupString } from '../src/create-object-lookup-string'
import { Node } from '../src/types'

describe('createObjectLookupString', () => {
  it('returns the expected string for a LookupVal node', () => {
    const node: Node = {
      typename: 'SomeNode',
      val: {
        typename: 'SomeNode',
        value: 'baz'
      },
      target: {
        typename: 'SomeNode',
        val: {
          typename: 'SomeNode',
          value: 'bar'
        },
        target: {
          typename: 'SomeNode',
          val: { typename: 'SomeNode', value: 'foo' }
        }
      }
    }

    const actual = createObjectLookupString(node)
    expect(actual).toBe('foo.bar.baz')
  })

  it('returns the expected string for a FunCall node', () => {
    const node: Node = {
      typename: 'SomeNode',
      val: {
        typename: 'SomeNode',
        value: 'baz'
      },
      name: {
        typename: 'SomeNode',
        val: { typename: 'SomeNode', value: 'bar' },
        name: {
          typename: 'SomeNode',
          val: { typename: 'SomeNode', value: 'foo' }
        }
      }
    }

    const actual = createObjectLookupString(node)
    expect(actual).toBe('foo.bar.baz')
  })

  it('requires val and val.value to add the value', () => {
    const node: Node = {
      typename: 'SomeNode',
      val: { typename: 'SomeNode' },
      name: {
        typename: 'SomeNode',
        val: { typename: 'SomeNode', value: 'bar' },
        name: {
          typename: 'SomeNode',
          val: { typename: 'SomeNode', value: 'foo' }
        }
      }
    }

    const actual = createObjectLookupString(node)
    expect(actual).toBe('foo.bar')
  })

  it('returns the expected value with a property of a function\'s return value', () => {
    const node: Node = {
      typename: 'SomeNode',
      val: { typename: 'SomeNode' },
      target: {
        typename: 'SomeNode',
        val: { typename: 'SomeNode', value: 'bar' },
        name: {
          typename: 'SomeNode',
          val: { typename: 'SomeNode', value: 'foo' }
        }
      }
    }

    const actual = createObjectLookupString(node)
    expect(actual).toBe('foo.bar')
  })
})
