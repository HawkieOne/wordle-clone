import { toast } from "react-toastify";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  colorLetters,
  currentBgColor,
  currentLetter,
  gussedLetters,
  letterIndex,
  lettersLeft,
  wordIndex,
} from "../atoms/atoms";
import { GREEN, LIGHTGREY, YELLOW } from "./data";

const correctWord = "HELLO";

export const useOnKeyDown = (letter) => {
  const setLetter = useSetRecoilState(currentLetter);
  const [lettersLeft2, setLettersLeft] = useRecoilState(lettersLeft);
  const [activeWordIndex, setActiveWordIndex] = useRecoilState(wordIndex);
  const [activeLetterIndex, setActiveLetterIndex] = useRecoilState(letterIndex);
  const [lettersArray, setLettersArray] = useRecoilState(gussedLetters);
  const [colorsArray, setColorsArray] = useRecoilState(colorLetters);
  const setCurrentBgColor = useSetRecoilState(currentBgColor);

  const onLetterPressed = (letter) => {
    switch (letter) {
      case "BACKSPACE":
        onBackspacePressed(letter);
        break;
      case "ENTER":
        onEnterPressed(letter);
        break;
      default:
        onOtherLetterPressed(letter);
        break;
    }
  };

  const onBackspacePressed = (letter) => {
    setActiveLetterIndex("decrease");
    setLettersArray("delete");
  };

  const onEnterPressed = (letter) => {
    if (activeLetterIndex !== 5) {
      toast("Not enough letters");
      return;
    }

    var correctLetterCount = 0;
    let lettersLeftCpy = lettersLeft2.slice();
    for (var i = 0; i < correctWord.length; i++) {
      const letter = lettersArray[activeWordIndex][i].letter;
      const correctLetter = correctWord[i];
      if (letter === correctLetter) {
        lettersLeftCpy = colorLetter(letter, "correct", lettersLeftCpy);
        updateColors(GREEN, i);
        correctLetterCount++;
      } else if (correctWord.indexOf(letter) > -1) {
        lettersLeftCpy = colorLetter(letter, "wrongPos", lettersLeftCpy);
        updateColors(YELLOW, i);
      } else {
        lettersLeftCpy = colorLetter(letter, "wrong", lettersLeftCpy);
        updateColors(LIGHTGREY, i);
      }
    }
    setActiveWordIndex("increase");
    setActiveLetterIndex("zero");
    setLettersLeft(lettersLeftCpy);

    if (correctLetterCount === 5) {
      toast("Correct guess\nPress here to play again", {
        autoClose: false,
      });
      setActiveWordIndex("zero");
      setActiveLetterIndex("zero");
      return;
    }
  };

  const onOtherLetterPressed = (letter) => {
    setLetter(letter);
    setLettersArray("add");
    setActiveLetterIndex("increase");
  };

  const updateColors = (color, index) => {
    setCurrentBgColor(color);
    setColorsArray(index);
  };
  
  return [letter, onLetterPressed];
};

const colorLetter = (letter, action, arr) => {
  let lettersLeftCpy = arr.map((item, index) => {
    var newItem = item;
    if (item.letter === letter) {
      if (action === "correct") {
        newItem = {
          letter: item.letter,
          color: "bg-emerald-700",
        };
      } else if (action === "wrongPos") {
        if (item.color !== "bg-green-500") {
          newItem = {
            letter: item.letter,
            color: "bg-amber-400",
          };
        }
      } else if (action === "wrong") {
        newItem = {
          letter: item.letter,
          color: "bg-slate-700",
        };
      }
    }
    return newItem;
  });
  return lettersLeftCpy;
};
