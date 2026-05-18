// Realistic mock database for EventLens AI Settings & White Label Dashboard

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Staff" | "Viewer";
  status: "Active" | "Pending";
  avatar: string;
}

export interface SessionLog {
  id: string;
  device: string;
  ip: string;
  location: string;
  active: boolean;
}

export interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "Paid" | "Pending" | "Failed";
}

export interface SettingsData {
  // General Profile
  studioName: string;
  ownerName: string;
  email: string;
  phone: string;
  profilePhoto: string;

  // Branding / White Label
  logo: string;
  brandColor: string;
  fontStyle: string;
  bannerImage: string;
  watermarkText: string;
  watermarkEnabled: boolean;
  customDomain: string;

  // Gallery Options
  isPublic: boolean;
  allowDownloads: boolean;
  watermarkOnPhotos: boolean;
  guestUploadAllowed: boolean;
  imageQuality: "standard" | "high" | "original";
  layoutStyle: "grid" | "masonry" | "justified";

  // AI & Processing
  faceMatchingSensitivity: number;
  autoIndexing: boolean;
  processingStatus: "idle" | "indexing" | "syncing";
  processedCount: number;
  totalCount: number;
  queueCount: number;

  // Notifications
  emailNotifications: boolean;
  whatsappNotifications: boolean;
  eventPublishedAlerts: boolean;
  aiMatchReadyAlerts: boolean;
  downloadNotifications: boolean;

  // Billing & Subscription
  plan: "Free" | "Pro" | "Enterprise";
  billingCycle: "monthly" | "annually";
  storageUsedGB: number;
  storageTotalGB: number;
  aiMatchesUsed: number;
  aiMatchesTotal: number;
  paymentHistory: Invoice[];

  // Security & Privacy
  consentCollection: boolean;
  twoFactorEnabled: boolean;
  sessions: SessionLog[];

  // Team members
  members: TeamMember[];
}

export const mockSettings: SettingsData = {
  // General Profile
  studioName: "Luna Aperture Studios",
  ownerName: "Marcus Sterling",
  email: "marcus@lunaaperture.com",
  phone: "+1 (555) 382-9012",
  profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",

  // Branding / White Label
  logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200", // abstract glass logo
  brandColor: "#8b5cf6", // default violet
  fontStyle: "Outfit",
  bannerImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800", // wedding banner
  watermarkText: "© LUNA APERTURE STUDIOS",
  watermarkEnabled: true,
  customDomain: "gallery.lunaaperture.com",

  // Gallery Options
  isPublic: false,
  allowDownloads: true,
  watermarkOnPhotos: true,
  guestUploadAllowed: true,
  imageQuality: "original",
  layoutStyle: "masonry",

  // AI & Processing
  faceMatchingSensitivity: 0.88,
  autoIndexing: true,
  processingStatus: "idle",
  processedCount: 14250,
  totalCount: 14250,
  queueCount: 0,

  // Notifications
  emailNotifications: true,
  whatsappNotifications: true,
  eventPublishedAlerts: true,
  aiMatchReadyAlerts: true,
  downloadNotifications: false,

  // Billing & Subscription
  plan: "Pro",
  billingCycle: "annually",
  storageUsedGB: 842,
  storageTotalGB: 2000,
  aiMatchesUsed: 42500,
  aiMatchesTotal: 100000,
  paymentHistory: [
    { id: "INV-2026-004", date: "2026-05-01", amount: "$79.00", status: "Paid" },
    { id: "INV-2026-003", date: "2026-04-01", amount: "$79.00", status: "Paid" },
    { id: "INV-2026-002", date: "2026-03-01", amount: "$79.00", status: "Paid" },
  ],

  // Security & Privacy
  consentCollection: true,
  twoFactorEnabled: false,
  sessions: [
    { id: "sess-1", device: "MacBook Pro - Chrome", ip: "192.168.1.45", location: "New York, USA", active: true },
    { id: "sess-2", device: "iPhone 15 Pro - Mobile Safari", ip: "172.56.21.90", location: "New York, USA", active: false },
    { id: "sess-3", device: "Windows Desktop - Brave Browser", ip: "108.45.2.11", location: "Los Angeles, USA", active: false },
  ],

  // Team members
  members: [
    { id: "tm-1", name: "Marcus Sterling", email: "marcus@lunaaperture.com", role: "Admin", status: "Active", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150" },
    { id: "tm-2", name: "Helena Rostova", email: "helena@lunaaperture.com", role: "Staff", status: "Active", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150" },
    { id: "tm-3", name: "Devon Carter", email: "devon@lunaaperture.com", role: "Viewer", status: "Pending", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150" },
  ],
};
