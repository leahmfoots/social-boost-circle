
import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface FilterOption {
  id: string;
  label: string;
}

interface EngagementFilterProps {
  onFilterChange: (filters: {
    platforms: string[];
    contentTypes: string[];
    pointsRange: [number, number];
  }) => void;
}

const platforms: FilterOption[] = [
  { id: "youtube", label: "YouTube" },
  { id: "instagram", label: "Instagram" },
  { id: "twitter", label: "Twitter" },
  { id: "tiktok", label: "TikTok" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "facebook", label: "Facebook" },
];

const contentTypes: FilterOption[] = [
  { id: "video", label: "Video" },
  { id: "post", label: "Post" },
  { id: "story", label: "Story" },
  { id: "reel", label: "Reel" },
  { id: "live", label: "Live" },
  { id: "comment", label: "Comment" },
];

const EngagementFilter = ({ onFilterChange }: EngagementFilterProps) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>([]);
  const [pointsRange, setPointsRange] = useState<[number, number]>([0, 100]);

  const applyFilters = () => {
    onFilterChange({
      platforms: selectedPlatforms,
      contentTypes: selectedContentTypes,
      pointsRange,
    });
  };

  const resetFilters = () => {
    setSelectedPlatforms([]);
    setSelectedContentTypes([]);
    setPointsRange([0, 100]);
    onFilterChange({
      platforms: [],
      contentTypes: [],
      pointsRange: [0, 100],
    });
  };

  const totalFiltersApplied = selectedPlatforms.length + selectedContentTypes.length + 
    (pointsRange[0] > 0 || pointsRange[1] < 100 ? 1 : 0);

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(current =>
      current.includes(platformId)
        ? current.filter(id => id !== platformId)
        : [...current, platformId]
    );
  };

  const handleContentTypeToggle = (contentTypeId: string) => {
    setSelectedContentTypes(current =>
      current.includes(contentTypeId)
        ? current.filter(id => id !== contentTypeId)
        : [...current, contentTypeId]
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {totalFiltersApplied > 0 && (
            <Badge variant="secondary" className="ml-2">
              {totalFiltersApplied}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Platforms</h3>
            <div className="grid grid-cols-2 gap-2">
              {platforms.map((platform) => (
                <div key={platform.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`platform-${platform.id}`}
                    checked={selectedPlatforms.includes(platform.id)}
                    onCheckedChange={() => handlePlatformToggle(platform.id)}
                  />
                  <label
                    htmlFor={`platform-${platform.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {platform.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-2">Content Types</h3>
            <div className="grid grid-cols-2 gap-2">
              {contentTypes.map((contentType) => (
                <div key={contentType.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`content-${contentType.id}`}
                    checked={selectedContentTypes.includes(contentType.id)}
                    onCheckedChange={() => handleContentTypeToggle(contentType.id)}
                  />
                  <label
                    htmlFor={`content-${contentType.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {contentType.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Reset
            </Button>
            <Button size="sm" onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EngagementFilter;
