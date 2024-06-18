import { useEffect, useState } from "react";
const url = "10.11.0.2";

export default function InverterGetter() {
  const [selectedDevice, setSelectedDevice] = useState("inverter");
  const [inverterList, setInverterList] = useState<{ [key: string]: string }>(
    {}
  );
  const [register, setRegister] = useState(0);
  const [output, setOutput] = useState("");

  useEffect(() => {
    const fetchInverterList = async () => {
      const response = await fetch(`http://${url}:1880/inverterSlaves`).then(
        (res) => res.json()
      );
      setInverterList(response);
    };
    fetchInverterList();
  }, []);

  const fetchInverterData = async () => {
    const response = await fetch(
      `http://${url}:1880/inverterModbus?address=${register}&device=${selectedDevice}`
    ).then((res) => res.json());
    setOutput(response.result);
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
      fetchInverterData();
    }
  };

  return (
    <div className="container my-5">
      <h1 className="mb-3">Inverter Getter</h1>
      <div className="form-group">
        <label htmlFor="device">Device Serial #: </label>
        <select
          className="form-select"
          value={selectedDevice}
          onChange={handleDeviceChange}
        >
          <option value=""></option>
          {Object.entries(inverterList).map(([key, value]) => (
            <option key={key} value={value}>
              {key}
            </option>
          ))}
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
      <button className="btn btn-primary" onClick={fetchInverterData}>
        Submit
      </button>
      <p className="mt-3">{output}</p>
    </div>
  );
}
