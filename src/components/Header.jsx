import React from 'react';
import { BookOpen, History } from 'lucide-react';

export default function Header({ onToggleHistory, isHistoryOpen }) {
  return (
    <header className="bg-brand-600 text-white p-4 shadow-md sticky top-0 z-20">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          <h1 className="text-xl font-bold tracking-tight">Reading Tracker</h1>
        </div>

        <button 
          onClick={onToggleHistory}
          className={`p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium ${isHistoryOpen ? 'bg-brand-700 text-white' : 'hover:bg-brand-500 text-brand-100'}`}
          title="Ver Histórico"
        >
          <History className="w-5 h-5" />
          <span className="hidden sm:inline">Histórico</span>
        </button>
      </div>
    </header>
  );
}
