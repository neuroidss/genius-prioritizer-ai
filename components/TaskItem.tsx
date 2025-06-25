
import React from 'react';
import { Task } from '../types';
import { TrashIcon, CheckCircleIcon, CircleIcon } from './icons';

interface TaskItemProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onToggle: (taskId: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggle }) => {
  return (
    <div className={`flex items-center justify-between p-3 bg-slate-700 rounded-lg shadow transition-all duration-200 hover:bg-slate-600/70 ${task.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-center space-x-3 flex-grow">
        <button
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? "Mark task as incomplete" : "Mark task as complete"}
          className="text-slate-400 hover:text-sky-400 transition-colors"
        >
          {task.completed ? <CheckCircleIcon className="w-6 h-6 text-green-400" /> : <CircleIcon className="w-6 h-6" />}
        </button>
        <span className={`text-slate-100 ${task.completed ? 'line-through text-slate-400' : ''} break-all`}>
          {task.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="ml-4 text-slate-400 hover:text-red-500 transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 focus:ring-offset-slate-700"
        aria-label="Delete task"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
};
    