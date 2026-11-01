'use client';

import * as React from 'react';
import { 
  SiNextdotjs, 
  SiReact, 
  SiTypescript, 
  SiJavascript, 
  SiTailwindcss, 
  SiHtml5, 
  SiBootstrap, 
  SiNestjs, 
  SiSpringboot, 
  SiMysql, 
  SiMongodb, 
  SiGit, 
  SiGithub, 
  SiDocker, 
  SiRedis, 
  SiPostgresql, 
  SiNodedotjs, 
  SiExpress, 
  SiPrisma, 
  SiPython, 
  SiPostman, 
  SiVercel, 
  SiFigma, 
  SiJsonwebtokens, 
  SiVite,
  SiLinux,
  SiGraphql,
  SiGooglechrome
} from 'react-icons/si';
import { FaJava, FaCss3Alt, FaDatabase, FaServer, FaCode } from 'react-icons/fa6';
import { TbApi, TbDevices, TbBrandVscode } from 'react-icons/tb';
import { Cpu, Terminal, Layers, Globe, Zap, Volume2, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TechMeta {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  bg: string;
  border: string;
  hoverGlow: string;
}

export function getTechMeta(rawName: string): TechMeta {
  const norm = rawName.toLowerCase().trim();

  // Next.js
  if (norm.includes('next')) {
    return {
      name: 'Next.js',
      icon: SiNextdotjs,
      color: 'text-zinc-900 dark:text-zinc-100',
      bg: 'bg-gray-500 dark:bg-zinc-400/10',
      border: 'border-zinc-300 dark:border-zinc-700',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(255,255,255,0.25)]',
    };
  }

  // React
  if (norm.includes('react') && !norm.includes('hook form')) {
    return {
      name: 'React',
      icon: SiReact,
      color: 'text-[#61DAFB]',
      bg: 'bg-[#61DAFB]/10',
      border: 'border-[#61DAFB]/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(97,218,251,0.3)]',
    };
  }

  // TypeScript
  if (norm.includes('typescript') || norm === 'ts') {
    return {
      name: 'TypeScript',
      icon: SiTypescript,
      color: 'text-[#3178C6]',
      bg: 'bg-[#3178C6]/10',
      border: 'border-[#3178C6]/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(49,120,198,0.3)]',
    };
  }

  // JavaScript
  if (norm.includes('javascript') || norm === 'js' || norm.includes('es6')) {
    return {
      name: 'JavaScript',
      icon: SiJavascript,
      color: 'text-[#F7DF1E]',
      bg: 'bg-[#F7DF1E]/10',
      border: 'border-[#F7DF1E]/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(247,223,30,0.3)]',
    };
  }

  // Tailwind
  if (norm.includes('tailwind')) {
    return {
      name: 'Tailwind CSS',
      icon: SiTailwindcss,
      color: 'text-[#06B6D4]',
      bg: 'bg-[#06B6D4]/10',
      border: 'border-[#06B6D4]/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]',
    };
  }

  // HTML / CSS
  if (norm.includes('html') && norm.includes('css')) {
    return {
      name: 'HTML5 & CSS3',
      icon: SiHtml5,
      color: 'text-[#E34F26]',
      bg: 'bg-[#E34F26]/10',
      border: 'border-[#E34F26]/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(227,79,38,0.3)]',
    };
  }
  if (norm.includes('html') || norm.includes('canvas')) {
    return {
      name: 'HTML5',
      icon: SiHtml5,
      color: 'text-[#E34F26]',
      bg: 'bg-[#E34F26]/10',
      border: 'border-[#E34F26]/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(227,79,38,0.3)]',
    };
  }
  if (norm.includes('css')) {
    return {
      name: 'CSS3',
      icon: FaCss3Alt,
      color: 'text-[#1572B6]',
      bg: 'bg-[#1572B6]/10',
      border: 'border-[#1572B6]/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(21,114,182,0.3)]',
    };
  }

  // Bootstrap
  if (norm.includes('bootstrap')) {
    return {
      name: 'Bootstrap',
      icon: SiBootstrap,
      color: 'text-[#7952B3]',
      bg: 'bg-[#7952B3]/10',
      border: 'border-[#7952B3]/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(121,82,179,0.3)]',
    };
  }

  // Java
  if (norm.includes('java') && !norm.includes('script')) {
    return {
      name: 'Java',
      icon: FaJava,
      color: 'text-[#EA2D2E]',
      bg: 'bg-[#EA2D2E]/10',
      border: 'border-[#EA2D2E]/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(234,45,46,0.3)]',
    };
  }

  // Spring Boot
  if (norm.includes('spring')) {
    return {
      name: 'Spring Boot',
      icon: SiSpringboot,
      color: 'text-[#6DB33F]',
      bg: 'bg-[#6DB33F]/10',
      border: 'border-[#6DB33F]/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(109,179,63,0.3)]',
    };
  }

  // NestJS
  if (norm.includes('nest')) {
    return {
      name: 'NestJS',
      icon: SiNestjs,
      color: 'text-[#E0234E]',
      bg: 'bg-[#E0234E]/10',
      border: 'border-[#E0234E]/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(224,35,78,0.3)]',
    };
  }

  // MySQL
  if (norm.includes('mysql')) {
    return {
      name: 'MySQL',
      icon: SiMysql,
      color: 'text-[#4479A1]',
      bg: 'bg-[#4479A1]/10',
      border: 'border-[#4479A1]/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(68,121,161,0.3)]',
    };
  }

  // MongoDB / Atlas
  if (norm.includes('mongo')) {
    return {
      name: 'MongoDB',
      icon: SiMongodb,
      color: 'text-[#47A248]',
      bg: 'bg-[#47A248]/10',
      border: 'border-[#47A248]/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(71,162,72,0.3)]',
    };
  }

  // PostgreSQL
  if (norm.includes('postgres')) {
    return {
      name: 'PostgreSQL',
      icon: SiPostgresql,
      color: 'text-[#4169E1]',
      bg: 'bg-[#4169E1]/10',
      border: 'border-[#4169E1]/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(65,105,225,0.3)]',
    };
  }

  // Redis
  if (norm.includes('redis')) {
    return {
      name: 'Redis',
      icon: SiRedis,
      color: 'text-[#DC382D]',
      bg: 'bg-[#DC382D]/10',
      border: 'border-[#DC382D]/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(220,56,45,0.3)]',
    };
  }

  // Node.js
  if (norm.includes('node')) {
    return {
      name: 'Node.js',
      icon: SiNodedotjs,
      color: 'text-[#5FA04E]',
      bg: 'bg-[#5FA04E]/10',
      border: 'border-[#5FA04E]/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(95,160,78,0.3)]',
    };
  }

  // Express
  if (norm.includes('express')) {
    return {
      name: 'Express',
      icon: SiExpress,
      color: 'text-zinc-700 dark:text-zinc-300',
      bg: 'bg-zinc-500/10',
      border: 'border-zinc-500/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(150,150,150,0.3)]',
    };
  }

  // Prisma
  if (norm.includes('prisma')) {
    return {
      name: 'Prisma',
      icon: SiPrisma,
      color: 'text-[#2D3748] dark:text-[#5A67D8]',
      bg: 'bg-[#5A67D8]/10',
      border: 'border-[#5A67D8]/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(90,103,216,0.3)]',
    };
  }

  // Git / GitHub
  if (norm.includes('github')) {
    return {
      name: 'GitHub',
      icon: SiGithub,
      color: 'text-zinc-800 dark:text-zinc-200',
      bg: 'bg-zinc-800/10 dark:bg-zinc-200/10',
      border: 'border-zinc-700/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]',
    };
  }
  if (norm.includes('git')) {
    return {
      name: 'Git',
      icon: SiGit,
      color: 'text-[#F05032]',
      bg: 'bg-[#F05032]/10',
      border: 'border-[#F05032]/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(240,80,50,0.3)]',
    };
  }

  // Docker
  if (norm.includes('docker')) {
    return {
      name: 'Docker',
      icon: SiDocker,
      color: 'text-[#2496ED]',
      bg: 'bg-[#2496ED]/10',
      border: 'border-[#2496ED]/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(36,150,237,0.3)]',
    };
  }

  // Python
  if (norm.includes('python')) {
    return {
      name: 'Python',
      icon: SiPython,
      color: 'text-[#3776AB]',
      bg: 'bg-[#3776AB]/10',
      border: 'border-[#3776AB]/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(55,118,171,0.3)]',
    };
  }

  // REST API / APIs / JSON
  if (norm.includes('api') || norm.includes('rest') || norm.includes('json')) {
    return {
      name: rawName,
      icon: TbApi,
      color: 'text-indigo-500 dark:text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]',
    };
  }

  // JWT
  if (norm.includes('jwt')) {
    return {
      name: 'JWT',
      icon: SiJsonwebtokens,
      color: 'text-pink-500',
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]',
    };
  }

  // Vite
  if (norm.includes('vite')) {
    return {
      name: 'Vite',
      icon: SiVite,
      color: 'text-[#646CFF]',
      bg: 'bg-[#646CFF]/10',
      border: 'border-[#646CFF]/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(100,108,255,0.3)]',
    };
  }

  // Postman
  if (norm.includes('postman')) {
    return {
      name: 'Postman',
      icon: SiPostman,
      color: 'text-[#FF6C37]',
      bg: 'bg-[#FF6C37]/10',
      border: 'border-[#FF6C37]/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(255,108,55,0.3)]',
    };
  }

  // Vercel
  if (norm.includes('vercel')) {
    return {
      name: 'Vercel',
      icon: SiVercel,
      color: 'text-zinc-900 dark:text-zinc-100',
      bg: 'bg-zinc-500/10',
      border: 'border-zinc-500/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(255,255,255,0.25)]',
    };
  }

  // Figma
  if (norm.includes('figma')) {
    return {
      name: 'Figma',
      icon: SiFigma,
      color: 'text-[#F24E1E]',
      bg: 'bg-[#F24E1E]/10',
      border: 'border-[#F24E1E]/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(242,78,30,0.3)]',
    };
  }

  // Chrome DevTools
  if (norm.includes('chrome') || norm.includes('devtools') || norm.includes('tools')) {
    return {
      name: 'Chrome DevTools',
      icon: SiGooglechrome,
      color: 'text-[#4285F4]',
      bg: 'bg-[#4285F4]/10',
      border: 'border-[#4285F4]/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(66,133,244,0.3)]',
    };
  }

  // Responsive design
  if (norm.includes('responsive')) {
    return {
      name: 'Responsive Design',
      icon: TbDevices,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]',
    };
  }

  // Performance / SEO
  if (norm.includes('performance') || norm.includes('seo') || norm.includes('speed')) {
    return {
      name: 'SEO & Performance',
      icon: Zap,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]',
    };
  }

  // Web Audio
  if (norm.includes('audio')) {
    return {
      name: 'Web Audio API',
      icon: Volume2,
      color: 'text-violet-500',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/25',
      hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]',
    };
  }

  // Default fallback icon
  return {
    name: rawName,
    icon: FaCode,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    hoverGlow: 'group-hover:shadow-[0_0_15px_rgba(99,102,241,0.25)]',
  };
}

export interface TechIconProps {
  name: string;
  className?: string;
  iconClassName?: string;
  size?: number;
  showTooltip?: boolean;
}

export function TechIcon({
  name,
  className = '',
  iconClassName = '',
  size = 18,
  showTooltip = false,
}: TechIconProps) {
  const meta = getTechMeta(name);
  const IconComponent = meta.icon;

  return (
    <span
      className={cn(
        'group relative inline-flex items-center justify-center transition-transform hover:scale-110 select-none',
        className
      )}
      title={meta.name}
    >
      <IconComponent
        className={cn(meta.color, 'shrink-0 transition-all duration-200', iconClassName)}
        style={{ width: size, height: size }}
      />
      {showTooltip && (
        <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 px-2 py-0.5 rounded-md text-[10px] font-mono whitespace-nowrap bg-zinc-900/90 text-white dark:bg-zinc-100/95 dark:text-zinc-900 shadow-md">
          {meta.name}
        </span>
      )}
    </span>
  );
}

export interface TechBadgeProps {
  name: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showTooltip?: boolean;
}

export function TechBadge({
  name,
  iconOnly = false,
  size = 'sm',
  className = '',
  showTooltip = true,
}: TechBadgeProps) {
  const meta = getTechMeta(name);
  const IconComponent = meta.icon;

  const iconSizes = {
    sm: 13,
    md: 16,
    lg: 20,
  };

  if (iconOnly) {
    const padClasses = {
      sm: 'w-7 h-7',
      md: 'w-8 h-8',
      lg: 'w-10 h-10',
    };

    return (
      <span
        className={cn(
          'group relative inline-flex items-center justify-center rounded-xl border backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 select-none',
          meta.bg,
          meta.border,
          meta.hoverGlow,
          padClasses[size],
          className
        )}
        title={meta.name}
      >
        <IconComponent
          className={cn(meta.color, 'shrink-0 transition-transform group-hover:scale-110')}
          style={{ width: iconSizes[size], height: iconSizes[size] }}
        />
        {showTooltip && (
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-40 px-2 py-1 rounded-lg text-[10px] font-mono whitespace-nowrap bg-zinc-950 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-950 shadow-xl border border-white/20 scale-95 group-hover:scale-100">
            {meta.name}
          </span>
        )}
      </span>
    );
  }

  const badgePad = {
    sm: 'px-2.5 py-1 text-[11px] gap-1.5',
    md: 'px-3 py-1.5 text-xs gap-2',
    lg: 'px-3.5 py-2 text-sm gap-2.5',
  };

  return (
    <span
      className={cn(
        'group inline-flex items-center rounded-xl border backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm font-mono select-none',
        meta.bg,
        meta.border,
        meta.hoverGlow,
        badgePad[size],
        className
      )}
      title={meta.name}
    >
      <IconComponent
        className={cn(meta.color, 'shrink-0 transition-transform group-hover:scale-110')}
        style={{ width: iconSizes[size], height: iconSizes[size] }}
      />
      <span className="text-foreground/90 font-medium whitespace-nowrap">
        {name}
      </span>
    </span>
  );
}
