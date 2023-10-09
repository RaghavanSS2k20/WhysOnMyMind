import rangy from 'rangy'

/**
 * Verifies DOM integrity
 * @param {*} data
 * @param  {...any} nodes
 */
export function verifyDom(data, ...nodes) {
  return nodes.every((node) => {
    const res = data.markedElements.some(
      ({ id, md5 }) => node.id === id && node.dataset.md5 === md5
    )
    if (!res) {
      console.log('node has changed', node)
    }
    return res
  })
}

/**
 * Converts a data object to range
 * @param {*} data
 */
export function dataToRange(data) {
  const startElement = document.getElementById(data.startElement)
  const endElement = document.getElementById(data.endElement)

  const range = rangy.createRange()

  let startOffset = data.startOffset
  let endOffset = data.endOffset

  console.log('verifyStartElement', verifyDom(data, startElement))

  const startNode = walkNodes(startElement, nextNode, (node) => {
    if (rangy.dom.isCharacterDataNode(node)) {
      if (node.length > startOffset) {
        return node
      }
      startOffset -= node.length
    }
  })

  console.log('verifyEndElement', verifyDom(data, endElement))

  const endNode = walkNodes(endElement, nextNode, (node) => {
    if (rangy.dom.isCharacterDataNode(node)) {
      if (node.length > endOffset) {
        return node
      }
      endOffset -= node.length
    }
  })

  range.setStart(startNode, startOffset)
  range.setEnd(endNode, endOffset)

  return range
}

/**
 * Converts a range to data
 * @param {*} range
 */
export function rangeToData(range) {
  console.log("range : ", range.startContainer)
  let startOffset = 0
  let endOffset = 0

  const startElement = walkNodes(range.startContainer, prevNode, (node) => {
    if (isIdentifyableNode(node.nextSibling)) {
      return node.nextSibling
    }
    console.log("Node :- ",node)
    
    startOffset += node.textContent.length
  })

  const endElement = walkNodes(range.endContainer, prevNode, (node) => {
    if (isIdentifyableNode(node.nextSibling)) {
      return node.nextSibling
    }
    endOffset += node.textContent.length
  })

  const markedElements =
    startElement === endElement
      ? [startElement]
      : range.getNodes().filter((node) => isIdentifyableNode(node))

  return {
    id: startElement.id + startOffset + endElement.id + endOffset,
    startElement: startElement.id,
    startOffset,
    endElement: endElement.id,
    endOffset,
    markedElements: markedElements.map((element) => ({
      id: element.id,
      md5: element.dataset.md5,
    })),
    markedText: range.toString(),
    markedHtml: range.toHtml(),
    extendedText: markedElements.map((element) => element.textContent),
    extendedHtml: markedElements.map((element) => element.outerHTML),
  }
}

/** 
 * Checks if a node is identiyable
 * @param {Element} node
 */
export function isIdentifyableNode(node) {
  
  console.log("hehehhehhehhehhehhehheh",node && node.id && node.dataset.md5)
  return node && node.id && node.dataset.md5
}

export function getAnchestorIdentifyableNode(node) {
  if (isIdentifyableNode(node)) {
    return node
  }
  if (node.parentNode) {
    return getAnchestorIdentifyableNode(node.parentNode)
  }
  return false
}

/**
 * Walks nodes until callback returns something other than undefined
 * @param {Node} node
 * @param {function} func
 * @param {function} callback
 */
export function walkNodes(node, func, callback) {
  const ret = callback(node)
  if (ret === null || ret) return ret
  return walkNodes(func(node), func, callback)
}

/**
 *
 * @param {Node} node
 */
export function prevNode(node) {
  while (node && !node.previousSibling) node = node.parentNode
  if (!node) return null
  return node.previousSibling
}

/**
 *
 * @param {Node} node
 */
export function nextNode(node) {
  if (node.hasChildNodes()) {
    return node.firstChild
  } else {
    while (node && !node.nextSibling) node = node.parentNode
    if (!node) return null
    return node.nextSibling
  }
}

/**
 *
 * @param {Element} elem
 * @param {*} target
 */
export function nextUntil(elem, target) {
  const siblings = [elem]
  if (elem === target) return siblings
  // Get the next sibling element
  elem = elem.nextElementSibling

  // As long as a sibling exists
  while (elem) {
    // Otherwise, push it to the siblings array
    siblings.push(elem)
    // If we've reached our match, bail
    if (elem === target) break
    // Get the next sibling element
    elem = elem.nextElementSibling
  }
  return siblings
}
