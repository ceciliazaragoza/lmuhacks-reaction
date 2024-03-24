import React from "react";
import TaskList from "./TaskList";

export default function TaskView({ handleDeleteTask, handleUpdateTask, setTaskInput, handleAddTask, taskInput, tasks, closeModal }) {
    console.log(tasks)
    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card custom-modal-content">
                <header className="modal-card-head">
                    <p className="modal-card-title">Task</p>
                </header>
                <section className="modal-card-body">
                    <form onSubmit={e => {
                        e.preventDefault()
                        handleAddTask()
                    }}>
                        <input
                            className="input is-normal"
                            type="text"
                            value={taskInput}
                            onChange={e => setTaskInput(e.target.value)}
                            placeholder="Add a new task"
                            style={{ marginRight: '10px', marginBottom: '10px', width: '10vw' }}
                        />
                        <button type="submit" className="button is-success">Add Task</button>
                    </form>
                    <TaskList tasks={tasks} onDelete={handleDeleteTask} onUpdateTask={handleUpdateTask} />
                </section>
                <footer className="modal-card-foot">
                    <div className="buttons">
                        <button class="button" onClick={closeModal}>Cancel</button>
                    </div>
                </footer>
            </div>
        </div>
    )
}
