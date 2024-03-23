import logo from './logo.svg'
import './App.css'
import { SignIn, SignOut, useAuthentication } from './services/authService.js'
import React, { useEffect, useMemo, useRef, useState } from 'react'
// import Timer from "timer.js";

function App() {
  const user = useAuthentication()
  const initial = user?.email?.[0].toUpperCase()
  const toggleSignOut = () => setShowSignOut(!showSignOut)
  const [showSignOut, setShowSignOut] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
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
    </div>
  )
}

export default App
