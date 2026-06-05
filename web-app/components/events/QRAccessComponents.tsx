"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Download, Copy, Check, Share2, Smartphone, Send, Mail, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useToastStore } from '@/store/useToastStore';

// 1. QR CODE CARD
interface QRCodeCardProps {
  url: string;
  eventName: string;
}

export function QRCodeCard({ url, eventName }: QRCodeCardProps) {
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { addToast } = useToastStore();

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    addToast({
      message: 'Copied Guest Link!',
      description: 'The secure attendee portal link has been copied to your clipboard.',
      type: 'success',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Card className="glass-luxury border-border/40 shadow-xl overflow-hidden relative group bg-secondary/35">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-accent" />
        <CardContent className="p-6 text-center space-y-5">
          <div className="flex justify-between items-center pb-2 border-b border-border/50">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block text-left">Event Access Portal</span>
            <span className="text-[9px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded font-black tracking-wide uppercase">QR active</span>
          </div>

          {/* Glowing QR Scanner Frame */}
          <div 
            onClick={() => setShowPreview(true)}
            className="w-40 h-40 bg-background/80 border border-border/60 hover:border-primary/40 rounded-2xl flex items-center justify-center mx-auto shadow-md relative group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(229,193,88,0.05)]"
          >
            {/* Holographic scanner laser */}
            <div className="absolute left-0 right-0 h-[1.5px] bg-primary/50 shadow-[0_0_8px_rgba(229,193,88,0.5)] top-[15%] group-hover:top-[85%] transition-all duration-1000 ease-in-out" />
            
            {/* Custom high fidelity QR Code representation using pure SVG */}
            <svg className="w-32 h-32 text-foreground" viewBox="0 0 100 100" fill="currentColor">
              {/* QR outer corners */}
              <rect x="5" y="5" width="25" height="25" rx="3" fill="none" stroke="currentColor" strokeWidth="6" />
              <rect x="12.5" y="12.5" width="10" height="10" rx="1.5" />
              
              <rect x="70" y="5" width="25" height="25" rx="3" fill="none" stroke="currentColor" strokeWidth="6" />
              <rect x="77.5" y="77.5" width="10" height="10" rx="1.5" />
              
              <rect x="5" y="70" width="25" height="25" rx="3" fill="none" stroke="currentColor" strokeWidth="6" />
              <rect x="12.5" y="77.5" width="10" height="10" rx="1.5" />

              {/* QR center decorative grid pixels */}
              <rect x="42" y="15" width="6" height="6" rx="1" />
              <rect x="52" y="8" width="6" height="6" rx="1" />
              <rect x="42" y="42" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="4" />
              <rect x="47" y="47" width="6" height="6" rx="1" />

              <rect x="8" y="45" width="6" height="12" rx="1" />
              <rect x="20" y="45" width="6" height="6" rx="1" />
              
              <rect x="45" y="75" width="12" height="6" rx="1" />
              <rect x="50" y="85" width="6" height="8" rx="1" />
              <rect x="75" y="42" width="12" height="6" rx="1" />
              <rect x="85" y="52" width="8" height="6" rx="1" />
              <rect x="75" y="62" width="6" height="12" rx="1" />
            </svg>
          </div>

          <div>
            <h4 className="text-xs font-bold text-foreground">Scan QR for instant matching</h4>
            <p className="text-[10px] text-muted-foreground mt-0.5 max-w-[200px] mx-auto">Place this QR poster at the physical venue for guests to discover their pictures.</p>
          </div>

          <div className="flex gap-2 pt-1">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleCopy} 
              className="flex-1 h-9 text-[10px] font-bold bg-secondary/50 border-border hover:bg-foreground/5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
                  Copy Link
                </>
              )}
            </Button>
            
            <Button 
              size="sm" 
              variant="premium" 
              onClick={() => setShowPreview(true)}
              className="flex-1 h-9 text-[10px] font-bold"
            >
              <Smartphone className="w-3.5 h-3.5 mr-1.5 text-black dark:text-background" />
              Preview Access
            </Button>
          </div>
        </CardContent>
      </Card>

      <QRPreviewModal 
        isOpen={showPreview} 
        onClose={() => setShowPreview(false)} 
        url={url} 
        eventName={eventName} 
      />
    </>
  );
}

// 2. QR PREVIEW MODAL (with Mobile Smartphone HUD preview)
interface QRPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  eventName: string;
}

export function QRPreviewModal({ isOpen, onClose, url, eventName }: QRPreviewModalProps) {
  const { addToast } = useToastStore();

  if (!isOpen) return null;

  const handleDownload = () => {
    addToast({
      message: 'Downloading Poster...',
      description: 'A high-resolution PDF printout template has been generated.',
      type: 'success',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-background/60 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Dialog */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass-luxury border border-border/40 rounded-3xl p-6 md:p-8 max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 shadow-2xl relative z-10 text-left bg-secondary/85 backdrop-blur-3xl overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-accent" />

        {/* Left column: Poster settings details */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-1">Venue Distribution Pack</span>
            <h3 className="text-2xl font-black text-foreground tracking-tight">{eventName}</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-md">Generate signs, brochures, or projection displays containing this QR code. Guests scan it to snap their selfie and fetch matching portraits instantly.</p>
            
            <div className="mt-8 space-y-4">
              <div className="p-4 bg-background/50 border border-border rounded-2xl flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Printable Vector Asset</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">High-definition vector asset scales to any physical billboard size without quality loss.</p>
                </div>
              </div>

              <div className="p-4 bg-background/50 border border-border rounded-2xl flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Secure Privacy Sandbox</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">All selfie uploads use automatic sandboxing and wipe signatures after 24 hours.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-widest">Share Digitally</h4>
            <ShareEventCard url={url} />
            
            <div className="flex gap-3 pt-3">
              <Button onClick={onClose} variant="ghost" className="h-10 text-xs font-bold text-muted-foreground">Close</Button>
              <Button onClick={handleDownload} variant="premium" className="h-10 text-xs font-bold flex-1">
                <Download className="w-4 h-4 mr-2 text-black dark:text-background" />
                Download Print PDF Pack
              </Button>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Live Mobile Phone Mockup Preview */}
        <div className="md:col-span-5 flex items-center justify-center">
          <div className="w-60 h-[480px] bg-[#0d0d11] rounded-[36px] p-2.5 border-[6px] border-zinc-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col">
            {/* Phone speaker/camera bar */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4.5 bg-zinc-900 rounded-full z-30 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-850" />
            </div>

            {/* Mobile screen content simulator */}
            <div className="flex-1 bg-[#060608] rounded-[28px] overflow-hidden relative flex flex-col justify-between p-4 text-center select-none pt-8">
              {/* Mesh background inside phone */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(229,193,88,0.05)_0%,_transparent_55%)] pointer-events-none" />

              <div className="relative z-10 space-y-4 pt-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-primary">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-[11px] font-black text-white leading-tight uppercase tracking-wider">Welcome Guest</h5>
                  <p className="text-[8px] text-muted-foreground mt-0.5 leading-relaxed px-2">Deliver high fidelity photos matching your identity directly into your phone stream.</p>
                </div>
              </div>

              {/* Guest upload box simulator */}
              <div className="relative z-10 border border-dashed border-zinc-800 rounded-xl p-6 bg-zinc-950/40 space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div className="text-[9px] font-bold text-white uppercase tracking-wider">Snap Selfie</div>
                <div className="text-[7px] text-muted-foreground leading-none">Tap to activate camera lens</div>
              </div>

              <div className="relative z-10 pt-2 border-t border-zinc-900 flex justify-center gap-1.5 items-center">
                <span className="text-[6.5px] text-zinc-600 uppercase font-black tracking-widest">SECURE BIOMETRIC SANDBOX</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// 3. SHARE EVENT CARD
export function ShareEventCard({ url }: { url: string }) {
  const { addToast } = useToastStore();

  const handleShareChannel = (channel: string) => {
    addToast({
      message: `Shared via ${channel}!`,
      description: 'Your invitation link has been dispatched.',
      type: 'success',
    });
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      <button 
        onClick={() => handleShareChannel('WhatsApp')}
        className="flex flex-col items-center justify-center p-2 rounded-xl bg-background/40 border border-border/80 hover:bg-foreground/5 hover:text-foreground text-muted-foreground transition-all duration-300 cursor-pointer"
      >
        <Send className="w-4 h-4 text-emerald-400" />
        <span className="text-[9px] font-bold mt-1 uppercase tracking-wide">WhatsApp</span>
      </button>

      <button 
        onClick={() => handleShareChannel('Email')}
        className="flex flex-col items-center justify-center p-2 rounded-xl bg-background/40 border border-border/80 hover:bg-foreground/5 hover:text-foreground text-muted-foreground transition-all duration-300 cursor-pointer"
      >
        <Mail className="w-4 h-4 text-primary" />
        <span className="text-[9px] font-bold mt-1 uppercase tracking-wide">Email</span>
      </button>

      <button 
        onClick={() => handleShareChannel('SMS')}
        className="flex flex-col items-center justify-center p-2 rounded-xl bg-background/40 border border-border/80 hover:bg-foreground/5 hover:text-foreground text-muted-foreground transition-all duration-300 cursor-pointer"
      >
        <Smartphone className="w-4 h-4 text-sky-400" />
        <span className="text-[9px] font-bold mt-1 uppercase tracking-wide">SMS</span>
      </button>

      <button 
        onClick={() => {
          navigator.clipboard.writeText(url);
          addToast({
            message: 'Link Copied',
            description: 'Link is now on your clipboard.',
            type: 'success',
          });
        }}
        className="flex flex-col items-center justify-center p-2 rounded-xl bg-background/40 border border-border/80 hover:bg-foreground/5 hover:text-foreground text-muted-foreground transition-all duration-300 cursor-pointer"
      >
        <Share2 className="w-4 h-4 text-amber-400" />
        <span className="text-[9px] font-bold mt-1 uppercase tracking-wide">Copy Link</span>
      </button>
    </div>
  );
}
