"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { QRCard } from '@/components/cards/QRCard';
import { AIStatusBadge } from '@/components/cards/AIStatusBadge';
import { UploadDropzone } from '@/components/upload/UploadDropzone';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { LoadingState } from '@/components/ui/LoadingState';
import { api } from '@/services/api';
import { Event, Photo } from '@/types';
import { ArrowLeft, ExternalLink, ImagePlus, Upload, Settings } from 'lucide-react';
import Link from 'next/link';

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const [eventData, photosData] = await Promise.all([
          api.events.get(id as string),
          api.photos.match(new File([], 'dummy')) // Using match to get mock photos for now
        ]);
        if (eventData) setEvent(eventData);
        setPhotos(photosData);
      } catch (error) {
        console.error('Failed to load event:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (isLoading) return <DashboardLayout><LoadingState message="Loading event workspace..." /></DashboardLayout>;
  if (!event) return <DashboardLayout><div className="text-center py-20 text-foreground">Event not found</div></DashboardLayout>;

  const guestUrl = typeof window !== 'undefined' ? `${window.location.origin}/event/${event.slug}` : '';

  return (
    <DashboardLayout>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/events">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{event.title}</h1>
            <Badge variant="outline" className="border-primary/20 text-primary bg-primary/[0.04] text-[10px] uppercase font-bold tracking-widest px-2 py-0.5">
              {event.type}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1">{event.date} • {event.photoCount} Photos</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/event/${event.slug}`} target="_blank">
            <Button variant="outline">
              <ExternalLink className="w-4 h-4 mr-2" />
              Guest View
            </Button>
          </Link>
          <Button variant="premium">Publish Gallery</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Banner */}
          <div className="relative h-64 rounded-2xl overflow-hidden border border-border group shadow-lg">
            <div className="absolute inset-0 bg-black/45 z-10 transition-opacity group-hover:opacity-60" />
            <img src={event.coverImage} alt="Cover" className="w-full h-full object-cover" />
            <Button variant="glass" className="absolute top-4 right-4 z-20 text-xs">
              <ImagePlus className="w-3.5 h-3.5 mr-2" />
              Change Cover
            </Button>
          </div>

          {/* Quick Upload */}
          <div className="bg-secondary/45 border border-border rounded-2xl p-6 shadow-xl backdrop-blur-3xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Upload className="w-4.5 h-4.5 text-primary" />
                Add Photos
              </h3>
              <AIStatusBadge status="complete" matches={event.matchedCount} />
            </div>
            <UploadDropzone />
          </div>

          {/* Gallery Preview */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Gallery Preview</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <GalleryGrid photos={photos.slice(0, 8)} />
          </div>
        </div>

        <div className="space-y-6">
          <QRCard url={guestUrl} eventName={event.title} />
          
          <div className="bg-secondary/45 border border-border rounded-2xl p-6 shadow-xl backdrop-blur-3xl">
            <h3 className="font-semibold mb-4">Event Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Visibility</span>
                <Badge variant={event.visibility === 'Public' ? 'success' : 'secondary'}>
                  {event.visibility}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="text-sm font-medium text-foreground">{event.status}</span>
              </div>
              <Button variant="outline" className="w-full mt-2">
                <Settings className="w-4 h-4 mr-2" />
                Manage Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
