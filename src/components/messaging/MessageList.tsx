
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageCircle, Search, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Conversation {
  id: string;
  participant: {
    id: string;
    full_name: string;
    avatar_url: string | null;
    username: string;
  };
  lastMessage: {
    content: string;
    sent_at: string;
    is_read: boolean;
  };
  unreadCount: number;
}

interface MessageListProps {
  onConversationSelect: (conversationId: string, participant: any) => void;
}

export const MessageList: React.FC<MessageListProps> = ({ onConversationSelect }) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchConversations();
    }
  }, [user]);

  const fetchConversations = async () => {
    try {
      // For demo purposes, create mock conversations
      const mockConversations: Conversation[] = [
        {
          id: '1',
          participant: {
            id: 'user1',
            full_name: 'Sarah Johnson',
            avatar_url: null,
            username: 'sarah_j'
          },
          lastMessage: {
            content: 'Hey! How\'s your engagement campaign going?',
            sent_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
            is_read: false
          },
          unreadCount: 2
        },
        {
          id: '2',
          participant: {
            id: 'user2',
            full_name: 'Mike Chen',
            avatar_url: null,
            username: 'mike_c'
          },
          lastMessage: {
            content: 'Thanks for the collaboration!',
            sent_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
            is_read: true
          },
          unreadCount: 0
        },
        {
          id: '3',
          participant: {
            id: 'user3',
            full_name: 'Emma Wilson',
            avatar_url: null,
            username: 'emma_w'
          },
          lastMessage: {
            content: 'Let\'s work on that Instagram challenge together',
            sent_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
            is_read: true
          },
          unreadCount: 0
        }
      ];

      setConversations(mockConversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.participant.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.participant.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 1) {
      return `${Math.floor(diffMs / (1000 * 60))}m ago`;
    } else if (diffHours < 24) {
      return `${Math.floor(diffHours)}h ago`;
    } else {
      return `${Math.floor(diffHours / 24)}d ago`;
    }
  };

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <div className="animate-pulse">
            <div className="h-6 bg-muted rounded w-1/2"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse flex items-center space-x-3">
                <div className="h-10 w-10 bg-muted rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Messages
          </span>
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className="flex items-center space-x-3 p-4 hover:bg-muted/50 cursor-pointer transition-colors border-b border-border"
              onClick={() => onConversationSelect(conversation.id, conversation.participant)}
            >
              <Avatar>
                <AvatarImage src={conversation.participant.avatar_url || undefined} />
                <AvatarFallback>
                  {conversation.participant.full_name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">
                    {conversation.participant.full_name}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(conversation.lastMessage.sent_at)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.lastMessage.content}
                  </p>
                  {conversation.unreadCount > 0 && (
                    <Badge variant="default" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {filteredConversations.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No conversations found</p>
              <p className="text-sm">Start a new conversation to connect with other creators</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
