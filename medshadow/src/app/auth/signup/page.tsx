export const dynamic = "force-dynamic";
export const revalidate = 0;

import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import MainLayout from '@/components/layout/MainLayout';
import SignUpForm from '@/components/auth/SignUpForm';
import Image from 'next/image';

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    const role = session.user.role as 'student' | 'facility';
    redirect(`/dashboard/${role}`);
  }

  const userType = (searchParams?.type === 'facility' ? 'facility' : 'student');

  return (
    <MainLayout hideUserMenu>
      <section className="relative min-h-screen bg-gradient-to-r from-[#14213D] to-[#1A365D]">
        <div className="absolute inset-0 z-0 mix-blend-overlay opacity-20">
          <Image
            src="/images/hero-bg.png"
            alt="Medical professionals"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#14213D]/60 to-transparent z-0"></div>
        
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl p-8 md:p-10 border border-white/10">
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-1 bg-[#FCA311]/20 text-[#FCA311] rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-[#FCA311]/30">
                {userType === 'student' ? 'Student Registration' : 'Facility Registration'}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#14213D] mb-2">
                {userType === 'student' ? 'Join as a Student' : 'Register Your Facility'}
              </h1>
              <p className="text-[#4B5563]">
                {userType === 'student'
                  ? 'Create an account to find shadowing opportunities'
                  : 'Partner with us to showcase your shadowing opportunities'
                }
              </p>
            </div>
            <SignUpForm userType={userType} />
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 