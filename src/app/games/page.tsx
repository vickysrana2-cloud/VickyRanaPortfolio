import type { Metadata } from 'next';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Gamepad2 } from 'lucide-react';
import { GamesClient } from './GamesClient';

export const metadata: Metadata = {
  title: 'Interactive Browser Arcade & Canvas Games',
  description: 'Play fully functional browser mini-games engineered with React 19, TypeScript, HTML5 Canvas, and Web Audio API. 2048, Snake, Memory Matrix, Typer, and Dragon Runner.',
};

export default function GamesArcadePage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner - Server Rendered for instant paint & SEO */}
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

      {/* Interactive Arcade Client Component */}
      <GamesClient />
    </div>
  );
}
