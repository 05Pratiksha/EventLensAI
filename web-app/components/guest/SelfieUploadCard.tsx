"use client";

import { Upload, Camera, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

interface SelfieUploadCardProps {
  preview: string | null;
  consent: boolean;
  isScanning: boolean;
  hasFile: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConsentChange: (consent: boolean) => void;
  onFindPhotos: () => void;
}

export function SelfieUploadCard({
  preview,
  consent,
  isScanning,
  hasFile,
  onFileChange,
  onConsentChange,
  onFindPhotos
}: SelfieUploadCardProps) {
  return (
    <Card className="glass-luxury border-border/40 shadow-2xl backdrop-blur-3xl">
      <CardContent className="p-8">
        <h2 className="text-xl font-bold mb-2 text-center text-gradient-luxury">Discover Your Portraits</h2>
        <p className="text-xs text-center text-muted-foreground mb-8">
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
              onChange={onFileChange}
            />
            <div className={`border border-dashed rounded-xl overflow-hidden transition-all duration-300 ${preview ? 'border-primary/50 bg-secondary/50' : 'border-border bg-secondary/35 hover:border-primary/40 hover:bg-secondary p-12 text-center'}`}>
              {preview ? (
                <div className="relative aspect-[3/4] max-h-64 mx-auto rounded-lg overflow-hidden border border-border">
                  <img src={preview} alt="Selfie preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-[25]">
                    <span className="text-white text-xs font-bold flex items-center"><Upload className="w-4 h-4 mr-2 text-primary" /> Change Photo</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-xs font-bold text-foreground dark:text-white mb-1 uppercase tracking-wider">Capture Selfie</p>
                  <p className="text-[10px] text-muted-foreground">or drag & drop from device gallery</p>
                </>
              )}
            </div>
          </div>

          {/* Consent */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-0.5 shrink-0">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded border border-border bg-input appearance-none checked:bg-primary checked:border-primary transition-all duration-300 cursor-pointer"
                checked={consent}
                onChange={(e) => onConsentChange(e.target.checked)}
              />
              {consent && <Check className="w-3.5 h-3.5 text-[#060608] dark:text-background absolute pointer-events-none stroke-[3px]" />}
            </div>
            <p className="text-[10px] text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
              I agree to AI face scanning for photo matching. My data will be deleted automatically after 24 hours.
            </p>
          </label>

          <Button 
            variant="premium" 
            className="w-full h-11 text-xs font-bold" 
            disabled={!hasFile || !consent || isScanning}
            onClick={onFindPhotos}
          >
            Find My Photos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
