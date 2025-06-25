
import React from 'react';
import { Task } from '../types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (taskId: string) => void;
  onToggleTask: (taskId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask, onToggleTask }) => {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-slate-400 italic py-4">No tasks yet. Add some to get started!</p>
    );
  }

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onDelete={onDeleteTask} onToggle={onToggleTask} />
      ))}
    </div>
  );
};
    