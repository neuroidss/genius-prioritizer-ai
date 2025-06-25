
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center py-6 mt-10">
      <p className="text-sm text-slate-400">
        Powered by <a href="https://deepmind.google/technologies/gemini/" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 underline">Google Gemini</a>.
        Clarity Engine &copy; {new Date().getFullYear()}.
      </p>
    </footer>
  );
};
    