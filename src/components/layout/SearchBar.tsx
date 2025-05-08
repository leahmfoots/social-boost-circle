
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, User, Award, Settings, TrendingUp } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-full justify-start text-muted-foreground sm:w-64 lg:w-80"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span>Search...</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => navigate('/dashboard'))}>
              <TrendingUp className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate('/dashboard/engagement'))}>
              <TrendingUp className="mr-2 h-4 w-4" />
              <span>Engagement Hub</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate('/dashboard/rewards'))}>
              <Award className="mr-2 h-4 w-4" />
              <span>Rewards</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate('/dashboard/accounts'))}>
              <User className="mr-2 h-4 w-4" />
              <span>Connected Accounts</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={() => runCommand(() => navigate('/dashboard/settings'))}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Account Settings</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBar;
