import React, { useState } from 'react'
import { updateTaskDetail, updateTaskCompleteness } from '../services/taskService'

function TaskItem({ task, onDelete, onUpdateTask, onUpdateCompleteness }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTaskDetail, setEditedTaskDetail] = useState(task.task)

  const handleEdit = async () => {
    try {
      await updateTaskDetail(task.id, editedTaskDetail)
      setIsEditing(false)
      onUpdateTask(task.id, editedTaskDetail) // Update UI state
    } catch (error) {
      console.error('Error updating task detail:', error)
    }
  }

  const handleToggleCompleteness = async () => {
    try {
      const isCompleted = !task.completed
      await updateTaskCompleteness(task.id, isCompleted)
      onUpdateCompleteness(task.id, isCompleted) // Update UI state
      console.log(task)
    } catch (error) {
      console.error('Error toggling task completeness:', error)
    }
  }

  return (
    <li>
      {isEditing ? (
        <>
          <input
            className="input is-normal"
            type="text"
            value={editedTaskDetail}
            onChange={(e) => setEditedTaskDetail(e.target.value)}
            style={{ marginRight: '10px', marginBottom: '10px', width: '10vw' }}
          />
          <button className="button is-primary" onClick={handleEdit}>Save</button>
        </>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center'}}>
           <span style={{ textDecoration: task.completed ? 'line-through' : 'none', flex: '1'}}>
            {task.task}
          </span>
          <button className={`button is-info`} onClick={handleToggleCompleteness} style={{ marginRight: '10px', marginBottom: '10px' }}>
            {task.completed ? 'Not Complete' : 'Complete'}
          </button>
          <button className="button is-danger" onClick={() => onDelete(task.id)} style={{ marginRight: '10px', marginBottom: '10px' }}>Delete</button>
          <button className="button is-warning" onClick={() => setIsEditing(true)} style={{ marginBottom: '10px' }}>Edit</button>
        </div>
      )}
    </li>
  )
}

export default TaskItem
