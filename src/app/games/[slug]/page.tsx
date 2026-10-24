import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { gamesData } from '@/data/games';
import { GamePlayer } from '@/components/games/game-player';
import { ArrowLeft, HelpCircle, Layers } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { TechBadge } from '@/components/ui/tech-icon';

interface GamePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return gamesData.map((game) => ({
    slug: game.slug,
  }));
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = gamesData.find((g) => g.slug === slug);
  if (!game) return { title: 'Game Not Found' };

  return {
    title: `${game.title} - Playable Browser Game | Arcade`,
    description: game.description,
  };
}

export default async function DedicatedGamePage({ params }: GamePageProps) {
  const { slug } = await params;
  const game = gamesData.find((g) => g.slug === slug);

  if (!game) {
    notFound();
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Back button */}
      <ScrollReveal direction="down" duration={0.6}>
        <div className="mb-6">
          <Link
            href="/games"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl liquid-btn-secondary text-sm font-medium text-muted-foreground hover:text-foreground transition-all group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Arcade</span>
          </Link>
        </div>
      </ScrollReveal>

      {/* Game Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Playable Game Viewport */}
        <ScrollReveal direction="scale" duration={0.8} amount={0.1} className="lg:col-span-7 flex flex-col items-center">
          <GamePlayer game={game} />
        </ScrollReveal>

        {/* Game Details Sidebar */}
        <ScrollReveal direction="up" delay={0.15} duration={0.8} className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-7 rounded-3xl liquid-glass-elevated border border-white/25 dark:border-white/12 space-y-4 relative overflow-hidden">
            {/* Specular top highlight */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg liquid-badge text-indigo-500">
                  {game.category}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg liquid-glass-pill border border-white/20 text-muted-foreground">
                  Difficulty: {game.difficulty}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-foreground">
                {game.title}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {game.tagline}
              </p>
            </div>

            {/* How to play instructions */}
            <div className="pt-3 border-t border-border/70">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-indigo-500" />
                <span>How to Play</span>
              </h3>
              <ul className="text-xs text-muted-foreground space-y-2">
                {game.instructions.map((inst, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-indigo-500/10 text-indigo-500 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 border border-indigo-500/20">
                      {i + 1}
                    </span>
                    <span>{inst}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Controls */}
            <div className="pt-3 border-t border-border/70">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                Controls
              </h3>
              <div className="space-y-1.5">
                {game.controls.map((ctrl, i) => (
                  <div key={i} className="text-xs font-mono p-2.5 rounded-xl liquid-glass-subtle border border-white/20 dark:border-white/10 text-foreground">
                    {ctrl}
                  </div>
                ))}
              </div>
            </div>

            {/* Tech stack */}
            <div className="pt-3 border-t border-border/70">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-2 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-500" />
                <span>Tech Stack</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {game.techStack.map((tech) => (
                  <TechBadge
                    key={tech}
                    name={tech}
                    size="sm"
                  />
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
