import { atom, selector } from "recoil";

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

const createArray = () => {
  const matrix = new Array(5)
    .fill(0)
    .map(() => new Array(5).fill({ letter: "", color: "slate" }));
  console.log(matrix);
  return matrix;
};

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

export const colorLetters = selector({
  key: "colorLetters",
  get: ({ get }) => {
    return get(letters);
  },
  set: ({ get, set }, index) => {
    set(letters, (state) =>
      modifyArray(state, get(currentWordIndex), index, "", "color")
    );
  },
});

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
  console.log(value);
  return value;
};

const modifyArray = (arr, y, x, value, action) => {
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
        console.log("color");
      break;
    default:
      newArr = arr;
      break;
  }
  console.log(newArr);
  return newArr;
};

const limitValue = (val) => {
  return val >= 4 ? 4 : val <= 0 ? 0 : val;
};

const replaceItemAtIndex = (arr, index, newValue) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

const deleteItemAtIndex = (arr, index, newValue) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};
