export type EventStatus = 'Draft' | 'Processing' | 'Published';

export interface Event {
  id: string;
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  status: EventStatus;
  type: string;
  photoCount: number;
  matchedCount?: number;
  description?: string;
  visibility: 'Public' | 'Private';
}

export interface Photo {
  id: string;
  eventId: string;
  url: string;
  thumbnailUrl: string;
  uploadedAt: string;
  matchScore?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Studio Owner' | 'Guest';
  avatar?: string;
  studioName?: string;
}

export interface Stat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

export interface Activity {
  id: string;
  type: 'upload' | 'match' | 'publish' | 'download';
  title: string;
  timestamp: string;
  eventId?: string;
}
