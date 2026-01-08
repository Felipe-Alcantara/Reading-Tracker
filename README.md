# 📚 Reading Tracker

> Acompanhe suas sessões de leitura, monitore seu progresso e construa consistência nos seus estudos.

[![Live Demo](https://img.shields.io/badge/🌐_Demo_Online-felipe--alcantara.github.io%2FReading--Tracker-brightgreen?style=for-the-badge)](https://felipe-alcantara.github.io/Reading-Tracker/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)

---

## 🚀 [**Acesse a Versão Web →**](https://felipe-alcantara.github.io/Reading-Tracker/)

**Reading Tracker** é uma aplicação web moderna e intuitiva para registrar suas sessões de leitura, visualizar estatísticas detalhadas e manter a consistência através de um calendário visual interativo. Todos os dados são armazenados localmente no navegador, garantindo privacidade e funcionamento offline.

---

## ✨ Funcionalidades

### 📝 **Registro Manual de Sessões**
- Adicione sessões de leitura com data, livro, páginas e tempo
- Todos os campos são opcionais (exceto o livro)
- Suporte para múltiplos livros simultaneamente
- Sistema de notas para cada sessão

### 📊 **Dashboard Inteligente**
- Visualização rápida de estatísticas chave
- Total de páginas lidas
- Tempo total investido
- Velocidade média de leitura (páginas/min)
- Número total de sessões

### 📅 **Calendário de Consistência**
- Visualização mensal interativa
- Intensidade de cor baseada na quantidade de leitura
- Navegação rápida entre meses
- Tooltips com detalhes de cada dia

### 📖 **Estatísticas por Livro**
- Progresso individual de cada livro
- Métricas de velocidade e tempo por título
- Comparação visual entre diferentes obras

### 💾 **Gerenciamento de Dados**
- Exportação/importação de backup (JSON)
- Dados de exemplo para testar a aplicação
- Armazenamento 100% local (privacidade garantida)
- Limpeza segura com confirmação

### 🎨 **Interface Moderna**
- Design "Desktop-First" com 3 colunas responsivas
- Modo escuro/claro
- Animações suaves e transições elegantes
- FAB (Floating Action Button) para ações rápidas

---

## 🛠️ Tecnologias

- **[React](https://reactjs.org/)** - Biblioteca JavaScript para interfaces
- **[Vite](https://vitejs.dev/)** - Build tool ultrarrápida
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[date-fns](https://date-fns.org/)** - Manipulação moderna de datas
- **[Lucide React](https://lucide.dev/)** - Ícones SVG otimizados
- **[React Tooltip](https://react-tooltip.com/)** - Tooltips interativos
- **[LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)** - Persistência de dados

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- **Node.js** 18+ e npm instalados

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/felipe-alcantara/Reading-Tracker.git
   cd Reading-Tracker
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Abra no navegador:**
   ```
   http://localhost:5173
   ```

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`.

---

## 📁 Estrutura do Projeto

```
Reading-Tracker/
├── public/              # Arquivos estáticos
│   ├── manifest.json    # PWA manifest
│   └── sw.js            # Service Worker
├── src/
│   ├── components/      # Componentes React
│   │   ├── App.jsx
│   │   ├── BookStats.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Header.jsx
│   │   ├── HeatmapView.jsx
│   │   ├── SessionForm.jsx
│   │   └── SessionList.jsx
│   ├── data/            # Gerador de dados de exemplo
│   ├── services/        # Lógica de negócio
│   │   └── StorageService.js
│   ├── utils.js         # Funções auxiliares
│   ├── index.css        # Estilos globais
│   └── main.jsx         # Entry point
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions para deploy
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## 🌐 Deploy

O projeto está configurado para deploy automático no **GitHub Pages** via **GitHub Actions**.

### Como funciona:
1. Ao fazer push na branch `main`, o workflow é acionado
2. O projeto é buildado automaticamente
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

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

Desenvolvido com ☕ por **Felipe Alcântara**

[![GitHub](https://img.shields.io/badge/GitHub-felipe--alcantara-181717?style=flat-square&logo=github)](https://github.com/felipe-alcantara)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests

---

<div align="center">

**[⬆ Voltar ao topo](#-reading-tracker)**

</div>
