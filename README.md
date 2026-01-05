# Reading Tracker 📚

Um Progressive Web App (PWA) mobile-first para rastrear sessões de leitura, visualizar progresso e manter a consistência.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Funcionalidades

- **Cronômetro de Leitura**: Inicie e pare sessões de leitura facilmente.
- **Registro de Páginas**: Ao finalizar, registre quantas páginas leu e adicione notas.
- **Heatmap de Consistência**: Visualize seus dias de leitura em um gráfico estilo GitHub.
- **Dashboard**: Métricas de velocidade (páginas/minuto), total de tempo e páginas lidas.
- **Offline First**: Funciona offline (PWA).
- **Dados Locais**: Seus dados ficam salvos no seu navegador (LocalStorage).

## Tecnologias

- React + Vite
- Tailwind CSS
- react-calendar-heatmap
- date-fns
- uuid

## Como Rodar Localmente

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Abra o navegador no endereço indicado (geralmente `http://localhost:5173`).

## Estrutura do Projeto

- `src/components`: Componentes React (Timer, Dashboard, Heatmap, etc).
- `src/services`: Lógica de armazenamento (LocalStorage).
- `src/utils.js`: Funções auxiliares de cálculo de tempo e formatação.
- `src/data`: Gerador de dados de exemplo.

## PWA

O aplicativo é configurado como um PWA. Em dispositivos móveis, você pode usar a opção "Adicionar à Tela Inicial" do navegador para instalar o app como se fosse nativo.
