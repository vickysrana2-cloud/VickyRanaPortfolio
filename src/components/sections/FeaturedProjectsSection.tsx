'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Code2,
  ShieldCheck,
  Zap,
  Terminal,
  CheckCircle2,
  Sparkles,
  Layers,
  Flame,
  Globe,
  Database
} from 'lucide-react';
import { Github } from '@/components/icons';
import { TechBadge } from '@/components/ui/tech-icon';
import { CardSwap, Card, type CardSwapHandle } from '@/components/ui/CardSwap';
import { Project } from '@/types';

interface FeaturedProjectsSectionProps {
  projects: Project[];
}

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const swapRef = useRef<CardSwapHandle>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeProject = projects[activeIndex] || projects[0];
  const isDark = mounted ? resolvedTheme !== 'light' : true;

  // Project thematic visual accents
  const projectAccents = [
    {
      gradient: 'from-emerald-500/20 via-teal-500/10 to-indigo-500/20',
      border: 'border-emerald-500/30',
      glow: 'bg-emerald-500/20',
      accentColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      icon: Database
    },
    {
      gradient: 'from-purple-500/20 via-pink-500/10 to-rose-500/20',
      border: 'border-purple-500/30',
      glow: 'bg-purple-500/20',
      accentColor: 'text-purple-400',
      badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      icon: Globe
    },
    {
      gradient: 'from-indigo-500/20 via-blue-500/10 to-cyan-500/20',
      border: 'border-indigo-500/30',
      glow: 'bg-indigo-500/20',
      accentColor: 'text-indigo-400',
      badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      icon: Layers
    },
    {
      gradient: 'from-amber-500/20 via-orange-500/10 to-yellow-500/20',
      border: 'border-amber-500/30',
      glow: 'bg-amber-500/20',
      accentColor: 'text-amber-400',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      icon: Sparkles
    }
  ];

  return (
    <div className="w-full">
      {/* Interactive Bento Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* LEFT COLUMN: Active Project Live Spec & Architecture Dossier */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Carousel navigation & counter badge */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 bg-background/50 backdrop-blur-md text-xs font-mono font-medium text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                <span>
                  Project {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
              </div>

              {/* Prev / Next swap controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => swapRef.current?.prev()}
                  aria-label="Previous project card"
                  className="p-2 rounded-xl border border-border/70 bg-background/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => swapRef.current?.next()}
                  aria-label="Next project card"
                  className="p-2 rounded-xl border border-border/70 bg-background/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active Project Title & Tagline */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                  <Zap className="w-3 h-3" />
                  <span>{activeProject.category} Spotlight</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-emerald-400">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified</span>
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground transition-all duration-300">
                <Link
                  href={`/projects/${activeProject.slug}`}
                  className="hover:text-indigo-400 transition-colors"
                >
                  {activeProject.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm sm:text-base font-medium text-indigo-400/90 leading-relaxed">
                {activeProject.tagline}
              </p>
            </div>

            {/* Overview text */}
            <p className="text-sm leading-relaxed text-muted-foreground">
              {activeProject.description}
            </p>

            {/* Architectural Highlights */}
            {activeProject.architecturePoints && activeProject.architecturePoints.length > 0 && (
              <div className="space-y-2 rounded-2xl border border-border/60 bg-card/40 p-4 sm:p-5 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Architectural Highlights</span>
                </div>
                <div className="space-y-2 pt-1">
                  {activeProject.architecturePoints.slice(0, 2).map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed text-foreground/90">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key stats row */}
            {activeProject.stats && (
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(activeProject.stats).map(([k, v]) => (
                  <div
                    key={k}
                    className="p-2 sm:p-2.5 rounded-xl border border-border/50 bg-background/40 text-center"
                  >
                    <span className="text-[10px] font-mono text-muted-foreground uppercase block truncate">
                      {k}
                    </span>
                    <span className="text-xs font-mono font-bold text-foreground mt-0.5 block truncate">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {activeProject.tags.slice(0, 5).map(tag => (
                <TechBadge key={tag} name={tag} size="sm" />
              ))}
              {activeProject.tags.length > 5 && (
                <span className="text-xs font-mono text-muted-foreground px-2 py-0.5">
                  +{activeProject.tags.length - 5} more
                </span>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex items-center gap-3">
            <Link
              href={`/projects/${activeProject.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl liquid-btn-primary text-xs sm:text-sm font-semibold transition-all hover:scale-102"
            >
              <span>Explore Architecture Case Study</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            {activeProject.githubUrl && (
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-border/70 bg-background/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                title="GitHub Repository"
                aria-label={`${activeProject.title} GitHub repository`}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {activeProject.liveUrl && activeProject.liveUrl !== activeProject.githubUrl && (
              <a
                href={activeProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-border/70 bg-background/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                title="Live Application"
                aria-label={`${activeProject.title} live demo`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive 3D CardSwap Deck */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[520px] sm:min-h-[560px] md:min-h-[600px] w-full py-4 select-none">
          {/* Ambient Glow behind the deck */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl"
          />

          <CardSwap
            ref={swapRef}
            width={480}
            height={480}
            cardDistance={48}
            verticalDistance={42}
            depth={80}
            skewAmount={5}
            visibleCards={4}
            delay={4500}
            autoplay={true}
            pauseOnHover={true}
            draggable={true}
            speed={1.1}
            bounce={0.32}
            parallax={0.4}
            hoverSpread={0.14}
            dim={0.45}
            cardRadius={22}
            theme={isDark ? 'dark' : 'light'}
            onChange={index => setActiveIndex(index)}
            className="w-full h-full max-w-[540px]"
          >
            {projects.map((project, idx) => {
              const accent = projectAccents[idx % projectAccents.length];
              const AccentIcon = accent.icon;

              return (
                <Card
                  key={project.id}
                  className="cursor-pointer select-none border border-white/25 dark:border-white/12 transition-all duration-300"
                >
                  <div className="flex h-full flex-col justify-between p-6 sm:p-7 relative overflow-hidden">
                    {/* Top Aesthetic Header Banner */}
                    <div
                      className={`relative -mx-6 -mt-6 mb-5 h-24 sm:h-28 overflow-hidden bg-gradient-to-br ${accent.gradient} p-4 sm:p-5 flex items-start justify-between border-b border-border/40`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="p-2 rounded-xl bg-background/60 backdrop-blur-md text-foreground border border-white/20">
                          <AccentIcon className="w-4 h-4" />
                        </span>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block">
                            System
                          </span>
                          <span className="text-xs font-bold text-foreground block">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      <span className="font-mono font-black text-3xl sm:text-4xl text-foreground/15 select-none leading-none">
                        #{String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${accent.badgeBg}`}
                        >
                          <Zap className="w-2.5 h-2.5" />
                          <span>{project.category}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-400">
                          <ShieldCheck className="w-2.5 h-2.5" />
                          <span>Verified</span>
                        </span>
                      </div>

                      <h4 className="text-xl sm:text-2xl font-black tracking-tight text-foreground line-clamp-1">
                        {project.title}
                      </h4>

                      <p className="text-xs sm:text-sm font-medium text-indigo-400/90 line-clamp-1">
                        {project.tagline}
                      </p>

                      <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {project.tags.slice(0, 4).map(t => (
                          <TechBadge key={t} name={t} size="sm" />
                        ))}
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-4 pt-3.5 border-t border-border/50 flex items-center justify-between text-xs">
                      <Link
                        href={`/projects/${project.slug}`}
                        onClick={e => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 font-semibold text-indigo-500 dark:text-indigo-400 hover:underline"
                      >
                        <span>Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                        <span>Drag to swap</span>
                        <span className="text-indigo-400">↻</span>
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </CardSwap>

          {/* Touch / Drag instructional pill underneath */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/50 bg-background/40 backdrop-blur-sm text-[11px] text-muted-foreground font-mono">
            <span className="text-indigo-400">⟵ Swipe or Drag Deck ⟶</span>
          </div>
        </div>
      </div>
    </div>
  );
}
