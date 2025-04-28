'use client';
export const dynamic = "force-dynamic";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/signin');
      return;
    }

    // Get user data from token
    try {
      const userData = JSON.parse(atob(token.split('.')[1]));
      const userRole = userData.role;

      // Redirect to role-specific dashboard
      if (userRole === 'student') {
        router.push('/dashboard/student');
      } else if (userRole === 'facility') {
        router.push('/dashboard/facility');
      } else {
        // If role is unknown, show loading state
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error parsing token:', error);
      router.push('/auth/signin');
    }
  }, [router]);

  if (isLoading) {
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