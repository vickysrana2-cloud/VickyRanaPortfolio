'use client';

import * as React from 'react';
import { Cyber2048 } from './cyber-2048';
import { RetroSnake } from './retro-snake';
import { MemoryMatrix } from './memory-matrix';
import { CodeSpeedTyper } from './code-typer';
import { Game } from '@/types';

export function GamePlayer({ game }: { game: Game }) {
  const renderGame = () => {
    switch (game.slug) {
      case 'cyber-2048':
        return <Cyber2048 />;
      case 'retro-snake-quest':
        return <RetroSnake />;
      case 'memory-matrix':
        return <MemoryMatrix />;
      case 'code-speed-typer':
        return <CodeSpeedTyper />;
      default:
        return (
          <div className="p-8 text-center text-muted-foreground">
            Game module loading...
          </div>
        );
    }
  };

  return (
    <React.Suspense
      fallback={
        <div className="p-12 text-center text-muted-foreground glass-panel rounded-2xl">
          Loading game engine...
        </div>
      }
    >
      {renderGame()}
    </React.Suspense>
  );
}
