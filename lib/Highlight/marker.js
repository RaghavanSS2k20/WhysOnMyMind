import rangy from 'rangy'
import 'rangy/lib/rangy-classapplier'
import 'rangy/lib/rangy-highlighter'

import md5 from 'md5'
const initRangy = ()=>{
  console.log("creating rangy")
  rangy.init()
}
import {
  dataToRange,
  rangeToData,
  getAnchestorIdentifyableNode,
} from './helpers'

console.log('rangy', rangy.modules.Highlighter["initializer"])
initRangy()
class Marker {
  constructor(options = {}) {
    this.settings = {
      className: 'highlight',
      handleMarkerClick: () => {},
      ...options,
    }

    this.highlighter = rangy.createHighlighter()

    const classApplier = rangy.createClassApplier(this.settings.className, {
      ignoreWhiteSpace: true,
      elementTagName: 'mark',
      elementProperties: {
        onclick: (event) => {
          const highlight = this.highlighter.getHighlightForElement(
            event.target
          )
          this.settings.handleMarkerClick(highlight)
        },
      },
    })

    this.highlighter.addClassApplier(classApplier)

    this.mark = this.mark.bind(this)
    this.unmark = this.unmark.bind(this)
  }

  init(boundary) {
    if (typeof boundary === 'string')
      boundary = document.querySelector(boundary)
    console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii from intiiiiiiiiiiiisi")
    const selectableElements = [
      ...boundary.querySelectorAll('*'),
    ]
    selectableElements.forEach((element) => {
      element.dataset.md5 = md5(element.textContent)
    })
  }

  applyMarkers(...data) {
    const selection = rangy.getSelection()

    data.forEach((set) => {
      const range = dataToRange(set)
      selection.setSingleRange(range)
      this.highlight()
    })

    selection.removeAllRanges()
  }

  /**
   * Returns a highlight that wraps the current selection
   */
  highlight() {
    return this.highlighter.highlightSelection(this.settings.className)[0]
  }

  isMarkable(selection) {
    return Boolean(
      !selection.isCollapsed &&
        getAnchestorIdentifyableNode(selection.anchorNode) &&
        getAnchestorIdentifyableNode(selection.focusNode)
    )
  }

  mark() {
    const selection = rangy.getSelection()
    // console.log(selection)
    if (this.isMarkable(selection)) {
      const overlaps = this.highlighter
        .getHighlightsInSelection()
        .map((highlight) => {
          console.log("hhhhhhhhhhhhaaaaaaaaaaaaaaaaaaahhhhhhhhhhhhh ",highlight.getRange())
          const range = highlight.getRange()
          return rangeToData(range)
        })

      const highlight = this.highlight()
     
      const range = highlight.getRange()
      console.log(" rrrrrrrrrrrrrrrrrrrrrrrraaaaaaaaaaaaaaaaaaaaaaaannnnnnnnnnnnnnnnnnnnnnnnnnggggggggggee", range)
      const marked = rangeToData(range)

      // console.log({ overlaps, marked })

      console.log(JSON.stringify(marked))
    }
  }

  unmark() {
    const highlight = this.highlighter.unhighlightSelection()
    // const range = highlight[0].getRange()
    // const marked = rangeToData(range)
    // console.log(marked)
  }
}

export default Marker
