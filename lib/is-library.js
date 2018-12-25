function getFirstTarget (target) {
  if (!target.target) return target
  return getFirstTarget(target.target)
}

/**
 * Returns a boolean showing if the lookup is on the Galileo object
 */
module.exports = function isLibrary (identifier, node) {
  const firstTarget = getFirstTarget(node.target || node.name)
  return firstTarget.value === identifier
}
