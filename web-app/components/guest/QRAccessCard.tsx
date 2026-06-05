"use client";

import { QrCode, Copy, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useToastStore } from '@/store/useToastStore';

interface QRAccessCardProps {
  eventSlug: string;
}

export function QRAccessCard({ eventSlug }: QRAccessCardProps) {
  const { addToast } = useToastStore();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/event/${eventSlug}`);
    addToast({
      type: 'success',
      message: 'Link Copied',
      description: 'Event access link copied to clipboard.',
      duration: 3000
    });
  };

  return (
    <Card className="glass-luxury border-border/40 shadow-xl backdrop-blur-2xl mt-8 mx-auto max-w-lg">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-xl bg-white p-2 shrink-0 border border-border/50">
            {/* Mock QR Code Pattern */}
            <div className="w-full h-full relative" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundSize: '8px 8px', backgroundPosition: '0 0, 4px 4px' }}>
              <div className="absolute top-0 left-0 w-4 h-4 bg-black border-[3px] border-white" />
              <div className="absolute top-0 right-0 w-4 h-4 bg-black border-[3px] border-white" />
              <div className="absolute bottom-0 left-0 w-4 h-4 bg-black border-[3px] border-white" />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-sm font-bold text-foreground flex items-center justify-center sm:justify-start gap-1.5 mb-1">
              <QrCode className="w-4 h-4 text-primary" />
              Event Access QR
            </h3>
            <p className="text-[10px] text-muted-foreground mb-4">
              Share this QR code or link with other guests so they can find their portraits too.
            </p>
            <div className="flex gap-2 justify-center sm:justify-start">
              <Button variant="outline" className="h-8 text-[10px] px-3" onClick={handleCopyLink}>
                <Copy className="w-3 h-3 mr-1.5" />
                Copy Link
              </Button>
              <Button variant="outline" className="h-8 text-[10px] px-3">
                <Share2 className="w-3 h-3 mr-1.5" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
