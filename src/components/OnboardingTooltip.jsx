import React, { useEffect, useState } from 'react';
import { HelpCircle, X } from 'lucide-react';

export default function OnboardingTooltip({ onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Pequeno delay para animação suave
    setTimeout(() => setIsVisible(true), 300);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <>
      {/* Backdrop com blur */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
      />

      {/* Spotlight no botão de ajuda */}
      <div 
        className="fixed bottom-32 right-6 z-50 pointer-events-none"
      >
        {/* Pulso animado ao redor do botão */}
        <div className={`absolute inset-0 w-16 h-16 rounded-full bg-blue-500/30 animate-ping ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
        
        {/* Balão de explicação */}
        <div 
          className={`absolute bottom-20 right-0 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-5 border-2 border-blue-500 transform transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          style={{ pointerEvents: 'auto' }}
        >
          {/* Botão fechar */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>

          {/* Ícone */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Bem-vindo! 👋
            </h3>
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Primeira vez por aqui? Clique no <strong className="text-blue-600 dark:text-blue-400">botão de ajuda</strong> abaixo para ver um guia completo de como usar o Reading Tracker!
          </p>

          <button
            onClick={handleClose}
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-semibold rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Entendi! ✨
          </button>

          {/* Seta apontando para o botão */}
          <div className="absolute -bottom-3 right-6 w-6 h-6 bg-white dark:bg-gray-800 border-r-2 border-b-2 border-blue-500 transform rotate-45" />
        </div>
      </div>
    </>
  );
}
