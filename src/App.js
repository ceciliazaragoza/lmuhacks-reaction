import './App.css'
import { SignIn, SignOut, useAuthentication } from './services/authService.js'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import Timer from './components/timer'
import AnalogClock from './components/AnalogClock'
import VideoCall from './components/VideoCall.js'
import './components/clock.css'

function App() {
  const user = useAuthentication()
  const initial = user?.email?.[0].toUpperCase()
  const toggleSignOut = () => setShowSignOut(!showSignOut)
  const [showSignOut, setShowSignOut] = useState(false)

  useEffect(() => {
    // Whenever the user signs in or out, hide the sign-out button by default
    setShowSignOut(false)
  }, [user])

  return (
    <div className="App">
      <header className="App-header">
        <Timer />
        <div className="auth-container">
          {!user ? (
            <SignIn />
          ) : (
            <>
              <div className="greeting">Hello, {user.displayName || 'User'}</div>
              <div className="avatar" onClick={toggleSignOut} style={{ cursor: 'pointer' }}>
                {initial}
              </div>
              {showSignOut && <SignOut />}
            </>
          )}
        </div>
      </header>
      <div className="clock-container">
        <AnalogClock /> {/* AnalogClock component */}
      </div>
      <VideoCall />
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

export default App
