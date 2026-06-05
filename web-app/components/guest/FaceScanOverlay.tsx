"use client";

import { motion } from 'framer-motion';

const LANDMARK_POINTS = [
  { top: '32%', left: '42%' }, // Left Eye
  { top: '32%', left: '58%' }, // Right Eye
  { top: '48%', left: '50%' }, // Nose Tip
  { top: '62%', left: '43%' }, // Left Mouth Corner
  { top: '62%', left: '57%' }, // Right Mouth Corner
  { top: '55%', left: '50%' }, // Lip center
  { top: '22%', left: '50%' }, // Forehead
  { top: '45%', left: '33%' }, // Left Cheek
  { top: '45%', left: '67%' }, // Right Cheek
  { top: '70%', left: '50%' }, // Chin
];

interface FaceScanOverlayProps {
  preview: string | null;
  scanProgress: number;
  metrics: {
    roll: string;
    pitch: string;
    yaw: string;
    contrast: string;
    landmarks: string;
    fps: string;
  };
}

export function FaceScanOverlay({ preview, scanProgress, metrics }: FaceScanOverlayProps) {
  return (
    <div className="relative aspect-[3/4] w-full max-w-[280px] rounded-2xl overflow-hidden border border-primary/30 bg-zinc-950/60 shadow-inner">
      {preview && (
        <img 
          src={preview} 
          alt="Selfie live scanning" 
          className="w-full h-full object-cover opacity-85 saturate-[1.1] contrast-[1.05]" 
        />
      )}

      {/* Pulsing face landmarks coordinate boxes */}
      {LANDMARK_POINTS.map((pt, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: scanProgress >= (i * 8) ? [0.4, 0.9, 0.4] : 0,
            scale: scanProgress >= (i * 8) ? [1, 1.3, 1] : 0 
          }}
          transition={{ repeat: Infinity, duration: 1.8, delay: i * 0.1 }}
          style={{ top: pt.top, left: pt.left }}
          className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary border border-black shadow-[0_0_8px_rgba(229,193,88,0.8)] z-30"
        />
      ))}

      {/* Custom Face Tracking Box Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute left-[15%] top-[15%] w-[70%] h-[65%] border-2 border-dashed border-primary/50 rounded-[32px] z-[25]"
      >
        {/* Corner Bracket Hooks */}
        <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-primary" />
        <div className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-primary" />
        <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-primary" />
        <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-primary" />
        
        {/* Laser Scanner Line Bar */}
        <motion.div
          initial={{ top: '0%' }}
          animate={{ top: '100%' }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_rgba(229,193,88,0.9)] z-20"
        />
      </motion.div>

      {/* Scan coordinates digital indicators */}
      <div className="absolute bottom-3 left-3 inset-x-3 bg-black/80 backdrop-blur-md border border-primary/20 rounded-lg p-2.5 z-30 font-mono text-[9px] text-zinc-300 leading-normal flex flex-wrap justify-between gap-1.5 shadow-xl">
        <div>ROLL: <span className="text-primary font-bold">{metrics.roll}</span></div>
        <div>PITCH: <span className="text-primary font-bold">{metrics.pitch}</span></div>
        <div>YAW: <span className="text-primary font-bold">{metrics.yaw}</span></div>
        <div>CONTRAST: <span className="text-primary font-bold">{metrics.contrast}</span></div>
        <div>POINTS: <span className="text-primary font-bold">{metrics.landmarks}/68</span></div>
      </div>
    </div>
  );
}
