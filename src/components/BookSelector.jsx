import React, { useState } from 'react';
import { BookOpen, Plus, X } from 'lucide-react';

export default function BookSelector({ availableBooks = [], onSelect, onCancel }) {
  const [newBook, setNewBook] = useState('');
  const [showNewInput, setShowNewInput] = useState(false);

  const handleSelectBook = (book) => {
    onSelect(book);
  };

  const handleCreateNew = () => {
    if (newBook.trim()) {
      onSelect(newBook.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-brand-50 dark:bg-gray-900 p-6 border-b border-brand-100 dark:border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-brand-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Escolha o Livro
            </h2>
            <p className="text-brand-700 dark:text-gray-300 text-sm mt-1">
              Selecione ou adicione um novo livro para começar
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-1 hover:bg-brand-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            title="Cancelar"
          >
            <X className="w-5 h-5 text-brand-700 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Existing Books */}
          {availableBooks.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Livros Recentes
              </h3>
              <div className="space-y-2">
                {availableBooks.map((book) => (
                  <button
                    key={book}
                    onClick={() => handleSelectBook(book)}
                    className="w-full p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:border-brand-500 dark:hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-gray-700 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center group-hover:bg-brand-200 dark:group-hover:bg-brand-900/50 transition-colors">
                          <BookOpen className="w-5 h-5 text-brand-600 dark:text-brand-500" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{book}</span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs text-brand-600 dark:text-brand-500 font-medium">
                          Selecionar →
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add New Book */}
          <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
            {!showNewInput ? (
              <button
                onClick={() => setShowNewInput(true)}
                className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-brand-500 dark:hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-gray-700 transition-all text-gray-600 dark:text-gray-300 font-medium flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Adicionar Novo Livro
              </button>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  value={newBook}
                  onChange={(e) => setNewBook(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCreateNew();
                    if (e.key === 'Escape') setShowNewInput(false);
                  }}
                  placeholder="Digite o nome do livro"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setShowNewInput(false);
                      setNewBook('');
                    }}
                    className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreateNew}
                    disabled={!newBook.trim()}
                    className="flex-1 py-2 px-4 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
