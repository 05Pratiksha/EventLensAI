"use client";

import Link from 'next/link';
import { Camera, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { motion } from 'framer-motion';

export default function Login() {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 md:px-24 relative z-10">
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">EventLens</span>
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm mx-auto"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back</h1>
            <p className="text-muted-foreground">Log in to your EventLens studio account.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Email</label>
              <Input type="email" placeholder="name@example.com" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-white">Password</label>
                <Link href="#" className="text-xs text-blue-400 hover:text-blue-300">Forgot password?</Link>
              </div>
              <Input type="password" placeholder="••••••••" />
            </div>

            <Link href="/dashboard" className="block pt-2">
              <Button variant="premium" className="w-full h-11">
                Log In
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button variant="outline" className="w-full h-11">
              GitHub
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-medium">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-black items-center justify-center border-l border-white/10">
        <GradientBackground />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        
        <div className="relative z-10 max-w-lg p-12 glass-dark rounded-2xl border-white/10 shadow-2xl">
          <Camera className="w-12 h-12 text-blue-500 mb-6" />
          <h2 className="text-3xl font-bold mb-4 text-white">Deliver moments faster than ever.</h2>
          <p className="text-lg text-muted-foreground">
            EventLens AI automatically indexes thousands of photos and lets your guests find theirs instantly.
          </p>
        </div>
      </div>
    </div>
  );
}
