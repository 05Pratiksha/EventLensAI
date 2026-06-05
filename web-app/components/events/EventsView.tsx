"use client";

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { EventCard } from '@/components/ui/EventCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SearchFilterBar } from '@/components/ui/SearchFilterBar';
import { Button } from '@/components/ui/Button';
import { LoadingState } from '@/components/ui/LoadingState';
import { EmptyState } from '@/components/ui/EmptyState';
import { Badge } from '@/components/ui/Badge';
import { Plus, CalendarX2, Grid, List, ArrowRight, Calendar, Image as ImageIcon, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/services/api';
import { Event } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/utils';

export function EventsView() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Layout mode state
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await api.events.list();
        setEvents(data);
        setFilteredEvents(data);
      } catch (error) {
        console.error('Failed to load events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Combined search and category filtering
  useEffect(() => {
    let result = [...events];

    // 1. Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(e => e.type.toLowerCase() === selectedCategory.toLowerCase());
    }

    // 2. Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(e => 
        e.title.toLowerCase().includes(query) || 
        e.type.toLowerCase().includes(query) ||
        (e.description && e.description.toLowerCase().includes(query))
      );
    }

    setFilteredEvents(result);
  }, [selectedCategory, searchQuery, events]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const getStatusBadge = (status: Event['status']) => {
    switch (status) {
      case 'Published': return <Badge variant="success">Published</Badge>;
      case 'Processing': return <Badge variant="processing" className="animate-pulse">Processing</Badge>;
      case 'Draft': return <Badge variant="secondary">Draft</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <SectionHeader 
        title="Events" 
        description="Manage all your studio's events, galleries, and AI matches."
        action={
          <Link href="/events/create">
            <Button variant="premium">
              <Plus className="w-4 h-4 mr-2" />
              New Event
            </Button>
          </Link>
        }
      />

      {/* Interactive Category Filter Tabs + Search row */}
      <div className="space-y-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-secondary/40 border border-border/60 max-w-full overflow-x-auto">
            {['All', 'Wedding', 'Corporate', 'Conference'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer",
                  selectedCategory === cat
                    ? "bg-primary text-[#060608] shadow-[0_2px_8px_rgba(229,193,88,0.15)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.03]"
                )}
              >
                {cat}s
              </button>
            ))}
          </div>

          {/* Grid/List View Toggles */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-secondary/40 border border-border/60 shrink-0 self-end md:self-auto">
            <button
              onClick={() => setLayoutMode('grid')}
              className={cn(
                "p-1.5 rounded-lg transition-all cursor-pointer",
                layoutMode === 'grid' ? "bg-foreground/5 text-primary" : "text-muted-foreground hover:text-foreground"
              )}
              title="Grid view"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayoutMode('list')}
              className={cn(
                "p-1.5 rounded-lg transition-all cursor-pointer",
                layoutMode === 'list' ? "bg-foreground/5 text-primary" : "text-muted-foreground hover:text-foreground"
              )}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        <SearchFilterBar 
          placeholder="Search events by name or type..." 
          onSearch={handleSearch}
        />
      </div>

      {isLoading ? (
        <LoadingState message="Loading your events..." />
      ) : filteredEvents.length === 0 ? (
        <div className="mt-12">
          <EmptyState 
            icon={CalendarX2}
            title="No events found"
            description="We couldn't find any events matching your current search or filter criteria."
            actionLabel="Clear filters"
            onAction={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
          />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {layoutMode === 'grid' ? (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredEvents.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4"
            >
              {filteredEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="w-full"
                >
                  <Link href={`/events/${event.id}`}>
                    <div className="glass-luxury p-4 rounded-xl border border-border/40 hover:border-primary/20 transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer group bg-secondary/20 hover:bg-secondary/40">
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-border/60 shrink-0 relative">
                          <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h4 className="font-bold text-base text-foreground group-hover:text-primary transition-colors leading-tight">{event.title}</h4>
                            <Badge variant="outline" className="bg-black/40 border-white/5 text-[9px] font-semibold text-zinc-300 py-0 px-1.5">{event.type}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {event.date}
                            </span>
                            <span>|</span>
                            <span className="flex items-center gap-1">
                              <ImageIcon className="w-3.5 h-3.5 animate-pulse" />
                              {event.photoCount.toLocaleString()} Photos
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-border/40 pt-3 sm:pt-0 shrink-0">
                        <div className="flex flex-col text-left sm:text-right">
                          <span className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-1 sm:justify-end">
                            <Sparkles className="w-2.5 h-2.5 text-primary" />
                            Matches
                          </span>
                          <span className="font-mono text-sm font-black text-foreground">{event.matchedCount ? event.matchedCount.toLocaleString() : '0'}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {getStatusBadge(event.status)}
                          <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center border border-border group-hover:border-primary/20 transition-colors">
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </DashboardLayout>
  );
}
