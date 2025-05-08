
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, MessageSquare, Award } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, icon }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">
        {change}
      </p>
    </CardContent>
  </Card>
);

interface DashboardStatsGridProps {
  stats?: {
    totalPoints: number;
    engagements: number;
    engagementRate: string;
  };
}

const DashboardStatsGrid = ({ stats = { totalPoints: 780, engagements: 3, engagementRate: "18.2%" } }: DashboardStatsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard 
        title="Total Points" 
        value={stats.totalPoints.toString()} 
        change="+45 points since last week"
        icon={<Award className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard 
        title="Engagements" 
        value={stats.engagements.toString()} 
        change="+3 engagements since last week"
        icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard 
        title="Engagement Rate" 
        value={stats.engagementRate} 
        change="+2.4% since last week"
        icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
};

export default DashboardStatsGrid;
