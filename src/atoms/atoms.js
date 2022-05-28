import { atom, selector } from "recoil";
import {
  createArrayABC,
  createMatrix,
  getRandomWord,
  modifyMatrix,
  reducer,
} from "../shared/common";
import { lettersList } from "../shared/data";

export const wordIndex = selector({
  key: "wordIndex",
  get: ({ get }) => {
    const index = get(currentWordIndex);
    return index;
  },
  set: ({ set }, action) => {
    set(currentWordIndex, (state) => reducer(state, action));
  },
});

export const currentWordIndex = atom({
  key: "currentWordIndex",
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

export const currentLetterIndex = atom({
  key: "currentLetterIndex",
  default: 0,
});

export const wordleMatrix = atom({
  key: "wordleMatrix",
  default: createMatrix(),
});

export const modifyWordleMatrix = selector({
  key: "lettersMatrix",
  get: ({ get }) => {
    return get(wordleMatrix);
  },
  set: ({ get, set }, action) => {
    set(wordleMatrix, (state) =>
      modifyMatrix(
        state,
        get(currentWordIndex),
        get(currentLetterIndex),
        action
      )
    );
  },
});

export const keyboardLetters = atom({
  key: "keyboardLetters",
  default: createArrayABC(lettersList),
});

export const isPopupOpen = atom({
  key: "isPopupOpen",
  default: false,
});

export const amountOfGuesses = atom({
  key:"amountofGuesses",
  default: 0
})

export const wordOfTheGame = atom({
  key: "wordOfTheGame",
  default: "HELLO",
})

export const doesWordExist = atom({
  key: "doesWordExist",
  default: true,
})

export const animateMissingLetter = atom({
  key: "animateMissingLetter",
  default: false,
})

export const hasWonGame = atom({
  key: "hasWonGame",
  default: false,
})

export const darkMode = atom({
  key: "darkMode",
  default: "Dark",
})