import { useEffect, useState } from "react";

const TypingAnimation = ({ text, typingSpeed }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex >= text.length) {
        clearInterval(typingInterval);
        return;
      }

      setDisplayText((prevText) => prevText + text[currentIndex]);
      currentIndex++;
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [text, typingSpeed]);

  return <span style={{ fontWeight: 800 }}>{displayText}</span>;
};

export default TypingAnimation;
