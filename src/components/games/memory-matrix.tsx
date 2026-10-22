'use client';

import * as React from 'react';
import { RotateCcw, Trophy, Shield, Sparkles, Volume2, VolumeX, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

const TONE_FREQUENCIES = [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88, 523.25, 587.33];

export function MemoryMatrix() {
  const [sequence, setSequence] = React.useState<number[]>([]);
  const [playerStep, setPlayerStep] = React.useState(0);
  const [level, setLevel] = React.useState(1);
  const [lives, setLives] = React.useState(3);
  const [activePad, setActivePad] = React.useState<number | null>(null);
  const [isShowingSequence, setIsShowingSequence] = React.useState(false);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [gameOver, setGameOver] = React.useState(false);
  const [bestLevel, setBestLevel] = React.useState(1);
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  // Load high score
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('memory-matrix-best-level');
      if (saved) setBestLevel(parseInt(saved, 10));
    } catch {
      // ignore
    }
  }, []);

  const playTone = (index: number) => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(TONE_FREQUENCIES[index] || 440, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {
      // ignore
    }
  };

  const startNewGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setLevel(1);
    setLives(3);
    const initialSeq = [
      Math.floor(Math.random() * 9),
      Math.floor(Math.random() * 9),
      Math.floor(Math.random() * 9),
    ];
    setSequence(initialSeq);
    setPlayerStep(0);
    playSequence(initialSeq);
  };

  const playSequence = (seq: number[]) => {
    setIsShowingSequence(true);
    setPlayerStep(0);
    seq.forEach((padIndex, i) => {
      setTimeout(() => {
        setActivePad(padIndex);
        playTone(padIndex);
        setTimeout(() => {
          setActivePad(null);
          if (i === seq.length - 1) {
            setIsShowingSequence(false);
          }
        }, 350);
      }, (i + 1) * 550);
    });
  };

  const handlePadClick = (index: number) => {
    if (isShowingSequence || gameOver || !gameStarted) return;

    setActivePad(index);
    playTone(index);
    setTimeout(() => setActivePad(null), 200);

    if (index === sequence[playerStep]) {
      const nextStep = playerStep + 1;
      if (nextStep === sequence.length) {
        // Level Completed!
        const nextLevel = level + 1;
        setLevel(nextLevel);
        if (nextLevel > bestLevel) {
          setBestLevel(nextLevel);
          try {
            localStorage.setItem('memory-matrix-best-level', nextLevel.toString());
          } catch {
            // ignore
          }
        }
        if (nextLevel % 5 === 0) {
          try {
            confetti({ particleCount: 70, spread: 60 });
          } catch {
            // ignore
          }
        }
        const nextSeq = [...sequence, Math.floor(Math.random() * 9)];
        setSequence(nextSeq);
        setTimeout(() => {
          playSequence(nextSeq);
        }, 800);
      } else {
        setPlayerStep(nextStep);
      }
    } else {
      // Mistake made
      const nextLives = lives - 1;
      setLives(nextLives);
      playTone(130); // error sound

      if (nextLives <= 0) {
        setGameOver(true);
      } else {
        // Replay sequence for player to try again
        setTimeout(() => {
          playSequence(sequence);
        }, 700);
      }
    }
  };

  const padColors = [
    'from-indigo-500 to-blue-500',
    'from-violet-500 to-purple-500',
    'from-pink-500 to-rose-500',
    'from-amber-500 to-orange-500',
    'from-emerald-500 to-teal-500',
    'from-cyan-500 to-sky-500',
    'from-fuchsia-500 to-pink-600',
    'from-lime-500 to-emerald-600',
    'from-red-500 to-rose-600',
  ];

  return (
    <div className="w-full max-w-md mx-auto p-5 sm:p-7 rounded-3xl liquid-glass-elevated shadow-2xl relative">
      <div className="glass-reflection-highlight" />

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
            Memory Matrix
            <span className="text-xs font-mono font-normal liquid-badge text-purple-400">
              Neural Recall
            </span>
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">Repeat the illuminated pad sequences</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-xl liquid-btn-secondary text-muted-foreground hover:text-foreground transition-colors"
            title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={startNewGame}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl liquid-btn-primary transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        <div className="p-3 rounded-2xl liquid-glass-subtle text-center">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground block">
            Level
          </span>
          <span className="text-lg sm:text-xl font-black text-foreground font-mono">
            {level}
          </span>
        </div>
        <div className="p-3 rounded-2xl liquid-glass-subtle text-center">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground flex items-center justify-center gap-1">
            <Shield className="w-3 h-3 text-rose-500" />
            Shields
          </span>
          <div className="flex items-center justify-center gap-1 mt-1.5">
            {[1, 2, 3].map((heart) => (
              <span
                key={heart}
                className={cn(
                  'w-2.5 h-2.5 rounded-full transition-colors',
                  heart <= lives ? 'bg-rose-500 shadow-xs shadow-rose-500' : 'bg-muted-foreground/30'
                )}
              />
            ))}
          </div>
        </div>
        <div className="p-3 rounded-2xl liquid-glass-subtle text-center">
          <div className="flex items-center justify-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-amber-500">
            <Trophy className="w-3 h-3" />
            <span>Best</span>
          </div>
          <span className="text-lg sm:text-xl font-black text-amber-500 font-mono">
            Lv. {bestLevel}
          </span>
        </div>
      </div>

      {/* 3x3 Matrix Grid */}
      <div className="relative p-4 rounded-2xl liquid-glass border border-border/60 aspect-square shadow-inner">
        <div className="grid grid-cols-3 grid-rows-3 gap-3 h-full w-full">
          {padColors.map((gradient, idx) => {
            const isActive = activePad === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handlePadClick(idx)}
                disabled={isShowingSequence || gameOver || !gameStarted}
                className={cn(
                  'rounded-2xl border transition-all duration-200 flex items-center justify-center focus-visible:outline-none cursor-pointer',
                  isActive
                    ? `bg-gradient-to-br ${gradient} scale-95 shadow-xl border-white`
                    : 'liquid-glass-subtle hover:border-white/40 hover:scale-102'
                )}
                aria-label={`Matrix pad ${idx + 1}`}
              >
                <div
                  className={cn(
                    'w-3.5 h-3.5 rounded-full transition-opacity',
                    isActive ? 'bg-white opacity-100 shadow-md' : 'bg-white/20 opacity-40'
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Start / Game Over Overlay */}
        {(!gameStarted || gameOver) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-xl p-6 text-center animate-in fade-in rounded-2xl">
            {gameOver ? (
              <>
                <Sparkles className="w-10 h-10 text-rose-500 mb-2" />
                <h3 className="text-2xl font-black text-white">Shields Depleted!</h3>
                <p className="text-xs text-zinc-300 mt-1 mb-4">
                  You reached Level <span className="font-bold text-amber-400 font-mono">{level}</span>
                </p>
                <button
                  onClick={startNewGame}
                  className="px-6 py-2.5 rounded-xl liquid-btn-primary text-xs font-bold transition-transform hover:scale-105"
                >
                  Play Again
                </button>
              </>
            ) : (
              <>
                <Play className="w-12 h-12 text-purple-400 mb-3" />
                <h3 className="text-xl font-black text-white">Neural Pattern Test</h3>
                <p className="text-xs text-zinc-400 mt-1 mb-4">
                  Watch the matrix flash, then repeat the sequence!
                </p>
                <button
                  onClick={startNewGame}
                  className="px-6 py-2.5 rounded-xl liquid-btn-primary text-xs font-bold transition-transform hover:scale-105"
                >
                  Initialize Game
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="mt-5 p-2.5 rounded-xl liquid-glass-subtle text-center text-xs text-muted-foreground font-mono">
        {isShowingSequence ? (
          <span className="text-amber-400 animate-pulse">● System generating sequence...</span>
        ) : gameStarted && !gameOver ? (
          <span className="text-emerald-400">
            Your turn: Step {playerStep + 1} of {sequence.length}
          </span>
        ) : (
          <span>Press Initialize to begin round</span>
        )}
      </div>
    </div>
  );
}
