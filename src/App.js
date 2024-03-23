
import React, { useState, useEffect } from 'react';
import { auth } from './firebaseConfig';
import { createTask, fetchTasks, deleteTask } from './services/taskService';
import { SignIn, SignOut, useAuthentication } from "./services/authService";
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const user = useAuthentication();

  useEffect(() => {
    if (user) {
      fetchUserTasks();
    }
  }, [user]);

  const fetchUserTasks = async () => {
    console.log("Performing fetching user task")
    console.log("Current user id is ", user.uid)
    const userTasks = await fetchTasks(user.uid);
    console.log("userTask is ", userTasks)
    setTasks(userTasks);
  };

  const handleAddTask = async () => {
    if (!taskInput.trim()) return;
    await createTask({ task: taskInput, author: user.uid, completed: false });
    setTaskInput('');
    console.log("Should perform fetching User Task")
    fetchUserTasks();
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    fetchUserTasks();
  };

  const handleUpdateTask = async (taskId, newTaskDetail) => {
    // Update the UI state with the new task detail
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, task: newTaskDetail };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div>
      <header className="flex">
        {!user ? <SignIn /> : <SignOut />}
      </header>
      <h1>Task List</h1>
      {!user ? (
        <h2> Login to view your tasks</h2>
      ): (
        <div>
          <form onSubmit={(e) => { e.preventDefault(); handleAddTask(); } }>
            <input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Add a new task" />
            <button type="submit">Add Task</button>
          </form>
          <TaskList tasks={tasks} onDelete={handleDeleteTask} onUpdateTask={handleUpdateTask}/>
        </div>
      )}

    </div>
  );
}

export default App;
