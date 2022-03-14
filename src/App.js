import Header from "./components/Header";
import Game from "./components/Game";
import Keyboard from "./components/Keyboard";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div className="h-full bg-slate-600 flex flex-col divide-y divide-slate-900">
        <Header />
        <Game />
        <Keyboard />
      </div>
    </RecoilRoot>
  );
}

export default App;
