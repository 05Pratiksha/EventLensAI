import { Event, Photo, Stat, Activity } from '@/types';

export const mockEvents: Event[] = [
  {
    id: 'evt_1',
    slug: 'tech-conference-2024',
    title: 'Global Tech Conference 2024',
    date: 'Oct 15, 2024',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070',
    status: 'Published',
    type: 'Conference',
    photoCount: 1250,
    matchedCount: 843,
    description: 'Annual gathering of tech leaders and innovators.',
    visibility: 'Public',
  },
  {
    id: 'evt_2',
    slug: 'sarah-james-wedding',
    title: 'Sarah & James Wedding',
    date: 'Nov 02, 2024',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070',
    status: 'Processing',
    type: 'Wedding',
    photoCount: 850,
    description: 'Beautiful autumn wedding at the estate.',
    visibility: 'Private',
  },
  {
    id: 'evt_3',
    slug: 'corporate-retreat-q4',
    title: 'Acme Corp Q4 Retreat',
    date: 'Dec 10, 2024',
    coverImage: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=2070',
    status: 'Draft',
    type: 'Corporate',
    photoCount: 0,
    visibility: 'Private',
  },
];

export const mockStats: Stat[] = [
  { label: 'Total Events', value: '24', change: '+3 this month', trend: 'up' },
  { label: 'Photos Indexed', value: '45.2K', change: '+12.5K this month', trend: 'up' },
  { label: 'AI Matches', value: '18.4K', change: '+5.2K this month', trend: 'up' },
  { label: 'Storage Used', value: '142 GB', change: 'of 1 TB plan', trend: 'up' },
];

export const mockActivities: Activity[] = [
  { id: 'act_1', type: 'upload', title: 'Uploaded 450 photos to Tech Conference', timestamp: '2 hours ago', eventId: 'evt_1' },
  { id: 'act_2', type: 'match', title: 'AI matched 120 guests in Sarah & James Wedding', timestamp: '5 hours ago', eventId: 'evt_2' },
  { id: 'act_3', type: 'publish', title: 'Published Tech Conference 2024 gallery', timestamp: '1 day ago', eventId: 'evt_1' },
];

export const mockPhotos: Photo[] = [
  {
    id: 'p_1',
    eventId: 'evt_1',
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400',
    uploadedAt: '2024-10-15T10:00:00Z',
    matchScore: 99.8,
  },
  {
    id: 'p_2',
    eventId: 'evt_1',
    url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=400',
    uploadedAt: '2024-10-15T10:05:00Z',
    matchScore: 95.4,
  },
  {
    id: 'p_3',
    eventId: 'evt_1',
    url: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1000',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=400',
    uploadedAt: '2024-10-15T10:10:00Z',
    matchScore: 92.1,
  },
  {
    id: 'p_4',
    eventId: 'evt_1',
    url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000',
    thumbnailUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=400',
    uploadedAt: '2024-10-15T10:15:00Z',
    matchScore: 88.5,
  }
];
