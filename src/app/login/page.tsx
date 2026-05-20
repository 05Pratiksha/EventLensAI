"use client";

import Link from 'next/link';
import { Camera, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { motion } from 'framer-motion';

export default function Login() {
  return (
    <div className="min-h-screen flex bg-background relative overflow-hidden">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 md:px-24 relative z-10">
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#E5C158] to-[#A38A4D] flex items-center justify-center shadow-lg shadow-[#E5C158]/10 group-hover:scale-105 transition-transform">
            <Camera className="w-4 h-4 text-black stroke-[2.5px]" />
          </div>
          <span className="font-bold text-base tracking-widest text-white uppercase">EventLens</span>
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-white mb-2 uppercase">Welcome Back</h1>
            <p className="text-xs text-zinc-400">Log in to your luxury EventLens studio console.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Business Email</label>
              <Input type="email" placeholder="name@yourstudio.com" />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Security Password</label>
                <Link href="#" className="text-[10px] font-semibold text-primary hover:text-primary/85 transition-colors">Forgot password?</Link>
              </div>
              <Input type="password" placeholder="••••••••" />
            </div>

            <Link href="/dashboard" className="block pt-2">
              <Button variant="premium" className="w-full h-11 text-xs font-bold text-white">
                Access Studio Dashboard
                <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </Button>
            </Link>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/5" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="bg-background px-3 text-zinc-500">Or credentials access</span>
              </div>
            </div>

            <Button variant="outline" className="w-full h-11 text-xs font-bold border-white/10 hover:bg-white/5 text-white">
              Continue with GitHub
            </Button>
          </div>

          <p className="mt-8 text-center text-xs text-zinc-400">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-primary hover:text-primary/80 font-bold underline transition-colors">
              Sign up today
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-[#060608] items-center justify-center border-l border-white/[0.04]">
        <GradientBackground />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        
        <div className="relative z-10 max-w-lg p-12 glass-luxury rounded-2xl border border-white/[0.04] bg-neutral-950/45 shadow-2xl backdrop-blur-3xl">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-6 shadow-lg shadow-primary/5">
            <Camera className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white text-gradient-luxury">Deliver moments instantly.</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            EventLens AI automatically indexes thousands of photos and lets your guests find theirs instantly using biometric neural scans.
          </p>
        </div>
      </div>
    </div>
  );
}
