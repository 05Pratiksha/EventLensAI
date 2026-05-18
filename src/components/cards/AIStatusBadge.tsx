import { Badge } from '../ui/Badge';
import { Sparkles, Loader2 } from 'lucide-react';

interface AIStatusBadgeProps {
  status: 'idle' | 'scanning' | 'complete';
  matches?: number;
}

export function AIStatusBadge({ status, matches = 0 }: AIStatusBadgeProps) {
  if (status === 'scanning') {
    return (
      <Badge variant="processing" className="animate-pulse">
        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
        AI Scanning...
      </Badge>
    );
  }

  if (status === 'complete') {
    return (
      <Badge variant="success">
        <Sparkles className="w-3 h-3 mr-1" />
        {matches} AI Matches
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="text-muted-foreground border-white/10">
      <Sparkles className="w-3 h-3 mr-1 opacity-50" />
      AI Ready
    </Badge>
  );
}
