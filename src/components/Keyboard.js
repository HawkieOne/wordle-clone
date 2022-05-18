import React from "react";
import KeyboardLetter from "./KeyboardLetter";

export default function Keyboard({ lettersLeft, setLettersLeft }) {
  return (
    <div className="self-center flex flex-col items-center m-3 space-y-3">
      <div className="flex wrap space-x-2">
        {lettersLeft.slice(0, 10).map((item, index) => (
          <KeyboardLetter letter={item} key={index} lettersLeft={lettersLeft} setLettersLeft={setLettersLeft}/>
        ))}
      </div>
      <div className="flex wrap space-x-2">
        {lettersLeft.slice(10, 19).map((item, index) => (
          <KeyboardLetter letter={item} key={index} lettersLeft={lettersLeft} setLettersLeft={setLettersLeft}/>
        ))}
      </div>
      <div className="flex wrap space-x-2">
        {lettersLeft.slice(19, lettersLeft.length).map((item, index) => (
          <KeyboardLetter letter={item} key={index} lettersLeft={lettersLeft} setLettersLeft={setLettersLeft}/>
        ))}
      </div>
    </div>
  );
}
