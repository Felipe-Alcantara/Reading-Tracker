import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { Download, Upload, Trash2, Database } from 'lucide-react';

import Header from './components/Header';
import SessionForm from './components/SessionForm';
import HeatmapView from './components/HeatmapView';
import Dashboard from './components/Dashboard';
import SessionList from './components/SessionList';
import BookStats from './components/BookStats';
import { StorageService } from './services/StorageService';
import { calculatePagesPerMin } from './utils';
import { generateSampleData } from './data/sample-data';

function App() {
  const [sessions, setSessions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loaded = StorageService.getSessions();
    setSessions(loaded);
    
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleAddSession = () => {
    setShowForm(true);
  };

  const handleSaveSession = (formData) => {
    const { date, book, startPage, endPage, duration_min, pages, notes } = formData;
    
    // Usa a data fornecida ou a data atual
    const sessionDate = date || new Date().toISOString().split('T')[0];
    const start = new Date(sessionDate);
    start.setHours(12, 0, 0, 0);
    const startIso = start.toISOString();

    const newSession = {
      id: uuidv4(),
      date: sessionDate,
      start: startIso, 
      end: startIso,
      duration_min,
      pages,
      startPage,
      endPage,
      pagesPerMin: (pages && duration_min) ? calculatePagesPerMin(pages, duration_min) : undefined,
      book,
      notes
    };

    const result = StorageService.saveSession(newSession);
    
    if (result.success) {
      setSessions(result.data);
      setShowForm(false);
    } else {
      if (result.error === 'STORAGE_FULL') {
        alert('Atenção: O armazenamento do navegador está cheio!\n\nPor favor, use a opção "Exportar Backup" para salvar seus dados e depois "Limpar tudo" para liberar espaço.');
      } else {
        alert('Erro ao salvar a sessão. Tente novamente.');
      }
    }
  };

  const handleCancelSession = () => {
    setShowForm(false);
  };

  const loadSampleData = () => {
    if (confirm('Isso irá substituir seus dados atuais por dados de exemplo. Continuar?')) {
      const data = generateSampleData();
      StorageService.importData(data);
      setSessions(data);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(sessions, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `reading-tracker-backup-${format(new Date(), 'yyyy-MM-dd')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const triggerImport = () => {
    fileInputRef.current.click();
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (Array.isArray(data)) {
          if (confirm('Isso substituirá seus dados atuais pelos dados do arquivo. Deseja continuar?')) {
            const result = StorageService.importData(data);
            if (result.success) {
                setSessions(data);
                alert('Dados importados com sucesso!');
            } else if (result.error === 'STORAGE_FULL') {
                alert('Erro: Não há espaço suficiente no navegador para importar estes dados.');
            } else {
                alert('Erro desconhecido ao salvar os dados.');
            }
          }
        } else {
          alert('Arquivo inválido: o formato deve ser uma lista de sessões.');
        }
      } catch (error) {
        console.error('Erro ao importar:', error);
        alert('Erro ao ler o arquivo JSON.');
      }
      // Reset input value to allow importing the same file again if needed
      event.target.value = '';
    };
    reader.readAsText(file);
  };

  const handleClearData = () => {
    if (confirm('ATENÇÃO: Isso apagará TODO o seu histórico de leitura permanentemente. Tem certeza?')) {
      StorageService.clearAll();
      setSessions([]);
    }
  };

  const handleDeleteSession = (sessionId) => {
    if (confirm('Tem certeza que deseja excluir esta sessão?')) {
      const newSessions = sessions.filter(s => s.id !== sessionId);
      StorageService.importData(newSessions); 
      setSessions(newSessions);
    }
  };

  const handleUpdateSession = (sessionId, updatedSession) => {
    const newSessions = sessions.map(s => s.id === sessionId ? updatedSession : s);
    StorageService.importData(newSessions);
    setSessions(newSessions);
  };

  const availableBooks = Array.from(new Set(sessions.map(s => s.book).filter(Boolean)));

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="h-[100dvh] bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden">
      <Header 
        onToggleHistory={() => setShowHistory(!showHistory)} 
        isHistoryOpen={showHistory}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
      
      <div className="flex-1 flex overflow-hidden relative">
        <main className={`flex-1 overflow-y-auto transition-all duration-300 ${showHistory ? 'mr-0' : ''}`}>
           <div className="container mx-auto px-4 py-6 max-w-2xl">
            
            <Dashboard sessions={sessions} onAddSession={handleAddSession} />
            
            <HeatmapView sessions={sessions} />

            <BookStats sessions={sessions} />

            {/* Data Management */}
            <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5 text-brand-600 dark:text-brand-500" />
                    Gerenciamento de Dados
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <button 
                        onClick={handleExport}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors border border-gray-200 dark:border-gray-600"
                    >
                        <Download className="w-4 h-4" />
                        Exportar Backup (JSON)
                    </button>
                    
                    <button 
                        onClick={triggerImport}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors border border-gray-200 dark:border-gray-600"
                    >
                        <Upload className="w-4 h-4" />
                        Importar Backup
                    </button>
                    <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleImport}
                        className="hidden"
                        accept=".json"
                    />
                </div>

                <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <button 
                        onClick={loadSampleData}
                        className="text-sm text-brand-600 dark:text-brand-500 hover:text-brand-700 dark:hover:text-brand-400 underline"
                    >
                        Carregar dados de exemplo
                    </button>

                    <button 
                        onClick={handleClearData}
                        className="flex items-center gap-1 text-sm text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500 px-3 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                        Limpar tudo
                    </button>
                </div>
            </div>
           </div>
        </main>

        <aside className={`transition-all duration-300 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-xl z-20 ${showHistory ? 'w-80 sm:w-96 translate-x-0' : 'w-0 translate-x-full opacity-0'}`}>
             <div className="w-80 sm:w-96 h-full overflow-hidden">
                <SessionList sessions={sessions} onDelete={handleDeleteSession} onUpdate={handleUpdateSession} />
             </div>
        </aside>
      </div>

      {showForm && (
        <SessionForm 
          onSave={handleSaveSession}
          onCancel={handleCancelSession}
          availableBooks={availableBooks}
        />
      )}
    </div>
  );
}

export default App;
