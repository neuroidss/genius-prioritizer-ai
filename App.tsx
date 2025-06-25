
import React, { useState, useCallback } from 'react';
import { Task } from './types';
import { GENAI_MODEL_NAME } from './constants';
import { Header } from './components/Header';
import { UserContextInput } from './components/UserContextInput'; // New Import
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import { AIPrioritizer } from './components/AIPrioritizer';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { Footer } from './components/Footer';
import { prioritizeTasksWithGemini } from './services/geminiService';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userContext, setUserContext] = useState<string>(''); // New state for user context
  const [aiSuggestion, setAiSuggestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addTask = useCallback((text: string) => {
    if (text.trim() === '') return;
    setTasks(prevTasks => [...prevTasks, { id: Date.now().toString(), text, completed: false }]);
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, []);

  const toggleTask = useCallback((taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const handleUserContextChange = useCallback((context: string) => {
    setUserContext(context);
  }, []);

  const handlePrioritize = useCallback(async () => {
    if (tasks.length === 0) {
      setError("Please add some tasks before trying to prioritize.");
      setAiSuggestion('');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAiSuggestion('');
    try {
      // Pass userContext to the service
      const suggestion = await prioritizeTasksWithGemini(tasks, userContext, GENAI_MODEL_NAME);
      setAiSuggestion(suggestion);
    } catch (err) {
      console.error("Error prioritizing tasks:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred while contacting the AI. Ensure your API key is set.");
    } finally {
      setIsLoading(false);
    }
  }, [tasks, userContext]); // Add userContext to dependencies

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-slate-100 flex flex-col items-center justify-between p-4 selection:bg-sky-500 selection:text-white">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        <Header />
        
        <main className="space-y-6 bg-slate-800 bg-opacity-70 backdrop-blur-md shadow-2xl rounded-xl p-6 md:p-8">
          <UserContextInput value={userContext} onChange={handleUserContextChange} />
          <TaskInput onAddTask={addTask} />
          
          {tasks.length > 0 && (
            <TaskList tasks={tasks} onDeleteTask={deleteTask} onToggleTask={toggleTask} />
          )}
          
          <AIPrioritizer onPrioritize={handlePrioritize} disabled={tasks.length === 0 || isLoading} />
          
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          
          {aiSuggestion && !isLoading && (
            <div className="mt-6 p-6 bg-indigo-600 bg-opacity-30 rounded-lg shadow-lg animate-fadeIn">
              <h3 className="text-xl font-semibold text-sky-300 mb-3">AI Powered Insight:</h3>
              <p className="text-slate-200 whitespace-pre-wrap leading-relaxed">{aiSuggestion}</p>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
