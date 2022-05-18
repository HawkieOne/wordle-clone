import React, { useEffect, useState } from "react";
import Hotkeys from "react-hot-keys";
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
import { lettersList } from "../shared/data";

export default function GameArea({ onKeyDown }) {


  const [lettersToReg, setLetterToReg] = useState(lettersList);
  const setLetter = useSetRecoilState(currentLetter);
  const [lettersArray, setLettersArray] = useRecoilState(gussedLetters);
  const [colorsArray, setColorsArray] = useRecoilState(colorLetters);
  const setCurrentBgColor = useSetRecoilState(currentBgColor);

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
    // console.log(lettersArray);
  }, [lettersArray]);

  useEffect(() => {
    // console.log("COLORS: ", colorsArray);
  }, [colorsArray]);

  return (
    <Hotkeys
      keyName={lettersToReg}
      onKeyDown={(e) => onKeyDown(e)}
      onKeyUp={onKeyUp}
    >
      <div className="h-full flex flex-col justify-center items-center basis-3/4 border-y border-y-slate-900">
        {lettersArray.map((word, i) => (
          <Word key={i} wordIndex={i} word={word} />
        ))}
      </div>

    </Hotkeys>
  );
}
