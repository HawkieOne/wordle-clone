import { BackspaceIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { useOnKeyDown } from "../shared/hooks";

export default function KeyboardLetter({ letter }) {

  const [letter2, onKeyDown] = useOnKeyDown(letter);

  const onClick = () => {
    onKeyDown(letter.letter);
  }

  return (
    <div className={`cursor-pointer text-white ${letter.color} p-3 text-2xl rounded-sm
                    flex justify-center items-center hover:mix-blend-hard-light `}
          onClick={onClick}>
      {letter.letter === "BACKSPACE" ? (
        <BackspaceIcon className="w-10 h-10 cursor-pointer" />
      ) : (
        letter.letter
      )}
    </div>
  );
}
