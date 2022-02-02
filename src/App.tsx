import React, { useState } from "react";
import { Robot } from "./robot";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  function initializeRobot(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const robot = new Robot(input);
    if (robot.errMessage) {
    }
    setOutput(robot.errMessage ? robot.errMessage : robot.report());
  }

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <h2>Input</h2>
      <form onSubmit={initializeRobot}>
        <textarea
          name="input"
          style={{
            resize: "none",
            height: "400px",
            width: "100%",
            fontSize: "20px",
            fontFamily: "sans-serif",
          }}
          placeholder={"PLACE 0,0,NORTH\nMOVE\nREPORT"}
          onChange={(e) => setInput(e.target.value)}
          value={input}
        ></textarea>
        <input type="submit" value="Submit" />
      </form>
      <h2>Output</h2>
      <h1>{output}</h1>
    </div>
  );
}

export default App;
