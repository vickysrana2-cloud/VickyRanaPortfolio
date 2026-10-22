import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { projectsData } from '@/data/projects';
import { 
  ArrowLeft, 
  ExternalLink, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  Cpu, 
  Calendar, 
  User, 
  Activity,
  ShieldCheck
} from 'lucide-react';
import { Github } from '@/components/icons';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} | Project Architecture & Case Study`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl liquid-btn-secondary text-sm font-medium text-muted-foreground hover:text-foreground transition-all group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* Main Header */}
      <div className="space-y-4 mb-10 pb-8 border-b border-border/70">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full liquid-badge text-indigo-500">
            {project.category}
          </span>
          {project.featured && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
              Featured Case Study
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
          {project.title}
        </h1>

        <p className="text-lg text-indigo-400 font-medium">
          {project.tagline}
        </p>

        <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
          {project.fullDescription}
        </p>

        {/* Metadata bar */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-2 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-indigo-500" />
            <span>Role: <strong className="text-foreground font-sans">{project.role}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <span>Timeline: <strong className="text-foreground font-sans">{project.timeline}</strong></span>
          </div>
          {project.stats?.performance && (
            <div className="flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-500" />
              <span>Metric: <strong className="text-foreground font-sans">{project.stats.performance}</strong></span>
            </div>
          )}
        </div>

        {/* Actions bar */}
        <div className="flex flex-wrap items-center gap-3 pt-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl liquid-btn-primary text-white text-sm font-semibold"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demonstration</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl liquid-btn-secondary text-foreground text-sm font-medium"
            >
              <Github className="w-4 h-4" />
              <span>Source Repository</span>
            </a>
          )}
        </div>
      </div>

      {/* Detail Content Sections */}
      <div className="space-y-8 sm:space-y-10">
        {/* Problem Statement */}
        <section className="p-6 sm:p-8 rounded-3xl liquid-glass-elevated border border-white/25 dark:border-white/12 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent pointer-events-none" />
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span>The Challenge & Problem Statement</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            {project.problemStatement}
          </p>
        </section>

        {/* Technical Architecture */}
        <section className="p-6 sm:p-8 rounded-3xl liquid-glass-elevated border border-white/25 dark:border-white/12 space-y-6 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent pointer-events-none" />
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-500" />
            <span>Technical Architecture & System Design</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {project.architectureOverview}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {project.architecturePoints.map((point, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl liquid-glass-subtle border border-white/20 dark:border-white/10 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5 border border-indigo-500/20">
                  {index + 1}
                </div>
                <span className="text-xs sm:text-sm text-foreground leading-relaxed">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="p-6 sm:p-8 rounded-3xl liquid-glass-elevated border border-white/25 dark:border-white/12 space-y-4 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent pointer-events-none" />
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-500" />
            <span>Key Implemented Features</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.keyFeatures.map((feat, index) => (
              <div
                key={index}
                className="p-3.5 rounded-2xl liquid-glass-subtle border border-white/20 dark:border-white/10 flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-foreground">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Engineering Challenges & Personal Contributions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Challenges */}
          <section className="p-6 sm:p-7 rounded-3xl liquid-glass-interactive border border-white/25 dark:border-white/12 space-y-3 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent pointer-events-none" />
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Technical Hurdles Solved</span>
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              {project.technicalChallenges.map((challenge, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2 shadow-xs shadow-indigo-500/50" />
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Personal Contributions */}
          <section className="p-6 sm:p-7 rounded-3xl liquid-glass-interactive border border-white/25 dark:border-white/12 space-y-3 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-violet-400/30 to-transparent pointer-events-none" />
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Layers className="w-4 h-4 text-violet-400" />
              <span>Personal Contributions</span>
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              {project.contributions.map((contribution, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0 mt-2 shadow-xs shadow-violet-500/50" />
                  <span>{contribution}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Tech Stack Full Inventory */}
        <section className="p-6 sm:p-8 rounded-3xl liquid-glass-elevated border border-white/25 dark:border-white/12 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent pointer-events-none" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
            Technologies & Tools Employed
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs sm:text-sm font-mono px-3.5 py-1.5 rounded-xl liquid-glass-subtle border border-white/20 text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
