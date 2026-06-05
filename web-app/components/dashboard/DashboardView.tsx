"use client";

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/StatCard';
import { EventCard } from '@/components/ui/EventCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Plus, ArrowRight, UploadCloud, Image as ImageIcon, Sliders } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/services/api';
import { Event } from '@/types';
import { mockStats } from '@/data/mockData';
import { motion } from 'framer-motion';
import { AIProcessingCard, AIActivityTimeline, AIActivity } from './AIProcessingComponents';

// Simulated interactive activities for the timeline
const simulatedActivities: AIActivity[] = [
  { id: 'sim_1', type: 'match', title: 'Matched selfie for Sarah (Bride)', timestamp: 'Just now', confidence: 99.8 },
  { id: 'sim_2', type: 'match', title: 'Matched selfie for James (Groom)', timestamp: '2 mins ago', confidence: 98.7 },
  { id: 'sim_3', type: 'upload', title: 'Uploaded 450 new JPG files to Sarah & James Wedding', timestamp: '15 mins ago' },
  { id: 'sim_4', type: 'publish', title: 'Published Tech Conference 2024 gallery', timestamp: '2 hours ago' },
  { id: 'sim_5', type: 'system', title: 'Initialized face-scan templates index', timestamp: '5 hours ago' }
];

export default function DashboardView() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated live AI index processing state variables
  const [aiProgress, setAiProgress] = useState(45);
  const [aiStatus, setAiStatus] = useState<'scanning' | 'complete'>('scanning');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const recentEvents = await api.events.list();
        setEvents(recentEvents.slice(0, 3));
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Interval timer simulating real-time biometric catalog mapping
  useEffect(() => {
    const interval = setInterval(() => {
      setAiProgress((prev) => {
        if (prev >= 100) {
          setAiStatus('complete');
          // Hold the complete state, then recycle back to scanning
          setTimeout(() => {
            setAiProgress(0);
            setAiStatus('scanning');
          }, 6000);
          return 100;
        }
        return prev + 5;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <SectionHeader 
        title="Dashboard overview" 
        description="Welcome back! Here's what's happening with your studio today."
        action={
          <Link href="/events/create">
            <Button variant="premium">
              <Plus className="w-4 h-4 mr-2" />
              New Event
            </Button>
          </Link>
        }
      />

      {/* Analytics Statistics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mockStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <StatCard stat={stat} />
          </motion.div>
        ))}
      </div>

      {/* Quick Actions Panel */}
      <div className="mb-10">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Quick Studio Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Create New Event", desc: "Initialize a new secure biometric index directory.", href: "/events/create", icon: Plus, color: "text-[#E5C158]", bg: "bg-[#E5C158]/10" },
            { title: "Upload Event Photos", desc: "Import raw digital assets into existing folders.", href: "/upload", icon: UploadCloud, color: "text-[#F7E7CE] dark:text-[#F7E7CE]", bg: "bg-[#F7E7CE]/10" },
            { title: "Global Studio Gallery", desc: "Search and inspect identified faces across albums.", href: "/gallery", icon: ImageIcon, color: "text-zinc-500 dark:text-zinc-300", bg: "bg-zinc-500/10 dark:bg-zinc-300/10" },
            { title: "Branding Settings", desc: "Configure custom domains and white label styles.", href: "/settings", icon: Sliders, color: "text-[#A38A4D]", bg: "bg-[#A38A4D]/10" }
          ].map((action, aIdx) => (
            <Link href={action.href} key={aIdx}>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                className="glass-luxury p-5 rounded-2xl border border-border/40 hover:border-primary/20 transition-all duration-300 text-left h-full flex flex-col justify-between cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.bg}`}>
                    <action.icon className={`w-5 h-5 ${action.color}`} />
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-0.5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground mb-1">{action.title}</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{action.desc}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Events */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Recent Events</h3>
            <Link href="/events">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                View all
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map(i => (
                <div key={i} className="h-80 rounded-xl bg-secondary/80 animate-pulse border border-border" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Simulated Live Neural Processing Center */}
        <div className="space-y-6">
          <AIProcessingCard 
            eventName="Sarah & James Wedding"
            totalPhotos={850}
            matchedFaces={242}
            status={aiStatus}
            progressPercent={aiProgress}
          />

          <Card className="bg-secondary/35 border-border/80">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-bold tracking-wide uppercase">AI Biometric Activity Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <AIActivityTimeline activities={simulatedActivities} />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
