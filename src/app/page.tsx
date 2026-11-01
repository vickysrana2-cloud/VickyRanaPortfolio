import Link from 'next/link';
import { profileData } from '@/data/profile';
import { projectsData } from '@/data/projects';
import { experienceData } from '@/data/experience';
import { gamesData } from '@/data/games';
import { templatesData } from '@/data/templates';
import { Project } from '@/types';
import { 
  ArrowRight, 
  ExternalLink, 
  Mail, 
  FileText, 
  Code2, 
  Gamepad2, 
  LayoutTemplate, 
  Briefcase, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Terminal,
  Zap,
  Play,
  MapPin
} from 'lucide-react';
import { Github, Linkedin } from '@/components/icons';
import { CursorCharacter } from '@/components/cursor-character';
import { CharacterScene } from '@/components/character/CharacterScene';
import { FixedBackgroundSection } from '@/components/sections/FixedBackgroundSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { TechBadge } from '@/components/ui/tech-icon';
import { cn } from '@/lib/utils';



function ProjectCard({
  project,
  index = 0,
  lead = false,
}: {
  project: Project;
  index?: number;
  lead?: boolean;
}) {
  const indexStr = String(index + 1).padStart(2, '0');

  // Expansive Lead Spotlight Variant
  if (lead) {
    return (
      <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/25 dark:border-white/15 bg-card/60 p-7 sm:p-9 backdrop-blur-md shadow-2xl transition-all duration-500 hover:border-indigo-500/50 hover:shadow-indigo-500/10">
        {/* Specular top highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        
        {/* Watermark index number */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 -top-4 select-none font-mono font-black text-foreground/[0.04] text-[8rem] sm:text-[10rem] transition-colors duration-500 group-hover:text-indigo-500/10 leading-none"
        >
          {indexStr}
        </span>

        {/* Ambient glow on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-indigo-500/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="relative space-y-4">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-indigo-400">
              <Zap className="w-3.5 h-3.5" />
              <span>{project.category} Spotlight</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Production Verified</span>
            </span>
          </div>

          {/* Title & Tagline */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground group-hover:text-indigo-400 transition-colors">
              <Link href={`/projects/${project.slug}`}>
                {project.title}
              </Link>
            </h3>
            <p className="mt-1.5 text-sm sm:text-base font-medium text-indigo-400/90 leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          {/* Architectural Pillars */}
          {project.architecturePoints && project.architecturePoints.length > 0 && (
            <div className="space-y-2.5 rounded-2xl border border-white/10 bg-white/[0.03] dark:bg-black/20 p-4 sm:p-5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>Architectural Foundations</span>
              </span>
              <div className="space-y-2 pt-1">
                {project.architecturePoints.slice(0, 3).map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug text-foreground/90">{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats Bar */}
          {project.stats && (
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-1">
              {Object.entries(project.stats).map(([k, v]) => (
                <div key={k} className="p-2 sm:p-2.5 rounded-xl border border-white/10 bg-white/[0.02] dark:bg-white/[0.03] text-center">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase block truncate">{k}</span>
                  <span className="text-xs font-mono font-bold text-foreground mt-0.5 block truncate">{v}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tech Badges */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            {project.tags.map((tag) => (
              <TechBadge key={tag} name={tag} size="sm" />
            ))}
          </div>
        </div>

        {/* Card Footer CTAs */}
        <div className="relative mt-8 pt-5 border-t border-border/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl liquid-btn-primary text-xs sm:text-sm font-semibold transition-all hover:scale-102 text-center"
          >
            <span>Explore Architecture Case Study</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
          <div className="flex items-center justify-end gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all"
                title="GitHub Repository"
                aria-label={`${project.title} GitHub repository`}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all"
                title="Live Demonstration"
                aria-label={`${project.title} live demo`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </article>
    );
  }

  // Secondary Bento Card Variant
  const maxTags = 4;
  const extra = project.tags.length - maxTags;

  return (
    <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/20 dark:border-white/12 bg-card/50 p-6 sm:p-7 backdrop-blur-md shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-indigo-500/10">
      {/* Specular top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent" />

      {/* Watermark index number */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-1 -top-3 select-none font-mono font-black text-foreground/[0.04] text-[6rem] transition-colors duration-500 group-hover:text-indigo-500/10 leading-none"
      >
        {indexStr}
      </span>

      <div className="relative space-y-3">
        <span className="inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-300">
          {project.category}
        </span>

        <div>
          <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-indigo-400 transition-colors">
            <Link href={`/projects/${project.slug}`}>
              {project.title}
            </Link>
          </h3>
          <p className="mt-1 text-xs sm:text-sm font-medium text-indigo-400/90 leading-snug">
            {project.tagline}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Stats strip if available */}
        {project.stats && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {Object.values(project.stats).map((val, i) => (
              <span key={i} className="px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.02] text-[10px] font-mono text-muted-foreground">
                {val}
              </span>
            ))}
          </div>
        )}

        {/* Tech Badges */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {project.tags.slice(0, maxTags).map((tag) => (
            <TechBadge key={tag} name={tag} size="sm" />
          ))}
          {extra > 0 && (
            <span className="rounded-md border border-border/60 px-2 py-1 font-mono text-[10px] text-muted-foreground">
              +{extra}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="relative mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-foreground transition-colors group-hover:text-indigo-400"
        >
          <span>Explore architecture</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </Link>

        <div className="flex items-center gap-1.5">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub repository`}
              className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}





export default function HomePage() {
  const featuredProjects = projectsData.filter((p) => p.featured).slice(0, 3);
  const featuredGames = gamesData.slice(0, 4);
  const featuredTemplates = templatesData.slice(0, 3);
  const [leadBio, ...restBio] = profileData.bio;

  return (
    <div className="flex flex-col gap-16 sm:gap-24 lg:gap-32 pb-16 overflow-hidden">
     {/* 1. HERO SECTION */}
<section
  id="home"
  aria-labelledby="hero-heading"
  className="relative mx-auto w-full max-w-7xl px-4 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pt-36"
>
  {/* One soft ambient glow (was two) */}
  <div
    aria-hidden="true"
    className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-3xl sm:h-[640px] sm:w-[640px] dark:bg-indigo-600/20"
  />

  <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 lg:gap-16">
    {/* LEFT: message */}
    <ScrollReveal direction="up" duration={0.8} once={true} className="flex flex-col items-center text-center md:col-span-7 md:items-start md:text-left">
      {/* Availability */}
      <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span>{profileData.availability.message}</span>
      </div>

      {/* Headline */}
      <h1
        id="hero-heading"
        className="mt-6 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
      >
        Building{" "}
        <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
          scalable systems
        </span>{" "}
        and reactive web apps
      </h1>

      {/* Intro */}
      <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        {profileData.tagline} Previously building full-stack platforms at{" "}
        <span className="font-medium text-foreground">Actifyzone</span> and{" "}
        <span className="font-medium text-foreground">Havet AI</span>.
      </p>

      {/* Actions: one primary, one secondary */}
      <div className="mt-8 flex w-full flex-col sm:w-auto sm:flex-row flex-wrap items-center justify-center gap-3 md:justify-start">
        <Link
          href="/projects"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Code2 className="h-4 w-4" aria-hidden="true" />
          View projects
        </Link>

        <a
          href="/vickyrana_resume_fe_new.pdf"
          download="vickyrana_resume_fe_new.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-border/70 bg-background/50 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <FileText className="h-4 w-4 text-indigo-500" aria-hidden="true" />
          Download resume
        </a>
      </div>

      {/* Quiet secondary links: contact + socials in one row */}
      <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-1 text-muted-foreground">
        <Link
          href="/contact"
          className="mr-2 rounded-md px-2 py-1 text-sm font-medium transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
        >
          Get in touch
        </Link>
        <span className="h-4 w-px bg-border" aria-hidden="true" />
        {[
          { href: profileData.contact.github, label: "GitHub", Icon: Github, external: true },
          { href: profileData.contact.linkedin, label: "LinkedIn", Icon: Linkedin, external: true },
          { href: `mailto:${profileData.contact.email}`, label: "Email", Icon: Mail, external: false },
        ].map(({ href, label, Icon, external }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="rounded-lg p-2 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
          >
            <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
        ))}
      </div>
    </ScrollReveal>

    {/* RIGHT: character */}
    <ScrollReveal direction="scale" delay={0.2} duration={0.9} once={true} className="hidden md:flex w-full justify-center md:col-span-5">
      <CursorCharacter className="aspect-square w-full max-w-xs select-none sm:max-w-sm md:max-w-md" />
    </ScrollReveal>
  </div>

  {/* Metrics: one slim divided strip instead of four heavy cards */}
  <ScrollReveal direction="up" delay={0.3} duration={0.8} once={true}>
    <dl className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 overflow-hidden rounded-2xl border border-border/60 bg-background/40 backdrop-blur-sm shadow-sm">
      {profileData.metrics.map((metric, i) => {
        const metricIcons = [Code2, Briefcase, Award, MapPin];
        const Icon = metricIcons[i] || Sparkles;
        return (
          <div
            key={metric.label}
            className={cn(
              "relative flex flex-col justify-between p-5 sm:p-6 transition-colors duration-200 hover:bg-muted/15",
              i === 1 && "border-t border-border/60 sm:border-t-0 sm:border-l",
              i === 2 && "border-t border-border/60 sm:border-l-0 lg:border-l lg:border-t-0",
              i === 3 && "border-t border-border/60 sm:border-l lg:border-t-0"
            )}
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {metric.label}
                </dt>
                <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
              <dd className="mt-2.5 text-base sm:text-lg lg:text-base xl:text-lg font-bold tracking-tight text-foreground">
                {metric.value}
              </dd>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{metric.description}</p>
          </div>
        );
      })}
    </dl>
  </ScrollReveal>
</section>

      {/* 3D PROCEDURAL CHARACTER COMPANION */}
      <ScrollReveal direction="up" duration={0.9} amount={0.15}>
        <section
          id="character-companion"
          aria-label="Interactive 3D Golden Monkey Character"
          className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <CharacterScene />
        </section>
      </ScrollReveal>

      {/* 2. ABOUT ME SECTION */}
      <ScrollReveal direction="up" duration={0.9} amount={0.15}>
        <section
          id="about"
          aria-labelledby="about-heading"
          className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/30 liquid-glass-elevated dark:border-white/15">
            {/* Specular top highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/30" />
            {/* Soft ambient glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-400/10"
            />

            <div className="relative grid grid-cols-1 gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-14">
              {/* LEFT: story */}
              <div className="lg:col-span-7 xl:col-span-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
                  <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Engineering Philosophy</span>
                </div>

                <h2
                  id="about-heading"
                  className="mt-5 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
                >
                  Bridging frontend reactivity with{" "}
                  <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400">
                    scalable server architectures
                  </span>
                </h2>

                <div className="mt-8 max-w-2xl space-y-5">
                  {leadBio && (
                    <p className="text-lg leading-relaxed text-foreground/90 sm:text-xl">
                      {leadBio}
                    </p>
                  )}
                  {restBio.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-sm leading-relaxed text-muted-foreground sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* RIGHT: milestones */}
              <aside className="lg:col-span-5 xl:col-span-4">
                <div className="rounded-2xl border border-border/60 bg-background/40 p-6 backdrop-blur-sm sm:p-7">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
                      <Sparkles className="h-4 w-4 text-amber-500" aria-hidden="true" />
                      <span>Verified Milestones</span>
                    </div>
                    <span className="rounded-full border border-border/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                      {String(profileData.coreHighlights.length).padStart(2, "0")}
                    </span>
                  </div>

                  <ol className="relative mt-6 space-y-5 before:absolute before:bottom-2 before:left-[11px] before:top-2 before:w-px before:bg-gradient-to-b before:from-indigo-500/40 before:via-border before:to-transparent">
                    {profileData.coreHighlights.map((highlight, idx) => (
                      <li key={idx} className="group relative pl-9">
                        <span className="absolute left-0 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-background ring-1 ring-emerald-500/30 transition-all duration-200 group-hover:ring-emerald-500/60 group-hover:shadow-[0_0_0_4px_rgba(16,185,129,0.12)]">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                        </span>
                        <p className="text-sm leading-relaxed text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
                          {highlight}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 2.5 FIXED BACKGROUND SECTION */}
      <FixedBackgroundSection
        image="/portrait.png"
      />

      {/* 3. TECHNICAL SKILLS SHOWCASE */}
      <SkillsSection />

{/* 4. FEATURED PROJECTS SECTION (Modern Asymmetric Bento Grid) */}
<section
  id="featured-projects"
  aria-labelledby="projects-heading"
  className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
>
  <ScrollReveal direction="down" duration={0.8} amount={0.15}>
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between pb-4">
      <div className="max-w-2xl space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 backdrop-blur-md">
          <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Full-Stack Implementations</span>
        </div>
        <h2
          id="projects-heading"
          className="text-3xl sm:text-5xl font-black text-foreground tracking-tight"
        >
          Featured{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Case Studies & Systems
          </span>
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Production platforms, multi-tier architectures, Spring Boot REST backends, and responsive Next.js applications.
        </p>
      </div>

      <Link
        href="/projects"
        className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-border/70 bg-background/50 px-5 py-2.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-200 hover:border-indigo-500/40 hover:text-indigo-500 sm:self-auto"
      >
        <span>View all projects</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </div>
  </ScrollReveal>

  {/* Modern Asymmetric Bento Grid */}
  <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 items-stretch">
    {/* Spotlight Lead Card (7 cols) */}
    {featuredProjects[0] && (
      <div className="lg:col-span-7 h-full flex flex-col">
        <ScrollReveal direction="scale" duration={0.9} amount={0.1} className="h-full flex-1">
          <ProjectCard project={featuredProjects[0]} index={0} lead={true} />
        </ScrollReveal>
      </div>
    )}

    {/* Secondary Stack (5 cols) */}
    <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8 h-full justify-between">
      {featuredProjects.slice(1).map((project, idx) => (
        <div key={project.id} className="flex-1 flex flex-col">
          <ScrollReveal direction="up" delay={(idx + 1) * 0.15} duration={0.8} amount={0.1} className="h-full flex-1">
            <ProjectCard project={project} index={idx + 1} lead={false} />
          </ScrollReveal>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* 5. PROFESSIONAL EXPERIENCE & INTERNSHIP PREVIEW */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <ScrollReveal direction="down" duration={0.8}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-500 mb-2">
                <Briefcase className="w-4 h-4" />
                <span>Production Track Record</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
                Internships & Industry Experience
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Verified engineering contributions at Actifyzone and Havet AI.
              </p>
            </div>
            <Link
              href="/experience"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-500 hover:text-indigo-400 transition-colors group"
            >
              <span>Full Timeline & Details</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experienceData.map((exp, idx) => (
            <ScrollReveal
              key={exp.id}
              direction="up"
              delay={idx * 0.15}
              duration={0.8}
            >
              <div className="p-6 sm:p-8 rounded-3xl liquid-glass-interactive border border-white/25 dark:border-white/12 flex flex-col justify-between space-y-4 h-full">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg liquid-badge text-indigo-500">
                      {exp.type}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground liquid-glass-pill px-2.5 py-0.5 rounded-lg border border-white/20">
                      {exp.period}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground">
                    {exp.role}
                  </h3>
                  <div className="text-sm font-semibold text-indigo-400 mb-3">
                    {exp.company} • {exp.location}
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {exp.description}
                  </p>

                  {/* Top achievement bullet */}
                  {exp.keyAchievements.length > 0 && (
                    <div className="mt-4 p-3.5 rounded-2xl liquid-glass-subtle border border-white/20 dark:border-white/10 flex items-start gap-2.5 text-xs text-muted-foreground">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{exp.keyAchievements[0]}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-border/70 flex flex-wrap gap-1.5">
                  {exp.technologies.slice(0, 5).map((tech) => (
                    <TechBadge key={tech} name={tech} size="sm" />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 6. PLAYABLE ARCADE & TEMPLATES HIGHLIGHT */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Arcade Card */}
          <ScrollReveal direction="scale" duration={0.8}>
            <div className="p-5 sm:p-8 lg:p-10 rounded-3xl liquid-glass-elevated border border-white/25 dark:border-white/12 flex flex-col justify-between space-y-6 relative overflow-hidden h-full">
              {/* Specular top highlight */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                  <Gamepad2 className="w-4 h-4" />
                  <span>Interactive Playground</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                  Playable Games Arcade
                </h2>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Test your reflexes and problem solving with Cyber 2048, Retro Snake Quest, Dragon Runner, and Dev Code Typer. Built with HTML5 Canvas and React.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-4 sm:pt-6">
                  {featuredGames.map((game) => (
                    <Link
                      key={game.id}
                      href={`/games/${game.slug}`}
                      className="p-3.5 rounded-2xl liquid-glass-subtle hover:border-emerald-500/40 border border-white/20 dark:border-white/10 transition-all group block"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-foreground group-hover:text-emerald-400">
                        <span>{game.title}</span>
                        <Play className="w-3 h-3 text-emerald-400 fill-emerald-400 shrink-0" />
                      </div>
                      <span className="text-[11px] text-muted-foreground font-mono block mt-0.5">
                        {game.category} • Playable
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/games"
                className="inline-flex w-full items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-600/25 border border-white/20 text-center"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Enter Games Arcade</span>
              </Link>
            </div>
          </ScrollReveal>

          {/* Templates Card */}
          <ScrollReveal direction="scale" delay={0.15} duration={0.8}>
            <div className="p-5 sm:p-8 lg:p-10 rounded-3xl liquid-glass-elevated border border-white/25 dark:border-white/12 flex flex-col justify-between space-y-6 relative overflow-hidden h-full">
              {/* Specular top highlight */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
                  <LayoutTemplate className="w-4 h-4" />
                  <span>Reusable UI Architectures</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                  Website Templates Gallery
                </h2>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Explore over 40 production-grade commercial website templates across 9 industries (Automotive, Real Estate, Healthcare, Law, Hospitality, Luxury, Fitness, and E-commerce) with interactive multi-device viewport testing.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-4 sm:pt-6">
                  {featuredTemplates.map((template) => (
                    <Link
                      key={template.id}
                      href={`/templates/${template.slug}`}
                      className="p-3.5 rounded-2xl liquid-glass-subtle hover:border-purple-500/40 border border-white/20 dark:border-white/10 transition-all group block"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-foreground group-hover:text-purple-400">
                        <span className="truncate">{template.title.split(' ')[0]} {template.title.split(' ')[1] || ''}</span>
                        <ArrowRight className="w-3 h-3 text-purple-400 shrink-0" />
                      </div>
                      <span className="text-[11px] text-muted-foreground font-mono block mt-0.5 truncate">
                        {template.category}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/templates"
                className="inline-flex w-full items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-600/25 border border-white/20 text-center"
              >
                <LayoutTemplate className="w-4 h-4" />
                <span>Explore 40+ Commercial Templates</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 7. VERIFIED ACHIEVEMENTS BANNER */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <ScrollReveal direction="up" duration={0.8}>
          <div className="p-5 sm:p-8 lg:p-10 rounded-3xl liquid-glass-elevated border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
            {/* Specular highlight */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent pointer-events-none" />

            <div className="flex items-start sm:items-center gap-4">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/25 shrink-0 shadow-sm shadow-amber-500/10">
                <Award className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg sm:text-2xl font-bold text-foreground">
                    Verified Certifications & Academic Accomplishments
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Explore recognized credentials in cloud architecture, full-stack development, and degree qualifications.
                </p>
              </div>
            </div>

            <Link
              href="/achievements"
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 border border-white/30 text-center"
            >
              <span>View All Credentials</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* 8. CALL TO ACTION / CONTACT INVITATION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <ScrollReveal direction="scale" duration={0.9} amount={0.2}>
          <div className="p-6 sm:p-10 lg:p-14 rounded-3xl liquid-glass-elevated border border-white/30 dark:border-white/15 text-center max-w-3xl mx-auto space-y-6 relative overflow-hidden">
            {/* Specular top highlight */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 dark:via-white/30 to-transparent pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-xs shadow-emerald-500/50" />
              <span>Currently Interviewing</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
              Have a role or project in mind?
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Whether you need a full-stack engineer to build an end-to-end platform or lead backend service architecture, let’s connect.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl liquid-btn-primary text-white font-semibold text-sm sm:text-base text-center"
              >
                <Mail className="w-4 h-4" />
                <span>Send a Message</span>
              </Link>

              <a
                href={`mailto:${profileData.contact.email}`}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl liquid-btn-secondary text-foreground font-semibold text-sm sm:text-base text-center"
              >
                <span>{profileData.contact.email}</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
