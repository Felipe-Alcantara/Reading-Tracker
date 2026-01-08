import React from 'react';
import { BookOpen, Clock, TrendingUp, Calendar } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { formatDuration } from '../utils';

export default function ShareCard({ session }) {
  const sessionDate = typeof session.date === 'string' ? parseISO(session.date) : session.date;
  const formattedDate = format(sessionDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });

  return (
    <div 
      id={`share-card-${session.id}`}
      className="relative w-[600px] h-[400px] bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 rounded-2xl p-8 text-white shadow-2xl overflow-hidden"
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Reading Tracker</h2>
              <p className="text-white/80 text-sm">Minha sessão de leitura</p>
            </div>
          </div>
          <div className="text-right">
            <Calendar className="w-6 h-6 inline-block mr-2 opacity-80" />
            <span className="text-sm font-medium opacity-90 capitalize">{formattedDate}</span>
          </div>
        </div>

        {/* Book Title */}
        <div className="mb-6">
          <h3 className="text-4xl font-bold leading-snug break-words">
            {session.book || 'Livro não informado'}
          </h3>
          {(session.startPage !== undefined && session.endPage !== undefined) && (
            <p className="text-white/90 text-lg mt-2 font-medium">
              Páginas {session.startPage} - {session.endPage}
            </p>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {session.pages > 0 && (
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 opacity-80" />
                <span className="text-sm font-medium opacity-80">Páginas</span>
              </div>
              <p className="text-3xl font-bold">{session.pages}</p>
            </div>
          )}

          {session.duration_min > 0 && (
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 opacity-80" />
                <span className="text-sm font-medium opacity-80">Tempo</span>
              </div>
              <p className="text-3xl font-bold">{formatDuration(session.duration_min)}</p>
            </div>
          )}

          {session.pagesPerMin > 0 && (
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 opacity-80" />
                <span className="text-sm font-medium opacity-80">Velocidade</span>
              </div>
              <p className="text-2xl font-bold">{session.pagesPerMin.toFixed(2)}</p>
              <p className="text-xs opacity-80">pág/min</p>
            </div>
          )}
        </div>

        {/* Notes */}
        {session.notes && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 flex-1">
            <p className="text-sm italic leading-relaxed break-words">"{session.notes}"</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-white/20">
          <p className="text-center text-sm opacity-75">
            📚 Compartilhe suas leituras • Reading Tracker
          </p>
        </div>
      </div>
    </div>
  );
}
