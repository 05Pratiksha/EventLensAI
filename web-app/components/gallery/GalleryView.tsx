"use client";

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Search, X, Maximize2, Sparkles, Smile, ShieldCheck, Heart, User, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/utils';

// Premium high fidelity mock gallery data containing vector bounding box coordinates
const mockGalleryPhotos = [
  {
    id: 'gal_1',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400',
    title: 'Sarah & James Vows',
    tags: ['Bride', 'Groom', 'Wedding', 'Ceremony'],
    event: 'Sarah & James Wedding',
    faces: [
      { id: 'f_1', name: 'Sarah (Bride)', score: 99.9, box: { top: '22%', left: '38%', width: '12%', height: '14%' } },
      { id: 'f_2', name: 'James (Groom)', score: 98.7, box: { top: '24%', left: '52%', width: '11%', height: '13%' } }
    ]
  },
  {
    id: 'gal_2',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400',
    title: 'Keynote Panel Discussion',
    tags: ['Speaker', 'Keynote', 'Conference', 'Crowd'],
    event: 'Global Tech Conference 2024',
    faces: [
      { id: 'f_3', name: 'Dr. Evelyn Carter', score: 99.4, box: { top: '30%', left: '28%', width: '10%', height: '12%' } },
      { id: 'f_4', name: 'Marc Andreessen', score: 95.2, box: { top: '33%', left: '46%', width: '9%', height: '11%' } },
      { id: 'f_5', name: 'Prof. Liam Vance', score: 97.8, box: { top: '28%', left: '65%', width: '10%', height: '12%' } }
    ]
  },
  {
    id: 'gal_3',
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400',
    title: 'Wedding Champagne Toast',
    tags: ['Bride', 'Guests', 'Wedding', 'Reception'],
    event: 'Sarah & James Wedding',
    faces: [
      { id: 'f_6', name: 'Sarah (Bride)', score: 99.8, box: { top: '18%', left: '42%', width: '13%', height: '15%' } },
      { id: 'f_7', name: 'Emily (Bridesmaid)', score: 94.5, box: { top: '22%', left: '18%', width: '11%', height: '13%' } }
    ]
  },
  {
    id: 'gal_4',
    url: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=400',
    title: 'Acme Q4 Strategy Workshop',
    tags: ['Corporate', 'Workshop', 'Colleagues'],
    event: 'Acme Corp Q4 Retreat',
    faces: [
      { id: 'f_8', name: 'David (Director)', score: 96.1, box: { top: '25%', left: '35%', width: '12%', height: '14%' } },
      { id: 'f_9', name: 'Clara (Lead Designer)', score: 99.1, box: { top: '28%', left: '55%', width: '11%', height: '13%' } }
    ]
  },
  {
    id: 'gal_5',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=400',
    title: 'Bride & Groom Sunset Portrait',
    tags: ['Bride', 'Groom', 'Wedding', 'Portrait'],
    event: 'Sarah & James Wedding',
    faces: [
      { id: 'f_10', name: 'Sarah (Bride)', score: 99.9, box: { top: '20%', left: '30%', width: '14%', height: '16%' } },
      { id: 'f_11', name: 'James (Groom)', score: 99.2, box: { top: '22%', left: '48%', width: '13%', height: '15%' } }
    ]
  },
  {
    id: 'gal_6',
    url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=400',
    title: 'Developer Sandbox Hackathon',
    tags: ['Corporate', 'Conference', 'Coders'],
    event: 'Global Tech Conference 2024',
    faces: [
      { id: 'f_12', name: 'Aiden (Engineer)', score: 91.8, box: { top: '28%', left: '40%', width: '10%', height: '12%' } }
    ]
  }
];

export function GalleryView() {
  const [photos, setPhotos] = useState(mockGalleryPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<typeof mockGalleryPhotos[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [hoveredFaceId, setHoveredFaceId] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = ['All', ...Array.from(new Set(mockGalleryPhotos.flatMap(p => p.tags)))];

  // Combined search and tag filter
  const filteredPhotos = photos.filter(photo => {
    const matchesTag = selectedTag === 'All' || photo.tags.includes(selectedTag);
    const matchesSearch = searchQuery.trim() === '' || 
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      photo.faces.some(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesTag && matchesSearch;
  });

  return (
    <DashboardLayout>
      <SectionHeader 
        title="Global studio gallery" 
        description="Search, filter, and inspect identified faces across all active event directories."
      />

      <div className="space-y-6 mb-8 text-left">
        {/* Search Input and Filter Row */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by title, event, tag, or person's name..." 
              className="pl-11 h-11"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 p-2 rounded-xl bg-secondary/40 border border-border/60 shrink-0 w-full sm:w-auto justify-center sm:justify-start">
            <Filter className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mr-1">Dynamic Index</span>
          </div>
        </div>

        {/* Tag Filters list */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-secondary/40 border border-border/60 max-w-full overflow-x-auto">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer",
                selectedTag === tag
                  ? "bg-primary text-[#060608] shadow-[0_2px_8px_rgba(229,193,88,0.15)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.02]"
              )}
            >
              {tag === 'All' ? 'All Tags' : `#${tag}`}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry-like Grid Layout */}
      {filteredPhotos.length === 0 ? (
        <div className="glass-luxury p-12 rounded-3xl border border-border/40 text-center max-w-md mx-auto mt-12">
          <Smile className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-foreground">No matches cataloged</h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">We couldn't find any photos matching that tag or facial search query in your active index registry.</p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {filteredPhotos.map((photo, pIdx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: pIdx * 0.05 }}
              onClick={() => setSelectedPhoto(photo)}
              className="break-inside-avoid glass-luxury border border-border/40 rounded-2xl overflow-hidden cursor-pointer group relative bg-secondary/35 hover:border-primary/20 hover:shadow-[0_0_30px_rgba(229,193,88,0.04)] transition-all duration-300"
            >
              {/* Cover layout hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left" />
              
              <img 
                src={photo.thumbnailUrl} 
                alt={photo.title} 
                className="w-full h-auto object-cover group-hover:scale-101 transition-transform duration-700" 
              />

              {/* Bounding box hover markers indicator */}
              <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all">
                <Badge variant="outline" className="bg-black/60 backdrop-blur-md border-white/10 text-white flex items-center gap-1 text-[9px]">
                  <Maximize2 className="w-3 h-3 text-primary animate-pulse" />
                  Inspect Vector Map
                </Badge>
              </div>

              {/* Text metadata overlaid on hover */}
              <div className="absolute inset-x-0 bottom-0 z-20 p-5 text-left opacity-0 group-hover:opacity-100 transition-all translate-y-3 group-hover:translate-y-0 duration-300">
                <span className="text-[9px] font-bold text-primary uppercase tracking-widest mb-1 block">{photo.event}</span>
                <h4 className="font-extrabold text-white text-base tracking-tight">{photo.title}</h4>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {photo.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[8px] bg-white/10 text-zinc-300 px-2 py-0.5 rounded font-medium">#{tag}</span>
                  ))}
                  {photo.faces.length > 0 && (
                    <span className="text-[8px] bg-primary/10 border border-primary/20 text-primary px-2 py-0.5 rounded font-black flex items-center gap-1 uppercase tracking-wide">
                      <Sparkles className="w-2.5 h-2.5" />
                      {photo.faces.length} faces
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Dynamic interactive Face-Mapping Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedPhoto(null);
                setHoveredFaceId(null);
              }}
              className="fixed inset-0 bg-background/90 backdrop-blur-md cursor-pointer"
            />

            {/* Lightbox Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-luxury border border-border/40 rounded-3xl p-6 md:p-8 max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-2xl relative z-10 text-left bg-secondary/85 backdrop-blur-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-accent" />
              
              {/* Left Column: Photo display with face bounding overlays */}
              <div className="lg:col-span-8 flex items-center justify-center bg-black/40 rounded-2xl border border-border/40 relative aspect-square md:aspect-video overflow-hidden">
                {/* Glow green HUD grid mesh overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(229,193,88,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(229,193,88,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                <img 
                  src={selectedPhoto.url} 
                  alt={selectedPhoto.title} 
                  className="w-full h-full object-contain relative z-10" 
                />

                {/* Animated vector outlines mapped on image */}
                {selectedPhoto.faces.map((face) => (
                  <div
                    key={face.id}
                    className={cn(
                      "absolute border-2 rounded-xl transition-all duration-300 z-20 cursor-pointer",
                      hoveredFaceId === face.id 
                        ? "border-primary bg-primary/[0.04] shadow-[0_0_20px_rgba(229,193,88,0.3)] scale-[1.02]" 
                        : "border-primary/45 border-dashed bg-primary/[0.01]"
                    )}
                    style={{
                      top: face.box.top,
                      left: face.box.left,
                      width: face.box.width,
                      height: face.box.height,
                    }}
                    onMouseEnter={() => setHoveredFaceId(face.id)}
                    onMouseLeave={() => setHoveredFaceId(null)}
                  >
                    {/* Bounding corners */}
                    <div className="absolute -top-[1.5px] -left-[1.5px] w-2.5 h-2.5 border-t-2 border-l-2 border-primary" />
                    <div className="absolute -top-[1.5px] -right-[1.5px] w-2.5 h-2.5 border-t-2 border-r-2 border-primary" />
                    <div className="absolute -bottom-[1.5px] -left-[1.5px] w-2.5 h-2.5 border-b-2 border-l-2 border-primary" />
                    <div className="absolute -bottom-[1.5px] -right-[1.5px] w-2.5 h-2.5 border-b-2 border-r-2 border-primary" />

                    {/* Laser scanning dot */}
                    {hoveredFaceId === face.id && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                    )}

                    {/* Text box anchor */}
                    <div className={cn(
                      "absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/85 backdrop-blur-md border border-primary/30 text-[8px] font-black uppercase tracking-wider text-white px-2 py-0.5 rounded shadow-lg whitespace-nowrap transition-opacity",
                      hoveredFaceId === face.id ? "opacity-100" : "opacity-0"
                    )}>
                      {face.name} â€¢ {face.score}% Match
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Metadata details, tags, matched identities */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-1">Portraits directory catalog</span>
                      <h3 className="text-xl font-extrabold text-white tracking-tight leading-tight">{selectedPhoto.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{selectedPhoto.event}</p>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedPhoto(null);
                        setHoveredFaceId(null);
                      }}
                      className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                    >
                      <X className="w-4 h-4 text-zinc-400" />
                    </button>
                  </div>

                  {/* Face outline registry list */}
                  <div className="mt-8 space-y-4">
                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Biometric Mapping registry</h4>
                    {selectedPhoto.faces.length === 0 ? (
                      <p className="text-xs text-muted-foreground italic">No human facial identities detected in this digital asset frame.</p>
                    ) : (
                      <div className="space-y-2">
                        {selectedPhoto.faces.map((face) => (
                          <div 
                            key={face.id}
                            onMouseEnter={() => setHoveredFaceId(face.id)}
                            onMouseLeave={() => setHoveredFaceId(null)}
                            className={cn(
                              "p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all duration-300",
                              hoveredFaceId === face.id 
                                ? "bg-primary/10 border-primary/30 shadow-[0_0_15px_rgba(229,193,88,0.05)]" 
                                : "bg-background/40 border-border hover:border-border/80"
                            )}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center text-primary border border-border">
                                <User className="w-4 h-4" />
                              </div>
                              <div className="text-left">
                                <div className="text-xs font-bold text-white leading-tight">{face.name}</div>
                                <div className="text-[9px] text-muted-foreground mt-0.5">Biometric coordinate index vector</div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-xs font-mono font-black text-primary">{face.score}%</div>
                              <div className="text-[8px] text-emerald-400 uppercase font-bold tracking-widest mt-0.5">Matches</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Photo tags list */}
                  <div className="mt-6 space-y-2">
                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Metadata tags</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPhoto.tags.map(t => (
                        <Badge key={t} variant="outline" className="border-border bg-secondary/35 text-[9px] font-semibold text-zinc-300 py-0.5 px-2">
                          #{t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border/40 space-y-4">
                  <div className="p-3 bg-emerald-500/[0.01] border border-emerald-500/10 rounded-xl flex items-center gap-2.5 text-[10px] text-emerald-400">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Metadata headers and identity outlines are encrypted in compliance with GDPR.</span>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      variant="outline"
                      className="h-10 text-xs flex-1 border-white/10 bg-white/5 hover:bg-white/10"
                      onClick={() => {
                        setSelectedPhoto(null);
                        setHoveredFaceId(null);
                      }}
                    >
                      Close Inspector
                    </Button>
                    
                    <Button 
                      variant="premium"
                      className="h-10 text-xs flex-1"
                      onClick={() => {
                        navigator.clipboard.writeText(selectedPhoto.url);
                        alert('Digital image asset clipboard link generated.');
                      }}
                    >
                      Share Asset Link
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
