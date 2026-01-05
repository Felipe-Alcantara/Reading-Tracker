import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { formatDuration } from '../utils';

export default function SessionForm({ sessionData, onSave, onCancel }) {
  const [pages, setPages] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const pagesNum = parseInt(pages, 10);
    
    if (!pagesNum || pagesNum <= 0) {
      setError('Por favor, insira um número válido de páginas.');
      return;
    }

    onSave({
      pages: pagesNum,
      notes
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-brand-50 p-6 border-b border-brand-100">
          <h2 className="text-xl font-bold text-brand-900">Resumo da Sessão</h2>
          <p className="text-brand-700 mt-1">
            Você leu por <span className="font-bold">{formatDuration(sessionData.duration_min)}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantas páginas você leu?
            </label>
            <input
              type="number"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-lg"
              placeholder="Ex: 15"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notas (opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none resize-none h-24"
              placeholder="O que você achou da leitura hoje?"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
