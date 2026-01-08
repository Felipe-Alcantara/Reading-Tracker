import React, { useState } from 'react';
import { TrendingUp, Book, Clock, Calendar, PlusCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, isSameMonth, parseISO, startOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { formatDuration } from '../utils';

export default function Dashboard({ sessions, onAddSession }) {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));

  // Filtragem Mensal
  const monthlySessions = sessions.filter(s => {
    // Garante compatibilidade se a data for string ou objeto Date
    const sDate = typeof s.date === 'string' ? parseISO(s.date) : s.date;
    return isSameMonth(sDate, currentMonth);
  });

  // Métricas do Mês selecionado
  const monthTotalPages = monthlySessions.reduce((acc, s) => acc + (s.pages || 0), 0);
  const monthTotalMinutes = monthlySessions.reduce((acc, s) => acc + (s.duration_min || 0), 0);
  const monthSessionsCount = monthlySessions.length;

  // Métricas Globais (Velocidade)
  const sessionsWithBoth = sessions.filter(s => s.pages && s.duration_min);
  const globalAvgPpm = sessionsWithBoth.length > 0
    ? (sessionsWithBoth.reduce((acc, s) => acc + s.pages, 0) / sessionsWithBoth.reduce((acc, s) => acc + s.duration_min, 0)).toFixed(1)
    : 0;

  const handlePrevMonth = () => setCurrentMonth(prev => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentMonth(prev => addMonths(prev, 1));

  const StatCard = ({ icon: Icon, label, value, subtext, color }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow flex flex-col">
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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Resumo do Mês</h2>
        
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700 shadow-sm">
          <button 
            onClick={handlePrevMonth}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-gray-600 dark:text-gray-400 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-200 min-w-[140px] text-center capitalize">
            {format(currentMonth, "MMMM 'de' yyyy", { locale: ptBR })}
          </span>
          <button 
            onClick={handleNextMonth}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-gray-600 dark:text-gray-400 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard 
          icon={Book} 
          label="Páginas (Mês)" 
          value={monthTotalPages} 
          color="bg-blue-500"
        />
        <StatCard 
          icon={Clock} 
          label="Tempo (Mês)" 
          value={formatDuration(monthTotalMinutes)} 
          color="bg-purple-500"
        />
        <StatCard 
          icon={TrendingUp} 
          label="Velocidade (Geral)" 
          value={globalAvgPpm} 
          subtext="páginas / min"
          color="bg-orange-500"
        />
        <StatCard 
          icon={Calendar} 
          label="Sessões (Mês)" 
          value={monthSessionsCount} 
          color="bg-brand-500"
        />
      </div>

      <button
        type="button"
        onClick={onAddSession}
        className="fixed bottom-6 right-6 z-30 w-20 h-20 rounded-full bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white shadow-xl flex items-center justify-center transition-colors touch-manipulation"
        aria-label="Registrar leitura"
        title="Registrar leitura"
      >
        <PlusCircle className="w-10 h-10" />
      </button>
    </div>
  );
}
