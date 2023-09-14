import React, { useState , useRef} from 'react';
import { Divider } from '@blueprintjs/core';
import styled from 'styled-components';
const Tab = styled.button`
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  ${({ activee }) =>
  
    activee &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;
const ButtonGroup = styled.div`
  display: flex;
`;
// const types = ['Cash', 'Credit Card', 'Bitcoin'];
function TabGroup(props) {
   const types = props.types
  
   const activeRef = useRef(types[0].title)
  const [active, setActive] = useState(types[0].title);

  
 
  
  return (
    <>
      <ButtonGroup>
        {types.map((type, index) => (
          <Tab
            key={index}
            activee={active=== type.title?1:0}
            onClick={
                
                () => {
                    console.log("the ans is ",active === type.title);
                   setActive(type.title)}}
          >
            { type.title}
          </Tab>
        ))}
       
      </ButtonGroup>
      <p />
      <div>{props.types.find(type => type.title === active)?.content}</div>
    </>
  );
}
// Usage
export default TabGroup