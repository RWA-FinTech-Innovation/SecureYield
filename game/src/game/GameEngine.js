import {
  MAP_TILES,
  MAP_W,
  MAP_H,
  TILE,
  TILE_SIZE,
  GATE_SITES,
  DECOY_HOUSES,
  PLAYER_SPAWN,
  SPAWN_FLAG_TILE,
  isWalkable,
  worldToTile,
  getInteractWorld,
  isOnQuestDoor,
} from '../data/map.js';
import { drawTile, drawPlayer, drawStartFlag } from './sprites.js';
import { drawBuilding, drawBuildingLabel, drawNormalHouse } from './buildings.js';
import { STAGES } from '../data/quests.js';

const PLAYER_SPEED = 3.2;

export class GameEngine {
  constructor(canvas, callbacks = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.callbacks = callbacks;
    this.keys = {};
    this.player = {
      x: 3 * TILE_SIZE + TILE_SIZE / 2,
      y: 14 * TILE_SIZE + TILE_SIZE / 2,
    };
    this.camera = { x: 0, y: 0 };
    this.tick = 0;
    this.stage = 0;
    this.clearedStages = new Set();
    this.running = false;
    this.rafId = null;

    this._onKeyDown = (e) => {
      this.keys[e.code] = true;
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }
      if (e.code === 'Space') this.callbacks.onInteract?.();
    };
    this._onKeyUp = (e) => {
      this.keys[e.code] = false;
    };

    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('keyup', this._onKeyUp);
  }

  setStage(stage) {
    this.stage = stage;
  }

  setCleared(stages) {
    this.clearedStages = new Set(stages);
  }

  teleportToGate(stageId) {
    const pos = getInteractWorld(stageId);
    if (!pos) return;
    this.player.x = pos.x;
    this.player.y = pos.y;
  }

  teleportToSpawn() {
    this.player.x = PLAYER_SPAWN.x * TILE_SIZE + TILE_SIZE / 2;
    this.player.y = PLAYER_SPAWN.y * TILE_SIZE + TILE_SIZE / 2;
  }

  isOnCurrentDoor() {
    return isOnQuestDoor(this.player.x, this.player.y, this.stage);
  }

  getNearestGate() {
    return this.isOnCurrentDoor() ? this.stage : null;
  }

  isNearDecoyHouse() {
    const { tx, ty } = worldToTile(this.player.x, this.player.y);
    for (const d of DECOY_HOUSES) {
      if (tx >= d.x && tx < d.x + 2 && ty >= d.y && ty < d.y + 2) return true;
    }
    return false;
  }

  resize() {
    const parent = this.canvas.parentElement;
    if (!parent) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    this.canvas.width = w * dpr;
    this.canvas.height = h * dpr;
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.viewW = w;
    this.viewH = h;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.resize();
    const loop = () => {
      if (!this.running) return;
      this.update();
      this.render();
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  stop() {
    this.running = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  destroy() {
    this.stop();
    window.removeEventListener('keydown', this._onKeyDown);
    window.removeEventListener('keyup', this._onKeyUp);
  }

  update() {
    this.tick++;
    let dx = 0;
    let dy = 0;
    if (this.keys.KeyW || this.keys.ArrowUp) dy -= 1;
    if (this.keys.KeyS || this.keys.ArrowDown) dy += 1;
    if (this.keys.KeyA || this.keys.ArrowLeft) dx -= 1;
    if (this.keys.KeyD || this.keys.ArrowRight) dx += 1;
    if (dx !== 0 || dy !== 0) {
      const len = Math.hypot(dx, dy) || 1;
      dx = (dx / len) * PLAYER_SPEED;
      dy = (dy / len) * PLAYER_SPEED;
      this.tryMove(dx, 0);
      this.tryMove(0, dy);
    }

    const mapW = MAP_W * TILE_SIZE;
    const mapH = MAP_H * TILE_SIZE;
    this.camera.x = Math.max(0, Math.min(mapW - this.viewW, this.player.x - this.viewW / 2));
    this.camera.y = Math.max(0, Math.min(mapH - this.viewH, this.player.y - this.viewH / 2));

    this.callbacks.onProximity?.(this.getNearestGate());
  }

  tryMove(dx, dy) {
    const nextX = this.player.x + dx;
    const nextY = this.player.y + dy;
    const margin = 8;
    const corners = [
      [nextX - margin, nextY - margin],
      [nextX + margin, nextY - margin],
      [nextX - margin, nextY + margin],
      [nextX + margin, nextY + margin],
    ];
    for (const [wx, wy] of corners) {
      const { tx, ty } = worldToTile(wx, wy);
      if (ty < 0 || ty >= MAP_H || tx < 0 || tx >= MAP_W) return;
      const tile = MAP_TILES[ty][tx];
      if (!isWalkable(tile, tx, ty)) return;
    }
    this.player.x = nextX;
    this.player.y = nextY;
  }

  render() {
    const ctx = this.ctx;
    const { viewW, viewH, camera, tick } = this;

    ctx.fillStyle = '#0a1518';
    ctx.fillRect(0, 0, viewW, viewH);

    ctx.save();
    ctx.translate(-camera.x, -camera.y);

    const startTx = Math.max(0, Math.floor(camera.x / TILE_SIZE) - 1);
    const endTx = Math.min(MAP_W, Math.ceil((camera.x + viewW) / TILE_SIZE) + 1);
    const startTy = Math.max(0, Math.floor(camera.y / TILE_SIZE) - 1);
    const endTy = Math.min(MAP_H, Math.ceil((camera.y + viewH) / TILE_SIZE) + 1);

    for (let ty = startTy; ty < endTy; ty++) {
      for (let tx = startTx; tx < endTx; tx++) {
        drawTile(ctx, MAP_TILES[ty][tx], tx, ty, TILE_SIZE, tick);
      }
    }

    const decoys = DECOY_HOUSES.filter(
      (d) => d.x + 2 >= startTx && d.x < endTx && d.y + 2 >= startTy && d.y < endTy,
    );
    for (const d of decoys) {
      drawNormalHouse(ctx, d.x, d.y, TILE_SIZE, d.variant);
    }

    const { x: fx, y: fy } = SPAWN_FLAG_TILE;
    if (fx + 1 >= startTx && fx < endTx && fy + 1 >= startTy && fy < endTy) {
      drawStartFlag(ctx, fx, fy, TILE_SIZE, tick);
    }

    const sites = Object.values(GATE_SITES).sort(
      (a, b) => a.anchor.y + a.anchor.x * 0.01 - (b.anchor.y + b.anchor.x * 0.01),
    );

    for (const site of sites) {
      const stage = STAGES[site.stageId];
      const active = this.stage === site.stageId;
      const cleared = this.clearedStages.has(site.stageId);
      const unlocked = site.stageId <= this.stage || cleared;

      drawBuilding(ctx, site.type, site.anchor.x, site.anchor.y, TILE_SIZE, tick, {
        active,
        cleared,
        color: stage?.color ?? '#fff',
      });

      const label = unlocked ? site.label : '???';
      const labelColor = unlocked ? (stage?.color ?? '#fff') : '#555';
      drawBuildingLabel(
        ctx,
        site.anchor.x,
        site.anchor.y,
        TILE_SIZE,
        label,
        labelColor,
        active,
        site.type,
      );

      const { x: dx, y: dy } = site.door;
      if (dx >= startTx && dx < endTx && dy >= startTy && dy < endTy) {
        drawTile(ctx, TILE.GATE, dx, dy, TILE_SIZE, tick);
        if (active) {
          ctx.strokeStyle = '#a9f00f';
          ctx.lineWidth = 2;
          ctx.strokeRect(dx * TILE_SIZE + 4, dy * TILE_SIZE + 4, TILE_SIZE - 8, TILE_SIZE - 8);
        }
      }
    }

    drawPlayer(ctx, this.player.x, this.player.y, TILE_SIZE, tick);
    ctx.restore();

    const g = ctx.createRadialGradient(viewW / 2, viewH / 2, viewH * 0.2, viewW / 2, viewH / 2, viewH * 0.75);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(1, 'rgba(10,21,24,0.45)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, viewW, viewH);
  }
}
