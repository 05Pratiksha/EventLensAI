"use client";

import { useToastStore, ToastItem } from '@/store/useToastStore';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

const icons = {
  success: <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />,
  error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
  info: <Info className="w-5 h-5 text-sky-400 shrink-0" />,
};

const borderColors = {
  success: 'border-emerald-500/20 bg-emerald-500/[0.03]',
  error: 'border-rose-500/20 bg-rose-500/[0.03]',
  warning: 'border-amber-500/20 bg-amber-500/[0.03]',
  info: 'border-sky-500/20 bg-sky-500/[0.03]',
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastCard({ toast, onRemove }: { toast: ToastItem; onRemove: (id: string) => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
      className={`pointer-events-auto w-full glass-luxury border p-4 rounded-2xl flex gap-3.5 shadow-2xl relative overflow-hidden ${borderColors[toast.type]}`}
    >
      {/* Decorative vertical colored stripe */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${
        toast.type === 'success' ? 'bg-emerald-500' :
        toast.type === 'error' ? 'bg-rose-500' :
        toast.type === 'warning' ? 'bg-amber-500' : 'bg-sky-500'
      }`} />

      {icons[toast.type]}
      
      <div className="flex-1 text-left min-w-0 pr-4">
        <h4 className="text-xs font-bold text-foreground tracking-wide leading-tight uppercase">
          {toast.message}
        </h4>
        {toast.description && (
          <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
            {toast.description}
          </p>
        )}
      </div>

      <button
        onClick={() => onRemove(toast.id)}
        className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-foreground/5 transition-colors self-start"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}
