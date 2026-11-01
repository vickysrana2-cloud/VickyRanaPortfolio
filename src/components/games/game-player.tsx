
'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import {
  ArrowLeft,
  Gamepad2,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  Trophy,
  Zap,
} from 'lucide-react';

const Cyber2048 = dynamic(
  () => import('./cyber-2048').then((m) => m.Cyber2048),
  { ssr: false }
);
const RetroSnake = dynamic(
  () => import('./retro-snake').then((m) => m.RetroSnake),
  { ssr: false }
);
const MemoryMatrix = dynamic(
  () => import('./memory-matrix').then((m) => m.MemoryMatrix),
  { ssr: false }
);
const CodeSpeedTyper = dynamic(
  () => import('./code-typer').then((m) => m.CodeSpeedTyper),
  { ssr: false }
);
const DragonRunner = dynamic(
  () => import('./DragonRunner').then((m) => m.DragonRunner),
  { ssr: false }
);

import { Game } from '@/types';

interface GamePlayerProps {
  game: Game;
  onBack?: () => void;
}

const GAME_META: Record<
  string,
  { label: string; description: string; accent: string; icon: string }
> = {
  'cyber-2048': {
    label: 'Cyber 2048',
    description: 'Merge tiles, build combos, and reach the ultimate score.',
    accent: 'from-cyan-400 to-blue-600',
    icon: '◈',
  },
  'retro-snake-quest': {
    label: 'Retro Snake Quest',
    description: 'Collect, grow, and survive in a neon arcade world.',
    accent: 'from-emerald-400 to-green-600',
    icon: '⌁',
  },
  'memory-matrix': {
    label: 'Memory Matrix',
    description: 'Train your memory. Watch the pattern and repeat it.',
    accent: 'from-fuchsia-400 to-violet-600',
    icon: '▦',
  },
  'code-speed-typer': {
    label: 'Code Speed Typer',
    description: 'Test your typing speed and accuracy with code.',
    accent: 'from-amber-300 to-orange-600',
    icon: '</>',
  },
  'dragon-runner': {
    label: 'Dragon Runner',
    description: 'Leap over obstacles, duck under flying bats, and survive.',
    accent: 'from-emerald-400 via-teal-500 to-indigo-600',
    icon: '🐉',
  },
  'dragon-dash': {
    label: 'Dragon Runner',
    description: 'Leap over obstacles, duck under flying bats, and survive.',
    accent: 'from-emerald-400 via-teal-500 to-indigo-600',
    icon: '🐉',
  },
};

export function GamePlayer({ game, onBack }: GamePlayerProps) {
  const [fullscreen, setFullscreen] = React.useState(false);
  const [resetKey, setResetKey] = React.useState(0);
  const playerRef = React.useRef<HTMLDivElement>(null);

  const meta = GAME_META[game.slug] ?? {
    label: game.title,
    description: 'Ready when you are. Start playing.',
    accent: 'from-indigo-400 to-violet-600',
    icon: '✦',
  };

  const renderGame = () => {
    switch (game.slug) {
      case 'cyber-2048':
        return <Cyber2048 key={resetKey} />;
      case 'retro-snake-quest':
        return <RetroSnake key={resetKey} />;
      case 'memory-matrix':
        return <MemoryMatrix key={resetKey} />;
      case 'code-speed-typer':
        return <CodeSpeedTyper key={resetKey} />;
      case 'dragon-runner':
      case 'dragon-dash':
        return <DragonRunner key={resetKey} />;
      default:
        return (
          <div className="flex min-h-72 flex-col items-center justify-center gap-3 p-8 text-center">
            <Gamepad2 className="h-10 w-10 text-white/30" />
            <p className="font-medium text-white">Game module unavailable</p>
            <p className="max-w-sm text-sm text-white/50">
              This game has not been connected to the player yet.
            </p>
          </div>
        );
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await playerRef.current?.requestFullscreen();
        setFullscreen(true);
      } else {
        await document.exitFullscreen();
        setFullscreen(false);
      }
    } catch {
      // Fullscreen may be unavailable in restricted browser contexts.
    }
  };

  React.useEffect(() => {
    const syncFullscreen = () =>
      setFullscreen(Boolean(document.fullscreenElement));

    document.addEventListener('fullscreenchange', syncFullscreen);
    return () =>
      document.removeEventListener('fullscreenchange', syncFullscreen);
  }, []);

  React.useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && fullscreen) {
        setFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [fullscreen]);

  return (
    <section
      ref={playerRef}
      className={`relative isolate w-full overflow-hidden rounded-3xl border border-white/[0.10] bg-[#08090e] text-white shadow-2xl shadow-black/30 ${
        fullscreen ? 'flex min-h-screen flex-col rounded-none' : ''
      }`}
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${meta.accent} opacity-[0.07]`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 -z-10 h-72 w-72 rounded-full bg-violet-500/[0.10] blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 -z-10 h-72 w-72 rounded-full bg-cyan-500/[0.08] blur-[100px]"
      />

      {/* Player header */}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.accent} text-lg font-black text-white shadow-lg`}
          >
            {meta.icon}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-base font-bold tracking-tight sm:text-lg">
                {meta.label}
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Ready
              </span>
            </div>
            <p className="mt-1 max-w-xl text-xs leading-relaxed text-white/50 sm:text-sm">
              {meta.description}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setResetKey((key) => key + 1)}
            aria-label="Restart game"
            title="Restart game"
            className="inline-flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-xs font-medium text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Restart</span>
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            {fullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </header>

      {/* Game information strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium text-white/45 sm:gap-5">
          <span className="inline-flex items-center gap-1.5">
            <Gamepad2 className="h-3.5 w-3.5" />
            Interactive game
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-amber-300" />
            Instant play
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 text-[11px] text-white/45">
          <Sparkles className="h-3.5 w-3.5 text-violet-300" />
          Built for the arcade
        </div>
      </div>

      {/* Game stage */}
      <div className="relative p-2.5 sm:p-4 lg:p-5">
        <div
          className={`relative mx-auto w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-black/25 shadow-inner shadow-black/20 ${
            fullscreen ? 'flex-1' : ''
          }`}
        >
          <React.Suspense
            fallback={
              <div className="flex min-h-80 flex-col items-center justify-center gap-4">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                  <Gamepad2 className="h-6 w-6 animate-pulse text-violet-300" />
                  <span className="absolute -right-1 -top-1 h-3 w-3 animate-ping rounded-full bg-cyan-400/70" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-white/80">
                    Initializing game
                  </p>
                  <p className="mt-1 text-xs text-white/40">
                    Preparing your experience…
                  </p>
                </div>
              </div>
            }
          >
            <div className="min-w-0">{renderGame()}</div>
          </React.Suspense>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2 text-xs text-white/40">
          <Trophy className="h-4 w-4 text-amber-300/80" />
          <span>Play. Improve. Beat your best.</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
          VR ARCADE
        </span>
      </footer>
    </section>
  );
}

export default GamePlayer;
