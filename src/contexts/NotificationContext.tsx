'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { sseService, Notification } from '@/lib/sse';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Subscribe to SSE notifications
    const handleNotification = (notification: Notification) => {
      console.log('Received notification in context:', notification); // Debug log
      setNotifications(prev => [notification, ...prev]);
      
      // Trigger custom events for dashboard refresh
      if (notification.type === 'new_order') {
        window.dispatchEvent(new CustomEvent('newOrder', { 
          detail: { order: notification.data } 
        }));
      } else if (notification.type === 'order_updated') {
        window.dispatchEvent(new CustomEvent('orderUpdated', { 
          detail: { order: notification.data } 
        }));
      }
    };

    sseService.subscribe(handleNotification);

    return () => {
      sseService.unsubscribe(handleNotification);
    };
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        clearNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
