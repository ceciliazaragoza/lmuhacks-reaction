import React from "react";
import TaskList from "./TaskList";

export default function TaskView({ handleDeleteTask, handleUpdateTask, setTaskInput, handleAddTask, taskInput, tasks, closeModal }) {
    console.log(tasks)
    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card custom-modal-content">
                <header class="modal-card-head">
                    <p class="modal-card-title">Task</p>
                    <button class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                    <form onSubmit={e => {
                        e.preventDefault()
                        handleAddTask()
                    }}>
                        <input
                            type="text"
                            value={taskInput}
                            onChange={e => setTaskInput(e.target.value)}
                            placeholder="Add a new task"
                        />
                        <button type="submit" className="button is-success">Add Task</button>
                    </form>
                    <TaskList tasks={tasks} onDelete={handleDeleteTask} onUpdateTask={handleUpdateTask} />
                </section>
                <footer class="modal-card-foot">
                    <div class="buttons">
                        <button class="button" onClick={closeModal}>Cancel</button>
                    </div>
                </footer>
            </div>
            {/* <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button> */}
        </div>
    )
}
