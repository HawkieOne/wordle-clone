import React, { useEffect, useState } from "react";
import Hotkeys from "react-hot-keys";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilState, useSetRecoilState } from "recoil";
import axios from "axios";

import {
  letterIndex,
  currentLetter,
  wordIndex,
  gussedLetters,
  colorLetters,
  currentBgColor,
} from "../atoms/atoms";
import Word from "./Word";
import { wordsApi } from "../api/wordsApi";
import { joinLettersToWord } from "../shared/common";

const lettersList =
  "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,backspace,enter";

const correctWord = "HELLO";

export default function Game() {
  // const [correctWord,setCorrectWord] = useState(getRandomWord());
  const [lettersToReg, setLetterToReg] = useState(lettersList);
  const setLetter = useSetRecoilState(currentLetter);
  const [activeWordIndex, setActiveWordIndex] = useRecoilState(wordIndex);
  const [activeLetterIndex, setActiveLetterIndex] = useRecoilState(letterIndex);
  const [lettersArray, setLettersArray] = useRecoilState(gussedLetters);
  const [colorsArray, setColorsArray] = useRecoilState(colorLetters);
  const setCurrentBgColor = useSetRecoilState(currentBgColor);

  const onKeyDown = (letter) => {
    console.log("activeLetterIndex: ", activeLetterIndex);
    console.log("activeWordIndex: ", activeWordIndex);
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
          wordsApi.onWordExists(joinLettersToWord(lettersArray[activeWordIndex]))
          .then((result) => {
            var correctLetterCount = 0;
            for (var i = 0; i < correctWord.length; i++) {
              const letter = lettersArray[activeWordIndex][i].letter.toLowerCase();
              const correctLetter = correctWord[i].toLowerCase();
              console.log("Correct Letter: ", correctLetter);
              console.log("Guessed letter: ", letter)
              console.log(correctLetter.indexOf(letter));
              if (letter === correctLetter) {
                setCurrentBgColor("bg-emerald-700");
                setColorsArray(i);
                correctLetterCount++;
                if (correctLetterCount === 5) {
                  toast("Correct guess\nPress here to play again", {
                    autoClose: false,
                  });
                  setLetterToReg("");
                }
              } else if ("Index: ", (correctLetter.indexOf(letter)) <= -1) {
                console.log(("DOES NOT EXIST IN WORD"))
                console.log(correctLetter.indexOf(letter));
                setCurrentBgColor("bg-yellow-400");
                setColorsArray(i);
              }
              setActiveWordIndex("increase");
              setActiveLetterIndex("zero");
            }
          })
          .catch((error) => {
            toast("Not in word list");
          });
        }
        break;
      default:        
        setLetter(letter);
        setLettersArray("add");
        setActiveLetterIndex("increase");
        break;
    }
  };

  const getRandomWord = () => {
    const options = {
      method: "GET",
      url: "https://wordsapiv1.p.rapidapi.com/words/",
      headers: {
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        "x-rapidapi-key": "5b6d31f8cfmsh5598169723208c2p1be828jsn0b38fac79ee6",
      },
      params: {
        random: "true",
        letters: "5",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        return true;
      })
      .catch(function (error) {
        console.error(error);
        return false;
      });
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
        onClick={() => setLettersArray("new")}
      />
    </Hotkeys>
  );
}
