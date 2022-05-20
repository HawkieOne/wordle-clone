import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isPopupOpen, keyboardLetters, modifyWordleMatrix } from "../atoms/atoms";
import { createArrayABC } from "../shared/common";
import { lettersList } from "../shared/data";

export default function StatisticsPopup() {

  const setWordleMatrix = useSetRecoilState(modifyWordleMatrix);
  const [colorKeyboard, setColorKeyboard] = useRecoilState(keyboardLetters);
  const setIsOpen = useSetRecoilState(isPopupOpen);

  const startNewGame = () => {
    setWordleMatrix("new");
    // Resets keyboard colors
    setColorKeyboard(createArrayABC(lettersList));
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col space-y-6 items-center roundex-lg shadow-lg my-4 relative">
      {/* Needs icon */}
      <p className="absolute top-0 right-0 p-1">X</p>
      <h1 className="text-2xl ">Statistics</h1>
      <div className="flex space-x-4">
        <Statistic number={11} text={"Played"} />
        <Statistic number={11} text={"Played"} />
        <Statistic number={11} text={"Played"} />
        <Statistic number={11} text={"Played"} />
      </div>
      <button
        className="bg-slate-700 text-white rounded-lg shadow-lg p-2"
        onClick={startNewGame}
      >
        Play again
      </button>
    </div>
  );
}

function Statistic({ number, text }) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-4xl font-semibold">{number}</p>
      <p className="text-md">{text}</p>
    </div>
  );
}
