'use client';

import * as React from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Award,
  RotateCcw,
  Sparkles,
  Trophy,
  Undo2,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

/* =============================================================================
   CYBER 2048 (premium)
   - Real tile objects with ids, so tiles SLIDE, merge with a pop, and spawn in
   - Undo (up to 10 moves, also undoes a reset), resume where you left off
   - Keys only work while the game is hovered/focused (the page still scrolls)
   - One shared AudioContext, haptics on merge, confetti respects reduced motion
   - Swipe (touch/mouse), arrow keys / WASD, on-screen pad on touch devices
   ============================================================================= */

type Dir = 'left' | 'right' | 'up' | 'down';

type Tile = {
  id: number;
  value: number;
  r: number;
  c: number;
  isNew?: boolean; // just spawned (pop-in)
  merged?: boolean; // just created by a merge (pop)
  ghost?: boolean; // slides into a merge, then removed
};

type Game = {
  tiles: Tile[];
  score: number;
  moves: number;
  over: boolean;
  won: boolean; // 2048 reached and the overlay is showing
  keepPlaying: boolean;
};

type Snapshot = { tiles: Tile[]; score: number; moves: number; keepPlaying: boolean };

const SIZE = 4;
const BEST_KEY = 'cyber-2048-best-score';
const STATE_KEY = 'cyber-2048-state-v2';
const SOUND_KEY = 'cyber-2048-sound';
const MAX_HISTORY = 10;
const GHOST_MS = 180;

/* ------------------------------ tile palette ------------------------------- */

type TileStyle = { bg: string; fg: string; glow: string };
const mk = (from: string, to: string, fg: string, glow: string): TileStyle => ({
  bg: `linear-gradient(145deg, ${from}, ${to})`,
  fg,
  glow,
});

const TILE_STYLES: Record<number, TileStyle> = {
  2: mk('#2c303c', '#1d2029', '#e6e9f2', 'rgba(0,0,0,0)'),
  4: mk('#353b57', '#232743', '#cdd5ff', 'rgba(99,102,241,0.12)'),
  8: mk('#6d70f5', '#4338ca', '#ffffff', 'rgba(99,102,241,0.45)'),
  16: mk('#9b6cf8', '#6d28d9', '#ffffff', 'rgba(139,92,246,0.5)'),
  32: mk('#d048e6', '#86198f', '#ffffff', 'rgba(192,38,211,0.5)'),
  64: mk('#f0589b', '#be185d', '#ffffff', 'rgba(236,72,153,0.5)'),
  128: mk('#fb6a7e', '#e11d48', '#ffffff', 'rgba(244,63,94,0.55)'),
  256: mk('#ff8a5c', '#ea580c', '#ffffff', 'rgba(249,115,22,0.55)'),
  512: mk('#ffb32e', '#d97706', '#1c1206', 'rgba(245,158,11,0.6)'),
  1024: mk('#ffe45c', '#eab308', '#1c1606', 'rgba(250,204,21,0.65)'),
  2048: mk('#5cf2d6', '#0ea5e9', '#04161f', 'rgba(34,211,238,0.75)'),
};
const BEYOND_STYLE = mk('#ffffff', '#a5f3fc', '#04161f', 'rgba(255,255,255,0.7)');

const tileStyle = (v: number) => TILE_STYLES[v] ?? BEYOND_STYLE;
const sizeClass = (v: number) =>
  v < 100
    ? 'text-2xl sm:text-3xl'
    : v < 1000
      ? 'text-xl sm:text-2xl'
      : v < 10000
        ? 'text-lg sm:text-xl'
        : 'text-sm sm:text-base';

/* ------------------------------ pure game logic ---------------------------- */

const live = (tiles: Tile[]) => tiles.filter((t) => !t.ghost);
const settle = (t: Tile): Tile => ({ id: t.id, value: t.value, r: t.r, c: t.c });

function spawnTile(tiles: Tile[], nextId: () => number): Tile | null {
  const taken = new Set(live(tiles).map((t) => t.r * SIZE + t.c));
  const free: number[] = [];
  for (let i = 0; i < SIZE * SIZE; i++) if (!taken.has(i)) free.push(i);
  if (free.length === 0) return null;
  const cell = free[Math.floor(Math.random() * free.length)];
  return {
    id: nextId(),
    value: Math.random() < 0.9 ? 2 : 4,
    r: Math.floor(cell / SIZE),
    c: cell % SIZE,
    isNew: true,
  };
}

function canMove(tiles: Tile[]): boolean {
  const lt = live(tiles);
  if (lt.length < SIZE * SIZE) return true;
  const grid: number[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
  lt.forEach((t) => (grid[t.r][t.c] = t.value));
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (c < SIZE - 1 && grid[r][c] === grid[r][c + 1]) return true;
      if (r < SIZE - 1 && grid[r][c] === grid[r + 1][c]) return true;
    }
  }
  return false;
}

/**
 * Slide every tile as far as it can go in `dir`, merging equal neighbours once.
 * Tiles keep their ids (so CSS can animate the slide). A merge produces ONE new
 * tile and turns the two sources into ghosts that slide into the same cell.
 */
function slideTiles(tiles: Tile[], dir: Dir, nextId: () => number) {
  const src = live(tiles);
  const out: Tile[] = [];
  const ghosts: Tile[] = [];
  const merges: number[] = [];
  let gained = 0;
  let moved = false;

  const horizontal = dir === 'left' || dir === 'right';
  const towardStart = dir === 'left' || dir === 'up';

  for (let line = 0; line < SIZE; line++) {
    const inLine = src
      .filter((t) => (horizontal ? t.r : t.c) === line)
      .sort((a, b) => {
        const ka = horizontal ? a.c : a.r;
        const kb = horizontal ? b.c : b.r;
        return towardStart ? ka - kb : kb - ka;
      });

    let slot = 0;
    let last: Tile | null = null;

    for (const t of inLine) {
      if (last && !last.merged && last.value === t.value) {
        // merge `t` into `last`
        const target = { r: last.r, c: last.c };
        const idx = out.indexOf(last);
        if (idx >= 0) out.splice(idx, 1);
        ghosts.push({ ...last, ghost: true, merged: false, isNew: false });
        ghosts.push({ ...t, r: target.r, c: target.c, ghost: true, merged: false, isNew: false });
        const mergedTile: Tile = { id: nextId(), value: t.value * 2, r: target.r, c: target.c, merged: true };
        out.push(mergedTile);
        last = mergedTile;
        gained += mergedTile.value;
        merges.push(mergedTile.value);
        moved = true;
      } else {
        const idx = towardStart ? slot : SIZE - 1 - slot;
        const pos = horizontal ? { r: line, c: idx } : { r: idx, c: line };
        const placed: Tile = { id: t.id, value: t.value, r: pos.r, c: pos.c };
        if (placed.r !== t.r || placed.c !== t.c) moved = true;
        out.push(placed);
        last = placed;
        slot++;
      }
    }
  }

  return { tiles: [...out, ...ghosts], gained, moved, merges };
}

function parseSaved(raw: string | null): { tiles: Tile[]; score: number; moves: number; keepPlaying: boolean } | null {
  if (!raw) return null;
  try {
    const d = JSON.parse(raw);
    if (!d || !Array.isArray(d.tiles) || typeof d.score !== 'number') return null;
    const seenCells = new Set<number>();
    const seenIds = new Set<number>();
    const tiles: Tile[] = [];
    for (const t of d.tiles) {
      const ok =
        Number.isInteger(t?.id) &&
        Number.isInteger(t?.value) &&
        t.value >= 2 &&
        (t.value & (t.value - 1)) === 0 &&
        Number.isInteger(t?.r) &&
        Number.isInteger(t?.c) &&
        t.r >= 0 &&
        t.r < SIZE &&
        t.c >= 0 &&
        t.c < SIZE;
      if (!ok) return null;
      const cell = t.r * SIZE + t.c;
      if (seenCells.has(cell) || seenIds.has(t.id)) return null;
      seenCells.add(cell);
      seenIds.add(t.id);
      tiles.push({ id: t.id, value: t.value, r: t.r, c: t.c });
    }
    if (tiles.length === 0) return null;
    return {
      tiles,
      score: Math.max(0, Math.floor(d.score)),
      moves: Number.isInteger(d.moves) ? d.moves : 0,
      keepPlaying: Boolean(d.keepPlaying),
    };
  } catch {
    return null;
  }
}

/* ================================= component ================================ */

export function Cyber2048() {
  const [game, setGame] = React.useState<Game>({
    tiles: [],
    score: 0,
    moves: 0,
    over: false,
    won: false,
    keepPlaying: false,
  });
  const [best, setBest] = React.useState(0);
  const [ready, setReady] = React.useState(false);
  const [soundOn, setSoundOn] = React.useState(true);
  const [historyLen, setHistoryLen] = React.useState(0);
  const [gain, setGain] = React.useState<{ n: number; k: number } | null>(null);

  // refs keep event handlers fresh without re-registering listeners
  const gameRef = React.useRef(game);
  const bestRef = React.useRef(0);
  const soundRef = React.useRef(true);
  const idRef = React.useRef(1);
  const historyRef = React.useRef<Snapshot[]>([]);
  const ghostTimer = React.useRef<number | undefined>(undefined);
  const audioRef = React.useRef<AudioContext | null>(null);
  const hoverRef = React.useRef(false);
  const focusRef = React.useRef(false);
  const swipeRef = React.useRef<{ x: number; y: number } | null>(null);
  const gainKey = React.useRef(0);

  const nextId = () => idRef.current++;
  const commit = (next: Game) => {
    gameRef.current = next;
    setGame(next);
  };

  /* ------------------------------- audio / haptics ------------------------------ */

  const tone = (
    freq: number,
    { dur = 0.14, vol = 0.045, delay = 0, type = 'sine' as OscillatorType } = {}
  ) => {
    if (!soundRef.current || typeof window === 'undefined') return;
    try {
      if (!audioRef.current) {
        const Ctor =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Ctor) return;
        audioRef.current = new Ctor();
      }
      const ctx = audioRef.current;
      if (ctx.state === 'suspended') void ctx.resume();
      const t0 = ctx.currentTime + delay;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t0);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + dur + 0.02);
    } catch {
      // audio unavailable
    }
  };

  const buzz = (ms: number) => {
    try {
      navigator.vibrate?.(ms);
    } catch {
      // ignore
    }
  };

  /* ---------------------------------- actions ---------------------------------- */

  const snapshot = (g: Game): Snapshot => ({
    tiles: live(g.tiles).map(settle),
    score: g.score,
    moves: g.moves,
    keepPlaying: g.keepPlaying,
  });

  const pushHistory = (g: Game) => {
    historyRef.current = [...historyRef.current, snapshot(g)].slice(-MAX_HISTORY);
    setHistoryLen(historyRef.current.length);
  };

  const scheduleGhostCleanup = () => {
    window.clearTimeout(ghostTimer.current);
    ghostTimer.current = window.setTimeout(() => {
      const g = gameRef.current;
      if (g.tiles.some((t) => t.ghost)) commit({ ...g, tiles: live(g.tiles) });
    }, GHOST_MS);
  };

  const freshGame = (): Game => {
    const a = spawnTile([], nextId)!;
    const b = spawnTile([a], nextId)!;
    return { tiles: [a, b], score: 0, moves: 0, over: false, won: false, keepPlaying: false };
  };

  const restart = () => {
    const g = gameRef.current;
    if (g.moves > 0) pushHistory(g); // a reset can be undone
    window.clearTimeout(ghostTimer.current);
    commit(freshGame());
    tone(392, { dur: 0.1, vol: 0.03 });
  };

  const undo = () => {
    const snap = historyRef.current.pop();
    if (!snap) return;
    setHistoryLen(historyRef.current.length);
    window.clearTimeout(ghostTimer.current);
    idRef.current = Math.max(idRef.current, ...snap.tiles.map((t) => t.id + 1));
    commit({
      tiles: snap.tiles,
      score: snap.score,
      moves: snap.moves,
      over: false,
      won: false,
      keepPlaying: snap.keepPlaying,
    });
    tone(262, { dur: 0.09, vol: 0.03, type: 'triangle' });
  };

  const move = (dir: Dir) => {
    const g = gameRef.current;
    if (g.over || g.won) return;

    const base = live(g.tiles).map(settle); // drops any ghosts from the last move
    const res = slideTiles(base, dir, nextId);
    if (!res.moved) return;

    window.clearTimeout(ghostTimer.current);

    const liveTiles = live(res.tiles);
    const spawned = spawnTile(liveTiles, nextId);
    const tiles = spawned ? [...res.tiles, spawned] : res.tiles;
    const liveAfter = spawned ? [...liveTiles, spawned] : liveTiles;

    const score = g.score + res.gained;
    const reached2048 = !g.keepPlaying && res.merges.some((v) => v >= 2048);
    const over = !canMove(liveAfter);

    pushHistory(g);
    commit({ tiles, score, moves: g.moves + 1, over, won: reached2048, keepPlaying: g.keepPlaying });

    if (score > bestRef.current) {
      bestRef.current = score;
      setBest(score);
      try {
        localStorage.setItem(BEST_KEY, String(score));
      } catch {
        // ignore
      }
    }

    if (res.gained > 0) setGain({ n: res.gained, k: ++gainKey.current });

    if (res.merges.length > 0) {
      const top = Math.max(...res.merges);
      const f = 261.63 * Math.pow(2, Math.log2(top) / 6);
      tone(f);
      tone(f * 1.5, { delay: 0.06, vol: 0.03 });
      buzz(10);
    } else {
      tone(196, { dur: 0.06, vol: 0.025, type: 'triangle' });
      buzz(4);
    }

    if (reached2048) {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, { delay: i * 0.09, dur: 0.3, vol: 0.04 }));
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        try {
          confetti({ particleCount: 120, spread: 75, origin: { y: 0.6 } });
        } catch {
          // ignore
        }
      }
    } else if (over) {
      [330, 262, 196].forEach((f, i) => tone(f, { delay: i * 0.12, dur: 0.25, vol: 0.035, type: 'triangle' }));
    }

    scheduleGhostCleanup();
  };

  const keepPlaying = () => commit({ ...gameRef.current, won: false, keepPlaying: true });

  /* ----------------------------------- effects ---------------------------------- */

  // Load best score, sound preference and saved game after mount (avoids hydration mismatch)
  React.useEffect(() => {
    try {
      const b = parseInt(localStorage.getItem(BEST_KEY) || '0', 10);
      if (b > 0) {
        bestRef.current = b;
        setBest(b);
      }
      const s = localStorage.getItem(SOUND_KEY);
      if (s === 'off') {
        soundRef.current = false;
        setSoundOn(false);
      }
    } catch {
      // storage disabled
    }

    let initial: Game | null = null;
    try {
      const saved = parseSaved(localStorage.getItem(STATE_KEY));
      if (saved) {
        idRef.current = Math.max(...saved.tiles.map((t) => t.id)) + 1;
        initial = {
          tiles: saved.tiles,
          score: saved.score,
          moves: saved.moves,
          over: !canMove(saved.tiles),
          won: false,
          keepPlaying: saved.keepPlaying,
        };
      }
    } catch {
      // ignore
    }
    commit(initial ?? freshGame());
    setReady(true);

    return () => {
      window.clearTimeout(ghostTimer.current);
      void audioRef.current?.close().catch(() => undefined);
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist the game (without ghosts)
  React.useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(
        STATE_KEY,
        JSON.stringify({
          tiles: live(game.tiles).map(settle),
          score: game.score,
          moves: game.moves,
          keepPlaying: game.keepPlaying,
        })
      );
    } catch {
      // ignore
    }
  }, [game, ready]);

  // Keyboard: only while the game is hovered or focused, so the page still scrolls normally
  const actions = React.useRef({ move, undo, restart });
  actions.current = { move, undo, restart };

  React.useEffect(() => {
    const keyMap: Record<string, Dir> = {
      ArrowUp: 'up',
      KeyW: 'up',
      ArrowDown: 'down',
      KeyS: 'down',
      ArrowLeft: 'left',
      KeyA: 'left',
      ArrowRight: 'right',
      KeyD: 'right',
    };
    const onKey = (e: KeyboardEvent) => {
      if (!hoverRef.current && !focusRef.current) return;
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return;

      if ((e.ctrlKey || e.metaKey) && e.code === 'KeyZ') {
        e.preventDefault();
        actions.current.undo();
        return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const dir = keyMap[e.code];
      if (dir) {
        e.preventDefault();
        actions.current.move(dir);
      } else if (e.code === 'KeyR') {
        actions.current.restart();
      } else if (e.code === 'KeyU') {
        actions.current.undo();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* ----------------------------------- swipe ----------------------------------- */

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return;
    swipeRef.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = swipeRef.current;
    swipeRef.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    const ax = Math.abs(dx);
    const ay = Math.abs(dy);
    if (Math.max(ax, ay) < 24) return;
    move(ax > ay ? (dx > 0 ? 'right' : 'left') : dy > 0 ? 'down' : 'up');
  };

  /* ---------------------------------- derived ---------------------------------- */

  const liveTiles = live(game.tiles);
  const maxTile = Math.max(2, ...liveTiles.map((t) => t.value));
  const progress = Math.min(100, (Math.log2(maxTile) / 11) * 100);

  const toggleSound = () => {
    const next = !soundOn;
    soundRef.current = next;
    setSoundOn(next);
    try {
      localStorage.setItem(SOUND_KEY, next ? 'on' : 'off');
    } catch {
      // ignore
    }
    if (next) tone(523.25, { dur: 0.1, vol: 0.03 });
  };

  const padButton =
    'flex h-11 w-14 items-center justify-center rounded-xl liquid-btn-secondary text-muted-foreground transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60';
  const iconButton =
    'rounded-xl p-2.5 liquid-btn-secondary text-muted-foreground transition-all hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 disabled:cursor-not-allowed disabled:opacity-40';

  /* ------------------------------------ view ------------------------------------ */

  return (
    <div
      className="relative mx-auto w-full max-w-md rounded-3xl p-5 shadow-2xl liquid-glass-elevated sm:p-7"
      onPointerEnter={() => (hoverRef.current = true)}
      onPointerLeave={() => (hoverRef.current = false)}
      onFocusCapture={() => (focusRef.current = true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) focusRef.current = false;
      }}
    >
      <div className="glass-reflection-highlight" />

      <style>{`
        @keyframes cc-spawn { 0% { opacity: 0; transform: scale(0.4); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes cc-merge { 0% { opacity: 0; transform: scale(0.6); } 55% { opacity: 1; transform: scale(1.16); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes cc-gain { 0% { opacity: 0; transform: translateY(6px); } 20% { opacity: 1; } 100% { opacity: 0; transform: translateY(-18px); } }
        @keyframes cc-shine { 0% { transform: translateX(-130%) skewX(-20deg); } 60%, 100% { transform: translateX(300%) skewX(-20deg); } }
        .cc-spawn { animation: cc-spawn 180ms 110ms cubic-bezier(0.2, 0.8, 0.3, 1) both; }
        .cc-merge { animation: cc-merge 220ms 90ms cubic-bezier(0.2, 0.8, 0.3, 1) both; }
        .cc-gain { animation: cc-gain 800ms ease-out both; }
        .cc-shine { position: absolute; top: 0; bottom: 0; left: 0; width: 40%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent); animation: cc-shine 2.8s ease-in-out infinite; }
        .cc-dpad { display: none; }
        @media (pointer: coarse) { .cc-dpad { display: flex; } .cc-kbd { display: none; } }
        @media (prefers-reduced-motion: reduce) {
          .cc-spawn, .cc-merge, .cc-gain, .cc-shine { animation: none; }
          .cc-tile { transition: none !important; }
        }
      `}</style>

      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="flex flex-wrap items-center gap-2 text-xl font-black tracking-tight sm:text-2xl">
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
              Cyber 2048
            </span>
            <span className="liquid-badge font-mono text-[10px] font-medium uppercase tracking-wider text-indigo-400">
              Neon Grid
            </span>
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">Merge matching blocks to reach 2048</p>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            onClick={undo}
            disabled={historyLen === 0}
            className={iconButton}
            title="Undo (U)"
            aria-label="Undo last move"
          >
            <Undo2 className="h-4 w-4" />
          </button>
          <button
            onClick={toggleSound}
            className={iconButton}
            title={soundOn ? 'Mute sound' : 'Enable sound'}
            aria-label={soundOn ? 'Mute sound' : 'Enable sound'}
            aria-pressed={soundOn}
          >
            {soundOn ? <Volume2 className="h-4 w-4 text-indigo-400" /> : <VolumeX className="h-4 w-4" />}
          </button>
          <button
            onClick={restart}
            className="flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-xs font-semibold liquid-btn-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
            title="New game (R)"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>New</span>
          </button>
        </div>
      </div>

      {/* Scores */}
      <div className="mb-4 grid grid-cols-3 gap-2.5">
        <div className="relative rounded-2xl p-3 text-center liquid-glass-subtle">
          <span className="block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Score</span>
          <span className="font-mono text-xl font-black text-foreground sm:text-2xl">
            {game.score.toLocaleString()}
          </span>
          {gain && (
            <span
              key={gain.k}
              aria-hidden="true"
              className="cc-gain pointer-events-none absolute right-2 top-1 font-mono text-xs font-bold text-emerald-400"
            >
              +{gain.n}
            </span>
          )}
        </div>
        <div className="rounded-2xl p-3 text-center liquid-glass-subtle">
          <div className="flex items-center justify-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-amber-500">
            <Trophy className="h-3 w-3" aria-hidden="true" />
            <span>Best</span>
          </div>
          <span className="font-mono text-xl font-black text-amber-500 sm:text-2xl">{best.toLocaleString()}</span>
        </div>
        <div className="rounded-2xl p-3 text-center liquid-glass-subtle">
          <span className="block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Moves</span>
          <span className="font-mono text-xl font-black text-foreground sm:text-2xl">{game.moves}</span>
        </div>
      </div>

      {/* Progress to 2048 */}
      <div className="mb-5">
        <div className="mb-1.5 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          <span>Goal 2048</span>
          <span className="font-mono">Top tile {maxTile}</span>
        </div>
        <div
          className="h-1.5 overflow-hidden rounded-full bg-border/60"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          aria-label="Progress toward 2048"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 transition-[width] duration-500 ease-out motion-reduce:transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Board */}
      <div
        tabIndex={0}
        role="group"
        aria-label="2048 board. Use arrow keys or swipe to move the tiles."
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (swipeRef.current = null)}
        style={{ ['--gap' as string]: 'clamp(8px, 2.6vw, 12px)' } as React.CSSProperties}
        className="relative aspect-square touch-none select-none rounded-3xl border border-white/10 bg-gradient-to-b from-black/40 to-black/20 p-3 shadow-[inset_0_2px_24px_rgba(0,0,0,0.55)] outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 sm:p-4"
      >
        <div className="relative h-full w-full">
          {/* empty cells */}
          <div aria-hidden="true" className="grid h-full w-full grid-cols-4 grid-rows-4 gap-[var(--gap)]">
            {Array.from({ length: SIZE * SIZE }, (_, i) => (
              <div
                key={i}
                className="rounded-[14px] bg-white/[0.04] shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)] ring-1 ring-inset ring-white/[0.05]"
              />
            ))}
          </div>

          {/* tiles */}
          <div aria-hidden="true" className="absolute inset-0">
            {game.tiles.map((t) => {
              const s = tileStyle(t.value);
              return (
                <div
                  key={t.id}
                  className="cc-tile absolute left-0 top-0 will-change-transform"
                  style={{
                    width: 'calc((100% - 3 * var(--gap)) / 4)',
                    height: 'calc((100% - 3 * var(--gap)) / 4)',
                    transform: `translate(calc(${t.c} * (100% + var(--gap))), calc(${t.r} * (100% + var(--gap))))`,
                    transition: 'transform 140ms cubic-bezier(0.22, 0.8, 0.3, 1)',
                    zIndex: t.ghost ? 1 : t.merged ? 3 : 2,
                  }}
                >
                  <div
                    className={cn(
                      'relative flex h-full w-full items-center justify-center overflow-hidden rounded-[14px] font-mono font-black',
                      sizeClass(t.value),
                      t.isNew && 'cc-spawn',
                      t.merged && 'cc-merge'
                    )}
                    style={{
                      background: s.bg,
                      color: s.fg,
                      boxShadow: `0 8px 22px -8px ${s.glow}, inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -3px 8px rgba(0,0,0,0.22)`,
                    }}
                  >
                    {t.value}
                    {t.value >= 2048 && <span className="cc-shine" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Win overlay */}
        {game.won && (
          <div
            role="dialog"
            aria-labelledby="cc-win-title"
            className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-3xl bg-black/75 p-6 text-center backdrop-blur-md animate-in fade-in"
          >
            <Sparkles className="mb-2 h-10 w-10 animate-bounce text-amber-400 motion-reduce:animate-none" aria-hidden="true" />
            <h3 id="cc-win-title" className="text-2xl font-black text-white">
              2048 Reached!
            </h3>
            <p className="mb-4 mt-1 text-xs text-zinc-300">
              {game.score.toLocaleString()} points in {game.moves} moves
            </p>
            <div className="flex gap-2">
              <button
                autoFocus
                onClick={keepPlaying}
                className="rounded-xl px-4 py-2 text-xs font-bold liquid-btn-primary"
              >
                Keep Playing
              </button>
              <button onClick={restart} className="rounded-xl px-4 py-2 text-xs font-bold liquid-btn-secondary">
                New Game
              </button>
            </div>
          </div>
        )}

        {/* Game over overlay */}
        {game.over && !game.won && (
          <div
            role="dialog"
            aria-labelledby="cc-over-title"
            className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-3xl bg-black/75 p-6 text-center backdrop-blur-md animate-in fade-in"
          >
            <Award className="mb-2 h-10 w-10 text-rose-500" aria-hidden="true" />
            <h3 id="cc-over-title" className="text-2xl font-black text-white">
              Grid Full!
            </h3>
            <p className="mb-4 mt-1 text-xs text-zinc-300">
              Final score <span className="font-mono font-bold text-amber-400">{game.score.toLocaleString()}</span>
              {game.score > 0 && game.score >= best ? ' · New best!' : ''}
            </p>
            <div className="flex gap-2">
              <button
                autoFocus
                onClick={restart}
                className="rounded-xl px-5 py-2.5 text-xs font-bold liquid-btn-primary transition-transform hover:scale-105"
              >
                Try Again
              </button>
              {historyLen > 0 && (
                <button onClick={undo} className="rounded-xl px-4 py-2.5 text-xs font-bold liquid-btn-secondary">
                  Undo
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Screen-reader status */}
      <div className="sr-only" aria-live="polite" role="status">
        Score {game.score}. Highest tile {maxTile}.{game.won ? ' You reached 2048.' : ''}
        {game.over && !game.won ? ' Game over.' : ''}
      </div>

      {/* Controls hint: pad on touch devices, keys on desktop */}
      <div className="mt-5 border-t border-border/50 pt-4">
        <div className="cc-kbd flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <kbd className="rounded-md border border-border/60 bg-muted/50 px-1.5 py-0.5 font-mono">← ↑ ↓ →</kbd>
            <kbd className="rounded-md border border-border/60 bg-muted/50 px-1.5 py-0.5 font-mono">WASD</kbd>
            move
          </span>
          <span className="inline-flex items-center gap-1.5">
            <kbd className="rounded-md border border-border/60 bg-muted/50 px-1.5 py-0.5 font-mono">U</kbd>
            undo
          </span>
          <span className="inline-flex items-center gap-1.5">
            <kbd className="rounded-md border border-border/60 bg-muted/50 px-1.5 py-0.5 font-mono">R</kbd>
            new game
          </span>
        </div>

        <div className="cc-dpad flex-col items-center gap-1.5">
          <p className="mb-1 text-center font-mono text-[11px] text-muted-foreground">Swipe the board or use the pad</p>
          <button onClick={() => move('up')} className={padButton} aria-label="Move up">
            <ArrowUp className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-1.5">
            <button onClick={() => move('left')} className={padButton} aria-label="Move left">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button onClick={() => move('down')} className={padButton} aria-label="Move down">
              <ArrowDown className="h-4 w-4" />
            </button>
            <button onClick={() => move('right')} className={padButton} aria-label="Move right">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cyber2048;