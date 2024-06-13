import { useEffect, useState } from "react";

export default function BMSGetter() {
  const [register, setRegister] = useState(0);
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("slave-id");
  const [selectedDevice, setSelectedDevice] = useState("bms");

  const fetchBmsData = async () => {
    const response = await fetch(
      `http://192.168.0.2:1880/bmsModbus?address=${register}&device=${selectedDevice}`
    ).then((res) => res.json());
    setOutput(response.result);
  };

  const handleRegisterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegister(Number(event.target.value));
  };

  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(String(event.target.value));
  };

  const handleDeviceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDevice(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchBmsData();
    }
  };

  return (
    <div className="container my-5">
      <h1 className="mb-3">BMS Getter</h1>
      <div className="form-group">
        <div id="mode-choices">
          <h3 style={{ margin: 0 }}>Mode: </h3>
          <label htmlFor="slave-id-mode">Slave ID</label>
          <input
            type="radio"
            id="slave-id-mode"
            value="slave-id"
            name="mode"
            onChange={handleModeChange}
          />
          <label htmlFor="device-serial-mode">Device Serial No.</label>
          <input
            type="radio"
            id="device-serial-mode"
            value="device-serial"
            name="mode"
            onChange={handleModeChange}
          />
        </div>
        {mode === "slave-id" ? (
          <>
            <label>Slave ID: </label>
            <input
              type="number"
              className="form-control"
              value={selectedDevice}
              onChange={handleDeviceChange}
              onKeyDown={handleSubmit}
            />
          </>
        ) : (
          <>
            <label>Device Serial #: </label>
            <BmsList />
          </>
        )}
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
      <button className="btn btn-primary" onClick={fetchBmsData}>
        Submit
      </button>
      <p className="mt-3">{output}</p>
    </div>
  );
}

function BmsList() {
  const [selectedDevice, setSelectedDevice] = useState("bms");
  const [bmsList, setBmsList] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchBmsList = async () => {
      const response = await fetch("http://192.168.0.2:1880/bmsSlaves").then(
        (res) => res.json()
      );
      setBmsList(response);
    };
    fetchBmsList();
  }, []);

  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDevice(event.target.value);
    console.log(event.target.value);
  };

  return (
    <select
      className="form-select"
      value={selectedDevice}
      onChange={handleDeviceChange}
    >
      <option value=""></option>
      {Object.entries(bmsList).map(([key, value]) => (
        <option key={key} value={value}>
          {key}
        </option>
      ))}
    </select>
  );
}
