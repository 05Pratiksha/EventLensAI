import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-[300px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      >
        <Loader2 className="w-8 h-8 text-primary mb-4" />
      </motion.div>
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest animate-pulse">{message}</p>
    </div>
  );
}
