// import logo from "./logo.svg";
// import "./App.css";
import { SignIn, SignOut, useAuthentication } from "./services/authService.js";
import VideoCall from "./components/VideoCall.js";
// import Timer from "./timer";

function App() {
  const user = useAuthentication();

  return (
    <div className="App">
      <header>
        <span>pomodoro app</span>
        <VideoCall />
        {!user ? <SignIn /> : <SignOut />}
      </header>
    </div>
  );
}

export default App;
