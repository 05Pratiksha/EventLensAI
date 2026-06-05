"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, CheckCircle2, RefreshCw, Sparkles, TrendingUp, UserCheck, Eye, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

// 1. MATCH CONFIDENCE BADGE
interface MatchConfidenceBadgeProps {
  score: number;
  className?: string;
}

export function MatchConfidenceBadge({ score, className }: MatchConfidenceBadgeProps) {
  // Color styling based on score
  const isExcellent = score >= 95;
  const isHigh = score >= 88 && score < 95;
  
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${
      isExcellent 
        ? 'bg-amber-500/10 border-primary/30 text-primary shadow-[0_0_15px_rgba(229,193,88,0.1)]' 
        : isHigh
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
          : 'bg-zinc-500/10 border-zinc-500/30 text-muted-foreground'
    } ${className}`}>
      <Sparkles className={`w-3 h-3 ${isExcellent ? 'animate-pulse' : ''}`} />
      <span>{score.toFixed(1)}% AI Confidence</span>
    </div>
  );
}

// 2. FACE SCAN OVERLAY (Animated Laser + Detection squares)
interface FaceScanOverlayProps {
  isScanning: boolean;
  onScanComplete?: () => void;
}

export function FaceScanOverlay({ isScanning }: FaceScanOverlayProps) {
  if (!isScanning) return null;

  // Static mock biometric focus dots coordinates
  const dots = [
    { top: '30%', left: '42%' },
    { top: '30%', left: '58%' },
    { top: '48%', left: '50%' },
    { top: '65%', left: '38%' },
    { top: '65%', left: '62%' },
    { top: '68%', left: '50%' },
  ];

  return (
    <div className="absolute inset-0 z-20 pointer-events-none select-none overflow-hidden">
      {/* Holographic glowing scan laser */}
      <motion.div
        initial={{ y: '-10%' }}
        animate={{ y: '110%' }}
        transition={{
          repeat: Infinity,
          duration: 2.2,
          ease: "easeInOut"
        }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_12px_rgba(229,193,88,0.85)] z-20"
      />
      
      {/* Dynamic green HUD grid mesh overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(229,193,88,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(229,193,88,0.03)_1px,transparent_1px)] bg-[size:16px_16px] opacity-80" />

      {/* Biometric Scanning Facial Outlines */}
      <AnimatePresence>
        {isScanning && (
          <>
            {/* Main Face Box frame */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-[30%] top-[20%] w-[40%] h-[55%] border-2 border-dashed border-primary/60 rounded-3xl"
            >
              {/* Corner brackets */}
              <div className="absolute -top-[2px] -left-[2px] w-4 h-4 border-t-2 border-l-2 border-primary" />
              <div className="absolute -top-[2px] -right-[2px] w-4 h-4 border-t-2 border-r-2 border-primary" />
              <div className="absolute -bottom-[2px] -left-[2px] w-4 h-4 border-b-2 border-l-2 border-primary" />
              <div className="absolute -bottom-[2px] -right-[2px] w-4 h-4 border-b-2 border-r-2 border-primary" />
              
              {/* Pulsing AI text tag */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-background/80 backdrop-blur-md px-2 py-0.5 rounded border border-primary/40 text-[9px] font-black tracking-widest text-primary uppercase animate-pulse">
                Facial Vector Mapping
              </div>
            </motion.div>

            {/* Target dots flashing */}
            {dots.map((dot, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.7] }}
                transition={{ delay: i * 0.15, duration: 0.6, repeat: Infinity, repeatDelay: 1.5 }}
                className="absolute w-2 h-2 rounded-full bg-primary/80 border border-black shadow-[0_0_8px_rgba(229,193,88,0.9)]"
                style={{ top: dot.top, left: dot.left }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// 3. AI QUEUE STATUS
interface AIQueueStatusProps {
  totalFiles: number;
  processedFiles: number;
  status: 'idle' | 'queued' | 'scanning' | 'complete';
}

export function AIQueueStatus({ totalFiles, processedFiles, status }: AIQueueStatusProps) {
  const percent = totalFiles > 0 ? Math.min(100, Math.round((processedFiles / totalFiles) * 100)) : 0;

  return (
    <div className="p-5 rounded-2xl bg-secondary/35 border border-border/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.01)] backdrop-blur-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${
            status === 'complete' ? 'bg-emerald-500/10 text-emerald-400' :
            status === 'scanning' ? 'bg-primary/10 text-primary animate-pulse' :
            'bg-zinc-500/10 text-muted-foreground'
          }`}>
            {status === 'complete' ? <CheckCircle2 className="w-4 h-4" /> : <Cpu className="w-4 h-4" />}
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
              {status === 'complete' ? 'Processing Complete' : 
               status === 'scanning' ? 'Neural Vector Extraction' : 'Idle Indexing Engine'}
            </h4>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {status === 'complete' ? 'All portraits indexed.' :
               status === 'scanning' ? `Analyzing coordinates (${processedFiles}/${totalFiles} files)` : 'Standby mode.'}
            </p>
          </div>
        </div>
        <Badge variant={status === 'complete' ? 'success' : status === 'scanning' ? 'warning' : 'secondary'} className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5">
          {status}
        </Badge>
      </div>

      {status !== 'idle' && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-muted-foreground">Biometric Alignment Rate</span>
            <span className="text-foreground font-bold">{percent}%</span>
          </div>
          <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.4 }}
              className="h-full bg-gradient-to-r from-primary to-[#A38A4D]"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// 4. AI PROCESSING CARD
interface AIProcessingCardProps {
  eventName: string;
  totalPhotos: number;
  matchedFaces: number;
  status: 'idle' | 'scanning' | 'syncing' | 'complete';
  progressPercent?: number;
}

export function AIProcessingCard({ eventName, totalPhotos, matchedFaces, status, progressPercent = 0 }: AIProcessingCardProps) {
  return (
    <Card className="border-primary/10 shadow-[0_0_30px_rgba(229,193,88,0.02)] relative overflow-hidden bg-secondary/35">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/30 via-primary to-primary/30" />
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold tracking-wide uppercase flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            AI Biometric Index
          </CardTitle>
          <Badge variant={status === 'complete' ? 'success' : 'warning'} className="text-[8px] uppercase tracking-widest font-black px-2 py-0.5">
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Active Album Directory</span>
          <span className="text-sm font-semibold text-foreground truncate block mt-0.5">{eventName}</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-background/50 border border-border rounded-xl">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block">Scanned Assets</span>
            <span className="text-lg font-black font-mono text-foreground mt-0.5 block">{totalPhotos}</span>
          </div>
          <div className="p-3 bg-background/50 border border-border rounded-xl">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block">Identified Guest Faces</span>
            <span className="text-lg font-black font-mono text-primary mt-0.5 block">{matchedFaces}</span>
          </div>
        </div>

        {status !== 'complete' && (
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-muted-foreground flex items-center gap-1">
                <RefreshCw className="w-3 h-3 text-primary animate-spin" />
                Extracting facial coordinate vectors...
              </span>
              <span className="text-primary font-bold">{progressPercent}%</span>
            </div>
            <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {status === 'complete' && (
          <div className="p-3 bg-emerald-500/[0.02] border border-emerald-500/10 rounded-xl flex items-center gap-2.5 text-xs text-emerald-400">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Biometric indexes secure. Ready for immediate guest search.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// 5. AI ACTIVITY TIMELINE
export interface AIActivity {
  id: string;
  type: 'upload' | 'match' | 'publish' | 'system';
  title: string;
  timestamp: string;
  confidence?: number;
}

export function AIActivityTimeline({ activities }: { activities: AIActivity[] }) {
  return (
    <div className="relative pl-6 border-l border-border space-y-6 py-2">
      {activities.map((activity, idx) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="relative"
        >
          {/* Timeline node marker dot */}
          <div className={`absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full border-2 bg-background flex items-center justify-center ${
            activity.type === 'match' ? 'border-primary ring-4 ring-primary/10' :
            activity.type === 'upload' ? 'border-sky-500 ring-4 ring-sky-500/10' :
            activity.type === 'publish' ? 'border-emerald-500 ring-4 ring-emerald-500/10' :
            'border-muted-foreground'
          }`} />

          <div className="flex flex-col gap-1 text-left">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-semibold text-foreground leading-tight">
                {activity.title}
              </span>
              <span className="text-[9px] text-muted-foreground font-mono shrink-0">
                {activity.timestamp}
              </span>
            </div>
            
            <div className="flex items-center gap-2 mt-0.5">
              {activity.type === 'match' && activity.confidence && (
                <div className="inline-flex items-center gap-1 text-[9px] font-bold text-primary tracking-wide">
                  <UserCheck className="w-3 h-3" />
                  <span>Matched with {activity.confidence}% precision</span>
                </div>
              )}
              {activity.type === 'upload' && (
                <div className="inline-flex items-center gap-1 text-[9px] font-bold text-sky-400 tracking-wide">
                  <Layers className="w-3 h-3" />
                  <span>RAW assets imported</span>
                </div>
              )}
              {activity.type === 'publish' && (
                <div className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-400 tracking-wide">
                  <Eye className="w-3 h-3" />
                  <span>Public gallery active</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
