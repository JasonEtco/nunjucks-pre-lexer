const get = require('get-value')
const set = require('set-value')
const createObjectLookupString = require('../create-object-lookup-string')

module.exports = function main (schema, node, data) {
  const lookupString = createObjectLookupString(node)
  const got = get(schema, lookupString)
  set(data, lookupString, got)
}
