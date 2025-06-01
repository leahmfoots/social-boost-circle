
import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface SearchFilters {
  platforms: string[];
  contentTypes: string[];
  pointsRange: [number, number];
  verified: boolean;
  dateRange: string;
}

interface SearchResult {
  id: string;
  type: 'creator' | 'opportunity' | 'group';
  title: string;
  description: string;
  platform?: string;
  points?: number;
  verified?: boolean;
}

const mockResults: SearchResult[] = [
  {
    id: '1',
    type: 'creator',
    title: 'Emma Wilson',
    description: 'UX/UI Designer with 5+ years experience',
    verified: true
  },
  {
    id: '2',
    type: 'opportunity',
    title: 'React Tutorial Engagement',
    description: 'Engage with latest React 18 features tutorial',
    platform: 'YouTube',
    points: 45
  },
  {
    id: '3',
    type: 'group',
    title: 'Frontend Developers',
    description: 'Community for frontend developers to share knowledge',
  }
];

export const AdvancedSearch = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    platforms: [],
    contentTypes: [],
    pointsRange: [0, 100],
    verified: false,
    dateRange: 'all'
  });
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Autocomplete suggestions
  const allSuggestions = [
    'React developers', 'UI designers', 'Content creators', 'YouTube tutorials',
    'Instagram posts', 'TikTok videos', 'Frontend development', 'Social media'
  ];

  useEffect(() => {
    if (query.length > 1) {
      const filtered = allSuggestions.filter(s => 
        s.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = () => {
    // Filter results based on query and filters
    let filtered = mockResults;
    
    if (query) {
      filtered = filtered.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filters.verified) {
      filtered = filtered.filter(result => result.verified);
    }

    if (filters.platforms.length > 0) {
      filtered = filtered.filter(result => 
        result.platform && filters.platforms.includes(result.platform)
      );
    }

    setResults(filtered);
  };

  const toggleFilter = (filterType: keyof SearchFilters, value: any) => {
    setFilters(prev => {
      if (filterType === 'platforms' || filterType === 'contentTypes') {
        const array = prev[filterType] as string[];
        const updated = array.includes(value)
          ? array.filter(item => item !== value)
          : [...array, value];
        return { ...prev, [filterType]: updated };
      }
      return { ...prev, [filterType]: value };
    });
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search creators, opportunities, groups..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="pl-10 pr-20"
          data-search-trigger
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
          </Button>
          <Button size="sm" onClick={handleSearch}>
            Search
          </Button>
        </div>

        {/* Autocomplete dropdown */}
        {suggestions.length > 0 && (
          <Card className="absolute top-full left-0 right-0 z-50 mt-1">
            <CardContent className="p-2">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-muted rounded cursor-pointer"
                  onClick={() => {
                    setQuery(suggestion);
                    setSuggestions([]);
                    handleSearch();
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Advanced Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Platforms</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['YouTube', 'Instagram', 'Twitter', 'TikTok', 'LinkedIn'].map(platform => (
                    <Badge
                      key={platform}
                      variant={filters.platforms.includes(platform) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggleFilter('platforms', platform)}
                    >
                      {platform}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Content Types</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['Video', 'Post', 'Story', 'Thread', 'Article'].map(type => (
                    <Badge
                      key={type}
                      variant={filters.contentTypes.includes(type) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggleFilter('contentTypes', type)}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Date Range</label>
                <Select
                  value={filters.dateRange}
                  onValueChange={(value) => toggleFilter('dateRange', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="verified"
                checked={filters.verified}
                onCheckedChange={(checked) => toggleFilter('verified', checked)}
              />
              <label htmlFor="verified" className="text-sm">Verified accounts only</label>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium">Search Results ({results.length})</h3>
          {results.map(result => (
            <Card key={result.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{result.title}</h4>
                      <Badge variant="outline">{result.type}</Badge>
                      {result.verified && <Badge variant="default">Verified</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{result.description}</p>
                    {result.platform && (
                      <Badge variant="secondary" className="mt-2">{result.platform}</Badge>
                    )}
                  </div>
                  {result.points && (
                    <div className="text-right">
                      <span className="font-medium text-primary">+{result.points} pts</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
