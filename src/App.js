import './App.css'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Timer from './components/timer'
import AnalogClock from './components/AnalogClock'
import VideoCall from './components/VideoCall.js'
import './components/clock.css'
import { createTask, fetchTasks, deleteTask } from './services/taskService'
import { SignIn, SignOut, useAuthentication } from './services/authService'
import TaskView from './components/TaskViewer'

function App() {
  const [tasks, setTasks] = useState([])
  const [taskInput, setTaskInput] = useState('')
  const user = useAuthentication()
  const initial = user?.email?.[0].toUpperCase()
  const toggleSignOut = () => setShowSignOut(!showSignOut)
  const [showSignOut, setShowSignOut] = useState(false)
  const [isClockMinimized, setIsClockMinimized] = useState(false)
  const [openTaskModal, setOpenTaskModal] = useState(false)

  useEffect(() => {
    if (user) {
      fetchUserTasks()
    }
  }, [user])

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeMinimized = window.scrollY > 150
      setIsClockMinimized(shouldBeMinimized)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fetchUserTasks = async () => {
    console.log('Performing fetching user task')
    console.log('Current user id is ', user.uid)
    const userTasks = await fetchTasks(user.uid)
    console.log('userTask is ', userTasks)
    setTasks(userTasks)
    console.log('Tasks', tasks)
  }

  const handleAddTask = async () => {
    if (!taskInput.trim()) return
    await createTask({ task: taskInput, author: user.uid, completed: false })
    setTaskInput('')
    fetchUserTasks()
  }

  const handleDeleteTask = async taskId => {
    await deleteTask(taskId)
    fetchUserTasks()
  }

  const handleUpdateTask = async (taskId, newTaskDetail) => {
    // Update the UI state with the new task detail
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, task: newTaskDetail }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  const handleUpdateCompleteness = async (taskId, newCompleteness) => {
    console.log('The current completeness data', newCompleteness)
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: newCompleteness }
      }
      console.log('Task that is updated ', task)
      return task
    })
    setTasks(updatedTasks)
  }

  const closeModal = () => {
    setOpenTaskModal(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <Timer user={user} openTaskModal={setOpenTaskModal} />
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
      <div className={`clock-container ${isClockMinimized ? 'minimized-clock' : ''}`}>
        <AnalogClock />
      </div>
      <div>
        {!user ? (
          <h2> Login to view your tasks</h2>
        ) : openTaskModal && (
            <TaskView
              handleDeleteTask={handleDeleteTask}
              handleUpdateTask={handleUpdateTask}
              handleUpdateCompleteness={handleUpdateCompleteness}
              setTaskInput={setTaskInput}
              handleAddTask={handleAddTask}
              taskInput={taskInput}
              tasks={tasks}
              closeModal={closeModal}
            />
          )}
      </div>
      <VideoCall />
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

export default App
