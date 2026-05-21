"use client";

import { Bell, Search, Menu } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useTheme } from '../ThemeProvider';
import { motion } from 'framer-motion';

interface NavbarProps {
  onMenuToggle?: () => void;
}

export function Navbar({ onMenuToggle }: NavbarProps) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div className="h-16 border-b border-border bg-background/50 backdrop-blur-xl sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between transition-colors duration-300">
      
      {/* Mobile Hamburger menu toggle (left side) */}
      {onMenuToggle && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onMenuToggle}
          className="md:hidden mr-2 text-muted-foreground hover:text-foreground"
        >
          <Menu className="w-5 h-5" />
        </Button>
      )}
 
      <div className="w-72 lg:w-96 hidden md:block relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input 
          placeholder="Search events, photos, or guests..." 
          className="pl-9 bg-secondary/50 border-border focus-visible:ring-1 text-sm text-foreground"
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        {/* Elegant Theme Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full hover:bg-foreground/5 text-muted-foreground hover:text-foreground"
          title={`Theme: ${theme}`}
        >
          {isDark ? (
            <motion.svg
              initial={{ rotate: -90, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              className="w-4.5 h-4.5 text-amber-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m2.828 9.9a5 5 0 117.072 0l-7.072 0z" />
            </motion.svg>
          ) : (
            <motion.svg
              initial={{ rotate: 90, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              className="w-4.5 h-4.5 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </motion.svg>
          )}
        </Button>

        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="w-4.5 h-4.5 text-muted-foreground transition-colors group-hover:text-foreground" />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(229,193,88,0.6)]" />
        </Button>
        
        <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-foreground tracking-wide">Studio Admin</p>
            <p className="text-[10px] uppercase font-bold text-primary tracking-widest">Pro Plan</p>
          </div>
          <div className="w-8.5 h-8.5 rounded-full bg-gradient-to-tr from-[#E5C158] to-[#A38A4D] flex items-center justify-center font-bold text-xs text-[#060608] dark:text-background shadow-lg border border-border transition-transform hover:scale-105 duration-300 cursor-pointer">
            SA
          </div>
        </div>
      </div>
    </div>
  );
}

