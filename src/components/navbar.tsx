'use client';

import { ElectricLogo } from '@/components/ui/ElectricLogo';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';
import { cn } from '@/lib/utils';
import {
  Menu,
  X,
  Search,
  FileText,
  Mail
} from 'lucide-react';

interface NavbarProps {
  onOpenCommand?: () => void;
}

export function Navbar({ onOpenCommand }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Enable liquid glass background styling after leaving top 0
      setScrolled(currentScrollY > 10);

      // Always keep visible near the top of the page
      if (currentScrollY <= 60) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Small threshold to avoid twitching on micro movements
      const delta = currentScrollY - lastScrollY.current;
      if (Math.abs(delta) < 6) return;

      // Do not hide navbar if mobile drawer is currently open
      if (mobileMenuOpen) {
        setIsVisible(true);
        return;
      }

      // Scrolling down -> hide navbar (slides up)
      // Scrolling up -> reveal navbar (slides down)
      if (delta > 0) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Close mobile menu on page change
  React.useEffect(() => {
    setMobileMenuOpen(false);
    setIsVisible(true);
    setScrolled(window.scrollY > 10);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    {
      name: 'Games',
      href: '/games',
      badge: 'Arcade'
    },
    { name: 'Templates', href: '/templates' },
    { name: 'Experience', href: '/experience' },
    { name: 'Achievements', href: '/achievements' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out',
        isVisible ? 'translate-y-0' : '-translate-y-full',
        scrolled || mobileMenuOpen
          ? 'liquid-glass-nav'
          : 'bg-transparent border-b border-transparent shadow-none'
      )}
    >



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo with Electric Animation */}
          <Link
            href="/"
            aria-label="VickyRana Home"
            className="group relative inline-flex items-center h-10 w-36 sm:h-12 sm:w-48 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-transform hover:scale-[1.02]"
          >
            <ElectricLogo
              scale={0.92}
              glow={1.4}
              intensity={1.2}
              thickness={1.5}
              arcs={2}
              speed={2.2}
              color="#e0f7ff"
              glowColor="#00d4ff"
              className="w-full h-full pointer-events-none"
            />
          </Link>



          {/* Desktop Navigation Links (Simple Words, No BG, No Border) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-all duration-200 flex items-center gap-1.5 py-1 select-none relative',
                    isActive
                      ? 'text-foreground font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[9px] font-bold text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 dark:bg-indigo-400/10 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>


          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Command Menu Trigger */}
            <button
              onClick={onOpenCommand}
              type="button"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground liquid-btn-secondary rounded-xl hover:text-foreground transition-all duration-200"
              aria-label="Open command palette"
              title="Search and quick jump (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-indigo-500" />
              <span className="hidden md:inline font-medium">Quick Jump</span>
              <kbd className="font-mono text-[10px] bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded border border-white/20 dark:border-white/10">
                ⌘K
              </kbd>
            </button>

            {/* Resume button */}
            <a
              href="/vickyrana_resume_fe_new.pdf"
              download="vickyrana_resume_fe_new.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-foreground liquid-btn-secondary rounded-xl"
              title="Download Vicky Rana's Resume"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              <span>Resume</span>
            </a>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl liquid-btn-secondary text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Liquid Glass Surface) */}
      {mobileMenuOpen && (
        <div className="lg:hidden liquid-glass-elevated border-b border-border animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto px-4 pt-3 pb-6 space-y-2">
            {/* Mobile Command Search Trigger */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommand?.();
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm text-muted-foreground liquid-glass-subtle rounded-xl text-left"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-indigo-500" />
                <span>Search pages, projects, games...</span>
              </div>
              <kbd className="font-mono text-xs bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded border border-border">
                ⌘K
              </kbd>
            </button>

            {/* Links */}
            <div className="grid grid-cols-1 gap-1 pt-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center justify-between px-3 py-2.5 text-sm transition-colors duration-200 select-none',
                      isActive
                        ? 'text-foreground font-bold'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[10px] font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">
                        {link.badge}
                      </span>
                    )}
                  </Link>

                );
              })}
            </div>

            {/* Mobile CTAs */}
            <div className="pt-4 border-t border-border/80 flex flex-col gap-2">
              <a
                href="/vickyrana_resume_fe_new.pdf"
                download="vickyrana_resume_fe_new.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium rounded-xl liquid-btn-secondary text-foreground"
              >
                <FileText className="w-4 h-4 text-indigo-500" />
                Download Resume
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold rounded-xl liquid-btn-primary text-white"
              >
                <Mail className="w-4 h-4" />
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
