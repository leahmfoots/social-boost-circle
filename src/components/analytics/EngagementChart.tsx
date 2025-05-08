
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const data = [
  { day: "Mon", engagements: 4, points: 35 },
  { day: "Tue", engagements: 7, points: 55 },
  { day: "Wed", engagements: 5, points: 40 },
  { day: "Thu", engagements: 8, points: 70 },
  { day: "Fri", engagements: 12, points: 95 },
  { day: "Sat", engagements: 10, points: 85 },
  { day: "Sun", engagements: 9, points: 75 },
];

interface EngagementChartProps {
  title?: string;
}

const EngagementChart = ({ title = "Weekly Engagement Overview" }: EngagementChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorEngagements" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="engagements" 
                stroke="#8884d8" 
                fillOpacity={1} 
                fill="url(#colorEngagements)" 
                name="Engagements"
              />
              <Area 
                type="monotone" 
                dataKey="points" 
                stroke="#82ca9d" 
                fillOpacity={1} 
                fill="url(#colorPoints)" 
                name="Points"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementChart;
