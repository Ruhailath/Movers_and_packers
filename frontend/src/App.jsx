import { useState } from "react";

function App() {
  const [message, setMessage] = useState("Hello, World!");

  const changeMessage = () => {
    setMessage("Hello, movers and packers! 🚴");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{message}</h1>
      <button onClick={changeMessage} style={{ padding: "10px", fontSize: "16px" }}>
        Click Me
      </button>
    </div>
  );
}
export default App;