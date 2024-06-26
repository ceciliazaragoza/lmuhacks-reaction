import React from "react";
import TaskList from "./TaskList";

export default function TaskView({ handleDeleteTask, handleUpdateTask, handleUpdateCompleteness, setTaskInput, handleAddTask, taskInput, tasks, closeModal }) {
    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card custom-modal-content">
                <header class="modal-card-head">
                    <p class="modal-card-title">Task</p>
                    <button class="delete" aria-label="close" onClick={closeModal}></button>
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
                    <TaskList tasks={tasks} onDelete={handleDeleteTask} onUpdateTask={handleUpdateTask} onUpdateCompleteness={handleUpdateCompleteness}/>
                </section>
                <footer className="modal-card-foot">
                </footer>
            </div>
        </div>
    )
}
