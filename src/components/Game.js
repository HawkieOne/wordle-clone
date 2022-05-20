import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import {
  isPopupOpen,
  keyboardLetters,
  modifyWordleMatrix,
} from "../atoms/atoms";
import { wordsApi } from "../api/wordsApi";
import { createArrayABC } from "../shared/common";
import { lettersList } from "../shared/data";
import Header from "./Header";
import Keyboard from "./Keyboard";
import GameArea from "./GameArea";
import { useOnKeyDown } from "../shared/hooks";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import StatisticsPopup from "./StatisticsPopup";

export default function Game() {
  const [colorKeyboard, setColorKeyboard] = useRecoilState(keyboardLetters);

  const [letter, onLetterPressed] = useOnKeyDown();
  const setWordleMatrix = useSetRecoilState(modifyWordleMatrix);
  const isOpen = useRecoilValue(isPopupOpen);

  return (
    <div className="h-full bg-slate-600 flex flex-col">
      <Header />
      <GameArea onKeyDown={onLetterPressed} />
      <Keyboard
        onKeyDown={onLetterPressed}
        keyboardLetters={colorKeyboard}
        setKeyboardLetters={setColorKeyboard}
      />
      <Popup open={isOpen} position="right center">
        <StatisticsPopup />
      </Popup>
      {/* <ToastContainer
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
          setWordleMatrix("new");
          // Resets keyboard colors
          setColorKeyboard(createArrayABC(lettersList));
        }}
      /> */}
    </div>
  );
}
