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

export function ProjectsClient() {
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
    <>
      {/* Search and Filters Bar */}
      <ScrollReveal direction="up" delay={0.2} duration={0.8}>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
          {/* Categories */}
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

          {/* Search + Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm liquid-glass-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              />
            </div>

            <div className="relative">
              <select
                aria-label="Sort projects"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'featured' | 'newest' | 'title')}
                className="appearance-none pl-3 pr-8 py-2 rounded-xl text-xs sm:text-sm liquid-glass-input text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer font-medium"
              >
                <option value="featured" className="bg-background text-foreground">Featured</option>
                <option value="newest" className="bg-background text-foreground">Newest</option>
                <option value="title" className="bg-background text-foreground">Alphabetical</option>
              </select>
              <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project, idx) => (
          <ScrollReveal
            key={project.id}
            direction="up"
            delay={idx * 0.1}
            duration={0.8}
          >
            <div className="group relative flex flex-col justify-between h-full p-6 sm:p-7 rounded-3xl liquid-glass liquid-glass-interactive border border-white/20 dark:border-white/10 hover:border-indigo-500/40 transition-all duration-300 overflow-hidden">
              {/* Specular top highlight */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent pointer-events-none" />

              <div>
                {/* Header: Category Badge + Status */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg liquid-badge text-indigo-400">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground group-hover:text-indigo-400 transition-colors">
                  <Link href={`/projects/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>
                <p className="text-xs sm:text-sm text-indigo-400/90 font-medium mt-1">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-muted-foreground mt-3 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Architecture Highlights */}
                {project.architecturePoints && project.architecturePoints.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5">
                    {project.architecturePoints.slice(0, 2).map((pt, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1 text-foreground/90">{pt}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/5">
                  {project.tags.slice(0, 5).map((tag) => (
                    <TechBadge key={tag} name={tag} size="sm" />
                  ))}
                  {project.tags.length > 5 && (
                    <span className="text-xs font-mono text-muted-foreground px-2 py-0.5">
                      +{project.tags.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group/link"
                >
                  <span>Explore Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </Link>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl liquid-glass hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && project.liveUrl !== project.githubUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl liquid-glass hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                      title="Live Preview"
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

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 liquid-glass rounded-3xl border border-white/10 mt-8">
          <Code2 className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <h3 className="text-lg font-bold text-foreground">No projects found</h3>
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

