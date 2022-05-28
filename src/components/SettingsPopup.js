import React, { useState } from "react";
import Toggle from "react-toggle";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import { useRecoilState, useSetRecoilState } from "recoil";
import { amountOfGuesses, darkMode } from "../atoms/atoms";
import { useLocalStorage } from "../shared/hooks";
import Popup from "reactjs-popup";
import ConfirmPopup from "./ConfirmPopup";

export default function SettingsPopup({ close }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDarkMode, setIsDarkmode] = useRecoilState(darkMode);
  const [daysPlayed, setDaysPlayed] = useLocalStorage("daysPlayed", 0);
  const [daysWon, setDaysWon] = useLocalStorage("daysWon", 0);
  const [maxStreak, setMaxStreak] = useLocalStorage("maxStreak", 0);
  const [currentStreak, setCurrentStreak] = useLocalStorage("currentStreak", 0);
  const setNumberOfGuesses = useSetRecoilState(amountOfGuesses);

  const changeMode = () => {
    setIsDarkmode(isDarkMode === "Light" ? "Dark" : "Light");
  };
  const initialPos = isDarkMode === "Dark" ? true : false;

  const clearStatistics = () => {
    setNumberOfGuesses(0);
    setDaysPlayed(0);
    setDaysWon(0);
    setMaxStreak(0);
    setCurrentStreak(0);
    setIsPopupOpen(false);
  };

  const closeModal = () => {
    setIsPopupOpen(false);
  }

  return (
    <div className="flex flex-col space-y-8 items-start roundex-lg m-4">
      <h1 className="text-xl self-center font-bold">Settings</h1>

      <div className="flex flex-col space-y-2">
        <p className="font-bold">Dark Mode</p>
        <label className="flex items-center space-x-4">
          <Toggle
            defaultChecked={initialPos}
            onChange={changeMode}
            icons={{
              checked: <SunIcon className="text-yellow-500" />,
              unchecked: <MoonIcon className="text-white" />,
            }}
          />
          <span>{isDarkMode === "Light" ? "Dark" : "Light"}</span>
        </label>
      </div>

      <div className="flex flex-col space-y-2">
        <p className="font-bold">Statistics</p>
        <button
          className="bg-slate-700 text-white rounded-lg shadow-lg p-2
               hover:bg-white hover:text-slate-700 self-left"
          onClick={() => setIsPopupOpen(true)}
        >
          Clear statistics
        </button>
      </div>

      <hr className="bg-slate-700 w-5/6 h-0.5" />
      <button
        className="bg-slate-700 text-white rounded-lg shadow-lg p-2
               hover:bg-white hover:text-slate-700 self-center"
        onClick={() => close()}
      >
        Close
      </button>

      <Popup
        position="right center"
        open={isPopupOpen}
        modal
        nested
        onClose={() => setIsPopupOpen(false)}
        style={{width: '100px'}}
      >
        {(close) => (
          <ConfirmPopup close={close} funcYes={clearStatistics} funcNo={closeModal}>
            Do you want to reset the statistics?
          </ConfirmPopup>
        )}
      </Popup>
    </div>
  );
}
