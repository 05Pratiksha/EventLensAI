import { Event, Photo } from '@/types';
import { mockEvents, mockPhotos } from '@/data/mockData';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  events: {
    list: async (): Promise<Event[]> => {
      await delay(800);
      return mockEvents;
    },
    get: async (slugOrId: string): Promise<Event | undefined> => {
      await delay(500);
      return mockEvents.find(e => e.slug === slugOrId || e.id === slugOrId);
    },
    create: async (data: Partial<Event>): Promise<Event> => {
      await delay(1000);
      const newEvent: Event = {
        id: `evt_${Math.random().toString(36).substr(2, 9)}`,
        slug: data.title?.toLowerCase().replace(/ /g, '-') || 'new-event',
        title: data.title || 'New Event',
        date: data.date || new Date().toISOString(),
        coverImage: data.coverImage || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070',
        status: 'Draft',
        type: data.type || 'Other',
        photoCount: 0,
        visibility: data.visibility || 'Private',
        description: data.description,
      };
      return newEvent;
    }
  },
  photos: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    match: async (_file: File): Promise<Photo[]> => {
      await delay(2000); // simulate AI processing
      return mockPhotos;
    },
    upload: async (files: File[], onProgress?: (progress: number) => void): Promise<void> => {
      // Simulate chunked upload
      for (let i = 0; i <= 100; i += 10) {
        await delay(300);
        if (onProgress) onProgress(i);
      }
    }
  }
};
