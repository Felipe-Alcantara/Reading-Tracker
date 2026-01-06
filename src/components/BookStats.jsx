import React from 'react';
import { BookOpen, Clock, TrendingUp, Activity } from 'lucide-react';
import { formatDuration } from '../utils';

export default function BookStats({ sessions }) {
  if (!sessions || sessions.length === 0) return null;

  const totals = sessions.reduce((acc, s) => {
    const key = s.book || 'Sem título';
    if (!acc[key]) {
      acc[key] = { pages: 0, minutes: 0, sessions: 0 };
    }
    acc[key].pages += s.pages || 0;
    acc[key].minutes += s.duration_min || 0;
    acc[key].sessions += 1;
    return acc;
  }, {});

  const books = Object.entries(totals)
    .map(([book, data]) => ({
      book,
      pages: data.pages,
      minutes: data.minutes,
      sessions: data.sessions,
      ppm: data.minutes > 0 ? (data.pages / data.minutes) : 0,
    }))
    .sort((a, b) => b.pages - a.pages);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mt-6">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-brand-600 dark:text-brand-500" />
        Estatísticas por Livro
      </h3>

      <div className="space-y-4">
        {books.map((item) => (
          <div key={item.book} className="p-4 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-base font-semibold text-gray-900 dark:text-white">{item.book}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{item.sessions} sessões</div>
              </div>
              <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 rounded-full">
                <Activity className="w-3 h-3" />
                {item.ppm.toFixed(2)} pág/min
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <BookOpen className="w-4 h-4 text-blue-500" />
                <span>{item.pages} páginas</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <Clock className="w-4 h-4 text-purple-500" />
                <span>{formatDuration(item.minutes)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                <TrendingUp className="w-4 h-4 text-orange-500" />
                <span>{(item.pages / Math.max(item.sessions,1)).toFixed(1)} pág/sessão</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
