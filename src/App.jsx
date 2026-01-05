import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

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

        {/* Dev Tools */}
        <div className="mt-12 text-center">
          <button 
            onClick={loadSampleData}
            className="text-xs text-gray-400 underline hover:text-gray-600"
          >
            Carregar dados de exemplo
          </button>
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
