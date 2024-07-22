import { useEffect, useState } from "react";
const url = "100.118.246.100";

export default function GatewayGetter() {
  const [selectedPort, setSelectedPort] = useState("503");
  const [selectedDevice, setSelectedDevice] = useState("gateway");
  const [gatewayList, setGatewayList] = useState<{ [key: string]: string }>({});
  const [register, setRegister] = useState(0);
  const [output, setOutput] = useState("");

  useEffect(() => {
    const fetchGatewayList = async () => {
      const response = await fetch(`http://${url}:1880/gatewaySlaves`).then(
        (res) => res.json()
      );
      setGatewayList(response);
    };
    fetchGatewayList();
  }, []);

  const fetchGatewayData = async () => {
    const response = await fetch(
      `http://${url}:1880/gatewayModbus?address=${register}&device=${selectedDevice}&port=${selectedPort}`
    ).then((res) => res.json());
    setOutput(response.result);
  };

  const handlePortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPort(event.target.value);
    console.log(event.target.value);
  };

  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDevice(event.target.value);
    console.log(event.target.value);
  };

  const handleRegisterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegister(Number(event.target.value));
  };

  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchGatewayData();
    }
  };

  return (
    <div className="container my-5">
      <h1 className="mb-3">Gateway Getter</h1>
      <div className="form-group">
        <label htmlFor="device">Device Serial #: </label>
        <select
          className="form-select"
          value={selectedDevice}
          onChange={handleDeviceChange}
        >
          <option value=""></option>
          {Object.entries(gatewayList).map(([key, value]) => (
            <option key={key} value={value}>
              {key}
            </option>
          ))}
        </select>
        <label htmlFor="port">Port: </label>
        <select
          className="form-select"
          value={selectedPort}
          onChange={handlePortChange}
        >
          <option key="" value=""></option>
          <option key="502" value="502">
            502
          </option>
          <option key="503" value="503">
            503
          </option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="register">Register: </label>
        <input
          type="number"
          className="form-control"
          value={register}
          onChange={handleRegisterChange}
          onKeyDown={handleSubmit}
        />
      </div>
      <button className="btn btn-primary" onClick={fetchGatewayData}>
        Submit
      </button>
      <p className="mt-3">{output}</p>
    </div>
  );
}
