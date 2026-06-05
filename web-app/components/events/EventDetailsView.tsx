"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { UploadDropzone } from '@/components/upload/UploadDropzone';
import { GalleryGrid } from '@/components/ui/GalleryGrid';
import { LoadingState } from '@/components/ui/LoadingState';
import { api } from '@/services/api';
import { Event, Photo } from '@/types';
import { ArrowLeft, ArrowRight, ExternalLink, ImagePlus, Upload, Settings, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { QRCodeCard } from '@/components/events/QRAccessComponents';
import { useToastStore } from '@/store/useToastStore';
import { AIProcessingCard } from '@/components/dashboard/AIProcessingComponents';

export function EventDetailsView() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToastStore();

  // Simulated uploading states
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const [eventData, photosData] = await Promise.all([
          api.events.get(id as string),
          api.photos.match(new File([], 'dummy')) // Using match to get mock photos for now
        ]);
        if (eventData) setEvent(eventData);
        setPhotos(photosData);
      } catch (error) {
        console.error('Failed to load event:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (isLoading) return <DashboardLayout><LoadingState message="Loading event workspace..." /></DashboardLayout>;
  if (!event) return <DashboardLayout><div className="text-center py-20 text-foreground">Event not found</div></DashboardLayout>;

  const guestUrl = typeof window !== 'undefined' ? `${window.location.origin}/event/${event.slug}` : '';

  const handlePhotosUpload = (files: File[]) => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate progressive biometric index ingestion
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          addToast({
            message: 'Ingestion Complete!',
            description: `${files.length} new photos have been mapped and face templates created.`,
            type: 'success',
          });

          // Prepend newly uploaded mock files
          const newMockPhotos = files.map((file, idx) => ({
            id: `p_new_${idx}_${Date.now()}`,
            eventId: id as string,
            url: URL.createObjectURL(file),
            thumbnailUrl: URL.createObjectURL(file),
            uploadedAt: new Date().toISOString(),
            matchScore: 92 + Math.random() * 8
          }));
          
          setPhotos(prev => [...newMockPhotos, ...prev]);

          // Update metrics on event page
          setEvent(prev => prev ? {
            ...prev,
            photoCount: prev.photoCount + files.length,
            matchedCount: (prev.matchedCount || 0) + Math.round(files.length * 0.65)
          } : null);

          return 100;
        }
        return prev + 10;
      });
    }, 450);
  };

  const handlePublishGallery = () => {
    if (!event) return;
    setEvent(prev => prev ? { ...prev, status: 'Published' } : null);
    addToast({
      message: 'Gallery Published Live!',
      description: 'Your biometric guest access portal is now active for face matches.',
      type: 'success',
    });
  };

  const getStatusBadge = (status: Event['status']) => {
    switch (status) {
      case 'Published': return <Badge variant="success">Published</Badge>;
      case 'Processing': return <Badge variant="processing" className="animate-pulse">Processing</Badge>;
      case 'Draft': return <Badge variant="secondary">Draft</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4 text-left">
          <Link href="/events">
            <Button variant="ghost" size="icon" className="rounded-full shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-tight">{event.title}</h1>
              {getStatusBadge(event.status)}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">{event.date} â€¢ {event.photoCount.toLocaleString()} Photos Cataloged</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
          <Link href={`/event/${event.slug}`} target="_blank">
            <Button variant="outline" size="sm" className="h-10 text-xs">
              <ExternalLink className="w-4 h-4 mr-2" />
              Guest View
            </Button>
          </Link>
          <Button 
            variant="premium" 
            size="sm" 
            className="h-10 text-xs font-bold"
            disabled={event.status === 'Published'}
            onClick={handlePublishGallery}
          >
            {event.status === 'Published' ? 'Gallery Active' : 'Publish Gallery'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Banner cover frame */}
          <div className="relative aspect-[21/9] sm:aspect-[16/5] rounded-2xl overflow-hidden border border-border group shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent z-10" />
            <img src={event.coverImage} alt="Cover" className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-700" />
            <Button variant="glass" className="absolute top-4 right-4 z-20 text-xs bg-black/40 backdrop-blur-md border-white/10 hover:bg-white/5">
              <ImagePlus className="w-3.5 h-3.5 mr-2" />
              Change Cover
            </Button>
          </div>

          {/* Simulated Ingestion Upload Area */}
          <div className="bg-secondary/25 border border-border rounded-2xl p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Upload className="w-4.5 h-4.5 text-primary" />
                Add Photos to Workspace
              </h3>
              
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-zinc-400 font-mono">Indexing Engine:</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Active Standby
                </span>
              </div>
            </div>

            <UploadDropzone 
              onUpload={handlePhotosUpload} 
              isUploading={isUploading}
              progress={uploadProgress}
            />
          </div>

          {/* Interactive Masonry Preview */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Workspace Portfolio</h3>
              <Link href="/gallery">
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
                  View full grid
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
            <GalleryGrid photos={photos.slice(0, 8)} />
          </div>
        </div>

        {/* Sidebar Controls Column */}
        <div className="space-y-6">
          <QRCodeCard url={guestUrl} eventName={event.title} />
          
          {isUploading && (
            <AIProcessingCard 
              eventName={event.title}
              totalPhotos={event.photoCount}
              matchedFaces={event.matchedCount || 0}
              status="scanning"
              progressPercent={uploadProgress}
            />
          )}

          <div className="bg-secondary/35 border border-border/80 rounded-2xl p-6 shadow-xl backdrop-blur-md text-left">
            <h3 className="font-bold text-sm text-foreground uppercase tracking-widest mb-4">Event Configuration</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border/40">
                <span className="text-xs text-muted-foreground">Privacy Access</span>
                <Badge variant={event.visibility === 'Public' ? 'success' : 'secondary'} className="text-[9px] font-bold uppercase tracking-wider">
                  {event.visibility}
                </Badge>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-border/40">
                <span className="text-xs text-muted-foreground">Sync Engine</span>
                <span className="text-xs font-bold text-foreground">v2.1 Facial Template Matcher</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Cover Status</span>
                <span className="text-xs font-bold text-emerald-400">Validated</span>
              </div>
              <Button variant="outline" className="w-full mt-2 text-xs font-bold h-9">
                <Settings className="w-3.5 h-3.5 mr-2" />
                Manage Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
