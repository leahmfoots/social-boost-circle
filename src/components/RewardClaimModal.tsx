
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Award, Gift, AlertTriangle } from "lucide-react";

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  image: string;
  category: string;
}

interface RewardClaimModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reward: Reward | null;
  userPoints: number;
  onClaim: () => void;
}

const RewardClaimModal = ({
  open,
  onOpenChange,
  reward,
  userPoints,
  onClaim
}: RewardClaimModalProps) => {
  if (!reward) return null;
  
  const canAfford = userPoints >= reward.pointsRequired;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            <span>Claim Reward</span>
          </DialogTitle>
          <DialogDescription>
            You're about to claim the following reward using your points.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
          <div className="h-16 w-16 rounded-full gradient-bg flex items-center justify-center text-white mb-4">
            <Award className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold mb-1">{reward.title}</h3>
          <p className="text-sm text-center text-muted-foreground mb-4">{reward.description}</p>
          <div className="flex items-center gap-1 text-lg font-medium">
            <Award className="h-5 w-5 text-primary" />
            <span>{reward.pointsRequired} points</span>
          </div>
        </div>
        
        {!canAfford && (
          <div className="flex items-start gap-3 p-3 border border-yellow-200 bg-yellow-50 rounded-md">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="font-medium text-sm">Not enough points</p>
              <p className="text-xs text-muted-foreground mt-1">
                You need {reward.pointsRequired - userPoints} more points to claim this reward.
              </p>
            </div>
          </div>
        )}
        
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            disabled={!canAfford}
            onClick={onClaim}
          >
            {canAfford ? "Confirm Claim" : "Need More Points"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RewardClaimModal;
