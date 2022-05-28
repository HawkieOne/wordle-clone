import React from "react";
import KeyboardLetter from "./KeyboardLetter";

export default function Keyboard({ keyboardLetters }) {  
  return (
    <div className="self-center flex flex-col items-center justify-center m-3 space-y-3">
      <div className="flex wrap space-x-2">
        {keyboardLetters.slice(0, 10).map((item, index) => (
          <KeyboardLetter letter={item} key={index} />
        ))}
      </div>
      <div className="flex wrap space-x-2">
        {keyboardLetters.slice(10, 19).map((item, index) => (
          <KeyboardLetter letter={item} key={index} />
        ))}
      </div>
      <div className="flex wrap space-x-2">
        {keyboardLetters.slice(19, keyboardLetters.length).map((item, index) => (
          <KeyboardLetter letter={item} key={index} />
        ))}
      </div>
    </div>
  );
}
