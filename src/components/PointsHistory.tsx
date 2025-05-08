
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Award, ArrowUp, ArrowDown } from "lucide-react";

// Sample points history data
const pointsHistoryData = [
  {
    id: "p1",
    type: "earned",
    amount: 15,
    description: "Engaged with YouTube video by creator123",
    date: "2023-05-07T14:30:00Z",
  },
  {
    id: "p2",
    type: "earned",
    amount: 50,
    description: "Achievement: First Steps completed",
    date: "2023-05-06T11:15:00Z",
  },
  {
    id: "p3",
    type: "spent",
    amount: 500,
    description: "Redeemed: Featured Creator Spotlight",
    date: "2023-05-05T09:45:00Z",
  },
  {
    id: "p4",
    type: "earned",
    amount: 10,
    description: "Engaged with Instagram post by social_expert",
    date: "2023-05-04T16:20:00Z",
  },
  {
    id: "p5",
    type: "earned",
    amount: 5,
    description: "Engaged with Twitter post by digital_artist",
    date: "2023-05-03T10:10:00Z",
  },
  {
    id: "p6",
    type: "earned",
    amount: 100,
    description: "Achievement: Rising Star completed",
    date: "2023-05-02T12:30:00Z",
  },
];

const PointsHistory = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Points History</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="earned">Points Earned</SelectItem>
              <SelectItem value="spent">Points Spent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pointsHistoryData.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <div className="flex items-center">
                    {transaction.type === "earned" ? (
                      <>
                        <div className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2">
                          <ArrowUp className="h-4 w-4" />
                        </div>
                        <span className="font-medium">Earned</span>
                      </>
                    ) : (
                      <>
                        <div className="h-8 w-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-2">
                          <ArrowDown className="h-4 w-4" />
                        </div>
                        <span className="font-medium">Spent</span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell className={`text-right font-medium ${
                  transaction.type === "earned" ? "text-green-600" : "text-red-600"
                }`}>
                  {transaction.type === "earned" ? "+" : "-"}{transaction.amount}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default PointsHistory;
