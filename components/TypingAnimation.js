import React, { useState, useEffect } from 'react';

function TypingAnimation({ text, speed }) {
    const [displayText, setDisplayText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText((prevText) => prevText + text[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setShowCursor(false);
          }, 500); // Adjust the time to control how long the cursor is shown after typing
        }
      }, speed);
  
      return () => {
        clearInterval(interval);
      };
    }, [text, speed, currentIndex]);
  
    return (
      <div>
        {displayText}
        {showCursor && <span style={{fontWeight:'normal'}}>|</span>}
      </div>
    );
  }
  

export default TypingAnimation;
