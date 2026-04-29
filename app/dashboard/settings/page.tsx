'use client';

import { Bell, Shield, Palette, User } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';
import { useNotificationStore } from '@/stores/notification-store';
import { useAuthStore } from '@/stores/auth-store';

export default function SettingsPage() {
  const { user } = useAuthStore();
  const { permission, requestPermission, sendNotification } = useNotificationStore();

  const handleTestNotification = () => {
    sendNotification('Test Notification', {
      body: 'This is a test notification from Healthcare SaaS',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your account and application preferences
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card variant="bordered">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" />
              <CardTitle>Profile Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <p className="text-gray-900 dark:text-white mt-1">
                  {user?.email || 'Not available'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Display Name
                </label>
                <p className="text-gray-900 dark:text-white mt-1">
                  {user?.displayName || 'Not set'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  User ID
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">
                  {user?.uid || 'Not available'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card variant="bordered">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-gray-500" />
              <CardTitle>Notifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Push Notifications
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive notifications about patient updates and appointments
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    permission === 'granted'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      : permission === 'denied'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                  }`}>
                    {permission === 'granted' ? 'Enabled' : permission === 'denied' ? 'Blocked' : 'Not Set'}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                {permission !== 'granted' && (
                  <Button onClick={requestPermission} variant="outline" size="sm">
                    Enable Notifications
                  </Button>
                )}
                <Button onClick={handleTestNotification} variant="secondary" size="sm">
                  Send Test Notification
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card variant="bordered">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-gray-500" />
              <CardTitle>Appearance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Theme
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Choose between light and dark mode
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.documentElement.classList.remove('dark')}
                  >
                    Light
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.documentElement.classList.add('dark')}
                  >
                    Dark
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card variant="bordered">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-gray-500" />
              <CardTitle>Security</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Session Information
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  You are currently signed in with Firebase Authentication.
                  Your session is secure and encrypted.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
