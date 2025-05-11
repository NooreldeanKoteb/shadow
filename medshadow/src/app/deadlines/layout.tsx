import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export const dynamic = "force-dynamic";

export default async function DeadlinesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  // Only students can access deadlines
  if (!session.user?.role || session.user.role !== 'student') {
    redirect('/auth/error?error=Unauthorized');
  }

  return <>{children}</>;
} 