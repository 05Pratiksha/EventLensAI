import { Bell, Search } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export function Navbar() {
  return (
    <div className="h-16 border-b border-white/5 bg-background/50 backdrop-blur-xl sticky top-0 z-30 px-6 flex items-center justify-between">
      <div className="w-96 hidden md:block relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input 
          placeholder="Search events, photos, or guests..." 
          className="pl-9 bg-white/5 border-transparent focus-visible:ring-1"
        />
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <Button variant="ghost" size="icon" className="relative hover:text-primary">
          <Bell className="w-4.5 h-4.5 text-muted-foreground transition-colors hover:text-white" />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(229,193,88,0.6)]" />
        </Button>
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white tracking-wide">Studio Admin</p>
            <p className="text-[10px] uppercase font-bold text-primary tracking-widest">Pro Plan</p>
          </div>
          <div className="w-8.5 h-8.5 rounded-full bg-gradient-to-tr from-[#E5C158] to-[#A38A4D] flex items-center justify-center font-bold text-xs text-[#060608] shadow-lg border border-white/20 transition-transform hover:scale-105 duration-300">
            SA
          </div>
        </div>
      </div>
    </div>
  );
}
