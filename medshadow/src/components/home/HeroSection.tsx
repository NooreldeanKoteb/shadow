import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#14213D] to-[#1A365D] text-white py-24 md:py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 z-0 mix-blend-overlay">
        <Image
          src="/images/hero-bg.png"
          alt="Medical professionals in a modern hospital setting"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#14213D]/60 to-transparent"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1 bg-[#FCA311]/20 text-[#FCA311] rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-[#FCA311]/30">
            Trusted by leading medical institutions
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Medical <span className="text-[#FCA311]">Shadowing</span> Opportunities
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Connect with prestigious medical shadowing opportunities at top hospitals and clinics
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/auth/signup?type=student"
              className="btn bg-[#FCA311] hover:bg-[#FCA311]/90 text-white text-lg px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join as a Student
            </Link>
            <Link
              href="/auth/signup?type=facility"
              className="btn border-2 border-white/30 backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white text-lg px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join as a Facility
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 