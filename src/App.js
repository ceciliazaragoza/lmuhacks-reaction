import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import Timer from "./components/timer";
import AnalogClock from './components/AnalogClock';
import "./components/clock.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Timer /> {/* Using Timer component */}
      </header>
      <div className="clock-container">
        <AnalogClock/> {/* AnalogClock component */}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
