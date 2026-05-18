import { Activity } from '@/types';
import { Upload, Sparkles, Send, Download } from 'lucide-react';

interface ActivityTimelineProps {
  activities: Activity[];
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'upload': return <Upload className="w-4 h-4 text-blue-500" />;
      case 'match': return <Sparkles className="w-4 h-4 text-emerald-500" />;
      case 'publish': return <Send className="w-4 h-4 text-purple-500" />;
      case 'download': return <Download className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="relative border-l border-white/10 ml-3 space-y-6 pb-4">
      {activities.map((activity) => (
        <div key={activity.id} className="relative pl-6">
          <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-background border border-white/10 flex items-center justify-center">
            {getIcon(activity.type)}
          </div>
          <div>
            <p className="text-sm font-medium text-white">{activity.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
