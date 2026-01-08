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
        const importedData = JSON.parse(e.target.result);
        if (Array.isArray(importedData)) {
          // Função para verificar se duas sessões são duplicatas
          const isDuplicate = (session1, session2) => {
            // Compara por ID primeiro (mais confiável)
            if (session1.id && session2.id && session1.id === session2.id) {
              return true;
            }
            
            // Compara por dados únicos (livro, data, páginas, tempo)
            const sameBook = session1.book === session2.book;
            const sameDate = session1.date === session2.date;
            const samePages = (session1.pages === session2.pages) && 
                             (session1.startPage === session2.startPage) && 
                             (session1.endPage === session2.endPage);
            const sameDuration = session1.duration_min === session2.duration_min;
            
            // Considera duplicata se todos os campos principais coincidem
            return sameBook && sameDate && samePages && sameDuration;
          };

          // Filtra sessões novas (que não são duplicatas)
          const newSessions = importedData.filter(imported => 
            !sessions.some(existing => isDuplicate(imported, existing))
          );

          const duplicatesCount = importedData.length - newSessions.length;

          if (newSessions.length === 0) {
            alert('Nenhuma sessão nova encontrada. Todas as sessões do arquivo já existem no seu histórico.');
            event.target.value = '';
            return;
          }

          const message = duplicatesCount > 0
            ? `Encontradas ${newSessions.length} sessões novas e ${duplicatesCount} duplicatas.\n\nDeseja adicionar as ${newSessions.length} sessões novas ao seu histórico?`
            : `Encontradas ${newSessions.length} sessões novas.\n\nDeseja adicioná-las ao seu histórico?`;

          if (confirm(message)) {
            const mergedData = [...sessions, ...newSessions];
            const result = StorageService.importData(mergedData);
            
            if (result.success) {
              setSessions(mergedData);
              alert(`✅ Importação concluída!\n\n${newSessions.length} sessões adicionadas${duplicatesCount > 0 ? `\n${duplicatesCount} duplicatas ignoradas` : ''}`);
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header 
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
      
      <main className="container mx-auto px-6 py-6 max-w-[1600px]">
        {/* Dashboard Cards no Topo */}
        <Dashboard sessions={sessions} onAddSession={handleAddSession} />
        
        {/* Layout em Grid: 3 colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-6">
          
          {/* Coluna 1: Heatmap */}
          <div className="lg:col-span-1">
            <HeatmapView sessions={sessions} />
          </div>

          {/* Coluna 2: Estatísticas por Livro */}
          <div className="lg:col-span-1">
            <BookStats sessions={sessions} />
          </div>

          {/* Coluna 3: Histórico de Sessões */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 h-[600px] flex flex-col overflow-hidden">
              <SessionList sessions={sessions} onDelete={handleDeleteSession} onUpdate={handleUpdateSession} />
            </div>
          </div>
        </div>

        {/* Data Management - Linha abaixo */}
        <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-brand-600 dark:text-brand-500" />
            Gerenciamento de Dados
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
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

            <button 
              onClick={loadSampleData}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors border border-gray-200 dark:border-gray-600"
            >
              <Database className="w-4 h-4" />
              Dados de Exemplo
            </button>

            <button 
              onClick={handleClearData}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg transition-colors border border-red-200 dark:border-red-900/30"
            >
              <Trash2 className="w-4 h-4" />
              Limpar Tudo
            </button>

            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleImport}
              className="hidden"
              accept=".json"
            />
          </div>
        </div>
      </main>

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
