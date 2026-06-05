"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { LoadingState } from '@/components/ui/LoadingState';
import { api } from '@/services/api';
import { Photo, Event } from '@/types';
import { ArrowLeft, Download, CheckCircle2, Share2, ShieldCheck, User, X, Loader2, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToastStore } from '@/store/useToastStore';
import { MatchResultGrid } from './MatchResultGrid';

function MatchesViewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventSlug = searchParams.get('event');
  const { addToast } = useToastStore();
  
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [selfie, setSelfie] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);

  useEffect(() => {
    // Load selfie from sessionStorage
    const savedSelfie = sessionStorage.getItem('guest_selfie');
    if (savedSelfie) {
      setSelfie(savedSelfie);
    }

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
        
        addToast({
          type: 'success',
          message: 'Biometric Search Complete',
          description: `Found ${matches.length} matching portraits in active directory registry.`,
          duration: 4000
        });
      }, 3000);
    };
    
    fetchMatches();
  }, [eventSlug, addToast]);

  const handleDownloadPhoto = (photoId: string) => {
    addToast({
      type: 'info',
      message: 'Preparing Download',
      description: 'Exporting digital image asset in lossless high-definition...',
      duration: 2000
    });

    setTimeout(() => {
      addToast({
        type: 'success',
        message: 'Download Successful',
        description: `Photo ${photoId} saved in full RAW resolution.`,
        duration: 3500
      });
    }, 2000);
  };

  const handleDownloadAll = () => {
    setIsDownloadingAll(true);
    
    addToast({
      type: 'info',
      message: 'Compiling Portrait Collection',
      description: `Bundling all ${photos.length} matches into a single high-fidelity RAW archive...`,
      duration: 3000
    });

    setTimeout(() => {
      setIsDownloadingAll(false);
      addToast({
        type: 'success',
        message: 'Collection Exported',
        description: 'RAW photo zip bundle successfully saved to downloads.',
        duration: 4500
      });
    }, 3200);
  };

  const handleShareCollection = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast({
      type: 'success',
      message: 'Share Link Copied',
      description: 'Personal portrait directory link saved to your clipboard.',
      duration: 3000
    });
  };

  if (isScanning) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-300">
        {/* Holographic glowing matrix backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(229,193,88,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(229,193,88,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#E5C158_0%,_transparent_40%)] opacity-[0.03] pointer-events-none" />
        
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="relative mb-8"
        >
          <div className="w-24 h-24 rounded-full border border-primary/20 flex items-center justify-center relative z-10 bg-secondary/40 backdrop-blur-2xl">
            <div className="w-20 h-20 rounded-full border border-primary/30 border-t-primary animate-spin" />
            <Cpu className="w-8 h-8 text-primary absolute animate-pulse" />
          </div>
          <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full" />
        </motion.div>
        
        <h2 className="text-xl font-bold mb-2 tracking-wide text-foreground uppercase text-gradient-luxury">Comparing Face Coordinates</h2>
        <p className="text-xs text-muted-foreground animate-pulse text-center max-w-sm">
          Our biometric neural engine is analyzing portrait registers to find your matches...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 transition-colors duration-300 text-left">
      
      {/* Sticky header bar */}
      <div className="sticky top-0 z-40 bg-background/85 backdrop-blur-xl border-b border-border/40 px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full border border-border hover:bg-foreground/5 text-foreground cursor-pointer" 
            onClick={() => router.back()}
          >
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
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleDownloadAll}
            className="md:hidden border-border hover:bg-foreground/5 text-foreground cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button 
            variant="premium" 
            disabled={isDownloadingAll || photos.length === 0}
            onClick={handleDownloadAll}
            className="hidden md:flex h-9 text-xs font-bold px-4 cursor-pointer"
          >
            {isDownloadingAll ? (
              <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5 mr-2" />
            )}
            Download Collection
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        
        {/* Selfie comparison link card banner */}
        <div className="mb-8 p-6 glass-luxury rounded-2xl border border-border/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden bg-secondary/35">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(229,193,88,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(229,193,88,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-center gap-6 z-10 w-full md:w-auto">
            {/* Guest Selfie Thumbnail */}
            {selfie ? (
              <div className="relative w-16 h-20 rounded-xl overflow-hidden border border-primary/30 shrink-0 bg-zinc-950 shadow-lg">
                <img src={selfie} alt="Selfie source" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-primary/10 mix-blend-color-dodge" />
                <div className="absolute inset-x-0 bottom-0 bg-black/75 text-[8px] font-black uppercase text-primary tracking-widest text-center py-0.5 border-t border-primary/20">
                  Selfie
                </div>
              </div>
            ) : (
              <div className="w-16 h-20 rounded-xl border border-dashed border-border flex items-center justify-center bg-secondary/40 shrink-0 text-muted-foreground">
                <User className="w-6 h-6" />
              </div>
            )}

            {/* Neural sync indicator dots */}
            <div className="hidden sm:flex flex-col items-center gap-1">
              <span className="text-[8px] font-mono text-primary/60 font-bold uppercase tracking-widest leading-none">AI LINK</span>
              <div className="flex gap-1.5 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary/70 animate-pulse delay-75" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse delay-150" />
              </div>
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-lg font-bold mb-1 text-gradient-luxury flex items-center justify-center sm:justify-start gap-2">
                Biometric matches secured.
              </h2>
              <p className="text-xs text-muted-foreground">
                We've found {photos.length} portraits with excellent neural confidence matches. Download your items.
              </p>
            </div>
          </div>

          <Button 
            variant="outline" 
            onClick={handleShareCollection}
            className="shrink-0 bg-secondary/45 border-border hover:bg-foreground/5 text-xs text-foreground cursor-pointer z-10 w-full md:w-auto"
          >
            <Share2 className="w-3.5 h-3.5 mr-2" />
            Share Collection Link
          </Button>
        </div>

        {/* Modularized Grid */}
        <MatchResultGrid 
          photos={photos} 
          onDownloadPhoto={handleDownloadPhoto}
          onInspectPhoto={setSelectedPhoto}
          onRetry={() => router.push(`/event/${eventSlug}`)}
        />
      </div>

      {/* High-Fidelity Biometric Vector Lightbox Inspector */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Lightbox backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-background/90 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-luxury border border-border/40 rounded-3xl p-6 md:p-8 max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-6 shadow-2xl relative z-10 text-left bg-secondary/85 backdrop-blur-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-accent" />
              
              {/* Photo Display Frame */}
              <div className="md:col-span-7 flex items-center justify-center bg-black/40 rounded-2xl border border-border/40 relative aspect-square overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(229,193,88,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(229,193,88,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                <img 
                  src={selectedPhoto.url} 
                  alt="Inspected matched portrait" 
                  className="w-full h-full object-contain relative z-10" 
                />

                {/* Optional bounding boxes could be moved to another component if desired, keeping it here for simplicity since it's modal specific */}
              </div>

              {/* Side Metadata and Actions Column */}
              <div className="md:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-1">BIOMETRIC METRICS REGISTRY</span>
                      <h3 className="text-xl font-extrabold text-white tracking-tight leading-tight">Portrait #{selectedPhoto.id}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{event?.title || 'Active Event Gallery'}</p>
                    </div>
                    
                    <button 
                      onClick={() => setSelectedPhoto(null)}
                      className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                    >
                      <X className="w-4 h-4 text-zinc-400" />
                    </button>
                  </div>

                  <div className="mt-8 space-y-4">
                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-left">Matched Identity Parameters</h4>
                    
                    <div className="space-y-2">
                      <div className="p-3.5 rounded-xl border bg-primary/10 border-primary/30 shadow-[0_0_15px_rgba(229,193,88,0.05)] text-left">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center text-primary border border-border">
                              <User className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white leading-tight">Biometric Registry ID</div>
                              <div className="text-[9px] text-muted-foreground mt-0.5">Face index mapping: #F-{selectedPhoto.id}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-mono font-black text-primary">{selectedPhoto.matchScore}%</div>
                            <div className="text-[8px] text-emerald-400 uppercase font-bold tracking-widest mt-0.5">Matched</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-2.5">
                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-left">Asset Specifications</h4>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                      <div className="p-2.5 bg-background/50 border border-border/40 rounded-lg">
                        <span className="text-muted-foreground block text-[8px] uppercase tracking-wider mb-0.5">Format</span>
                        <span className="text-foreground font-bold font-sans">Lossless JPEG</span>
                      </div>
                      <div className="p-2.5 bg-background/50 border border-border/40 rounded-lg">
                        <span className="text-foreground font-bold">4096 x 2730</span>
                      </div>
                      <div className="p-2.5 bg-background/50 border border-border/40 rounded-lg">
                        <span className="text-muted-foreground block text-[8px] uppercase tracking-wider mb-0.5">File Size</span>
                        <span className="text-foreground font-bold">6.8 MB</span>
                      </div>
                      <div className="p-2.5 bg-background/50 border border-border/40 rounded-lg">
                        <span className="text-muted-foreground block text-[8px] uppercase tracking-wider mb-0.5">Color Space</span>
                        <span className="text-foreground font-bold">sRGB Rec. 709</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border/40 space-y-4">
                  <div className="p-3 bg-emerald-500/[0.01] border border-emerald-500/10 rounded-xl flex items-center gap-2.5 text-[10px] text-emerald-400 text-left">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Identity hashes and biometric models conform fully to GDPR security standards.</span>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      variant="outline"
                      className="h-10 text-xs flex-1 border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer"
                      onClick={() => setSelectedPhoto(null)}
                    >
                      Close
                    </Button>
                    
                    <Button 
                      variant="premium"
                      className="h-10 text-xs flex-1 cursor-pointer"
                      onClick={() => {
                        setSelectedPhoto(null);
                        handleDownloadPhoto(selectedPhoto.id);
                      }}
                    >
                      <Download className="w-3.5 h-3.5 mr-2" />
                      Download High-Res
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MatchesView() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <LoadingState />
      </div>
    }>
      <MatchesViewContent />
    </Suspense>
  );
}
