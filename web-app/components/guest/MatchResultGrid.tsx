"use client";

import { useState } from 'react';
import { ZoomIn, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Photo } from '@/types';
import { cn } from '@/utils/utils';
import { MatchConfidenceBadge } from './MatchConfidenceBadge';
import { EmptyMatchState } from './EmptyMatchState';

// Bounding box mapping for our mock photos to render precise face outlines
const MOCK_FACE_BOXES: Record<string, { top: string; left: string; width: string; height: string }> = {
  'p_1': { top: '18%', left: '42%', width: '13%', height: '16%' },
  'p_2': { top: '30%', left: '46%', width: '10%', height: '12%' },
  'p_3': { top: '22%', left: '38%', width: '12%', height: '14%' },
  'p_4': { top: '25%', left: '40%', width: '11%', height: '13%' }
};

interface MatchResultGridProps {
  photos: Photo[];
  onDownloadPhoto: (photoId: string) => void;
  onInspectPhoto: (photo: Photo) => void;
  onRetry: () => void;
}

export function MatchResultGrid({ photos, onDownloadPhoto, onInspectPhoto, onRetry }: MatchResultGridProps) {
  const [hoveredPhotoId, setHoveredPhotoId] = useState<string | null>(null);

  if (!photos || photos.length === 0) {
    return <EmptyMatchState onRetry={onRetry} />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {photos.map((photo, index) => {
        const hasFaceBox = !!MOCK_FACE_BOXES[photo.id];
        const faceBox = MOCK_FACE_BOXES[photo.id];
        const isHovered = hoveredPhotoId === photo.id;

        return (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 }}
            onMouseEnter={() => setHoveredPhotoId(photo.id)}
            onMouseLeave={() => setHoveredPhotoId(null)}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-secondary/40 border border-border/40 hover:border-primary/20 hover:shadow-[0_0_30px_rgba(229,193,88,0.03)] cursor-pointer transition-all duration-300"
          >
            {/* Photo Asset */}
            <img
              src={photo.thumbnailUrl}
              alt="Matched portrait"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-101"
              loading="lazy"
            />

            {/* Cyber HUD Grid Overlay on Hover */}
            <div className={cn(
              "absolute inset-0 bg-[linear-gradient(rgba(229,193,88,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(229,193,88,0.015)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )} />

            {/* Bounding Box Outline mapped on Portrait Face */}
            {hasFaceBox && faceBox && (
              <div
                className={cn(
                  "absolute border-2 rounded-xl transition-all duration-300 pointer-events-none",
                  isHovered 
                    ? "border-primary bg-primary/[0.04] shadow-[0_0_15px_rgba(229,193,88,0.25)] scale-[1.02] opacity-100" 
                    : "border-primary/25 border-dashed bg-transparent opacity-40"
                )}
                style={{
                  top: faceBox.top,
                  left: faceBox.left,
                  width: faceBox.width,
                  height: faceBox.height,
                }}
              >
                {/* Bounding corners */}
                <div className="absolute -top-[1.5px] -left-[1.5px] w-2 h-2 border-t-2 border-l-2 border-primary" />
                <div className="absolute -top-[1.5px] -right-[1.5px] w-2 h-2 border-t-2 border-r-2 border-primary" />
                <div className="absolute -bottom-[1.5px] -left-[1.5px] w-2 h-2 border-b-2 border-l-2 border-primary" />
                <div className="absolute -bottom-[1.5px] -right-[1.5px] w-2 h-2 border-b-2 border-r-2 border-primary" />
                
                {/* Face tracking tag */}
                <div className={cn(
                  "absolute -bottom-5 left-1/2 -translate-x-1/2 bg-black/85 border border-primary/30 text-[7px] font-black uppercase text-white px-1.5 py-0.5 rounded shadow-lg whitespace-nowrap transition-opacity",
                  isHovered ? "opacity-100" : "opacity-0"
                )}>
                  YOU • {photo.matchScore}%
                </div>
              </div>
            )}

            {/* Top Left: Floating Match Badge */}
            {photo.matchScore && (
              <MatchConfidenceBadge score={photo.matchScore} />
            )}

            {/* Hover Action overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 text-left z-[15]">
              <div className="flex items-center justify-between gap-3 w-full">
                {/* Inspect trigger */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onInspectPhoto(photo);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-[10px] flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-primary" />
                  Inspect Vector
                </button>
                
                {/* Quick download trigger */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDownloadPhoto(photo.id);
                  }}
                  className="w-7 h-7 rounded-full bg-primary/20 hover:bg-primary/35 border border-primary/30 text-white flex items-center justify-center cursor-pointer transition-colors"
                  title="Download Full Quality RAW"
                >
                  <Download className="w-3.5 h-3.5 text-primary" />
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
