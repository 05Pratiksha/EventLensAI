import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Download, Share2 } from 'lucide-react';

interface QRCardProps {
  url: string;
  eventName: string;
}

export function QRCard({ url, eventName }: QRCardProps) {
  return (
    <Card className="overflow-hidden bg-gradient-to-b from-primary/[0.02] to-transparent border border-white/[0.04] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)]">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <h3 className="font-semibold mb-1 text-white tracking-wide">Guest Access</h3>
        <p className="text-xs text-muted-foreground mb-6">Scan to find photos for {eventName}</p>
        
        <div className="bg-white p-4.5 rounded-2xl mb-6 shadow-xl shadow-primary/5 border border-[#E5C158]/20 transition-all hover:scale-102 duration-300">
          {/* Mock QR Code using an image placeholder */}
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`} 
            alt="Event QR Code"
            className="w-32 h-32 select-none"
          />
        </div>

        <div className="flex gap-2.5 w-full">
          <Button variant="outline" className="flex-1 text-xs">
            <Download className="w-3.5 h-3.5 mr-2" />
            Save
          </Button>
          <Button variant="outline" className="flex-1 text-xs">
            <Share2 className="w-3.5 h-3.5 mr-2" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
