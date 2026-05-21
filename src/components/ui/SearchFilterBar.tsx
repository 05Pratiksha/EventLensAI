import { Search, Filter } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';

interface SearchFilterBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export function SearchFilterBar({ onSearch, placeholder = "Search..." }: SearchFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder={placeholder}
          className="pl-9 bg-input border-border"
          onChange={(e) => onSearch && onSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="shrink-0">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
        <select className="h-10 rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors">
          <option value="all" className="bg-background text-foreground">All Status</option>
          <option value="published" className="bg-background text-foreground">Published</option>
          <option value="processing" className="bg-background text-foreground">Processing</option>
          <option value="draft" className="bg-background text-foreground">Draft</option>
        </select>
      </div>
    </div>
  );
}
