import React, { useState } from 'react';
import Game from "./components/Game";
import { RecoilRoot, useRecoilState, useSetRecoilState } from "recoil";

const correctWord = "HELLO";

function App() {

  return (
    <RecoilRoot>
      <Game />
    </RecoilRoot>
  );
}

export default App;
