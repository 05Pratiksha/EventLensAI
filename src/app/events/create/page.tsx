"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { UploadDropzone } from '@/components/upload/UploadDropzone';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';
import { api } from '@/services/api';
import Link from 'next/link';

export default function CreateEventPage() {
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
  });  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const newEvent = await api.events.create(formData);
      router.push(`/events/${newEvent.id}`);
    } catch (error) {
      console.error('Failed to create event:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <Link href="/events" className="inline-flex items-center text-sm text-muted-foreground hover:text-white mb-6">
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
                <Sparkles className="w-5 h-5 text-blue-500" />
                Basic Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-white">Event Title</label>
                  <Input 
                    name="title"
                    placeholder="e.g. Sarah & James Wedding" 
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Event Type</label>
                  <select 
                    name="type"
                    className="w-full h-10 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option className="bg-background">Wedding</option>
                    <option className="bg-background">Corporate</option>
                    <option className="bg-background">Party</option>
                    <option className="bg-background">Conference</option>
                    <option className="bg-background">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Date</label>
                  <Input 
                    name="date"
                    type="date" 
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-white">Description (Optional)</label>
                  <textarea 
                    name="description"
                    className="w-full h-24 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                    placeholder="Brief details about the event..."
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-6">
              <h3 className="text-lg font-semibold">Cover Image</h3>
              <p className="text-sm text-muted-foreground mb-4">Upload a banner image that will be shown to guests.</p>
              <UploadDropzone />
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
