'use client';

import * as React from 'react';
import Link from 'next/link';
import { templatesData } from '@/data/templates';
import { Template, TemplateCategory } from '@/types';
import { TemplateDevicePreview } from '@/components/templates/template-device-preview';
import { 
  LayoutTemplate, 
  Search, 
  ArrowRight, 
  SlidersHorizontal, 
  Eye,
  X,
  CheckCircle2,
  Sparkles,
  Smartphone,
  Layers,
  Zap,
  Globe2
} from 'lucide-react';
import { Github } from '@/components/icons';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { TechBadge } from '@/components/ui/tech-icon';

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<TemplateCategory>('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortBy, setSortBy] = React.useState<'featured' | 'title'>('featured');
  const [previewTemplate, setPreviewTemplate] = React.useState<Template | null>(null);

  const categories: TemplateCategory[] = [
    'All',
    'Business',
    'Services',
    'E-commerce',
    'Health & Wellness',
    'Hospitality',
    'Education',
    'Portfolio',
    'SaaS',
  ];

  // Category counts
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = { All: templatesData.length };
    templatesData.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredTemplates = React.useMemo(() => {
    return templatesData
      .filter((tmpl) => {
        const matchesCategory = selectedCategory === 'All' || tmpl.category === selectedCategory;
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !q ||
          tmpl.title.toLowerCase().includes(q) ||
          tmpl.description.toLowerCase().includes(q) ||
          tmpl.tagline.toLowerCase().includes(q) ||
          tmpl.tags.some((t) => t.toLowerCase().includes(q));
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
        }
        return a.title.localeCompare(b.title);
      });
  }, [selectedCategory, searchQuery, sortBy]);

  // Category color mapper
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Business':
        return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
      case 'Services':
        return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
      case 'E-commerce':
        return 'text-pink-400 border-pink-500/30 bg-pink-500/10';
      case 'Health & Wellness':
        return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      case 'Hospitality':
        return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
      case 'Education':
        return 'text-purple-400 border-purple-500/30 bg-purple-500/10';
      case 'Portfolio':
        return 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10';
      case 'SaaS':
        return 'text-violet-400 border-violet-500/30 bg-violet-500/10';
      default:
        return 'text-purple-400 border-purple-500/30 bg-purple-500/10';
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <ScrollReveal direction="down" duration={0.8}>
        <div className="relative mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-badge text-purple-400 text-xs font-semibold mb-4 border border-purple-500/30">
            <LayoutTemplate className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>Production Architecture Blueprints & UI Starter Kits</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground">
            Commercial Website Templates
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Over 40 production-grade, highly responsive web application templates engineered with Next.js, React, TypeScript, and modern styling. Test live responsive viewports across Desktop, Tablet, and Mobile.
          </p>

          {/* Highlight Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 p-3 rounded-2xl liquid-glass border border-white/10">
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-black text-foreground">40+</div>
              <div className="text-[11px] font-mono text-muted-foreground mt-0.5">Real Production Templates</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-black text-indigo-400">9</div>
              <div className="text-[11px] font-mono text-muted-foreground mt-0.5">Industry Sectors</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-black text-purple-400">3</div>
              <div className="text-[11px] font-mono text-muted-foreground mt-0.5">Interactive Viewports</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
              <div className="text-[11px] font-mono text-muted-foreground mt-0.5">Mobile Responsive</div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Filter and Search Bar */}
      <ScrollReveal direction="up" delay={0.1} duration={0.8}>
        <div className="flex flex-col gap-4 mb-10 p-3 sm:p-4 rounded-3xl liquid-glass border border-white/15 shadow-xl">
        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const count = categoryCounts[cat] || 0;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all duration-300',
                  selectedCategory === cat
                    ? 'liquid-btn-primary shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/10 dark:hover:bg-white/5'
                )}
              >
                <span>{cat}</span>
                <span className={cn(
                  'text-[10px] font-mono px-1.5 py-0.5 rounded-full',
                  selectedCategory === cat
                    ? 'bg-white/20 text-white'
                    : 'bg-muted text-muted-foreground'
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border/50">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, industry, or tech..."
              className="w-full pl-10 pr-4 py-2 text-sm liquid-glass-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-xs text-muted-foreground font-mono">
              Showing <strong className="text-foreground">{filteredTemplates.length}</strong> templates
            </span>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground shrink-0 hidden sm:block" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'featured' | 'title')}
                className="px-3.5 py-2 text-xs font-medium liquid-glass-input rounded-xl text-foreground focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-background text-foreground">Featured First</option>
                <option value="title" className="bg-background text-foreground">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      </ScrollReveal>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredTemplates.map((template, idx) => (
          <ScrollReveal
            key={template.id}
            direction="scale"
            delay={idx * 0.05}
            duration={0.8}
            amount={0.1}
          >
            <div
              className="group rounded-3xl liquid-glass liquid-glass-interactive p-6 sm:p-7 flex flex-col justify-between border border-white/10 hover:border-purple-500/40 transition-all duration-300 shadow-lg hover:shadow-2xl h-full"
            >
              <div className="glass-reflection-highlight" />

              <div>
                {/* Category & Version */}
                <div className="flex items-center justify-between mb-4">
                  <span className={cn('text-xs font-mono font-semibold px-3 py-1 rounded-full border', getCategoryBadgeClass(template.category))}>
                    {template.category}
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full liquid-glass-subtle text-muted-foreground border border-white/20">
                    {template.version}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-black text-foreground group-hover:text-indigo-400 transition-colors tracking-tight">
                  {template.title}
                </h2>

                {/* Tagline */}
                <p className="mt-1.5 text-xs font-medium text-purple-400">
                  {template.tagline}
                </p>

                {/* Description */}
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {template.description}
                </p>

                {/* Key Features Preview */}
                <div className="mt-5 pt-4 border-t border-border/50 space-y-2">
                  {template.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {template.tags.slice(0, 4).map((tag) => (
                    <TechBadge
                      key={tag}
                      name={tag}
                      size="sm"
                    />
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between gap-2">
                <button
                  onClick={() => setPreviewTemplate(template)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl liquid-btn-primary font-semibold text-xs shadow-md transition-all group-hover:scale-102"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-300" />
                  <span>Live Viewport</span>
                </button>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/templates/${template.slug}`}
                    className="flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-xl liquid-btn-secondary text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span>Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {template.sourceUrl && (
                    <a
                      href={template.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl liquid-btn-secondary text-muted-foreground hover:text-foreground transition-colors"
                      title="Source Repository"
                      aria-label="Source Repository"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Interactive Responsive Viewport Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative isolate w-full max-w-6xl max-h-[96vh] overflow-y-auto rounded-3xl p-4 sm:p-8 liquid-glass-elevated shadow-2xl animate-in zoom-in-95 duration-200 border border-white/20">
            <div className="glass-reflection-highlight" />

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border/50 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className={cn('text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border', getCategoryBadgeClass(previewTemplate.category))}>
                    {previewTemplate.category}
                  </span>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    {previewTemplate.framework}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight mt-1">
                  {previewTemplate.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Interactive multi-device live reflow • Test responsiveness in Desktop, Tablet, and Mobile viewports
                </p>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-2.5 rounded-full liquid-btn-secondary text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Interactive Preview Device Frame */}
            <TemplateDevicePreview template={previewTemplate} initialMode="live" />

            {/* Modal Footer Actions */}
            <div className="mt-8 pt-5 border-t border-border/50 flex flex-wrap items-center justify-between gap-3">
              <Link
                href={`/templates/${previewTemplate.slug}`}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 transition-colors"
              >
                <Layers className="w-4 h-4" />
                <span>Read detailed architecture specification & implementation guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="px-5 py-2 text-xs font-semibold rounded-xl liquid-btn-secondary transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
