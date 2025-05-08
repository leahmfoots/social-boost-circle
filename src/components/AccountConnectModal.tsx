
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "lucide-react";

interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  connected: boolean;
  stats?: {
    followers: number;
    posts: number;
    engagement: number;
  };
}

interface AccountConnectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  platform: Platform | null;
  onConnect: (platformId: string, username: string) => void;
}

const AccountConnectModal = ({ 
  open, 
  onOpenChange, 
  platform, 
  onConnect 
}: AccountConnectModalProps) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!platform || !username.trim()) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onConnect(platform.id, username);
      setUsername("");
      setLoading(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {platform?.icon}
            <span>Connect {platform?.name}</span>
          </DialogTitle>
          <DialogDescription>
            Connect your {platform?.name} account to track engagement and earn points.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Your {platform?.name} Username</Label>
            <Input
              id="username"
              placeholder={`Enter your ${platform?.name} username`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="text-sm font-medium mb-2">What happens when you connect:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• RoundAbout will verify your account ownership</li>
              <li>• You'll be able to track engagement from this platform</li>
              <li>• Other creators can find and engage with your content</li>
              <li>• Your engagement activities will be tracked for points</li>
            </ul>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!username.trim() || loading}
            >
              {loading ? "Connecting..." : "Connect Account"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AccountConnectModal;
