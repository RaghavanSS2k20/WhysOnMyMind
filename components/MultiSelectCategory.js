import React, { useState } from "react";
import { MultiSelect } from "@blueprintjs/select";
import { MenuItem } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css"; 
import "@blueprintjs/select/lib/css/blueprint-select.css"; // Import Blueprint CSS

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
  { label: "Grapes", value: "grapes" },
  { label: "Mango", value: "mango" },
  { label: "Strawberry", value: "strawberry" },
  // Add more options as needed
];

const renderFruitItem = (fruit, { handleClick, modifiers }) => {
  return (
    <MenuItem
      key={fruit.value}
      text={fruit.label}
      onClick={handleClick}
      active={modifiers.active}
    />
  );
};

const MultiSelectExample = () => {
  const [selectedFruits, setSelectedFruits] = useState([]);

  return (
    <MultiSelect
      items={fruits}
      itemRenderer={renderFruitItem}
      tagRenderer={(item) => item.label}
      tagInputProps={{
        onRemove: (tag,index) => {
          const newSelected = selectedFruits.filter(
            (fruit) => fruit.value !== tag.value
          );
          console.log("New selected fruits:", newSelected);
          setSelectedFruits(newSelected);
        },
      }}
      selectedItems={selectedFruits}
      onItemSelect={(item) => setSelectedFruits([...selectedFruits, item])}
      placeholder="Select fruits..."
      noResults={<MenuItem disabled text="No results." />}
    />
  );
};

export default MultiSelectExample;
