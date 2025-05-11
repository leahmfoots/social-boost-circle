
import { useState } from "react";
import { toast } from "sonner";
import { Upload, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Group } from "@/types/user";

interface GroupFormProps {
  initialData?: Partial<Group>;
  onSubmit: (data: Partial<Group>) => Promise<void>;
  isLoading?: boolean;
  buttonText?: string;
}

const CATEGORIES = [
  "Content Creation",
  "Influencers",
  "Social Media",
  "Video Production",
  "Blogging",
  "Photography",
  "Gaming",
  "Marketing",
  "Branding",
  "Music",
  "Art",
  "Lifestyle",
  "Technology",
  "Business",
  "Education",
  "Other"
];

const GroupForm = ({ initialData = {}, onSubmit, isLoading = false, buttonText = "Create Group" }: GroupFormProps) => {
  const [name, setName] = useState(initialData.name || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [category, setCategory] = useState(initialData.category || CATEGORIES[0]);
  const [coverImage, setCoverImage] = useState(initialData.coverImage || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(coverImage || null);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Group name is required");
      return;
    }
    
    if (!description.trim()) {
      toast.error("Group description is required");
      return;
    }
    
    try {
      // In a real app, would upload image and get URL
      // For now, just use the preview or existing URL
      const groupData: Partial<Group> = {
        name,
        description,
        category,
        coverImage: imagePreview || coverImage
      };
      
      await onSubmit(groupData);
    } catch (error) {
      toast.error("Failed to save group. Please try again.");
      console.error("Group save error:", error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Group Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter group name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What is this group about?"
          rows={4}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Cover Image</Label>
        <div className="mt-1 flex flex-col items-center space-y-4">
          {imagePreview && (
            <div className="relative w-full h-40 bg-gray-100 rounded-md overflow-hidden">
              <img
                src={imagePreview}
                alt="Cover preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <Label 
            htmlFor="cover-image" 
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {imagePreview ? (
                <>
                  <Image className="w-8 h-8 mb-2" />
                  <p className="text-sm text-gray-500">Change cover image</p>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 mb-2" />
                  <p className="text-sm text-gray-500">Upload cover image</p>
                  <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
                </>
              )}
            </div>
            <Input
              id="cover-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </Label>
        </div>
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Saving..." : buttonText}
      </Button>
    </form>
  );
};

export default GroupForm;
