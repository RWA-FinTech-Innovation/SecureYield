/**
 * Maze layout: paths = roads only; houses + door checkpoints = grass.
 * Door tiles are grass (GATE) — player steps off the road onto the doormat.
 */

function hor(paths, x1, x2, y) {
  for (let x = x1; x <= x2; x++) paths.push([x, y]);
}
function ver(paths, x, y1, y2) {
  for (let y = y1; y <= y2; y++) paths.push([x, y]);
}
function rectStone(stones, x1, y1, x2, y2) {
  for (let y = y1; y <= y2; y++) {
    for (let x = x1; x <= x2; x++) stones.push([x, y]);
  }
}

export function buildMazeGeometry() {
  const paths = [];
  const stones = [];

  // ── Outer moat (stone cliffs inside water border drawn separately) ──
  rectStone(stones, 10, 4, 11, 5);
  rectStone(stones, 22, 3, 24, 5);
  rectStone(stones, 34, 4, 36, 6);
  rectStone(stones, 14, 18, 16, 20);
  rectStone(stones, 26, 19, 28, 21);
  rectStone(stones, 38, 20, 40, 22);

  // ── Maze corridors (roads) ──
  // West spawn spur
  hor(paths, 2, 7, 14);
  ver(paths, 7, 10, 14);

  // Wallet branch
  hor(paths, 7, 11, 10);
  ver(paths, 11, 10, 14);

  // South false trail
  ver(paths, 7, 14, 18);
  hor(paths, 7, 9, 18);

  // Main eastbound highway (with gaps filled by stones → detour north)
  hor(paths, 9, 13, 14);
  rectStone(stones, 14, 13, 14, 15); // block → must go north
  ver(paths, 13, 8, 13);
  hor(paths, 11, 20, 8);
  ver(paths, 12, 7, 10);
  ver(paths, 20, 8, 14);
  hor(paths, 13, 20, 14);

  // AI compute wing (south alcove)
  ver(paths, 20, 14, 20);
  hor(paths, 18, 22, 20);
  ver(paths, 22, 16, 20);

  // Central south descent
  ver(paths, 20, 20, 24);
  hor(paths, 16, 24, 24);

  // Token mint quarter
  ver(paths, 24, 20, 24);
  hor(paths, 24, 30, 22);
  ver(paths, 30, 18, 24);
  rectStone(stones, 28, 20, 29, 21);

  // Vault north loop
  ver(paths, 30, 14, 18);
  hor(paths, 26, 34, 14);
  ver(paths, 34, 14, 17);

  // East labyrinth
  hor(paths, 24, 28, 17);
  rectStone(stones, 28, 16, 28, 18);
  ver(paths, 28, 12, 17);
  hor(paths, 28, 36, 12);
  ver(paths, 36, 12, 20);

  // HK legal dead-end branch
  hor(paths, 32, 38, 20);
  ver(paths, 38, 18, 22);

  // Finance terrace
  hor(paths, 34, 40, 18);
  ver(paths, 40, 16, 20);

  // Passport finish
  hor(paths, 36, 44, 22);
  ver(paths, 44, 20, 24);
  hor(paths, 40, 46, 24);

  // North exploration loops (extra difficulty)
  hor(paths, 16, 18, 6);
  ver(paths, 18, 6, 10);
  hor(paths, 18, 26, 6);
  ver(paths, 26, 6, 12);
  hor(paths, 22, 32, 10);
  ver(paths, 32, 10, 16);

  // Block shortcuts
  rectStone(stones, 16, 14, 17, 15);
  rectStone(stones, 22, 14, 23, 15);
  rectStone(stones, 30, 16, 31, 17);
  rectStone(stones, 34, 18, 35, 19);
  rectStone(stones, 40, 14, 41, 16);

  return { paths, stones };
}

/** Decoy cottages on grass — not quest sites */
export const DECOY_HOUSES = [
  { x: 5, y: 8, variant: 0 },
  { x: 8, y: 16, variant: 1 },
  { x: 12, y: 16, variant: 2 },
  { x: 15, y: 5, variant: 0 },
  { x: 19, y: 5, variant: 3 },
  { x: 23, y: 18, variant: 1 },
  { x: 17, y: 22, variant: 2 },
  { x: 25, y: 8, variant: 0 },
  { x: 29, y: 6, variant: 3 },
  { x: 33, y: 20, variant: 1 },
  { x: 37, y: 8, variant: 2 },
  { x: 41, y: 22, variant: 0 },
  { x: 43, y: 10, variant: 1 },
  { x: 21, y: 12, variant: 2 },
  { x: 27, y: 14, variant: 3 },
  { x: 31, y: 18, variant: 0 },
  { x: 35, y: 5, variant: 1 },
  { x: 9, y: 20, variant: 2 },
];

/**
 * Quest gates: door = grass doormat; building sits on grass beside road.
 * placement relative to door (house faces the road).
 */
export const QUEST_GATES = [
  { id: 0, type: 'wallet', door: { x: 9, y: 9 }, placement: 'north', label: 'Wallet' },
  { id: 1, type: 'wind', door: { x: 12, y: 7 }, placement: 'north', label: 'Green Power' },
  { id: 2, type: 'datacenter', door: { x: 21, y: 19 }, placement: 'north', label: 'AI Compute' },
  { id: 3, type: 'mint', door: { x: 28, y: 21 }, placement: 'north', label: 'Token Mint' },
  { id: 4, type: 'vault', door: { x: 33, y: 13 }, placement: 'north', label: 'Evidence' },
  { id: 5, type: 'legal', door: { x: 37, y: 19 }, placement: 'north', label: 'HK Legal' },
  { id: 6, type: 'finance', door: { x: 39, y: 17 }, placement: 'north', label: 'RWA Finance' },
  { id: 7, type: 'passport', door: { x: 43, y: 23 }, placement: 'north', label: 'Passport' },
];

export const PLAYER_SPAWN_TILE = { x: 3, y: 14 };
/** Grass tile beside spawn — start flag */
export const SPAWN_FLAG_TILE = { x: 4, y: 13 };
