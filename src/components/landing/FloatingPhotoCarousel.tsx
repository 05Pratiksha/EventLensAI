"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, MotionValue } from "framer-motion";
import { Camera, Sparkles, Check, X } from "lucide-react";
import { HERO_PHOTOS, SELFIE_PHOTO, HeroPhoto } from "@/data/heroPhotos";

// Dedicated child component for 3D billboarded orbit cards to satisfy React Rules of Hooks
function OrbitCard({
  photo,
  rotation,
  offsetAngle,
  radius,
  onFocus,
}: {
  photo: HeroPhoto;
  rotation: MotionValue<number>;
  offsetAngle: number;
  radius: number;
  onFocus: (photo: HeroPhoto) => void;
}) {
  const rotateY = useTransform(rotation, (r: number) => -(offsetAngle + r));

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transformStyle: "preserve-3d",
        transform: `translate(-50%, -50%) rotateY(${offsetAngle}deg) translateZ(${radius}px)`,
      }}
      className="pointer-events-auto"
    >
      <motion.div
        style={{
          rotateY,
        }}
        whileHover={{ 
          scale: 1.12, 
          y: -10,
          boxShadow: "0 0 30px rgba(139,92,246,0.3)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={(e) => {
          e.stopPropagation();
          onFocus(photo);
        }}
        className="relative w-28 md:w-32 p-2.5 rounded-2xl bg-[#0D0B12]/80 border border-white/5 backdrop-blur-md cursor-pointer group shadow-[0_15px_30px_rgba(0,0,0,0.5)] transition-colors hover:border-violet-500/40"
      >
        <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-neutral-900 border border-white/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo.image} alt={photo.label} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          
          <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/60 border border-white/10 text-[7px] font-black text-zinc-300 uppercase tracking-wider">
            Matched
          </div>
        </div>

        <div className="mt-2 text-center">
          <span className="text-[8px] font-extrabold text-violet-300 bg-violet-950/40 border border-violet-500/20 px-2 py-0.5 rounded uppercase tracking-widest block">
            {photo.matchScore}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

// Pre-generate random background particles outside component to satisfy React 19 absolute purity requirements
const CAROUSEL_PARTICLES = [...Array(15)].map((_, i) => ({
  id: i,
  x: Math.random() * 400 - 200,
  y: Math.random() * 400 - 200,
  opacity: 0.1 + Math.random() * 0.3,
  scale: 0.5 + Math.random() * 0.8,
  animateY: Math.random() * -120 - 40,
  animateX: Math.random() * 50 - 25,
  duration: 10 + Math.random() * 12,
}));

export default function FloatingPhotoCarousel() {
  const [focusedCard, setFocusedCard] = useState<HeroPhoto | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scanActive, setScanActive] = useState(false);
  
  const rotation = useMotionValue(0);
  const radius = isMobile ? 150 : 250; // Orbit radius in pixels

  // Detect mobile size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Continuous slow rotation loop
  useEffect(() => {
    if (focusedCard) return; // Pause rotation when card is zoomed in

    // Uniform speed around the orbit, slower on hover
    const currentVal = rotation.get();
    const duration = isHovered ? 80 : 35; // Hovering slows down the carousel
    const remainingDegrees = 360 - (currentVal % 360);
    const stepDuration = duration * (remainingDegrees / 360);

    const controls = animate(rotation, [currentVal, currentVal + remainingDegrees], {
      ease: "linear",
      duration: stepDuration,
      onComplete: () => {
        // loop indefinitely
        const loop = animate(rotation, [rotation.get(), rotation.get() + 360], {
          ease: "linear",
          duration: isHovered ? 80 : 35,
          repeat: Infinity
        });
        return () => loop.stop();
      }
    });

    return () => controls.stop();
  }, [focusedCard, isHovered, rotation]);

  // Activate facial sweep laser whenever focused card opens
  useEffect(() => {
    if (!focusedCard) return;
    
    // Set scan active in next tick to avoid synchronous execution in effect mount
    const pTimer = setTimeout(() => {
      setScanActive(true);
    }, 0);
    
    const timer = setTimeout(() => setScanActive(false), 2200);
    return () => {
      clearTimeout(pTimer);
      clearTimeout(timer);
    };
  }, [focusedCard]);

  // Click on background or press escape resets zoom
  const handleReset = () => {
    setFocusedCard(null);
  };

  return (
    <div 
      className="w-full h-[500px] md:h-[600px] relative overflow-hidden bg-gradient-to-b from-[#0A0A0B]/40 to-black/80 rounded-3xl border border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.85)] backdrop-blur-sm cursor-default flex items-center justify-center select-none"
      style={{ perspective: 1200 }}
    >
      {/* 1. Global keyframe styles for glowing lasers */}
      <style jsx global>{`
        @keyframes sweepLaser {
          0% { top: 0%; opacity: 0.8; }
          50% { top: 100%; opacity: 0.8; }
          100% { top: 0%; opacity: 0.8; }
        }
        .laser-sweep-beam {
          animation: sweepLaser 2.2s ease-in-out infinite;
        }
      `}</style>

      {/* 2. Premium Radial Neon Gradients */}
      <div className="absolute top-1/4 left-1/4 w-60 h-60 rounded-full bg-cyan-600/10 blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-violet-600/10 blur-[120px] pointer-events-none z-0" />
      
      {/* 3. Soft Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {CAROUSEL_PARTICLES.map((p) => (
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
            className={`absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full ${
              p.id % 2 === 0 ? "bg-cyan-500/25" : "bg-violet-500/25"
            }`}
          />
        ))}
      </div>

      {/* 4. Clickable background to close active focused view */}
      {focusedCard && (
        <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm transition-all duration-500" onClick={handleReset} />
      )}

      {/* DESKTOP/TABLET 3D CIRCULAR ORBIT CAROUSEL VIEW */}
      {!isMobile ? (
        <div 
          className="relative w-full h-full flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* A. Central Selfie Photo (The Anchor) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            {/* Glowing Scan Ring behind Selfie */}
            <div className="absolute inset-0 m-auto w-32 h-32 rounded-full border border-cyan-500/30 flex items-center justify-center">
              <motion.div 
                animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0.1, 0.6] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute w-full h-full rounded-full border-2 border-cyan-400/20"
              />
              <motion.div 
                animate={{ scale: [1.1, 1.25, 1.1], rotate: 360 }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                className="absolute w-[110%] h-[110%] rounded-full border border-dashed border-violet-500/30"
              />
            </div>

            {/* Selfie Glass Card */}
            <div className="relative p-2 rounded-2xl bg-[#090D14]/85 border border-cyan-500/30 shadow-[0_15px_30px_rgba(6,182,212,0.15)] flex flex-col items-center">
              <div className="w-20 h-24 rounded-xl overflow-hidden bg-neutral-900 border border-white/5 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={SELFIE_PHOTO} alt="Your Selfie" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Selfie scan sweeps */}
                <motion.div 
                  animate={{ y: ["-10%", "110%", "-10%"] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute left-0 right-0 h-0.5 bg-cyan-400 z-10 shadow-[0_0_8px_#22d3ee]"
                />
              </div>
              <span className="text-[8px] font-black text-cyan-400 uppercase tracking-widest mt-1.5">
                Your Selfie
              </span>
            </div>
          </div>

          {/* B. SVG Animated Matches Laser Paths (Only drawn when card is focused) */}
          <AnimatePresence>
            {focusedCard && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-15" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.line 
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  x1="50" 
                  y1="50" 
                  x2="50" 
                  y2="30" 
                  stroke="#a78bfa" 
                  strokeWidth="0.4"
                  strokeDasharray="2 4"
                  className="animate-pulse"
                />
              </svg>
            )}
          </AnimatePresence>

          {/* C. Rotating Orbit Wrapper */}
          <motion.div
            style={{
              rotateY: rotation,
              transformStyle: "preserve-3d",
            }}
            className="w-full h-full absolute flex items-center justify-center pointer-events-none z-10"
          >
            {HERO_PHOTOS.map((photo, index) => {
              const offsetAngle = (360 / HERO_PHOTOS.length) * index;
              const isCardFocused = focusedCard?.id === photo.id;
              
              // Skip rendering here if focused (it mounts in a dedicated front overlay)
              if (isCardFocused) return null;

              return (
                <OrbitCard
                  key={photo.id}
                  photo={photo}
                  rotation={rotation}
                  offsetAngle={offsetAngle}
                  radius={radius}
                  onFocus={setFocusedCard}
                />
              );
            })}
          </motion.div>
        </div>
      ) : (
        /* MOBILE VIEWPORT: HORIZONTAL CARD SLIDER / GALLERY SWIPE */
        <div className="w-full px-6 flex flex-col items-center justify-center space-y-6 z-10">
          <div className="flex gap-4 overflow-x-auto py-6 px-4 scrollbar-none snap-x max-w-full items-center">
            {HERO_PHOTOS.map((photo) => (
              <motion.div
                key={photo.id}
                onClick={() => setFocusedCard(photo)}
                whileTap={{ scale: 0.95 }}
                className="snap-center flex-shrink-0 w-44 p-3 rounded-2xl bg-[#0D0B12]/90 border border-white/5 shadow-2xl relative"
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.image} alt={photo.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 flex flex-col">
                    <span className="text-[9px] text-zinc-400 font-bold">{photo.category}</span>
                    <span className="text-[10px] text-white font-extrabold truncate">{photo.label}</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[8px] font-black text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded uppercase">
                    {photo.matchScore}
                  </span>
                  <span className="text-[8px] text-zinc-500 font-bold">Tap to Match</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="inline-flex items-center gap-2 text-zinc-500 text-xs">
            <Camera className="w-4 h-4 text-cyan-400 animate-pulse" />
            Swipe cards to review AI matches
          </div>
        </div>
      )}

      {/* 5. DRAMATIC CLICK FOCUS OVERLAY PANELS */}
      <AnimatePresence>
        {focusedCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, z: 200 }}
            animate={{ opacity: 1, scale: 1, z: 300 }}
            exit={{ opacity: 0, scale: 0.85, z: 200 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="absolute z-30 max-w-[340px] md:max-w-[420px] w-full p-4 md:p-6 bg-gradient-to-b from-[#0D0A14] to-[#08080C] border border-violet-500/30 rounded-3xl shadow-[0_0_60px_rgba(139,92,246,0.25)] flex flex-col md:flex-row items-center gap-6"
          >
            {/* Close Button overlay */}
            <button 
              onClick={handleReset}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Left Column: Focused Photo Card with Biometric sweep */}
            <div className="relative w-40 md:w-44 shrink-0 shadow-2xl">
              <div className="p-3 bg-neutral-950/80 border border-white/10 rounded-2xl">
                <div className="aspect-[3/4] w-full rounded-xl overflow-hidden relative bg-neutral-900 border border-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={focusedCard.image} alt="Focused portrait" className="w-full h-full object-cover" />
                  
                  {/* Sweep scan bar overlay */}
                  {scanActive && (
                    <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#06b6d4] z-20 laser-sweep-beam" />
                  )}
                </div>

                {/* Match confidence badge */}
                <div className="mt-3 text-center">
                  <div className="inline-flex items-center gap-1.5 py-0.5 px-3 rounded-full bg-violet-500/20 border border-violet-500/40 text-[9px] font-black text-violet-300 uppercase tracking-widest shadow-lg">
                    <Check className="w-3 h-3 text-violet-400" />
                    {focusedCard.matchScore}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: AI Scan Match Details */}
            <div className="flex-1 space-y-4 text-left w-full">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest block">AI Match Complete</span>
                <h4 className="text-lg font-black text-white leading-tight">{focusedCard.label}</h4>
                <p className="text-[10px] text-zinc-500 font-bold">{focusedCard.category}</p>
              </div>

              {/* Neural scan report grid */}
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <span className="text-zinc-500 text-[10px] font-bold">Biometric Precision</span>
                  <span className="text-white font-mono font-bold">99.86% Strict</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <span className="text-zinc-500 text-[10px] font-bold">Photographer</span>
                  <span className="text-zinc-300 font-bold">{focusedCard.photographer}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <span className="text-zinc-500 text-[10px] font-bold">Status</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Ready to Save
                  </span>
                </div>
              </div>

              {/* Action */}
              <button 
                onClick={handleReset}
                className="w-full h-9 rounded-xl text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-95 text-white flex items-center justify-center gap-1.5 shadow-lg shadow-violet-500/10 cursor-pointer"
              >
                Return to Circular Ring
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
