'use client';

import * as React from 'react';
import { achievementsData } from '@/data/achievements';
import { AchievementCategory } from '@/types';
import { 
  Award, 
  Search, 
  ExternalLink, 
  ShieldCheck, 
  Trophy, 
  GraduationCap, 
  CheckCircle2, 
  Code2,
  PartyPopper
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<AchievementCategory>('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  const categories: AchievementCategory[] = ['All', 'Certification', 'Education', 'Award', 'Milestone'];

  const filteredAchievements = React.useMemo(() => {
    return achievementsData.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.issuer.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.skillsHighlighted.some((s) => s.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const fireCelebration = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award':
        return Award;
      case 'Trophy':
        return Trophy;
      case 'GraduationCap':
        return GraduationCap;
      case 'Code':
        return Code2;
      default:
        return CheckCircle2;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="relative mb-12 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill text-amber-500 text-xs font-semibold mb-4">
          <Award className="w-4 h-4" />
          <span>Verified Credentials & Honors</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Achievements & Certifications
        </h1>
        <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
          Industry credentials, academic distinction, hackathon recognitions, and continuous problem-solving milestones.
        </p>

        {/* Celebration trigger */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={fireCelebration}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl liquid-btn-secondary text-amber-500 text-xs font-semibold hover:scale-105"
            title="Celebrate milestones!"
          >
            <PartyPopper className="w-4 h-4" />
            <span>Celebrate Milestones</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
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
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/25 border border-white/30'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/40 dark:hover:bg-white/10'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-amber-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search credentials or skills..."
            className="w-full pl-10 pr-4 py-2 text-sm liquid-glass-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </div>

      {/* Achievements Cards */}
      {filteredAchievements.length === 0 ? (
        <div className="py-20 text-center rounded-3xl liquid-glass-elevated border border-white/25 dark:border-white/12">
          <Award className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-foreground">No achievements found in this view</h3>
          <p className="text-sm text-muted-foreground mt-1">Information will be displayed here as verified credentials become available.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-4 px-5 py-2.5 text-xs font-semibold rounded-xl liquid-btn-primary text-white"
          >
            Show All
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredAchievements.map((item) => {
            const Icon = getIcon(item.iconName);
            return (
              <div
                key={item.id}
                className="group rounded-3xl liquid-glass-interactive border border-white/25 dark:border-white/12 p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Specular top highlight */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/30 to-transparent pointer-events-none" />

                <div>
                  {/* Category tag & Verified badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg liquid-badge text-amber-500">
                      {item.category}
                    </span>
                    {item.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    )}
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3">
                    <div className="p-3 rounded-2xl liquid-glass-subtle border border-white/20 dark:border-white/10 text-amber-500 shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground group-hover:text-amber-500 transition-colors">
                        {item.title}
                      </h2>
                      <p className="text-xs font-semibold text-muted-foreground mt-0.5">
                        {item.issuer}
                      </p>
                    </div>
                  </div>

                  {/* Date & Grade */}
                  <div className="mt-4 flex items-center justify-between text-xs font-mono text-muted-foreground pt-3 border-t border-border/70">
                    <span>Issued: {item.issueDate}</span>
                    {item.gradeOrScore && (
                      <span className="font-semibold text-foreground">{item.gradeOrScore}</span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  {/* Skills tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.skillsHighlighted.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg liquid-glass-subtle border border-white/20 text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom credential actions */}
                <div className="mt-6 pt-4 border-t border-border/70 flex items-center justify-between">
                  {item.credentialId ? (
                    <span className="text-[11px] font-mono text-muted-foreground truncate max-w-[180px]">
                      ID: {item.credentialId}
                    </span>
                  ) : (
                    <span />
                  )}

                  {item.credentialUrl && (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl liquid-btn-secondary text-xs font-semibold text-indigo-500 hover:text-indigo-400"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
