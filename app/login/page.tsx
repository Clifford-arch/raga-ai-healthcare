'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Heart, Mail, Lock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useAuthStore } from '@/stores/auth-store';
import { useNotificationStore } from '@/stores/notification-store';
import { loginSchema, type LoginSchema } from '@/lib/validations';

export default function LoginPage() {
  const router = useRouter();
  const [showError, setShowError] = useState(false);

  // auth store
  const login = useAuthStore((s) => s.login);
  const isLoading = useAuthStore((s) => s.isLoading);
  const error = useAuthStore((s) => s.error);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setError = useAuthStore((s) => s.setError);
  const initialize = useAuthStore((s) => s.initialize);

  // notifications
  const requestPermission = useNotificationStore((s) => s.requestPermission);
  const sendNotification = useNotificationStore((s) => s.sendNotification);
  const checkSupport = useNotificationStore((s) => s.checkSupport);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    const unsub = initialize();
    checkSupport();
    return unsub;
  }, []);

  // redirect if logged in
  useEffect(() => {
    if (isAuthenticated) router.replace('/dashboard');
  }, [isAuthenticated]);

  // auto hide error after 5s
  useEffect(() => {
    if (!error) return;
    setShowError(true);
    const t = setTimeout(() => {
      setShowError(false);
      setError(null);
    }, 5000);
    return () => clearTimeout(t);
  }, [error]);

  const onSubmit = async (data: LoginSchema) => {
    try {
      await login(data.email, data.password);
      // try to get notification permission
      await requestPermission();
      sendNotification('Welcome back!', { body: 'You have successfully logged in' });
      router.push('/dashboard');
    } catch {
      // error handled in store
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md">
        {/* logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Healthcare SaaS</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to your account</p>
        </div>

        <Card variant="elevated" className="shadow-xl">
          <CardContent className="p-6">
            {/* error msg */}
            {showError && error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="Email address"
                  error={errors.email?.message}
                  className="pl-10"
                  autoComplete="email"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  {...register('password')}
                  type="password"
                  placeholder="Password"
                  error={errors.password?.message}
                  className="pl-10"
                  autoComplete="current-password"
                />
              </div>

              <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                Sign in
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Demo: Use your Firebase test account</p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-8">B2B Healthcare SaaS Platform</p>
      </div>
    </div>
  );
}
