import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { letterIndex, letters, wordIndex } from "../atoms/atoms";

export default function Letter({ letter, bgcolor }) {
  // const lettersArray = useRecoilValue(letters);
  // var activeWordIndex = useRecoilValue(wordIndex);
  // var [activeLetterIndex, setActiveLetterIndex] = useRecoilState(letterIndex);
  return (
    <div className="m-2">
      {letter === '' ? (
        <p className="w-14 h-14 flex justify-center items-center 
                        text-4xl font-medium text-white border border-1 border-slate-500"
        >
          {letter}
        </p>
      ) : (
        <p className={`${bgcolor} w-14 h-14 flex justify-center items-center 
                        text-4xl font-medium text-white scale-110
                        transition ease-in-out -translate-y-1`}
        >
          {letter}
        </p>
      )}
    </div>
  );
}
