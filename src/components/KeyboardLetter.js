import { BackspaceIcon } from "@heroicons/react/solid";
import React from "react";
import { useRecoilValue } from "recoil";
import { wordOfTheGame } from "../atoms/atoms";
import { useOnKeyDown } from "../shared/hooks";

export default function KeyboardLetter({ letter }) {

  const [letter2, onKeyDown] = useOnKeyDown(letter);
  const word = useRecoilValue(wordOfTheGame);

  const onClick = () => {
    onKeyDown(letter.letter, word);
  }

  return (
    <div className={`cursor-pointer text-white ${letter.color} py-4 px-2 lg:p-3 text-md lg:text-2xl rounded-sm
                    flex justify-center items-center hover:mix-blend-hard-light`}
          onClick={onClick}>
      {letter.letter === "BACKSPACE" ? (
        <BackspaceIcon className="w-8 h-8 md:w-10 md:h-10 cursor-pointer" />
      ) : (
        <p className="text-md md:text-xl">{letter.letter}</p>
      )}
    </div>
  );
}
