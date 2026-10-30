
'use client';

import * as React from 'react';
import {
  RotateCcw,
  Trophy,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Flame,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Gamepad2,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Point = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Difficulty = 'Casual' | 'Normal' | 'Overdrive';

const GRID_SIZE = 20;
const CANVAS_SIZE = 400;
const STORAGE_KEY = 'retro-snake-best-score';

const INITIAL_SNAKE: Point[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];

const DIFFICULTIES: { label: Difficulty; speed: number; description: string }[] = [
  { label: 'Casual', speed: 280, description: 'Relaxed pace' },
  { label: 'Normal', speed: 185, description: 'Classic mode' },
  { label: 'Overdrive', speed: 100, description: 'Maximum speed' },
];

function createFood(snake: Point[]): Point | null {
  const emptyCells: Point[] = [];

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (!snake.some((segment) => segment.x === x && segment.y === y)) {
        emptyCells.push({ x, y });
      }
    }
  }

  if (emptyCells.length === 0) return null;

  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function samePoint(a: Point, b: Point): boolean {
  return a.x === b.x && a.y === b.y;
}

export function RetroSnake() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const gameAreaRef = React.useRef<HTMLDivElement | null>(null);
  const audioContextRef = React.useRef<AudioContext | null>(null);

  const snakeRef = React.useRef<Point[]>(INITIAL_SNAKE.map((point) => ({ ...point })));
  const foodRef = React.useRef<Point | null>({ x: 5, y: 5 });
  const directionRef = React.useRef<Direction>('UP');
  const lastDirectionRef = React.useRef<Direction>('UP');

  const [snake, setSnake] = React.useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = React.useState<Point | null>({ x: 5, y: 5 });
  const [direction, setDirection] = React.useState<Direction>('UP');
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [gameOver, setGameOver] = React.useState(false);
  const [hasWon, setHasWon] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [bestScore, setBestScore] = React.useState(0);
  const [difficulty, setDifficulty] = React.useState<Difficulty>('Normal');
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  const currentDifficulty =
    DIFFICULTIES.find((item) => item.label === difficulty) ?? DIFFICULTIES[1];

  // Load the saved high score.
  React.useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(STORAGE_KEY));
      if (Number.isFinite(saved) && saved >= 0) {
        setBestScore(saved);
      }
    } catch {
      // Storage may be unavailable in private browsing.
    }
  }, []);

  // Persist a new high score.
  React.useEffect(() => {
    if (score <= bestScore) return;

    setBestScore(score);

    try {
      localStorage.setItem(STORAGE_KEY, String(score));
    } catch {
      // The game remains playable without storage.
    }
  }, [score, bestScore]);

  // Short synthesized sound effects. Reuse the audio context.
  const playBeep = React.useCallback(
    (frequency: number, duration = 0.09) => {
      if (!soundEnabled || typeof window === 'undefined') return;

      try {
        const AudioContextClass =
          window.AudioContext ??
          (window as Window & { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext;

        if (!AudioContextClass) return;

        const context =
          audioContextRef.current ?? new AudioContextClass();

        audioContextRef.current = context;

        if (context.state === 'suspended') {
          void context.resume();
        }

        const oscillator = context.createOscillator();
        const gain = context.createGain();

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(frequency, context.currentTime);

        gain.gain.setValueAtTime(0.035, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          context.currentTime + duration,
        );

        oscillator.connect(gain);
        gain.connect(context.destination);

        oscillator.start();
        oscillator.stop(context.currentTime + duration);
      } catch {
        // Audio is optional; ignore unsupported audio environments.
      }
    },
    [soundEnabled],
  );

  const resetGame = React.useCallback(() => {
    const freshSnake = INITIAL_SNAKE.map((point) => ({ ...point }));
    const freshFood = createFood(freshSnake);

    snakeRef.current = freshSnake;
    foodRef.current = freshFood;
    directionRef.current = 'UP';
    lastDirectionRef.current = 'UP';

    setSnake(freshSnake);
    setFood(freshFood);
    setDirection('UP');
    setScore(0);
    setGameOver(false);
    setHasWon(false);
    setIsPlaying(true);

    gameAreaRef.current?.focus();
  }, []);

  const changeDirection = React.useCallback(
    (nextDirection: Direction) => {
      const current = directionRef.current;

      // Prevent an immediate 180-degree turn.
      if (
        (nextDirection === 'UP' && current === 'DOWN') ||
        (nextDirection === 'DOWN' && current === 'UP') ||
        (nextDirection === 'LEFT' && current === 'RIGHT') ||
        (nextDirection === 'RIGHT' && current === 'LEFT')
      ) {
        return;
      }

      directionRef.current = nextDirection;
      lastDirectionRef.current = nextDirection;
      setDirection(nextDirection);

      if (!gameOver && !hasWon) {
        setIsPlaying(true);
      }
    },
    [gameOver, hasWon],
  );

  const handleDifficultyChange = (nextDifficulty: Difficulty) => {
    setDifficulty(nextDifficulty);
    // Apply the new speed immediately by restarting the current interval.
  };

  // Game loop: refs keep each tick working with the latest game state.
  React.useEffect(() => {
    if (!isPlaying || gameOver || hasWon) return;

    const timer = window.setInterval(() => {
      const currentSnake = snakeRef.current;
      const currentFood = foodRef.current;
      const nextDirection = directionRef.current;
      const head = { ...currentSnake[0] };

      if (nextDirection === 'UP') head.y -= 1;
      if (nextDirection === 'DOWN') head.y += 1;
      if (nextDirection === 'LEFT') head.x -= 1;
      if (nextDirection === 'RIGHT') head.x += 1;

      // Wall collision.
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
      ) {
        setGameOver(true);
        setIsPlaying(false);
        playBeep(140, 0.2);
        return;
      }

      const eating = currentFood !== null && samePoint(head, currentFood);

      // When not eating, the tail moves away during this tick, so it is
      // excluded from collision detection.
      const collisionBody = eating
        ? currentSnake
        : currentSnake.slice(0, -1);

      if (collisionBody.some((segment) => samePoint(segment, head))) {
        setGameOver(true);
        setIsPlaying(false);
        playBeep(140, 0.2);
        return;
      }

      const nextSnake = [head, ...currentSnake];

      if (!eating) {
        nextSnake.pop();
      }

      snakeRef.current = nextSnake;
      setSnake(nextSnake);

      if (eating && currentFood) {
        const nextScore = score + 10;
        setScore(nextScore);
        playBeep(580, 0.07);

        const nextFood = createFood(nextSnake);
        foodRef.current = nextFood;
        setFood(nextFood);

        if (!nextFood) {
          setHasWon(true);
          setIsPlaying(false);
        }
      }
    }, currentDifficulty.speed);

    return () => window.clearInterval(timer);
  }, [
    isPlaying,
    gameOver,
    hasWon,
    currentDifficulty.speed,
    playBeep,
    score,
  ]);

  // Keyboard controls are scoped to the game area so the game doesn't
  // hijack arrow keys while the user is interacting with the rest of the page.
  React.useEffect(() => {
    const area = gameAreaRef.current;
    if (!area) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      if (
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable
      ) {
        return;
      }

      const keyMap: Record<string, Direction> = {
        ArrowUp: 'UP',
        KeyW: 'UP',
        ArrowDown: 'DOWN',
        KeyS: 'DOWN',
        ArrowLeft: 'LEFT',
        KeyA: 'LEFT',
        ArrowRight: 'RIGHT',
        KeyD: 'RIGHT',
      };

      const mappedDirection = keyMap[event.code];

      if (mappedDirection) {
        event.preventDefault();
        changeDirection(mappedDirection);
        return;
      }

      if (event.code === 'Space') {
        event.preventDefault();

        if (gameOver || hasWon) {
          resetGame();
        } else {
          setIsPlaying((playing) => !playing);
        }
      }
    };

    area.addEventListener('keydown', handleKeyDown);

    return () => area.removeEventListener('keydown', handleKeyDown);
  }, [changeDirection, gameOver, hasWon, resetGame]);

  // Render the canvas.
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) return;

    const cellSize = canvas.width / GRID_SIZE;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#090d16';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle grid.
    context.strokeStyle = 'rgba(148, 163, 184, 0.09)';
    context.lineWidth = 1;

    for (let index = 0; index <= GRID_SIZE; index++) {
      const position = index * cellSize;

      context.beginPath();
      context.moveTo(position, 0);
      context.lineTo(position, canvas.height);
      context.stroke();

      context.beginPath();
      context.moveTo(0, position);
      context.lineTo(canvas.width, position);
      context.stroke();
    }

    // Food orb.
    if (food) {
      const centerX = food.x * cellSize + cellSize / 2;
      const centerY = food.y * cellSize + cellSize / 2;

      context.save();
      context.fillStyle = '#fb7185';
      context.shadowColor = '#fb7185';
      context.shadowBlur = 14;
      context.beginPath();
      context.arc(centerX, centerY, cellSize * 0.31, 0, Math.PI * 2);
      context.fill();

      context.shadowBlur = 0;
      context.fillStyle = '#fff1f2';
      context.beginPath();
      context.arc(
        centerX - cellSize * 0.08,
        centerY - cellSize * 0.08,
        cellSize * 0.09,
        0,
        Math.PI * 2,
      );
      context.fill();
      context.restore();
    }

    // Snake body.
    snake.forEach((segment, index) => {
      const x = segment.x * cellSize + 1.5;
      const y = segment.y * cellSize + 1.5;
      const size = cellSize - 3;

      context.save();
      context.fillStyle =
        index === 0
          ? '#6ee7b7'
          : index % 2 === 0
            ? '#34d399'
            : '#059669';

      if (index === 0) {
        context.shadowColor = '#10b981';
        context.shadowBlur = 12;
      }

      context.beginPath();
      context.roundRect(x, y, size, size, index === 0 ? 5 : 3);
      context.fill();

      // Eyes on the head indicate the current direction.
      if (index === 0) {
        context.shadowBlur = 0;
        context.fillStyle = '#052e25';

        const eyeSize = Math.max(2, cellSize * 0.1);
        let eyes: Point[];

        if (direction === 'UP') {
          eyes = [
            { x: x + size * 0.3, y: y + size * 0.25 },
            { x: x + size * 0.7, y: y + size * 0.25 },
          ];
        } else if (direction === 'DOWN') {
          eyes = [
            { x: x + size * 0.3, y: y + size * 0.75 },
            { x: x + size * 0.7, y: y + size * 0.75 },
          ];
        } else if (direction === 'LEFT') {
          eyes = [
            { x: x + size * 0.25, y: y + size * 0.3 },
            { x: x + size * 0.25, y: y + size * 0.7 },
          ];
        } else {
          eyes = [
            { x: x + size * 0.75, y: y + size * 0.3 },
            { x: x + size * 0.75, y: y + size * 0.7 },
          ];
        }

        eyes.forEach((eye) => {
          context.beginPath();
          context.arc(eye.x, eye.y, eyeSize, 0, Math.PI * 2);
          context.fill();
        });
      }

      context.restore();
    });
  }, [snake, food, direction]);

  // Clean up the audio context when the component unmounts.
  React.useEffect(() => {
    return () => {
      const context = audioContextRef.current;
      if (context && context.state !== 'closed') {
        void context.close();
      }
    };
  }, []);

  const progress = Math.min((snake.length / (GRID_SIZE * GRID_SIZE)) * 100, 100);

  return (
    <div
      ref={gameAreaRef}
      tabIndex={0}
      role="application"
      aria-label="Retro Snake Quest game. Use arrow keys or WASD to move."
      className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl p-4 shadow-2xl outline-none sm:p-6 liquid-glass-elevated"
      onClick={(event) => {
        if (!(event.target as HTMLElement).closest('button')) {
          gameAreaRef.current?.focus();
        }
      }}
    >
      <div className="glass-reflection-highlight pointer-events-none" />

      {/* Header */}
      <div className="relative mb-5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-1.5 flex items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10">
              <Gamepad2 className="h-5 w-5 text-emerald-400" />
            </div>

            <div>
              <h2 className="text-lg font-black tracking-tight text-foreground sm:text-xl">
                Retro Snake Quest
              </h2>
              <p className="text-[11px] text-muted-foreground">
                Collect orbs. Beat your record.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 pl-1">
            <span className="relative flex h-2 w-2">
              <span
                className={cn(
                  'absolute inline-flex h-full w-full rounded-full opacity-70',
                  isPlaying ? 'animate-ping bg-emerald-400' : 'bg-zinc-500',
                )}
              />
              <span
                className={cn(
                  'relative inline-flex h-2 w-2 rounded-full',
                  isPlaying ? 'bg-emerald-400' : 'bg-zinc-500',
                )}
              />
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              {gameOver ? 'Game over' : hasWon ? 'Victory' : isPlaying ? 'Live session' : 'Ready to play'}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSoundEnabled((enabled) => !enabled)}
            className="liquid-btn-secondary rounded-xl p-2.5 text-muted-foreground transition-colors hover:text-foreground"
            title={soundEnabled ? 'Mute sound' : 'Enable sound'}
            aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            aria-pressed={soundEnabled}
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-emerald-400" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              if (gameOver || hasWon) {
                resetGame();
              } else {
                setIsPlaying((playing) => !playing);
                gameAreaRef.current?.focus();
              }
            }}
            className="liquid-btn-secondary rounded-xl p-2.5 text-foreground transition-colors"
            title={isPlaying ? 'Pause game' : 'Resume game'}
            aria-label={isPlaying ? 'Pause game' : 'Resume game'}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4 text-emerald-400" />
            )}
          </button>

          <button
            type="button"
            onClick={resetGame}
            className="liquid-btn-primary flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-bold transition-transform hover:scale-[1.03] active:scale-95"
            title="Start a new game"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Difficulty selector */}
      <div className="mb-4 rounded-2xl border border-white/10 bg-black/5 p-1.5 dark:bg-white/[0.03]">
        <div className="grid grid-cols-3 gap-1.5">
          {DIFFICULTIES.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleDifficultyChange(item.label)}
              title={item.description}
              aria-pressed={difficulty === item.label}
              className={cn(
                'rounded-xl px-2 py-2.5 text-center transition-all duration-200',
                difficulty === item.label
                  ? 'liquid-btn-primary text-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-white/5 hover:text-foreground',
              )}
            >
              <span className="flex items-center justify-center gap-1 text-xs font-bold">
                {item.label === 'Overdrive' && <Zap className="h-3 w-3 text-amber-400" />}
                {item.label}
              </span>
              <span className="mt-0.5 block text-[9px] opacity-70">
                {item.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Score cards */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="liquid-glass-subtle rounded-2xl p-3.5">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Current score
          </p>
          <div className="flex items-end justify-between gap-2">
            <span className="font-mono text-2xl font-black tabular-nums text-foreground">
              {String(score).padStart(3, '0')}
            </span>
            <span className="mb-1 rounded-lg bg-emerald-400/10 px-2 py-1 text-[9px] font-bold text-emerald-400">
              +10 / orb
            </span>
          </div>
        </div>

        <div className="liquid-glass-subtle rounded-2xl p-3.5">
          <p className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <Trophy className="h-3 w-3 text-amber-400" />
            Personal best
          </p>
          <div className="flex items-end justify-between gap-2">
            <span className="font-mono text-2xl font-black tabular-nums text-amber-400">
              {String(bestScore).padStart(3, '0')}
            </span>
            {score > 0 && score >= bestScore && (
              <span className="mb-1 text-[9px] font-bold text-emerald-400">
                NEW BEST
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Game board */}
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#090d16] shadow-[0_0_35px_rgba(16,185,129,0.07)]">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="block aspect-square h-auto w-full"
          aria-label={`Snake game board. Score ${score}.`}
        />

        {/* Status overlay */}
        {(!isPlaying || gameOver || hasWon) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050810]/85 p-5 text-center backdrop-blur-md">
            {gameOver ? (
              <>
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-400/10">
                  <Flame className="h-9 w-9 text-rose-400" />
                </div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-rose-300">
                  Session ended
                </p>
                <h3 className="text-2xl font-black tracking-tight text-white">
                  System Crash!
                </h3>
                <p className="mt-2 text-xs text-zinc-400">
                  Final score
                </p>
                <p className="mb-5 mt-1 font-mono text-3xl font-black text-amber-300">
                  {score}
                </p>
                <button
                  type="button"
                  onClick={resetGame}
                  className="liquid-btn-primary flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-transform hover:scale-105 active:scale-95"
                >
                  <RotateCcw className="h-4 w-4" />
                  Play Again
                </button>
              </>
            ) : hasWon ? (
              <>
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10">
                  <Trophy className="h-9 w-9 text-amber-300" />
                </div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-300">
                  All cells collected
                </p>
                <h3 className="text-2xl font-black text-white">
                  Perfect Run!
                </h3>
                <p className="mb-5 mt-2 text-sm text-zinc-400">
                  You filled the entire board.
                </p>
                <button
                  type="button"
                  onClick={resetGame}
                  className="liquid-btn-primary flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-transform hover:scale-105"
                >
                  <Play className="h-4 w-4" />
                  Play Again
                </button>
              </>
            ) : (
              <>
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10">
                  <Gamepad2 className="h-9 w-9 text-emerald-300" />
                </div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-300">
                  Arcade mode
                </p>
                <h3 className="text-2xl font-black tracking-tight text-white">
                  Ready to Play?
                </h3>
                <p className="mb-5 mt-2 max-w-[220px] text-xs leading-relaxed text-zinc-400">
                  Collect the glowing orbs and avoid the walls and your own tail.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(true);
                    gameAreaRef.current?.focus();
                  }}
                  className="liquid-btn-primary flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-transform hover:scale-105 active:scale-95"
                >
                  <Play className="h-4 w-4" />
                  Start Game
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Board status */}
      <div className="mt-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Board occupancy
          </p>
          <div className="mt-1.5 h-1.5 w-32 overflow-hidden rounded-full bg-zinc-500/15">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-300 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="font-mono text-xs tabular-nums text-muted-foreground">
          {snake.length} / {GRID_SIZE * GRID_SIZE}
          <span className="ml-1 text-[10px]">cells</span>
        </p>
      </div>

      {/* Touch controls */}
      <div className="mt-5 border-t border-border/50 pt-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Movement controls
          </p>
          <span className="text-[10px] text-muted-foreground">
            Arrow keys / WASD
          </span>
        </div>

        <div className="mx-auto grid w-fit grid-cols-3 gap-2">
          <div />
          <button
            type="button"
            onClick={() => changeDirection('UP')}
            className="liquid-btn-secondary flex h-11 w-14 items-center justify-center rounded-xl text-foreground transition-all hover:-translate-y-0.5 active:scale-95"
            aria-label="Move up"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
          <div />

          <button
            type="button"
            onClick={() => changeDirection('LEFT')}
            className="liquid-btn-secondary flex h-11 w-14 items-center justify-center rounded-xl text-foreground transition-all hover:-translate-x-0.5 active:scale-95"
            aria-label="Move left"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => changeDirection('DOWN')}
            className="liquid-btn-secondary flex h-11 w-14 items-center justify-center rounded-xl text-foreground transition-all hover:translate-y-0.5 active:scale-95"
            aria-label="Move down"
          >
            <ArrowDown className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => changeDirection('RIGHT')}
            className="liquid-btn-secondary flex h-11 w-14 items-center justify-center rounded-xl text-foreground transition-all hover:translate-x-0.5 active:scale-95"
            aria-label="Move right"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-3 text-center text-[10px] leading-relaxed text-muted-foreground">
          Press <kbd className="rounded border border-border/70 px-1 py-0.5 font-mono">Space</kbd> to pause or resume.
          Click the game board first to enable keyboard controls.
        </p>
      </div>
    </div>
  );
}
