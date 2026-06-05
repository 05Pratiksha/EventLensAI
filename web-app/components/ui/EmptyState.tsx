import { LucideIcon } from 'lucide-react';
import { Button } from './Button';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-12 text-center glass-luxury rounded-2xl border border-dashed border-border shadow-xl backdrop-blur-2xl"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-6 shadow-lg shadow-primary/5">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-lg font-bold text-foreground uppercase tracking-wider mb-2">{title}</h3>
      <p className="text-xs text-muted-foreground max-w-xs mb-6 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="premium" className="h-9 text-xs font-bold px-5">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
