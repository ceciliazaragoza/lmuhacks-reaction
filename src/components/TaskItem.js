// TaskItem.js
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
            type="text"
            value={editedTaskDetail}
            onChange={e => setEditedTaskDetail(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.task}
          </span>
          <button onClick={handleToggleCompleteness}>
            {task.completed ? 'Not Complete' : 'Complete'}
          </button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </li>
  )
}

export default TaskItem
