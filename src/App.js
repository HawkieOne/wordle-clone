import React from "react";
import Game from "./components/Game";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toggle/style.css" 

function App() {
  return (
    <RecoilRoot>
      <Game />
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
    </RecoilRoot>
  );
}

export default App;
