
import React from 'react';
import { AlertTriangleIcon } from './icons';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="mt-4 p-4 bg-red-700 bg-opacity-40 border border-red-500 text-red-300 rounded-lg flex items-center space-x-3 animate-fadeIn">
      <AlertTriangleIcon className="w-6 h-6 text-red-300 flex-shrink-0" />
      <div>
        <h4 className="font-semibold">Oops! Something went wrong.</h4>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

// Add a subtle fade-in animation
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
`;
document.head.appendChild(styleSheet);
    