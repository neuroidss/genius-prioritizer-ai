
import React from 'react';
import { SparklesIcon } from './icons';

interface AIPrioritizerProps {
  onPrioritize: () => void;
  disabled?: boolean;
}

export const AIPrioritizer: React.FC<AIPrioritizerProps> = ({ onPrioritize, disabled }) => {
  return (
    <div className="mt-6 text-center">
      <button
        onClick={onPrioritize}
        disabled={disabled}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md flex items-center justify-center mx-auto"
      >
        <SparklesIcon className="w-6 h-6 mr-2 animate-pulse" />
        Find My Focus
      </button>
    </div>
  );
};
    