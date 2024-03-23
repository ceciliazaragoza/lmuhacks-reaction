import "./App.css";
<<<<<<< HEAD
import { SignIn, SignOut, useAuthentication } from "./services/authService";
import TaskList from  "./components/TaskList";
=======
import { SignIn, SignOut, useAuthentication } from "./services/authService.js";
import React, { useEffect, useMemo, useRef, useState } from "react";
// import Timer from "timer.js";
>>>>>>> raihana

function App() {
  const user = useAuthentication();

  return (
    <div className="App">
      <header>
        <span>pomodoro app</span>
        {!user ? <SignIn /> : <SignOut />}
        <TaskList />
      </header>
    </div>
  );
}

export default App;
