import { Photo } from '@/types';
import { motion } from 'framer-motion';
import { Check, Download, Zap } from 'lucide-react';
import { Button } from '../ui/Button';

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
      className="group relative aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10"
      onClick={() => selectable && onSelect && onSelect(photo.id)}
    >
      <img
        src={photo.thumbnailUrl}
        alt="Event photo"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
        <Button size="icon" variant="glass" className="rounded-full">
          <Download className="w-4 h-4" />
        </Button>
      </div>

      {photo.matchScore && (
        <div className="absolute top-2 left-2 px-2 py-1 bg-blue-600/80 backdrop-blur-md rounded-md text-xs font-bold flex items-center gap-1 shadow-lg">
          <Zap className="w-3 h-3 text-yellow-300 fill-yellow-300" />
          {photo.matchScore}% Match
        </div>
      )}

      {selectable && (
        <div className="absolute top-2 right-2">
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selected ? 'bg-blue-500 border-blue-500' : 'border-white/50 bg-black/20 group-hover:border-white'}`}>
            {selected && <Check className="w-4 h-4 text-white" />}
          </div>
        </div>
      )}
    </motion.div>
  );
}
