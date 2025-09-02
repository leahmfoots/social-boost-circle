
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Award,
  Calendar,
  Download,
} from 'lucide-react';

export const AdvancedAnalytics = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('30d');

  // Fetch analytics data
  const { data: analyticsData } = useQuery({
    queryKey: ['analytics', user?.id, timeRange],
    queryFn: async () => {
      const endDate = new Date();
      const startDate = new Date();
      
      switch (timeRange) {
        case '7d':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(endDate.getDate() - 30);
          break;
        case '90d':
          startDate.setDate(endDate.getDate() - 90);
          break;
        case '1y':
          startDate.setFullYear(endDate.getFullYear() - 1);
          break;
      }

      // Fetch engagement data
      const { data: engagements } = await supabase
        .from('engagements')
        .select('*')
        .eq('user_id', user!.id)
        .gte('created_at', startDate.toISOString())
        .lte('created_at', endDate.toISOString());

      // Fetch social accounts data
      const { data: socialAccounts } = await supabase
        .from('social_accounts')
        .select('*')
        .eq('user_id', user!.id);

      // Fetch points history
      const { data: pointsHistory } = await supabase
        .from('user_analytics')
        .select('*')
        .eq('user_id', user!.id)
        .eq('event_type', 'points_earned')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: true });

      return {
        engagements: engagements || [],
        socialAccounts: socialAccounts || [],
        pointsHistory: pointsHistory || [],
      };
    },
    enabled: !!user,
  });

  // Process data for charts
  const processedData = React.useMemo(() => {
    if (!analyticsData) return null;

    // Engagement by platform
    const engagementsByPlatform = analyticsData.engagements.reduce((acc: any, eng: any) => {
      acc[eng.platform] = (acc[eng.platform] || 0) + 1;
      return acc;
    }, {});

    // Engagement by type
    const engagementsByType = analyticsData.engagements.reduce((acc: any, eng: any) => {
      acc[eng.engagement_type] = (acc[eng.engagement_type] || 0) + 1;
      return acc;
    }, {});

    // Daily points trend
    const dailyPoints = analyticsData.pointsHistory.reduce((acc: any, point: any) => {
      const date = new Date(point.created_at).toLocaleDateString();
      acc[date] = (acc[date] || 0) + (point.event_data?.points || 0);
      return acc;
    }, {});

    // Status distribution
    const statusDistribution = analyticsData.engagements.reduce((acc: any, eng: any) => {
      acc[eng.status] = (acc[eng.status] || 0) + 1;
      return acc;
    }, {});

    return {
      platformData: Object.entries(engagementsByPlatform).map(([platform, count]) => ({
        platform,
        engagements: count,
      })),
      typeData: Object.entries(engagementsByType).map(([type, count]) => ({
        type,
        count,
      })),
      trendData: Object.entries(dailyPoints).map(([date, points]) => ({
        date,
        points,
      })),
      statusData: Object.entries(statusDistribution).map(([status, count]) => ({
        status,
        count,
      })),
    };
  }, [analyticsData]);

  const kpiCards = [
    {
      title: 'Total Engagements',
      value: analyticsData?.engagements.length || 0,
      change: '+12%',
      trend: 'up',
      icon: Target,
    },
    {
      title: 'Connected Accounts',
      value: analyticsData?.socialAccounts.length || 0,
      change: '+2',
      trend: 'up',
      icon: Users,
    },
    {
      title: 'Verified Engagements',
      value: analyticsData?.engagements.filter((e: any) => e.status === 'verified').length || 0,
      change: '+8%',
      trend: 'up',
      icon: Award,
    },
    {
      title: 'Points Earned',
      value: analyticsData?.engagements
        .filter((e: any) => e.status === 'verified')
        .reduce((sum: number, e: any) => sum + e.points_value, 0) || 0,
      change: '+24%',
      trend: 'up',
      icon: TrendingUp,
    },
  ];

  const COLORS = ['#624DE3', '#00C4A7', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track your engagement performance and growth
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                {kpi.trend === 'up' ? (
                  <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1 text-red-500" />
                )}
                {kpi.change} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="platforms">Platform Analysis</TabsTrigger>
          <TabsTrigger value="engagement">Engagement Types</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Points Trend</CardTitle>
                <CardDescription>
                  Your daily points earning over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={processedData?.trendData || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="points"
                      stroke="#624DE3"
                      fill="#624DE3"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Status</CardTitle>
                <CardDescription>
                  Distribution of engagement statuses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={processedData?.statusData || []}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ status, percent }) => 
                        `${status} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {(processedData?.statusData || []).map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Performance</CardTitle>
              <CardDescription>
                Engagement distribution across social platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={processedData?.platformData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="platform" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="engagements" fill="#624DE3" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Types</CardTitle>
              <CardDescription>
                Breakdown of different engagement activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={processedData?.typeData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#00C4A7" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500">
                  {analyticsData?.engagements.length > 0
                    ? Math.round(
                        (analyticsData.engagements.filter((e: any) => e.status === 'verified').length / 
                         analyticsData.engagements.length) * 100
                      )
                    : 0}%
                </div>
                <p className="text-sm text-muted-foreground">
                  Of engagements verified
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avg. Points per Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-500">
                  {analyticsData?.engagements.length > 0
                    ? Math.round(
                        analyticsData.engagements
                          .filter((e: any) => e.status === 'verified')
                          .reduce((sum: number, e: any) => sum + e.points_value, 0) /
                        analyticsData.engagements.filter((e: any) => e.status === 'verified').length
                      )
                    : 0}
                </div>
                <p className="text-sm text-muted-foreground">
                  Points earned on average
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Most Active Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-500">
                  {processedData?.platformData.length > 0
                    ? processedData.platformData.reduce((max: any, platform: any) =>
                        platform.engagements > max.engagements ? platform : max
                      ).platform
                    : 'N/A'}
                </div>
                <p className="text-sm text-muted-foreground">
                  With most engagements
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
