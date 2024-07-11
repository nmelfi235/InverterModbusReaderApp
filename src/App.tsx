import "./App.css";
import BMSGetter from "./BMSGetter";
import GatewayGetter from "./GatewayGetter";
import Instructions from "./Instructions";
import InverterGetter from "./InverterGetter";
import WattnodeGetter from "./WattnodeGetter";

function App() {
  return (
    <>
      <h1>Cadenza BESS: Modbus Tool</h1>
      <Instructions />
      <GatewayGetter />
      <InverterGetter />
      <BMSGetter />
      <WattnodeGetter />
    </>
  );
}

export default App;
