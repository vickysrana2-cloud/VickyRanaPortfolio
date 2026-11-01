'use client';

import * as React from 'react';
import Link from 'next/link';
import { projectsData } from '@/data/projects';
import { ProjectCategory } from '@/types';
import { 
  Code2, 
  Search, 
  ExternalLink, 
  ArrowRight, 
  SlidersHorizontal,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Github } from '@/components/icons';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { TechBadge } from '@/components/ui/tech-icon';
import { cn } from '@/lib/utils';

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortBy, setSortBy] = React.useState<'featured' | 'newest' | 'title'>('featured');

  const categories: ProjectCategory[] = ['All', 'Full Stack', 'Frontend', 'Backend & API', 'DevOps & Tools'];

  const filteredProjects = React.useMemo(() => {
    return projectsData
      .filter((project) => {
        const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !q ||
          project.title.toLowerCase().includes(q) ||
          project.description.toLowerCase().includes(q) ||
          project.tags.some((t) => t.toLowerCase().includes(q));
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.publishedAt.localeCompare(a.publishedAt);
        }
        if (sortBy === 'newest') {
          return b.publishedAt.localeCompare(a.publishedAt);
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <ScrollReveal direction="down" duration={0.8}>
        <div className="relative mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill text-indigo-500 dark:text-indigo-400 text-xs font-semibold mb-4">
            <Code2 className="w-4 h-4" />
            <span>Production Engineering</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            Featured Projects & Architecture
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Real full-stack applications, scalable APIs, and system designs built with Next.js, TypeScript, NestJS, Spring Boot, MongoDB Atlas, and MySQL.
          </p>
        </div>
      </ScrollReveal>

      {/* Filter and Search Bar */}
      <ScrollReveal direction="up" delay={0.1} duration={0.8}>
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl liquid-glass-subtle">
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

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-indigo-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword or stack..."
              className="w-full pl-10 pr-4 py-2 text-sm liquid-glass-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>

          {/* Sort dropdown */}
          <div className="relative w-full sm:w-auto flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground shrink-0 hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'featured' | 'newest' | 'title')}
              className="w-full sm:w-auto px-3.5 py-2 text-sm liquid-glass-input rounded-xl text-foreground focus:outline-none"
            >
              <option value="featured" className="bg-background text-foreground">Featured First</option>
              <option value="newest" className="bg-background text-foreground">Newest First</option>
              <option value="title" className="bg-background text-foreground">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>
        </div>
      </ScrollReveal>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <ScrollReveal direction="scale" duration={0.8}>
          <div className="py-20 text-center rounded-3xl liquid-glass-elevated border border-white/25 dark:border-white/12">
            <Code2 className="w-12 h-12 text-indigo-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-foreground">No projects matched your criteria</h3>
            <p className="text-sm text-muted-foreground mt-1">Try selecting a different category or clearing your search term.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2.5 text-xs font-semibold rounded-xl liquid-btn-primary text-white"
            >
              Reset Filters
            </button>
          </div>
        </ScrollReveal>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project, idx) => (
            <ScrollReveal
              key={project.id}
              direction="scale"
              delay={idx * 0.06}
              duration={0.8}
              amount={0.1}
            >
              <div
                className="group rounded-3xl liquid-glass-interactive border border-white/25 dark:border-white/12 p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden h-full"
              >
                {/* Specular top highlight */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent pointer-events-none" />

                <div>
                  {/* Category & Featured Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg liquid-badge text-indigo-500">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-foreground group-hover:text-indigo-500 transition-colors">
                    {project.title}
                  </h2>

                  {/* Tagline */}
                  <p className="mt-2 text-xs font-medium text-indigo-400">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Key Architecture Point preview */}
                  {project.architecturePoints.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-border/70">
                      <div className="text-[11px] font-semibold text-foreground uppercase tracking-wider mb-1.5">
                        Architecture Highlight
                      </div>
                      <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{project.architecturePoints[0]}</span>
                      </div>
                    </div>
                  )}

                  {/* Tech Tags with Icons */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 5).map((tag) => (
                      <TechBadge key={tag} name={tag} size="sm" />
                    ))}
                    {project.tags.length > 5 && (
                      <span className="text-[11px] font-mono px-2 py-1 rounded-xl liquid-glass-subtle text-muted-foreground border border-white/10">
                        +{project.tags.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-border/70 flex items-center justify-between gap-2">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="flex items-center gap-1.5 text-sm font-semibold text-indigo-500 hover:text-indigo-400 transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl liquid-btn-secondary text-muted-foreground hover:text-foreground"
                        title="GitHub Repository"
                        aria-label="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl liquid-btn-secondary text-muted-foreground hover:text-foreground"
                        title="Live Demo"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
