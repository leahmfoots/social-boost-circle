
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, MoreVertical, Phone, Video } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  sent_at: string;
  is_read: boolean;
}

interface ChatWindowProps {
  conversationId: string | null;
  participant: {
    id: string;
    full_name: string;
    avatar_url: string | null;
    username: string;
  } | null;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ conversationId, participant }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversationId) {
      fetchMessages();
    }
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    if (!conversationId || !participant) return;
    
    setLoading(true);
    try {
      // For demo purposes, create mock messages
      const mockMessages: Message[] = [
        {
          id: '1',
          content: 'Hey! How\'s your engagement campaign going?',
          sender_id: participant.id,
          sent_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
          is_read: true
        },
        {
          id: '2',
          content: 'It\'s going great! I\'ve already earned 500 points this week.',
          sender_id: user?.id || '',
          sent_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          is_read: true
        },
        {
          id: '3',
          content: 'That\'s awesome! Would you like to collaborate on the next Instagram challenge?',
          sender_id: participant.id,
          sent_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          is_read: false
        }
      ];

      setMessages(mockMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !participant || !user) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      sender_id: user.id,
      sent_at: new Date().toISOString(),
      is_read: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    try {
      // Here you would send the message to your backend
      console.log('Sending message:', message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (!conversationId || !participant) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent>
          <div className="text-center text-muted-foreground">
            <div className="h-16 w-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Send className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
            <p>Choose a conversation from the list to start messaging</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={participant.avatar_url || undefined} />
              <AvatarFallback>
                {participant.full_name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{participant.full_name}</h3>
              <p className="text-sm text-muted-foreground">@{participant.username}</p>
            </div>
            <Badge variant="outline" className="text-xs">
              Online
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline">
              <Phone className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline">
              <Video className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 bg-muted rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            messages.map((message) => {
              const isOwn = message.sender_id === user?.id;
              return (
                <div
                  key={message.id}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`rounded-lg p-3 ${
                        isOwn
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p>{message.content}</p>
                    </div>
                    <p className={`text-xs text-muted-foreground mt-1 ${
                      isOwn ? 'text-right' : 'text-left'
                    }`}>
                      {formatTime(message.sent_at)}
                    </p>
                  </div>
                  {!isOwn && (
                    <Avatar className="order-1 mr-2 h-8 w-8">
                      <AvatarImage src={participant.avatar_url || undefined} />
                      <AvatarFallback className="text-xs">
                        {participant.full_name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};
