"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Camera, Sparkles, QrCode } from "lucide-react";

// Safe dynamic import to prevent Next.js SSR hydration mismatches
const HeroCanvas = dynamic(
  () => import("../landing/FloatingPhotoCarousel"),
  {
    ssr: false,
    loading: () => <HeroFallback />
  }
);

// Fallback skeleton while R3F Canvas resolves/loads
function HeroFallback() {
  return (
    <div className="w-full h-full min-h-[450px] lg:min-h-[550px] flex items-center justify-center relative overflow-hidden bg-secondary/60 rounded-3xl border border-border backdrop-blur-sm">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/10 via-transparent to-cyan-900/10" />

      {/* Floating 2D representations in place of 3D scene */}
      <div className="absolute top-[20%] left-[10%] w-24 h-32 rounded-lg border border-border bg-foreground/5 rotate-[-12deg] flex items-center justify-center opacity-40 animate-pulse">
        <Camera className="w-6 h-6 text-blue-400" />
      </div>
      <div className="absolute bottom-[20%] right-[10%] w-24 h-32 rounded-lg border border-border bg-foreground/5 rotate-[15deg] flex items-center justify-center opacity-40 animate-pulse">
        <QrCode className="w-6 h-6 text-purple-400" />
      </div>

      {/* Center scan simulation */}
      <div className="relative flex flex-col items-center">
        {/* Pulsing circular scanning ring */}
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-40 h-40 rounded-full border-2 border-dashed border-violet-500/50 flex items-center justify-center"
        >
          <motion.div 
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-32 h-32 rounded-full border border-cyan-500/40 bg-cyan-500/5 flex items-center justify-center"
          >
            <Sparkles className="w-8 h-8 text-violet-400 animate-pulse" />
          </motion.div>
        </motion.div>
        <span className="mt-4 text-xs tracking-wider text-muted-foreground font-mono uppercase animate-pulse">
          Loading 3D Engine...
        </span>
      </div>
    </div>
  );
}

export default function HeroCanvasWrapper() {
  return (
    <div className="w-full h-full relative z-10">
      <HeroCanvas />
    </div>
  );
}
