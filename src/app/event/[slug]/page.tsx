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
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 mx-auto mb-4 shadow-xl">
            <Camera className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">{event.title}</h1>
          <p className="text-muted-foreground">{event.date}</p>
        </motion.div>

        <Card className="border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold mb-2 text-center text-white">Find your photos instantly</h2>
            <p className="text-sm text-center text-muted-foreground mb-8">
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
                <div className={`border-2 border-dashed rounded-xl overflow-hidden transition-all duration-200 ${preview ? 'border-blue-500 bg-black' : 'border-white/20 bg-white/5 hover:border-blue-500/50 hover:bg-white/10 p-12 text-center'}`}>
                  {preview ? (
                    <div className="relative aspect-[3/4] max-h-64 mx-auto">
                      <img src={preview} alt="Selfie preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span className="text-white font-medium flex items-center"><Upload className="w-4 h-4 mr-2" /> Change Photo</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                        <Camera className="w-6 h-6 text-blue-400" />
                      </div>
                      <p className="font-medium text-white mb-1">Take a selfie</p>
                      <p className="text-xs text-muted-foreground">or upload from gallery</p>
                    </>
                  )}
                </div>
              </div>

              {/* Consent */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center mt-1">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded border border-white/20 bg-white/5 appearance-none checked:bg-blue-500 checked:border-blue-500 transition-colors"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                  {consent && <ShieldCheck className="w-3 h-3 text-white absolute pointer-events-none" />}
                </div>
                <p className="text-xs text-muted-foreground group-hover:text-gray-300 transition-colors leading-relaxed">
                  I consent to the use of my biometric data solely for finding my photos in this gallery. 
                  My data will be deleted automatically after 24 hours.
                </p>
              </label>

              <Button 
                variant="premium" 
                className="w-full h-12 text-lg" 
                disabled={!file || !consent || isUploading}
                onClick={handleFindPhotos}
              >
                {isUploading ? 'Scanning...' : 'Find My Photos'}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          Powered securely by EventLens AI
        </div>
      </div>
    </div>
  );
}
