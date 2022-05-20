import React from "react";

export default function Letter({ letter, bgcolor }) {
  return (
    <div className="m-2">
      {letter === '' ? (
        <p className="w-14 h-14 flex justify-center items-center 
                        text-4xl font-medium text-white border border-1 border-slate-500"
        >
          {letter}
        </p>
      ) : (
        <p className={`${bgcolor} w-14 h-14 flex justify-center items-center 
                        text-4xl font-medium text-white scale-110
                        transition ease-in-out -translate-y-1`}
        >
          {letter}
        </p>
      )}
    </div>
  );
}
