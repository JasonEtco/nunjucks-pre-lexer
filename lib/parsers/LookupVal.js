const get = require('get-value')
const set = require('set-value')
const createObjectLookupString = require('../create-object-lookup-string')

module.exports = function main (galileo, node, data) {
  const lookupString = createObjectLookupString(node)
  const got = get(galileo, lookupString)
  set(data, lookupString, got)
}
