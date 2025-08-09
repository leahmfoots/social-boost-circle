
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PointsTransaction } from "@/types/rewards";
import { ArrowUp, ArrowDown, Gift } from "lucide-react";

interface PointsHistoryProps {
  transactions: PointsTransaction[];
}

const PointsHistory = ({ transactions }: PointsHistoryProps) => {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earned':
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'spent':
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      case 'bonus':
        return <Gift className="h-4 w-4 text-blue-500" />;
      default:
        return <ArrowUp className="h-4 w-4" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'earned':
        return 'text-green-600';
      case 'spent':
        return 'text-red-600';
      case 'bonus':
        return 'text-blue-600';
      default:
        return 'text-foreground';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Points History</CardTitle>
        <CardDescription>Your recent point transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {getTransactionIcon(transaction.type)}
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {transaction.source}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={`font-bold ${getTransactionColor(transaction.type)}`}>
                  {transaction.type === 'spent' ? '-' : '+'}
                  {transaction.amount} pts
                </div>
              </div>
            ))}
            {transactions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No transactions yet. Start engaging to earn points!
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PointsHistory;
