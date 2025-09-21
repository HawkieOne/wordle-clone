import React from "react";
import { useRecoilValue } from "recoil";
import { animateMissingLetter, currentLetterIndex, currentWordIndex, doesWordExist } from "../atoms/atoms";

export default function Letter({ letter, bgcolor, index }) {

  const wordExist = useRecoilValue(doesWordExist)
  const aniamteMissing = useRecoilValue(animateMissingLetter) 
  const currentRowIndex = useRecoilValue(currentWordIndex); 

  let bounceLetter = false;
  if (index === currentRowIndex && !wordExist) {
    bounceLetter = true;
  }

  let missingLetterBounce = false;
  if (aniamteMissing && currentLetterIndex !== 5 && index === currentRowIndex) {
    missingLetterBounce = true;
  }

  return (
    <div className="m-2">
      {letter === '' ? (
        <p className={`w-12 h-12 lg:w-14 lg:h-14 flex justify-center items-center 
                        text-4xl font-medium text-white border border-1 border-slate-500
                        ${missingLetterBounce ? 'wobble border-red-400' : '' }`}
        >
          {letter}
        </p>
      ) : (
        <p className={`${bgcolor} w-12 h-12 lg:w-14 lg:h-14 flex justify-center items-center 
                        text-4xl font-medium text-white scale-110
                        transition ease-in-out -translate-y-1
                        ${bounceLetter ? 'wobble' : '' }`}
        >
          {letter}
        </p>
      )}
    </div>
  );
}
