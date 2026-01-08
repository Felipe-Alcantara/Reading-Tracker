import React from 'react';
import { X, Download, Share2, MessageCircle } from 'lucide-react';

export default function ShareModal({ isOpen, onClose, onDownload, onCopyImage, imageBlob, session }) {
  if (!isOpen) return null;

  const handleWhatsApp = () => {
    const text = `📚 Acabei de ler ${session.book}!\n${session.pages > 0 ? `📖 ${session.pages} páginas` : ''}${session.duration_min > 0 ? ` • ⏱️ ${Math.floor(session.duration_min / 60)}h${session.duration_min % 60}m` : ''}${session.pagesPerMin > 0 ? ` • ⚡ ${session.pagesPerMin.toFixed(2)} pág/min` : ''}\n\n#ReadingTracker`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleTwitter = () => {
    const text = `📚 Sessão de leitura: ${session.book}\n${session.pages > 0 ? `📖 ${session.pages} páginas` : ''}${session.duration_min > 0 ? ` • ⏱️ ${Math.floor(session.duration_min / 60)}h${session.duration_min % 60}m` : ''}${session.pagesPerMin > 0 ? ` • ⚡ ${session.pagesPerMin.toFixed(2)} pág/min` : ''}\n\n#ReadingTracker #Leitura`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleInstagram = async () => {
    await onDownload();
    alert('📸 Imagem baixada!\n\nAbra o Instagram e faça upload da imagem que acabou de ser baixada para criar seu post ou story! 🎨');
  };

  const handleCopy = async () => {
    try {
      await onCopyImage();
      alert('✅ Imagem copiada!\n\nVocê pode colar (Ctrl+V) em qualquer aplicativo.');
    } catch (error) {
      alert('❌ Seu navegador não suporta copiar imagens.\n\nUse a opção "Baixar Imagem" e faça upload manualmente.');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 dark:bg-black/75 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-brand-50 dark:bg-gray-900 p-6 border-b border-brand-100 dark:border-gray-700 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Share2 className="w-5 h-5 text-brand-600 dark:text-brand-500" />
              Compartilhar Sessão
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Escolha como deseja compartilhar</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/50 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          <button
            onClick={onDownload}
            className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
          >
            <Download className="w-5 h-5" />
            <div className="text-left flex-1">
              <div className="font-semibold">Baixar Imagem</div>
              <div className="text-xs text-white/80">Salvar PNG no seu dispositivo</div>
            </div>
          </button>

          <button
            onClick={handleCopy}
            className="w-full flex items-center gap-3 p-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <div className="text-left flex-1">
              <div className="font-semibold">Copiar Imagem</div>
              <div className="text-xs opacity-70">Colar em qualquer app</div>
            </div>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleWhatsApp}
              className="flex flex-col items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl transition-all border border-green-200 dark:border-green-900/30"
            >
              <MessageCircle className="w-6 h-6" />
              <div className="text-sm font-semibold">WhatsApp</div>
            </button>

            <button
              onClick={handleTwitter}
              className="flex flex-col items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-xl transition-all border border-blue-200 dark:border-blue-900/30"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <div className="text-sm font-semibold">Twitter/X</div>
            </button>
          </div>

          <button
            onClick={handleInstagram}
            className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white rounded-xl transition-all"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <div className="text-left flex-1">
              <div className="font-semibold">Instagram</div>
              <div className="text-xs text-white/80">Post ou Story</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
