
import React from 'react';
import { UserCircleIcon } from './icons';

interface UserContextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const UserContextInput: React.FC<UserContextInputProps> = ({ value, onChange }) => {
  return (
    <div className="mb-6">
      <label htmlFor="userContext" className="flex items-center text-lg font-semibold text-sky-300 mb-2">
        <UserCircleIcon className="w-6 h-6 mr-2 text-sky-400" />
        Define Your 'Genius' Context
      </label>
      <textarea
        id="userContext"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="E.g., your long-term goals, core values, what 'achieving genius' means to you, or your current major project..."
        rows={4}
        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200 text-slate-100 placeholder-slate-400 resize-y"
        aria-describedby="userContextHelp"
      />
      <p id="userContextHelp" className="mt-2 text-xs text-slate-400">
        Providing this context helps the AI tailor its suggestions to your unique aspirations. The more specific you are, the better the guidance.
      </p>
    </div>
  );
};
