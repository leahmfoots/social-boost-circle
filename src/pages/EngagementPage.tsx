
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, ExternalLink, Clock, CheckCircle, Award } from 'lucide-react';

interface EngagementOpportunity {
  id: string;
  title: string;
  platform: string;
  type: string;
  description: string;
  points: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
  status: 'available' | 'in-progress' | 'completed' | 'expired';
  url?: string;
  deadline?: string;
}

const mockOpportunities: EngagementOpportunity[] = [
  {
    id: '1',
    title: 'Like and Share Tech Tutorial',
    platform: 'YouTube',
    type: 'Video Engagement',
    description: 'Engage with the latest React tutorial - like, comment, and share',
    points: 45,
    difficulty: 'Easy',
    estimatedTime: '5 min',
    status: 'available',
    url: 'https://youtube.com/watch?v=example',
    deadline: '2024-01-20',
  },
  {
    id: '2',
    title: 'Comment on Design Post',
    platform: 'Instagram',
    type: 'Post Engagement',
    description: 'Leave a thoughtful comment on this UI/UX design showcase',
    points: 25,
    difficulty: 'Easy',
    estimatedTime: '3 min',
    status: 'completed',
    url: 'https://instagram.com/p/example',
  },
  {
    id: '3',
    title: 'Retweet Developer Thread',
    platform: 'Twitter',
    type: 'Social Sharing',
    description: 'Retweet and add your thoughts to this JavaScript tips thread',
    points: 35,
    difficulty: 'Medium',
    estimatedTime: '7 min',
    status: 'in-progress',
    url: 'https://twitter.com/user/status/example',
    deadline: '2024-01-18',
  },
  {
    id: '4',
    title: 'Review Mobile App',
    platform: 'App Store',
    type: 'App Review',
    description: 'Write a detailed review for this productivity app',
    points: 100,
    difficulty: 'Hard',
    estimatedTime: '15 min',
    status: 'available',
    deadline: '2024-01-25',
  },
];

const EngagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOpportunities = mockOpportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = platformFilter === 'all' || opp.platform.toLowerCase() === platformFilter;
    const matchesStatus = statusFilter === 'all' || opp.status === statusFilter;
    
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  const handleEngagement = (opportunityId: string, action: string) => {
    console.log(`${action} opportunity:`, opportunityId);
    // Implement engagement logic
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'default';
      case 'in-progress':
        return 'secondary';
      case 'completed':
        return 'success';
      case 'expired':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: mockOpportunities.length,
    completed: mockOpportunities.filter(o => o.status === 'completed').length,
    inProgress: mockOpportunities.filter(o => o.status === 'in-progress').length,
    totalPoints: mockOpportunities
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + o.points, 0),
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Engagement Opportunities</h1>
            <p className="text-muted-foreground">
              Complete engagement activities to earn points and grow your network
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Opportunities</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.inProgress}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Points Earned</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalPoints}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="app store">App Store</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Opportunities List */}
        <Tabs defaultValue="grid" className="space-y-4">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOpportunities.map((opportunity) => (
                <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                        <CardDescription>{opportunity.platform} • {opportunity.type}</CardDescription>
                      </div>
                      <Badge variant={getStatusColor(opportunity.status) as any}>
                        {opportunity.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {opportunity.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge className={getDifficultyColor(opportunity.difficulty)}>
                          {opportunity.difficulty}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {opportunity.estimatedTime}
                        </span>
                      </div>
                      <Badge variant="outline" className="font-bold">
                        +{opportunity.points} pts
                      </Badge>
                    </div>
                    
                    {opportunity.deadline && (
                      <div className="text-xs text-orange-600">
                        Deadline: {new Date(opportunity.deadline).toLocaleDateString()}
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      {opportunity.status === 'available' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleEngagement(opportunity.id, 'start')}
                          className="flex-1"
                        >
                          Start
                        </Button>
                      )}
                      
                      {opportunity.status === 'in-progress' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleEngagement(opportunity.id, 'complete')}
                          className="flex-1"
                        >
                          Mark Complete
                        </Button>
                      )}
                      
                      {opportunity.url && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(opportunity.url, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="list">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredOpportunities.map((opportunity) => (
                    <div key={opportunity.id} className="p-4 hover:bg-muted/50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium">{opportunity.title}</h3>
                            <Badge variant={getStatusColor(opportunity.status) as any}>
                              {opportunity.status}
                            </Badge>
                            <Badge className={getDifficultyColor(opportunity.difficulty)}>
                              {opportunity.difficulty}
                            </Badge>
                            <Badge variant="outline">+{opportunity.points} pts</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {opportunity.description}
                          </p>
                          <div className="text-xs text-muted-foreground">
                            {opportunity.platform} • {opportunity.type} • {opportunity.estimatedTime}
                            {opportunity.deadline && ` • Deadline: ${new Date(opportunity.deadline).toLocaleDateString()}`}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          {opportunity.status === 'available' && (
                            <Button 
                              size="sm" 
                              onClick={() => handleEngagement(opportunity.id, 'start')}
                            >
                              Start
                            </Button>
                          )}
                          
                          {opportunity.status === 'in-progress' && (
                            <Button 
                              size="sm" 
                              onClick={() => handleEngagement(opportunity.id, 'complete')}
                            >
                              Complete
                            </Button>
                          )}
                          
                          {opportunity.url && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => window.open(opportunity.url, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {filteredOpportunities.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No opportunities found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setPlatformFilter('all');
                  setStatusFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default EngagementPage;
