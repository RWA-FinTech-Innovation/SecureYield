import { BUILDING_META } from '../game/buildings.js';
import {
  buildMazeGeometry,
  DECOY_HOUSES,
  QUEST_GATES,
  PLAYER_SPAWN_TILE,
} from './mazeLayout.js';

/** Tile types */
export const TILE = {
  GRASS: 0,
  PATH: 1,
  WATER: 2,
  STONE: 3,
  GATE: 4, // grass doormat at quest / checkpoint
};

export const TILE_SIZE = 32;
export const MAP_W = 48;
export const MAP_H = 28;

const blocked = new Set();

function blockKey(x, y) {
  return `${x},${y}`;
}

function occupyFootprint(anchorX, anchorY, w, h, door) {
  for (let dy = 0; dy < h; dy++) {
    for (let dx = 0; dx < w; dx++) {
      const x = anchorX + dx;
      const y = anchorY + dy;
      if (door && x === door.x && y === door.y) continue;
      blocked.add(blockKey(x, y));
    }
  }
}

function occupyDecoy(x, y) {
  occupyFootprint(x, y, 2, 2, null);
}

export function buildingAnchor(door, type, side) {
  const meta = BUILDING_META[type];
  if (!meta) return { x: door.x, y: door.y };

  const { w, h } = meta;
  const { x: ix, y: iy } = door;

  switch (side) {
    case 'north':
      return { x: ix - Math.floor(w / 2), y: iy - h };
    case 'south':
      return { x: ix - Math.floor(w / 2), y: iy + 1 };
    case 'west':
      return { x: ix - w, y: iy - Math.floor(h / 2) };
    case 'east':
      return { x: ix + 1, y: iy - Math.floor(h / 2) };
    default:
      return { x: ix - Math.floor(w / 2), y: iy - h };
  }
}

function buildMapTiles() {
  const tiles = Array.from({ length: MAP_H }, () =>
    Array.from({ length: MAP_W }, () => TILE.GRASS),
  );

  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      if (x === 0 || y === 0 || x === MAP_W - 1 || y === MAP_H - 1) {
        tiles[y][x] = TILE.WATER;
      }
    }
  }

  const { paths, stones } = buildMazeGeometry();
  const pathSet = new Set(paths.map(([x, y]) => blockKey(x, y)));

  for (const [x, y] of paths) {
    if (tiles[y]?.[x] !== TILE.WATER) tiles[y][x] = TILE.PATH;
  }

  for (const [x, y] of stones) {
    if (!pathSet.has(blockKey(x, y)) && tiles[y]?.[x] !== TILE.WATER) {
      tiles[y][x] = TILE.STONE;
    }
  }

  for (const d of DECOY_HOUSES) {
    occupyDecoy(d.x, d.y);
  }

  return tiles;
}

export const MAP_TILES = buildMapTiles();

export const GATE_SITES = Object.fromEntries(
  QUEST_GATES.map((c) => {
    const anchor = buildingAnchor(c.door, c.type, c.placement);
    const meta = BUILDING_META[c.type];
    occupyFootprint(anchor.x, anchor.y, meta.w, meta.h, c.door);
    return [
      c.id,
      {
        stageId: c.id,
        type: c.type,
        door: c.door,
        interact: c.door,
        placement: c.placement,
        label: c.label,
        anchor,
        isQuest: true,
      },
    ];
  }),
);

// Door tiles = grass checkpoint (never on road)
for (const site of Object.values(GATE_SITES)) {
  const { x, y } = site.door;
  MAP_TILES[y][x] = TILE.GATE;
  blocked.delete(blockKey(x, y));
}

export { DECOY_HOUSES };

export const GATE_POSITIONS = Object.fromEntries(
  Object.entries(GATE_SITES).map(([k, site]) => [
    k,
    { x: site.door.x, y: site.door.y, label: site.label },
  ]),
);

export const PLAYER_SPAWN = PLAYER_SPAWN_TILE;
export { SPAWN_FLAG_TILE } from './mazeLayout.js';

export function isTileWalkable(tile, tx, ty) {
  if (tile === TILE.WATER || tile === TILE.STONE) return false;
  if (tile === TILE.PATH || tile === TILE.GATE) return true;
  if (tile === TILE.GRASS) return false;
  if (blocked.has(blockKey(tx, ty))) return false;
  return false;
}

export function isWalkable(tile, tx, ty) {
  return isTileWalkable(tile, tx, ty);
}

export function isBlocked(tx, ty) {
  return blocked.has(blockKey(tx, ty));
}

export function worldToTile(wx, wy) {
  return {
    tx: Math.floor(wx / TILE_SIZE),
    ty: Math.floor(wy / TILE_SIZE),
  };
}

export function tileCenter(tx, ty) {
  return {
    x: tx * TILE_SIZE + TILE_SIZE / 2,
    y: ty * TILE_SIZE + TILE_SIZE / 2,
  };
}

export function getInteractWorld(stageId) {
  const site = GATE_SITES[stageId];
  if (!site) return null;
  return tileCenter(site.door.x, site.door.y);
}

/** Player stands on quest doormat (grass). */
export function isOnQuestDoor(px, py, stageId) {
  const site = GATE_SITES[stageId];
  if (!site) return false;
  const { tx, ty } = worldToTile(px, py);
  return tx === site.door.x && ty === site.door.y;
}

export function getAdjacentPathDoor(stageId) {
  const site = GATE_SITES[stageId];
  if (!site) return null;
  const { x, y } = site.door;
  const adj = [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ];
  for (const [ax, ay] of adj) {
    if (MAP_TILES[ay]?.[ax] === TILE.PATH) return { x: ax, y: ay };
  }
  return null;
}
