
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useRealtimeMessages = (groupId?: string, recipientId?: string) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: groupId 
            ? `group_id=eq.${groupId}`
            : `or(sender_id.eq.${user.id},recipient_id.eq.${user.id})`
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, groupId, recipientId]);

  return messages;
};

export const useRealtimeNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          const notification = payload.new as any;
          setNotifications(prev => [notification, ...prev]);
          
          // Show toast notification
          toast(notification.title, {
            description: notification.message,
            action: notification.data?.action_url ? {
              label: 'View',
              onClick: () => window.location.href = notification.data.action_url
            } : undefined
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return notifications;
};

export const useRealtimeEngagements = () => {
  const { user } = useAuth();
  const [engagements, setEngagements] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('engagements')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'engagements',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          const updatedEngagement = payload.new as any;
          setEngagements(prev => 
            prev.map(eng => 
              eng.id === updatedEngagement.id ? updatedEngagement : eng
            )
          );

          // Show notification for status changes
          if (updatedEngagement.status === 'verified') {
            toast.success('Engagement Verified!', {
              description: `You earned ${updatedEngagement.points_value} points`
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return engagements;
};
