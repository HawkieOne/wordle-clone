import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  amountOfGuesses,
  hasWonGame,
  isPopupOpen,
  keyboardLetters,
  modifyWordleMatrix,
  wordOfTheGame,
} from "../atoms/atoms";
import { createArrayABC, generateRandomWord } from "../shared/common";
import { lettersList } from "../shared/data";
import { useLocalStorage } from "../shared/hooks";

export default function StatisticsPopup({ showWord, close }) {
  const setWordleMatrix = useSetRecoilState(modifyWordleMatrix);
  const setColorKeyboard = useRecoilState(keyboardLetters)[1];
  const setIsOpen = useSetRecoilState(isPopupOpen);
  const amountOfGuessesValue = useRecoilValue(amountOfGuesses);

  const [daysPlayed] = useLocalStorage("daysPlayed", 0);
  const [daysWon] = useLocalStorage("daysWon", 0);
  const [maxStreak] = useLocalStorage("maxStreak", 0);
  const [currentStreak] = useLocalStorage("currentStreak", 0);
  const [word, setWord] = useRecoilState(wordOfTheGame);
  const setIsVictory = useRecoilState(hasWonGame)[1];

  const startNewGame = () => {
    setWordleMatrix({ action: "new", value: 0 });
    setWord(generateRandomWord());
    // Resets keyboard colors
    setColorKeyboard(createArrayABC(lettersList));
    setIsOpen(false);
    setIsVictory(false);
  };

  return (
    <div className="flex flex-col space-y-6 items-center roundex-lg m-4">
      {/* Needs icon */}
      {showWord ? (
        <h1 className="text-xl">
          Todays word was{" "}
          <a
            title="See definition of word"
            className="font-bold text-blue-400 underline underline-offset-2 hover:text-blue-700"
            href={`https://www.oxfordlearnersdictionaries.com/definition/english/${word.toLowerCase()}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {word}
          </a>
        </h1>
      ) : null}

      <hr className="bg-slate-700 w-5/6 h-0.5" />

      <h1 className="text-xl lg:text-2xl ">Statistics</h1>
      <div className="flex space-x-4">
        <Statistic number={amountOfGuessesValue} text={"Guesses today"} />
        <Statistic number={daysPlayed} text={"Times played"} />
        <Statistic number={daysWon} text={"Games won"} />
        <Statistic number={maxStreak} text={"Max streak"} />
        <Statistic number={currentStreak} text={"Current streak"} />
      </div>

      <hr className="bg-slate-700 w-5/6 h-0.5" />

      <div className="flex space-x-6">
        <button className="hidden"></button>
        {showWord ? (
          <button
            className="bg-slate-700 text-white rounded-lg shadow-lg p-2
                 hover:bg-white hover:text-slate-700"
            onClick={startNewGame}
          >
            Play again
          </button>
        ) : (
          <button
            className="bg-slate-700 text-white rounded-lg shadow-lg p-2
               hover:bg-white hover:text-slate-700"
            onClick={() => close()}
          >
            Close
          </button>
        )}  
      </div>
    </div>
  );
}

function Statistic({ number, text }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-xl lg:text-4xl font-semibold">{number}</p>
      <p className="text-sm lg:text-md text-center">{text}</p>
    </div>
  );
}
