
'use client';

import * as React from 'react';
import {
  RotateCcw,
  Trophy,
  Shield,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Brain,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

const TONE_FREQUENCIES = [
  261.63, 293.66, 329.63, 349.23, 392, 440, 493.88, 523.25, 587.33,
];

const PAD_STYLES = [
  'from-indigo-500 to-blue-600',
  'from-violet-500 to-purple-600',
  'from-pink-500 to-rose-600',
  'from-amber-400 to-orange-600',
  'from-emerald-400 to-teal-600',
  'from-cyan-400 to-sky-600',
  'from-fuchsia-500 to-pink-600',
  'from-lime-400 to-emerald-600',
  'from-red-500 to-rose-600',
];

const PAD_GLOWS = [
  'shadow-indigo-500/50',
  'shadow-violet-500/50',
  'shadow-pink-500/50',
  'shadow-amber-500/50',
  'shadow-emerald-500/50',
  'shadow-cyan-500/50',
  'shadow-fuchsia-500/50',
  'shadow-lime-500/50',
  'shadow-red-500/50',
];

type GameStatus = 'idle' | 'playing' | 'success' | 'gameover';

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
  const [status, setStatus] = React.useState<GameStatus>('idle');
  const [message, setMessage] = React.useState('Initialize the neural matrix to begin.');
  const [lastMistake, setLastMistake] = React.useState(false);

  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([]);
  const generation = React.useRef(0);
  const inputLocked = React.useRef(true);
  const sequenceRef = React.useRef<number[]>([]);
  const playerStepRef = React.useRef(0);
  const livesRef = React.useRef(3);
  const levelRef = React.useRef(1);
  const bestLevelRef = React.useRef(1);
  const startedRef = React.useRef(false);
  const gameOverRef = React.useRef(false);
  const soundRef = React.useRef(true);
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const activePadTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    try {
      const saved = Number(localStorage.getItem('memory-matrix-best-level'));
      if (Number.isFinite(saved) && saved >= 1) {
        bestLevelRef.current = Math.floor(saved);
        setBestLevel(Math.floor(saved));
      }
    } catch {
      // Storage may be unavailable in private browsing.
    }

    return () => {
      generation.current += 1;
      timers.current.forEach(clearTimeout);
      timers.current = [];

      if (activePadTimer.current) {
        clearTimeout(activePadTimer.current);
      }

      const context = audioContextRef.current;
      if (context && context.state !== 'closed') {
        void context.close().catch(() => {});
      }
    };
  }, []);

  const schedule = React.useCallback(
    (callback: () => void, delay: number, token: number) => {
      const timer = setTimeout(() => {
        if (generation.current === token) callback();
      }, delay);

      timers.current.push(timer);
      return timer;
    },
    [],
  );

  const cancelTimers = React.useCallback(() => {
    generation.current += 1;
    timers.current.forEach(clearTimeout);
    timers.current = [];

    if (activePadTimer.current) {
      clearTimeout(activePadTimer.current);
      activePadTimer.current = null;
    }

    setActivePad(null);
    return generation.current;
  }, []);

  const playTone = React.useCallback((index: number) => {
    if (!soundRef.current) return;

    try {
      const AudioContextConstructor =
        window.AudioContext ||
        (window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }).webkitAudioContext;

      if (!AudioContextConstructor) return;

      let context = audioContextRef.current;

      if (!context || context.state === 'closed') {
        context = new AudioContextConstructor();
        audioContextRef.current = context;
      }

      if (context.state === 'suspended') {
        void context.resume().catch(() => {});
      }

      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const now = context.currentTime;

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(
        TONE_FREQUENCIES[index] ?? 180,
        now,
      );

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.075, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.23);

      oscillator.onended = () => {
        oscillator.disconnect();
        gain.disconnect();
      };
    } catch {
      // Audio is optional; gameplay must continue without it.
    }
  }, []);

  const updateBestLevel = React.useCallback((value: number) => {
    if (value <= bestLevelRef.current) return;

    bestLevelRef.current = value;
    setBestLevel(value);

    try {
      localStorage.setItem('memory-matrix-best-level', String(value));
    } catch {
      // Keep the current-session score if storage is unavailable.
    }
  }, []);

  const playSequence = React.useCallback(
    (seq: number[]) => {
      const token = cancelTimers();

      sequenceRef.current = seq;
      playerStepRef.current = 0;
      inputLocked.current = true;

      setSequence(seq);
      setPlayerStep(0);
      setIsShowingSequence(true);
      setActivePad(null);
      setLastMistake(false);
      setStatus('playing');
      setMessage('Observe the sequence carefully...');

      const initialDelay = 450;
      const interval = Math.max(420, 650 - Math.floor(seq.length / 8) * 35);
      const flashDuration = 330;

      seq.forEach((pad, index) => {
        const startAt = initialDelay + index * interval;

        schedule(() => {
          setActivePad(pad);
          playTone(pad);

          schedule(() => {
            setActivePad(null);

            if (index === seq.length - 1) {
              setIsShowingSequence(false);
              inputLocked.current = false;
              setMessage('Your turn. Repeat the sequence.');
            }
          }, flashDuration, token);
        }, startAt, token);
      });
    },
    [cancelTimers, playTone, schedule],
  );

  const startNewGame = React.useCallback(() => {
    cancelTimers();

    const initialSeq = Array.from(
      { length: 3 },
      () => Math.floor(Math.random() * 9),
    );

    sequenceRef.current = initialSeq;
    playerStepRef.current = 0;
    livesRef.current = 3;
    levelRef.current = 1;
    startedRef.current = true;
    gameOverRef.current = false;
    inputLocked.current = true;

    setSequence(initialSeq);
    setPlayerStep(0);
    setLevel(1);
    setLives(3);
    setGameStarted(true);
    setGameOver(false);
    setLastMistake(false);
    setStatus('playing');
    setMessage('Observe the sequence carefully...');

    playSequence(initialSeq);
  }, [cancelTimers, playSequence]);

  const handlePadClick = (index: number) => {
    if (
      inputLocked.current ||
      !startedRef.current ||
      gameOverRef.current
    ) {
      return;
    }

    const seq = sequenceRef.current;
    const step = playerStepRef.current;

    setActivePad(index);
    playTone(index);

    if (activePadTimer.current) {
      clearTimeout(activePadTimer.current);
    }

    activePadTimer.current = setTimeout(() => {
      setActivePad((current) => (current === index ? null : current));
      activePadTimer.current = null;
    }, 180);

    if (index !== seq[step]) {
      inputLocked.current = true;
      setLastMistake(true);

      const nextLives = Math.max(0, livesRef.current - 1);
      livesRef.current = nextLives;

      setLives(nextLives);
      setMessage(
        nextLives > 0
          ? 'Incorrect pad. Watch the sequence again.'
          : 'All shields depleted.',
      );

      playTone(-1);

      const token = cancelTimers();

      if (nextLives <= 0) {
        gameOverRef.current = true;
        startedRef.current = false;

        setGameOver(true);
        setGameStarted(false);
        setIsShowingSequence(false);
        setStatus('gameover');
        setActivePad(null);
        return;
      }

      schedule(() => {
        playSequence(seq);
      }, 650, token);

      return;
    }

    const nextStep = step + 1;
    playerStepRef.current = nextStep;
    setPlayerStep(nextStep);
    setLastMistake(false);

    if (nextStep < seq.length) {
      setMessage(`Correct! ${seq.length - nextStep} pad(s) remaining.`);
      return;
    }

    // Lock immediately so rapid clicks cannot complete the same round twice.
    inputLocked.current = true;

    const nextLevel = levelRef.current + 1;
    levelRef.current = nextLevel;
    playerStepRef.current = 0;

    setLevel(nextLevel);
    setPlayerStep(0);
    setStatus('success');
    setMessage(`Level ${nextLevel - 1} completed! Preparing the next round...`);

    updateBestLevel(nextLevel);

    if (nextLevel % 5 === 0) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#8b5cf6', '#22d3ee', '#34d399', '#f472b6'],
        });
      } catch {
        // Confetti is decorative.
      }
    }

    const nextSeq = [...seq, Math.floor(Math.random() * 9)];
    sequenceRef.current = nextSeq;

    const token = cancelTimers();

    schedule(() => {
      playSequence(nextSeq);
    }, 900, token);
  };

  const toggleSound = () => {
    const nextValue = !soundRef.current;
    soundRef.current = nextValue;
    setSoundEnabled(nextValue);

    if (nextValue) playTone(4);
  };

  return (
    <section className="relative isolate mx-auto w-full max-w-lg overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#080a12] p-4 text-white shadow-2xl shadow-black/30 sm:p-6">
      {/* Ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 -z-10 h-64 w-64 rounded-full bg-violet-600/15 blur-[90px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-24 -z-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-[90px]"
      />

      {/* Header */}
      <header className="mb-6 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/20 to-cyan-500/10 shadow-lg shadow-violet-950/30">
            <Brain className="h-6 w-6 text-violet-300" />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-extrabold tracking-tight sm:text-xl">
                Memory Matrix
              </h2>
              <span className="rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-violet-300">
                Neural Recall
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Train your memory. Master the pattern.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
            title={soundEnabled ? 'Mute sound' : 'Enable sound'}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-violet-400/30 hover:bg-violet-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-violet-300" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </button>

          <button
            type="button"
            onClick={startNewGame}
            aria-label="Restart game"
            title="Restart game"
            className="flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-xs font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Restart</span>
          </button>
        </div>
      </header>

      {/* Stats */}
      <div className="mb-5 grid grid-cols-3 gap-2.5">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-3 text-center">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
            Level
          </span>
          <span className="mt-1 block font-mono text-2xl font-black tabular-nums text-white">
            {level}
          </span>
          <div className="mt-1 text-[10px] text-violet-300">Current</div>
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-3 text-center">
          <span className="flex items-center justify-center gap-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
            <Shield className="h-3 w-3 text-rose-400" />
            Shields
          </span>
          <div className="mt-3 flex items-center justify-center gap-1.5">
            {[1, 2, 3].map((heart) => (
              <span
                key={heart}
                className={cn(
                  'h-2.5 w-2.5 rounded-full transition-all duration-300',
                  heart <= lives
                    ? 'bg-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.55)]'
                    : 'bg-slate-700',
                )}
              />
            ))}
          </div>
          <div className="mt-2 text-[10px] text-slate-400">
            {lives} remaining
          </div>
        </div>

        <div className="rounded-2xl border border-amber-400/10 bg-amber-400/[0.035] p-3 text-center">
          <span className="flex items-center justify-center gap-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
            <Trophy className="h-3 w-3 text-amber-400" />
            Best
          </span>
          <span className="mt-1 block font-mono text-2xl font-black tabular-nums text-amber-300">
            {bestLevel}
          </span>
          <div className="mt-1 text-[10px] text-slate-500">Record</div>
        </div>
      </div>

      {/* Sequence progress */}
      <div className="mb-5 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3.5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <Zap className="h-3.5 w-3.5 text-cyan-300" />
            Neural sequence
          </span>
          <span className="font-mono text-[11px] text-slate-400">
            {gameStarted && !gameOver ? `${playerStep}/${sequence.length}` : '—'}
          </span>
        </div>
        <div
          className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]"
          role="progressbar"
          aria-label="Sequence progress"
          aria-valuemin={0}
          aria-valuemax={sequence.length || 1}
          aria-valuenow={gameStarted && !gameOver ? playerStep : 0}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-400 transition-all duration-300"
            style={{
              width: `${
                gameStarted && !gameOver && sequence.length
                  ? (playerStep / sequence.length) * 100
                  : 0
              }%`,
            }}
          />
        </div>
      </div>

      {/* Matrix */}
      <div className="relative aspect-square w-full rounded-[24px] border border-white/[0.09] bg-[#0c0f1a] p-3 shadow-inner shadow-black/40 sm:p-4">
        <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-2.5 sm:gap-3">
          {PAD_STYLES.map((gradient, index) => {
            const active = activePad === index;
            const disabled =
              !gameStarted || gameOver || isShowingSequence;

            return (
              <button
                key={index}
                type="button"
                onClick={() => handlePadClick(index)}
                disabled={disabled}
                aria-label={`Memory pad ${index + 1}${active ? ', illuminated' : ''}`}
                className={cn(
                  'group relative flex min-h-0 min-w-0 items-center justify-center overflow-hidden rounded-2xl border transition-[transform,background-color,box-shadow,border-color] duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0f1a]',
                  active
                    ? `z-10 scale-[0.96] border-white/90 bg-gradient-to-br ${gradient} shadow-[0_0_28px_rgba(139,92,246,0.28)] ${PAD_GLOWS[index]}`
                    : 'border-white/[0.07] bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.055] active:scale-[0.97]',
                  disabled && !active ? 'cursor-not-allowed' : 'cursor-pointer',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-200',
                    gradient,
                    active ? 'opacity-100' : 'group-hover:opacity-[0.08]',
                  )}
                />

                <span
                  aria-hidden="true"
                  className={cn(
                    'relative z-10 h-3 w-3 rounded-full transition-all duration-200 sm:h-3.5 sm:w-3.5',
                    active
                      ? 'scale-125 bg-white shadow-[0_0_16px_rgba(255,255,255,0.95)]'
                      : 'bg-white/15 group-hover:bg-white/35',
                  )}
                />

                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 animate-pulse bg-white/10"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Start / game-over overlay */}
        {(!gameStarted || gameOver) && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-[24px] bg-[#080a12]/90 p-5 text-center backdrop-blur-xl sm:p-8">
            <div
              className={cn(
                'mb-4 flex h-16 w-16 items-center justify-center rounded-3xl border shadow-xl',
                gameOver
                  ? 'border-rose-400/20 bg-rose-400/10 shadow-rose-950/30'
                  : 'border-violet-400/20 bg-violet-400/10 shadow-violet-950/30',
              )}
            >
              {gameOver ? (
                <Shield className="h-8 w-8 text-rose-300" />
              ) : (
                <Brain className="h-8 w-8 text-violet-300" />
              )}
            </div>

            <span className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
              {gameOver ? 'Session terminated' : 'Memory training'}
            </span>

            <h3 className="text-xl font-black tracking-tight sm:text-2xl">
              {gameOver ? 'Shields Depleted' : 'Test Your Memory'}
            </h3>

            <p className="mt-2 max-w-[260px] text-xs leading-relaxed text-slate-400 sm:text-sm">
              {gameOver
                ? `You reached level ${level}. Your best is level ${bestLevel}. Can you beat it?`
                : 'Memorize the illuminated pads, then repeat the sequence in the correct order.'}
            </p>

            {gameOver && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-amber-400/15 bg-amber-400/[0.06] px-3 py-2 text-xs text-amber-300">
                <Trophy className="h-4 w-4" />
                Best level: {bestLevel}
              </div>
            )}

            <button
              type="button"
              onClick={startNewGame}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-violet-950/40 transition hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
            >
              <Play className="h-4 w-4" />
              {gameOver ? 'Play Again' : 'Initialize Game'}
            </button>
          </div>
        )}

        {/* Round success indicator */}
        {status === 'success' && gameStarted && !gameOver && (
          <div className="pointer-events-none absolute inset-x-3 top-3 z-10 flex justify-center sm:inset-x-4 sm:top-4">
            <div className="flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-950/90 px-4 py-2 text-xs font-semibold text-emerald-300 shadow-xl backdrop-blur-xl">
              <CheckCircle2 className="h-4 w-4" />
              Level cleared
            </div>
          </div>
        )}
      </div>

      {/* Status */}
      <div
        aria-live="polite"
        className={cn(
          'mt-4 flex min-h-[48px] items-center justify-center gap-2 rounded-2xl border px-3 py-3 text-center text-xs',
          lastMistake
            ? 'border-rose-400/15 bg-rose-400/[0.05] text-rose-300'
            : isShowingSequence
              ? 'border-amber-400/15 bg-amber-400/[0.04] text-amber-300'
              : status === 'success'
                ? 'border-emerald-400/15 bg-emerald-400/[0.04] text-emerald-300'
                : 'border-white/[0.07] bg-white/[0.025] text-slate-400',
        )}
      >
        {isShowingSequence ? (
          <>
            <Sparkles className="h-4 w-4 shrink-0 animate-pulse" />
            <span>Observe the sequence · {sequence.length} pads</span>
          </>
        ) : status === 'success' ? (
          <>
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{message}</span>
          </>
        ) : gameStarted && !gameOver ? (
          <>
            <Zap className="h-4 w-4 shrink-0" />
            <span>{message}</span>
          </>
        ) : (
          <span>{message}</span>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-4 text-[10px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          NEURAL SYSTEM
        </span>
        <span className="font-mono uppercase tracking-[0.15em]">
          {sequence.length || 0} sequence units
        </span>
      </footer>
    </section>
  );
}

export default MemoryMatrix;
