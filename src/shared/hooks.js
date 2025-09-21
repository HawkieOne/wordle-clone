import { toast } from "react-toastify";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  letterIndex,
  keyboardLetters,
  wordIndex,
  modifyWordleMatrix,
  isPopupOpen,
  amountOfGuesses,
  doesWordExist,
  animateMissingLetter,
  hasWonGame,
} from "../atoms/atoms";
import { DARKGREY, GREEN, YELLOW } from "./data";
import { joinLettersToWord } from "./common";
import wordsArray from 'an-array-of-english-words';

export const useOnKeyDown = (letter, word) => {
  const [lettersLeft2, setLettersLeft] = useRecoilState(keyboardLetters);
  const [activeWordIndex, setActiveWordIndex] = useRecoilState(wordIndex);
  const [activeLetterIndex, setActiveLetterIndex] = useRecoilState(letterIndex);
  const [lettersArray, setLettersArray] = useRecoilState(modifyWordleMatrix);
  const setWordExist = useSetRecoilState(doesWordExist);
  const setAnimateMissingLetter = useSetRecoilState(animateMissingLetter);
  const setIsOpen = useSetRecoilState(isPopupOpen);
  const setVictory = useSetRecoilState(hasWonGame);

  const increasesNumberOfGuesses = useSetRecoilState(amountOfGuesses);

  const setDaysPlayed = useLocalStorage("daysPlayed", 0)[1];
  const setDaysWon = useLocalStorage("daysWon", 0)[1];
  const [maxStreak, setMaxStreak] = useLocalStorage("maxStreak", 0);
  const [currentStreak, setCurrentStreak] = useLocalStorage("currentStreak", 0);

  const onLetterPressed = (letter, correctWord) => {
    switch (letter) {
      case "BACKSPACE":
        onBackspacePressed(letter);
        break;
      case "ENTER":
        onEnterPressed(letter, correctWord);
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

  const onEnterPressed = (letter, correctWord) => {    
    if (activeLetterIndex !== 5) {
      // toast.error("Not enough letters");
      setAnimateMissingLetter(true);
      // Resets the anmation boolean
      setTimeout(() => {
        setAnimateMissingLetter(false);
      }, 1000);
      return;
    }

    increasesNumberOfGuesses(prev => prev + 1);

    // Checks if the word exists
    let isAWord = false;
    wordsArray.forEach((word) => {
      const writtenWord = joinLettersToWord(lettersArray[activeWordIndex]).toLowerCase();
      if (word === writtenWord) {
        isAWord = true;
      }
    })
    if (!isAWord) {
      setWordExist(false);
      toast.error("Not a word");
      // Resets the anmation boolean
      setTimeout(() => {
        setWordExist(true);
      }, 1000);
      return;
    }

    var correctLetterCount = 0;
    let lettersLeftCpy = lettersLeft2.slice();
    let correctWordCpy = correctWord.slice().split("");
    for (var i = 0; i < correctWord.length; i++) {
      const letter = lettersArray[activeWordIndex][i].letter;
      const correctLetter = correctWord[i];
      if (letter === correctLetter && correctWordCpy.includes(letter)) {
        correctWordCpy.splice(correctWordCpy.indexOf(letter), 1);
        lettersLeftCpy = colorLetter(letter, "correct", lettersLeftCpy);
        updateColors(GREEN, i);
        correctLetterCount++;
      } else if (correctWord.indexOf(letter) > -1 && correctWordCpy.includes(letter)) {
        correctWordCpy.splice(correctWordCpy.indexOf(letter), 1);
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
      setDaysPlayed(prev => prev + 1);
      setDaysWon(prev => prev + 1);
      setCurrentStreak(prev => prev + 1);
      if (currentStreak + 1 >= maxStreak) {
        setMaxStreak(currentStreak + 1);
      }
      setTimeout(() => {
        setIsOpen(true);
      }, 500)
      setActiveWordIndex("zero");
      setActiveLetterIndex("zero");
      setVictory(true);
      return;
    }

    // If user could not guess the word index
    if (activeWordIndex >= 4) {
      setDaysPlayed(prev => prev + 1);
      setCurrentStreak(0);
      setTimeout(() => {
        setIsOpen(true);
      }, 500)
      setVictory(true);
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





// -----------------------------------
// ----------  LOCAL STORAGE ---------
// -----------------------------------

export function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
