import React, { useEffect, useState } from "react";
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
  currentBgColor,
  letters,
  lettersLeft,
} from "../atoms/atoms";
import { wordsApi } from "../api/wordsApi";
import {
  createLetterArr,
  joinLettersToWord,
  onBackspace,
  onLetterPress,
} from "../shared/common";
import { lettersList } from "../shared/data";
import Header from "./Header";
import Keyboard from "./Keyboard";
import GameArea from "./GameArea";
import { useOnKeyDown } from "../shared/hooks";

const correctWord = "HELLO";

export default function Game() {
  const [lettersLeft2, setLettersLeft] = useRecoilState(lettersLeft);

  const [letter2, onLetterPressed] = useOnKeyDown();
  const [lettersArray, setLettersArray] = useRecoilState(gussedLetters);

  return (
    <div className="h-full bg-slate-600 flex flex-col">
      <Header />
      <GameArea onKeyDown={onLetterPressed} />
      <Keyboard
        onKeyDown={onLetterPressed}
        lettersLeft={lettersLeft2}
        setLettersLeft={setLettersLeft}
      />
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
        onClick={() => {
          setLettersArray("new");
          setLettersLeft(createLetterArr(lettersList));
        }}
      />
    </div>
  );
}
