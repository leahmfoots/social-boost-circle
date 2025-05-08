
import { SidebarTrigger } from "@/components/ui/sidebar";
import NotificationCenter from "@/components/layout/NotificationCenter";
import SearchBar from "@/components/layout/SearchBar";

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader = ({ title }: DashboardHeaderProps) => {
  return (
    <header className="border-b bg-white">
      <div className="container py-4 flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="font-semibold text-xl">{title}</h1>
        <div className="ml-auto flex items-center gap-2">
          <SearchBar />
          <NotificationCenter />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
