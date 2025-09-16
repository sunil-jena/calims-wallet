'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark';

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = React.useState<Theme>('light');

  // On mount, sync with localStorage or system
  React.useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial: Theme = stored ?? (prefersDark ? 'dark' : 'light');

    setTheme(initial);
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(initial);
  }, []);

  // Apply & persist whenever theme changes
  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}
      className={cn(
        'w-9 h-9 inline-flex items-center justify-center  transition-colors',
        'text-foreground/70 hover:text-foreground cursor-pointer ',
        className
      )}
    >
      {theme === 'light' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
