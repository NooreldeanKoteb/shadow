import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CtaSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cta-bg.jpg"
          alt="Medical professionals working"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14213D]/95 to-[#14213D]/80"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-10 md:p-12 shadow-xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#14213D]">Begin Your Medical Journey</h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
              Join our exclusive network of medical students and prestigious healthcare facilities
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/auth/signup?type=student"
              className="bg-[#14213D] hover:bg-[#1A365D] text-white text-lg px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Join as a Student
            </Link>
            <Link
              href="/auth/signup?type=facility"
              className="bg-white border-2 border-[#14213D] text-[#14213D] hover:bg-[#14213D]/5 text-lg px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              List Your Facility
            </Link>
          </div>
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <div className="flex flex-col sm:flex-row items-center justify-center text-center gap-2 text-[#4B5563]">
              <span>Trusted by top medical institutions including</span>
              <div className="flex space-x-6 items-center">
                <Image src="/images/logo-mayo-dark.svg" alt="Mayo Clinic" width={80} height={30} className="h-6 w-auto" />
                <Image src="/images/logo-cleveland-dark.svg" alt="Cleveland Clinic" width={80} height={30} className="h-6 w-auto" />
                <Image src="/images/logo-hopkins-dark.svg" alt="Johns Hopkins" width={80} height={30} className="h-6 w-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection; 