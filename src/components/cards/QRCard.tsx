import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Download, Share2 } from 'lucide-react';

interface QRCardProps {
  url: string;
  eventName: string;
}

export function QRCard({ url, eventName }: QRCardProps) {
  return (
    <Card className="overflow-hidden bg-gradient-to-b from-white/5 to-transparent">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <h3 className="font-semibold mb-1">Guest Access</h3>
        <p className="text-sm text-muted-foreground mb-6">Scan to find photos for {eventName}</p>
        
        <div className="bg-white p-4 rounded-xl mb-6 shadow-xl shadow-blue-500/10 border border-white/20">
          {/* Mock QR Code using an image placeholder */}
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`} 
            alt="Event QR Code"
            className="w-32 h-32"
          />
        </div>

        <div className="flex gap-2 w-full">
          <Button variant="outline" className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" className="flex-1">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
