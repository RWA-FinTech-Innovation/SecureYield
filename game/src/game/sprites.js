/** Pixel palette — Minecraft-inspired */
export const PALETTE = {
  grassA: '#5d9e3a',
  grassB: '#4a7c2f',
  path: '#8b6914',
  pathDark: '#6b5010',
  water: '#3f76e4',
  waterDeep: '#2a5aa8',
  stone: '#7a7a7a',
  stoneDark: '#5a5a5a',
  accent: '#a9f00f',
  rover: '#f0f4f1',
  roverGlow: '#a9f00f',
  night: '#152025',
};

export function drawTile(ctx, tile, tx, ty, size, tick) {
  const x = tx * size;
  const y = ty * size;
  const checker = (tx + ty) % 2;

  switch (tile) {
    case 0: // grass
      ctx.fillStyle = checker ? PALETTE.grassA : PALETTE.grassB;
      ctx.fillRect(x, y, size, size);
      if (checker && (tx * 7 + ty * 3 + tick) % 40 < 2) {
        ctx.fillStyle = '#6faf42';
        ctx.fillRect(x + 12, y + 20, 4, 6);
      }
      break;
    case 1: // path
      ctx.fillStyle = checker ? PALETTE.path : PALETTE.pathDark;
      ctx.fillRect(x, y, size, size);
      break;
    case 2: // water
      ctx.fillStyle = ((tick >> 3) + tx + ty) % 2 ? PALETTE.water : PALETTE.waterDeep;
      ctx.fillRect(x, y, size, size);
      break;
    case 3: // stone
      ctx.fillStyle = PALETTE.stone;
      ctx.fillRect(x, y, size, size);
      ctx.fillStyle = PALETTE.stoneDark;
      ctx.fillRect(x + 4, y + 4, size - 8, size - 8);
      break;
    case 4: // gate pad
      ctx.fillStyle = PALETTE.path;
      ctx.fillRect(x, y, size, size);
      ctx.fillStyle = PALETTE.accent;
      ctx.globalAlpha = 0.25 + 0.15 * Math.sin(tick * 0.08);
      ctx.fillRect(x + 6, y + 6, size - 12, size - 12);
      ctx.globalAlpha = 1;
      break;
    default:
      ctx.fillStyle = '#000';
      ctx.fillRect(x, y, size, size);
  }
}

/** Start flag on grass beside maze entrance */
export function drawStartFlag(ctx, tx, ty, size, tick) {
  const x = tx * size;
  const y = ty * size;
  const poleX = x + size * 0.55;
  const poleH = size * 0.85;

  ctx.fillStyle = '#5a5048';
  ctx.fillRect(poleX, y + size * 0.12, 4, poleH);

  const wave = Math.sin(tick * 0.1) * 2;
  ctx.fillStyle = PALETTE.accent;
  ctx.beginPath();
  ctx.moveTo(poleX + 4, y + size * 0.14);
  ctx.lineTo(poleX + size * 0.75 + wave, y + size * 0.22);
  ctx.lineTo(poleX + size * 0.7 + wave, y + size * 0.42);
  ctx.lineTo(poleX + 4, y + size * 0.36);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#f0f4f1';
  ctx.font = 'bold 7px Syne, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('START', x + size / 2, y + size * 0.08);
}

export function drawPlayer(ctx, px, py, size, tick) {
  const s = size * 0.55;
  const x = px - s / 2;
  const y = py - s / 2;

  // Glow
  ctx.fillStyle = PALETTE.roverGlow;
  ctx.globalAlpha = 0.2 + 0.1 * Math.sin(tick * 0.12);
  ctx.beginPath();
  ctx.arc(px, py, s * 0.85, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  // Rover body (pixel block)
  ctx.fillStyle = PALETTE.rover;
  ctx.fillRect(x, y, s, s);
  ctx.fillStyle = PALETTE.accent;
  ctx.fillRect(x + s * 0.25, y + s * 0.25, s * 0.5, s * 0.5);
  ctx.fillStyle = '#022349';
  ctx.fillRect(x + s * 0.35, y + s * 0.35, s * 0.12, s * 0.12);
  ctx.fillRect(x + s * 0.53, y + s * 0.35, s * 0.12, s * 0.12);
}
