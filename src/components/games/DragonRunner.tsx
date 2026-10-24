'use client';

import * as React from 'react';
import {
  Play,
  RotateCcw,
  Trophy,
  Zap,
  Volume2,
  VolumeX,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Obstacle = {
  x: number;
  width: number;
  height: number;
  type: 'rock' | 'crystal' | 'bat';
  passed: boolean;
};

type Cloud = {
  x: number;
  y: number;
  width: number;
};

type DragonGameState = {
  dragonY: number;
  velocityY: number;
  obstacles: Obstacle[];
  clouds: Cloud[];
  score: number;
  speed: number;
  spawnTimer: number;
  frame: number;
  groundOffset: number;
  ducking: boolean;
};

const WIDTH = 800;
const HEIGHT = 380;
const GROUND_Y = 315;
const DRAGON_X = 95;
const DRAGON_WIDTH = 50;
const DRAGON_HEIGHT = 44;
const GRAVITY = 0.62;
const JUMP_FORCE = -13.0;
const STORAGE_KEY = 'dragon-runner-best-score';

function createInitialState(): DragonGameState {
  return {
    dragonY: GROUND_Y - DRAGON_HEIGHT,
    velocityY: 0,
    obstacles: [],
    clouds: [
      { x: 140, y: 65, width: 75 },
      { x: 420, y: 95, width: 85 },
      { x: 680, y: 55, width: 68 },
    ],
    score: 0,
    speed: 5.2,
    spawnTimer: 65,
    frame: 0,
    groundOffset: 0,
    ducking: false,
  };
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, width, height, radius);
  } else {
    ctx.rect(x, y, width, height);
  }
  ctx.fill();
}

export function DragonRunner() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const gameRef = React.useRef<DragonGameState>(createInitialState());
  const animationRef = React.useRef<number | null>(null);
  const lastTimeRef = React.useRef(0);
  const accumulatorRef = React.useRef(0);
  const soundContextRef = React.useRef<AudioContext | null>(null);
  const soundEnabledRef = React.useRef(true);
  const isPlayingRef = React.useRef(false);
  const gameOverRef = React.useRef(false);
  const jumpRequestedRef = React.useRef(false);
  const duckRequestedRef = React.useRef(false);
  const bestScoreRef = React.useRef(0);

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [gameOver, setGameOver] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [bestScore, setBestScore] = React.useState(0);
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [isDucking, setIsDucking] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = Number(localStorage.getItem(STORAGE_KEY));
      if (Number.isFinite(stored) && stored > 0) {
        setBestScore(stored);
        bestScoreRef.current = stored;
      }
    } catch {
      // Local storage is optional.
    }
  }, []);

  const playSound = React.useCallback((frequency = 440) => {
    if (!soundEnabledRef.current || typeof window === 'undefined') return;

    try {
      const AudioContextClass =
        window.AudioContext ??
        (window as Window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;

      if (!AudioContextClass) return;

      const context =
        soundContextRef.current ?? new AudioContextClass();

      soundContextRef.current = context;

      if (context.state === 'suspended') {
        void context.resume();
      }

      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(frequency, context.currentTime);

      gain.gain.setValueAtTime(0.055, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        context.currentTime + 0.13,
      );

      oscillator.connect(gain);
      gain.connect(context.destination);

      oscillator.start();
      oscillator.stop(context.currentTime + 0.13);
    } catch {
      // Sound is not required for gameplay.
    }
  }, []);

  React.useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  const startGame = React.useCallback(() => {
    gameRef.current = createInitialState();
    lastTimeRef.current = 0;
    accumulatorRef.current = 0;
    jumpRequestedRef.current = false;
    duckRequestedRef.current = false;

    gameOverRef.current = false;
    isPlayingRef.current = true;

    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    setIsDucking(false);
  }, []);

  const jump = React.useCallback(() => {
    if (gameOverRef.current || !isPlayingRef.current) {
      startGame();
      jumpRequestedRef.current = true;
      return;
    }

    const game = gameRef.current;
    const onGround = game.dragonY >= GROUND_Y - DRAGON_HEIGHT - 1;

    if (onGround && !game.ducking) {
      jumpRequestedRef.current = true;
    }
  }, [startGame]);

  const setDucking = React.useCallback((value: boolean) => {
    duckRequestedRef.current = value;
    setIsDucking(value);
  }, []);

  const endGame = React.useCallback(() => {
    isPlayingRef.current = false;
    gameOverRef.current = true;

    setIsPlaying(false);
    setGameOver(true);

    const finalScore = Math.floor(gameRef.current.score);

    if (finalScore > bestScoreRef.current) {
      bestScoreRef.current = finalScore;
      setBestScore(finalScore);

      try {
        localStorage.setItem(STORAGE_KEY, String(finalScore));
      } catch {
        // Ignore unavailable storage.
      }
    }

    playSound(115);
  }, [playSound]);

  // Keyboard controls.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.code === 'Space' ||
        event.code === 'ArrowUp' ||
        event.code === 'KeyW'
      ) {
        event.preventDefault();
        if (!event.repeat) jump();
      }

      if (
        event.code === 'ArrowDown' ||
        event.code === 'KeyS'
      ) {
        event.preventDefault();
        setDucking(true);
      }

      if (event.code === 'Enter' && gameOverRef.current) {
        startGame();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (
        event.code === 'ArrowDown' ||
        event.code === 'KeyS'
      ) {
        setDucking(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [jump, setDucking, startGame]);

  // Draw the complete game scene.
  const drawScene = React.useCallback(
    (ctx: CanvasRenderingContext2D, game: DragonGameState) => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      // Background gradient.
      const sky = ctx.createLinearGradient(0, 0, 0, HEIGHT);
      sky.addColorStop(0, '#0a0d1f');
      sky.addColorStop(0.55, '#161936');
      sky.addColorStop(0.85, '#23213d');
      sky.addColorStop(1, '#2a2444');

      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // Moon.
      ctx.save();
      ctx.fillStyle = 'rgba(196, 181, 253, 0.12)';
      ctx.beginPath();
      ctx.arc(670, 75, 40, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#e0d8ff';
      ctx.beginPath();
      ctx.arc(670, 75, 24, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#141731';
      ctx.beginPath();
      ctx.arc(682, 66, 21, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Distant stars.
      for (let i = 0; i < 32; i++) {
        const x = (i * 97 + 31) % WIDTH;
        const y = (i * 47 + 19) % 210;

        ctx.fillStyle = i % 3 === 0
          ? 'rgba(255,255,255,0.85)'
          : 'rgba(196,181,253,0.45)';

        ctx.fillRect(x, y, i % 4 === 0 ? 2 : 1, i % 4 === 0 ? 2 : 1);
      }

      // Distant mountains.
      ctx.fillStyle = '#222340';
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);

      for (let x = 0; x <= WIDTH; x += 80) {
        ctx.lineTo(x + 40, 205 + ((x * 7) % 45));
        ctx.lineTo(x + 80, GROUND_Y);
      }

      ctx.closePath();
      ctx.fill();

      // Clouds.
      game.clouds.forEach((cloud) => {
        ctx.fillStyle = 'rgba(196, 181, 253, 0.16)';
        ctx.beginPath();
        ctx.ellipse(
          cloud.x,
          cloud.y,
          cloud.width * 0.42,
          10,
          0,
          0,
          Math.PI * 2,
        );
        ctx.ellipse(
          cloud.x - cloud.width * 0.18,
          cloud.y - 6,
          cloud.width * 0.22,
          11,
          0,
          0,
          Math.PI * 2,
        );
        ctx.ellipse(
          cloud.x + cloud.width * 0.14,
          cloud.y - 8,
          cloud.width * 0.24,
          13,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      });

      // Ground.
      ctx.fillStyle = '#14152a';
      ctx.fillRect(0, GROUND_Y, WIDTH, HEIGHT - GROUND_Y);

      ctx.strokeStyle = 'rgba(167, 139, 250, 0.55)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(WIDTH, GROUND_Y);
      ctx.stroke();

      ctx.fillStyle = 'rgba(167, 139, 250, 0.35)';

      for (let x = -game.groundOffset; x < WIDTH; x += 45) {
        ctx.fillRect(x, GROUND_Y + 18, 20, 2);
        ctx.fillRect(x + 17, GROUND_Y + 36, 8, 2);
      }

      // Dragon position and dimensions.
      const ducking = game.ducking &&
        game.dragonY >= GROUND_Y - DRAGON_HEIGHT - 1;

      const dragonHeight = ducking ? 26 : DRAGON_HEIGHT;
      const dragonY = ducking
        ? GROUND_Y - dragonHeight
        : game.dragonY;

      const dragonX = DRAGON_X;
      const runningFrame = Math.floor(game.frame / 6) % 2;

      // Tail.
      ctx.save();
      ctx.fillStyle = '#34d399';
      ctx.beginPath();
      ctx.moveTo(dragonX + 8, dragonY + dragonHeight - 15);
      ctx.lineTo(dragonX - 10, dragonY + dragonHeight - 9);
      ctx.lineTo(dragonX + 7, dragonY + dragonHeight - 5);
      ctx.closePath();
      ctx.fill();

      // Dragon body.
      const bodyGradient = ctx.createLinearGradient(
        dragonX,
        dragonY,
        dragonX + DRAGON_WIDTH,
        dragonY + dragonHeight,
      );

      bodyGradient.addColorStop(0, '#6ee7b7');
      bodyGradient.addColorStop(1, '#059669');

      ctx.fillStyle = bodyGradient;
      ctx.shadowColor = 'rgba(16, 185, 129, 0.5)';
      ctx.shadowBlur = 13;

      roundedRect(
        ctx,
        dragonX + 5,
        dragonY + (ducking ? 7 : 13),
        30,
        ducking ? 17 : 24,
        9,
      );

      ctx.shadowBlur = 0;

      // Wings.
      ctx.fillStyle = '#a78bfa';
      ctx.beginPath();

      if (runningFrame === 0 && !ducking) {
        ctx.moveTo(dragonX + 18, dragonY + 24);
        ctx.lineTo(dragonX + 12, dragonY + 2);
        ctx.lineTo(dragonX + 29, dragonY + 17);
      } else {
        ctx.moveTo(dragonX + 18, dragonY + 24);
        ctx.lineTo(dragonX + 5, dragonY + 12);
        ctx.lineTo(dragonX + 29, dragonY + 17);
      }

      ctx.closePath();
      ctx.fill();

      // Neck and head.
      ctx.fillStyle = '#34d399';
      roundedRect(
        ctx,
        dragonX + 27,
        dragonY + (ducking ? 3 : 4),
        15,
        ducking ? 14 : 18,
        5,
      );

      // Snout.
      ctx.fillStyle = '#6ee7b7';
      roundedRect(
        ctx,
        dragonX + 34,
        dragonY + (ducking ? 4 : 8),
        17,
        9,
        4,
      );

      // Horns.
      if (!ducking) {
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.moveTo(dragonX + 31, dragonY + 7);
        ctx.lineTo(dragonX + 29, dragonY - 1);
        ctx.lineTo(dragonX + 37, dragonY + 6);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(dragonX + 39, dragonY + 7);
        ctx.lineTo(dragonX + 42, dragonY);
        ctx.lineTo(dragonX + 44, dragonY + 9);
        ctx.closePath();
        ctx.fill();
      }

      // Eye.
      ctx.fillStyle = '#111827';
      ctx.beginPath();
      ctx.arc(
        dragonX + 40,
        dragonY + (ducking ? 8 : 12),
        2,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      // Legs.
      ctx.fillStyle = '#10b981';

      if (!ducking) {
        const legOffset = runningFrame === 0 ? 4 : 0;
        roundedRect(
          ctx,
          dragonX + 12,
          dragonY + 32,
          7,
          10 - legOffset,
          3,
        );
        roundedRect(
          ctx,
          dragonX + 27,
          dragonY + 32,
          7,
          6 + legOffset,
          3,
        );
      } else {
        roundedRect(
          ctx,
          dragonX + 12,
          dragonY + 19,
          12,
          6,
          3,
        );
      }

      ctx.restore();

      // Obstacles.
      game.obstacles.forEach((obstacle) => {
        ctx.save();

        if (obstacle.type === 'rock') {
          ctx.fillStyle = '#fb7185';
          ctx.shadowColor = '#f43f5e';
          ctx.shadowBlur = 10;

          ctx.beginPath();
          ctx.moveTo(obstacle.x, GROUND_Y);
          ctx.lineTo(obstacle.x + 5, GROUND_Y - obstacle.height * 0.6);
          ctx.lineTo(obstacle.x + obstacle.width * 0.45, GROUND_Y - obstacle.height);
          ctx.lineTo(obstacle.x + obstacle.width, GROUND_Y - obstacle.height * 0.55);
          ctx.lineTo(obstacle.x + obstacle.width, GROUND_Y);
          ctx.closePath();
          ctx.fill();

          ctx.shadowBlur = 0;
          ctx.fillStyle = 'rgba(255,255,255,0.28)';
          ctx.fillRect(
            obstacle.x + obstacle.width * 0.45,
            GROUND_Y - obstacle.height + 7,
            3,
            8,
          );
        } else if (obstacle.type === 'crystal') {
          ctx.fillStyle = '#c4b5fd';
          ctx.shadowColor = '#8b5cf6';
          ctx.shadowBlur = 12;

          ctx.beginPath();
          ctx.moveTo(obstacle.x + obstacle.width / 2, GROUND_Y - obstacle.height);
          ctx.lineTo(obstacle.x + obstacle.width, GROUND_Y - obstacle.height * 0.45);
          ctx.lineTo(obstacle.x + obstacle.width * 0.75, GROUND_Y);
          ctx.lineTo(obstacle.x + obstacle.width * 0.2, GROUND_Y);
          ctx.lineTo(obstacle.x, GROUND_Y - obstacle.height * 0.55);
          ctx.closePath();
          ctx.fill();

          ctx.shadowBlur = 0;
          ctx.fillStyle = '#ede9fe';
          ctx.beginPath();
          ctx.moveTo(obstacle.x + obstacle.width / 2, GROUND_Y - obstacle.height + 8);
          ctx.lineTo(obstacle.x + obstacle.width * 0.43, GROUND_Y - 10);
          ctx.lineTo(obstacle.x + obstacle.width * 0.68, GROUND_Y - 10);
          ctx.closePath();
          ctx.fill();
        } else {
          // Flying bat: duck to avoid it.
          const wingUp = Math.floor(game.frame / 5) % 2 === 0;

          ctx.fillStyle = '#fbbf24';
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 8;

          roundedRect(ctx, obstacle.x + 8, GROUND_Y - obstacle.height, 20, 12, 6);

          ctx.beginPath();

          if (wingUp) {
            ctx.moveTo(obstacle.x + 12, GROUND_Y - obstacle.height + 5);
            ctx.lineTo(obstacle.x, GROUND_Y - obstacle.height - 10);
            ctx.lineTo(obstacle.x + 8, GROUND_Y - obstacle.height + 11);
          } else {
            ctx.moveTo(obstacle.x + 12, GROUND_Y - obstacle.height + 5);
            ctx.lineTo(obstacle.x, GROUND_Y - obstacle.height + 17);
            ctx.lineTo(obstacle.x + 8, GROUND_Y - obstacle.height + 11);
          }

          ctx.closePath();
          ctx.fill();

          ctx.beginPath();

          if (wingUp) {
            ctx.moveTo(obstacle.x + 24, GROUND_Y - obstacle.height + 5);
            ctx.lineTo(obstacle.x + 39, GROUND_Y - obstacle.height - 10);
            ctx.lineTo(obstacle.x + 30, GROUND_Y - obstacle.height + 11);
          } else {
            ctx.moveTo(obstacle.x + 24, GROUND_Y - obstacle.height + 5);
            ctx.lineTo(obstacle.x + 39, GROUND_Y - obstacle.height + 17);
            ctx.lineTo(obstacle.x + 30, GROUND_Y - obstacle.height + 11);
          }

          ctx.closePath();
          ctx.fill();

          ctx.shadowBlur = 0;
          ctx.fillStyle = '#451a03';
          ctx.fillRect(obstacle.x + 22, GROUND_Y - obstacle.height + 4, 2, 2);
        }

        ctx.restore();
      });

      // In-canvas HUD
      ctx.save();
      ctx.font = 'bold 13px monospace';
      ctx.textAlign = 'right';
      ctx.fillStyle = 'rgba(221, 214, 254, 0.85)';
      ctx.fillText(`SCORE ${Math.floor(game.score).toString().padStart(5, '0')}`, WIDTH - 20, 28);
      ctx.restore();
    },
    [],
  );

  // Main animation loop.
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) return;

    const game = gameRef.current;

    const frame = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;

      const delta = Math.min(timestamp - lastTimeRef.current, 40);
      lastTimeRef.current = timestamp;

      if (isPlayingRef.current && !gameOverRef.current) {
        accumulatorRef.current += delta;

        // Normalize simulation speed
        while (accumulatorRef.current >= 16.67) {
          accumulatorRef.current -= 16.67;
          game.frame += 1;

          const ducking = duckRequestedRef.current;
          game.ducking = ducking;

          if (jumpRequestedRef.current) {
            const onGround =
              game.dragonY >= GROUND_Y - DRAGON_HEIGHT - 1;

            if (onGround && !ducking) {
              game.velocityY = JUMP_FORCE;
              playSound(560);
            }

            jumpRequestedRef.current = false;
          }

          // Physics.
          if (game.ducking && game.dragonY >= GROUND_Y - DRAGON_HEIGHT - 1) {
            game.dragonY = GROUND_Y - DRAGON_HEIGHT;
          } else {
            game.velocityY += GRAVITY;
            game.dragonY += game.velocityY;

            const floorY = GROUND_Y - DRAGON_HEIGHT;

            if (game.dragonY >= floorY) {
              game.dragonY = floorY;
              game.velocityY = 0;
            }
          }

          // Score and speed
          game.score += 0.045;
          game.speed = Math.min(5.2 + game.score / 95, 12.5);
          game.groundOffset = (game.groundOffset + game.speed) % 45;

          // Clouds.
          game.clouds.forEach((cloud) => {
            cloud.x -= game.speed * 0.16;

            if (cloud.x + cloud.width < 0) {
              cloud.x = WIDTH + cloud.width;
              cloud.y = 45 + Math.random() * 85;
            }
          });

          // Spawn obstacles.
          game.spawnTimer -= 1;

          if (game.spawnTimer <= 0) {
            const roll = Math.random();
            const type: Obstacle['type'] =
              roll < 0.42 ? 'rock' : roll < 0.76 ? 'crystal' : 'bat';

            // Bats fly at duck-height
            const height =
              type === 'bat' ? 52 + Math.random() * 8 : 28 + Math.random() * 24;

            game.obstacles.push({
              x: WIDTH + 20,
              width: type === 'bat' ? 42 : 24 + Math.random() * 14,
              height,
              type,
              passed: false,
            });

            game.spawnTimer =
              65 + Math.random() * 55 - Math.min(game.score / 15, 22);
          }

          game.obstacles.forEach((obstacle) => {
            obstacle.x -= game.speed;

            if (!obstacle.passed && obstacle.x + obstacle.width < DRAGON_X) {
              obstacle.passed = true;
            }
          });

          game.obstacles = game.obstacles.filter(
            (obstacle) => obstacle.x + obstacle.width > -15,
          );

          // Collision detection.
          const duckingActive = game.ducking &&
            game.dragonY >= GROUND_Y - DRAGON_HEIGHT - 1;

          const dragonHeight = duckingActive ? 26 : DRAGON_HEIGHT;
          const dragonTop = duckingActive
            ? GROUND_Y - dragonHeight
            : game.dragonY;

          const dragonLeft = DRAGON_X + 8;
          const dragonRight = DRAGON_X + 42;
          const dragonBottom = dragonTop + dragonHeight - 3;

          for (const obstacle of game.obstacles) {
            const obstacleLeft = obstacle.x + 3;
            const obstacleRight = obstacle.x + obstacle.width - 3;

            const obstacleTop =
              obstacle.type === 'bat'
                ? GROUND_Y - obstacle.height - 2
                : GROUND_Y - obstacle.height + 4;

            const obstacleBottom =
              obstacle.type === 'bat'
                ? obstacleTop + 18
                : GROUND_Y - 1;

            const hit =
              dragonRight > obstacleLeft &&
              dragonLeft < obstacleRight &&
              dragonBottom > obstacleTop &&
              dragonTop + 5 < obstacleBottom;

            if (hit) {
              endGame();
              break;
            }
          }

          if (game.frame % 8 === 0) {
            setScore(Math.floor(game.score));
          }
        }
      }

      drawScene(ctx, game);

      if (isPlayingRef.current && !gameOverRef.current) {
        animationRef.current = requestAnimationFrame(frame);
      } else {
        animationRef.current = null;
      }
    };

    // Render initial scene.
    drawScene(ctx, game);

    if (isPlaying) {
      lastTimeRef.current = 0;
      animationRef.current = requestAnimationFrame(frame);
    }

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isPlaying, drawScene, endGame, playSound]);

  React.useEffect(() => {
    return () => {
      const context = soundContextRef.current;

      if (context && context.state !== 'closed') {
        void context.close();
      }
    };
  }, []);

  return (
    <div className="relative w-full mx-auto select-none">
      {/* Sleek compact HUD bar */}
      <div className="relative mb-2.5 flex items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-white/[0.05] border border-white/10 px-3 py-1.5 backdrop-blur-sm">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">SCORE</span>
            <span className="font-mono text-base sm:text-lg font-black text-white tabular-nums tracking-tight">
              {String(score).padStart(5, '0')}
            </span>
            <Zap className="h-3.5 w-3.5 text-amber-400" />
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/25 px-3 py-1.5 backdrop-blur-sm">
            <Trophy className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300/80">BEST</span>
            <span className="font-mono text-base sm:text-lg font-black text-amber-300 tabular-nums tracking-tight">
              {String(bestScore).padStart(5, '0')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSoundEnabled((enabled) => !enabled)}
            className="rounded-xl border border-white/10 bg-white/[0.05] p-2 text-muted-foreground transition-all hover:bg-white/10 hover:text-white"
            aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
            title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-emerald-400" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </button>

          <button
            type="button"
            onClick={startGame}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-all hover:bg-white/10 hover:text-white"
            title="Restart Run"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Game canvas viewport */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-violet-400/25 bg-[#0a0d1f] shadow-[0_0_40px_rgba(139,92,246,0.12)]">
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          onPointerDown={() => {
            if (isPlaying && !gameOver) {
              jump();
            }
          }}
          className="block h-auto w-full select-none cursor-pointer"
          aria-label="Dragon Dash game. Press Space or Arrow Up to jump and Arrow Down to duck."
        />

        {/* Start / Game Over Overlay */}
        {(!isPlaying || gameOver) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070a16]/80 p-6 text-center backdrop-blur-[4px]">
            {gameOver ? (
              <div className="flex flex-col items-center max-w-sm animate-in zoom-in-95 duration-200">
                <div className="mb-2.5 flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-400/30 bg-rose-400/10 shadow-lg shadow-rose-500/20">
                  <Trophy className="h-7 w-7 text-rose-300" />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-rose-300">
                  Run Complete
                </p>
                <h3 className="mt-1 text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Dragon Down!
                </h3>
                <p className="mt-2 text-sm text-zinc-300">
                  You survived to score{' '}
                  <span className="font-mono font-bold text-amber-300">{score}</span> points.
                </p>
                <button
                  type="button"
                  onClick={startGame}
                  className="liquid-btn-primary mt-5 flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold shadow-lg shadow-emerald-500/20 transition-transform hover:scale-105 active:scale-95"
                >
                  <RotateCcw className="h-4 w-4" />
                  Run Again
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center max-w-sm animate-in zoom-in-95 duration-200">
                <div className="mb-2.5 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10 shadow-lg shadow-emerald-500/20">
                  <span className="text-3xl" aria-hidden="true">🐉</span>
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-300">
                  Offline-Style Arcade
                </p>
                <h3 className="mt-1 text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Ready, Dragon?
                </h3>
                <p className="mt-2 max-w-xs text-xs sm:text-sm leading-relaxed text-zinc-300">
                  Jump over rocks and crystals. Duck under flying bats.
                  The longer you survive, the faster you fly.
                </p>
                <button
                  type="button"
                  onClick={startGame}
                  className="liquid-btn-primary mt-5 flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-bold shadow-lg shadow-emerald-500/25 transition-transform hover:scale-105 active:scale-95"
                >
                  <Play className="h-4 w-4 fill-white" />
                  Start Running
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* On-screen controls */}
      <div className="relative mt-3 grid grid-cols-2 gap-3">
        <button
          type="button"
          onPointerDown={(event) => {
            event.preventDefault();
            jump();
          }}
          className={cn(
            'flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-xs sm:text-sm font-bold text-emerald-300 transition-all hover:bg-emerald-400/20 active:scale-[0.98]',
            isPlaying && 'ring-1 ring-emerald-400/40'
          )}
        >
          <Play className="h-4 w-4" />
          Jump
          <span className="hidden text-[10px] font-normal opacity-70 sm:inline">
            (Space / ↑ / W)
          </span>
        </button>

        <button
          type="button"
          onPointerDown={(event) => {
            event.preventDefault();
            setDucking(true);
          }}
          onPointerUp={() => setDucking(false)}
          onPointerLeave={() => setDucking(false)}
          onPointerCancel={() => setDucking(false)}
          className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-violet-400/30 bg-violet-400/10 px-4 py-3 text-xs sm:text-sm font-bold text-violet-300 transition-all hover:bg-violet-400/20 active:scale-[0.98]"
        >
          <Zap className="h-4 w-4" />
          Duck
          <span className="hidden text-[10px] font-normal opacity-70 sm:inline">
            (Hold ↓ / S)
          </span>
        </button>
      </div>

      {/* Micro tip */}
      <div className="mt-2.5 flex items-center justify-between text-[11px] text-muted-foreground px-1">
        <p>
          <span className="font-semibold text-foreground">Tip:</span> Tap canvas or Jump to leap. Hold Duck for bats.
        </p>
        <span className="hidden sm:inline font-mono text-[10px] opacity-60">60 FPS CANVAS</span>
      </div>
    </div>
  );
}

export default DragonRunner;
