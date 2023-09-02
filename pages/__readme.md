## WhysOnMyMind major error -II
### react useState's async behaviour

React useState  have exactly async behaviour.....its state management mechanism makes us feel that way.. example

```
    ...
    SetuserName("Raghavan")
    console.log(userName);
    // this console wont display Raghavan.

```

Each state updation demands a re-render, so when a state being updated the value will be updated only at next render. thats why we are not able to see at console.log()
### How do we solve this??

**use useRef**
unlike *useState* useRef doesnt trigger re-render; only remembers the value.
```
 const HandleEmojiPickup = (emojiData) => {
    
    emojiRef.current = emojiData
    
    
  };

```


Solved with ❤️ 