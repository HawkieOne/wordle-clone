import React from "react";
import {
  QuestionMarkCircleIcon,
  ChartBarIcon,
  CogIcon,
} from "@heroicons/react/solid";
import Popup from "reactjs-popup";
import StatisticsPopup from "./StatisticsPopup";
import HowToPopup from "./HowToPopup";
import SettingsPopup from "./SettingsPopup";

export default function Header() {

  return (
    <div className="flex justify-between items-center p-2 dark:text-white text-accent-dark">
      <div className="flex space-x-2">     
        <Popup position="right center"
          trigger={<QuestionMarkCircleIcon className="w-8 h-8 cursor-pointer" />} modal >
          {(close) => <HowToPopup closeOnEscape={false} closeOnDocumentClick={false} close={close} />}
        </Popup>
      </div>
      <h1 className="text-3xl font-bold">Wordle</h1>
      <div className="flex space-x-2">
       
        <Popup position="right center"
          trigger={<ChartBarIcon className="w-8 h-8 cursor-pointer" />} modal >
          {(close) => <StatisticsPopup closeOnEscape={false} close={close} closeOnDocumentClick={false} showWord={false} />}
        </Popup>
        <Popup position="right center"
          trigger={<CogIcon className="w-8 h-8 cursor-pointer" />} modal nested >
          {(close) => <SettingsPopup closeOnEscape={false} close={close} closeOnDocumentClick={false} showWord={false} />}
        </Popup>        
      </div>
    </div>
  );
}
