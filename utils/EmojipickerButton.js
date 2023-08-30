import React, { useState } from 'react';
import { Picker } from 'emoji-mart';

const EmojiPickerButton = ({ onEmojiSelect }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiSelect = emoji => {
    onEmojiSelect(emoji.native); // Pass the selected emoji to the parent component
    setShowPicker(false);
  };

  return (
    <div className="emoji-picker-button">
      <button
        aria-label="Insert Emoji"
        onClick={() => setShowPicker(!showPicker)}
      >
        {showPicker ? 'Close' : 'Emoji'}
      </button>
      {showPicker && (
        <Picker
          onSelect={handleEmojiSelect}
          title="Pick an Emoji"
          emoji="point_up" // Default emoji category
        />
      )}
    </div>
  );
};

export default EmojiPickerButton;
