'use client';

import * as React from 'react';
import { RotateCcw, Trophy, Play, Pause, Volume2, VolumeX, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

type Point = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const GRID_SIZE = 20;

export function RetroSnake() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = React.useState<Point[]>([
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
  ]);
  const [food, setFood] = React.useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = React.useState<Direction>('UP');
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [gameOver, setGameOver] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [bestScore, setBestScore] = React.useState(0);
  const [speed, setSpeed] = React.useState<number>(110); // ms per tick
  const [difficulty, setDifficulty] = React.useState<'Casual' | 'Normal' | 'Overdrive'>('Normal');
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  const directionRef = React.useRef<Direction>('UP');
  directionRef.current = direction;

  // Load high score
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('retro-snake-best-score');
      if (saved) setBestScore(parseInt(saved, 10));
    } catch {
      // ignore
    }
  }, []);

  // Update high score
  React.useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      try {
        localStorage.setItem('retro-snake-best-score', score.toString());
      } catch {
        // ignore
      }
    }
  }, [score, bestScore]);

  // Audio tone helper
  const playBeep = (freq: number) => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // ignore
    }
  };

  const generateFood = React.useCallback((currentSnake: Point[]): Point => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const collision = currentSnake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      );
      if (!collision) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    const initialSnake: Point[] = [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ];
    setSnake(initialSnake);
    setDirection('UP');
    directionRef.current = 'UP';
    setFood(generateFood(initialSnake));
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  // Change difficulty
  const handleDifficultyChange = (lvl: 'Casual' | 'Normal' | 'Overdrive') => {
    setDifficulty(lvl);
    if (lvl === 'Casual') setSpeed(140);
    else if (lvl === 'Normal') setSpeed(105);
    else setSpeed(70);
  };

  // Turn direction with 180° turn prevention
  const changeDirection = (newDir: Direction) => {
    const current = directionRef.current;
    if (newDir === 'UP' && current === 'DOWN') return;
    if (newDir === 'DOWN' && current === 'UP') return;
    if (newDir === 'LEFT' && current === 'RIGHT') return;
    if (newDir === 'RIGHT' && current === 'LEFT') return;
    setDirection(newDir);
    directionRef.current = newDir;
    if (!isPlaying && !gameOver) {
      setIsPlaying(true);
    }
  };

  // Game Loop
  React.useEffect(() => {
    if (!isPlaying || gameOver) return;

    const timer = setInterval(() => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };
        const currentDir = directionRef.current;

        if (currentDir === 'UP') head.y -= 1;
        else if (currentDir === 'DOWN') head.y += 1;
        else if (currentDir === 'LEFT') head.x -= 1;
        else if (currentDir === 'RIGHT') head.x += 1;

        // Wall collisions
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true);
          setIsPlaying(false);
          playBeep(140);
          return prevSnake;
        }

        // Self collisions
        for (let i = 0; i < prevSnake.length; i++) {
          if (prevSnake[i].x === head.x && prevSnake[i].y === head.y) {
            setGameOver(true);
            setIsPlaying(false);
            playBeep(140);
            return prevSnake;
          }
        }

        const newSnake = [head, ...prevSnake];

        // Food eating
        if (head.x === food.x && head.y === food.y) {
          setScore((s) => s + 10);
          setFood(generateFood(newSnake));
          playBeep(580);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(timer);
  }, [isPlaying, gameOver, food, generateFood, speed]);

  // Keyboard controls
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault();
        changeDirection('UP');
      } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        changeDirection('DOWN');
      } else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault();
        changeDirection('LEFT');
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        changeDirection('RIGHT');
      } else if (e.code === 'Space') {
        e.preventDefault();
        if (gameOver) resetGame();
        else setIsPlaying((p) => !p);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver]);

  // Canvas render
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const cellSize = width / GRID_SIZE;

    // Clear background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    // Grid lines (subtle)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(width, i * cellSize);
      ctx.stroke();
    }

    // Draw food (pulsing glowing orb)
    ctx.fillStyle = '#f43f5e';
    ctx.shadowColor = '#f43f5e';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(
      food.x * cellSize + cellSize / 2,
      food.y * cellSize + cellSize / 2,
      cellSize / 2.5,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Reset shadow
    ctx.shadowBlur = 0;

    // Draw snake body
    snake.forEach((seg, idx) => {
      if (idx === 0) {
        // Head
        ctx.fillStyle = '#10b981';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 10;
      } else {
        ctx.fillStyle = idx % 2 === 0 ? '#34d399' : '#059669';
        ctx.shadowBlur = 0;
      }

      ctx.beginPath();
      ctx.roundRect(
        seg.x * cellSize + 1,
        seg.y * cellSize + 1,
        cellSize - 2,
        cellSize - 2,
        idx === 0 ? 4 : 2
      );
      ctx.fill();
    });

    ctx.shadowBlur = 0;
  }, [snake, food]);

  return (
    <div className="w-full max-w-md mx-auto p-5 sm:p-7 rounded-3xl liquid-glass-elevated shadow-2xl relative">
      <div className="glass-reflection-highlight" />

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
            Retro Snake Quest
            <span className="text-xs font-mono font-normal liquid-badge text-emerald-400">
              60 FPS
            </span>
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">Consume cyber power orbs to expand</p>
        </div>

        {/* SFX & Pause Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-xl liquid-btn-secondary text-muted-foreground hover:text-foreground transition-colors"
            title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2.5 rounded-xl liquid-btn-secondary text-foreground transition-colors"
            title={isPlaying ? 'Pause Game (Space)' : 'Play Game'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-500" />}
          </button>
          <button
            onClick={resetGame}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl liquid-btn-primary transition-all"
            title="Reset Game"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Difficulty Tier Selector Pill */}
      <div className="flex items-center justify-between gap-1.5 p-1.5 mb-4 liquid-glass-pill rounded-full">
        {(['Casual', 'Normal', 'Overdrive'] as const).map((lvl) => (
          <button
            key={lvl}
            onClick={() => handleDifficultyChange(lvl)}
            className={cn(
              'flex-1 py-1.5 text-xs font-semibold rounded-full transition-all duration-300',
              difficulty === lvl
                ? 'liquid-btn-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-white/10 dark:hover:bg-white/5'
            )}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* Score bar */}
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

      {/* Canvas Wrapper */}
      <div className="relative rounded-2xl overflow-hidden border border-border/60 bg-zinc-950 aspect-square shadow-inner">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="w-full h-full block"
        />

        {/* Start / Game Over overlay */}
        {(!isPlaying || gameOver) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-xl p-6 text-center animate-in fade-in rounded-2xl">
            {gameOver ? (
              <>
                <Flame className="w-10 h-10 text-rose-500 mb-2 animate-bounce" />
                <h3 className="text-2xl font-black text-white">System Crash!</h3>
                <p className="text-xs text-zinc-300 mt-1 mb-4">
                  Final Score: <span className="font-bold text-amber-400 font-mono">{score}</span>
                </p>
                <button
                  onClick={resetGame}
                  className="px-5 py-2.5 rounded-xl liquid-btn-primary text-xs font-bold transition-transform hover:scale-105"
                >
                  Play Again
                </button>
              </>
            ) : (
              <>
                <Play className="w-12 h-12 text-emerald-400 mb-3" />
                <h3 className="text-xl font-black text-white">Press Play to Start</h3>
                <p className="text-xs text-zinc-400 mt-1 mb-4">Use keyboard arrows, WASD, or tactile D-pad</p>
                <button
                  onClick={() => setIsPlaying(true)}
                  className="px-6 py-2.5 rounded-xl liquid-btn-primary text-xs font-bold transition-transform hover:scale-105"
                >
                  Start Game
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* On-screen D-Pad for Touch and Click */}
      <div className="mt-5 pt-4 border-t border-border/50">
        <div className="flex flex-col items-center gap-1.5 max-w-[180px] mx-auto">
          <button
            onClick={() => changeDirection('UP')}
            className="w-12 h-10 rounded-xl liquid-btn-secondary flex items-center justify-center text-xs font-bold transition-all"
            aria-label="Up"
          >
            ▲
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => changeDirection('LEFT')}
              className="w-12 h-10 rounded-xl liquid-btn-secondary flex items-center justify-center text-xs font-bold transition-all"
              aria-label="Left"
            >
              ◀
            </button>
            <button
              onClick={() => changeDirection('DOWN')}
              className="w-12 h-10 rounded-xl liquid-btn-secondary flex items-center justify-center text-xs font-bold transition-all"
              aria-label="Down"
            >
              ▼
            </button>
            <button
              onClick={() => changeDirection('RIGHT')}
              className="w-12 h-10 rounded-xl liquid-btn-secondary flex items-center justify-center text-xs font-bold transition-all"
              aria-label="Right"
            >
              ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
