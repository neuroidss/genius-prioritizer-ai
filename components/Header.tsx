
import React from 'react';
import { BrainIcon } from './icons'; // Assuming BrainIcon is a good fit

export const Header: React.FC = () => {
  return (
    <header className="text-center py-6 md:py-10">
      <div className="flex items-center justify-center space-x-3 mb-2">
        <BrainIcon className="w-10 h-10 text-sky-400" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
          Clarity Engine
        </h1>
      </div>
      <p className="text-slate-300 text-lg md:text-xl">
        Uncover your true priorities with AI-powered insight.
      </p>
    </header>
  );
};
    