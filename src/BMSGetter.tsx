import { useEffect, useState } from "react";
const url = "100.118.246.100";

export default function BMSGetter() {
  const [register, setRegister] = useState(0);
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("slave-id");
  const [selectedDevice, setSelectedDevice] = useState("bms");
  const [all, setAll] = useState(false);

  const fetchBmsData = async () => {
    if (!all) {
      const response = await fetch(
        `http://${url}:1880/BMSModbus?address=${register}&device=${selectedDevice}`
      ).then((res) => res.json());
      setOutput(response.result);
    } else {
      let totalOutput = "";
      for (const [key, value] of Object.entries(bmsList)) {
        const response = await fetch(
          `http://${url}:1880/BMSModbus?address=${register}&device=${selectedDevice}`
        ).then((res) => res.json());
        totalOutput += `${key}: ${response.result}\n`;
      }
      setOutput(totalOutput);
    }
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

  const handleAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAll(event.target.checked);
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
            <input type="checkbox" onChange={handleAllChange} />
            <label htmlFor="all">All Devices</label>
            <p className="mt-3">{output}</p>
          </>
        ) : (
          <>
            <label>Device Serial #: </label>
            <BmsList />
          </>
        )}
      </div>
    </div>
  );
}

function BmsList() {
  const [register, setRegister] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState("bms");
  const [output, setOutput] = useState("");
  const [bmsList, setBmsList] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchBmsList = async () => {
      const response = await fetch(`http://${url}:1880/bmsSlaves`).then((res) =>
        res.json()
      );
      setBmsList(response);
    };
    fetchBmsList();
  }, []);

  const fetchBmsData = async () => {
    const response = await fetch(
      `http://${url}:1880/BMSModbus?address=${register}&device=${selectedDevice}`
    ).then((res) => res.json());
    setOutput(response.result);
  };

  const handleRegisterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegister(Number(event.target.value));
  };

  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDevice(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchBmsData();
    }
  };

  return (
    <>
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
    </>
  );
}
