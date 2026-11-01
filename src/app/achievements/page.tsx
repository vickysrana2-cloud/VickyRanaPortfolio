import type { Metadata } from 'next';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Award, ShieldCheck, Trophy, Sparkles } from 'lucide-react';
import { AchievementsClient } from './AchievementsClient';

export const metadata: Metadata = {
  title: 'Verified Milestones, Awards & Certifications',
  description: 'Explore verified credentials, hackathon victories, academic honors, and full-stack software development certifications earned by Vicky Rana.',
};

export default function AchievementsPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner - Server-rendered for optimal SEO & zero hydration delay */}
      <ScrollReveal direction="down" duration={0.8}>
        <div className="relative mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill text-indigo-500 dark:text-indigo-400 text-xs font-semibold mb-4">
            <Award className="w-4 h-4" />
            <span>Honors & Certifications</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            Verified Milestones
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Industry certifications, competitive hackathon medals, academic accolades, and verified technical milestones in software engineering.
          </p>

          {/* Quick Metrics Bar - Static Server Rendered */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 p-3 rounded-2xl liquid-glass border border-white/10">
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-black text-foreground">1st</div>
              <div className="text-[11px] font-mono text-muted-foreground mt-0.5">Silver Medalist</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-black text-foreground">100%</div>
              <div className="text-[11px] font-mono text-muted-foreground mt-0.5">Verified Badges</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-black text-foreground">Java</div>
              <div className="text-[11px] font-mono text-muted-foreground mt-0.5">Full Stack Certified</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-black text-foreground">JS</div>
              <div className="text-[11px] font-mono text-muted-foreground mt-0.5">HackerRank Verified</div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Interactive Filterable Achievements Deck */}
      <AchievementsClient />
    </div>
  );
}
