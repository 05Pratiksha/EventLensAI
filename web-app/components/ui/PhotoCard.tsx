import { Photo } from '@/types';
import { motion } from 'framer-motion';
import { Check, Download, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PhotoCardProps {
  photo: Photo;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (id: string) => void;
  index?: number;
}

export function PhotoCard({ photo, selectable, selected, onSelect, index = 0 }: PhotoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="group relative aspect-square rounded-xl overflow-hidden bg-foreground/5 border border-border dark:bg-white/5 dark:border-white/10"
      onClick={() => selectable && onSelect && onSelect(photo.id)}
    >
      <img
        src={photo.thumbnailUrl}
        alt="Event photo"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
        <Button size="icon" variant="glass" className="rounded-full bg-primary/25 border-primary/20 hover:bg-primary/35 text-white">
          <Download className="w-4 h-4" />
        </Button>
      </div>

      {photo.matchScore && (
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary backdrop-blur-md rounded text-[9px] font-black uppercase tracking-widest text-black flex items-center gap-1 shadow-lg">
          <Zap className="w-2.5 h-2.5 fill-black stroke-black" />
          {photo.matchScore}% Match
        </div>
      )}

      {selectable && (
        <div className="absolute top-2 right-2">
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selected ? 'bg-primary border-primary' : 'border-white/40 bg-black/40 group-hover:border-white'}`}>
            {selected && <Check className="w-3.5 h-3.5 text-black stroke-[3px]" />}
          </div>
        </div>
      )}
    </motion.div>
  );
}
