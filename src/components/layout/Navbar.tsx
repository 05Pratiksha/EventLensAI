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
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />
        </Button>
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">Studio Admin</p>
            <p className="text-xs text-muted-foreground">Pro Plan</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-sm shadow-inner border border-white/20">
            SA
          </div>
        </div>
      </div>
    </div>
  );
}
