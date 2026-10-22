'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const ThemeToggleButton3 = ({
  className = '',
}: {
  className?: string;
}) => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : true;

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      className={cn(
        'w-9 h-9 p-1.5 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 liquid-btn-secondary relative overflow-hidden',
        isDark ? 'text-yellow-400 hover:text-yellow-300' : 'text-amber-600 hover:text-amber-500',
        className
      )}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Current: ${isDark ? 'Dark' : 'Light'} mode. Click to toggle.`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="currentColor"
        strokeLinecap="round"
        viewBox="0 0 32 32"
        className="w-5 h-5 shrink-0 overflow-visible"
      >
        <clipPath id="skiper-btn-3">
          <motion.path
            animate={{ y: isDark ? 14 : 0, x: isDark ? -11 : 0 }}
            transition={{ ease: 'easeInOut', duration: 0.35 }}
            d="M0-11h25a1 1 0 0017 13v30H0Z"
          />
        </clipPath>
        <g clipPath="url(#skiper-btn-3)">
          <motion.circle
            animate={{ r: isDark ? 10 : 8 }}
            transition={{ ease: 'easeInOut', duration: 0.35 }}
            cx="16"
            cy="16"
          />
          <motion.g
            animate={{
              scale: isDark ? 0.5 : 1,
              opacity: isDark ? 0 : 1,
            }}
            transition={{ ease: 'easeInOut', duration: 0.35 }}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M18.3 3.2c0 1.3-1 2.3-2.3 2.3s-2.3-1-2.3-2.3S14.7.9 16 .9s2.3 1 2.3 2.3zm-4.6 25.6c0-1.3 1-2.3 2.3-2.3s2.3 1 2.3 2.3-1 2.3-2.3 2.3-2.3-1-2.3-2.3zm15.1-10.5c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zM3.2 13.7c1.3 0 2.3 1 2.3 2.3s-1 2.3-2.3 2.3S.9 17.3.9 16s1-2.3 2.3-2.3zm5.8-7C9 7.9 7.9 9 6.7 9S4.4 8 4.4 6.7s1-2.3 2.3-2.3S9 5.4 9 6.7zm16.3 21c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zm2.4-21c0 1.3-1 2.3-2.3 2.3S23 7.9 23 6.7s1-2.3 2.3-2.3 2.4 1 2.4 2.3zM6.7 23C8 23 9 24 9 25.3s-1 2.3-2.3 2.3-2.3-1-2.3-2.3z" />
          </motion.g>
        </g>
      </svg>
    </button>
  );
};

export const ThemeToggle = ThemeToggleButton3;
