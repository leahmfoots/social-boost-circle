
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EngagementChart } from './EngagementChart';
import { TrendingUp, Users, Award, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface AnalyticsData {
  totalEngagements: number;
  totalPoints: number;
  totalFollowers: number;
  monthlyGrowth: number;
  chartData: Array<{
    date: string;
    engagements: number;
    points: number;
  }>;
}

export const AnalyticsDashboard: React.FC = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalEngagements: 0,
    totalPoints: 0,
    totalFollowers: 0,
    monthlyGrowth: 0,
    chartData: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAnalytics();
    }
  }, [user]);

  const fetchAnalytics = async () => {
    try {
      // Fetch user profile for points
      const { data: profile } = await supabase
        .from('profiles')
        .select('points')
        .eq('id', user?.id)
        .single();

      // Simulate analytics data for demo
      const chartData = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        return {
          date: date.toISOString().split('T')[0],
          engagements: Math.floor(Math.random() * 20) + 5,
          points: Math.floor(Math.random() * 100) + 20
        };
      });

      setAnalytics({
        totalEngagements: 247,
        totalPoints: profile?.points || 0,
        totalFollowers: 1.2,
        monthlyGrowth: 12.5,
        chartData
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Engagements',
      value: analytics.totalEngagements.toLocaleString(),
      icon: TrendingUp,
      change: '+12.5%',
      changeType: 'positive' as const
    },
    {
      title: 'Points Earned',
      value: analytics.totalPoints.toLocaleString(),
      icon: Award,
      change: '+8.2%',
      changeType: 'positive' as const
    },
    {
      title: 'Total Followers',
      value: `${analytics.totalFollowers}K`,
      icon: Users,
      change: '+5.1%',
      changeType: 'positive' as const
    },
    {
      title: 'Est. Revenue',
      value: `$${(analytics.totalPoints * 0.01).toFixed(2)}`,
      icon: DollarSign,
      change: '+15.3%',
      changeType: 'positive' as const
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-muted rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div className="mt-4">
                  <Badge 
                    variant={stat.changeType === 'positive' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {stat.change}
                  </Badge>
                  <span className="text-xs text-muted-foreground ml-2">
                    vs last month
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Engagement Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Engagement Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <EngagementChart data={analytics.chartData} />
        </CardContent>
      </Card>

      {/* Platform Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Platforms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Instagram', engagements: 89, color: 'bg-pink-500' },
                { name: 'Twitter', engagements: 67, color: 'bg-blue-500' },
                { name: 'YouTube', engagements: 45, color: 'bg-red-500' },
                { name: 'LinkedIn', engagements: 34, color: 'bg-blue-600' },
              ].map((platform) => (
                <div key={platform.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${platform.color}`} />
                    <span className="font-medium">{platform.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {platform.engagements} engagements
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Liked post on Instagram', points: '+10', time: '2 hours ago' },
                { action: 'Followed user on Twitter', points: '+25', time: '4 hours ago' },
                { action: 'Shared YouTube video', points: '+15', time: '1 day ago' },
                { action: 'Commented on LinkedIn', points: '+20', time: '2 days ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    {activity.points}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
