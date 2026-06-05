"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, 
  Sparkles, 
  QrCode, 
  Image as ImageIcon, 
  Download, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Check,
  Search,
  UploadCloud,
  FileCheck,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/utils";
import HeroCanvasWrapper from "@/components/3d/HeroCanvasWrapper";
import { useTheme } from "@/providers/ThemeProvider";

// Data for features section
const features = [
  {
    title: "AI Face Matching",
    description: "Guests find their photos in seconds just by uploading a selfie. Instant recognition, zero manual indexing.",
    icon: Sparkles,
    color: "text-[#E5C158]",
    bg: "bg-[#E5C158]/10",
  },
  {
    title: "QR Event Access",
    description: "Generates custom QR codes for easy physical printouts. Seamless access for guests on their mobile devices.",
    icon: QrCode,
    color: "text-[#F7E7CE] dark:text-[#F7E7CE]",
    bg: "bg-[#F7E7CE]/10",
  },
  {
    title: "Smart Gallery",
    description: "Premium, dark, immersive media grids customized with automated sorting and facial detection tags.",
    icon: ImageIcon,
    color: "text-zinc-500 dark:text-zinc-300",
    bg: "bg-zinc-500/10 dark:bg-zinc-300/10",
  },
  {
    title: "Secure Downloads",
    description: "Dynamic watermarking, customizable delivery limits, and military-grade encryption.",
    icon: ShieldCheck,
    color: "text-[#A38A4D]",
    bg: "bg-[#A38A4D]/10",
  },
];

// Data for stepper
const steps = [
  {
    title: "Upload Event Photos",
    description: "Photographers drop raw catalogs into their private dashboard workspace.",
    icon: UploadCloud,
    color: "border-[#E5C158]/20 text-[#E5C158]"
  },
  {
    title: "AI Scans & Indexes",
    description: "Neural face engines extract templates and index identities securely.",
    icon: Search,
    color: "border-[#F7E7CE]/20 text-[#F7E7CE] dark:text-[#F7E7CE]"
  },
  {
    title: "Guest Uploads Selfie",
    description: "Visitors scan a card QR and snap a picture of their face.",
    icon: Camera,
    color: "border-zinc-500/20 text-zinc-600 dark:text-zinc-300"
  },
  {
    title: "Instant Secure Delivery",
    description: "Private matching gallery is generated immediately for safe downloads.",
    icon: FileCheck,
    color: "border-[#A38A4D]/20 text-[#A38A4D]"
  },
];

// Mock database for interactive demo
const mockSelfies = [
  {
    id: "bride",
    name: "Sarah (Bride)",
    avatar: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400",
    matches: [
      { url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600", match: "99.8%" },
      { url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600", match: "99.9%" },
      { url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600", match: "98.5%" },
    ]
  },
  {
    id: "speaker",
    name: "Marcus (Speaker)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
    matches: [
      { url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=600", match: "99.7%" },
      { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600", match: "99.1%" },
      { url: "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=600", match: "97.4%" },
    ]
  },
  {
    id: "concert",
    name: "Emma (Fan)",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
    matches: [
      { url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600", match: "99.6%" },
      { url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600", match: "98.9%" },
      { url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=600", match: "99.2%" },
    ]
  }
];

export default function LandingPageView() {
  const [selectedSelfie, setSelectedSelfie] = useState(mockSelfies[0]);
  const [isDemoScanning, setIsDemoScanning] = useState(false);
  const [showDemoResults, setShowDemoResults] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();

  // Smooth scroll handler
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const handleSelfieSelect = (selfie: typeof mockSelfies[0]) => {
    setSelectedSelfie(selfie);
    setIsDemoScanning(true);
    setShowDemoResults(false);
    
    // Simulate AI scan delay
    setTimeout(() => {
      setIsDemoScanning(false);
      setShowDemoResults(true);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/25 overflow-x-hidden font-sans">
      
      {/* 1. Premium Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#E5C158] to-[#A38A4D] flex items-center justify-center shadow-lg shadow-primary/10">
              <Camera className="w-4.5 h-4.5 text-[#060608]" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">EventLens <span className="text-primary font-medium">AI</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <button onClick={() => scrollTo("features")} className="hover:text-foreground transition-colors cursor-pointer">Features</button>
            <button onClick={() => scrollTo("how-it-works")} className="hover:text-foreground transition-colors cursor-pointer">How It Works</button>
            <button onClick={() => scrollTo("demo")} className="hover:text-foreground transition-colors cursor-pointer">Demo</button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Elegant SVG Theme Switcher */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-foreground/5 text-muted-foreground hover:text-foreground"
              title={`Theme: ${theme}`}
            >
              {isDark ? (
                <motion.svg
                  initial={{ rotate: -90, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  className="w-4.5 h-4.5 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m2.828 9.9a5 5 0 117.072 0l-7.072 0z" />
                </motion.svg>
              ) : (
                <motion.svg
                  initial={{ rotate: 90, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  className="w-4.5 h-4.5 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </motion.svg>
              )}
            </Button>

            <div className="hidden sm:flex items-center gap-2">
              <Link href="http://localhost:3001/login">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground h-9 px-4 text-xs font-medium">
                  Login
                </Button>
              </Link>
              <Link href="http://localhost:3001/signup">
                <Button variant="outline" className="border-border hover:bg-foreground/5 h-9 px-4 text-xs font-medium text-foreground">
                  Signup
                </Button>
              </Link>
              <Button 
                variant="premium" 
                onClick={() => scrollTo("demo")}
                className="h-9 px-4 text-xs"
              >
                Start Demo
              </Button>
            </div>

            {/* Responsive Hamburger Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden rounded-lg hover:bg-foreground/5 text-muted-foreground hover:text-foreground"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Sliding Mobile Menu Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg overflow-hidden transition-all duration-300"
            >
              <div className="px-6 py-6 flex flex-col gap-5 text-sm font-medium">
                <button onClick={() => scrollTo("features")} className="text-left py-2 border-b border-border/50 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Features</button>
                <button onClick={() => scrollTo("how-it-works")} className="text-left py-2 border-b border-border/50 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">How It Works</button>
                <button onClick={() => scrollTo("demo")} className="text-left py-2 border-b border-border/50 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Demo</button>
                
                <div className="flex flex-col gap-3 pt-3">
                  <div className="flex gap-3">
                    <Link href="http://localhost:3001/login" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full text-muted-foreground text-xs py-2.5">
                        Login
                      </Button>
                    </Link>
                    <Link href="http://localhost:3001/signup" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full text-foreground border-border text-xs py-2.5">
                        Signup
                      </Button>
                    </Link>
                  </div>
                  <Button 
                    variant="premium" 
                    onClick={() => scrollTo("demo")}
                    className="w-full py-2.5 text-xs font-bold"
                  >
                    Start Demo
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden min-h-screen flex items-center">
        {/* Dynamic mesh gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-[radial-gradient(circle_at_center,rgba(229,193,88,0.03)_0%,transparent_50%)] opacity-70 pointer-events-none" />
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-[#E5C158]/5 blur-[130px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: "12s" }} />
        <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] bg-[#A38A4D]/5 blur-[130px] rounded-full pointer-events-none animate-pulse" style={{ animationDuration: "16s" }} />

        <div className="max-w-7xl mx-auto px-6 relative w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-8 text-left z-20">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="glass-luxury rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(229,193,88,0.01)] relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#E5C158] to-[#A38A4D]" />
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                  <Zap className="w-3 h-3 animate-pulse" />
                  Premium AI facial delivery
                </div>
                
                <h1 className="text-4xl md:text-[54px] font-extrabold tracking-tight text-foreground leading-[1.08] mb-6">
                  Find every event photo with <span className="text-gradient-luxury">one selfie</span>
                </h1>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                  EventLens AI helps photographers deliver event photos faster by letting guests find their pictures through AI-powered selfie matching.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="premium"
                    size="lg" 
                    onClick={() => scrollTo("demo")}
                    className="w-full sm:w-auto h-12 px-8 text-sm"
                  >
                    Start Demo
                    <ArrowRight className="ml-2 w-4 h-4 text-[#060608]" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={() => scrollTo("demo")}
                    className="w-full sm:w-auto h-12 px-8 text-sm border-border hover:bg-foreground/5 text-foreground"
                  >
                    View Guest Flow
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Right 3D Visual Engine Column */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6 w-full relative z-10"
            >
              <HeroCanvasWrapper />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Horizontal Event Gallery */}
      <section className="py-20 border-t border-border/50 bg-secondary/15 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
          <div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-1">Live Exhibition Channels</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground">Featured Event Galleries</h2>
          </div>
          <p className="text-xs text-muted-foreground max-w-sm">Explore interactive portfolios compiled and distributed by premium studios worldwide using EventLens AI.</p>
        </div>

        {/* Auto-scroll track */}
        <div className="flex gap-6 overflow-hidden py-4 w-full relative">
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-[25] pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-[25] pointer-events-none" />
          
          <motion.div 
            animate={{ x: [0, -1600] }}
            transition={{
              repeat: Infinity,
              duration: 35,
              ease: "linear"
            }}
            className="flex gap-6 shrink-0"
          >
            {[
              { title: "Sarah & James Wedding", desc: "A rural luxury autumn wedding at the estate", count: 850, img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600" },
              { title: "Global Tech Summit 2026", desc: "Main stage tech innovators conference", count: 1250, img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600" },
              { title: "Neon Pulse Music Festival", desc: "Electronic artists main deck arena", count: 4200, img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600" },
              { title: "New York Fashion Runway", desc: "High fashion spring design showcase", count: 910, img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600" },
              { title: "Summit Business Gala", desc: "Vercel partners Q1 VIP gathering", count: 450, img: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600" },
            ].concat([ // Repeat items for seamless loop
              { title: "Sarah & James Wedding", desc: "A rural luxury autumn wedding at the estate", count: 850, img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600" },
              { title: "Global Tech Summit 2026", desc: "Main stage tech innovators conference", count: 1250, img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600" },
              { title: "Neon Pulse Music Festival", desc: "Electronic artists main deck arena", count: 4200, img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600" },
              { title: "New York Fashion Runway", desc: "High fashion spring design showcase", count: 910, img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600" },
              { title: "Summit Business Gala", desc: "Vercel partners Q1 VIP gathering", count: 450, img: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600" },
            ]).map((item, idx) => (
              <div 
                key={idx}
                className="w-80 h-96 rounded-2xl border border-border bg-secondary/50 overflow-hidden relative group shrink-0 flex flex-col justify-between p-5 shadow-lg shadow-black/5"
              >
                <div className="absolute inset-0 bg-black/40 z-10 transition-opacity group-hover:opacity-50" />
                <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                
                <div className="relative z-20 flex justify-between items-start">
                  <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[8px] font-black uppercase tracking-wider text-white">
                    {item.count} assets
                  </span>
                  <span className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>

                <div className="relative z-20 text-left">
                  <h4 className="font-bold text-white text-lg tracking-tight leading-tight">{item.title}</h4>
                  <p className="text-[10px] text-zinc-300 mt-1 truncate">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3.1 Immersive Studio Workspace Dashboard Mockup */}
      <section className="py-32 border-t border-border/50 bg-background relative overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none animate-pulse" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-1">State of the Art Workspace</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Designed for elite studios</h2>
            <p className="text-muted-foreground text-sm mt-3">An intuitive interface featuring live biometric indexing queues, custom white labeling settings, and digital QR delivery systems.</p>
          </div>

          {/* Premium Vercel-style glass dashboard frame mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full rounded-[24px] border border-border/60 bg-secondary/20 shadow-[0_32px_64px_-20px_rgba(0,0,0,0.4)] relative overflow-hidden p-3 md:p-4 group max-w-5xl mx-auto"
          >
            {/* Top dashboard window bars */}
            <div className="flex items-center gap-2 pb-3.5 border-b border-border/40 px-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/85" />
              <div className="w-3 h-3 rounded-full bg-amber-500/85" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/85" />
              <span className="text-[10px] font-mono text-muted-foreground ml-4 select-none">studio.eventlens.ai/dashboard</span>
            </div>

            {/* Dashboard Workspace Mock Content */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-4 text-left">
              {/* Left sidebar simulator */}
              <div className="md:col-span-3 border-r border-border/40 pr-4 space-y-2 hidden md:block">
                {[
                  { label: "Dashboard", active: true },
                  { label: "Events Catalog", active: false },
                  { label: "Masonry Gallery", active: false },
                  { label: "Upload Workspace", active: false },
                  { label: "Branding Settings", active: false }
                ].map((sidebarItem, sIdx) => (
                  <div 
                    key={sIdx}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold select-none ${sidebarItem.active ? 'bg-primary/10 border border-primary/20 text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    {sidebarItem.label}
                  </div>
                ))}
              </div>

              {/* Main content area simulator */}
              <div className="md:col-span-9 space-y-6 md:pl-2">
                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Total Events", val: "24", inc: "+3" },
                    { label: "Photos Scanned", val: "45.2K", inc: "+12K" },
                    { label: "Identities Solved", val: "18.4K", inc: "+5K" }
                  ].map((statCard, scIdx) => (
                    <div key={scIdx} className="p-3 bg-secondary/55 border border-border/60 rounded-xl">
                      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block">{statCard.label}</span>
                      <span className="text-lg font-black text-foreground mt-0.5 block">{statCard.val}</span>
                      <span className="text-[8px] text-emerald-400 font-bold mt-0.5 block">{statCard.inc} this month</span>
                    </div>
                  ))}
                </div>

                {/* Queue simulation element */}
                <div className="p-4 bg-primary/[0.02] border border-primary/25 rounded-2xl space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-[100px] w-[100px] bg-primary/5 blur-lg rounded-full" />
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-bold text-foreground uppercase tracking-wide flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                        AI Index Queue
                      </h4>
                      <p className="text-[9px] text-muted-foreground mt-0.5">Scoping weddings files catalogs for facial alignments.</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-[8px] font-black uppercase text-primary tracking-widest">Scanning Catalog</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[8px] font-mono text-muted-foreground">
                      <span>Index completion rate (450/850 photos)</span>
                      <span className="text-primary font-bold">53%</span>
                    </div>
                    <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-accent w-[53%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Feature Section */}
      <section id="features" className="py-32 bg-background relative border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">Unmatched Delivery Experience</h2>
            <p className="text-muted-foreground text-lg">Automate discovery, protect media files, and offer attendees high-fidelity event galleries.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group glass p-8 rounded-2xl border border-border/40 hover:border-primary/20 hover:bg-foreground/[0.01] transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-foreground/[0.005] to-transparent pointer-events-none" />
                
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-105", feature.bg)}>
                  <feature.icon className={cn("w-6 h-6", feature.color)} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section id="how-it-works" className="py-32 border-t border-border/60 bg-secondary/25">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-24">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">How It Works</h2>
            <p className="text-muted-foreground text-lg">Delivering photos directly to faces in four simple, highly secure steps.</p>
          </div>
          
          <div className="relative">
            {/* Visual connector bar connecting steppers */}
            <div className="hidden lg:block absolute top-[44px] left-[12%] w-[76%] h-[2px] bg-gradient-to-r from-primary/5 via-primary/20 to-primary/5" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {steps.map((step, i) => (
                <motion.div 
                  key={step.title} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative text-center group"
                >
                  <div className={cn("w-20 h-20 rounded-2xl bg-background border border-border flex items-center justify-center mx-auto mb-6 relative z-10 transition-all duration-300 group-hover:scale-105 shadow-[0_0_30px_rgba(229,193,88,0.01)]", step.color)}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed px-4">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5.5 Luxury Animated Statistics Section */}
      <section className="py-24 border-t border-border/50 bg-secondary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(229,193,88,0.015)_0%,transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "99.8%", label: "Biometric Precision", desc: "Industry-leading facial matching accuracy with zero false positives." },
              { value: "150ms", label: "Scan Latency", desc: "Ultra-fast extraction and cataloging latency per image frame." },
              { value: "4.2M+", label: "Indexed Photos", desc: "Distributed and cached globally across secure regional servers." },
              { value: "18k+", label: "Completed Events", desc: "Trusted by elite wedding photographers and enterprise event hosts." }
            ].map((stat, sIdx) => (
              <motion.div
                key={sIdx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: sIdx * 0.1 }}
                className="glass-luxury p-8 rounded-2xl border border-border/40 text-left group hover:border-primary/20 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none transition-opacity opacity-0 group-hover:opacity-100" />
                <h3 className="text-4xl lg:text-5xl font-extrabold text-gradient-luxury tracking-tight mb-2">
                  {stat.value}
                </h3>
                <h4 className="text-sm font-bold text-foreground tracking-wider uppercase mb-2">
                  {stat.label}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Demo Preview Section */}
      <section id="demo" className="py-32 border-t border-border/60 bg-background relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(229,193,88,0.01)_0%,transparent_40%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">Experience AI Matching</h2>
            <p className="text-muted-foreground text-lg">Select a guest selfie below to watch the circular neural engine find event photos instantly.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Input selfie selection card */}
            <div className="lg:col-span-4 flex flex-col justify-between p-8 rounded-3xl glass-luxury border border-border/40 relative overflow-hidden">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">Step 1: Choose a Selfie</h3>
                <p className="text-sm text-muted-foreground mb-8">Simulate a guest uploading their face to search database.</p>
                
                <div className="space-y-4">
                  {mockSelfies.map((selfie) => (
                    <button
                       key={selfie.id}
                       onClick={() => handleSelfieSelect(selfie)}
                       disabled={isDemoScanning}
                       className={cn(
                         "w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden cursor-pointer",
                         selectedSelfie.id === selfie.id 
                           ? "border-primary/45 bg-primary/[0.03] shadow-[0_0_20px_rgba(229,193,88,0.03)]" 
                           : "border-border bg-secondary/35 hover:border-border/80"
                       )}
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-border/60 shrink-0">
                        <img src={selfie.avatar} alt={selfie.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground text-sm">{selfie.name}</p>
                        <p className="text-xs text-muted-foreground">Click to scan catalog</p>
                      </div>
                      {selectedSelfie.id === selfie.id && (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-[#060608] dark:text-background" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/60 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Mock simulator: No real biometric data is saved.
              </div>
            </div>

            {/* Right: AI Output simulation workspace */}
            <div className="lg:col-span-8 flex flex-col justify-center min-h-[400px] p-8 rounded-3xl glass-luxury border border-border/40 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {isDemoScanning ? (
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center h-full text-center space-y-6"
                  >
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full border-4 border-primary/10 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full border-4 border-t-primary border-r-transparent border-b-primary/40 border-l-transparent animate-spin" />
                      </div>
                      <div className="absolute inset-0 bg-primary/5 blur-xl rounded-full" />
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-bold text-foreground mb-2">Analyzing Face Geometry</h4>
                      <p className="text-sm text-muted-foreground animate-pulse">Running AI template search across 10,000 photos...</p>
                    </div>
                  </motion.div>
                ) : showDemoResults ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6 h-full flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/60">
                        <div>
                          <h4 className="text-lg font-bold text-foreground">Step 2: Instant Matches</h4>
                          <p className="text-sm text-muted-foreground">Found {selectedSelfie.matches.length} matches for {selectedSelfie.name}</p>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          Processing Complete
                        </div>
                      </div>

                      {/* Display matched photos grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {selectedSelfie.matches.map((photo, i) => (
                          <div 
                            key={i} 
                            className="relative rounded-2xl border border-border overflow-hidden group aspect-[3/4] bg-secondary shadow-lg"
                          >
                            <img src={photo.url} alt={`Match ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-background/80 backdrop-blur-md border border-primary/30 text-[10px] font-bold text-primary uppercase tracking-wide">
                              {photo.match} Match
                            </div>
                            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button size="icon" variant="glass" className="w-8 h-8 rounded-full border-border bg-background/80 hover:bg-primary hover:text-primary-foreground text-foreground">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <Button variant="premium" className="h-10 text-xs px-6">
                        Download Entire Gallery
                      </Button>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Final CTA Section */}
      <section className="py-32 relative overflow-hidden border-t border-border/60">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-[130px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground leading-tight tracking-tight">
            Make event photo delivery <br /> faster, smarter, and easier.
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            Provide your event attendees with a premium, friction-free way to discover and save their high-fidelity pictures.
          </p>
          <Button 
            size="lg" 
            variant="premium" 
            onClick={() => scrollTo("demo")}
            className="h-12 px-8 text-sm"
          >
            Start Demo
            <ArrowRight className="ml-2 w-4 h-4 text-[#060608] dark:text-background" />
          </Button>
        </div>
      </section>

      {/* 9. Modern Footer */}
      <footer className="py-16 border-t border-border bg-secondary/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-gradient-to-tr from-[#E5C158] to-[#A38A4D] flex items-center justify-center">
                  <Camera className="w-3.5 h-3.5 text-[#060608] dark:text-background" />
                </div>
                <span className="font-bold tracking-tight text-foreground">EventLens <span className="text-primary font-medium">AI</span></span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                Premium AI-powered event photo delivery, letting guests instantly discover their high-res portraits using one selfie.
              </p>
            </div>
            
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-widest mb-4">Product</h4>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                <li><button onClick={() => scrollTo("features")} className="hover:text-foreground transition-colors cursor-pointer">Features</button></li>
                <li><button onClick={() => scrollTo("demo")} className="hover:text-foreground transition-colors cursor-pointer">Matching Engine</button></li>
                <li><button onClick={() => scrollTo("how-it-works")} className="hover:text-foreground transition-colors cursor-pointer">Security Details</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-widest mb-4">Resources</h4>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing Plan</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API Workspace</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-widest mb-4">Legal</h4>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Biometric Safe Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-border/50 pt-8 text-xs text-muted-foreground">
            <p>© 2026 EventLens AI. All rights reserved. Crafted for top tier studios.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
              <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
              <a href="#" className="hover:text-foreground transition-colors">Support Portal</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
