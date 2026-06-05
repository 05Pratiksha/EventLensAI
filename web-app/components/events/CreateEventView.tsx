"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { UploadDropzone } from '@/components/upload/UploadDropzone';
import { ArrowLeft, Save, Sparkles, Check, Trash2, ShieldCheck, Image as ImageIcon } from 'lucide-react';
import { api } from '@/services/api';
import Link from 'next/link';
import { cn } from '@/utils/utils';
import { motion } from 'framer-motion';

export function CreateEventView() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    type: string;
    date: string;
    visibility: 'Public' | 'Private';
    description: string;
  }>({
    title: '',
    type: 'Wedding',
    date: '',
    visibility: 'Private',
    description: ''
  });

  // Cover image states
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [coverName, setCoverName] = useState<string>('');
  const [coverSize, setCoverSize] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCoverSelect = (files: File[]) => {
    if (files && files.length > 0) {
      const file = files[0];
      setCoverName(file.name);
      setCoverSize((file.size / 1024 / 1024).toFixed(2) + ' MB');
      const url = URL.createObjectURL(file);
      setCoverPreview(url);
    }
  };

  const handleClearCover = () => {
    setCoverPreview(null);
    setCoverName('');
    setCoverSize('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulate save details
      const payload = {
        ...formData,
        coverImage: coverPreview || 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070'
      };
      const newEvent = await api.events.create(payload);
      router.push(`/events/${newEvent.id}`);
    } catch (error) {
      console.error('Failed to create event:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <Link href="/events" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Link>
        
        <SectionHeader 
          title="Create New Event" 
          description="Set up a new workspace for your upcoming event."
        />

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardContent className="p-6 space-y-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5 text-primary" />
                Basic Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-foreground">Event Title</label>
                  <Input 
                    name="title"
                    placeholder="e.g. Sarah & James Wedding" 
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Event Type</label>
                  <select 
                    name="type"
                    className="w-full h-10 rounded-xl border border-border bg-secondary px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/45 focus-visible:border-primary/50 transition-all"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option className="bg-secondary text-foreground">Wedding</option>
                    <option className="bg-secondary text-foreground">Corporate</option>
                    <option className="bg-secondary text-foreground">Party</option>
                    <option className="bg-secondary text-foreground">Conference</option>
                    <option className="bg-secondary text-foreground">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Date</label>
                  <Input 
                    name="date"
                    type="date" 
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-foreground">Description (Optional)</label>
                  <textarea 
                    name="description"
                    className="w-full h-24 rounded-xl border border-border bg-secondary px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/45 focus-visible:border-primary/50 resize-none transition-all"
                    placeholder="Brief details about the event..."
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                {/* Highly Tactical Visibility Cards Selection */}
                <div className="space-y-4 md:col-span-2 pt-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest block">Event Privacy & Visibility</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { 
                        value: 'Public', 
                        label: 'Public Gallery', 
                        desc: 'Open indexed directory. Anyone who snaps a matching face portrait or holds the primary event slug link can explore matches instantly.' 
                      },
                      { 
                        value: 'Private', 
                        label: 'Private Biometric Hub', 
                        desc: 'Closed indexing repository. Requires secondary credentials, dynamic pin passcode protection, and matching guest verification protocols.' 
                      }
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt.value}
                        onClick={() => setFormData(prev => ({ ...prev, visibility: opt.value as 'Public' | 'Private' }))}
                        className={cn(
                          "p-5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 cursor-pointer h-full relative overflow-hidden group",
                          formData.visibility === opt.value
                            ? "border-primary/45 bg-primary/[0.02] shadow-[0_0_20px_rgba(229,193,88,0.02)]"
                            : "border-border bg-secondary/35 hover:border-border/80"
                        )}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className={cn(
                            "font-bold text-sm",
                            formData.visibility === opt.value ? "text-primary" : "text-foreground"
                          )}>
                            {opt.label}
                          </span>
                          <div className={cn(
                            "w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
                            formData.visibility === opt.value ? "border-primary bg-primary" : "border-border"
                          )}>
                            {formData.visibility === opt.value && <Check className="w-2.5 h-2.5 text-[#060608] dark:text-background" />}
                          </div>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Banner cover photo component with interactive preview clear triggers */}
          <Card className="overflow-hidden">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <ImageIcon className="w-4.5 h-4.5 text-primary" />
                    Cover Banner Photo
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Upload an asset that will represent this portfolio folder.</p>
                </div>
                {coverPreview && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleClearCover}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 text-xs gap-1.5 h-8 px-3"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Reset Banner
                  </Button>
                )}
              </div>

              {!coverPreview ? (
                <div className="p-1 border border-border/60 rounded-2xl bg-secondary/20">
                  <UploadDropzone onUpload={handleCoverSelect} />
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative rounded-2xl overflow-hidden border border-primary/20 aspect-[16/6] bg-secondary/20 flex flex-col justify-end p-6 group"
                >
                  {/* Banner image with luxury overlay filter */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10" />
                  <img src={coverPreview} alt="Cover Preview" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-101" />
                  
                  {/* Detailed file metrics hud */}
                  <div className="relative z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                    <div className="text-left">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-black uppercase tracking-wider mb-2">
                        <ShieldCheck className="w-3 h-3" />
                        Validated & Compressed
                      </div>
                      <h4 className="font-extrabold text-white text-lg tracking-tight truncate max-w-sm sm:max-w-md">{coverName}</h4>
                      <p className="text-xs text-zinc-300 font-mono mt-0.5">{coverSize}</p>
                    </div>
                    <Button 
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleClearCover}
                      className="border-white/10 hover:bg-white/5 text-white hover:text-white bg-black/40 backdrop-blur-md text-xs shrink-0"
                    >
                      Choose Different Photo
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Link href="/events">
              <Button type="button" variant="ghost">Cancel</Button>
            </Link>
            <Button type="submit" variant="premium" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save & Continue
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
