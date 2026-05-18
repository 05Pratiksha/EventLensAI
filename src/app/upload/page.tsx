"use client";

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { UploadDropzone } from '@/components/upload/UploadDropzone';
import { Card, CardContent } from '@/components/ui/Card';
import { AIStatusBadge } from '@/components/cards/AIStatusBadge';
import { api } from '@/services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function MediaUploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleUpload = async (files: File[]) => {
    setIsUploading(true);
    setUploadComplete(false);
    setProgress(0);
    
    try {
      await api.photos.upload(files, (p) => setProgress(p));
      setUploadComplete(true);
      setTimeout(() => setUploadComplete(false), 5000);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <DashboardLayout>
      <SectionHeader 
        title="Upload Media" 
        description="Upload photos for AI processing and gallery creation."
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Select Event (Mock dropdown for now) */}
        <Card>
          <CardContent className="p-6">
            <label className="text-sm font-medium text-white block mb-2">Select Event to Upload To</label>
            <select className="w-full max-w-md h-10 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <option className="bg-background">Global Tech Conference 2024</option>
              <option className="bg-background">Sarah & James Wedding</option>
            </select>
          </CardContent>
        </Card>

        {/* Upload Area */}
        <Card className="border-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.1)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold mb-1 text-white">Drop files here</h3>
                <p className="text-muted-foreground text-sm">Our AI will automatically scan and match faces as you upload.</p>
              </div>
              <AIStatusBadge status={isUploading ? 'scanning' : 'idle'} />
            </div>
            
            <UploadDropzone 
              onUpload={handleUpload} 
              isUploading={isUploading} 
              progress={progress} 
            />
          </CardContent>
        </Card>

        <AnimatePresence>
          {uploadComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl flex items-center gap-3"
            >
              <CheckCircle2 className="w-5 h-5" />
              <div className="flex-1">
                <p className="font-semibold">Upload Complete!</p>
                <p className="text-sm opacity-80">Photos have been successfully uploaded and are queued for AI processing.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
