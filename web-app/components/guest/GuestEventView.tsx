"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { ShieldCheck } from 'lucide-react';
import { api } from '@/services/api';
import { Event } from '@/types';
import { useToastStore } from '@/store/useToastStore';

import { GuestEventHero } from './GuestEventHero';
import { SelfieUploadCard } from './SelfieUploadCard';
import { AIProcessingLoader } from './AIProcessingLoader';
import { QRAccessCard } from './QRAccessCard';

export default function GuestEventView() {
  const { slug } = useParams();
  const router = useRouter();
  const { addToast } = useToastStore();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  
  // Biometric Scan HUD State
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  
  // Real-time jittering biometric values
  const [metrics, setMetrics] = useState({
    roll: '0.00°',
    pitch: '0.00°',
    yaw: '0.00°',
    contrast: '1.00',
    landmarks: '0',
    fps: '60.0'
  });

  useEffect(() => {
    const fetchEvent = async () => {
      const data = await api.events.get(slug as string);
      if (data) setEvent(data);
    };
    fetchEvent();
  }, [slug]);

  // Jitter metrics during scanning
  useEffect(() => {
    if (!isScanning) return;
    
    const interval = setInterval(() => {
      setMetrics({
        roll: `${(Math.random() * 2 - 1).toFixed(2)}°`,
        pitch: `${(Math.random() * 1.5 - 0.75).toFixed(2)}°`,
        yaw: `${(Math.random() * 3 - 1.5).toFixed(2)}°`,
        contrast: (1.1 + Math.random() * 0.15).toFixed(2),
        landmarks: Math.min(68, Math.floor(scanProgress * 0.7 + 10)).toString(),
        fps: (59.2 + Math.random() * 0.8).toFixed(1)
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isScanning, scanProgress]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      
      addToast({
        type: 'info',
        message: 'Selfie Loaded Successfully',
        description: 'Review biometric terms and click Find My Photos to begin.',
        duration: 3000
      });
    }
  };

  const handleFindPhotos = () => {
    if (!file || !consent) return;
    
    setIsScanning(true);
    setScanProgress(0);
    
    // Animate progress up to 100%
    const duration = 4200; // 4.2 seconds
    const intervalTime = 40;
    const increment = 100 / (duration / intervalTime);
    
    const timer = setInterval(() => {
      setScanProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);
  };

  // Handle Scan completion redirect
  useEffect(() => {
    if (scanProgress === 100 && isScanning) {
      setTimeout(() => {
        setIsScanning(false);
        
        // Save preview to sessionStorage so MatchesPage can render it
        if (preview) {
          sessionStorage.setItem('guest_selfie', preview);
        }
        
        addToast({
          type: 'success',
          message: 'Face Analysis Complete',
          description: 'Vector mapped. Found matching directories.',
          duration: 4000
        });
        
        router.push(`/matches?event=${slug}`);
      }, 800);
    }
  }, [scanProgress, isScanning, slug, router, preview, addToast]);

  if (!event) return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background relative flex flex-col pb-20 transition-colors duration-300">
      <GradientBackground />
      
      <GuestEventHero event={event} />

      <div className="relative z-20 w-full max-w-lg px-6 mx-auto">
        <SelfieUploadCard 
          preview={preview}
          consent={consent}
          isScanning={isScanning}
          hasFile={!!file}
          onFileChange={handleFileChange}
          onConsentChange={setConsent}
          onFindPhotos={handleFindPhotos}
        />

        <div className="mt-8 text-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary animate-pulse" />
          Powered securely by EventLens AI
        </div>

        <QRAccessCard eventSlug={slug as string} />
      </div>

      <AIProcessingLoader 
        isScanning={isScanning}
        scanProgress={scanProgress}
        preview={preview}
        metrics={metrics}
      />
    </div>
  );
}
