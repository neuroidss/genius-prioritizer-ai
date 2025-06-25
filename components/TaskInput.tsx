
import React, { useState } from 'react';
import { PlusIcon } from './icons';

interface TaskInputProps {
  onAddTask: (text: string) => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [inputText, setInputText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onAddTask(inputText.trim());
      setInputText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-center">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="What's on your mind? Add a task or idea..."
        className="flex-grow p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200 text-slate-100 placeholder-slate-400"
      />
      <button
        type="submit"
        className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-5 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-800"
        aria-label="Add task"
      >
        <PlusIcon className="w-5 h-5 mr-2" />
        Add
      </button>
    </form>
  );
};
    