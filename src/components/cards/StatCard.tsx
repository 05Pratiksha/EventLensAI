import { Card, CardContent } from '../ui/Card';
import { Stat } from '@/types';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { cn } from '@/utils/utils';

interface StatCardProps {
  stat: Stat;
}

export function StatCard({ stat }: StatCardProps) {
  const isUp = stat.trend === 'up';

  return (
    <Card className="hover:border-primary/20 transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            <Activity className="w-4 h-4 text-primary" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h4 className="text-3xl font-bold tracking-tight text-white">{stat.value}</h4>
        </div>
        <div className="flex items-center mt-2 text-xs">
          <span className={cn(
            "flex items-center font-medium mr-2",
            isUp ? "text-emerald-500" : "text-amber-500"
          )}>
            {isUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
            {stat.change}
          </span>
          <span className="text-muted-foreground opacity-75">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
}
