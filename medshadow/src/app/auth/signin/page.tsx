import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import MainLayout from '@/components/layout/MainLayout';
import SignInForm from '@/components/auth/SignInForm';
import Image from 'next/image';

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <MainLayout>
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
              <h1 className="text-2xl md:text-3xl font-bold text-[#14213D] mb-2">
                Welcome Back
              </h1>
              <p className="text-[#4B5563]">
                Sign in to your MedShadow account
              </p>
            </div>
          <SignInForm />
          </div>
        </div>
      </section>
    </MainLayout>
  );
} 