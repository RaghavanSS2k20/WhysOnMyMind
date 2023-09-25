  import React, { useState, useRef, useEffect } from 'react';
  import ReactMarkdown from 'react-markdown';
  import contentStyle from '../styles/content.module.css'
  import '@blueprintjs/core/lib/css/blueprint.css';
  import { Popover, Button, Classes } from '@blueprintjs/core';
  import { Highlight } from '@blueprintjs/icons';
  function wrapTextWithHighlight(selection) {
    if (!selection || selection.isCollapsed) {
      return; // No text selected or empty selection
    }
  
    const range = selection.getRangeAt(0);
    console.log(range)
    
    const startContainer = range.startContainer;
    const endContainer = range.endContainer;
  
    // Create a new span element for highlighting
    const highlightSpan = document.createElement('span');
    highlightSpan.classList.add(contentStyle.highlighted);
  
    // Wrap the selected text with the highlight span
    range.surroundContents(highlightSpan);
  
    // Check for incomplete child elements at the start and end of the selection
    if (startContainer.nodeType === 1 && !startContainer.contains(range.startOffset)) {
      const cloneStart = startContainer.cloneNode(true);
      startContainer.textContent = '';
      startContainer.appendChild(cloneStart);
    }
  
    if (endContainer.nodeType === 1 && !endContainer.contains(range.endOffset)) {
      const cloneEnd = endContainer.cloneNode(true);
      endContainer.textContent = '';
      endContainer.appendChild(cloneEnd);
    }
  }
  
  function removeHighlightFromSelection(selection) {
    if (!selection || selection.isCollapsed) {
      return; // No text selected or empty selection
    }
  
    const range = selection.getRangeAt(0);
    const highlightSpans = range.commonAncestorContainer.querySelectorAll('.highlight');
  
    highlightSpans.forEach((span) => {
      if (range.intersectsNode(span)) {
        const spanText = span.textContent;
        span.replaceWith(document.createTextNode(spanText));
      }
    });
  }
  const MarkdownWithOverlay = ({ markdownContent,user }) => {
    const [highlightedText,setHighlightedText] = useState('')
    const [selectedTexttwo, setSelectedTexttwo] = useState('');
    const [popupPositiontwo, setPopupPositiontwo] = useState({});
    const [selectionInfo, setSelectionInfo] = useState(null);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const containerRef = useRef(null);
    const popoverRef = useRef(null);
    const handleTextSelection = () => {
      const text = window.getSelection().toString().trim();
      if (text) {
        setSelectedTexttwo(text);
        

        // Get the position of the selected text (e.g., use the mouse event)
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();

          setPopupPositiontwo({
            top: rect.top + window.scrollY - 20, // Adjust the top position as needed
            left: rect.left + window.scrollX + rect.width / 2 - 100, // Adjust the left position as needed
          });

          // Open the popover
          setIsPopoverOpen(true);
        }
      } else {
        setSelectedTexttwo('');
        // Close the popover when selection is cleared
        setIsPopoverOpen(false);
      }
    };
    // const highlightedStyle = {
    //   backgroundColor: Highlighted ? 'yellow' : 'transparent', // Change the background color as needed
    // };
    const handleHighlight = ()=>{
      console.log("highlighting")
      console.log(selectedTexttwo)
      if(selectedTexttwo){
        wrapTextWithHighlight(window.getSelection());
      }
    }
    const handleRemoveHighlight = ()=>{
      if (selectedTexttwo){
        removeHighlightFromSelection(window.getSelection());
      }
    }
    const handleMouseDown = () => {
      setSelectedTexttwo('');
      // Close the popover when the mouse is clicked outside
      setIsPopoverOpen(false);
    };
    const updatePopoverPosition = () => {
      if (selectionInfo) {
        const range = window.getSelection().getRangeAt(0);
        const rects = range.getClientRects();

        if (rects.length > 0) {
          const lastRect = rects[rects.length - 1];
          const containerRect = containerRef.current.getBoundingClientRect();

          const newPosition = {
            top: lastRect.bottom - containerRect.top + window.scrollY,
            left: lastRect.left - containerRect.left + window.scrollX + (lastRect.width / 2),
          };

          setSelectionInfo(prevInfo => ({
            ...prevInfo,
            position: newPosition,
          }));
        }
      }
    };

    const handleSelection = () => {
      const selection = window.getSelection();
      const selectedText = selection.toString();

      if (selectedText) {
        const range = selection.getRangeAt(0);
        const rects = range.getClientRects();
        console.log("rects , ",rects)
        if (rects.length > 0) {
          const lastRect = rects[rects.length - 1];
          const containerRect = containerRef.current.getBoundingClientRect();

          const initialPosition = {
            top: lastRect.bottom - containerRect.top + window.scrollY,
            left: lastRect.left - containerRect.left + window.scrollX + (lastRect.width / 2),
          };

          setSelectionInfo({
            text: selectedText,
            position: initialPosition,
          });


          setIsPopoverOpen(true);
          updatePopoverPosition();
        }
      } else {
        setSelectionInfo(null);
        setIsPopoverOpen(false);
      }
    };
  
    useEffect(() => {
      if (isPopoverOpen) {
        const popoverElement = popoverRef.current;
        if (popoverElement) {
          popoverElement.focus();
        }
      }
    }, [isPopoverOpen]);
    useEffect(() => {
      updatePopoverPosition(); // Update position after component mounts
    }, []);

    const imageStyle = {
      width: '25%',
      height: '25%',
    };
    const CustomImage = ({ node, src, alt, ...props }) => {
      const imageStyle = {
        width: '100%',
        height: '100%',
        padding:'2%',
        
      };
      const divStyle = {
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      }
    
      return (
        <div style={divStyle}>
      
        <img
          className={contentStyle.customImage} // Define your custom image style class here
          src={src}
          alt={alt}
          style={imageStyle}
          {...props}
        />
        </div>
      );
    };

    

    return (
      <div style={{ position: 'static' }}>
        <div onMouseUp={handleTextSelection}
          onMouseDown={handleMouseDown}
          className={contentStyle.contentClass}
          style={{ position: 'relative' }} >
          <div style={{display:'flex',justifyContent:'space-between'}}>
          
          </div>
          <ReactMarkdown
              components={{
                  blockquote: ({ node, ...props }) => (
                      <blockquote className={contentStyle.customblockquote} {...props} />
                    ),
                  code: ({ node, inline, className, children, ...props }) => {
                    if (inline) {
                      return <code className={className} {...props}>{children}</code>;
                    } else {
                      return (
                        <div className={contentStyle.codeblock}>
                          <code className={className} {...props}>{children}</code>
                        </div>
                      );
                    }
                  },
                  
                  img:CustomImage,
                  
                  
                }}
          >{markdownContent}</ReactMarkdown>
          
        </div>
        {selectedTexttwo && (
          <Popover
              
          isOpen={isPopoverOpen}
          position="auto"
          onClose={() => setIsPopoverOpen(false)}
        >
          <div
            style={{
              
              position: 'absolute',
              top: popupPositiontwo.top,
              left: popupPositiontwo.left,
              backgroundColor: 'rgba(18, 18, 18,0.789797)',
            
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              padding: '10px',
              borderRadius:'5px'
            }}
          >
            
              <div style={{ padding: '10%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Button

                    icon={<Highlight size={16} color='white' />}
                    style={{ padding: '2%', margin: '2%', width: 'fit-content', border:'none' , background:'inherit'}}
                    onClick={() => {handleHighlight();setIsPopoverOpen(false)}}
                  />
                  <Button
                    style={{ padding: '2%', margin: '2%',border:'none' , background:'inherit' }}
                    icon={<Highlight size={16} color='white' />}
                    onClick={() =>{ handleRemoveHighlight(); setIsPopoverOpen(false)}}
                  />
                </div>
                </div>
            </Popover>
          
        )}
      </div>
    );
  };

  export default MarkdownWithOverlay;
