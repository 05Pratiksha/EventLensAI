// Mock Event Photos Database for the Premium 3D Floating Carousel

export interface HeroPhoto {
  id: string;
  image: string;
  label: string;
  matchScore: string;
  confidence: number;
  category: string;
  photographer: string;
}

export const HERO_PHOTOS: HeroPhoto[] = [
  {
    id: "bride-Sarah",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=500",
    label: "Bride Portrait",
    matchScore: "99.8% Match",
    confidence: 99.8,
    category: "Luna Wedding Gala",
    photographer: "Marcus Sterling"
  },
  {
    id: "couple-Gala",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=500",
    label: "Golden Hour Dance",
    matchScore: "98.5% Match",
    confidence: 98.5,
    category: "Sunset Reception",
    photographer: "Marcus Sterling"
  },
  {
    id: "keynote-Speaker",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=500",
    label: "Marcus Keynote",
    matchScore: "97.2% Match",
    confidence: 97.2,
    category: "Aether Tech Summit",
    photographer: "Clara Croft"
  },
  {
    id: "concert-Emma",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500",
    label: "VIP Front Row",
    matchScore: "96.4% Match",
    confidence: 96.4,
    category: "Neon Pulse Fest",
    photographer: "DJ Horizon"
  },
  {
    id: "crowd-Festival",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=500",
    label: "Audience Cheer",
    matchScore: "94.9% Match",
    confidence: 94.9,
    category: "Sunset Stage",
    photographer: "DJ Horizon"
  },
  {
    id: "group-Corporate",
    image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=500",
    label: "Co-Founders Panel",
    matchScore: "92.1% Match",
    confidence: 92.1,
    category: "Vanguard Forum",
    photographer: "Clara Croft"
  }
];

export const SELFIE_PHOTO = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500";
