import React, { useState, useEffect } from 'react';
import { Play, Square, Clock } from 'lucide-react';
import { formatDuration } from '../utils';

export default function SessionTimer({ onStart, onStop, isRecording, startTime }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let interval;
    if (isRecording && startTime) {
      const start = new Date(startTime).getTime();
      interval = setInterval(() => {
        const now = new Date().getTime();
        setElapsed((now - start) / 60000); // minutes
      }, 1000);
    } else {
      setElapsed(0);
    }
    return () => clearInterval(interval);
  }, [isRecording, startTime]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6 text-center border border-gray-100 dark:border-gray-700">
      <div className="mb-4">
        <div className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider font-semibold mb-1">
          {isRecording ? 'Sessão em andamento' : 'Pronto para ler?'}
        </div>
        <div className={`text-5xl font-mono font-bold tabular-nums ${isRecording ? 'text-brand-600 dark:text-brand-500' : 'text-gray-300 dark:text-gray-600'}`}>
          {isRecording ? formatDuration(elapsed) : '00m'}
        </div>
      </div>

      {!isRecording ? (
        <button
          onClick={onStart}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-brand-200"
        >
          <Play className="w-6 h-6 fill-current" />
          INICIAR LEITURA
        </button>
      ) : (
        <button
          onClick={onStop}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-red-200 animate-pulse"
        >
          <Square className="w-6 h-6 fill-current" />
          ENCERRAR SESSÃO
        </button>
      )}
    </div>
  );
}
