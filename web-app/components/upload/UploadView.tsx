"use client";

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { UploadDropzone } from '@/components/upload/UploadDropzone';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { api } from '@/services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Sparkles, Cpu, Layers } from 'lucide-react';
import { FaceScanOverlay } from '@/components/dashboard/AIProcessingComponents';
import { useToastStore } from '@/store/useToastStore';

interface UploadingFile {
  id: string;
  name: string;
  size: string;
  type: string;
  progress: number;
  previewUrl: string;
  isScanning: boolean;
  isCompleted: boolean;
}

export function UploadView() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<UploadingFile[]>([]);
  const { addToast } = useToastStore();

  const handleUpload = (files: File[]) => {
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadComplete(false);
    
    // Prepare local queue structure
    const initialFiles: UploadingFile[] = files.map((file, idx) => ({
      id: `up_${idx}_${Date.now()}`,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      type: file.name.split('.').pop()?.toUpperCase() || 'RAW',
      progress: 0,
      previewUrl: URL.createObjectURL(file),
      isScanning: false,
      isCompleted: false
    }));
    
    setUploadFiles(initialFiles);

    // Progressive upload logic for each file
    initialFiles.forEach((upFile, fileIdx) => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 12) + 6;
        
        setUploadFiles(prev => prev.map(f => {
          if (f.id === upFile.id) {
            const nextProgress = Math.min(100, currentProgress);
            const triggerScan = nextProgress === 100 && !f.isCompleted && !f.isScanning;
            
            if (triggerScan) {
              // Trigger laser mapping simulation
              setTimeout(() => {
                setUploadFiles(innerPrev => innerPrev.map(innerF => {
                  if (innerF.id === upFile.id) {
                    return { ...innerF, isScanning: false, isCompleted: true };
                  }
                  return innerF;
                }));
                
                addToast({
                  message: 'Biometric Index Secure',
                  description: `Scanned and mapped coordinates for: ${upFile.name}`,
                  type: 'success',
                });
              }, 2800);

              return { ...f, progress: 100, isScanning: true };
            }
            
            return { ...f, progress: nextProgress };
          }
          return f;
        }));

        if (currentProgress >= 100) {
          clearInterval(interval);
        }
      }, 350 + fileIdx * 80);
    });

    // Check complete state periodically
    const checkInterval = setInterval(() => {
      setUploadFiles(latest => {
        const allDone = latest.every(f => f.isCompleted);
        if (allDone && latest.length > 0) {
          clearInterval(checkInterval);
          setIsUploading(false);
          setUploadComplete(true);
        }
        return latest;
      });
    }, 1000);
  };

  return (
    <DashboardLayout>
      <SectionHeader 
        title="Upload Media" 
        description="Upload photos for AI processing and gallery creation."
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Supported Photographic Badge Row */}
        <div className="flex flex-wrap items-center gap-2 p-4 rounded-2xl bg-secondary/15 border border-border/50 text-left">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mr-2 flex items-center gap-1.5 shrink-0">
            <Layers className="w-3.5 h-3.5 text-primary" />
            Ingestion Codecs:
          </span>
          {['JPG', 'PNG', 'HEIC', 'TIFF', 'RAW'].map(codec => (
            <Badge key={codec} variant="outline" className="border-border bg-background/50 text-[9px] font-bold text-zinc-300 px-2.5 py-0.5">
              {codec}
            </Badge>
          ))}
        </div>

        {/* Select Event Folder */}
        <Card className="text-left bg-secondary/35 border-border/80">
          <CardContent className="p-6">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-2">Select Target Album Directory</label>
            <select className="w-full max-w-md h-10 rounded-xl border border-border bg-secondary px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/45 focus-visible:border-primary/50 transition-all cursor-pointer">
              <option className="bg-secondary text-foreground">Global Tech Conference 2024</option>
              <option className="bg-secondary text-foreground">Sarah & James Wedding</option>
            </select>
          </CardContent>
        </Card>

        {/* Dynamic dropzone workspace */}
        <Card className="border-primary/10 shadow-[0_0_40px_rgba(229,193,88,0.02)] relative overflow-hidden glass-luxury border rounded-2xl shadow-xl backdrop-blur-md">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-accent to-primary" />
          <CardContent className="p-8 text-left">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
              <div>
                <h3 className="text-xl font-bold text-foreground">Drop files here</h3>
                <p className="text-muted-foreground text-xs mt-0.5">Neural face engines automatically scan identities upon complete loading.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-zinc-400 font-mono">Sync Status:</span>
                <Badge variant={isUploading ? 'warning' : 'secondary'} className="text-[8px] uppercase tracking-widest px-2 py-0.5">
                  {isUploading ? 'indexing' : 'standby'}
                </Badge>
              </div>
            </div>
            
            <UploadDropzone 
              onUpload={handleUpload} 
              isUploading={isUploading} 
              progress={0} 
            />
          </CardContent>
        </Card>

        {/* Simulated Progressive Upload & Scan Queue Grid */}
        {uploadFiles.length > 0 && (
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-border/40 pb-2">
              <h4 className="text-sm font-bold text-foreground uppercase tracking-widest flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary animate-pulse" />
                Ingestion Registry Queue ({uploadFiles.length} files)
              </h4>
              {isUploading && <span className="text-[10px] text-primary animate-pulse font-mono">Facial coordinates vector mapping active...</span>}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {uploadFiles.map((f) => (
                <div 
                  key={f.id}
                  className="glass-luxury rounded-2xl border border-border/60 overflow-hidden bg-secondary/35 p-3 flex flex-col justify-between h-48 relative group"
                >
                  {/* Holographic Laser Scanner Overlay when scanning */}
                  {f.isScanning && (
                    <div className="absolute inset-0 z-20 rounded-2xl overflow-hidden bg-black/40 backdrop-blur-[0.5px]">
                      <FaceScanOverlay isScanning={true} />
                    </div>
                  )}

                  {/* Complete success overlay check */}
                  {f.isCompleted && (
                    <div className="absolute top-2 right-2 z-[25] bg-emerald-500 text-black rounded-full p-1 shadow-md shadow-black/25">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#060608]" />
                    </div>
                  )}

                  {/* Portrait Thumbnail Thumbnail preview */}
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-border/40 bg-zinc-950 shrink-0">
                    <img src={f.previewUrl} alt={f.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="mt-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-[10px] text-white truncate max-w-[100px]">{f.name}</span>
                        <Badge variant="outline" className="border-white/5 bg-black/40 text-[7px] font-black uppercase tracking-wider py-0 px-1 text-zinc-300">
                          {f.type}
                        </Badge>
                      </div>
                      <span className="text-[9px] text-muted-foreground font-mono mt-0.5 block">{f.size}</span>
                    </div>

                    <div className="space-y-1 mt-2">
                      <div className="flex justify-between items-center text-[8px] font-mono">
                        <span className="text-muted-foreground">
                          {f.isCompleted ? 'Biometrics cataloged' : f.isScanning ? 'Mapping facial mesh...' : 'Uploading...'}
                        </span>
                        <span className="text-foreground font-bold">{f.progress}%</span>
                      </div>
                      <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                          style={{ width: `${f.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence>
          {uploadComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl flex items-center gap-3 text-left"
            >
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
              <div className="flex-1">
                <p className="font-bold text-sm">Upload & AI Index Complete!</p>
                <p className="text-xs opacity-80 mt-0.5">All assets successfully uploaded, facial template indices verified and encrypted.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
