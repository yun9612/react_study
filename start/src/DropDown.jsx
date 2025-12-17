import { useState } from "react";

function DropDown() {
  // default
  const [color, setColor] = useState("red");

  // html
  return (
    <div className="content">
      <h1>Select your favorite color</h1>
      <select onChange={(e) => setColor(e.target.value)} value={color}>
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="yellow">Yellow</option>
      </select>
      <p>
        Your favorite color is <strong style={{ color }}>{color}</strong>
      </p>
    </div>
  );
}
export default DropDown;
