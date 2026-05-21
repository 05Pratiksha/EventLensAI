"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/utils';
import { 
  Camera, 
  LayoutDashboard, 
  CalendarDays, 
  Image as ImageIcon, 
  Settings,
  LogOut,
  X
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Events', href: '/events', icon: CalendarDays },
  { name: 'Media', href: '/upload', icon: ImageIcon },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/60 backdrop-blur-xs z-30 md:hidden cursor-pointer"
          onClick={onClose}
        />
      )}

      <div className={cn(
        "w-64 h-screen fixed top-0 left-0 border-r border-border bg-secondary/85 backdrop-blur-xl flex flex-col z-40 transition-transform duration-300 md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2 text-foreground" onClick={onClose}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#E5C158] to-[#A38A4D] flex items-center justify-center shadow-lg shadow-primary/10">
              <Camera className="w-4.5 h-4.5 text-[#060608] dark:text-background" />
            </div>
            <span className="font-bold text-lg tracking-tight">EventLens <span className="text-primary font-medium">AI</span></span>
          </Link>

          {/* Close button on mobile */}
          {onClose && (
            <button 
              onClick={onClose}
              className="md:hidden p-1.5 rounded-lg text-muted-foreground hover:bg-foreground/5 hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex-1 py-6 px-4 flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden group",
                  isActive 
                    ? "bg-primary/[0.04] text-primary border-l-2 border-primary/70 shadow-[inset_0_1px_1px_rgba(229,193,88,0.03)]" 
                    : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                )}
              >
                <item.icon className={cn("w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-105", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-border">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-foreground/5 hover:text-foreground w-full transition-all">
            <LogOut className="w-5 h-5" />
            Logout
          </Link>
        </div>
      </div>
    </>
  );
}

