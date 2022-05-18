import { atom, selector } from "recoil";
import { createArray, createLetterArr, modifyArray, reducer } from "../shared/common";
import { lettersList } from "../shared/data";

export const currentLetter = atom({
  key: "currentLetter",
  default: null,
});

export const currentWordIndex = atom({
  key: "currentWordIndex",
  default: 0,
});

export const wordIndex = selector({
  key: "wordIndex",
  get: ({ get }) => {
    const index = get(currentWordIndex);
    return index;
  },
  set: ({ set }, action) => {
    // var index = currentWordIndex >= 3 ? 3 : currentWordIndex;
    set(currentWordIndex, (state) => reducer(state, action));
  },
});

export const currentLetterIndex = atom({
  key: "currentLetterIndex",
  default: 0,
});

export const letterIndex = selector({
  key: "letterIndex",
  get: ({ get }) => {
    const index = get(currentLetterIndex);
    return index;
  },
  set: ({ get, set }, action) => {
    set(currentLetterIndex, (state) => reducer(state, action));
  },
});

export const letters = atom({
  key: "letters",
  default: createArray(),
});

export const gussedLetters = selector({
  key: "guessedLetters",
  get: ({ get }) => {
    return get(letters);
  },
  set: ({ get, set }, action) => {
    set(letters, (state) =>
      modifyArray(
        state,
        get(currentWordIndex),
        get(currentLetterIndex),
        get(currentLetter),
        action
      )
    );
  },
});

export const currentBgColor = atom({
  key: "bgcolor",
  default: "bg-slate-500",
});

export const colorLetters = selector({
  key: "colorLetters",
  get: ({ get }) => {
    return get(letters);
  },
  set: ({ get, set }, index) => {
    // console.log(get(currentBgColor));
    set(letters, (state) =>
      modifyArray(
        state,
        get(currentWordIndex),
        index,
        "",
        "color",
        get(currentBgColor)
      )
    );
  },
});

export const lettersLeft = atom({
  key: "lettersLeft",
  default: createLetterArr(lettersList),
});