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
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#E5C158_0%,_transparent_40%)] opacity-[0.04] pointer-events-none" />
        
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="relative mb-8"
        >
          <div className="w-24 h-24 rounded-full border border-primary/20 flex items-center justify-center relative z-10 bg-secondary/40 backdrop-blur-2xl">
            <div className="w-20 h-20 rounded-full border border-primary/30 border-t-primary animate-spin" />
          </div>
          <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full" />
        </motion.div>
        
        <h2 className="text-xl font-bold mb-2 tracking-wide text-foreground uppercase">Scanning Exhibition</h2>
        <p className="text-xs text-muted-foreground animate-pulse text-center max-w-sm">
          Our biometric neural engine is analyzing portrait registers to find your matches...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 transition-colors duration-300">
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <Button variant="ghost" size="icon" className="rounded-full border border-border hover:bg-foreground/5 text-foreground" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="font-bold text-foreground text-xs sm:text-sm tracking-wide uppercase truncate max-w-[150px] sm:max-w-xs">{event?.title || 'Your Matches'}</h1>
            <p className="text-[10px] text-primary font-bold uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Found {photos.length} matches
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="md:hidden border-border hover:bg-foreground/5 text-foreground">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="premium" className="hidden md:flex h-9 text-xs font-bold px-4">
            <Download className="w-3.5 h-3.5 mr-2" />
            Download Collection
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <div className="mb-8 p-6 glass-luxury rounded-2xl border border-border/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold mb-1 text-gradient-luxury">We found your portraits.</h2>
            <p className="text-xs text-muted-foreground">Select individual pieces to download or grab your entire collection at once.</p>
          </div>
          <Button variant="outline" className="shrink-0 bg-secondary/45 border-border hover:bg-foreground/5 text-xs text-foreground">
            <Share2 className="w-3.5 h-3.5 mr-2" />
            Share Collection Link
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
