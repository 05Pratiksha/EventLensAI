"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { Camera, ShieldCheck, Upload } from 'lucide-react';
import { api } from '@/services/api';
import { Event } from '@/types';
import { motion } from 'framer-motion';

export default function GuestEventPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      const data = await api.events.get(slug as string);
      if (data) setEvent(data);
    };
    fetchEvent();
  }, [slug]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleFindPhotos = async () => {
    if (!file || !consent) return;
    setIsUploading(true);
    // Simulate finding photos
    setTimeout(() => {
      router.push(`/matches?event=${slug}`);
    }, 1500);
  };

  if (!event) return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background relative flex flex-col items-center pb-20">
      <GradientBackground />
      
      {/* Banner */}
      <div className="w-full h-64 md:h-80 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-background/60 to-background z-10" />
        <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" />
      </div>

      <div className="relative z-20 w-full max-w-lg px-6 -mt-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/[0.04] backdrop-blur-md flex items-center justify-center border border-primary/20 mx-auto mb-4 shadow-xl shadow-primary/5">
            <Camera className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-2">{event.title}</h1>
          <p className="text-xs text-zinc-400 font-semibold tracking-wide uppercase">{event.date}</p>
        </motion.div>

        <Card className="glass-luxury border-white/[0.04] bg-neutral-950/45 shadow-[0_32px_64px_rgba(0,0,0,0.8)] backdrop-blur-3xl">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold mb-2 text-center text-white text-gradient-luxury">Discover Your Portraits</h2>
            <p className="text-xs text-center text-zinc-400 mb-8">
              Upload a selfie and our AI will find every photo you appear in.
            </p>

            <div className="space-y-6">
              {/* Selfie Upload Area */}
              <div className="relative">
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="user"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={handleFileChange}
                />
                <div className={`border border-dashed rounded-xl overflow-hidden transition-all duration-300 ${preview ? 'border-primary/50 bg-black/40' : 'border-white/10 bg-white/[0.02] hover:border-primary/40 hover:bg-white/[0.04] p-12 text-center'}`}>
                  {preview ? (
                    <div className="relative aspect-[3/4] max-h-64 mx-auto rounded-lg overflow-hidden border border-white/10">
                      <img src={preview} alt="Selfie preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-bold flex items-center"><Upload className="w-4 h-4 mr-2 text-primary" /> Change Photo</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Camera className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-xs font-bold text-white mb-1 uppercase tracking-wider">Capture Selfie</p>
                      <p className="text-[10px] text-zinc-400">or upload from device gallery</p>
                    </>
                  )}
                </div>
              </div>

              {/* Consent */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded border border-white/25 bg-white/[0.02] appearance-none checked:bg-primary checked:border-primary transition-all duration-300 cursor-pointer"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                  {consent && <ShieldCheck className="w-3.5 h-3.5 text-black absolute pointer-events-none" />}
                </div>
                <p className="text-[10px] text-zinc-400 group-hover:text-zinc-300 transition-colors leading-relaxed">
                  I consent to the use of my biometric data solely for finding my photos in this gallery. 
                  My data will be deleted automatically after 24 hours.
                </p>
              </label>

              <Button 
                variant="premium" 
                className="w-full h-11 text-xs font-bold" 
                disabled={!file || !consent || isUploading}
                onClick={handleFindPhotos}
              >
                {isUploading ? 'Scanning Directory...' : 'Find My Portraits'}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary" />
          Powered securely by EventLens AI
        </div>
      </div>
    </div>
  );
}
