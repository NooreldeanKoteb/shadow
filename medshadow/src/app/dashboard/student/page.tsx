import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../api/auth/[...nextauth]/authOptions';
import MainLayout from '@/components/layout/MainLayout';
import StudentDashboardClient from '@/components/dashboard/StudentDashboardClient';

export default async function StudentDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  if (session.user.role !== 'student') {
    redirect('/auth/error');
  }

  return (
    <MainLayout>
      <StudentDashboardClient user={session.user} />
    </MainLayout>
  );
} 