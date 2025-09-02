
import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useRealtimeMessages } from '@/hooks/useRealtime';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Paperclip, Image } from 'lucide-react';
import { toast } from 'sonner';

interface MessageThreadProps {
  recipientId?: string;
  groupId?: string;
}

export const MessageThread = ({ recipientId, groupId }: MessageThreadProps) => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Fetch existing messages
  const { data: messages, isLoading } = useQuery({
    queryKey: ['messages', recipientId, groupId],
    queryFn: async () => {
      let query = supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!sender_id(id, full_name, avatar_url, username)
        `)
        .order('sent_at', { ascending: true });

      if (groupId) {
        query = query.eq('group_id', groupId);
      } else if (recipientId) {
        query = query.or(`and(sender_id.eq.${user?.id},recipient_id.eq.${recipientId}),and(sender_id.eq.${recipientId},recipient_id.eq.${user?.id})`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!user && (!!recipientId || !!groupId),
  });

  // Real-time message updates
  const realtimeMessages = useRealtimeMessages(groupId, recipientId);

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          sender_id: user!.id,
          recipient_id: recipientId,
          group_id: groupId,
          content,
          message_type: 'text'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      setMessage('');
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
    onError: (error) => {
      toast.error('Failed to send message');
      console.error('Send message error:', error);
    }
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMessageMutation.mutate(message);
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, realtimeMessages]);

  // Mark messages as read
  useEffect(() => {
    if (messages && user) {
      const unreadMessages = messages.filter(
        msg => !msg.is_read && msg.sender_id !== user.id
      );
      
      if (unreadMessages.length > 0) {
        supabase
          .from('messages')
          .update({ is_read: true })
          .in('id', unreadMessages.map(msg => msg.id))
          .then(() => {
            queryClient.invalidateQueries({ queryKey: ['messages'] });
          });
      }
    }
  }, [messages, user, queryClient]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const allMessages = [...(messages || []), ...realtimeMessages];

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {allMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.sender_id === user?.id ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender_id !== user?.id && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src={msg.sender?.avatar_url} />
                  <AvatarFallback>
                    {msg.sender?.full_name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              )}
              
              <Card className={`max-w-xs lg:max-w-md ${
                msg.sender_id === user?.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted'
              }`}>
                <CardContent className="p-3">
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(msg.sent_at).toLocaleTimeString()}
                  </p>
                </CardContent>
              </Card>
              
              {msg.sender_id === user?.id && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback>
                    {user.user_metadata?.full_name?.charAt(0) || 'Y'}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message input */}
      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
          >
            <Image className="h-4 w-4" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            disabled={sendMessageMutation.isPending}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!message.trim() || sendMessageMutation.isPending}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
