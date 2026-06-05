"use client";

import Link from 'next/link';
import { Camera, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { motion } from 'framer-motion';

export default function SignupView() {
  return (
    <div className="min-h-screen flex bg-background relative overflow-hidden">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 md:px-24 relative z-10">
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#E5C158] to-[#A38A4D] flex items-center justify-center shadow-lg shadow-[#E5C158]/10 group-hover:scale-105 transition-transform">
            <Camera className="w-4 h-4 text-black stroke-[2.5px]" />
          </div>
          <span className="font-bold text-base tracking-widest text-foreground uppercase">EventLens</span>
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2 uppercase">Create Account</h1>
            <p className="text-xs text-muted-foreground">Start delivering photos with neural AI magic.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Full Name</label>
              <Input type="text" placeholder="John Doe" />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Business Email</label>
              <Input type="email" placeholder="name@yourstudio.com" />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Studio Name</label>
              <Input type="text" placeholder="Dream Studios" />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Secure Password</label>
              <Input type="password" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" />
            </div>

            <Link href="/dashboard" className="block pt-2">
              <Button variant="premium" className="w-full h-11 text-xs font-bold">
                Initialize Studio Account
                <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </Button>
            </Link>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="bg-background px-3 text-muted-foreground">Or credentials access</span>
              </div>
            </div>

            <Button variant="outline" className="w-full h-11 text-xs font-bold">
              Continue with GitHub
            </Button>
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:text-primary/80 font-bold underline transition-colors">
              Log in instead
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-secondary items-center justify-center border-l border-border">
        <GradientBackground />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        
        <div className="relative z-10 max-w-lg p-12 glass-luxury rounded-2xl shadow-2xl backdrop-blur-3xl">
          <div className="flex gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center backdrop-blur-md border border-primary/20">
              <span className="text-sm font-bold text-primary font-mono">1</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center backdrop-blur-md border border-primary/20">
              <span className="text-sm font-bold text-primary font-mono">2</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center backdrop-blur-md border border-primary/20">
              <span className="text-sm font-bold text-primary font-mono">3</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gradient-luxury">Join top-tier studios.</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Stop manually cataloging thousands of portraits. Let AI handle active matching indices while you focus on creative mastery.
          </p>
        </div>
      </div>
    </div>
  );
}
