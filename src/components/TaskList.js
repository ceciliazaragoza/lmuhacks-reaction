// TaskList.js
import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onUpdateTask, onUpdateCompleteness }) {
  console.log(tasks)
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onUpdateTask={onUpdateTask}
          onUpdateCompleteness={onUpdateCompleteness}
        />
      ))}
    </ul>
  );
}

export default TaskList;
