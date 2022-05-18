import React from "react";
import Letter from "./Letter";

export default function Word({ currentWordIndex, word }) {

  return (
    <div className="flex">
      {word.map((letter, i) => (
        <Letter key={i} letter={letter.letter} bgcolor={letter.color}/>
      ))}
    </div>
  );
}
