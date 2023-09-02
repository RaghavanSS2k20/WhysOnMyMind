import React from 'react'; // Make sure to import React
import EmojiPicker from 'emoji-picker-react';
const EmojiPickerWrapper = () => {
  // Define the callback function that will be called when an emoji is clicked
  const onEmojiClick = (emoji) => {
    console.log('Selected Emoji:', emoji);
  };

  return (
    <div>
      {/* Render the EmojiPicker component with the onEmojiClick callback */}
      <EmojiPicker onEmojiClick={onEmojiClick} />
    </div>
  );
};

export default EmojiPickerWrapper;
