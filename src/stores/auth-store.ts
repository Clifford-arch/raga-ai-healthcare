'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';
import { loginWithEmail, logout as firebaseLogout, subscribeToAuthChanges } from '@/lib/firebase/auth';

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  initialize: () => () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,
      isInitialized: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const user = await loginWithEmail(email, password);
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error: any) {
          // firebase errors are weird, need to parse the message
          const msg = error?.message || 'Login failed';
          let friendlyMessage = msg;

          if (msg.includes('invalid-credential') || msg.includes('wrong-password')) {
            friendlyMessage = 'Invalid email or password';
          } else if (msg.includes('user-not-found')) {
            friendlyMessage = 'No account found with this email';
          } else if (msg.includes('too-many-requests')) {
            friendlyMessage = 'Too many attempts. Please try again later';
          }
          // TODO: handle network errors better

          set({ error: friendlyMessage, isLoading: false });
          throw new Error(friendlyMessage);
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await firebaseLogout();
          set({ user: null, isAuthenticated: false, isLoading: false });
        } catch (err) {
          // just reset loading, user can try again
          set({ isLoading: false });
          console.error('logout failed:', err);
        }
      },

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setError: (error) => set({ error }),
      setLoading: (isLoading) => set({ isLoading }),

      initialize: () => {
        set({ isLoading: true });
        const unsubscribe = subscribeToAuthChanges((user) => {
          set({ user, isAuthenticated: !!user, isLoading: false, isInitialized: true });
        });
        return unsubscribe;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
