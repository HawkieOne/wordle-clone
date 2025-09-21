import React from "react";
import { GREEN, LIGHTGREY, YELLOW } from "../shared/data";
import LetterPopup from "./LetterPopup";

export default function HowToPopup({ close }) {
  return (
    <div className="flex flex-col space-y-2 md:space-y-6 items-start roundex-lg m-4">
      <h1 className="texl-lg md:text-xl self-center font-bold">How To Play</h1>

      <div className="flex flex-col space-y-2 text-sm md:text-md">
        <p>
          Guess the <span className="font-bold">WORDLE</span> in six tries.
        </p>
        <p>
          Each guess must be a valid five-letter word. Hit the enter button to
          submit.
        </p>
        <p>
          After each guess, the color of the tiles will change to show how close
          your guess was to the word.
        </p>
      </div>

      <hr className="bg-slate-700 w-5/6 h-0.5" />
      <p className="texl-lg md:text-xl font-bold">Examples</p>

      <p className="text-sm md:text-md">
        The letter <span className="font-bold">W</span> is in the word and in
        the correct spot.
      </p>
      <div className="flex space-x-2">
        <LetterPopup letter="W" bgColor={GREEN} />
        <LetterPopup letter="E" bgColor="bg-white" />
        <LetterPopup letter="A" bgColor="bg-white" />
        <LetterPopup letter="R" bgColor="bg-white" />
        <LetterPopup letter="Y" bgColor="bg-white" />
      </div>

      <p className="text-sm md:text-md">
        The letter <span className="font-bold">I</span> is in the word but in
        the wrong spot.
      </p>
      <div className="flex space-x-2">
        <LetterPopup letter="P" bgColor="bg-white" />
        <LetterPopup letter="I" bgColor={YELLOW} />
        <LetterPopup letter="L" bgColor="bg-white" />
        <LetterPopup letter="L" bgColor="bg-white" />
        <LetterPopup letter="S" bgColor="bg-white" />
      </div>

      <p className="text-sm md:text-md">
        The letter <span className="font-bold">U</span> is not in the word in
        any spot.
      </p>
      <div className="flex space-x-2">
        <LetterPopup letter="V" bgColor="bg-white" />
        <LetterPopup letter="A" bgColor="bg-white" />
        <LetterPopup letter="G" bgColor="bg-white" />
        <LetterPopup letter="U" bgColor={LIGHTGREY}/>
        <LetterPopup letter="E" bgColor="bg-white" />
      </div>

      <hr className="bg-slate-700 w-5/6 h-0.5" />
      <button
        className="bg-slate-700 text-white rounded-lg shadow-lg p-2
               hover:bg-white hover:text-slate-700 self-center"
        onClick={() => close()}
      >
        Close
      </button>
    </div>
  );
}

