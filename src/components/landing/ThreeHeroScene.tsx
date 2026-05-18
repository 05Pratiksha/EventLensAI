"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Check } from "lucide-react";

// Premium event visual portraits from Unsplash
const PHOTOS = {
  selfie: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400",
  match1: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400", // Bride
  match2: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=400", // Couple
  match3: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400", // Emma
  gallery1: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=400", // Concert
  gallery2: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400", // Speaker
  gallery3: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400", // Festival
};

// Types for float photo cards
interface PhotoCardProps {
  src: string;
  label?: string;
  badge?: string;
  isSelfie?: boolean;
  isMatch?: boolean;
  className: string;
  depth: number;
  delay: number;
  duration: number;
}

// 2.5D Glassmorphic Photo Card Component
function GlassPhotoCard({
  src,
  label,
  badge,
  isSelfie = false,
  isMatch = false,
  className,
  depth,
  delay,
  duration,
}: PhotoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 15 }}
      animate={{ 
        opacity: isSelfie ? 0.95 : (isMatch ? 0.9 : 0.4), 
        scale: 1, 
        y: [0, -10, 0] 
      }}
      transition={{
        opacity: { duration: 0.6, delay: delay * 0.3 },
        scale: { duration: 0.6, delay: delay * 0.3 },
        y: {
          repeat: Infinity,
          duration: duration,
          ease: "easeInOut",
          delay: delay,
        }
      }}
      style={{
        transform: `translateZ(${depth}px)`,
        transformStyle: "preserve-3d",
      }}
      className={`absolute select-none group pointer-events-auto ${className}`}
    >
      {/* Glow Backlight Effect */}
      <div className={`absolute -inset-1 rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none ${
        isSelfie 
          ? "bg-cyan-500" 
          : isMatch 
            ? "bg-violet-500" 
            : "bg-white"
      }`} />

      {/* Main Glass Card Frame */}
      <div className={`relative p-2 rounded-2xl border backdrop-blur-md transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.55)] ${
        isSelfie 
          ? "bg-[#090D14]/70 border-cyan-500/40 shadow-cyan-900/10 scale-105" 
          : isMatch 
            ? "bg-[#0D0B12]/70 border-violet-500/30 shadow-violet-900/10 group-hover:border-violet-400/50" 
            : "bg-black/60 border-white/5 group-hover:border-white/15"
      }`}>
        
        {/* Rounded Image Container */}
        <div className="relative aspect-[3/4] w-24 md:w-28 rounded-xl overflow-hidden bg-neutral-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={src} 
            alt={label || "Event portrait"} 
            className="w-full h-full object-cover select-none pointer-events-none" 
            draggable={false}
          />

          {/* AI Face Scanning overlay inside Selfie Card */}
          {isSelfie && (
            <>
              {/* Vertical sweeping laser beam */}
              <motion.div 
                animate={{ y: ["-10%", "110%", "-10%"] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_#06b6d4] z-20"
              />
              
              {/* Corner targeting brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-cyan-400 rounded-tl-sm z-20 opacity-80" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-[1.5px] border-r-[1.5px] border-cyan-400 rounded-tr-sm z-20 opacity-80" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-[1.5px] border-l-[1.5px] border-cyan-400 rounded-bl-sm z-20 opacity-80" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-cyan-400 rounded-br-sm z-20 opacity-80" />
            </>
          )}
        </div>

        {/* Polaroid label text or matched Confidence Badge */}
        <div className="mt-2.5 px-1 flex flex-col items-center justify-center text-center">
          {badge ? (
            <div className="inline-flex items-center gap-1 py-0.5 px-2 rounded bg-violet-500/10 border border-violet-500/30 text-[8px] md:text-[9px] font-bold text-violet-300 uppercase tracking-widest shadow-sm shadow-violet-950/20">
              <Check className="w-2.5 h-2.5" />
              {badge}
            </div>
          ) : (
            <span className={`text-[8px] md:text-[9px] font-bold uppercase tracking-widest ${
              isSelfie ? "text-cyan-300" : "text-zinc-400 group-hover:text-zinc-300"
            }`}>
              {label}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Pre-generate random background particles outside component to satisfy React 19 absolute purity requirements
const HERO_PARTICLES = [...Array(12)].map((_, i) => ({
  id: i,
  x: Math.random() * 500 - 250,
  y: Math.random() * 500 - 250,
  opacity: 0.15 + Math.random() * 0.25,
  scale: 0.6 + Math.random() * 0.8,
  animateY: Math.random() * -100 - 50,
  animateX: Math.random() * 40 - 20,
  duration: 12 + Math.random() * 10,
}));

export default function ThreeHeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Framer Motion spring parallax setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 18 });

  // Soft pointer move handler
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize coordinates between -0.5 and 0.5
    const normX = (event.clientX - rect.left) / width - 0.5;
    const normY = (event.clientY - rect.top) / height - 0.5;
    
    mouseX.set(normX);
    mouseY.set(normY);
  };

  // Smooth return to center on mouse leave
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-[550px] relative overflow-hidden bg-[#0A0A0B]/60 rounded-3xl border border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.85)] backdrop-blur-[2px] cursor-default flex items-center justify-center select-none"
      style={{ perspective: 1200 }}
    >
      {/* 1. Global CSS Style Injections for Animated SVG stroke lines */}
      <style jsx global>{`
        @keyframes strokePulse {
          to {
            stroke-dashoffset: -20;
          }
        }
        .animate-optical-pulse {
          animation: strokePulse 1.8s linear infinite;
        }
        .animate-optical-pulse-slow {
          animation: strokePulse 4.5s linear infinite;
        }
      `}</style>

      {/* 2. Premium Radial Neon Gradients & Blur Elements in background */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-cyan-600/10 blur-[110px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-violet-600/10 blur-[130px] pointer-events-none z-0" />

      {/* Decorative center scan background matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(10,10,11,0.92)_100%)] pointer-events-none z-10" />

      {/* 3. Soft Floating Particle Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {HERO_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            initial={{ 
              x: p.x, 
              y: p.y, 
              opacity: p.opacity, 
              scale: p.scale 
            }}
            animate={{
              y: [null, p.animateY, null],
              x: [null, p.animateX, null],
            }}
            transition={{
              repeat: Infinity,
              duration: p.duration,
              ease: "easeInOut",
            }}
            className={`absolute left-1/2 top-1/2 w-2 h-2 rounded-full blur-[1px] ${
              p.id % 2 === 0 ? "bg-cyan-500/20" : "bg-violet-500/20"
            }`}
          />
        ))}
      </div>

      {/* 4. Interactive 3D perspective Parallax Wrapper */}
      <motion.div
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
        }}
        className="relative w-full h-full pointer-events-none"
      >
        {/* 5. Holographic Biometric Scan Circles (Behinds the selfie card) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
          {/* Outer glowing pulsing circle */}
          <motion.div 
            animate={{ scale: [0.95, 1.45], opacity: [0.65, 0] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: "easeOut" }}
            className="w-48 h-48 md:w-56 md:h-56 rounded-full border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.12)]"
          />
          {/* Inner expanding scan wave (phase offset) */}
          <motion.div 
            animate={{ scale: [0.95, 1.32], opacity: [0.55, 0] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: "easeOut", delay: 1.1 }}
            className="absolute inset-0 m-auto w-40 h-40 md:w-48 md:h-48 rounded-full border border-violet-500/25 shadow-[0_0_15px_rgba(167,139,250,0.08)]"
          />
          {/* Dotted target guide ring */}
          <motion.div 
            animate={{ scale: [1, 1.04, 1], opacity: [0.25, 0.45, 0.25] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="absolute inset-0 m-auto w-44 h-44 md:w-52 md:h-52 rounded-full border border-dashed border-cyan-400/20"
          />
        </div>

        {/* 6. Vector SVG Glowing Connection Paths (Radial Matching lines) */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-0" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          {/* Gradients for matching paths */}
          <defs>
            <linearGradient id="curveGradLeft" x1="50%" y1="50%" x2="20%" y2="25%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="curveGradRight" x1="50%" y1="50%" x2="80%" y2="30%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="curveGradBottom" x1="50%" y1="50%" x2="80%" y2="70%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Path 1: Selfie to Match 1 (Top Left) */}
          <path 
            d="M 50,50 Q 30,30 20,25" 
            stroke="url(#curveGradLeft)" 
            strokeWidth="0.25" 
            fill="none" 
            className="opacity-60"
          />
          <path 
            d="M 50,50 Q 30,30 20,25" 
            stroke="#a78bfa" 
            strokeWidth="0.35" 
            fill="none" 
            strokeDasharray="4 8" 
            className="animate-optical-pulse opacity-85"
          />

          {/* Path 2: Selfie to Match 2 (Top Right) */}
          <path 
            d="M 50,50 Q 70,35 80,30" 
            stroke="url(#curveGradRight)" 
            strokeWidth="0.25" 
            fill="none" 
            className="opacity-60"
          />
          <path 
            d="M 50,50 Q 70,35 80,30" 
            stroke="#a78bfa" 
            strokeWidth="0.35" 
            fill="none" 
            strokeDasharray="4 8" 
            className="animate-optical-pulse opacity-85"
          />

          {/* Path 3: Selfie to Match 3 (Bottom Right) */}
          <path 
            d="M 50,50 Q 70,62 80,70" 
            stroke="url(#curveGradBottom)" 
            strokeWidth="0.25" 
            fill="none" 
            className="opacity-60"
          />
          <path 
            d="M 50,50 Q 70,62 80,70" 
            stroke="#a78bfa" 
            strokeWidth="0.35" 
            fill="none" 
            strokeDasharray="4 8" 
            className="animate-optical-pulse opacity-85"
          />

          {/* Path 4-6: Ambient Faded Unmatched Paths (showing catalog search) */}
          <path 
            d="M 50,50 Q 30,68 18,72" 
            stroke="#ffffff" 
            strokeWidth="0.18" 
            fill="none" 
            strokeDasharray="6 12" 
            className="animate-optical-pulse-slow opacity-20"
          />
          <path 
            d="M 50,50 Q 42,22 38,15" 
            stroke="#ffffff" 
            strokeWidth="0.18" 
            fill="none" 
            strokeDasharray="6 12" 
            className="animate-optical-pulse-slow opacity-15"
          />
        </svg>

        {/* 7. Central Selfie Focus Card */}
        <GlassPhotoCard 
          src={PHOTOS.selfie} 
          label="Your Selfie" 
          isSelfie
          className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
          depth={60}
          delay={0}
          duration={4.5}
        />

        {/* 8. Matched Photos Cloud (Accented Violet Glass Cards) */}
        {/* Match 1: Top Left */}
        <GlassPhotoCard 
          src={PHOTOS.match1} 
          badge="98% Match" 
          isMatch
          className="left-[10%] top-[10%] z-20"
          depth={35}
          delay={0.4}
          duration={5.2}
        />

        {/* Match 2: Top Right */}
        <GlassPhotoCard 
          src={PHOTOS.match2} 
          badge="96% Match" 
          isMatch
          className="right-[8%] top-[18%] z-20"
          depth={45}
          delay={0.8}
          duration={4.8}
        />

        {/* Match 3: Bottom Right */}
        <GlassPhotoCard 
          src={PHOTOS.match3} 
          badge="92% Match" 
          isMatch
          className="right-[10%] bottom-[12%] z-20"
          depth={25}
          delay={1.2}
          duration={5.6}
        />

        {/* 9. Searched Gallery Background Catalog (Deep Faded Cards) */}
        {/* Event Photo A: Bottom Left */}
        <GlassPhotoCard 
          src={PHOTOS.gallery1} 
          label="Photo #104" 
          className="left-[8%] bottom-[18%] z-10"
          depth={-35}
          delay={0.6}
          duration={6.0}
        />

        {/* Event Photo B: Top Center */}
        <GlassPhotoCard 
          src={PHOTOS.gallery2} 
          label="Photo #819" 
          className="left-[38%] top-[6%] z-10"
          depth={-50}
          delay={1.5}
          duration={6.5}
        />

        {/* Event Photo C: Bottom Center */}
        <GlassPhotoCard 
          src={PHOTOS.gallery3} 
          label="Photo #504" 
          className="left-[41%] bottom-[6%] z-10"
          depth={-45}
          delay={2.0}
          duration={5.8}
        />
      </motion.div>
    </div>
  );
}
