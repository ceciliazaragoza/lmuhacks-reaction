// TaskList.js
import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onUpdateTask }) {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onUpdateTask={onUpdateTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;
