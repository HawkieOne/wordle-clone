import { LIGHTGREY } from "./data";

// * Creates the initial array for rendering the game area 
const createMatrix = () => {
  const matrix = new Array(5)
    .fill(0)
    .map(() => new Array(5).fill({ letter: "", color: LIGHTGREY }));
  return matrix;
};

// * Use this function to change the index of the words or the letters
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

// * Use this to change the values of the matrix
// ! Can also be used to change the color of the matrix (Used for showing letter status) 
const modifyMatrix = (arr, y, x, action) => {
  if (x === 5) {
    x = 4;
  }
  console.log(action);
  var newArr = arr;
  switch (action.action) {
    case "add":
      if (arr[y][x].letter === "") {
        var word = [...arr[y]];
        var obj = { ...word[x] };
        obj.letter = action.value;
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
      obj = { ...word[action.index] };
      obj.color = action.value;
      console.log(obj);
      word = replaceItemAtIndex([...word], action.index, obj);
      newArr = replaceItemAtIndex([...arr], y, word);
      break;
    case "new":
      newArr = createMatrix();
      break;
    default:
      newArr = arr;
      break;
  }
  // console.log(newArr);
  return newArr;
};

// * Limits a value between 0 and 5 to avoid index out of bounds for the matrix
const limitValue = (val) => {
  return val >= 5 ? 5 : val <= 0 ? 0 : val;
};

const replaceItemAtIndex = (arr, index, newValue) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

const deleteItemAtIndex = (arr, index, newValue) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

const joinLettersToWord = (letters) => {
  var word = "";
  for (var i = 0; i < letters.length; i++) {
    word += letters[i].letter;
  }
  return word;
};

const createArrayABC = (arr) => {
  return arr.split(",").map((item) => {
    return {
      letter: item,
      color: LIGHTGREY,
    };
  });
};

export {
  createMatrix,
  reducer,
  modifyMatrix,
  limitValue,
  replaceItemAtIndex,
  deleteItemAtIndex,
  joinLettersToWord,
  createArrayABC,
};
