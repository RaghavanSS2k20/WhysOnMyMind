import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Popover, Button } from '@blueprintjs/core';
import { Highlight } from '@blueprintjs/icons';
import contentStyle from '../styles/content.module.css'
const MarkdownViewer = () => {
  const [selectedTexttwo, setSelectedTexttwo] = useState('');
  const [popupPositiontwo, setPopupPositiontwo] = useState({});
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const markdownContent = `
  # Markdown Example
  
  non.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action.You can select text to see the popup in action
  `;

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

  const handleMouseDown = () => {
    setSelectedTexttwo('');
    // Close the popover when the mouse is clicked outside
    setIsPopoverOpen(false);
  };

  return (
    <div>
      <div
        onMouseUp={handleTextSelection}
        onMouseDown={handleMouseDown}
        className={contentStyle.contentClass}
        style={{ position: 'relative' }}
      >
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
      {selectedTexttwo && (
        <div
          style={{
            position: 'absolute',
            top: popupPositiontwo.top,
            left: popupPositiontwo.left,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            padding: '10px',
          }}
        >
          <Popover
            
            isOpen={isPopoverOpen}
            position="auto"
            onClose={() => setIsPopoverOpen(false)}
          >
             <div style={{ padding: '10%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <Button
                  icon={<Highlight size={16} />}
                  style={{ padding: '2%', margin: '2%', width: 'fit-content' }}
                  onClick={() => setIsPopoverOpen(false)}
                />
                <Button
                  style={{ padding: '2%', margin: '2%' }}
                  icon={<Highlight size={16} />}
                  onClick={() => setIsPopoverOpen(false)}
                />
              </div>
           
          </Popover>
        </div>
      )}
    </div>
  );
};

export default MarkdownViewer;
