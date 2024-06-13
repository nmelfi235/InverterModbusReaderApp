export default function Instructions() {
  return (
    <div className="container my-5 p-4 border rounded shadow-sm">
      <h1 className="mb-3">Instructions</h1>
      <p className="lead">
        This app contains two tools for reading Modbus registers of a Cadenza
        BESS. The <b>Inverter Getter</b> and <b>Wattnode Getter</b> are two
        tools that can be used to get data from a Conext XW Inverter and a
        Wattnode device. The instructions are as follows:
      </p>
      <ol className="list-unstyled">
        <li className="mb-2">
          Wait about one minute for the list of devices to load.
        </li>
        <li className="mb-2">
          Use the dropdown menu to select the Serial Number of the device you
          want to read from.
        </li>
        <li className="mb-2">
          Use the <b>Register</b> field to select the register you want to read
          from.
        </li>
        <li className="mb-2">
          Click the <b>Submit</b> button to get the data from the device.
        </li>
      </ol>
    </div>
  );
}
