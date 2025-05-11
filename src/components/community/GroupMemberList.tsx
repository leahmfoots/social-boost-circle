
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GroupMember } from "@/types/user";

interface GroupMemberListProps {
  members: GroupMember[];
  isAdmin: boolean;
  onRemoveMember?: (memberId: string) => void;
  onPromoteMember?: (memberId: string, role: 'member' | 'moderator' | 'admin') => void;
}

const getRoleColor = (role: 'member' | 'moderator' | 'admin') => {
  switch (role) {
    case 'admin':
      return "bg-red-100 text-red-800 hover:bg-red-200";
    case 'moderator':
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

const GroupMemberList = ({ 
  members, 
  isAdmin, 
  onRemoveMember, 
  onPromoteMember 
}: GroupMemberListProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  
  const handleProfileClick = (userId: string) => {
    navigate(`/dashboard/community/profile/${userId}`);
  };
  
  const handleRemoveMember = async (memberId: string) => {
    if (!onRemoveMember) return;
    
    try {
      setIsLoading(prev => ({ ...prev, [memberId]: true }));
      await onRemoveMember(memberId);
    } finally {
      setIsLoading(prev => ({ ...prev, [memberId]: false }));
    }
  };
  
  const handlePromoteMember = async (memberId: string, currentRole: 'member' | 'moderator' | 'admin') => {
    if (!onPromoteMember) return;
    
    const newRole = currentRole === 'member' ? 'moderator' : 
                   currentRole === 'moderator' ? 'admin' : 'admin';
    
    try {
      setIsLoading(prev => ({ ...prev, [`promote-${memberId}`]: true }));
      await onPromoteMember(memberId, newRole);
    } finally {
      setIsLoading(prev => ({ ...prev, [`promote-${memberId}`]: false }));
    }
  };
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined</TableHead>
            {isAdmin && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleProfileClick(member.id)}>
                  <Avatar>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">@{member.username}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getRoleColor(member.role)} variant="outline">
                  {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(member.joinedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </TableCell>
              {isAdmin && (
                <TableCell className="text-right space-x-2">
                  {member.role !== 'admin' && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={isLoading[`promote-${member.id}`]}
                        onClick={() => handlePromoteMember(member.id, member.role)}
                      >
                        {member.role === 'member' ? 'Make Moderator' : 'Make Admin'}
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        disabled={isLoading[member.id]}
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        Remove
                      </Button>
                    </>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GroupMemberList;
