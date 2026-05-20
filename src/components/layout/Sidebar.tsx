import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/utils';
import { 
  Camera, 
  LayoutDashboard, 
  CalendarDays, 
  Image as ImageIcon, 
  Settings,
  LogOut
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Events', href: '/events', icon: CalendarDays },
  { name: 'Media', href: '/upload', icon: ImageIcon },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen fixed top-0 left-0 border-r border-white/5 bg-background/30 backdrop-blur-xl flex flex-col z-40 hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 text-white">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#E5C158] to-[#A38A4D] flex items-center justify-center shadow-lg shadow-primary/10">
            <Camera className="w-4.5 h-4.5 text-[#060608]" />
          </div>
          <span className="font-bold text-lg tracking-tight">EventLens <span className="text-primary font-medium">AI</span></span>
        </Link>
      </div>

      <div className="flex-1 py-6 px-4 flex flex-col gap-1.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3.5 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden group",
                isActive 
                  ? "bg-primary/[0.04] text-primary border-l-2 border-primary/70 shadow-[inset_0_1px_1px_rgba(229,193,88,0.03)]" 
                  : "text-muted-foreground hover:bg-white/[0.02] hover:text-white"
              )}
            >
              <item.icon className={cn("w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-105", isActive ? "text-primary" : "text-muted-foreground group-hover:text-white")} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/5">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-white w-full transition-all">
          <LogOut className="w-5 h-5" />
          Logout
        </Link>
      </div>
    </div>
  );
}
