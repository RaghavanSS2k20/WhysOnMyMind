import React, { useState } from 'react';
import { MenuItem, Tag, Popover, Position, Button,  Intent } from '@blueprintjs/core';

const CategoryDropdownWithTags = () => {
  const categories = ["Life Lesson", "Tech Stack", "Books", "General"];
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isFull, setIsfull] = useState(false);

  const handleCategorySelect = (category) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
      setIsfull(true);
    }
  };

  const handleCategoryRemove = (category) => {
    const updatedCategories = selectedCategories.filter((c) => c !== category);
    setSelectedCategories(updatedCategories);
    setIsfull(false)
    
  };

  return (
    <Popover
      content={
        <div style={{ padding: '8px', }}>
          {categories.map((category) => (
            <MenuItem
              key={category}
              text={category}
              onClick={() => handleCategorySelect(category)}
              
              intent={selectedCategories.includes(category) ? 'primary' : 'none'}
            />
          ))}
        </div>
      }
      position="auto"
      disabled={isFull?true:false}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '8px', display: 'flex', flexWrap: 'wrap'  }}>
          {selectedCategories.map((category) => (
            <Tag
              key={category}
              style={{
                backgroundColor: 'transparent',
                border: '2px solid grey',
                fontWeight:'800',
                
                color: 'grey',
                marginRight: '4px',
                marginBottom: '4px',
              }}
              onRemove={() => handleCategoryRemove(category)}
            >
              {category}
            </Tag>
          ))}
        </div>
        <div>
          {selectedCategories.length === 0 ? (
            <span style={{ color: '#a0a0a0' }}>Select a category...</span>
          ) : null}
        </div>
        <Button minimal={true} icon="caret-down" />
      </div>
    </Popover>
  );
};

export default CategoryDropdownWithTags;
