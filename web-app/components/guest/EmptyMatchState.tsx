"use client";

import { AlertCircle, Camera } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface EmptyMatchStateProps {
  onRetry: () => void;
}

export function EmptyMatchState({ onRetry }: EmptyMatchStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center p-12 text-center glass-luxury rounded-2xl border border-border/40">
      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-bold mb-2 text-foreground">No matches found</h3>
      <p className="text-xs text-muted-foreground max-w-md mb-6">
        We couldn't find any photos matching your selfie. This could be due to lighting, angles, or perhaps you weren't captured in the gallery.
      </p>
      <Button variant="premium" onClick={onRetry} className="h-10 text-xs font-bold px-6">
        <Camera className="w-4 h-4 mr-2" />
        Upload New Selfie
      </Button>
    </div>
  );
}
