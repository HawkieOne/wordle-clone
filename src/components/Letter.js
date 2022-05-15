import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { letterIndex, letters, wordIndex } from "../atoms/atoms";

export default function Letter({ letter, bgcolor }) {
  // const lettersArray = useRecoilValue(letters);
  // var activeWordIndex = useRecoilValue(wordIndex);
  // var [activeLetterIndex, setActiveLetterIndex] = useRecoilState(letterIndex);
  // const [letterProp, setLetterProp] = useState('');

  // useEffect(() => {
  //     // console.log(lettersArray);
  //     setLetterProp(getLetter());
  //     // setActiveLetterIndex("increase");
  //   }, [lettersArray]);

  //   const getLetter = (i) => {
  //     // console.log(currentWordIndex + " " + activeWordIndex + " " + currentLetterIndex + " " + activeLetterIndex);
  //     if (currentWordIndex === activeWordIndex && currentLetterIndex === activeLetterIndex) {
  //         console.log(lettersArray[activeWordIndex][activeLetterIndex]);
  //       return lettersArray[activeWordIndex][activeLetterIndex];
  //     }
  //     return "";
  //   };
  return (
    <div className="m-2">
      {letter === '' ? (
        <p className="w-14 h-14 flex justify-center items-center 
                        text-4xl font-medium text-white border border-1 border-slate-500"
        >
          {letter.toUpperCase()}
        </p>
      ) : (
        <p className={`${bgcolor} w-14 h-14 flex justify-center items-center 
                        text-4xl font-medium text-white scale-110
                        transition ease-in-out -translate-y-1`}
        >
          {letter.toUpperCase()}
        </p>
      )}
    </div>
  );
}
