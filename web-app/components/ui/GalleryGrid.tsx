import { Photo } from '@/types';
import { PhotoCard } from './PhotoCard';
import { EmptyState } from './EmptyState';
import { Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

interface GalleryGridProps {
  photos: Photo[];
  selectable?: boolean;
}

export function GalleryGrid({ photos, selectable }: GalleryGridProps) {
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set());

  if (!photos || photos.length === 0) {
    return (
      <EmptyState
        icon={ImageIcon}
        title="No photos yet"
        description="Upload photos to this event to see them here."
      />
    );
  }

  const toggleSelect = (id: string) => {
    setSelectedPhotos(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {photos.map((photo, index) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          index={index}
          selectable={selectable}
          selected={selectedPhotos.has(photo.id)}
          onSelect={toggleSelect}
        />
      ))}
    </div>
  );
}
