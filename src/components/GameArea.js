import React, { useEffect, useState } from "react";
import Hotkeys from "react-hot-keys";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";

import { hasWonGame, isPopupOpen, keyboardLetters, modifyWordleMatrix, wordOfTheGame } from "../atoms/atoms";
import Word from "./Word";
import { lettersList } from "../shared/data";
import { createArrayABC, generateRandomWord } from "../shared/common";

export default function GameArea({ onKeyDown }) {
  const [wordleMatrix, setWordleMatrix] = useRecoilState(modifyWordleMatrix);
  const [isVictory, setIsVictory] = useRecoilState(hasWonGame);
  const setColorKeyboard = useSetRecoilState(keyboardLetters);
  const setIsOpen = useSetRecoilState(isPopupOpen);
  const [word, setWord] = useRecoilState(wordOfTheGame);


  const startNewGame = () => {
    setWordleMatrix({ action: "new", value: 0 });
    setWord(generateRandomWord());
    // Resets keyboard colors
    setColorKeyboard(createArrayABC(lettersList));
    setIsOpen(false);
    setIsVictory(false);
  };
  
  return (
    <Hotkeys
      keyName={lettersList}
      onKeyDown={(e) => onKeyDown(e, word)}
    >
      <div className="h-full flex flex-col justify-center items-center basis-3/4  
                      border-y border-y-slate-900 relative">
        {wordleMatrix.map((word, i) => (
          <Word key={i} word={word} index={i} />
        ))}
        {isVictory ? (
          <button
            className="bg-slate-700 text-white rounded-lg shadow-lg p-2
               hover:bg-white hover:text-slate-700 mt-6"
            onClick={startNewGame}
          >
            Play Again
          </button>
        ) : null}
      </div>
    </Hotkeys>
  );
}
