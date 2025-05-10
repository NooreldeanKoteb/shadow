'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import SignInForm from '@/components/auth/SignInForm';
import Image from 'next/image';

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [session, status, router]);

  if (status === 'loading' || status === 'authenticated') {
    return (
      <MainLayout hideUserMenu>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

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