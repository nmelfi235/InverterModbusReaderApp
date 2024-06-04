import { useEffect, useState } from "react";

export default function WattnodeGetter() {
  const [selectedDevice, setSelectedDevice] = useState("wattnode");
  const [wattnodeList, setWattnodeList] = useState<{ [key: string]: string }>(
    {}
  );
  const [register, setRegister] = useState(0);
  const [output, setOutput] = useState("");

  useEffect(() => {
    const fetchWattnodeList = async () => {
      const response = await fetch(
        "http://192.168.0.2:1880/wattnodeSlaves"
      ).then((res) => res.json());
      setWattnodeList(response);
    };
    fetchWattnodeList();
  }, []);

  const fetchWattnodeData = async () => {
    const response = await fetch(
      `http://192.168.0.2:1880/WattnodeModbus?address=${register}&device=${selectedDevice}`
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

  return (
    <div className="container my-5">
      <h1 className="mb-3">Wattnode Getter</h1>
      <div className="form-group">
        <label htmlFor="device">Device Serial #: </label>
        <select
          className="form-select"
          value={selectedDevice}
          onChange={handleDeviceChange}
        >
          <option value=""></option>
          {Object.entries(wattnodeList).map(([key, value]) => (
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
        />
      </div>
      <button className="btn btn-primary" onClick={fetchWattnodeData}>
        Submit
      </button>
      <p className="mt-3">{output}</p>
    </div>
  );
}
