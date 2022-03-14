import React, { useEffect } from "react";
import Hotkeys from "react-hot-keys";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  letterIndex,
  currentLetter,
  wordIndex,
  gussedLetters,
  colorLetters,
} from "../atoms/atoms";
import Word from "./Word";

const lettersToReg =
  "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,backspace,enter";

  const correctWord = "HELLO";

export default function Game() {
  const setLetter = useSetRecoilState(currentLetter);
  const [activeWordIndex, setActiveWordIndex] = useRecoilState(wordIndex);
  const [activeLetterIndex, setActiveLetterIndex] = useRecoilState(letterIndex);
  const [lettersArray, setLettersArray] = useRecoilState(gussedLetters);  
  const [colorsArray, setColorsArray] = useRecoilState(colorLetters);

  const onKeyDown = (letter) => {
    switch (letter) {
      case "backspace":       
        setLettersArray("delete");
        setActiveLetterIndex("decrease");
        break;
      case "enter":
        if (activeLetterIndex !== 4) {
          toast("Not enough letters");
          return;
        } else {
            for (var i = 0; i < correctWord.length; i++) {
                const letter = lettersArray[activeWordIndex][i].letter.toLowerCase();
                const correctLetter = correctWord[i].toLowerCase();
                console.log(letter + " " + correctLetter);
                setColorsArray(i);
                // setLettersArray("delete");
            }
            // word = lettersArray[activeWordIndex].map((letter, i) => {
            //     console.log(letter);
            //     return word += letter;
            // })
        }
        setActiveWordIndex("increase");
        setActiveLetterIndex("zero");
        break;
      default:
        setLetter(letter);
        setLettersArray("add");
        setActiveLetterIndex("increase");
        break;
    }
  };

  const onKeyUp = (e) => {
    // console.log("Key up");
  };

  useEffect(() => {
    console.log(lettersArray);
  }, [lettersArray]);

  return (
    <Hotkeys
      keyName={lettersToReg}
      onKeyDown={(e) => onKeyDown(e)}
      onKeyUp={onKeyUp}
    >
      <div className="h-full flex flex-col justify-center items-center basis-3/4">
        {lettersArray.map((word, i) => (
          <Word key={i} wordIndex={i} word={word} />
        ))}
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </Hotkeys>
  );
}
