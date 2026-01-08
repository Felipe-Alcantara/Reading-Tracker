import React from 'react';
import { X, BookOpen, Calendar, TrendingUp, Share2, Download, Upload, Zap, Target, Clock } from 'lucide-react';

export default function HelpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const Section = ({ icon: Icon, title, children }) => (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
        <Icon className="w-5 h-5 text-brand-600 dark:text-brand-500" />
        {title}
      </h3>
      <div className="text-gray-700 dark:text-gray-300 space-y-2">
        {children}
      </div>
    </div>
  );

  const Feature = ({ emoji, title, description }) => (
    <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="text-2xl flex-shrink-0">{emoji}</div>
      <div>
        <div className="font-semibold text-gray-900 dark:text-white">{title}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{description}</div>
      </div>
    </div>
  );

  return (
    <div 
      className="fixed inset-0 bg-black/60 dark:bg-black/75 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-in fade-in duration-300 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-in zoom-in slide-in-from-bottom-4 duration-300 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-600 to-brand-500 p-6 text-white sticky top-0 z-10">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <BookOpen className="w-8 h-8" />
                Guia do Reading Tracker
              </h2>
              <p className="text-brand-100 mt-2">Tudo que você precisa saber para aproveitar ao máximo</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Introdução */}
          <Section icon={Target} title="O que é o Reading Tracker?">
            <p>
              O <strong>Reading Tracker</strong> é sua ferramenta pessoal para acompanhar e analisar seus hábitos de leitura. 
              Registre suas sessões, visualize seu progresso e compartilhe suas conquistas!
            </p>
            <p className="text-sm italic bg-brand-50 dark:bg-brand-900/20 p-3 rounded-lg border-l-4 border-brand-500">
              💡 <strong>Dica:</strong> Todos os dados são salvos localmente no seu navegador. Seus dados são 100% privados!
            </p>
          </Section>

          {/* Funcionalidades */}
          <Section icon={Zap} title="Funcionalidades Principais">
            <div className="grid gap-3">
              <Feature 
                emoji="📝"
                title="Registro Manual"
                description="Adicione sessões com data, livro, páginas e tempo. Todos os campos opcionais (exceto livro)."
              />
              <Feature 
                emoji="📊"
                title="Estatísticas Mensais"
                description="Visualize suas métricas filtradas por mês: páginas, tempo e sessões."
              />
              <Feature 
                emoji="📅"
                title="Calendário Visual"
                description="Acompanhe sua consistência com intensidade de cores por quantidade de leitura."
              />
              <Feature 
                emoji="📖"
                title="Análise por Livro"
                description="Veja estatísticas individuais de cada livro que está lendo."
              />
              <Feature 
                emoji="🎨"
                title="Compartilhamento"
                description="Gere cards bonitos para compartilhar suas sessões nas redes sociais."
              />
            </div>
          </Section>

          {/* Como Usar */}
          <Section icon={Clock} title="Como Usar - Passo a Passo">
            <ol className="list-decimal list-inside space-y-3">
              <li>
                <strong>Adicionar uma Sessão:</strong>
                <ul className="ml-6 mt-1 text-sm space-y-1">
                  <li>• Clique no botão <span className="text-brand-600 dark:text-brand-400">➕</span> grande no canto inferior direito</li>
                  <li>• Preencha os dados da sua sessão (livro é obrigatório)</li>
                  <li>• Adicione notas sobre o que achou (opcional)</li>
                  <li>• Salve e pronto!</li>
                </ul>
              </li>
              <li>
                <strong>Ver Estatísticas:</strong>
                <ul className="ml-6 mt-1 text-sm space-y-1">
                  <li>• No topo, use as setas para navegar entre meses</li>
                  <li>• Veja total de páginas, tempo e sessões do mês</li>
                  <li>• A velocidade mostra sua média geral de leitura</li>
                </ul>
              </li>
              <li>
                <strong>Compartilhar:</strong>
                <ul className="ml-6 mt-1 text-sm space-y-1">
                  <li>• No histórico, passe o mouse (ou clique na tela) sobre uma sessão</li>
                  <li>• Clique em "Compartilhar"</li>
                  <li>• Escolha onde quer postar (WhatsApp, Twitter/X, Instagram) ou baixe a imagem</li>
                </ul>
              </li>
            </ol>
          </Section>

          {/* Sincronização */}
          <Section icon={Upload} title="Sincronizar Entre Dispositivos">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-900/30">
              <p className="font-semibold text-blue-900 dark:text-blue-200 mb-2">📱 💻 PC ↔ Celular</p>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>No primeiro dispositivo, clique em <strong>"Exportar Backup"</strong></li>
                <li>Transfira o arquivo .json para o outro dispositivo</li>
                <li>No segundo dispositivo, clique em <strong>"Importar Backup"</strong></li>
                <li>O sistema detecta automaticamente duplicatas e mescla os dados!</li>
              </ol>
              <p className="text-xs mt-3 text-blue-700 dark:text-blue-300">
                ✅ Repita sempre que quiser sincronizar. Nenhum dado será perdido!
              </p>
            </div>
          </Section>

          {/* Dicas de Produtividade */}
          <Section icon={TrendingUp} title="Dicas de Produtividade">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <strong>Estabeleça Metas:</strong> Use o calendário para manter consistência. Tente não "quebrar a corrente" de dias lendo!
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <strong>Analise Padrões:</strong> Compare sua velocidade entre livros diferentes para entender seu ritmo.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💾</span>
                <div>
                  <strong>Backup Regular:</strong> Exporte seus dados semanalmente para não perder seu histórico.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✍️</span>
                <div>
                  <strong>Use Notas:</strong> Registre insights e reflexões sobre cada sessão para enriquecer seu histórico e não se esquecer do que leu.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎨</span>
                <div>
                  <strong>Compartilhe Conquistas:</strong> Poste seus cards para competir com seus amigos, mostrar seus progressos e motivar outras pessoas e manter sua motivação!
                </div>
              </div>
            </div>
          </Section>

          {/* Exemplos de Uso */}
          <Section icon={BookOpen} title="Casos de Uso">
            <div className="grid gap-3">
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-900/30">
                <div className="font-semibold text-purple-900 dark:text-purple-200">👨‍🎓 Estudante</div>
                <p className="text-sm text-purple-800 dark:text-purple-300 mt-1">
                  Acompanhe leituras obrigatórias, monitore tempo de estudo e compartilhe progresso com colegas.
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg border border-green-200 dark:border-green-900/30">
                <div className="font-semibold text-green-900 dark:text-green-200">📚 Leitor Ávido</div>
                <p className="text-sm text-green-800 dark:text-green-300 mt-1">
                  Mantenha registro de todos os livros, analise estatísticas e compartilhe resenhas visuais.
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg border border-orange-200 dark:border-orange-900/30">
                <div className="font-semibold text-orange-900 dark:text-orange-200">💼 Profissional</div>
                <p className="text-sm text-orange-800 dark:text-orange-300 mt-1">
                  Rastreie leituras técnicas, crie anotações, meça produtividade e demonstre desenvolvimento contínuo.
                </p>
              </div>
            </div>
          </Section>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              📚 <strong>Reading Tracker</strong> - Construa o hábito da leitura, uma página por vez.
            </p>
            <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-2">
              Tem mais dúvidas? Explore o app e descubra todas as funcionalidades! 🚀
            </p>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 sticky bottom-0">
          <button
            onClick={onClose}
            className="w-full py-3 px-6 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors"
          >
            Entendi! Vamos começar 🎉
          </button>
        </div>
      </div>
    </div>
  );
}
