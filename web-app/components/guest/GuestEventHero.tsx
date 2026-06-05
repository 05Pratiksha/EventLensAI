"use client";

import { Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { Event } from '@/types';

interface GuestEventHeroProps {
  event: Event;
  studioName?: string;
  location?: string;
}

export function GuestEventHero({ 
  event, 
  studioName = "Premium Studio", 
  location = "New York, NY" 
}: GuestEventHeroProps) {
  return (
    <>
      <div className="w-full h-64 md:h-80 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-background/60 to-background z-10" />
        <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" />
      </div>

      <div className="relative z-20 w-full max-w-lg px-6 -mt-32 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/[0.04] backdrop-blur-md flex items-center justify-center border border-primary/20 mx-auto mb-4 shadow-xl shadow-primary/5">
            <Camera className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground dark:text-white mb-2">{event.title}</h1>
          <p className="text-xs text-muted-foreground font-semibold tracking-wide uppercase mb-2">
            {event.date} • {location}
          </p>
          <p className="text-[10px] text-primary/80 font-bold uppercase tracking-widest">
            Captured by {studioName}
          </p>
        </motion.div>
      </div>
    </>
  );
}
