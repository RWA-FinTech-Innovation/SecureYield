import { PALETTE } from './sprites.js';

/** @typedef {{ w: number, h: number, interactOffset?: { x: number, y: number } }} BuildingMeta */

/** @type {Record<string, BuildingMeta>} */
export const BUILDING_META = {
  wallet: { w: 2, h: 2, interactOffset: { x: 1, y: 1 } },
  wind: { w: 4, h: 3, interactOffset: { x: 2, y: 2 } },
  datacenter: { w: 3, h: 3, interactOffset: { x: 1, y: 2 } },
  mint: { w: 3, h: 3, interactOffset: { x: 1, y: 2 } },
  vault: { w: 3, h: 3, interactOffset: { x: 1, y: 2 } },
  legal: { w: 3, h: 3, interactOffset: { x: 1, y: 2 } },
  finance: { w: 3, h: 4, interactOffset: { x: 1, y: 3 } },
  passport: { w: 2, h: 3, interactOffset: { x: 1, y: 2 } },
};

function rect(ctx, x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), w, h);
}

function drawActiveAura(ctx, bx, by, bw, bh, color, tick, active, cleared) {
  if (!active && !cleared) return;
  const pulse = active ? 0.22 + 0.12 * Math.sin(tick * 0.1) : 0.12;
  ctx.fillStyle = cleared ? PALETTE.accent : color;
  ctx.globalAlpha = pulse;
  ctx.fillRect(bx - 4, by - 4, bw + 8, bh + 6);
  ctx.globalAlpha = 1;
}

/** Wallet kiosk — spawn area */
function drawWalletKiosk(ctx, ax, ay, s, tick, opts) {
  const x = ax * s;
  const y = ay * s;
  const bw = s * 2;
  const bh = s * 2;
  drawActiveAura(ctx, x, y, bw, bh, opts.color, tick, opts.active, opts.cleared);

  rect(ctx, x + 4, y + s * 0.45, s * 1.2, s * 1.1, '#5a6a72');
  rect(ctx, x + 6, y + s * 0.55, s * 0.9, s * 0.35, '#022349');
  rect(ctx, x + 8, y + s * 0.62, s * 0.5, s * 0.2, opts.active ? PALETTE.accent : '#6eb5ff');
  rect(ctx, x + 2, y + s * 1.35, s * 1.6, 6, '#4a5560');
  rect(ctx, x + s * 0.5, y + s * 1.5, 8, 10, '#6eb5ff');
  if (opts.active) {
    rect(ctx, x + s + 2, y + 4, 4, 4, PALETTE.accent);
  }
}

/** Wind farm — Green Power Gate */
function drawWindFarm(ctx, ax, ay, s, tick, opts) {
  const x = ax * s;
  const y = ay * s;
  const bw = s * 4;
  const bh = s * 3;
  drawActiveAura(ctx, x, y, bw, bh, opts.color, tick, opts.active, opts.cleared);

  // Substation
  rect(ctx, x + s * 0.4, y + s * 1.6, s * 1.1, s * 0.9, '#6a6a6a');
  rect(ctx, x + s * 0.55, y + s * 1.75, s * 0.8, s * 0.25, '#3a4a3a');
  if (opts.cleared || opts.active) {
    rect(ctx, x + s * 0.7, y + s * 1.78, 6, 6, PALETTE.accent);
  }

  const drawTurbine = (tx, ty, scale) => {
    const poleH = s * 1.1 * scale;
    const cx = x + tx;
    const cy = y + ty + poleH;
    rect(ctx, cx - 2, cy - poleH, 4, poleH, '#e0e4e8');
    const bladeLen = s * 0.55 * scale;
    const angle = tick * 0.06 + tx * 0.01;
    ctx.save();
    ctx.translate(cx, cy - poleH + 4);
    ctx.rotate(angle);
    ctx.fillStyle = '#f0f4f1';
    ctx.fillRect(-2, -bladeLen, 4, bladeLen);
    ctx.rotate((Math.PI * 2) / 3);
    ctx.fillRect(-2, -bladeLen, 4, bladeLen);
    ctx.rotate((Math.PI * 2) / 3);
    ctx.fillRect(-2, -bladeLen, 4, bladeLen);
    ctx.restore();
    rect(ctx, cx - 3, cy - poleH, 6, 6, '#c0c8d0');
  };

  drawTurbine(s * 2.8, s * 0.2, 1.15);
  drawTurbine(s * 1.2, s * 0.55, 0.85);
  drawTurbine(s * 3.5, s * 0.75, 0.7);

  // Power line hint
  rect(ctx, x + s * 1.2, y + s * 1.45, s * 2, 2, '#8b9098');
}

/** AI compute datacenter */
function drawDatacenter(ctx, ax, ay, s, tick, opts) {
  const x = ax * s;
  const y = ay * s;
  const bw = s * 3;
  const bh = s * 3;
  drawActiveAura(ctx, x, y, bw, bh, opts.color, tick, opts.active, opts.cleared);

  rect(ctx, x + 6, y + s * 0.35, s * 2.2, s * 2.2, '#3d4550');
  rect(ctx, x + 10, y + s * 0.5, s * 1.5, s * 1.9, '#2a3238');
  // Server window grid
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const lit = ((tick >> 2) + row + col) % 3 !== 0;
      rect(
        ctx,
        x + 14 + col * 10,
        y + s * 0.65 + row * 12,
        6,
        8,
        lit ? (opts.active ? PALETTE.accent : '#7cfc00') : '#1a2228',
      );
    }
  }
  // Cooling units on roof
  rect(ctx, x + 12, y + s * 0.2, 10, 8, '#5a6268');
  rect(ctx, x + 28, y + s * 0.15, 14, 10, '#5a6268');
  // Antenna
  rect(ctx, x + s * 1.4, y + 4, 3, 14, '#888');
  if (opts.active) {
    ctx.fillStyle = PALETTE.accent;
    ctx.globalAlpha = 0.5 + 0.3 * Math.sin(tick * 0.15);
    ctx.beginPath();
    ctx.arc(x + s * 1.4 + 1, y + 2, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

/** Compute token mint */
function drawMint(ctx, ax, ay, s, tick, opts) {
  const x = ax * s;
  const y = ay * s;
  drawActiveAura(ctx, x, y, s * 3, s * 3, opts.color, tick, opts.active, opts.cleared);

  rect(ctx, x + 8, y + s * 0.9, s * 2, s * 1.6, '#6a5a40');
  rect(ctx, x + 12, y + s * 0.5, s * 1.5, s * 0.55, '#8a7a55');
  // Chimney + token spark
  rect(ctx, x + s * 2.1, y + s * 0.25, 8, 12, '#555');
  if (opts.active) {
    rect(ctx, x + s * 2.2, y + s * 0.1 - (tick % 8), 4, 4, '#ffd166');
  }
  // Token hex on facade
  const cx = x + s * 1.35;
  const cy = y + s * 1.45;
  ctx.fillStyle = '#ffd166';
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    const px = cx + Math.cos(a) * 14;
    const py = cy + Math.sin(a) * 14;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  rect(ctx, cx - 4, cy - 3, 8, 6, '#3a3020');
}

/** Evidence vault */
function drawVault(ctx, ax, ay, s, tick, opts) {
  const x = ax * s;
  const y = ay * s;
  drawActiveAura(ctx, x, y, s * 3, s * 3, opts.color, tick, opts.active, opts.cleared);

  rect(ctx, x + 4, y + s * 0.4, s * 2.6, s * 2.3, '#4a4e5a');
  rect(ctx, x + 8, y + s * 0.55, s * 2, s * 2, '#353945');
  // Vault door
  rect(ctx, x + s * 0.85, y + s * 1.1, s * 1.1, s * 1.1, '#2a2e38');
  rect(ctx, x + s * 1.15, y + s * 1.35, 12, 12, '#c77dff');
  ctx.strokeStyle = opts.cleared ? PALETTE.accent : '#c77dff';
  ctx.lineWidth = 2;
  ctx.strokeRect(x + s * 0.85, y + s * 1.1, s * 1.1, s * 1.1);
  // Five layers bars
  for (let i = 0; i < 5; i++) {
    rect(ctx, x + 10 + i * 14, y + s * 0.48, 8, 4, i <= (opts.cleared ? 4 : opts.active ? 2 : 0) ? '#c77dff' : '#555');
  }
}

/** HK Legal — courthouse */
function drawLegal(ctx, ax, ay, s, tick, opts) {
  const x = ax * s;
  const y = ay * s;
  drawActiveAura(ctx, x, y, s * 3, s * 3, opts.color, tick, opts.active, opts.cleared);

  // Steps & columns
  rect(ctx, x + 6, y + s * 2, s * 2.2, 10, '#9a9aa5');
  rect(ctx, x + 10, y + s * 0.55, s * 1.8, s * 1.55, '#d8dce0');
  rect(ctx, x + 12, y + s * 0.35, s * 1.5, 12, '#e8ecef');
  rect(ctx, x + 14, y + s * 0.2, s * 1.2, 10, '#f0f4f1');
  // Columns
  rect(ctx, x + 12, y + s * 0.7, 6, s * 1.2, '#f5f5f5');
  rect(ctx, x + s * 2.2, y + s * 0.7, 6, s * 1.2, '#f5f5f5');
  // Bauhinia / HK accent (magenta flower pixel)
  rect(ctx, x + s * 1.35, y + s * 0.42, 10, 10, '#ff6b9d');
  rect(ctx, x + s * 1.45, y + s * 0.5, 6, 6, '#ff8fb3');
  // Scales of justice
  rect(ctx, x + s * 0.55, y + s * 1.15, 4, 16, '#c9a227');
  rect(ctx, x + s * 0.35, y + s * 1.1, 12, 4, '#c9a227');
}

/** RWA Finance tower */
function drawFinance(ctx, ax, ay, s, tick, opts) {
  const x = ax * s;
  const y = ay * s;
  drawActiveAura(ctx, x, y, s * 3, s * 4, opts.color, tick, opts.active, opts.cleared);

  rect(ctx, x + 12, y + s * 1.2, s * 1.4, s * 2.5, '#3a5a62');
  rect(ctx, x + 16, y + s * 0.5, s * 1, s * 3.2, '#4ecdc4');
  rect(ctx, x + 18, y + s * 0.25, s * 0.7, 12, '#5ee0d7');
  // Windows
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 2; col++) {
      rect(ctx, x + 20 + col * 12, y + s * 0.65 + row * 14, 6, 8, ((tick + row) % 4 < 2) ? '#a8fff8' : '#2a4a4a');
    }
  }
  // Chart arrow on top
  rect(ctx, x + s * 1.1, y + 8, 4, 12, PALETTE.accent);
  rect(ctx, x + s * 1.2, y + 4, 12, 4, PALETTE.accent);
  rect(ctx, x + s * 0.7, y + s * 3.5, s * 1.8, 8, '#2a4548');
}

/** RWA Passport monument */
function drawPassport(ctx, ax, ay, s, tick, opts) {
  const x = ax * s;
  const y = ay * s;
  drawActiveAura(ctx, x, y, s * 2, s * 3, opts.color, tick, opts.active, opts.cleared);

  rect(ctx, x + 8, y + s * 2, s * 1.2, 12, '#6a6a70');
  rect(ctx, x + 4, y + s * 1.2, s * 1.8, s * 1.1, '#4a5560');
  rect(ctx, x + 10, y + s * 0.35, s * 1.2, s * 1.2, '#022349');
  rect(ctx, x + 14, y + s * 0.55, s * 0.7, s * 0.75, opts.cleared ? PALETTE.accent : '#f0f4f1');
  if (opts.active || opts.cleared) {
    ctx.fillStyle = PALETTE.accent;
    ctx.globalAlpha = 0.35 + 0.2 * Math.sin(tick * 0.12);
    ctx.beginPath();
    ctx.arc(x + s, y + s * 0.5, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

const DECOY_ROOF = ['#8b4545', '#6a5a8a', '#4a6a8a', '#7a6a4a'];
const DECOY_WALL = ['#c4a882', '#a898b8', '#98a8b8', '#b8a878'];

/** Small homestead on grass (not a quest site) */
export function drawNormalHouse(ctx, tx, ty, tileSize, variant) {
  const x = tx * tileSize;
  const y = ty * tileSize;
  const s = tileSize;
  const v = variant % 4;
  rect(ctx, x + 4, y + s * 0.55, s - 8, s * 0.38, DECOY_WALL[v]);
  rect(ctx, x + 6, y + s * 0.2, s - 12, s * 0.42, DECOY_ROOF[v]);
  rect(ctx, x + s * 0.35, y + s * 0.65, s * 0.22, s * 0.22, '#3a3028');
  rect(ctx, x + s * 0.62, y + s * 0.62, 5, 5, '#6eb5ff');
}

const DRAWERS = {
  wallet: drawWalletKiosk,
  wind: drawWindFarm,
  datacenter: drawDatacenter,
  mint: drawMint,
  vault: drawVault,
  legal: drawLegal,
  finance: drawFinance,
  passport: drawPassport,
};

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {string} type
 * @param {number} anchorX tile
 * @param {number} anchorY tile
 * @param {number} tileSize
 * @param {number} tick
 * @param {{ active: boolean, cleared: boolean, color: string, label?: string }} opts
 */
export function drawBuilding(ctx, type, anchorX, anchorY, tileSize, tick, opts) {
  const draw = DRAWERS[type];
  if (!draw) return;
  draw(ctx, anchorX, anchorY, tileSize, tick, opts);
}

export function drawBuildingLabel(ctx, anchorX, anchorY, tileSize, text, color, active, buildingType) {
  const wTiles = BUILDING_META[buildingType]?.w ?? 2;
  const cx = anchorX * tileSize + (wTiles * tileSize) / 2;
  const ty = anchorY * tileSize - 6;
  ctx.font = 'bold 9px Syne, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(10,21,24,0.75)';
  const w = ctx.measureText(text).width + 10;
  ctx.fillRect(cx - w / 2, ty - 10, w, 14);
  ctx.fillStyle = active ? PALETTE.accent : color;
  ctx.fillText(text, cx, ty);
}
