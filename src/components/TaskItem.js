// TaskItem.js
import React, { useState } from 'react';
import { updateTaskDetail } from '../services/taskService';

function TaskItem({ task, onDelete, onUpdateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskDetail, setEditedTaskDetail] = useState(task.task);

  const handleEdit = async () => {
    try {
      await updateTaskDetail(task.id, editedTaskDetail);
      setIsEditing(false);
      onUpdateTask(task.id, editedTaskDetail); // Update UI state
    } catch (error) {
      console.error('Error updating task detail:', error);
    }
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTaskDetail}
            onChange={(e) => setEditedTaskDetail(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <span>{task.task}</span>
          <button onClick={() => onDelete(task.id)}>Delete</button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </li>
  );
}

export default TaskItem;
