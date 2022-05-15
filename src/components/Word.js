import React from "react";
import { useRecoilValue } from "recoil";
import { letters, wordIndex } from "../atoms/atoms";
import Letter from "./Letter";

export default function Word({ currentWordIndex, word }) {
  var activeWordIndex = useRecoilValue(wordIndex);
  const lettersArray = useRecoilValue(letters);
  const colors = ['bg-red-200', 'bg-green-200', 'bg-blue-200', 'bg-pink-200', 'bg-purple-200']

  return (
    <div className="flex">
      {word.map((letter, i) => (
        <Letter key={i} letter={letter.letter} bgcolor={letter.color}/>
      ))}
    </div>
  );
}
