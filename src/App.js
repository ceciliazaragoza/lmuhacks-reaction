import logo from "./logo.svg";
import "./App.css";
import { SignIn, SignOut, useAuthentication } from "./services/authService";
import Timer from "./timer";

function App() {
  const user = useAuthentication()

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
