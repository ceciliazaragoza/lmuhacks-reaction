import "./App.css";
import { SignIn, SignOut, useAuthentication } from "./services/authService";
import TaskList from  "./components/TaskList";
// import Timer from "timer.js";

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
