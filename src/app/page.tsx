import Link from 'next/link';
import { profileData } from '@/data/profile';
import { skillsData } from '@/data/skills';
import { projectsData } from '@/data/projects';
import { experienceData } from '@/data/experience';
import { gamesData } from '@/data/games';
import { templatesData } from '@/data/templates';
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
  Play
} from 'lucide-react';
import { Github, Linkedin } from '@/components/icons';

export default function HomePage() {
  const featuredProjects = projectsData.filter((p) => p.featured).slice(0, 3);
  const featuredGames = gamesData.slice(0, 3);
  const featuredTemplates = templatesData.slice(0, 3);

  return (
    <div className="flex flex-col gap-24 sm:gap-32 pb-16 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 lg:pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Ambient liquid lighting caustics */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-indigo-500/15 dark:bg-indigo-600/20 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-1/4 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-violet-500/10 dark:bg-violet-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
          {/* Availability Status Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-xs shadow-emerald-500/50" />
            <span>{profileData.availability.message}</span>
          </div>

          {/* Headline & Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.1]">
            Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400">Scalable Systems</span> & Reactive Web Apps
          </h1>

          {/* Subtitle / Introduction */}
          <p className="text-base sm:text-xl text-muted-foreground leading-relaxed max-w-2xl font-normal">
            {profileData.tagline} Experienced in building full-stack web platforms at <strong className="text-foreground">Actifyzone</strong> and <strong className="text-foreground">Havet AI</strong>.
          </p>

          {/* Calls to Action */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
            <Link
              href="/projects"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl liquid-btn-primary text-white font-semibold text-sm sm:text-base"
            >
              <Code2 className="w-4 h-4" />
              <span>View Projects</span>
            </Link>

            <a
              href="/vickyrana_resume_fe_new.pdf"
              download="vickyrana_resume_fe_new.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl liquid-btn-secondary text-foreground font-semibold text-sm sm:text-base"
            >
              <FileText className="w-4 h-4 text-indigo-500" />
              <span>Download Resume</span>
            </a>

            <Link
              href="/contact"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl liquid-btn-secondary text-muted-foreground hover:text-foreground text-sm sm:text-base font-semibold"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Me</span>
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-3 pt-4 text-muted-foreground">
            <a
              href={profileData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl liquid-btn-secondary hover:text-foreground transition-all"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={profileData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl liquid-btn-secondary hover:text-foreground transition-all"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${profileData.contact.email}`}
              className="p-3 rounded-2xl liquid-btn-secondary hover:text-foreground transition-all"
              aria-label="Direct Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Key Metrics / Highlights Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-10">
            {profileData.metrics.map((metric, i) => (
              <div
                key={i}
                className="p-5 rounded-3xl liquid-glass-interactive text-center space-y-1 border border-white/25 dark:border-white/10"
              >
                <div className="text-xl sm:text-2xl font-black text-foreground font-mono">
                  {metric.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-500">
                  {metric.label}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. ABOUT ME SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="p-8 sm:p-12 rounded-3xl liquid-glass-elevated border border-white/30 dark:border-white/15 relative overflow-hidden">
          {/* Specular top highlight */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 dark:via-white/30 to-transparent pointer-events-none" />

          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-500">
              <Terminal className="w-4 h-4" />
              <span>Engineering Philosophy</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
              Bridging Frontend Reactivity with Scalable Server Architectures
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {profileData.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Core highlights checks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {profileData.coreHighlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. TECHNICAL SKILLS SHOWCASE */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-500 mb-2">
              <Zap className="w-4 h-4" />
              <span>Technical Competencies</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
              Verified Technical Stack
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Production engineering tools, frameworks, databases, and architectural patterns.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData.map((category) => (
            <div
              key={category.category}
              className="p-6 sm:p-8 rounded-3xl liquid-glass-interactive border border-white/25 dark:border-white/10 space-y-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground">
                  {category.category}
                </h3>
                <span className="text-xs font-mono text-muted-foreground">
                  {category.skills.length} Technologies
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {category.description}
              </p>

              <div className="space-y-2.5 pt-2">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3 rounded-2xl liquid-glass-subtle border border-white/20 dark:border-white/10 flex items-start justify-between gap-3 hover:border-indigo-500/40 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground">
                          {skill.name}
                        </span>
                        {skill.highlight && (
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-xs shadow-indigo-500/50" />
                        )}
                      </div>
                      {skill.description && (
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                          {skill.description}
                        </p>
                      )}
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-lg liquid-glass-pill text-foreground border border-white/20 shrink-0">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED PROJECTS SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-500 mb-2">
              <Code2 className="w-4 h-4" />
              <span>Full-Stack Implementations</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
              Featured Case Studies
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Production web apps, microservice gateways, and high-concurrency systems.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-500 hover:text-indigo-400 transition-colors group"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-3xl liquid-glass-interactive border border-white/25 dark:border-white/12 p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Specular top highlight */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg liquid-badge text-indigo-500">
                    {project.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-500">
                    <Sparkles className="w-3 h-3" />
                    Featured
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground group-hover:text-indigo-500 transition-colors">
                  {project.title}
                </h3>

                <p className="mt-1.5 text-xs font-medium text-indigo-400">
                  {project.tagline}
                </p>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-lg liquid-glass-subtle border border-white/20 text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/70 flex items-center justify-between">
                <Link
                  href={`/projects/${project.slug}`}
                  className="flex items-center gap-1 text-xs font-semibold text-indigo-500 hover:text-indigo-400"
                >
                  <span>Explore Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl liquid-btn-secondary text-muted-foreground hover:text-foreground"
                      title="GitHub Repository"
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
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PROFESSIONAL EXPERIENCE & INTERNSHIP PREVIEW */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experienceData.map((exp) => (
            <div
              key={exp.id}
              className="p-6 sm:p-8 rounded-3xl liquid-glass-interactive border border-white/25 dark:border-white/12 flex flex-col justify-between space-y-4"
            >
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
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-lg liquid-glass-subtle border border-white/20 text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. PLAYABLE ARCADE & TEMPLATES HIGHLIGHT */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Arcade Card */}
          <div className="p-8 sm:p-10 rounded-3xl liquid-glass-elevated border border-white/25 dark:border-white/12 flex flex-col justify-between space-y-6 relative overflow-hidden">
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
                Test your reflexes and problem solving with Cyber 2048, Retro Snake Quest, Memory Matrix, and Dev Code Typer. Built with HTML5 Canvas and React.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-6">
                {featuredGames.map((game) => (
                  <Link
                    key={game.id}
                    href={`/games/${game.slug}`}
                    className="p-3.5 rounded-2xl liquid-glass-subtle hover:border-emerald-500/40 border border-white/20 dark:border-white/10 transition-all group block"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-foreground group-hover:text-emerald-400">
                      <span>{game.title}</span>
                      <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
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
              className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-600/25 border border-white/20"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Enter Games Arcade</span>
            </Link>
          </div>

          {/* Templates Card */}
          <div className="p-8 sm:p-10 rounded-3xl liquid-glass-elevated border border-white/25 dark:border-white/12 flex flex-col justify-between space-y-6 relative overflow-hidden">
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

              <div className="grid grid-cols-2 gap-3 pt-6">
                {featuredTemplates.map((template) => (
                  <Link
                    key={template.id}
                    href={`/templates/${template.slug}`}
                    className="p-3.5 rounded-2xl liquid-glass-subtle hover:border-purple-500/40 border border-white/20 dark:border-white/10 transition-all group block"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-foreground group-hover:text-purple-400">
                      <span>{template.title.split(' ')[0]} {template.title.split(' ')[1] || ''}</span>
                      <ArrowRight className="w-3 h-3 text-purple-400" />
                    </div>
                    <span className="text-[11px] text-muted-foreground font-mono block mt-0.5">
                      {template.category}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/templates"
              className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-purple-600/25 border border-white/20"
            >
              <LayoutTemplate className="w-4 h-4" />
              <span>Explore 40+ Commercial Templates</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. VERIFIED ACHIEVEMENTS BANNER */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="p-8 sm:p-10 rounded-3xl liquid-glass-elevated border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Specular highlight */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent pointer-events-none" />

          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/25 shrink-0 shadow-sm shadow-amber-500/10">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  Verified Certifications & Academic Accomplishments
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
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
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 border border-white/30"
          >
            <span>View All Credentials</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 8. CALL TO ACTION / CONTACT INVITATION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="p-8 sm:p-14 rounded-3xl liquid-glass-elevated border border-white/30 dark:border-white/15 text-center max-w-3xl mx-auto space-y-6 relative overflow-hidden">
          {/* Specular top highlight */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 dark:via-white/30 to-transparent pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-xs shadow-emerald-500/50" />
            <span>Currently Interviewing</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            Have a role or project in mind?
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Whether you need a full-stack engineer to build an end-to-end platform or lead backend service architecture, let’s connect.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl liquid-btn-primary text-white font-semibold text-sm sm:text-base"
            >
              <Mail className="w-4 h-4" />
              <span>Send a Message</span>
            </Link>

            <a
              href={`mailto:${profileData.contact.email}`}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl liquid-btn-secondary text-foreground font-semibold text-sm sm:text-base"
            >
              <span>{profileData.contact.email}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
