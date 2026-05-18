"use client";

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { EventCard } from '@/components/cards/EventCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SearchFilterBar } from '@/components/ui/SearchFilterBar';
import { Button } from '@/components/ui/Button';
import { LoadingState } from '@/components/ui/LoadingState';
import { EmptyState } from '@/components/ui/EmptyState';
import { Plus, CalendarX2 } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/services/api';
import { Event } from '@/types';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const filtered = events.filter(e => 
      e.title.toLowerCase().includes(lowerQuery) || 
      e.type.toLowerCase().includes(lowerQuery)
    );
    setFilteredEvents(filtered);
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

      <SearchFilterBar 
        placeholder="Search events by name or type..." 
        onSearch={handleSearch}
      />

      {isLoading ? (
        <LoadingState message="Loading your events..." />
      ) : filteredEvents.length === 0 ? (
        <div className="mt-12">
          <EmptyState 
            icon={CalendarX2}
            title="No events found"
            description="We couldn't find any events matching your current search or filter criteria."
            actionLabel="Clear filters"
            onAction={() => setFilteredEvents(events)}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEvents.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
