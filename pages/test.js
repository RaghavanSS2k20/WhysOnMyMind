import rangy from "rangy";
import "rangy/lib/rangy-classapplier";
import "rangy/lib/rangy-highlighter";

import { useCallback, useEffect, useRef } from "react";
import highStyles from "../styles/highlight.module.css";

export default function HighlightDemo() {
  const highlighterRef = useRef(null); // Create a ref for the highlighter object

  useEffect(() => {
    // Create and configure the highlighter object
    const highlighter = rangy.createHighlighter();

    highlighter.addClassApplier(
      rangy.createClassApplier(highStyles.highlight, {
        ignoreWhiteSpace: true,
        elementTagName: "mark",
        tagNames: ["mark"]
      })
    );

    // const s = "type:textContent|197$259$1$_src_high_module__highlight$";
    // highlighter.deserialize(s);

    // Set the highlighter object in the ref
    highlighterRef.current = highlighter;

    return () => {
      // Clean up the highlighter when the component unmounts
      highlighter.removeAllHighlights();
    };
  }, []);

  const handleSaveHighlight = useCallback(async() => {
    const highlighter =  highlighterRef.current
    
    // highlighter.addClassApplier(
    //   rangy.createClassApplier(highStyles.highlight, {
    //     ignoreWhiteSpace: true,
    //     elementTagName: "mark",
    //     tagNames: ["mark"]
    //   })
    // );
    const response = await fetch("https://whysonmymind-backend-production.up.railway.app/write",{  credentials: 'include', }); // Fetch from your Express API route
    const data = await response.json();
    
    highlighter.highlightSelection(highStyles.highlight);

    console.log("highlighter.highlights", highlighter.highlights);
    console.log(
      "highlighter.highlights[0].getHighlightElements()",
      highlighter.highlights[0].getHighlightElements()
    );
    console.log(
      "highlighter.highlights :: getText",
      highlighter.highlights.map((h) => h.getText())
    );
    const serialized = highlighter.serialize();
    console.log("serrrr", serialized);
    // console.log("test", highlighter.deserialize(serialized));
  }, []);

  return (
    <div className="App">
      <div id="controls">
        <button onClick={handleSaveHighlight}>Save Highlight</button>
      </div>
      <div>
        <h1>Rangy Highlighter Module Demo</h1>
        {/* Rest of your component */}
      </div>
    </div>
  );
}
