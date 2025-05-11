import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export const dynamic = "force-dynamic";

export default async function OpportunitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  // Only facilities can manage opportunities
  if (!session.user?.role || session.user.role !== 'facility') {
    redirect('/auth/error?error=Unauthorized');
  }

  return <>{children}</>;
} 