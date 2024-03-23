import logo from "./logo.svg";
import "./App.css";
import { SignIn, SignOut, useAuthentication } from "./services/authService.js";
import React, { useEffect, useMemo, useRef, useState } from "react";
// import Timer from "timer.js";

function App() {
  const user = useAuthentication();

  return (
    <div className="App">
      <header>
        <span>pomodoro app</span>
        {!user ? <SignIn /> : <SignOut />}
      </header>
    </div>
  );
}

export default App;
