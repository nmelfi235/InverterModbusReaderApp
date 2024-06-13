import "./App.css";
import BMSGetter from "./BMSGetter";
import Instructions from "./Instructions";
import InverterGetter from "./InverterGetter";
import WattnodeGetter from "./WattnodeGetter";

function App() {
  return (
    <>
      <Instructions />
      <InverterGetter />
      <BMSGetter />
      <WattnodeGetter />
    </>
  );
}

export default App;
