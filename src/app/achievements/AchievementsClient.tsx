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
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export function AchievementsClient() {
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

  const getCategoryIcon = (category: AchievementCategory) => {
    switch (category) {
      case 'Certification':
        return ShieldCheck;
      case 'Award':
        return Trophy;
      case 'Education':
        return GraduationCap;
      case 'Milestone':
        return Code2;
      default:
        return Award;
    }
  };

  return (
    <>
      {/* Category Pills & Search Bar */}
      <ScrollReveal direction="up" delay={0.2} duration={0.8}>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300',
                  selectedCategory === category
                    ? 'liquid-badge text-foreground font-bold shadow-md scale-105 border border-indigo-500/30'
                    : 'liquid-glass-pill text-muted-foreground hover:text-foreground hover:border-white/20'
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search credentials, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm liquid-glass-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>
        </div>
      </ScrollReveal>

      {/* Grid of Verified Credentials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((item, idx) => {
          const Icon = getCategoryIcon(item.category);
          return (
            <ScrollReveal
              key={item.id}
              direction="up"
              delay={idx * 0.08}
              duration={0.8}
            >
              <div
                className={cn(
                  'h-full p-6 sm:p-7 rounded-3xl liquid-glass border transition-all duration-300 flex flex-col justify-between group',
                  item.verified
                    ? 'border-indigo-500/40 shadow-lg shadow-indigo-500/5'
                    : 'border-white/10 dark:border-white/10 hover:border-white/20'
                )}
              >
                <div>
                  {/* Card Header: Category & Date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold liquid-badge text-indigo-400">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.category}</span>
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {item.issueDate}
                    </span>
                  </div>

                  {/* Title & Issuer */}
                  <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-indigo-400/90 mt-1">
                    {item.issuer}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Skills Highlighted */}
                  {item.skillsHighlighted && item.skillsHighlighted.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/5">
                      {item.skillsHighlighted.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono liquid-glass-pill text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer: Credential Link / Verification */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  {item.credentialUrl ? (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group/link"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Verified Record</span>
                    </span>
                  )}

                  {item.verified && (
                    <button
                      onClick={fireCelebration}
                      title="Celebrate milestone"
                      aria-label="Celebrate milestone with confetti"
                      className="p-1.5 rounded-xl liquid-glass hover:bg-white/10 text-amber-400 transition-all hover:scale-110 active:scale-95"
                    >
                      <PartyPopper className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAchievements.length === 0 && (
        <div className="text-center py-16 liquid-glass rounded-3xl border border-white/10 mt-8">
          <Award className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <h3 className="text-lg font-bold text-foreground">No credentials match your search</h3>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search terms.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-xl liquid-btn-primary text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </>
  );
}

