'use client';

import { useEffect } from 'react';
import { useServiceWorker } from '@/hooks';
import { useNotificationStore } from '@/stores/notification-store';

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const { isRegistered } = useServiceWorker();
  const { checkSupport } = useNotificationStore();

  useEffect(() => {
    // Check notification support on mount
    checkSupport();
  }, [checkSupport]);

  useEffect(() => {
    if (isRegistered) {
      console.log('App: Service worker is ready');
    }
  }, [isRegistered]);

  return <>{children}</>;
}
