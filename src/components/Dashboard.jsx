import React from 'react';
import { TrendingUp, Book, Clock, Calendar, PlusCircle } from 'lucide-react';
import { formatDuration } from '../utils';

export default function Dashboard({ sessions, onAddSession }) {
  const totalPages = sessions.reduce((acc, s) => acc + (s.pages || 0), 0);
  const totalMinutes = sessions.reduce((acc, s) => acc + (s.duration_min || 0), 0);
  
  // Calculate average pages per minute (global) - só para sessões com ambos os valores
  const sessionsWithBoth = sessions.filter(s => s.pages && s.duration_min);
  const avgPpm = sessionsWithBoth.length > 0 
    ? (sessionsWithBoth.reduce((acc, s) => acc + s.pages, 0) / sessionsWithBoth.reduce((acc, s) => acc + s.duration_min, 0)).toFixed(1) 
    : 0;

  const StatCard = ({ icon: Icon, label, value, subtext, color }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <span className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wide">{label}</span>
      <span className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</span>
      {subtext && <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">{subtext}</span>}
    </div>
  );

  return (
    <div className="mb-6">
      <button
        onClick={onAddSession}
        className="w-full mb-6 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white py-4 px-6 rounded-xl shadow-md flex items-center justify-center gap-3 transition-colors touch-manipulation group"
      >
        <PlusCircle className="w-6 h-6 group-active:scale-95 transition-transform" />
        <span className="font-bold text-lg">Registrar Leitura</span>
      </button>

      <div className="grid grid-cols-2 gap-4">
        <StatCard 
          icon={Book} 
          label="Total Páginas" 
          value={totalPages} 
          color="bg-blue-500"
        />
        <StatCard 
          icon={Clock} 
          label="Tempo Total" 
          value={formatDuration(totalMinutes)} 
          color="bg-purple-500"
        />
        <StatCard 
          icon={TrendingUp} 
          label="Velocidade" 
          value={avgPpm} 
          subtext="páginas / min"
          color="bg-orange-500"
        />
        <StatCard 
          icon={Calendar} 
          label="Sessões" 
          value={sessions.length} 
          color="bg-brand-500"
        />
      </div>
    </div>
  );
}
