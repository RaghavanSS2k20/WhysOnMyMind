import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import contentStyle from '../styles/content.module.css'
import '@blueprintjs/core/lib/css/blueprint.css';
import { Popover, Button, Classes } from '@blueprintjs/core';
import { Highlight } from '@blueprintjs/icons';

const MarkdownWithOverlay = ({ markdownContent }) => {
  const [selectionInfo, setSelectionInfo] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const containerRef = useRef(null);
  const popoverRef = useRef(null);

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
      <div onMouseUp={handleSelection} ref={containerRef} className={contentStyle.contentClass} >
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
                img:CustomImage
                
              }}
        >{markdownContent}</ReactMarkdown>
      </div>
      {selectionInfo && (
        <div
          ref={popoverRef}
          style={{
            position: 'absolute',
            top: selectionInfo.position.top,
            left: selectionInfo.position.left,
            zIndex: 1,
          }}
        >
          <Popover
          popoverClassName='bp5-dark'
          
            content={
              <div style={{padding:'10%', display:'flex', flexDirection:'row', justifyContent:"space-around",}}>
                
                <Button
                 
                  
                  icon={<Highlight size={16}/>}
                  
                  style={{padding:'2%', margin:'2%', width:'fit-content'}}
                  onClick={() => setIsPopoverOpen(false)}
                />
                 
                 <Button
                    style={{padding:'2%', margin:'2%'}}
                 
                  icon={<Highlight size={16}/>}
                  onClick={() => setIsPopoverOpen(false)}
                />
                
              </div>
            }
            interactionKind="click"
            isOpen={isPopoverOpen}
            position="auto"
            onClose={() => {
              setSelectionInfo(null);
              setIsPopoverOpen(false);
            }}
          >
            <span></span>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default MarkdownWithOverlay;
