import React from "react";

export default function ConfirmPopup({ children, close, funcYes, funcNo }) {
  const onYesPress = () => {
    funcYes();
    close();
  };

  const onNoPress = () => {
    funcNo();
    close();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-xl font-bold">WARNING</h1>
      <p>{children}</p>
      <div className="flex space-x-4">
        <button
          className="bg-slate-700 text-white rounded-lg shadow-lg p-2
               hover:bg-white hover:text-slate-700 self-left"
          onClick={onYesPress}
        >
          Yes
        </button>
        <button
          className="bg-slate-700 text-white rounded-lg shadow-lg p-2
               hover:bg-white hover:text-slate-700 self-left"
          onClick={onNoPress}
        >
          No
        </button>
      </div>
    </div>
  );
}
