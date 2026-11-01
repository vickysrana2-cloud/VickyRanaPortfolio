import Link from 'next/link';
import { profileData } from '@/data/profile';
import { projectsData } from '@/data/projects';
import { experienceData } from '@/data/experience';
import { gamesData } from '@/data/games';
import { templatesData } from '@/data/templates';
import {
  ArrowRight,
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
  Play,
  MapPin
} from 'lucide-react';
import { Github, Linkedin } from '@/components/icons';

import Image from 'next/image';

import { FixedBackgroundSection } from '@/components/sections/FixedBackgroundSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { FeaturedProjectsSection } from '@/components/sections/FeaturedProjectsSection';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { TechBadge } from '@/components/ui/tech-icon';
import { cn } from '@/lib/utils';



export default function HomePage() {
  const featuredProjects = projectsData.slice(0, 4);
  const featuredGames = gamesData.slice(0, 4);
  const featuredTemplates = templatesData.slice(0, 3);

  return (
    <div className="flex flex-col gap-24 sm:gap-36 lg:gap-48 pb-24 sm:pb-32 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section
        id="home"
        aria-labelledby="hero-heading"
        className="relative mx-auto w-full max-w-7xl px-4 pt-28 sm:px-6 sm:pt-20 lg:px-8 lg:pt-28"
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
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs font-medium text-muted-foreground backdrop-blur-sm">
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
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl liquid-btn-primary px-6 py-3.5 text-sm font-semibold text-white text-center shadow-lg shadow-indigo-600/20"
              >
                <Code2 className="h-4 w-4" aria-hidden="true" />
                <span>View projects</span>
              </Link>

              <a
                href="/vickyrana_resume_fe_new.pdf"
                download="vickyrana_resume_fe_new.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl liquid-btn-secondary px-6 py-3.5 text-sm font-semibold text-foreground text-center"
              >
                <FileText className="h-4 w-4 text-indigo-500" aria-hidden="true" />
                <span>Download resume</span>
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

          {/* RIGHT: character illustration with subtle glass pedestal backdrop */}
          <ScrollReveal direction="scale" delay={0.2} duration={0.9} once={true} className="hidden md:flex w-full justify-center md:col-span-5 relative">
            <div className="relative flex items-center justify-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-8 bottom-6 -z-10 h-64 rounded-full bg-gradient-to-t from-indigo-500/15 via-violet-500/10 to-transparent blur-2xl dark:from-indigo-400/15"
              />
              <Image
                src="/hero_section_img.webp"
                alt="Vicky Rana full stack developer 3D character illustration"
                width={480}
                height={576}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 480px"
                className="h-[460px] sm:h-[520px] md:h-[580px] lg:h-[640px] w-auto max-w-full select-none object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Metrics: one slim divided strip in liquid glass with specular highlight */}
        <ScrollReveal direction="up" delay={0.3} duration={0.8} once={true}>
          <dl className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 overflow-hidden rounded-3xl liquid-glass border border-white/25 dark:border-white/12 shadow-xl relative">
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent pointer-events-none" />
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

      {/* 2. ABOUT ME & VERIFIED MILESTONES SECTION */}
      <ScrollReveal direction="up" duration={0.8} amount={0.15}>
        <section
          id="about"
          aria-labelledby="about-heading"
          className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="relative rounded-3xl border border-white/30 liquid-glass-elevated dark:border-white/15 bg-card/80 dark:bg-zinc-950/85 backdrop-blur-xl p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden">
            {/* Top specular highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent dark:via-white/30" />
            {/* Ambient background glows */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-400/10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-400/10"
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* Left Column: About Narrative */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
                    <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>About Me</span>
                  </div>

                  <h2
                    id="about-heading"
                    className="mt-4 text-balance text-2xl font-extrabold leading-[1.2] tracking-tight text-foreground sm:text-3xl lg:text-4xl"
                  >
                    Bridging frontend reactivity with{' '}
                    <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                      scalable server architectures
                    </span>
                  </h2>

                  <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    <p className="text-foreground/95 font-medium leading-relaxed">
                      I am an aspiring Software Developer with hands-on experience building responsive and scalable web applications using React.js, Next.js, Java, Spring Boot, and MySQL. I have a strong foundation in object-oriented programming, REST API integration, and full-stack development.
                    </p>
                    <p className="leading-relaxed">
                      During my internships at Actifyzone (Frontend Developer Intern) and Havet AI (Full Stack Developer Intern), I contributed to multi-tier web projects using Next.js, NestJS, and MongoDB Atlas—implementing reusable UI components, integrating backend REST endpoints, and optimizing client-side performance.
                    </p>
                    <p className="leading-relaxed">
                      I have led teams in hackathons (such as winning the Silver Medal for the WeatherWatch project at IT Vedant) and continuously build real-world web apps like Pawsitive (Pet Care Management Platform), DesignMeInteriors, and Archinet.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Available for full-time software engineering roles
                  </span>
                  <Link
                    href="/experience"
                    className="inline-flex items-center gap-1.5 font-semibold text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors group"
                  >
                    <span>View Full Experience</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Verified Milestones */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-border/60 bg-background/50 dark:bg-zinc-900/40 p-5 sm:p-6 backdrop-blur-md">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-border/60">
                    <div className="flex items-center gap-2.5">
                      <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/20">
                        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
                          Verified Milestones
                        </h3>
                        <p className="text-[11px] text-muted-foreground">Key career highlights</p>
                      </div>
                    </div>
                    <span className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1 font-mono text-xs sm:text-sm font-bold text-indigo-500 dark:text-indigo-400 shadow-inner">
                      05 Records
                    </span>
                  </div>

                  <ol className="relative mt-5 space-y-3 before:absolute before:bottom-2 before:left-[11px] before:top-2 before:w-px before:bg-gradient-to-b before:from-indigo-500/40 before:via-border before:to-transparent">
                    {[
                      'Hands-on full-stack engineering with React.js, Next.js, Java, Spring Boot, and MySQL',
                      'Frontend Developer Intern at Actifyzone contributing to responsive multi-project web UIs',
                      'Full Stack Developer Intern at Havet AI engineering Next.js, NestJS, and MongoDB Atlas features',
                      'Team Leader & Silver Medal winner at IT Vedant Hackathon (WeatherWatch platform)',
                      'Certified in Java Full Stack Web Development and HackerRank JavaScript'
                    ].map((milestone, idx) => (
                      <li key={idx} className="group relative pl-8">
                        <span className="absolute left-0 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-background ring-1 ring-emerald-500/30 transition-all duration-200 group-hover:ring-emerald-500/60 group-hover:shadow-[0_0_0_4px_rgba(16,185,129,0.12)]">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                        </span>
                        <div className="rounded-xl border border-border/50 bg-background/60 p-2.5 sm:p-3 backdrop-blur-sm transition-all duration-200 group-hover:border-indigo-500/40 group-hover:bg-muted/30">
                          <p className="text-xs sm:text-sm leading-relaxed text-foreground/90 font-medium">
                            {milestone}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-5 pt-3.5 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    <span>Independently verified</span>
                  </span>
                  <Link
                    href="/achievements"
                    className="font-medium text-indigo-500 dark:text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    <span>View all achievements</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 2.5 FIXED BACKGROUND SECTION */}
      <FixedBackgroundSection
        image="/portrait.webp"
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
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between pb-6">
            <div className="max-w-2xl space-y-3">
              <h2
                id="projects-heading"
                className="text-3xl sm:text-5xl font-black text-foreground tracking-tight"
              >
                Featured{' '}
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

        <div className="mt-6">
          <FeaturedProjectsSection projects={featuredProjects} />
        </div>
      </section>

      {/* 5. PROFESSIONAL EXPERIENCE & INTERNSHIP PREVIEW */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <ScrollReveal direction="down" duration={0.8}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
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
                className="inline-flex w-full items-center justify-center gap-2 py-3.5 px-5 rounded-2xl liquid-btn-primary text-white font-semibold text-sm transition-all text-center shadow-lg shadow-indigo-600/20"
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
                className="inline-flex w-full items-center justify-center gap-2 py-3.5 px-5 rounded-2xl liquid-btn-primary text-white font-semibold text-sm transition-all text-center shadow-lg shadow-indigo-600/20"
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
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl liquid-btn-secondary text-foreground font-bold text-xs sm:text-sm transition-all text-center group"
            >
              <span>View All Credentials</span>
              <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
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
