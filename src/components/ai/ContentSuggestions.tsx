
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, TrendingUp, Clock, Target } from 'lucide-react';

interface ContentSuggestion {
  id: string;
  title: string;
  description: string;
  platform: string;
  confidence: number;
  estimatedEngagement: string;
  bestPostTime: string;
  contentType: string;
  tags: string[];
}

const mockSuggestions: ContentSuggestion[] = [
  {
    id: '1',
    title: 'React 18 Performance Tips',
    description: 'Create a tutorial about React 18 concurrent features and performance optimizations',
    platform: 'YouTube',
    confidence: 92,
    estimatedEngagement: '15.2K views',
    bestPostTime: 'Today 3:00 PM',
    contentType: 'Tutorial',
    tags: ['React', 'Performance', 'JavaScript']
  },
  {
    id: '2',
    title: 'Daily Coding Challenge',
    description: 'Post a JavaScript coding challenge with solution walkthrough',
    platform: 'Twitter',
    confidence: 87,
    estimatedEngagement: '3.5K impressions',
    bestPostTime: 'Tomorrow 9:00 AM',
    contentType: 'Challenge',
    tags: ['JavaScript', 'Coding', 'Tutorial']
  },
  {
    id: '3',
    title: 'UI Design Trends 2024',
    description: 'Showcase emerging UI design trends with practical examples',
    platform: 'Instagram',
    confidence: 89,
    estimatedEngagement: '8.7K likes',
    bestPostTime: 'Today 7:00 PM',
    contentType: 'Showcase',
    tags: ['Design', 'UI/UX', 'Trends']
  }
];

export const ContentSuggestions = () => {
  const [suggestions, setSuggestions] = useState<ContentSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate AI content generation
    const timer = setTimeout(() => {
      setSuggestions(mockSuggestions);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleImplementSuggestion = (suggestionId: string) => {
    console.log('Implementing suggestion:', suggestionId);
    // In a real app, this would navigate to content creation or add to queue
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            AI Content Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          AI Content Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map(suggestion => (
          <div key={suggestion.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-medium">{suggestion.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{suggestion.description}</p>
              </div>
              <Badge variant="outline">{suggestion.platform}</Badge>
            </div>

            <div className="flex flex-wrap gap-2">
              {suggestion.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4 text-green-500" />
                <span className="text-muted-foreground">Confidence:</span>
                <span className="font-medium">{suggestion.confidence}%</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span className="text-muted-foreground">Est. Reach:</span>
                <span className="font-medium">{suggestion.estimatedEngagement}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-muted-foreground">Best Time:</span>
                <span className="font-medium">{suggestion.bestPostTime}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleImplementSuggestion(suggestion.id)}>
                Create Content
              </Button>
              <Button variant="outline" size="sm">
                Save for Later
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
