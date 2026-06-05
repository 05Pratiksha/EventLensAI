"use client";

import { Sparkles } from 'lucide-react';

interface MatchConfidenceBadgeProps {
  score: number;
}

export function MatchConfidenceBadge({ score }: MatchConfidenceBadgeProps) {
  if (!score) return null;
  
  return (
    <div className="absolute top-3 left-3 px-2 py-0.5 bg-primary backdrop-blur-md rounded-lg text-[9px] font-black uppercase tracking-widest text-black flex items-center gap-1 shadow-lg z-20">
      <Sparkles className="w-2.5 h-2.5 fill-black stroke-black animate-pulse" />
      {score}% Match
    </div>
  );
}
