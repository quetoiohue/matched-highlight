function getLastIndex(lowerQuery, lowerText, offset) {
  let last = 0

  for (let i = 1; i < lowerQuery.length; i++) {
    if (lowerText[offset + i] !== lowerQuery[i]) {
      break
    }

    last = i
  }

  return last
}

function consecutiveHighlight(query, text, opts) {
  const lowerQuery = query.toLowerCase()
  const lowerText = text.toLowerCase()

  if (lowerQuery.length === 0) {
    return text
  }

  let offset = lowerText.indexOf(lowerQuery[0])

  if (offset === -1) {
    return null
  }

  let last = -1

  for (let i = offset; i < lowerText.length; i++) {
    if (lowerText[i] === lowerQuery[0]) {
      let lastIndex = getLastIndex(lowerQuery, lowerText, i)

      if (lastIndex > last) {
        offset = i
        last = lastIndex
      }
    }
  }

  let before = text.slice(0, offset)
  let match =
    "<" +
    opts.tag +
    ">" +
    text.slice(offset, offset + last + 1) +
    "</" +
    opts.tag +
    ">"
  let after = text.slice(last + 1, text.length)

  return last < query.length - 1 ? null : before + match + after
}

function nonconsecutiveHighlight(query, text, opts) {
  const lowerQuery = query.toLowerCase()
  const lowerText = text.toLowerCase()

  if (lowerQuery.length === 0) {
    return text
  }

  let offset = lowerText.indexOf(lowerQuery[0])

  if (offset === -1) {
    return null
  }

  let last = getLastIndex(lowerQuery, lowerText, offset)

  let before = text.slice(0, offset)
  let match =
    "<" +
    opts.tag +
    ">" +
    text.slice(offset, offset + last + 1) +
    "</" +
    opts.tag +
    ">"
  let after = nonconsecutiveHighlight(
    query.slice(last + 1),
    text.slice(offset + last + 1),
    opts
  )

  return after === null ? null : before + match + after
}

function highlight(query, text, opts = {}) {
  const defaultOpts = { tag: "strong", consecutive: false }
  opts = { ...defaultOpts, ...opts }

  return opts.consecutive
    ? consecutiveHighlight(query, text, opts)
    : nonconsecutiveHighlight(query, text, opts)
}

module.exports = highlight
