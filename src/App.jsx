import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { Download, Upload, Trash2, Database } from 'lucide-react';

import Header from './components/Header';
import SessionTimer from './components/SessionTimer';
import SessionForm from './components/SessionForm';
import HeatmapView from './components/HeatmapView';
import Dashboard from './components/Dashboard';
import { StorageService } from './services/StorageService';
import { calculateDuration, calculatePagesPerMin } from './utils';
import { generateSampleData } from './data/sample-data';

function App() {
  const [sessions, setSessions] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [currentSessionStart, setCurrentSessionStart] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [pendingSession, setPendingSession] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loaded = StorageService.getSessions();
    setSessions(loaded);
  }, []);

  const handleStart = () => {
    setIsRecording(true);
    setCurrentSessionStart(new Date().toISOString());
  };

  const handleStop = () => {
    const end = new Date().toISOString();
    const duration = calculateDuration(currentSessionStart, end);
    
    setPendingSession({
      start: currentSessionStart,
      end: end,
      duration_min: duration
    });
    
    setIsRecording(false);
    setShowForm(true);
  };

  const handleSaveSession = (formData) => {
    const { pages, notes } = formData;
    const { start, end, duration_min } = pendingSession;

    const newSession = {
      id: uuidv4(),
      date: format(new Date(start), 'yyyy-MM-dd'),
      start,
      end,
      duration_min,
      pages,
      pagesPerMin: calculatePagesPerMin(pages, duration_min),
      notes
    };

    const updated = StorageService.saveSession(newSession);
    setSessions(updated);
    setShowForm(false);
    setPendingSession(null);
    setCurrentSessionStart(null);
  };

  const handleCancelSession = () => {
    setShowForm(false);
    setPendingSession(null);
    setCurrentSessionStart(null);
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
            StorageService.importData(data);
            setSessions(data);
            alert('Dados importados com sucesso!');
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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <SessionTimer 
          isRecording={isRecording} 
          startTime={currentSessionStart}
          onStart={handleStart}
          onStop={handleStop}
        />

        <Dashboard sessions={sessions} />
        
        <HeatmapView sessions={sessions} />

        {/* Data Management */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-brand-600" />
                Gerenciamento de Dados
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <button 
                    onClick={handleExport}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors border border-gray-200"
                >
                    <Download className="w-4 h-4" />
                    Exportar Backup (JSON)
                </button>
                
                <button 
                    onClick={triggerImport}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors border border-gray-200"
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

            <div className="border-t border-gray-100 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                 <button 
                    onClick={loadSampleData}
                    className="text-sm text-brand-600 hover:text-brand-700 underline"
                >
                    Carregar dados de exemplo
                </button>

                <button 
                    onClick={handleClearData}
                    className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 px-3 py-1 rounded hover:bg-red-50 transition-colors"
                >
                    <Trash2 className="w-4 h-4" />
                    Limpar tudo
                </button>
            </div>
        </div>
      </main>

      {showForm && pendingSession && (
        <SessionForm 
          sessionData={pendingSession}
          onSave={handleSaveSession}
          onCancel={handleCancelSession}
        />
      )}
    </div>
  );
}

export default App;
