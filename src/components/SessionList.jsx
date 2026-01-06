import React from 'react';
import { Clock, BookOpen, Calendar, AlignLeft, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { formatDuration } from '../utils';

export default function SessionList({ sessions, onDelete }) {
  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-gray-400 text-center">
        <BookOpen className="w-12 h-12 mb-4 opacity-50" />
        <p>Nenhuma sessão registrada ainda.</p>
      </div>
    );
  }

  // Sort sessions by date (newest first)
  const sortedSessions = [...sessions].sort((a, b) => new Date(b.start) - new Date(a.start));

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-100 bg-white sticky top-0 z-10 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
           <AlignLeft className="w-5 h-5 text-brand-600" />
           Histórico
        </h2>
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {sessions.length} sessões
        </span>
      </div>
      
      <div className="p-4 space-y-4 overflow-y-auto flex-1">
        {sortedSessions.map((session) => (
          <div key={session.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(session.start), 'dd/MM/yyyy')}</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 bg-brand-50 text-brand-700 rounded-full">
                {session.pagesPerMin || 0} pág/min
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{session.pages}</div>
                  <div className="text-xs text-gray-500">Páginas</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{formatDuration(session.duration_min)}</div>
                  <div className="text-xs text-gray-500">Tempo</div>
                </div>
              </div>
            </div>

            {session.notes && (
              <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 italic mb-2">
                "{session.notes}"
              </div>
            )}

            {onDelete && (
                <div className="pt-2 border-t border-gray-50 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                     <button 
                        onClick={() => onDelete(session.id)} 
                        className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 px-2 py-1 hover:bg-red-50 rounded transition-colors"
                        title="Excluir sessão"
                     >
                        <Trash2 className="w-3 h-3" />
                        Excluir
                     </button>
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
