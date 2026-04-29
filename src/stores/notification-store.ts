'use client';

import { create } from 'zustand';
import type { AppNotification } from '@/types';

interface NotificationStore {
  permission: NotificationPermission | 'default';
  notifications: AppNotification[];
  isSupported: boolean;
  requestPermission: () => Promise<void>;
  sendNotification: (title: string, options?: NotificationOptions) => void;
  addNotification: (notification: Omit<AppNotification, 'id' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  clearNotifications: () => void;
  checkSupport: () => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  permission: 'default',
  notifications: [],
  isSupported: false,

  checkSupport: () => {
    const isSupported = typeof window !== 'undefined' && 'Notification' in window;
    set({
      isSupported,
      permission: isSupported ? Notification.permission : 'default',
    });
  },

  requestPermission: async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      set({ permission });
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  },

  sendNotification: (title: string, options?: NotificationOptions) => {
    const { permission, isSupported, addNotification } = get();

    // Add to internal notifications list
    addNotification({
      title,
      body: options?.body || '',
      read: false,
      type: 'info',
    });

    // Send browser notification if permitted
    if (isSupported && permission === 'granted') {
      try {
        new Notification(title, {
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          ...options,
        });
      } catch (error) {
        console.error('Error sending notification:', error);
      }
    }
  },

  addNotification: (notification) => {
    const newNotification: AppNotification = {
      ...notification,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };

    set((state) => ({
      notifications: [newNotification, ...state.notifications].slice(0, 50), // Keep last 50
    }));
  },

  markAsRead: (id: string) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },
}));
