import Link from 'next/link';
import { Event } from '@/types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Calendar, Image as ImageIcon, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface EventCardProps {
  event: Event;
  index?: number;
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  const getStatusBadge = (status: Event['status']) => {
    switch (status) {
      case 'Published': return <Badge variant="success">Published</Badge>;
      case 'Processing': return <Badge variant="processing" className="animate-pulse">Processing</Badge>;
      case 'Draft': return <Badge variant="secondary">Draft</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/events/${event.id}`}>
        <Card className="overflow-hidden group hover:border-blue-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] h-full flex flex-col cursor-pointer">
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <img 
              src={event.coverImage} 
              alt={event.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 right-4 z-20">
              {getStatusBadge(event.status)}
            </div>
            <div className="absolute bottom-4 left-4 z-20">
              <Badge variant="outline" className="bg-black/50 backdrop-blur-md border-white/20 text-white">
                {event.type}
              </Badge>
            </div>
          </div>
          
          <div className="p-5 flex flex-col flex-1">
            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">{event.title}</h3>
            
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <Calendar className="w-4 h-4 mr-2" />
              {event.date}
            </div>

            <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" />
                  Photos
                </span>
                <span className="font-semibold text-white">{event.photoCount.toLocaleString()}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  Matches
                </span>
                <span className="font-semibold text-white">{event.matchedCount ? event.matchedCount.toLocaleString() : '0'}</span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
