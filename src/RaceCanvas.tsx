import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import type { RaceSnapshot } from './types';
import { CAR_SKINS } from './carSkins';

export type RaceTrackId = 'current' | 'classic';

function car(g: Phaser.GameObjects.Graphics, x: number, y: number, color: number, speed: number) {
  if (speed > 0) { g.fillStyle(color, 0.14); g.fillEllipse(x, y + 13, 76, 92); g.lineStyle(2, color, 0.25); g.lineBetween(x - 13, y + 36, x - 13, y + 52 + Math.min(22, speed * .05)); g.lineBetween(x + 13, y + 36, x + 13, y + 52 + Math.min(22, speed * .05)); }
  g.fillStyle(0x070a0c, 1); g.fillRoundedRect(x - 31, y - 28, 62, 63, 11); g.fillStyle(color, 1); g.fillTriangle(x - 25, y - 11, x + 25, y - 11, x, y - 33); g.fillRoundedRect(x - 26, y - 15, 52, 46, 9); g.fillStyle(0xfff0ac, 1); g.fillRect(x - 23, y - 25, 11, 4); g.fillRect(x + 12, y - 25, 11, 4); g.fillStyle(0x9fe4ed, 1); g.fillRoundedRect(x - 17, y - 13, 34, 12, 4); g.fillStyle(0x18242a, 1); g.fillRoundedRect(x - 17, y + 3, 34, 13, 3); g.fillStyle(0x10151a, 1); g.fillRect(x - 30, y - 23, 8, 14); g.fillRect(x + 22, y - 23, 8, 14); g.fillRect(x - 30, y + 12, 8, 14); g.fillRect(x + 22, y + 12, 8, 14); g.fillStyle(0xf34449, 1); g.fillRect(x - 19, y + 25, 8, 3); g.fillRect(x + 11, y + 25, 8, 3); g.fillStyle(0xd8f4f6, 0.75); g.fillRect(x - 4, y - 32, 8, 3);
}

class Track extends Phaser.Scene {
  snapshot: RaceSnapshot | null = null;
  private lastVisualKey = '';
  constructor() { super('track'); }
  preload() { for (const skin of CAR_SKINS) this.load.image(skin.id, `/cars/${skin.id}.png`); this.load.image('react-race-grass', '/grass.jpg'); this.load.image('react-race-street', '/street.jpg'); this.load.image('react-race-street-classic', '/street1.jfif'); this.load.image('react-race-border', '/border-seamless.webp'); }
  create() { this.draw(); this.scale.on('resize', () => { this.lastVisualKey = ''; this.draw(); }); }
  setSnapshot(s: RaceSnapshot) { this.snapshot = s; const key = [s.phase, s.light, s.message, s.winner, s.players.map(p => [p.carSkin, Math.round(p.car.distance * 10000), Math.round(p.car.speed), p.car.gear, Math.round(p.car.rpm * 100), p.car.finishedAt].join(':')).join('|'), s.phase === 'RESULTS' ? s.players.map(p => p.name).join('|') : ''].join(';'); if (key === this.lastVisualKey) return; this.lastVisualKey = key; this.draw(); }
  draw() {
    if (!this.add) return;
    this.children.removeAll();
    const { width: w, height: h } = this.scale;
    const g = this.add.graphics();
    const label = (value: string, x: number, y: number, size: number, color = '#fff', weight = '600', maxWidth?: number) => this.add.text(x, y, value, { fontFamily: 'Consolas, monospace', fontSize: `${size}px`, fontStyle: weight, color, stroke: '#071016', strokeThickness: 2, wordWrap: maxWidth ? { width: maxWidth } : undefined }).setDepth(5);
    const roadLeft = Math.floor(w * .08), roadRight = Math.ceil(w * .92), roadWidth = roadRight - roadLeft;
    const progress = this.snapshot ? Math.max(this.snapshot.players[0].car.distance, this.snapshot.players[1].car.distance) : 0;
    const scrollOffset = progress * h * 5;

    g.fillStyle(0x080e16, 1); g.fillRect(0, 0, w, h);
    g.fillStyle(0x0d1920, 1); g.fillRect(0, 0, roadLeft, h); g.fillRect(roadRight, 0, w - roadRight, h);
    for (let i = 0; i < 22; i++) {
      const y = (i * 97 + scrollOffset * 1.2) % h;
      const leftX = 8 + (i * 43) % (Math.max(14, roadLeft - 24));
      const rightX = roadRight + 10 + (i * 53) % (Math.max(14, w - roadRight - 24));
      const color = i % 2 === 0 ? 0x39d8e1 : 0xf05b78;
      g.fillStyle(0x02070b, 0.8); g.fillRoundedRect(leftX - 2, y - 3, 15 + (i % 3) * 3, 12, 2); g.fillRoundedRect(rightX - 2, y - 3, 15 + (i % 3) * 3, 12, 2);
      g.fillStyle(color, 0.72); g.fillRect(leftX, y, 10 + (i % 3) * 3, 2); g.fillRect(rightX, y, 10 + (i % 3) * 3, 2);
      g.fillStyle(0x8ffcff, 0.28); g.fillRect(leftX + 2, y + 3, 4, 4); g.fillRect(rightX + 2, y + 3, 4, 4);
    }

    g.fillStyle(0x17232b, 1); g.fillRect(roadLeft, 0, roadWidth, h);
    g.fillStyle(0x1d2b33, 0.82); g.fillRect(roadLeft + roadWidth * .015, 0, roadWidth * .47, h); g.fillRect(roadLeft + roadWidth * .515, 0, roadWidth * .47, h);
    g.fillStyle(0x0d171e, 0.84); g.fillRect(roadLeft, 0, roadWidth * .012, h); g.fillRect(roadRight - roadWidth * .012, 0, roadWidth * .012, h);
    g.fillStyle(0x45d9e0, 0.045); g.fillRect(roadLeft + roadWidth * .25, 0, roadWidth * .25, h); g.fillStyle(0xf04e73, 0.035); g.fillRect(roadLeft + roadWidth * .5, 0, roadWidth * .25, h);
    for (let i = 0; i < 95; i++) {
      const x = roadLeft + ((i * 97) % Math.floor(roadWidth - 12)) + 6;
      const y = (i * 137 + scrollOffset * 1.35) % h;
      g.fillStyle(i % 2 === 0 ? 0x83dfe0 : 0x61717b, i % 2 === 0 ? .12 : .1);
      g.fillRect(x, y, 4 + (i % 4) * 3, 1 + (i % 2));
    }
    for (let i = 0; i < 9; i++) {
      const y = (i * (h / 9) + scrollOffset * 1.8) % h;
      g.fillStyle(0x070d12, 0.44); g.fillRect(roadLeft + 8, y, roadWidth - 16, 2);
      g.fillStyle(0x7bd8dc, 0.1); g.fillRect(roadLeft + 8, y + 2, roadWidth - 16, 1);
    }

    g.fillStyle(0x43e5eb, 0.12); g.fillRect(roadLeft - 5, 0, 12, h); g.fillRect(roadRight - 7, 0, 12, h);
    g.fillStyle(0x45dce4, 0.9); g.fillRect(roadLeft, 0, 3, h); g.fillRect(roadRight - 3, 0, 3, h);
    g.fillStyle(0xff5575, 0.62); g.fillRect(roadLeft + 4, 0, 2, h); g.fillRect(roadRight - 6, 0, 2, h);
    for (let i = 0; i < Math.ceil(h / 34) + 1; i++) {
      const y = (i * 34 + scrollOffset * 1.75) % h, curbColor = i % 2 === 0 ? 0x52e2e8 : 0xee5576;
      g.fillStyle(curbColor, 0.84); g.fillRect(roadLeft + 7, y, 5, 19); g.fillRect(roadRight - 12, y, 5, 19);
    }
    g.fillStyle(0xe7f7ed, 0.2); g.fillRect(w * .5 - 1, 0, 2, h);
    for (let i = 0; i < Math.ceil(h / 52) + 1; i++) {
      const y = (i * 52 + scrollOffset * 2) % h;
      g.fillStyle(0xb4e9e8, 0.68); g.fillRoundedRect(w * .5 - 2, y, 4, 25, 2);
    }
    g.fillStyle(0x47cfd6, 0.08); g.fillRect(roadLeft + 13, 0, 7, h); g.fillRect(roadRight - 20, 0, 7, h);

    const startLine = Math.min(h * .68, h - 180), finishLine = h * .14;
    g.fillStyle(0x42e0e7, 0.14); g.fillRect(roadLeft, startLine - 5, roadWidth, 14); g.fillRect(roadLeft, finishLine - 5, roadWidth, 14);
    g.fillStyle(0x071116, 0.88); g.fillRect(roadLeft, startLine - 2, roadWidth, 8); g.fillRect(roadLeft, finishLine - 2, roadWidth, 8);
    g.fillStyle(0xe8faf4, 1); g.fillRect(roadLeft, startLine, roadWidth, 3); g.fillRect(roadLeft, finishLine, roadWidth, 3);
    for (let i = 0; i < Math.ceil(roadWidth / 24); i++) {
      const x = roadLeft + i * 24, color = i % 2 === 0 ? 0x40dbe3 : 0xef5575;
      g.fillStyle(color, 0.9); g.fillRect(x, startLine - 2, 12, 3); g.fillRect(x, finishLine, 12, 3);
    }
    g.fillStyle(0x071116, 0.94); g.fillRoundedRect(roadLeft + 12, startLine - 27, 82, 20, 3);
    g.fillRoundedRect(roadRight - 94, finishLine + 8, 82, 20, 3);
    g.lineStyle(1, 0x48d9e0, 0.86); g.strokeRoundedRect(roadLeft + 12, startLine - 27, 82, 20, 3); g.strokeRoundedRect(roadRight - 94, finishLine + 8, 82, 20, 3);
    label('START', roadLeft + 24, startLine - 24, 10, '#a1ffff', '700');
    label('FINISH', roadRight - 84, finishLine + 10, 10, '#a1ffff', '700');

    const snap = this.snapshot;
    const p1 = snap?.players[0], p2 = snap?.players[1];
    const startCenter = startLine + 58;
    const finishCenter = finishLine;
    const lane1 = w * .31, lane2 = w * .69;
    const y1 = startCenter - (startCenter - finishCenter) * (p1?.car.distance ?? 0);
    const y2 = startCenter - (startCenter - finishCenter) * (p2?.car.distance ?? 0);
    const renderCar = (player: RaceSnapshot['players'][number] | undefined, x: number, y: number, fallbackColor: number) => {
      if (player && this.textures.exists(player.carSkin)) {
        if (player.car.speed > 0) { g.fillStyle(player.id === 1 ? 0xee5362 : 0x42d9e1, 0.13); g.fillEllipse(x, y + 28, 66, 100); g.lineStyle(2, player.id === 1 ? 0xee5362 : 0x42d9e1, 0.24); g.lineBetween(x - 18, y + 52, x - 18, y + 75 + Math.min(24, player.car.speed * .05)); g.lineBetween(x + 18, y + 52, x + 18, y + 75 + Math.min(24, player.car.speed * .05)); }
        this.add.image(x, y, player.carSkin).setOrigin(.5, .5).setDisplaySize(52, 110).setDepth(3);
      } else car(g, x, y, fallbackColor, player?.car.speed ?? 0);
    };
    renderCar(p1, lane1, y1, 0xe64b4b); renderCar(p2, lane2, y2, 0x39c9d5);
    const light = snap?.light ?? 0;
    const boxX = w * .5 - 36, boxY = 14, boxW = 72, boxH = 158;
    g.fillStyle(0x020507, 0.75); g.fillRoundedRect(boxX + 8, boxY + 10, boxW, boxH, 12);
    g.fillStyle(0x10171d, 1); g.fillRoundedRect(boxX, boxY, boxW, boxH, 12);
    g.fillStyle(0x2c3a40, 1); g.fillRoundedRect(boxX + 4, boxY + 4, boxW - 8, boxH - 8, 9);
    g.fillStyle(0x11191e, 1); g.fillRoundedRect(boxX + 10, boxY + 10, boxW - 20, boxH - 20, 8);
    g.fillStyle(0x708087, 0.9); g.fillRoundedRect(boxX + 8, boxY + 7, boxW - 16, 3, 2); g.fillStyle(0x080d11, 1); g.fillRect(boxX + 8, boxY + boxH - 8, boxW - 16, 4);
    g.fillStyle(0x131a1e, 1); g.fillRect(boxX + 12, boxY + boxH, boxW - 24, 13); g.fillStyle(0x3c4d53, 1); g.fillRect(boxX + 17, boxY + boxH + 4, boxW - 34, 2);
    const lampY = [boxY + 25, boxY + 58, boxY + 91, boxY + 124];
    for (let i = 0; i < 4; i++) {
      const green = i === 3 && snap?.phase === 'RACING'; const active = i < 3 ? snap?.phase !== 'RACING' && i < light : green; const color = i === 3 ? 0x49ec78 : 0xffb943; const dark = i === 3 ? 0x163524 : 0x40271a; const cy = lampY[i];
      g.fillStyle(0x030608, 1); g.fillCircle(w * .5 + 1, cy + 2, 13); g.fillStyle(dark, 1); g.fillCircle(w * .5, cy, 12); g.fillStyle(active ? color : (i === 3 ? 0x19502c : 0x74402b), 1); g.fillCircle(w * .5, cy, 9);
      if (active) { g.fillStyle(i === 3 ? 0xcaffd3 : 0xffe3a0, 0.85); g.fillCircle(w * .5 - 3, cy - 3, 3); g.fillStyle(color, 0.2); g.fillCircle(w * .5, cy, 16); }
    }
    if (snap?.phase === 'RESULTS') {
      g.fillStyle(0x05080d, 0.84); g.fillRect(0, 0, w, h);
      label(snap.winner ? `${snap.players[snap.winner - 1].name} VENCEU` : 'DUPLA QUEIMA', w * .27, h * .41, 32, '#f7f0da', '700');
    }
  }
}

class ArcadeTrack extends Track {
  private trackId: RaceTrackId = 'current';
  private base: Phaser.GameObjects.Image | null = null;
  private motion: Phaser.GameObjects.Graphics | null = null;
  private carImages: [Phaser.GameObjects.Image | null, Phaser.GameObjects.Image | null] = [null, null];
  private labels: Phaser.GameObjects.Text[] = [];
  private grassLeft: Phaser.GameObjects.TileSprite | null = null;
  private grassRight: Phaser.GameObjects.TileSprite | null = null;
  private roadSurface: Phaser.GameObjects.TileSprite | null = null;
  private roadBorderLeft: Phaser.GameObjects.TileSprite | null = null;
  private roadBorderRight: Phaser.GameObjects.TileSprite | null = null;
  private startGates: [Phaser.GameObjects.TileSprite | null, Phaser.GameObjects.TileSprite | null] = [null, null];
  private finishGates: [Phaser.GameObjects.TileSprite | null, Phaser.GameObjects.TileSprite | null] = [null, null];
  private signal: Phaser.GameObjects.Graphics | null = null;
  private frameKey = '';
  private startLine = 0;
  private finishLine = 0;

  create() {
    this.motion = this.add.graphics().setDepth(2);
    this.signal = this.add.graphics().setDepth(20);
    this.addCars();
    this.rebuildBase();
    this.scale.on('resize', () => { this.frameKey = ''; this.rebuildBase(); this.draw(); });
  }

  setSnapshot(s: RaceSnapshot) {
    this.snapshot = s;
    const key = [s.phase, s.light, s.winner, s.players.map(p => [p.name, p.carSkin, Math.round(p.car.distance * 10000), p.car.gear, p.car.finishedAt].join(':')).join('|')].join(';');
    if (key === this.frameKey) return;
    this.frameKey = key;
    this.draw();
  }

  setTrack(id: RaceTrackId) { if (this.trackId === id) return; this.trackId = id; const key = id === 'classic' ? 'react-race-street-classic' : 'react-race-street'; this.roadSurface?.setTexture(key); this.draw(); }

  private addCars() {
    if (!this.snapshot) return;
    this.carImages = this.snapshot.players.map(player => this.textures.exists(player.carSkin) ? this.add.image(0, 0, player.carSkin).setOrigin(.5).setDisplaySize(52, 110).setDepth(3) : null) as [Phaser.GameObjects.Image | null, Phaser.GameObjects.Image | null];
  }

  private rebuildBase() {
    if (!this.add) return;
    const { width: w, height: h } = this.scale, roadLeft = Math.floor(w * .08), roadRight = Math.ceil(w * .92), roadWidth = roadRight - roadLeft, key = 'react-race-track-base', grassKey = 'react-race-grass', gateKey = 'react-race-checker-gate';
    if (this.base) { this.base.destroy(); this.base = null; }
    if (this.textures.exists(key)) this.textures.remove(key);
    this.labels.forEach(item => item.destroy()); this.labels = [];
    const g = this.add.graphics();
    g.fillStyle(0x173c29, 1); g.fillRect(0, 0, w, h);
    g.fillStyle(0x252d31, 1); g.fillRect(roadLeft, 0, roadWidth, h);
    g.fillStyle(0x2b3438, .85); g.fillRect(roadLeft + roadWidth * .015, 0, roadWidth * .47, h); g.fillRect(roadLeft + roadWidth * .515, 0, roadWidth * .47, h);
    g.fillStyle(0x151d21, 1); g.fillRect(roadLeft, 0, roadWidth * .012, h); g.fillRect(roadRight - roadWidth * .012, 0, roadWidth * .012, h);
    for (let i = 0; i < 36; i++) {
      const x = roadLeft + ((i * 97) % Math.floor(roadWidth - 12)) + 6, y = (i * 137) % h;
      g.fillStyle(i % 2 === 0 ? 0x657176 : 0x11191d, i % 2 === 0 ? .15 : .2); g.fillRect(x, y, 4 + (i % 3) * 3, 1 + (i % 2));
    }
    const start = Math.min(h * .68, h - 180), finish = Math.max(h * .24, 190); this.startLine = start; this.finishLine = finish;
    g.generateTexture(key, w, h); g.destroy();
    this.base = this.add.image(0, 0, key).setOrigin(0).setDepth(0);
    if (!this.textures.exists(grassKey)) {
      const turf = this.add.graphics(); turf.fillStyle(0x214a32, 1); turf.fillRect(0, 0, 96, 96);
      for (let i = 0; i < 52; i++) { const x = (i * 37) % 96, y = (i * 59) % 96; turf.fillStyle(i % 3 === 0 ? 0x326342 : 0x173d29, i % 3 === 0 ? .76 : .86); turf.fillRect(x, y, 2 + (i % 3), 1 + (i % 2)); }
      turf.generateTexture(grassKey, 96, 96); turf.destroy();
    }
    if (!this.textures.exists(gateKey)) {
      const checker = this.add.graphics();
      for (let row = 0; row < 2; row++)for (let col = 0; col < 4; col++) {
        checker.fillStyle((row + col) % 2 === 0 ? 0xe2e7e2 : 0x182126, 1); checker.fillRect(col * 12, row * 6, 12, 6);
      }
      checker.generateTexture(gateKey, 48, 12); checker.destroy();
    }
    if (!this.grassLeft) this.grassLeft = this.add.tileSprite(0, 0, roadLeft, h, grassKey).setOrigin(0).setDepth(.5); else this.grassLeft.setPosition(0, 0).setSize(roadLeft, h);
    if (!this.grassRight) this.grassRight = this.add.tileSprite(roadRight, 0, w - roadRight, h, grassKey).setOrigin(0).setDepth(.5); else this.grassRight.setPosition(roadRight, 0).setSize(w - roadRight, h);
    this.grassLeft.setTileScale(.32, .32); this.grassRight.setTileScale(.32, .32);
    if (this.textures.exists('react-race-street')) {
      const roadTexture = this.trackId === 'classic' ? 'react-race-street-classic' : 'react-race-street';
      if (!this.roadSurface) this.roadSurface = this.add.tileSprite(roadLeft, 0, roadWidth, h, roadTexture).setOrigin(0).setDepth(.8); else this.roadSurface.setPosition(roadLeft, 0).setSize(roadWidth, h).setTexture(roadTexture);
      this.roadSurface.setTileScale(.25, .25);
    }
    if (this.textures.exists('react-race-border')) {
      const borderWidth = Math.ceil(Math.max(18, roadWidth * .022)), leftBorderX = roadLeft - 1, leftBorderWidth = borderWidth + 1, rightBorderX = roadRight - borderWidth, rightBorderWidth = borderWidth + 2;
      if (!this.roadBorderLeft) this.roadBorderLeft = this.add.tileSprite(leftBorderX, 0, leftBorderWidth, h, 'react-race-border').setOrigin(0).setDepth(1.1); else this.roadBorderLeft.setPosition(leftBorderX, 0).setSize(leftBorderWidth, h);
      if (!this.roadBorderRight) this.roadBorderRight = this.add.tileSprite(rightBorderX, 0, rightBorderWidth, h, 'react-race-border').setOrigin(0).setDepth(1.1); else this.roadBorderRight.setPosition(rightBorderX, 0).setSize(rightBorderWidth, h);
      this.roadBorderLeft.setTileScale(.25, .4); this.roadBorderRight.setTileScale(.25, .4);
    }
    for (let i = 0; i < 2; i++) {
      const trackLeft = i === 0 ? roadLeft : w * .5, trackWidth = roadWidth * .5;
      if (!this.startGates[i]) this.startGates[i] = this.add.tileSprite(trackLeft, start - 6, trackWidth, 12, gateKey).setOrigin(0).setDepth(1.7); else this.startGates[i]!.setPosition(trackLeft, start - 6).setSize(trackWidth, 12);
      if (!this.finishGates[i]) this.finishGates[i] = this.add.tileSprite(trackLeft, finish - 6, trackWidth, 12, gateKey).setOrigin(0).setDepth(1.7); else this.finishGates[i]!.setPosition(trackLeft, finish - 6).setSize(trackWidth, 12);
    }
    this.labels.push(this.add.text(roadLeft + 12, start - 23, 'P01 · START', { fontFamily: 'Consolas, monospace', fontSize: '10px', fontStyle: '700', color: '#ffc2c5', stroke: '#071016', strokeThickness: 2 }).setDepth(2.2));
    this.labels.push(this.add.text(w * .5 + 12, start - 23, 'P02 · START', { fontFamily: 'Consolas, monospace', fontSize: '10px', fontStyle: '700', color: '#b5f4f4', stroke: '#071016', strokeThickness: 2 }).setDepth(2.2));
    this.labels.push(this.add.text(roadLeft + roadWidth * .5 - 70, finish + 10, 'P01 · FINISH', { fontFamily: 'Consolas, monospace', fontSize: '10px', fontStyle: '700', color: '#ffc2c5', stroke: '#071016', strokeThickness: 2 }).setDepth(2.2));
    this.labels.push(this.add.text(roadRight - 70, finish + 10, 'P02 · FINISH', { fontFamily: 'Consolas, monospace', fontSize: '10px', fontStyle: '700', color: '#b5f4f4', stroke: '#071016', strokeThickness: 2 }).setDepth(2.2));
    if (!this.carImages[0] || !this.carImages[1]) this.addCars();
  }

  draw() {
    if (!this.motion) return;
    const g = this.motion, snap = this.snapshot, { width: w, height: h } = this.scale, roadLeft = Math.floor(w * .08), roadRight = Math.ceil(w * .92);
    const distances = snap?.players.map(player => player.car.distance) ?? [0, 0], activeDistances = snap?.players.filter(player => player.car.finishedAt === null).map(player => player.car.distance) ?? [], progress = activeDistances.length === 1 ? activeDistances[0]! : activeDistances.length === 2 ? (activeDistances[0]! + activeDistances[1]!) * .5 : (distances[0]! + distances[1]!) * .5, scroll = progress * h * .35, racing = snap?.phase === 'RACING';
    g.clear();
    this.drawShared(g, snap, w, h, roadLeft, roadRight, scroll, racing, distances);
    this.drawSignal(snap, w);
  }

  private drawShared(g: Phaser.GameObjects.Graphics, snap: RaceSnapshot | null, w: number, h: number, roadLeft: number, roadRight: number, scroll: number, racing: boolean, distances: number[]) {
    this.base?.setVisible(true); this.grassLeft?.setVisible(true); this.grassRight?.setVisible(true);
    if (this.grassLeft) this.grassLeft.tilePositionY = Math.round(scroll); if (this.grassRight) this.grassRight.tilePositionY = Math.round(scroll);
    if (this.roadSurface) { this.roadSurface.setVisible(true); this.roadSurface.tilePositionY = Math.round(scroll); }
    if (this.roadBorderLeft) { this.roadBorderLeft.setVisible(true); this.roadBorderLeft.tilePositionY = Math.round(scroll); }
    if (this.roadBorderRight) { this.roadBorderRight.setVisible(true); this.roadBorderRight.tilePositionY = Math.round(scroll); }
    const dashSpacing = 30, dashCount = Math.ceil(h / dashSpacing) + 1, centerX = (roadLeft + roadRight) * .5;
    for (let i = 0; i < dashCount; i++) { const y = (i * dashSpacing + scroll * 1.15) % h; g.fillStyle(0xb9c3c1, .62); g.fillRect(centerX - 2, y, 4, 20); }
    const start = this.startLine || Math.min(h * .68, h - 180), finish = this.finishLine || Math.max(h * .24, 190), startCenter = start + 58, laneXs = [w * .31, w * .69], laneLeft = [roadLeft, w * .5];
    const r1 = snap?.players[0].car.reactionMs, r2 = snap?.players[1].car.reactionMs, launchedTogether = racing && r1 !== null && r1 !== undefined && r2 !== null && r2 !== undefined && Math.abs(r1 - r2) <= 40, sharedProgress = (distances[0]! + distances[1]!) * .5, lineProgress = launchedTogether ? [sharedProgress, sharedProgress] : distances, showStart = snap?.phase === 'READY' || snap?.phase === 'COUNTDOWN' || racing;
    for (let i = 0; i < 2; i++) {
      const lineDistance = lineProgress[i]!, startY = start + (racing ? lineDistance * h * 1.6 : 0), finishY = finish - (1 - lineDistance) * Math.min(h * .28, 200), finished = snap?.players[i]?.car.finishedAt !== null && snap?.players[i]?.car.finishedAt !== undefined, finishVisible = (racing && lineDistance >= .12 && finishY + 12 > 0) || (snap?.phase === 'RESULTS' && finished);
      this.startGates[i]?.setPosition(laneLeft[i]!, startY - 6).setVisible(showStart && startY < h + 12);
      this.finishGates[i]?.setPosition(laneLeft[i]!, finishY - 6).setVisible(finishVisible);
      this.labels[i]?.setPosition(laneLeft[i]! + 12, startY - 23).setVisible(showStart && startY < h + 32);
      this.labels[i + 2]?.setPosition(laneLeft[i]! + (roadRight - roadLeft) * .5 - 70, finishY + 10).setVisible(finishVisible);
    }
    snap?.players.forEach((player, index) => {
      const y = startCenter - (startCenter - finish) * player.car.distance, x = laneXs[index], image = this.ensureCar(index, player, x, y, Math.max(28, Math.min(52, w * .035)));
      if (image) image.setPosition(x, y).setVisible(true); else car(g, x, y, index === 0 ? 0xe64b4b : 0x39c9d5, player.car.speed);
      if (player.car.speed > 0) { const color = index === 0 ? 0xee5362 : 0x42d9e1; g.fillStyle(color, .1); g.fillEllipse(x, y + 32, 50, 70); }
    });
  }

  private ensureCar(index: number, player: RaceSnapshot['players'][number], x: number, y: number, width: number) {
    if (!this.carImages[index] && this.textures.exists(player.carSkin)) this.carImages[index] = this.add.image(x, y, player.carSkin).setOrigin(.5).setDepth(3);
    const image = this.carImages[index]; if (image && this.textures.exists(player.carSkin) && image.texture.key !== player.carSkin) image.setTexture(player.carSkin); image?.setDisplaySize(width, width * 2.115); return image;
  }

  private drawSignal(snap: RaceSnapshot | null, w: number) {
    const g = this.signal; if (!g) return; g.clear();
    const scale = Math.max(.55, Math.min(1.15, w / 1280)), boxW = 258 * scale, boxH = 94 * scale, boxX = w * .5 - boxW * .5, boxY = 8 * scale, centerY = boxY + 56 * scale;
    g.fillStyle(0x030608, 1); g.fillRoundedRect(boxX + 7 * scale, boxY + 8 * scale, boxW, boxH, 10 * scale); g.fillStyle(0x151d20, 1); g.fillRoundedRect(boxX, boxY, boxW, boxH, 9 * scale); g.fillStyle(0x68777a, 1); g.fillRoundedRect(boxX + 3 * scale, boxY + 3 * scale, boxW - 6 * scale, boxH - 6 * scale, 7 * scale); g.fillStyle(0x293539, 1); g.fillRoundedRect(boxX + 8 * scale, boxY + 8 * scale, boxW - 16 * scale, boxH - 16 * scale, 5 * scale); g.fillStyle(0x9aa8a5, 1); g.fillRect(boxX + 11 * scale, boxY + 6 * scale, boxW - 22 * scale, 3 * scale); g.fillStyle(0x11191c, 1); g.fillRect(boxX + 13 * scale, boxY + boxH - 8 * scale, boxW - 26 * scale, 5 * scale);
    g.fillStyle(0x343f42, 1); g.fillRect(boxX + 34 * scale, boxY - 8 * scale, 12 * scale, 10 * scale); g.fillRect(boxX + boxW - 46 * scale, boxY - 8 * scale, 12 * scale, 10 * scale); g.fillStyle(0x96a19d, 1); g.fillRect(boxX + 36 * scale, boxY - 8 * scale, 3 * scale, 8 * scale); g.fillRect(boxX + boxW - 44 * scale, boxY - 8 * scale, 3 * scale, 8 * scale);
    const light = snap?.light ?? 0, countdown = snap?.phase === 'READY' || snap?.phase === 'COUNTDOWN', falseStartResult = snap?.phase === 'RESULTS' && !!snap.lastResult?.falseStarts.some(Boolean), green = (snap?.phase === 'RACING') || (snap?.phase === 'RESULTS' && !falseStartResult && snap.players.every(player => player.car.finishedAt !== null)), lampXs = [boxX + 48 * scale, boxX + boxW * .5, boxX + boxW - 48 * scale];
    for (let i = 0; i < 3; i++) {
      const activeGreen = green, activeRed = falseStartResult, activeAmber = countdown && i < light, color = activeGreen ? 0x49dc68 : activeRed ? 0xf0443e : activeAmber ? 0xffb541 : 0xe44738, shade = activeGreen ? 0x174b29 : activeRed ? 0x581d1b : activeAmber ? 0x593714 : 0x591d1b, x = lampXs[i]!;
      g.fillStyle(0x071013, 1); g.fillCircle(x + 2 * scale, centerY + 3 * scale, 35 * scale); g.fillStyle(0x11191c, 1); g.fillCircle(x, centerY + 1 * scale, 34 * scale); g.fillStyle(0x778482, 1); g.fillCircle(x, centerY, 31 * scale); g.fillStyle(0x303b3d, 1); g.fillCircle(x, centerY, 27 * scale); g.fillStyle(shade, 1); g.fillCircle(x, centerY, 23 * scale);
      g.fillStyle(color, 1); g.fillCircle(x, centerY, 19 * scale); g.fillStyle(activeGreen ? 0x8aff9d : activeRed ? 0xff8571 : activeAmber ? 0xffdc76 : 0xf46b50, 1); g.fillCircle(x - 3 * scale, centerY - 4 * scale, 13 * scale); g.fillStyle(activeGreen ? 0xbaffc1 : activeRed ? 0xffb29d : activeAmber ? 0xffefaa : 0xff9a6d, .92); g.fillRect(x - 9 * scale, centerY - 13 * scale, 7 * scale, 4 * scale); g.fillRect(x + 4 * scale, centerY - 11 * scale, 5 * scale, 3 * scale); g.fillRect(x - 13 * scale, centerY - 5 * scale, 3 * scale, 6 * scale);
    }
  }
}

export function RaceCanvas({ snapshot, trackId = 'current' }: { snapshot: RaceSnapshot; trackId?: RaceTrackId }) {
  const host = useRef<HTMLDivElement>(null); const scene = useRef<ArcadeTrack | null>(null);
  useEffect(() => { if (!host.current) return; const track = new ArcadeTrack(); scene.current = track; const game = new Phaser.Game({ type: Phaser.CANVAS, parent: host.current, width: 1280, height: 720, backgroundColor: '#12191c', pixelArt: true, antialias: false, scene: [track], scale: { mode: Phaser.Scale.RESIZE, autoCenter: Phaser.Scale.CENTER_BOTH } }); return () => { scene.current = null; game.destroy(true); }; }, []);
  useEffect(() => scene.current?.setSnapshot(snapshot), [snapshot]);
  useEffect(() => scene.current?.setTrack(trackId), [trackId]);
  return <div className="game-canvas" ref={host} aria-label="Pista de corrida arcade" />;
}
