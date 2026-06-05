"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Camera, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginView() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const success = await login(email, password);
    if (success) {
      router.push('/dashboard');
    }
  };

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
            <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2 uppercase">Welcome Back</h1>
            <p className="text-xs text-muted-foreground">Log in to your luxury EventLens studio console.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                Business Email
              </label>
              <Input
                id="login-email"
                type="email"
                placeholder="admin@eventlens.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                  Security Password
                </label>
                <Link href="#" className="text-[10px] font-semibold text-primary hover:text-primary/85 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            <div className="pt-2">
              <Button
                id="login-submit"
                type="submit"
                variant="premium"
                className="w-full h-11 text-xs font-bold"
                disabled={isLoading || !email || !password}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Access Studio Dashboard
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </Button>
            </div>

            {/* Demo hint */}
            <p className="text-center text-[10px] text-muted-foreground pt-1">
              Demo: <span className="font-mono text-primary/70">admin@eventlens.ai</span> / <span className="font-mono text-primary/70">password123</span>
            </p>
          </form>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-primary hover:text-primary/80 font-bold underline transition-colors">
              Sign up today
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-secondary items-center justify-center border-l border-border">
        <GradientBackground />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070')] bg-cover bg-center opacity-10 mix-blend-overlay" />

        <div className="relative z-10 max-w-lg p-12 glass-luxury rounded-2xl shadow-2xl backdrop-blur-3xl">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-6 shadow-lg shadow-primary/5">
            <Camera className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gradient-luxury">Deliver moments instantly.</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            EventLens AI automatically indexes thousands of photos and lets your guests find theirs instantly using biometric neural scans.
          </p>
        </div>
      </div>
    </div>
  );
}
