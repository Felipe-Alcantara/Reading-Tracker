# 📚 Reading Tracker

<div align="center">

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Acompanhe suas sessões de leitura, monitore seu progresso e construa consistência nos seus estudos**

[🌐 Demo Online](https://felipe-alcantara.github.io/Reading-Tracker/) • [📖 Funcionalidades](#-funcionalidades) • [🚀 Como Usar](#-como-usar) • [📁 Estrutura](#-estrutura-do-projeto)

</div>

---

## 📋 Índice

- [🌐 **Demo Online**](#-demo-online) ⭐ **DESTAQUE**
- [📋 Sobre o Projeto](#-sobre-o-projeto)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [🚀 Como Usar](#-como-usar)
- [🌐 Deploy](#-deploy)
- [🎯 Roadmap](#-roadmap)
- [📝 Licença](#-licença)
- [👤 Autor](#-autor)

---

## 🌐 Demo Online ⭐

> **🚀 ACESSE A APLICAÇÃO WEB AGORA MESMO**
> 
> **[👉 felipe-alcantara.github.io/Reading-Tracker 👈](https://felipe-alcantara.github.io/Reading-Tracker/)**

### 💡 Por que usar?

- **📱 100% Web**: Funciona direto no navegador, sem instalação
- **🔒 Privacidade Total**: Todos os dados ficam no seu navegador (LocalStorage)
- **🌙 Modo Escuro**: Interface adaptável para leitura confortável
- **📊 Visualização Intuitiva**: Dashboard com estatísticas e calendário de consistência
- **💾 Backup Seguro**: Exporte e importe seus dados em JSON

---

## 📋 Sobre o Projeto

**Reading Tracker** é uma aplicação web moderna e intuitiva desenvolvida em **React** para registrar suas sessões de leitura, visualizar estatísticas detalhadas e manter a consistência através de um **calendário visual interativo** (heatmap). Todos os dados são armazenados localmente no navegador usando **LocalStorage API**, garantindo privacidade total e funcionamento offline.

O projeto utiliza **Vite** como build tool para desenvolvimento ultrarrápido, **Tailwind CSS** para estilização moderna e responsiva, e **date-fns** para manipulação eficiente de datas.

### ✨ **NOVO: Recursos Recentes!**

- ✅ **Modal de Ajuda Interativo**: Tutorial completo integrado na aplicação
- ✅ **Onboarding para Novos Usuários**: Tooltips guiados na primeira visita
- ✅ **Compartilhamento Visual**: Gere cards personalizados das suas estatísticas
- ✅ **Detecção de Duplicatas**: Sistema inteligente ao importar backups
- ✅ **Edição de Sessões**: Atualize registros diretamente na lista

---

## 📁 Estrutura do Projeto

```
Reading-Tracker/
│
├── 📁 public/                    # Arquivos estáticos
│   ├── manifest.json             # PWA manifest
│   └── sw.js                     # Service Worker
│
├── 📁 src/                       # Código-fonte principal
│   ├── 📁 components/            # Componentes React
│   │   ├── App.jsx               # Componente raiz
│   │   ├── BookStats.jsx         # Estatísticas por livro
│   │   ├── Dashboard.jsx         # Cards de métricas
│   │   ├── Header.jsx            # Cabeçalho com tema
│   │   ├── HeatmapView.jsx       # Calendário de consistência
│   │   ├── HelpModal.jsx         # Modal de ajuda
│   │   ├── OnboardingTooltip.jsx # Tutorial inicial
│   │   ├── SessionForm.jsx       # Formulário de sessão
│   │   ├── SessionList.jsx       # Lista de sessões
│   │   ├── ShareCard.jsx         # Card de compartilhamento
│   │   └── ShareModal.jsx        # Modal de compartilhamento
│   │
│   ├── 📁 data/                  # Dados de exemplo
│   │   └── sample-data.js        # Gerador de dados de teste
│   │
│   ├── 📁 services/              # Lógica de negócio
│   │   └── StorageService.js     # Gerenciamento LocalStorage
│   │
│   ├── App.jsx                   # Componente principal
│   ├── utils.js                  # Funções auxiliares
│   ├── index.css                 # Estilos globais + Tailwind
│   └── main.jsx                  # Entry point
│
├── 📁 .github/                   # Configurações GitHub
│   └── 📁 workflows/
│       └── deploy.yml            # CI/CD para GitHub Pages
│
├── index.html                    # HTML raiz
├── package.json                  # Dependências do projeto
├── vite.config.js                # Configuração Vite
├── tailwind.config.js            # Configuração Tailwind
├── postcss.config.js             # Configuração PostCSS
├── LICENSE                       # Licença MIT
└── README.md                     # Este arquivo
```

---

## ✨ Funcionalidades

### 📝 Registro Manual de Sessões

**`SessionForm.jsx`**
- Adicione sessões de leitura com data, livro, páginas e tempo
- Todos os campos são opcionais (exceto o livro)
- Suporte para múltiplos livros simultaneamente
- Sistema de notas para cada sessão
- Exemplo: `"Dom Casmurro" + 20 páginas + 30 min` → `0.67 páginas/min`

---

### 📊 Dashboard Inteligente

**`Dashboard.jsx`**
- Visualização rápida de estatísticas chave em cards
- Total de páginas lidas
- Tempo total investido (em horas)
- Velocidade média de leitura (páginas/min)
- Número total de sessões registradas

---

### 📅 Calendário de Consistência

**`HeatmapView.jsx`**
- Visualização mensal interativa estilo GitHub
- Intensidade de cor baseada na quantidade de leitura
- Navegação rápida entre meses
- Tooltips com detalhes de cada dia ao passar o mouse

---

### 📖 Estatísticas por Livro

**`BookStats.jsx`**
- Progresso individual de cada livro
- Métricas de velocidade e tempo por título
- Comparação visual entre diferentes obras
- Barra de progresso para livros em andamento

---

### 💾 Gerenciamento de Dados

**`StorageService.js`**
- Exportação/importação de backup (JSON)
- Dados de exemplo para testar a aplicação
- Armazenamento 100% local (privacidade garantida)
- Limpeza segura com confirmação
- Detecção automática de duplicatas na importação

---

### 🎨 Interface Moderna

- Design "Desktop-First" com 3 colunas responsivas
- Modo escuro/claro com persistência
- Animações suaves e transições elegantes
- FAB (Floating Action Button) para ações rápidas
- Tooltips interativos com React Tooltip

---

## 🚀 Como Usar

### Opção 1: Acesso Web (Recomendado!) 🌐

**🚀 Link direto:** [felipe-alcantara.github.io/Reading-Tracker](https://felipe-alcantara.github.io/Reading-Tracker/)

Não precisa instalar nada! Acesse direto no navegador e comece a usar.

---

### Opção 2: Desenvolvimento Local

#### Pré-requisitos

- **Node.js** 18+ e npm instalados

#### Instalação

```bash
# Clone o repositório
git clone https://github.com/felipe-alcantara/Reading-Tracker.git

# Entre na pasta
cd Reading-Tracker

# Instale as dependências
npm install
```

#### Executando

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Acesse no navegador
# http://localhost:5173
```

#### Build para Produção

```bash
# Gera build otimizado
npm run build

# Arquivos estarão em dist/
```

---

## 🔧 Tecnologias Utilizadas

- **[React 18.2](https://reactjs.org/)** - Biblioteca JavaScript para interfaces
- **[Vite 5.1](https://vitejs.dev/)** - Build tool ultrarrápida
- **[Tailwind CSS 3.4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[date-fns 3.3](https://date-fns.org/)** - Manipulação moderna de datas
- **[Lucide React](https://lucide.dev/)** - Ícones SVG otimizados
- **[React Tooltip 5.26](https://react-tooltip.com/)** - Tooltips interativos
- **[html2canvas 1.4](https://html2canvas.hertzen.com/)** - Captura de tela para compartilhamento
- **[uuid 9.0](https://github.com/uuidjs/uuid)** - Geração de IDs únicos
- **[LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)** - Persistência de dados

---

## 🌐 Deploy

O projeto está configurado para deploy automático no **GitHub Pages** via **GitHub Actions**.

### Como funciona:

1. Ao fazer push na branch `main`, o workflow é acionado
2. O projeto é buildado automaticamente com `npm run build`
3. O build é implantado no GitHub Pages

### Configuração:

1. Vá em **Settings > Pages** no repositório
2. Em **Build and deployment > Source**, selecione **GitHub Actions**
3. O site estará disponível em: `https://seu-usuario.github.io/Reading-Tracker/`

---

## 🎯 Roadmap

- [ ] PWA completo com instalação offline
- [ ] Gráficos avançados (tendências, projeções)
- [ ] Metas e objetivos de leitura
- [ ] Sincronização na nuvem (opcional)
- [ ] Temas personalizados
- [ ] Exportação em PDF
- [ ] Integração com Goodreads API
- [ ] Estatísticas anuais (Year in Review)

---

## 📝 Licença

Este projeto está sob a licença MIT — veja o arquivo `LICENSE`.

---

## 👤 Autor

**Felipe Alcântara**
- GitHub: [@felipe-alcantara](https://github.com/felipe-alcantara)
- Repositório: [Reading-Tracker](https://github.com/felipe-alcantara/Reading-Tracker)

---

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação
- Enviar pull requests

---

⭐ Se este projeto foi útil, considere dar uma estrela no GitHub!
