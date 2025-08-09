
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, CheckCircle } from "lucide-react";
import { Reward } from "@/types/rewards";

interface RewardClaimModalProps {
  reward: Reward | null;
  isOpen: boolean;
  onClose: () => void;
  onClaim: (rewardId: string) => void;
  userPoints: number;
}

const RewardClaimModal = ({ reward, isOpen, onClose, onClaim, userPoints }: RewardClaimModalProps) => {
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);

  if (!reward) return null;

  const handleClaim = async () => {
    setClaiming(true);
    try {
      await onClaim(reward.id);
      setClaimed(true);
      setTimeout(() => {
        setClaimed(false);
        setClaiming(false);
        onClose();
      }, 2000);
    } catch (error) {
      setClaiming(false);
    }
  };

  const canClaim = userPoints >= reward.pointsRequired && !reward.claimed;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <Gift className="h-6 w-6 text-primary" />
            <DialogTitle>{reward.title}</DialogTitle>
          </div>
          <DialogDescription>{reward.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
            <span className="font-medium">Points Required:</span>
            <Badge variant="secondary">{reward.pointsRequired} points</Badge>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
            <span className="font-medium">Your Points:</span>
            <Badge variant={canClaim ? "default" : "destructive"}>
              {userPoints} points
            </Badge>
          </div>

          <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
            <span className="font-medium">Category:</span>
            <Badge variant="outline">{reward.category}</Badge>
          </div>

          {!canClaim && userPoints < reward.pointsRequired && (
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
              <p className="text-sm text-orange-800 dark:text-orange-200">
                You need {reward.pointsRequired - userPoints} more points to claim this reward.
              </p>
            </div>
          )}

          {claimed && (
            <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-800 dark:text-green-200 font-medium">
                Reward claimed successfully!
              </span>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleClaim} 
            disabled={!canClaim || claiming || claimed}
          >
            {claiming ? 'Claiming...' : claimed ? 'Claimed!' : 'Claim Reward'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RewardClaimModal;
