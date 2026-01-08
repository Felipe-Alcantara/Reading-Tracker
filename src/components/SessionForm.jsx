import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

export default function SessionForm({ onSave, onCancel, availableBooks = [], selectedBook = '' }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [book, setBook] = useState(selectedBook);
  const [startPage, setStartPage] = useState('');
  const [endPage, setEndPage] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [pagesRead, setPagesRead] = useState(0);

  // Calcula páginas lidas automaticamente
  useEffect(() => {
    const start = parseInt(startPage, 10);
    const end = parseInt(endPage, 10);
    
    if (!isNaN(start) && !isNaN(end)) {
      setPagesRead(end - start);
    } else {
      setPagesRead(0);
    }
  }, [startPage, endPage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validação mínima: pelo menos o livro deve ser informado
    if (!book.trim()) {
      setError('Por favor, informe pelo menos o nome do livro.');
      return;
    }

    const start = parseInt(startPage, 10);
    const end = parseInt(endPage, 10);
    const durationNum = parseInt(duration, 10);

    // Validação de intervalo de páginas apenas se ambos forem preenchidos
    if (startPage !== '' && endPage !== '') {
        if (isNaN(start) || isNaN(end)) {
            setError('As páginas devem ser números.');
            return;
        }

        if (end <= start) {
            setError('A página final deve ser maior que a inicial.');
            return;
        }
    }

    onSave({
      date: date || undefined,
      book: book.trim(),
      startPage: startPage !== '' ? start : undefined,
      endPage: endPage !== '' ? end : undefined,
      duration_min: durationNum > 0 ? durationNum : undefined,
      pages: pagesRead > 0 ? pagesRead : undefined, 
      notes: notes.trim() || undefined
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-brand-50 dark:bg-gray-900 p-6 border-b border-brand-100 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-brand-900 dark:text-white">Registrar Leitura</h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Data */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Data da Sessão (opcional)
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Livro */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Livro
            </label>
            <input
              list="books-list"
              value={book}
              onChange={(e) => setBook(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Digite ou selecione o livro"
            />
            <datalist id="books-list">
              {availableBooks.map((name) => (
                <option key={name} value={name} />
              ))}
            </datalist>
          </div>

          {/* Páginas (Grid) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Página Inicial (opcional)
              </label>
              <input
                type="number"
                value={startPage}
                onChange={(e) => setStartPage(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ex: 10"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Página Final (opcional)
              </label>
              <input
                type="number"
                value={endPage}
                onChange={(e) => setEndPage(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Ex: 25"
                min="0"
              />
            </div>
          </div>

          {/* Resultado Páginas Lidas */}
          {pagesRead > 0 && (
             <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                   Total de páginas lidas: <span className="font-bold text-brand-600 dark:text-brand-400 text-lg">{pagesRead}</span>
                </p>
             </div>
          )}

          {/* Tempo de Leitura */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tempo de Leitura - minutos (opcional)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Ex: 30"
              min="1"
            />
          </div>

          {/* Comentários */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Comentários (opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none resize-none h-24 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="O que achou da leitura?"
            />
          </div>

          {error && <p className="text-red-500 dark:text-red-400 text-sm font-medium">{error}</p>}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-brand-600 text-white font-bold rounded-lg hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save size={20} />
              Salvar Sessão
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
