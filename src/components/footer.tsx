import Link from 'next/link';
import { profileData } from '@/data/profile';
import { 
  Mail, 
  Code2, 
  ArrowUpRight, 
  Heart
} from 'lucide-react';
import { Github, Linkedin } from '@/components/icons';

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="w-full border-t border-white/20 dark:border-white/10 liquid-glass-subtle pt-16 pb-12 mt-24 relative overflow-hidden">
      {/* Specular top highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-white/25 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-border/70">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="group inline-flex items-center font-mono text-xl font-bold tracking-tight text-foreground transition-transform hover:opacity-90 select-none"
              aria-label="VickyRana Home"
            >
              <span
                aria-hidden="true"
                className="text-indigo-500 dark:text-indigo-400 font-semibold transition-transform duration-300 group-hover:-translate-x-0.5 select-none"
              >
                &lt;
              </span>
              <span className="text-foreground font-black">Vicky</span>
              <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400 font-black">
                Rana
              </span>
              <span
                aria-hidden="true"
                className="text-indigo-500 dark:text-indigo-400 font-semibold transition-transform duration-300 group-hover:translate-x-0.5 select-none"
              >
                /&gt;
              </span>
            </Link>


            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              {profileData.tagline}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={profileData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl liquid-btn-secondary text-muted-foreground hover:text-foreground flex items-center justify-center transition-all"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profileData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl liquid-btn-secondary text-muted-foreground hover:text-foreground flex items-center justify-center transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profileData.contact.email}`}
                className="w-9 h-9 rounded-xl liquid-btn-secondary text-muted-foreground hover:text-foreground flex items-center justify-center transition-all"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Current Availability Status Banner */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full liquid-glass-subtle border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-xs shadow-emerald-500/50" />
              <span>{profileData.availability.message}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/games" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                  Games Arcade
                  <span className="text-[10px] liquid-badge text-indigo-500 font-semibold px-1.5 py-0.2 rounded-full">Play</span>
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-muted-foreground hover:text-foreground transition-colors">
                  Website Templates
                </Link>
              </li>
              <li>
                <Link href="/experience" className="text-muted-foreground hover:text-foreground transition-colors">
                  Experience & Internships
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="text-muted-foreground hover:text-foreground transition-colors">
                  Achievements
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Interactive Showcases */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Interactive Arcade
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/games/cyber-2048" className="text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between">
                  <span>Cyber 2048</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/60" />
                </Link>
              </li>
              <li>
                <Link href="/games/retro-snake-quest" className="text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between">
                  <span>Retro Snake</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/60" />
                </Link>
              </li>
              <li>
                <Link href="/games/memory-matrix" className="text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between">
                  <span>Memory Matrix</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/60" />
                </Link>
              </li>
              <li>
                <Link href="/games/code-speed-typer" className="text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between">
                  <span>Dev Code Typer</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/60" />
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-muted-foreground hover:text-foreground transition-colors">
                  Responsive Templates
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Stack */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Core Tech Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'NestJS', 'Spring Boot', 'MongoDB Atlas', 'MySQL', 'REST APIs', 'Git'].map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-1 rounded-lg liquid-glass-subtle text-muted-foreground border border-white/20 dark:border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="pt-2 text-xs text-muted-foreground">
              Location: <span className="text-foreground font-medium">{profileData.availability.location}</span>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p className="flex items-center gap-1">
            <span>© {currentYear} VickyRanaDev. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>using Next.js & Tailwind CSS.</span>
          </p>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-foreground transition-colors">
              Get in Touch
            </Link>
            <span>•</span>
            <a href="/vickyrana_resume_fe_new.pdf" download="vickyrana_resume_fe_new.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              Download CV
            </a>
            <span>•</span>
            <span className="font-mono">{profileData.availability.timezone}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
