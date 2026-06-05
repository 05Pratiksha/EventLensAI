"use client";

import { Check, Loader2, Cpu, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaceScanOverlay } from './FaceScanOverlay';

const DIAGNOSTIC_STEPS = [
  { label: 'Initializing Biometric Engine', subtext: 'Connecting to neural index registry...' },
  { label: 'Face Orientation Check', subtext: 'Roll/Pitch/Yaw alignment check' },
  { label: 'Pupil Focus Validation', subtext: 'Iris tracking & focus lock' },
  { label: 'Illumination Analysis', subtext: 'Optimizing shadow and contrast levels' },
  { label: '128D Vector Extraction', subtext: 'Mapping facial landmarks coordinate' },
  { label: 'Catalog Search Match', subtext: 'Scanning event image directory database' }
];

interface AIProcessingLoaderProps {
  isScanning: boolean;
  scanProgress: number;
  preview: string | null;
  metrics: {
    roll: string;
    pitch: string;
    yaw: string;
    contrast: string;
    landmarks: string;
    fps: string;
  };
}

export function AIProcessingLoader({ isScanning, scanProgress, preview, metrics }: AIProcessingLoaderProps) {
  const currentStepIndex = Math.min(
    Math.floor(scanProgress / (100 / DIAGNOSTIC_STEPS.length)),
    DIAGNOSTIC_STEPS.length - 1
  );

  return (
    <AnimatePresence>
      {isScanning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/96 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-left"
        >
          {/* Holographic Glowing Matrix Mesh Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(229,193,88,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(229,193,88,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-80" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
          
          <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
            
            {/* Left Column: Interactive Biometric Image Scan Frame */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center bg-black/40 rounded-3xl border border-primary/20 p-6 relative aspect-square overflow-hidden shadow-[0_0_50px_rgba(229,193,88,0.04)]">
              
              {/* Tech HUD Accents */}
              <div className="absolute top-4 left-4 text-[9px] font-mono text-primary/60 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                <span>BIOMETRIC_FEED: LIVE</span>
              </div>
              <div className="absolute top-4 right-4 text-[9px] font-mono text-primary/60">
                FPS: {metrics.fps}
              </div>
              
              {/* Face Scanning Camera Preview Container */}
              <FaceScanOverlay preview={preview} scanProgress={scanProgress} metrics={metrics} />

              {/* Subtext info */}
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-4 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-primary animate-pulse" />
                Neural Coordinate Extraction Engine
              </p>
            </div>

            {/* Right Column: Steps list & Vector alignment parameters */}
            <div className="lg:col-span-6 flex flex-col justify-between p-2">
              <div>
                <div className="mb-6">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-1">BIOMETRIC EXTRACTION PIPELINE</span>
                  <h2 className="text-2xl font-black text-white tracking-tight uppercase">Analyzing Face Print</h2>
                  <p className="text-xs text-muted-foreground mt-1">Extracting localized geometry indices to search matching directory sets.</p>
                </div>

                {/* Step list UI with micro-states */}
                <div className="space-y-3.5">
                  {DIAGNOSTIC_STEPS.map((step, idx) => {
                    const isCompleted = idx < currentStepIndex;
                    const isActive = idx === currentStepIndex;
                    const isPending = idx > currentStepIndex;

                    return (
                      <div 
                        key={idx}
                        className={`p-3 rounded-xl border transition-all duration-300 flex items-center justify-between gap-4 ${
                          isCompleted ? 'bg-emerald-500/[0.02] border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.01)]' :
                          isActive ? 'bg-primary/5 border-primary/30 shadow-[0_0_20px_rgba(229,193,88,0.03)] scale-[1.01]' :
                          'bg-background border-border/40 opacity-40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Diagnostic status icon indicator */}
                          <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                            isCompleted ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                            isActive ? 'bg-primary/10 border-primary/30 text-primary' :
                            'bg-zinc-800 border-zinc-700 text-zinc-500'
                          }`}>
                            {isCompleted ? (
                              <Check className="w-4 h-4 stroke-[3px]" />
                            ) : isActive ? (
                              <Loader2 className="w-4 h-4 animate-spin text-primary" />
                            ) : (
                              <span className="text-[10px] font-bold">{idx + 1}</span>
                            )}
                          </div>
                          
                          <div className="text-left">
                            <div className={`text-xs font-bold ${isActive ? 'text-white' : isCompleted ? 'text-zinc-200' : 'text-zinc-400'}`}>
                              {step.label}
                            </div>
                            <div className="text-[9px] text-muted-foreground mt-0.5 leading-none">
                              {step.subtext}
                            </div>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="text-right">
                          {isCompleted && (
                            <span className="text-[9px] text-emerald-400 font-black uppercase tracking-wider">PASSED</span>
                          )}
                          {isActive && (
                            <span className="text-[9px] text-primary font-black uppercase tracking-wider animate-pulse">RUNNING</span>
                          )}
                          {isPending && (
                            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">QUEUED</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Progress bar footer */}
              <div className="mt-8 pt-6 border-t border-border/40 space-y-4 text-left">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-400">PIPELINE ALIGNMENT PROGRESS</span>
                  <span className="text-primary font-black">{Math.round(scanProgress)}%</span>
                </div>
                
                <div className="h-2 w-full bg-border/50 rounded-full overflow-hidden border border-border/30">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-primary via-amber-400 to-[#A38A4D]"
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ ease: 'easeOut' }}
                  />
                </div>

                <div className="flex gap-2 p-3 bg-zinc-950/60 border border-border/30 rounded-xl text-[10px] text-zinc-400 leading-normal items-start">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>The extracted coordinate vectors are strictly compared transiently inside your sandbox memory, satisfying compliance models.</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
