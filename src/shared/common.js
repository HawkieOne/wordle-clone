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

  const modifyArray = (arr, y, x, value, action, color = "slate") => {
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

  const createArray = () => {
    const matrix = new Array(5)
      .fill(0)
      .map(() => new Array(5).fill({ letter: "", color: "bg-slate-500" }));
    console.log(matrix);
    return matrix;
  };

  const joinLettersToWord = (letters) => {
    var word = "";
    for (var i = 0; i < letters.length; i++) {
      word += letters[i].letter;
    }
    return word;
  };

  export  {
    createArray,
    reducer,
    modifyArray,
    limitValue,
    replaceItemAtIndex,
    deleteItemAtIndex,
    joinLettersToWord
  };