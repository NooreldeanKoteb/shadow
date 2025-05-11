import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  // Ensure user has a valid role
  if (!session.user?.role || !['student', 'facility'].includes(session.user.role)) {
    redirect('/auth/error?error=InvalidRole');
  }

  return <>{children}</>;
} 