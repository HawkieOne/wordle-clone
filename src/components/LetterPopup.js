import React from "react";

export default function LetterPopup({ letter, bgColor }) {
    
  return (
    <p
      className={`${bgColor} w-8 h-8 md:w-10 md:h-10 flex justify-center items-center p-1 
                text-xl md:text-2xl lg:text-4xl font-medium border border-1 border-black
                ${bgColor === 'bg-white' ? 'text-black' : 'text-white'}
                ${bgColor === 'bg-white' ? 'border-1' : 'border-0'}`}
    >
      {letter}
    </p>
  );
}
