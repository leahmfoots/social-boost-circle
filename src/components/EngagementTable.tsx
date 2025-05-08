
import { Check, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Engagement } from "@/types/engagement";

interface EngagementTableProps {
  engagements: Engagement[];
}

const EngagementTable = ({ engagements }: EngagementTableProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Engagement History</h2>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Creator</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Content</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead className="text-right">Date</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {engagements.map((engagement) => (
              <TableRow key={engagement.id}>
                <TableCell className="font-medium">@{engagement.username}</TableCell>
                <TableCell>{engagement.platform}</TableCell>
                <TableCell className="max-w-[200px] truncate" title={engagement.title}>
                  {engagement.title}
                </TableCell>
                <TableCell className="text-right">{engagement.points}</TableCell>
                <TableCell className="text-right">
                  {new Date(engagement.completedAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  {engagement.status === "pending" ? (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Pending
                    </Badge>
                  ) : engagement.status === "verified" ? (
                    <Badge variant="success" className="flex items-center gap-1 bg-green-500">
                      <Check className="h-3 w-3" /> Verified
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <Check className="h-3 w-3" /> Rejected
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {engagements.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                  No engagement history found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EngagementTable;
