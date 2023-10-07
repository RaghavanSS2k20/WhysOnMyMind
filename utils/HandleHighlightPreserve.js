export const handle_highlight_preserve = async(highlightedSelectionData,highlighjtedText)=>{
    const range = highlightedSelectionData.getRangeAt(0)
    const startContainerHTML = range.startContainer.parentNode.outerHTML;
    const endContainerHTML = range.endContainer.parentNode.outerHTML;
    const startOffset = range.startOffset;
    const endOffset = range.endOffset;
    const highlightData = {
        selectedText: highlighjtedText,
        startContainerHTML,
        endContainerHTML,
        startOffset,
        endOffset
    }
    console.log("from handle high preserce",highlightData)





}
