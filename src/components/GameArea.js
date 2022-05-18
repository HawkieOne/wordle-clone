import React, { useEffect, useState } from "react";
import Hotkeys from "react-hot-keys";
import { useRecoilState } from "recoil";
import axios from "axios";

import { gussedLetters, colorLetters } from "../atoms/atoms";
import Word from "./Word";
import { lettersList } from "../shared/data";

export default function GameArea({ onKeyDown }) {
  const [lettersToReg, setLetterToReg] = useState(lettersList);
  const [lettersArray, setLettersArray] = useRecoilState(gussedLetters);

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

  return (
    <Hotkeys
      keyName={lettersToReg}
      onKeyDown={(e) => onKeyDown(e)}
      // onKeyUp={onKeyUp}
    >
      <div className="h-full flex flex-col justify-center items-center basis-3/4 border-y border-y-slate-900">
        {lettersArray.map((word, i) => (
          <Word key={i} wordIndex={i} word={word} />
        ))}
      </div>
    </Hotkeys>
  );
}
