import React, { useState } from 'react';
import { Clock, BookOpen, Calendar, AlignLeft, Trash2, Edit2, Save, X } from 'lucide-react';
import { format } from 'date-fns';
import { formatDuration } from '../utils';

export default function SessionList({ sessions, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editNotes, setEditNotes] = useState('');

  const handleStartEdit = (session) => {
    setEditingId(session.id);
    setEditNotes(session.notes || '');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditNotes('');
  };

  const handleSaveEdit = (session) => {
    if (onUpdate) {
        onUpdate(session.id, { ...session, notes: editNotes });
    }
    setEditingId(null);
  };

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
      <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 z-10 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
           <AlignLeft className="w-5 h-5 text-brand-600 dark:text-brand-500" />
           Histórico
        </h2>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
          {sessions.length} sessões
        </span>
      </div>
      
      <div className="p-4 space-y-4 overflow-y-auto flex-1">
        {sortedSessions.map((session) => (
          <div key={session.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(session.start), 'dd/MM/yyyy')}</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 rounded-full">
                {session.pagesPerMin || 0} pág/min
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{session.pages}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Páginas</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{formatDuration(session.duration_min)}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Tempo</div>
                </div>
              </div>
            </div>

            {editingId === session.id ? (
                <div className="mt-3 mb-2">
                    <textarea 
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none resize-none h-20 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Adicione suas notas..."
                        autoFocus
                    />
                    <div className="flex justify-end gap-2 mt-2">
                        <button 
                            onClick={handleCancelEdit}
                            className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            title="Cancelar"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => handleSaveEdit(session)}
                            className="p-1 text-brand-600 dark:text-brand-500 hover:text-brand-700 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/30 rounded"
                            title="Salvar"
                        >
                            <Save className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="group relative">
                    {session.notes ? (
                        <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg text-sm text-gray-600 dark:text-gray-300 italic mb-2 pr-8 break-words whitespace-pre-wrap">
                            "{session.notes}"
                        </div>
                    ) : (
                        <div className="mb-2">
                             <button 
                                onClick={() => handleStartEdit(session)} 
                                className="text-xs text-gray-400 dark:text-gray-500 hover:text-brand-600 dark:hover:text-brand-500 flex items-center gap-1 py-1"
                             >
                                <Edit2 className="w-3 h-3" />
                                Adicionar nota
                             </button>
                        </div>
                    )}
                    
                    {session.notes && (
                        <button 
                            onClick={() => handleStartEdit(session)}
                            className="absolute top-2 right-2 p-1 text-gray-400 dark:text-gray-500 hover:text-brand-600 dark:hover:text-brand-500 hover:bg-white dark:hover:bg-gray-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Editar nota"
                        >
                            <Edit2 className="w-3 h-3" />
                        </button>
                    )}
                </div>
            )}

            {onDelete && editingId !== session.id && (
                <div className="pt-2 border-t border-gray-50 dark:border-gray-700 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                     <button 
                        onClick={() => onDelete(session.id)} 
                        className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 dark:hover:text-red-500 px-2 py-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
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
