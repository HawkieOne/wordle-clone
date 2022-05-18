import { GREEN, lettersList, LIGHTGREY, YELLOW } from "./data";
import React, { useState } from 'react';

const reducer = (value, action) => {
  switch (action) {
    case "increase":
      value = limitValue((value += 1));
      break;
    case "decrease":
      value = limitValue((value -= 1));
      break;
    case "zero":
      value = 0;
      break;
    default:
      break;
  }
  // console.log(value + " " + action);
  return value;
};

const modifyArray = (arr, y, x, value, action, color = "slate") => {
  if (x === 5) {
    x = 4;
  }
  var newArr = arr;
  switch (action) {
    case "add":
      if (arr[y][x].letter === "") {
        var word = [...arr[y]];
        var obj = { ...word[x] };
        obj.letter = value;
        word = replaceItemAtIndex([...word], x, obj);
        newArr = replaceItemAtIndex([...arr], y, word);
      }
      break;
    case "delete":
      word = [...arr[y]];
      obj = { ...word[x] };
      obj.letter = "";
      word = deleteItemAtIndex([...word], x, obj);
      newArr = deleteItemAtIndex([...arr], y, word);
      break;
    case "color":
      word = [...arr[y]];
      obj = { ...word[x] };
      obj.color = color;
      word = deleteItemAtIndex([...word], x, obj);
      newArr = deleteItemAtIndex([...arr], y, word);
      break;
    case "new":
      newArr = createArray();
      break;
    default:
      newArr = arr;
      break;
  }
  // console.log(newArr);
  return newArr;
};

const limitValue = (val) => {
  return val >= 5 ? 5 : val <= 0 ? 0 : val;
};

const replaceItemAtIndex = (arr, index, newValue) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

const deleteItemAtIndex = (arr, index, newValue) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

const createArray = () => {
  const matrix = new Array(5)
    .fill(0)
    .map(() => new Array(5).fill({ letter: "", color: "bg-slate-500" }));
  // console.log(matrix);
  return matrix;
};

const joinLettersToWord = (letters) => {
  var word = "";
  for (var i = 0; i < letters.length; i++) {
    word += letters[i].letter;
  }
  return word;
};

export {
  createArray,
  reducer,
  modifyArray,
  limitValue,
  replaceItemAtIndex,
  deleteItemAtIndex,
  joinLettersToWord,
};

export const onBackspace = (func1, func2) => {
  func1("decrease");
  func2("delete");
};

export const onLetterPress = (
  correctWord,
  lettersArray,
  activeWordIndex,
  setCurrentBgColor,
  setColorsArray,
  toast,
  setActiveWordIndex,
  setActiveLetterIndex,
  lettersLeft,
  setLettersLeft
) => {
  var correctLetterCount = 0;
  let lettersLeftCpy = lettersLeft.slice();
  for (var i = 0; i < correctWord.length; i++) {
    const letter = lettersArray[activeWordIndex][i].letter;
    const correctLetter = correctWord[i];
    if (letter === correctLetter) {
      setCurrentBgColor(GREEN);
      lettersLeftCpy = colorLetter(letter, "correct", lettersLeftCpy);
      setColorsArray(i);
      correctLetterCount++;      
    } else if (correctWord.indexOf(letter) > -1) {
      lettersLeftCpy = colorLetter(letter, "wrongPos", lettersLeftCpy);
      setCurrentBgColor(YELLOW);
      setColorsArray(i);
    } else {
      lettersLeftCpy = colorLetter(letter, "wrong", lettersLeftCpy);
      setCurrentBgColor(LIGHTGREY);
      setColorsArray(i);
    }
    console.log(lettersLeftCpy);
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
    // setLetterToReg("");
  }
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

export const createLetterArr = (arr) => {
  return arr.split(",").map((item, index) => {
    return ({
      letter: item,
      color: 'bg-slate-500'
    })
  });
};
