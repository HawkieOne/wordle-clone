import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  darkMode,
  hasWonGame,
  isPopupOpen,
  keyboardLetters,
  wordOfTheGame,
} from "../atoms/atoms";
import Header from "./Header";
import Keyboard from "./Keyboard";
import GameArea from "./GameArea";
import { useOnKeyDown } from "../shared/hooks";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import StatisticsPopup from "./StatisticsPopup";
import { generateRandomWord, getRandomWord } from "../shared/common";

export default function Game() {
  const [colorKeyboard, setColorKeyboard] = useRecoilState(keyboardLetters);
  const [letter, onLetterPressed] = useOnKeyDown();
  const isOpen = useRecoilValue(isPopupOpen);
  const [word, setWord] = useRecoilState(wordOfTheGame);
  const isDarkmode = useRecoilValue(darkMode);

  useEffect(() => {
    setWord(generateRandomWord());
  }, [setWord]);

  return (
    <div className={`h-full ${isDarkmode === "Dark" ? "dark" : ""} `}>
      <div className="h-full  flex flex-col dark:bg-slate-600 bg-whiteBG">
        <Header />
        <GameArea onKeyDown={onLetterPressed} />
        <Keyboard
          keyboardLetters={colorKeyboard}
          setKeyboardLetters={setColorKeyboard}
        />
        <Popup open={isOpen} position="right center">
          {(close) => (
            <StatisticsPopup
              closeOnEscape={false}
              close={close}
              showWord={true}
            />
          )}
        </Popup>
      </div>
    </div>
  );
}
