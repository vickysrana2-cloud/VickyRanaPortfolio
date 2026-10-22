'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  X, 
  Code2, 
  Gamepad2, 
  LayoutTemplate, 
  Briefcase, 
  Award, 
  Mail, 
  Home, 
  ExternalLink,
  Sun,
  Moon,
  FileText
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { projectsData } from '@/data/projects';
import { gamesData } from '@/data/games';
import { templatesData } from '@/data/templates';
import { profileData } from '@/data/profile';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandMenu({ isOpen, onClose }: CommandMenuProps) {
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const [query, setQuery] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // open command menu
          // will be handled by parent state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  React.useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNavigate = (url: string) => {
    onClose();
    router.push(url);
  };

  // Filter items
  const q = query.toLowerCase().trim();

  const navigationItems = [
    { name: 'Home', url: '/', icon: Home, category: 'Navigation' },
    { name: 'Projects Gallery', url: '/projects', icon: Code2, category: 'Navigation' },
    { name: 'Interactive Arcade', url: '/games', icon: Gamepad2, category: 'Navigation' },
    { name: 'Website Templates', url: '/templates', icon: LayoutTemplate, category: 'Navigation' },
    { name: 'Experience & Internships', url: '/experience', icon: Briefcase, category: 'Navigation' },
    { name: 'Achievements & Education', url: '/achievements', icon: Award, category: 'Navigation' },
    { name: 'Contact Me', url: '/contact', icon: Mail, category: 'Navigation' },
  ].filter(item => !q || item.name.toLowerCase().includes(q));

  const projectItems = projectsData
    .filter(p => !q || p.title.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)))
    .slice(0, 4)
    .map(p => ({
      name: p.title,
      url: `/projects/${p.slug}`,
      icon: Code2,
      subtitle: p.tags.slice(0, 3).join(', '),
      category: 'Projects'
    }));

  const gameItems = gamesData
    .filter(g => !q || g.title.toLowerCase().includes(q) || g.category.toLowerCase().includes(q))
    .slice(0, 4)
    .map(g => ({
      name: g.title,
      url: `/games/${g.slug}`,
      icon: Gamepad2,
      subtitle: `${g.category} • Playable`,
      category: 'Games'
    }));

  const templateItems = templatesData
    .filter(t => !q || t.title.toLowerCase().includes(q) || t.category.toLowerCase().includes(q))
    .slice(0, 4)
    .map(t => ({
      name: t.title,
      url: `/templates/${t.slug}`,
      icon: LayoutTemplate,
      subtitle: `${t.category} Template`,
      category: 'Templates'
    }));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40 dark:bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl rounded-3xl liquid-glass-elevated overflow-hidden animate-in zoom-in-95 duration-200 border border-white/30 dark:border-white/15"
        role="dialog"
        aria-modal="true"
        aria-label="Command search dialog"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-border/80 bg-white/20 dark:bg-white/5">
          <Search className="w-5 h-5 text-indigo-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, page, project, game or skill..."
            className="w-full bg-transparent text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-muted-foreground hover:text-foreground px-2 py-0.5 rounded-lg liquid-glass-subtle"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground liquid-btn-secondary"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* Navigation Section */}
          {navigationItems.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Pages & Navigation
              </div>
              <div className="space-y-0.5">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.url}
                      onClick={() => handleNavigate(item.url)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground rounded-lg hover:bg-indigo-600 hover:text-white transition-colors text-left group"
                    >
                      <Icon className="w-4 h-4 text-muted-foreground group-hover:text-white" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {projectItems.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Projects
              </div>
              <div className="space-y-0.5">
                {projectItems.map((item) => (
                  <button
                    key={item.url}
                    onClick={() => handleNavigate(item.url)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-foreground rounded-lg hover:bg-indigo-600 hover:text-white transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <Code2 className="w-4 h-4 text-indigo-500 group-hover:text-white" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-white/80 font-mono">
                      {item.subtitle}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Games Section */}
          {gameItems.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Playable Games Arcade
              </div>
              <div className="space-y-0.5">
                {gameItems.map((item) => (
                  <button
                    key={item.url}
                    onClick={() => handleNavigate(item.url)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-foreground rounded-lg hover:bg-indigo-600 hover:text-white transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <Gamepad2 className="w-4 h-4 text-emerald-500 group-hover:text-white" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-white/80">
                      {item.subtitle}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Templates Section */}
          {templateItems.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Website Templates
              </div>
              <div className="space-y-0.5">
                {templateItems.map((item) => (
                  <button
                    key={item.url}
                    onClick={() => handleNavigate(item.url)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-foreground rounded-lg hover:bg-indigo-600 hover:text-white transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <LayoutTemplate className="w-4 h-4 text-purple-500 group-hover:text-white" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-white/80">
                      {item.subtitle}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div>
            <div className="px-3 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Actions & Preferences
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => {
                  setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-foreground rounded-lg hover:bg-muted transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  {resolvedTheme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-400" />}
                  <span>Toggle {resolvedTheme === 'dark' ? 'Light' : 'Dark'} Mode</span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">Current: {resolvedTheme}</span>
              </button>
              <a
                href={profileData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-foreground rounded-lg hover:bg-muted transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  <span>Open GitHub Profile</span>
                </div>
                <span className="text-xs text-muted-foreground">External</span>
              </a>
              <a
                href="/vickyrana_resume_fe_new.pdf"
                download="vickyrana_resume_fe_new.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-foreground rounded-lg hover:bg-muted transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  <span>Download Curriculum Vitae (PDF)</span>
                </div>
                <span className="text-xs text-muted-foreground">PDF</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/20 dark:bg-white/5 border-t border-border/80 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Use</span>
            <kbd className="font-mono bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded border border-white/20">↑</kbd>
            <kbd className="font-mono bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded border border-white/20">↓</kbd>
            <span>to navigate</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Press</span>
            <kbd className="font-mono bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded border border-white/20">ESC</kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
