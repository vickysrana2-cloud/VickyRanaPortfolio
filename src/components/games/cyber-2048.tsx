'use client';

import * as React from 'react';
import { RotateCcw, Trophy, Award, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

type Board = number[][];

const EMPTY_BOARD: Board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

export function Cyber2048() {
  const [board, setBoard] = React.useState<Board>(EMPTY_BOARD);
  const [score, setScore] = React.useState(0);
  const [bestScore, setBestScore] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);
  const [won, setWon] = React.useState(false);
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const touchStartRef = React.useRef<{ x: number; y: number } | null>(null);

  // Initialize random board after mount on client
  React.useEffect(() => {
    restartGame();
  }, []);

  // Load high score from localStorage
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('cyber-2048-best-score');
      if (saved) setBestScore(parseInt(saved, 10));
    } catch {
      // LocalStorage might be disabled
    }
  }, []);

  // Update best score
  React.useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      try {
        localStorage.setItem('cyber-2048-best-score', score.toString());
      } catch {
        // ignore
      }
    }
  }, [score, bestScore]);

  // Audio tone feedback using Web Audio API
  const playTone = (freq: number) => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {
      // AudioContext unavailable
    }
  };

  function getInitialBoard(): Board {
    const b: Board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    addRandomTile(b);
    addRandomTile(b);
    return b;
  }

  function addRandomTile(b: Board) {
    const emptyCells: { r: number; c: number }[] = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (b[r][c] === 0) emptyCells.push({ r, c });
      }
    }
    if (emptyCells.length === 0) return;
    const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    b[r][c] = Math.random() < 0.9 ? 2 : 4;
  }

  const restartGame = () => {
    const initial = getInitialBoard();
    setBoard(initial);
    setScore(0);
    setGameOver(false);
    setWon(false);
  };

  // Move operations
  const move = React.useCallback(
    (direction: 'left' | 'right' | 'up' | 'down') => {
      if (gameOver) return;

      let changed = false;
      let addedScore = 0;
      let reached2048 = false;
      const newBoard: Board = board.map((row) => [...row]);

      const slide = (row: number[]) => {
        const filtered = row.filter((val) => val !== 0);
        const result: number[] = [];
        for (let i = 0; i < filtered.length; i++) {
          if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
            const merged = filtered[i] * 2;
            result.push(merged);
            addedScore += merged;
            if (merged === 2048 && !won) reached2048 = true;
            i++; // skip next tile
          } else {
            result.push(filtered[i]);
          }
        }
        while (result.length < 4) {
          result.push(0);
        }
        return result;
      };

      if (direction === 'left') {
        for (let r = 0; r < 4; r++) {
          const original = [...newBoard[r]];
          newBoard[r] = slide(newBoard[r]);
          if (original.some((val, idx) => val !== newBoard[r][idx])) changed = true;
        }
      } else if (direction === 'right') {
        for (let r = 0; r < 4; r++) {
          const original = [...newBoard[r]];
          const reversed = [...newBoard[r]].reverse();
          const slided = slide(reversed).reverse();
          newBoard[r] = slided;
          if (original.some((val, idx) => val !== newBoard[r][idx])) changed = true;
        }
      } else if (direction === 'up') {
        for (let c = 0; c < 4; c++) {
          const col = [newBoard[0][c], newBoard[1][c], newBoard[2][c], newBoard[3][c]];
          const slided = slide(col);
          for (let r = 0; r < 4; r++) {
            if (newBoard[r][c] !== slided[r]) changed = true;
            newBoard[r][c] = slided[r];
          }
        }
      } else if (direction === 'down') {
        for (let c = 0; c < 4; c++) {
          const col = [newBoard[0][c], newBoard[1][c], newBoard[2][c], newBoard[3][c]].reverse();
          const slided = slide(col).reverse();
          for (let r = 0; r < 4; r++) {
            if (newBoard[r][c] !== slided[r]) changed = true;
            newBoard[r][c] = slided[r];
          }
        }
      }

      if (changed) {
        addRandomTile(newBoard);
        setBoard(newBoard);
        setScore((prev) => prev + addedScore);
        playTone(320 + Math.min(addedScore, 800));

        if (reached2048) {
          setWon(true);
          try {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          } catch {
            // ignore
          }
        }

        // Check for game over
        if (checkGameOver(newBoard)) {
          setGameOver(true);
        }
      }
    },
    [board, gameOver, won]
  );

  function checkGameOver(b: Board): boolean {
    // If any empty cell, not game over
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (b[r][c] === 0) return false;
      }
    }
    // If any horizontal adjacent match, not game over
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 3; c++) {
        if (b[r][c] === b[r][c + 1]) return false;
      }
    }
    // If any vertical adjacent match, not game over
    for (let c = 0; c < 4; c++) {
      for (let r = 0; r < 3; r++) {
        if (b[r][c] === b[r + 1][c]) return false;
      }
    }
    return true;
  }

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault();
        move('up');
      } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        move('down');
      } else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault();
        move('left');
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        move('right');
      } else if (e.code === 'KeyR') {
        restartGame();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  // Touch handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > 30) {
        if (dx > 0) move('right');
        else move('left');
      }
    } else {
      if (Math.abs(dy) > 30) {
        if (dy > 0) move('down');
        else move('up');
      }
    }
  };

  // Tile color styling
  const getTileClasses = (val: number) => {
    switch (val) {
      case 2:
        return 'bg-zinc-800 text-zinc-100 border border-zinc-700';
      case 4:
        return 'bg-indigo-950/80 text-indigo-200 border border-indigo-700/60';
      case 8:
        return 'bg-indigo-800 text-white font-bold shadow-sm shadow-indigo-500/20';
      case 16:
        return 'bg-violet-700 text-white font-bold shadow-md shadow-violet-500/30';
      case 32:
        return 'bg-purple-600 text-white font-bold shadow-md shadow-purple-500/30';
      case 64:
        return 'bg-pink-600 text-white font-bold shadow-md shadow-pink-500/30';
      case 128:
        return 'bg-rose-500 text-white font-bold shadow-lg shadow-rose-500/40';
      case 256:
        return 'bg-amber-500 text-zinc-950 font-black shadow-lg shadow-amber-500/40';
      case 512:
        return 'bg-emerald-500 text-zinc-950 font-black shadow-lg shadow-emerald-500/40';
      case 1024:
        return 'bg-cyan-400 text-zinc-950 font-black shadow-xl shadow-cyan-400/50';
      case 2048:
        return 'bg-gradient-to-r from-amber-400 via-pink-500 to-indigo-500 text-white font-black shadow-2xl animate-pulse';
      default:
        return 'bg-indigo-600 text-white font-black shadow-2xl';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-5 sm:p-7 rounded-3xl liquid-glass-elevated shadow-2xl relative">
      <div className="glass-reflection-highlight" />

      {/* Game Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
            Cyber 2048
            <span className="text-xs font-mono font-normal liquid-badge text-indigo-400">
              Neon Grid
            </span>
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">Merge matching blocks to reach 2048</p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-xl liquid-btn-secondary text-muted-foreground hover:text-foreground transition-colors"
            title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-indigo-400" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={restartGame}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl liquid-btn-primary transition-all"
            title="Restart Game (R)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Score Boards */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="p-3.5 rounded-2xl liquid-glass-subtle text-center">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground block">
            Score
          </span>
          <span className="text-xl sm:text-2xl font-black text-foreground font-mono">
            {score}
          </span>
        </div>
        <div className="p-3.5 rounded-2xl liquid-glass-subtle text-center">
          <div className="flex items-center justify-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-amber-500">
            <Trophy className="w-3 h-3" />
            <span>Best</span>
          </div>
          <span className="text-xl sm:text-2xl font-black text-amber-500 font-mono">
            {bestScore}
          </span>
        </div>
      </div>

      {/* Grid Canvas Container */}
      <div
        className="relative p-3.5 rounded-2xl liquid-glass aspect-square touch-none select-none border border-border/60"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="grid grid-cols-4 grid-rows-4 gap-2.5 h-full w-full">
          {board.map((row, r) =>
            row.map((val, c) => (
              <div
                key={`${r}-${c}`}
                className={cn(
                  'flex items-center justify-center rounded-xl transition-all duration-100 font-mono shadow-xs',
                  val === 0
                    ? 'liquid-glass-subtle text-transparent'
                    : getTileClasses(val)
                )}
              >
                {val > 0 && (
                  <span
                    className={cn(
                      'transition-transform font-black',
                      val < 100 ? 'text-xl sm:text-2xl' : val < 1000 ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'
                    )}
                  >
                    {val}
                  </span>
                )}
              </div>
            ))
          )}
        </div>

        {/* Win Overlay */}
        {won && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/85 backdrop-blur-xl rounded-2xl p-6 text-center animate-in fade-in">
            <Sparkles className="w-10 h-10 text-amber-400 mb-2 animate-bounce" />
            <h3 className="text-2xl font-black text-white">2048 Reached!</h3>
            <p className="text-xs text-zinc-300 mt-1 mb-4">You have mastered the neural grid!</p>
            <div className="flex gap-2">
              <button
                onClick={() => setWon(false)}
                className="px-4 py-2 rounded-xl liquid-btn-primary text-xs font-bold"
              >
                Keep Playing
              </button>
              <button
                onClick={restartGame}
                className="px-4 py-2 rounded-xl liquid-btn-secondary text-xs font-bold"
              >
                New Game
              </button>
            </div>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/85 backdrop-blur-xl rounded-2xl p-6 text-center animate-in fade-in">
            <Award className="w-10 h-10 text-rose-500 mb-2" />
            <h3 className="text-2xl font-black text-white">Grid Full!</h3>
            <p className="text-xs text-zinc-300 mt-1 mb-4">
              Final Score: <span className="font-mono font-bold text-amber-400">{score}</span>
            </p>
            <button
              onClick={restartGame}
              className="px-5 py-2.5 rounded-xl liquid-btn-primary text-xs font-bold transition-transform hover:scale-105"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      {/* On-screen directional buttons for mobile & tablet */}
      <div className="mt-5 pt-4 border-t border-border/50">
        <div className="text-[11px] text-center text-muted-foreground mb-3 font-mono">
          Swipe on screen or use tactile buttons:
        </div>
        <div className="flex flex-col items-center gap-1.5 max-w-[180px] mx-auto">
          <button
            onClick={() => move('up')}
            className="w-12 h-10 rounded-xl liquid-btn-secondary flex items-center justify-center text-xs font-bold transition-all"
            aria-label="Move Up"
          >
            ▲
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => move('left')}
              className="w-12 h-10 rounded-xl liquid-btn-secondary flex items-center justify-center text-xs font-bold transition-all"
              aria-label="Move Left"
            >
              ◀
            </button>
            <button
              onClick={() => move('down')}
              className="w-12 h-10 rounded-xl liquid-btn-secondary flex items-center justify-center text-xs font-bold transition-all"
              aria-label="Move Down"
            >
              ▼
            </button>
            <button
              onClick={() => move('right')}
              className="w-12 h-10 rounded-xl liquid-btn-secondary flex items-center justify-center text-xs font-bold transition-all"
              aria-label="Move Right"
            >
              ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
