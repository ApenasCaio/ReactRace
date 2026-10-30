<p align="center">
  <a href="https://contatocaiomenin.netlify.app">
    <img src="assets/menin-logo.png" alt="Menin Logo" width="100%" />
  </a>
</p>

---

# Personal Project — React Race 🏎️
### React • TypeScript • Phaser 3 • Vite

<p align="center">
  <img alt="Status" src="https://img.shields.io/badge/status-completed-green">
  <img alt="Type" src="https://img.shields.io/badge/type-personal-blue">
</p>

---

## ℹ️ Project Overview

### 📝 Summary
**React Race** is a **local two-player arcade drag-racing game** built with **Phaser 3**, **React**, **TypeScript**, and **Vite**.  
The **Game Display** holds the authoritative race state; the **Race Control** panel receives snapshots via `BroadcastChannel` and uses the last saved snapshot to recover on reconnect.

### 🎯 Purpose
Personal project created to practice and demonstrate knowledge of **Phaser 3** integrated with a **React + TypeScript** frontend, multi-window communication via `BroadcastChannel`, local state persistence, and real-time game mechanics.

### ✨ Keywords
Phaser 3, React, TypeScript, Vite, WebGL, Arcade Game, BroadcastChannel, Local Multiplayer

---

### 🕹️ Implemented Features
- **Garage screen** with a virtual keyboard per player for name entry and car selection (12 cars from a sprite sheet)
- **Traffic-light start sequence** with real-time reaction measurement using `performance.now()`
- False start detection — disqualifies the offending player; double false start ends the race with no winner
- Vertical-scrolling track that advances with the cars
- **5-gear system** — shifting in the yellow RPM band grants a speed boost
- Finish-line detection by the car's logical center
- **VAR review** — post-race interpolated arrival time check with reaction, burn, and shift logs
- `R` for rematch, `G` to return to garage, `F11` for fullscreen, `ESC` to toggle help
- **Race Control panel** — drag to a secondary monitor; opens Game Display in a second window
- Snapshot recovery: Race Control reconnects seamlessly using the last `BroadcastChannel` snapshot
- Unit tests covering monotonic reaction, repeated input, disqualification, winner rule, and restart
- Race results persisted to `localStorage`
- Local build with no remote CDN dependencies — works offline after install/build

---

### ⚡️ Technologies & Versions
- **Phaser 3** — game engine (WebGL/Canvas)
- **React** — UI shell and Race Control panel
- **TypeScript** — static typing throughout
- **Vite** — dev server and bundler
- **BroadcastChannel API** — cross-window state sync
- Main entry: `index.html` → Vite → React + Phaser

---

### 🔧 Development Environment
- Editor: Visual Studio Code
- OS: Windows 10/11
- Runtime: Node.js 20+
- Browser: Chromium / Edge (updated)
- Player 1 keys: `SPACE` to launch, `W` to shift gears
- Player 2 keys: `ENTER` to launch, `↑` to shift gears

---

### 🎓 Technical Notes
- **State Authority**
  - Game Display owns the canonical race state; Race Control is read-only display + input relay
- **BroadcastChannel**
  - Snapshots are sent on every meaningful state change; Race Control stores the latest and replays it on reconnect
- **Reaction Timing**
  - Measured in milliseconds with `performance.now()`; displayed live in Race Control as soon as registered
  - Reaction time is not shown in Game Display during the race (only in Race Control)
- **Physics / Scoring**
  - Race simulated via progress/velocity; valid results are persisted to `localStorage`
  - Pause screen is intentionally not implemented to avoid freezing the start clock
- **Garage Keyboard**
  - Player 1 navigates with `W A S D` and confirms with `SPACE`; Player 2 uses arrow keys and confirms with `ENTER`
  - Players may complete each step at different times; an empty name receives a default only when the race starts

---

### 🚀 How to Run
1. Clone the repository or copy the project files.
2. Open the folder in Visual Studio Code.
3. Install dependencies and start the dev server:
   ```powershell
   npm install
   npm run dev
   ```
4. Open the URL shown by Vite in your browser.
5. Click **Race Control** and drag the panel to your secondary monitor.

> 💡 The browser may block pop-ups — allow pop-ups for `localhost` if the panel doesn't open.  
> To distribute a local build: run `npm run build` then `npm run preview -- --host 0.0.0.0` and open the preview URL on both monitors.  
> Do **not** open `index.html` directly via `file://` — `BroadcastChannel` and `localStorage` require an HTTP(S) origin.

---

## 📂 Repository Structure

```
react-race/
├── assets/               # Images and static assets
│   └── menin-logo.png
├── src/                  # React + TypeScript source
├── public/               # Static public files
├── index.html            # Vite entry point
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── README.md             # Project documentation (EN)
└── README-PT-BR.md       # Project documentation (PT-BR)
```

---

## 📋 License
Feel free to use this project for learning and experimentation.
