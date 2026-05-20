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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#E5C158_0%,_transparent_40%)] opacity-[0.04] pointer-events-none" />
        
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="relative mb-8"
        >
          <div className="w-24 h-24 rounded-full border border-primary/20 flex items-center justify-center relative z-10 bg-zinc-950/40 backdrop-blur-2xl">
            <div className="w-20 h-20 rounded-full border border-primary/30 border-t-primary animate-spin" />
          </div>
          <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full" />
        </motion.div>
        
        <h2 className="text-xl font-bold mb-2 tracking-wide text-white uppercase">Scanning Exhibition</h2>
        <p className="text-xs text-zinc-400 animate-pulse text-center max-w-sm">
          Our biometric neural engine is analyzing portrait registers to find your matches...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-[#060608]/80 backdrop-blur-xl border-b border-white/[0.04] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full border border-white/5 hover:bg-white/5 text-zinc-300" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="font-bold text-white text-sm tracking-wide uppercase">{event?.title || 'Your Matches'}</h1>
            <p className="text-[10px] text-primary font-bold uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Found {photos.length} matches
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="md:hidden border-white/10 hover:bg-white/5 text-white">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="premium" className="hidden md:flex h-9 text-xs font-bold px-4">
            <Download className="w-3.5 h-3.5 mr-2" />
            Download Collection
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="mb-8 p-6 glass-luxury rounded-2xl border border-white/[0.04] bg-neutral-950/45 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold mb-1 text-gradient-luxury">We found your portraits.</h2>
            <p className="text-xs text-zinc-400">Select individual pieces to download or grab your entire collection at once.</p>
          </div>
          <Button variant="outline" className="shrink-0 bg-white/[0.02] border-white/10 hover:bg-white/5 text-xs text-white">
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
