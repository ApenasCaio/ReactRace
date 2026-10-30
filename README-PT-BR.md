<p align="center">
  <a href="https://contatocaiomenin.netlify.app">
    <img src="assets/menin-logo.png" alt="Menin Logo" width="100%" />
  </a>
</p>

---

# Projeto Pessoal — React Race 🏎️
### React • TypeScript • Phaser 3 • Vite

<p align="center">
  <img alt="Status" src="https://img.shields.io/badge/status-concluído-green">
  <img alt="Tipo" src="https://img.shields.io/badge/tipo-pessoal-blue">
</p>

---

## ℹ️ Visão Geral do Projeto

### 📝 Resumo
**React Race** é um **jogo arcade local de arrancada para dois jogadores**, feito com **Phaser 3**, **React**, **TypeScript** e **Vite**.  
O **Game Display** mantém o estado autoritativo da corrida; o painel **Race Control** recebe snapshots via `BroadcastChannel` e usa o último snapshot salvo para se recuperar ao reconectar.

### 🎯 Objetivo
Projeto pessoal criado para praticar e demonstrar conhecimentos de **Phaser 3** integrado a um frontend **React + TypeScript**, comunicação entre janelas via `BroadcastChannel`, persistência de estado local e mecânicas de jogo em tempo real.

### ✨ Palavras-chave
Phaser 3, React, TypeScript, Vite, WebGL, Jogo Arcade, BroadcastChannel, Multiplayer Local

---

### 🕹️ Funcionalidades Implementadas
- **Tela de garagem** com teclado virtual por jogador para inserção de nome e seleção de carro (12 carros recortados de sprite sheet)
- **Semáforo de largada** com medição de reação em tempo real usando `performance.now()`
- Detecção de queima de largada — desclassifica o piloto infrator; queimas duplas encerram a corrida sem vencedor
- Pista com **scrolling vertical** que acompanha o avanço dos carros
- **Sistema de 5 marchas** — trocas na faixa amarela do RPM concedem aceleração extra
- Detecção da linha de chegada pelo centro lógico do carro
- **Revisão VAR** — verificação pós-corrida dos tempos interpolados de chegada, queimas, reações e trocas registradas
- `R` para revanche, `G` para voltar à garagem, `F11` para tela cheia, `ESC` para alternar ajuda
- **Painel Race Control** — arraste para monitor secundário; abre o Game Display em outra janela
- Recuperação por snapshot: Race Control reconecta sem perda de estado usando o último snapshot do `BroadcastChannel`
- Testes unitários cobrindo reação monotônica, entrada repetida, desclassificação, regra de vencedor e reinício
- Resultados persistidos no `localStorage`
- Build local sem dependências remotas de CDN — funciona offline após instalação/build

---

### ⚡️ Tecnologias e Versões
- **Phaser 3** — motor de jogo (WebGL/Canvas)
- **React** — shell de UI e painel Race Control
- **TypeScript** — tipagem estática em todo o projeto
- **Vite** — servidor de desenvolvimento e bundler
- **BroadcastChannel API** — sincronização de estado entre janelas
- Ponto de entrada principal: `index.html` → Vite → React + Phaser

---

### 🔧 Ambiente de Desenvolvimento
- Editor: Visual Studio Code
- SO: Windows 10/11
- Runtime: Node.js 20+
- Navegador: Chromium / Edge (atualizado)
- Teclas do Jogador 1: `SPACE` para largar, `W` para trocar marcha
- Teclas do Jogador 2: `ENTER` para largar, `↑` para trocar marcha

---

### 🎓 Notas Técnicas
- **Autoridade de Estado**
  - O Game Display detém o estado canônico da corrida; o Race Control é display de leitura + relay de input
- **BroadcastChannel**
  - Snapshots são enviados a cada mudança relevante de estado; o Race Control armazena o último e o reproduz ao reconectar
- **Medição de Reação**
  - Medida em milissegundos com `performance.now()`; exibida ao vivo no Race Control assim que registrada
  - O tempo de reação não é exibido no Game Display durante a disputa (apenas no Race Control)
- **Física / Pontuação**
  - Corrida simulada por progresso/velocidade; resultados válidos são persistidos no `localStorage`
  - Tela de pausa não implementada intencionalmente para não suspender o relógio da largada
- **Teclado da Garagem**
  - Jogador 1 navega com `W A S D` e confirma com `SPACE`; Jogador 2 usa setas e confirma com `ENTER`
  - Os jogadores podem concluir cada etapa em momentos diferentes; um nome vazio recebe o padrão quando a corrida começa

---

### 🚀 Como Executar
1. Clone o repositório ou copie os arquivos do projeto.
2. Abra a pasta no Visual Studio Code.
3. Instale as dependências e inicie o servidor de desenvolvimento:
   ```powershell
   npm install
   npm run dev
   ```
4. Abra o endereço mostrado pelo Vite no navegador.
5. Clique em **Race Control** e arraste o painel para o monitor secundário.

> 💡 O navegador pode bloquear pop-ups — permita pop-ups para `localhost` se o painel não abrir.  
> Para distribuição local: rode `npm run build` e depois `npm run preview -- --host 0.0.0.0` e abra o endereço de preview nos dois monitores.  
> **Não** abra `index.html` diretamente via `file://` — `BroadcastChannel` e `localStorage` dependem de uma origem HTTP(S).

---

## 📂 Estrutura do Repositório

```
react-race/
├── assets/               # Imagens e arquivos estáticos
│   └── menin-logo.png
├── src/                  # Código-fonte React + TypeScript
├── public/               # Arquivos públicos estáticos
├── index.html            # Ponto de entrada do Vite
├── package.json          # Dependências e scripts
├── vite.config.ts        # Configuração do Vite
├── README.md             # Documentação do projeto (EN)
└── README-PT-BR.md       # Documentação do projeto (PT-BR)
```

---

## 📋 Licença
Sinta-se à vontade para usar este projeto para aprendizado e experimentação.
