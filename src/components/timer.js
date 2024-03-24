import React, { useState, useEffect } from 'react';

function Timer( {user, openTaskModal} ) {
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [focusSeconds, setFocusSeconds] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [breakSeconds, setBreakSeconds] = useState(0);
<<<<<<< HEAD
  const [showModal, setShowModal] = useState(false)
=======
  
>>>>>>> maika-1
  const [isActive, setIsActive] = useState(false);
  const [isFocusTimer, setIsFocusTimer] = useState(true); // Track if it's focus timer or break timer

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (isFocusTimer) {
          if (focusSeconds === 0) {
            if (focusMinutes === 0) {
              clearInterval(interval);
              alert('Focus time is up! Take a break.');
              setIsFocusTimer(false); // Switch to break timer
              setBreakMinutes(5); // Reset break timer
              setBreakSeconds(0);
            } else {
              setFocusMinutes(minutes => minutes - 1);
              setFocusSeconds(59);
            }
          } else {
            setFocusSeconds(seconds => seconds - 1);
          }
        } else {
          if (breakSeconds === 0) {
            if (breakMinutes === 0) {
              clearInterval(interval);
              alert('Break time is up! Back to focus time.');
              setIsFocusTimer(true); // Switch to focus timer
              setFocusMinutes(25); // Reset focus timer
              setFocusSeconds(0);
            } else {
              setBreakMinutes(minutes => minutes - 1);
              setBreakSeconds(59);
            }
          } else {
            setBreakSeconds(seconds => seconds - 1);
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, isFocusTimer, focusMinutes, focusSeconds, breakMinutes, breakSeconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsFocusTimer(true);
    setFocusMinutes(25);
    setFocusSeconds(0);
    setBreakMinutes(5);
    setBreakSeconds(0);
  };

  const openSettings = () => {
    const newWindow = window.open('', 'Timer Settings', 'width=300,height=200');
    if (newWindow) {
      newWindow.document.body.innerHTML = `
        <h2>Timer Settings</h2>
        <label>Focus Minutes: </label>
        <input type="number" value="${focusMinutes}" id="focusMinutesInput" />
        <br />
        <label>Break Minutes: </label>
        <input type="number" value="${breakMinutes}" id="breakMinutesInput" />
        <br />
        <button id="saveBtn">Save</button>
        <button onclick="window.close()">Close</button>
      `;

      newWindow.document.getElementById('saveBtn').addEventListener('click', () => {
        const newFocusMinutes = parseInt(newWindow.document.getElementById('focusMinutesInput').value);
        const newBreakMinutes = parseInt(newWindow.document.getElementById('breakMinutesInput').value);
        if (!isNaN(newFocusMinutes)) {
          setFocusMinutes(newFocusMinutes);
        }
        if (!isNaN(newBreakMinutes)) {
          setBreakMinutes(newBreakMinutes);
        }
        newWindow.close();
      });
    } else {
      alert('Please allow pop-ups for this site to open the settings window.');
    }
  };

  const openTask = () => {
    if (!user) {
      alert("You need to log in to view tasks or add task!")
    } else {
      openTaskModal(true)
    }
  }

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="card">
            <div className="card-content">
              <div className="content">
                <h1>
                  {isFocusTimer ? 'Focus Time Remaining' : 'Break Time Remaining'}:{' '}
                  {isFocusTimer
                    ? focusMinutes < 10
                      ? `0${focusMinutes}`
                      : focusMinutes
                    : breakMinutes < 10
                    ? `0${breakMinutes}`
                    : breakMinutes}
                  :
                  {isFocusTimer
                    ? focusSeconds < 10
                      ? `0${focusSeconds}`
                      : focusSeconds
                    : breakSeconds < 10
                    ? `0${breakSeconds}`
                    : breakSeconds}
                </h1>
                <div className="buttons is-centered">
<<<<<<< HEAD
                  <button className="button is-primary" onClick={openSettings}>
                    Settings
                  </button>
                  <button className={`button ${isActive ? 'is-danger' : 'is-success'}`} onClick={toggleTimer}>
                    {isActive ? 'Stop' : 'Start'}
                  </button>
                  <button className="button is-primary" onClick={() => setShowModal(true)}>
                    Task List
                  </button>
=======
                  <button className="button is-primary" onClick={openSettings}>Settings</button>
                  <button className={`button ${isActive ? 'is-danger' : 'is-success'}`} onClick={toggleTimer}>{isActive ? 'Stop' : 'Start'}</button>
                  <button className="button is-info" onClick={resetTimer}>Reset</button>
                  <button className="button is-info" onClick={openTask}>Tasks</button>
>>>>>>> maika-1
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Timer;
