"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { LoadingState } from '@/components/ui/LoadingState';
import { api } from '@/services/api';
import { Photo, Event } from '@/types';
import { ArrowLeft, Download, CheckCircle2, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Suspense } from 'react';

function MatchesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventSlug = searchParams.get('event');
  
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      if (eventSlug) {
        const eventData = await api.events.get(eventSlug);
        if (eventData) setEvent(eventData);
      }
      
      // Simulate AI scan delay
      setTimeout(async () => {
        const matches = await api.photos.match(new File([], 'dummy'));
        setPhotos(matches);
        setIsScanning(false);
      }, 3000);
    };
    
    fetchMatches();
  }, [eventSlug]);

  if (isScanning) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)_0%,_transparent_40%)] opacity-[0.05] pointer-events-none" />
        
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="relative mb-8"
        >
          <div className="w-24 h-24 rounded-full border-4 border-blue-500/30 flex items-center justify-center relative z-10 bg-background/50 backdrop-blur-md">
            <div className="w-20 h-20 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
          </div>
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
        </motion.div>
        
        <h2 className="text-2xl font-bold mb-2">Scanning Gallery</h2>
        <p className="text-muted-foreground animate-pulse text-center max-w-sm">
          Our AI neural engine is analyzing thousands of photos to find your perfect matches...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-bold">{event?.title || 'Your Matches'}</h1>
            <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Found {photos.length} photos
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="md:hidden">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="premium" className="hidden md:flex">
            <Download className="w-4 h-4 mr-2" />
            Download All
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="mb-8 p-6 glass rounded-2xl border-emerald-500/20 bg-emerald-500/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold mb-1">We found your memories!</h2>
            <p className="text-sm text-muted-foreground">Select individual photos to download or grab them all at once.</p>
          </div>
          <Button variant="outline" className="shrink-0 bg-white/5">
            <Share2 className="w-4 h-4 mr-2" />
            Share Gallery Link
          </Button>
        </div>

        <GalleryGrid photos={photos} selectable />
      </div>
    </div>
  );
}

export default function MatchesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <LoadingState />
      </div>
    }>
      <MatchesPageContent />
    </Suspense>
  );
}
