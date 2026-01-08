import React from 'react';
import { BookOpen, Moon, Sun } from 'lucide-react';

export default function Header({ darkMode, onToggleDarkMode }) {
  return (
    <header className="bg-brand-600 dark:bg-gray-900 text-white p-4 shadow-md sticky top-0 z-20">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          <h1 className="text-xl font-bold tracking-tight">Reading Tracker</h1>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg transition-colors hover:bg-brand-500 dark:hover:bg-gray-800 text-brand-100"
            title={darkMode ? 'Tema Claro' : 'Tema Escuro'}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
