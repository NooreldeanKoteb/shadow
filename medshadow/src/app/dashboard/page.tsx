'use client';
export const dynamic = "force-dynamic";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import MainLayout from '@/components/layout/MainLayout';

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (session?.user?.role) {
      // Redirect to role-specific dashboard
      if (session.user.role === 'student') {
        router.push('/dashboard/student');
      } else if (session.user.role === 'facility') {
        router.push('/dashboard/facility');
      } else {
        // If role is unknown, show error state
        setIsLoading(false);
      }
    } else {
      // If no role is found, redirect to sign in
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  if (isLoading || status === 'loading') {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <p>Redirecting to your role-specific dashboard...</p>
      </div>
    </MainLayout>
  );
} 