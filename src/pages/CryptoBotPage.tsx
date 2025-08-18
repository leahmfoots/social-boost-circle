
import DashboardLayout from "@/components/DashboardLayout";
import CryptoBotChat from "@/components/ai/CryptoBotChat";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity, Brain } from "lucide-react";

const CryptoBotPage = () => {
  const marketData = [
    { symbol: 'BTC', name: 'Bitcoin', price: 43250.00, change: 2.5, volume: '25.4B' },
    { symbol: 'ETH', name: 'Ethereum', price: 2580.75, change: -1.2, volume: '12.8B' },
    { symbol: 'ADA', name: 'Cardano', price: 0.48, change: 4.8, volume: '890M' },
    { symbol: 'SOL', name: 'Solana', price: 98.50, change: 3.2, volume: '1.2B' },
  ];

  return (
    <DashboardLayout title="AI Crypto Bot">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Brain className="h-8 w-8 text-primary" />
              AI Crypto Assistant
            </h1>
            <p className="text-muted-foreground mt-1">
              Get intelligent crypto insights and trading recommendations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CryptoBotChat />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Market Overview</CardTitle>
                <CardDescription>Real-time crypto prices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {marketData.map((crypto) => (
                  <div key={crypto.symbol} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-semibold">{crypto.symbol}</div>
                      <div className="text-xs text-muted-foreground">{crypto.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${crypto.price.toLocaleString()}</div>
                      <div className={`text-xs flex items-center gap-1 ${
                        crypto.change > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {crypto.change > 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {Math.abs(crypto.change)}%
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Insights</CardTitle>
                <CardDescription>Current market analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="h-4 w-4 text-blue-500" />
                    <span className="font-medium text-sm">Market Sentiment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default">Cautiously Optimistic</Badge>
                    <span className="text-xs text-muted-foreground">65/100</span>
                  </div>
                </div>
                
                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-sm font-medium mb-1">Top Recommendation</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default">BTC - BUY</Badge>
                    <span className="text-xs text-muted-foreground">Strong support levels</span>
                  </div>
                </div>
                
                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-sm font-medium mb-1">Risk Level</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Moderate</Badge>
                    <span className="text-xs text-muted-foreground">Diversification advised</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CryptoBotPage;
