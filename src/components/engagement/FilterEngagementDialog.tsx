
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterOptions {
  platform: string | null;
  minPoints: number | null;
  maxTime: string | null;
  contentTypes: string[];
}

interface FilterEngagementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFilter: (filters: FilterOptions) => void;
}

const FilterEngagementDialog = ({ open, onOpenChange, onFilter }: FilterEngagementDialogProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    platform: null,
    minPoints: null,
    maxTime: null,
    contentTypes: ["video", "post", "tweet"],
  });

  const handleApplyFilters = () => {
    onFilter(filters);
    onOpenChange(false);
  };

  const handleReset = () => {
    setFilters({
      platform: null,
      minPoints: null,
      maxTime: null,
      contentTypes: ["video", "post", "tweet"],
    });
    onFilter({
      platform: null,
      minPoints: null,
      maxTime: null,
      contentTypes: ["video", "post", "tweet"],
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Engagement Opportunities</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="platform" className="text-right">Platform</Label>
            <div className="col-span-3">
              <Select
                value={filters.platform || ""}
                onValueChange={(value) => setFilters({...filters, platform: value || null})}
              >
                <SelectTrigger id="platform">
                  <SelectValue placeholder="All Platforms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Platforms</SelectItem>
                  <SelectItem value="YouTube">YouTube</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="Twitter">Twitter</SelectItem>
                  <SelectItem value="TikTok">TikTok</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="points" className="text-right">Min Points</Label>
            <div className="col-span-3">
              <Select
                value={filters.minPoints?.toString() || ""}
                onValueChange={(value) => setFilters({...filters, minPoints: value ? parseInt(value) : null})}
              >
                <SelectTrigger id="points">
                  <SelectValue placeholder="No Minimum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No Minimum</SelectItem>
                  <SelectItem value="5">5+ Points</SelectItem>
                  <SelectItem value="10">10+ Points</SelectItem>
                  <SelectItem value="15">15+ Points</SelectItem>
                  <SelectItem value="20">20+ Points</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">Max Time</Label>
            <div className="col-span-3">
              <Select
                value={filters.maxTime || ""}
                onValueChange={(value) => setFilters({...filters, maxTime: value || null})}
              >
                <SelectTrigger id="time">
                  <SelectValue placeholder="Any Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any Duration</SelectItem>
                  <SelectItem value="1-2 min">1-2 Minutes</SelectItem>
                  <SelectItem value="2-3 min">2-3 Minutes</SelectItem>
                  <SelectItem value="3-5 min">3-5 Minutes</SelectItem>
                  <SelectItem value="5-7 min">5-7 Minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Content Type</Label>
            <div className="col-span-3 flex flex-col gap-2">
              {["video", "post", "tweet"].map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <Checkbox
                    id={`content-${type}`}
                    checked={filters.contentTypes.includes(type)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilters({...filters, contentTypes: [...filters.contentTypes, type]});
                      } else {
                        setFilters({...filters, contentTypes: filters.contentTypes.filter(t => t !== type)});
                      }
                    }}
                  />
                  <Label htmlFor={`content-${type}`} className="capitalize">{type}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleReset}>Reset</Button>
          <Button onClick={handleApplyFilters}>Apply Filters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterEngagementDialog;
