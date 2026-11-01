'use client';

import * as React from 'react';
import Link from 'next/link';
import { gamesData } from '@/data/games';
import { Game, GameCategory } from '@/types';
import { GamePlayer } from '@/components/games/game-player';
import { 
  Gamepad2, 
  Search, 
  Play, 
  ArrowRight,
  HelpCircle,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { TechBadge } from '@/components/ui/tech-icon';
import { GameBanner } from '@/components/games/game-banner';

export default function GamesArcadePage() {
  const [selectedCategory, setSelectedCategory] = React.useState<GameCategory>('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeGame, setActiveGame] = React.useState<Game | null>(null);

  const categories: GameCategory[] = ['All', 'Arcade', 'Puzzle', 'Speed', 'Strategy'];

  const filteredGames = gamesData.filter((game) => {
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      game.title.toLowerCase().includes(q) ||
      game.description.toLowerCase().includes(q) ||
      game.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <ScrollReveal direction="down" duration={0.8}>
        <div className="relative mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill text-indigo-500 dark:text-indigo-400 text-xs font-semibold mb-4">
            <Gamepad2 className="w-4 h-4" />
            <span>Interactive Browser Arcade</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            Playable Mini-Games
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Engineered from scratch using React 19, TypeScript, HTML5 Canvas, and Web Audio API. No external plugins—every game is fully functional directly in your browser.
          </p>
        </div>
      </ScrollReveal>

      {/* Search and Filters Bar */}
      <ScrollReveal direction="up" delay={0.1} duration={0.8}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto p-1.5 rounded-2xl liquid-glass-subtle">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200',
                  selectedCategory === cat
                    ? 'liquid-btn-primary text-white shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/40 dark:hover:bg-white/10'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-indigo-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games or tech..."
              className="w-full pl-10 pr-4 py-2 text-sm liquid-glass-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </div>
      </ScrollReveal>

      {/* Game Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {filteredGames.map((game, idx) => (
          <ScrollReveal
            key={game.id}
            direction="scale"
            delay={idx * 0.08}
            duration={0.8}
            amount={0.1}
          >
            <div
              className="group rounded-3xl liquid-glass-interactive border border-white/25 dark:border-white/12 p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden h-full"
            >
            {/* Specular top highlight */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent pointer-events-none" />

            <div>
              {/* Top Tag & Difficulty */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg liquid-badge text-indigo-500">
                  {game.category}
                </span>
                <span className={cn(
                  'text-xs font-semibold px-2.5 py-1 rounded-lg border',
                  game.difficulty === 'Easy'
                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/25'
                    : game.difficulty === 'Medium'
                    ? 'bg-amber-500/10 text-amber-500 border-amber-500/25'
                    : 'bg-rose-500/10 text-rose-500 border-rose-500/25'
                )}>
                  {game.difficulty}
                </span>
              </div>

              {/* Title & Tagline */}
              <h2 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-indigo-500 transition-colors">
                {game.title}
              </h2>
              <div className="my-3.5"><GameBanner slug={game.slug} title={game.title} category={game.category} /></div>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">{game.tagline}</p>


              {/* Controls List */}
              <div className="mt-4 p-3.5 rounded-2xl liquid-glass-subtle border border-white/20 dark:border-white/10">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Controls:</span>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {game.controls.map((ctrl, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      <span>{ctrl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech stack badges */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {game.techStack.map((tech) => (
                  <TechBadge
                    key={tech}
                    name={tech}
                    size="sm"
                  />
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-border/70 flex items-center justify-between gap-3">
              <button
                onClick={() => setActiveGame(game)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl liquid-btn-primary text-white font-semibold text-sm transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Play Now</span>
              </button>

              <Link
                href={`/games/${game.slug}`}
                className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl liquid-btn-secondary text-foreground text-sm font-medium transition-all"
              >
                <span>Full Screen</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Embedded Arcade Modal Player */}
      {activeGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[94vh] overflow-y-auto rounded-3xl p-3 sm:p-5 liquid-glass-elevated border border-white/30 dark:border-white/15 animate-in zoom-in-95 duration-200">
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveGame(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-xl liquid-btn-secondary text-muted-foreground hover:text-foreground transition-all"
              aria-label="Close Arcade Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Embed Game Component */}
            <div className="pt-2">
              <GamePlayer game={activeGame} />
            </div>

            {/* Modal Bottom link */}
            <div className="mt-4 text-center">
              <Link
                href={`/games/${activeGame.slug}`}
                className="text-xs text-indigo-500 hover:underline font-medium inline-flex items-center gap-1"
              >
                <span>Open dedicated page for {activeGame.title}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
