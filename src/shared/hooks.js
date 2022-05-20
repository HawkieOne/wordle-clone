import { toast } from "react-toastify";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  lettersMatrix,
  letterIndex,
  keyboardLetters,
  wordIndex,
  modifyWordleMatrix,
  isPopupOpen,
} from "../atoms/atoms";
import { DARKGREY, GREEN, YELLOW } from "./data";

const correctWord = "HELLO";

export const useOnKeyDown = (letter) => {
  const [lettersLeft2, setLettersLeft] = useRecoilState(keyboardLetters);
  const [activeWordIndex, setActiveWordIndex] = useRecoilState(wordIndex);
  const [activeLetterIndex, setActiveLetterIndex] = useRecoilState(letterIndex);
  const [lettersArray, setLettersArray] = useRecoilState(modifyWordleMatrix);
  const setIsOpen = useSetRecoilState(isPopupOpen);

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
    setLettersArray({action: "delete", value: 0});
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
        updateColors(DARKGREY, i);
      }
    }
    setActiveWordIndex("increase");
    setActiveLetterIndex("zero");
    setLettersLeft(lettersLeftCpy);

    // If correct guess
    if (correctLetterCount === 5) {
      setIsOpen(true);
      setActiveWordIndex("zero");
      setActiveLetterIndex("zero");
      return;
    }
  };

  const onOtherLetterPressed = (letter) => {
    setLettersArray({action: "add", value: letter});
    setActiveLetterIndex("increase");
  };

  const updateColors = (color, i) => {
    setLettersArray({action: "color", value: color, index: i});
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
          color: GREEN,
        };
      } else if (action === "wrongPos") {
        if (item.color !== "bg-green-500") {
          newItem = {
            letter: item.letter,
            color: YELLOW,
          };
        }
      } else if (action === "wrong") {
        newItem = {
          letter: item.letter,
          color: DARKGREY,
        };
      }
    }
    return newItem;
  });
  return lettersLeftCpy;
};
