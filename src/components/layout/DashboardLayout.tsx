import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { GradientBackground } from '../ui/GradientBackground';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <GradientBackground />
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col relative z-10">
        <Navbar />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
