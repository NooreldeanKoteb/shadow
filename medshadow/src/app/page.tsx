import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section - Full width */}
      <section className="relative bg-gradient-to-r from-[#1E6091]/90 to-[#2A9D8F]/90 text-white py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.png"
            alt="Medical professionals in a modern hospital setting"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
        </div>
        <div className="relative z-10 px-4 md:px-6 lg:px-8 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              Connect with Medical <span className="text-accent">Shadowing</span> Opportunities
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 text-gray-100">
              Find and apply for medical shadowing, rotation, and volunteering opportunities at hospitals and doctor's offices.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-5">
              <Link
                href="/auth/signup?type=student"
                className="bg-[#E76F51] hover:bg-[#E76F51]/90 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-white"
              >
                Join as a Student
              </Link>
              <Link
                href="/auth/signup?type=facility"
                className="bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/20 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-white"
              >
                Join as a Facility
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 md:h-16 bg-gradient-to-t from-[#F8F9FA] to-transparent z-10"></div>
      </section>

      {/* Features Section - Full width with contained content */}
      <section className="py-16 md:py-20 lg:py-24 bg-[#F8F9FA]">
        <div className="px-4 md:px-6 lg:px-8 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 md:mb-4 text-[#212529]">How MedShadow Works</h2>
          <p className="text-lg md:text-xl text-[#495057] text-center mb-10 md:mb-16 max-w-2xl mx-auto">Our platform makes it easy to connect students with medical professionals for valuable shadowing experiences.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            <div className="bg-white hover:bg-[#1E6091]/5 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="relative w-16 md:w-20 h-16 md:h-20 mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-[#1E6091]/10 rounded-full group-hover:bg-[#1E6091]/20 transition-colors duration-300"></div>
                <Image
                  src="/images/profile-icon.svg"
                  alt="Create Profile"
                  fill
                  className="object-contain p-3"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-center text-[#1E6091] group-hover:text-[#1E6091]/80">Create Your Profile</h3>
              <p className="text-[#495057] text-center">
                Sign up as a student or medical facility and create your detailed profile.
              </p>
            </div>
            <div className="bg-white hover:bg-[#2A9D8F]/5 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="relative w-16 md:w-20 h-16 md:h-20 mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-[#2A9D8F]/10 rounded-full group-hover:bg-[#2A9D8F]/20 transition-colors duration-300"></div>
                <Image
                  src="/images/search-icon.svg"
                  alt="Find Opportunities"
                  fill
                  className="object-contain p-3"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-center text-[#2A9D8F] group-hover:text-[#2A9D8F]/80">Find Opportunities</h3>
              <p className="text-[#495057] text-center">
                Browse and search for shadowing opportunities based on your preferences.
              </p>
            </div>
            <div className="bg-white hover:bg-[#E76F51]/5 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="relative w-16 md:w-20 h-16 md:h-20 mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 bg-[#E76F51]/10 rounded-full group-hover:bg-[#E76F51]/20 transition-colors duration-300"></div>
                <Image
                  src="/images/connect-icon.svg"
                  alt="Connect & Apply"
                  fill
                  className="object-contain p-3"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-center text-[#E76F51] group-hover:text-[#E76F51]/80">Connect & Apply</h3>
              <p className="text-[#495057] text-center">
                Apply to opportunities and connect directly with medical facilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Opportunities Section - Full width with contained content */}
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="px-4 md:px-6 lg:px-8 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Opportunities</h2>
              <p className="text-lg md:text-xl text-gray-600">Discover top shadowing experiences</p>
            </div>
            <Link href="/opportunities" className="mt-4 md:mt-0 text-primary hover:text-secondary transition-colors font-medium flex items-center">
              View All
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            <div className="card overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 md:h-56">
                <Image
                  src="/images/cardiology.jpg"
                  alt="Cardiology Department"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-primary font-medium px-3 py-1 rounded-full text-sm">
                  Cardiology
                </div>
              </div>
              <div className="p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2">Cardiology Shadowing</h3>
                <p className="text-gray-600 mb-4">Dallas Medical Center</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Dallas, TX
                  </span>
                  <Link
                    href="/opportunities/1"
                    className="btn-primary px-3 md:px-4 py-2 rounded-full text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            <div className="card overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 md:h-56">
                <Image
                  src="/images/pediatrics.jpg"
                  alt="Pediatrics Department"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-primary font-medium px-3 py-1 rounded-full text-sm">
                  Pediatrics
                </div>
              </div>
              <div className="p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2">Pediatrics Rotation</h3>
                <p className="text-gray-600 mb-4">Chicago Children's Hospital</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Chicago, IL
                  </span>
                  <Link
                    href="/opportunities/2"
                    className="btn-primary px-3 md:px-4 py-2 rounded-full text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            <div className="card overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 md:h-56">
                <Image
                  src="/images/emergency.jpg"
                  alt="Emergency Department"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-primary font-medium px-3 py-1 rounded-full text-sm">
                  Emergency
                </div>
              </div>
              <div className="p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2">Emergency Medicine</h3>
                <p className="text-gray-600 mb-4">Northwestern Memorial Hospital</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Chicago, IL
                  </span>
                  <Link
                    href="/opportunities/3"
                    className="btn-primary px-3 md:px-4 py-2 rounded-full text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            <div className="card overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 md:h-56">
                <Image
                  src="/images/cardiology.jpg"
                  alt="Neurology Department"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-primary font-medium px-3 py-1 rounded-full text-sm">
                  Neurology
                </div>
              </div>
              <div className="p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold mb-2">Neurology Shadowing</h3>
                <p className="text-gray-600 mb-4">Mayo Clinic</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Rochester, MN
                  </span>
                  <Link
                    href="/opportunities/4"
                    className="btn-primary px-3 md:px-4 py-2 rounded-full text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Full width */}
      <section className="relative bg-gradient-to-r from-[#1E6091]/90 to-[#2A9D8F]/90 text-white py-16 md:py-20 lg:py-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cta-bg.jpg"
            alt="Medical students in a classroom"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
        </div>
        <div className="relative z-10 px-4 md:px-6 lg:px-8 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Ready to Start Your Medical Journey?</h2>
          <p className="text-lg md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto text-gray-100">
            Join thousands of students who have found valuable medical shadowing opportunities through MedShadow.
          </p>
          <Link
            href="/auth/signup"
            className="bg-[#E76F51] hover:bg-[#E76F51]/90 text-base md:text-lg px-8 md:px-10 py-3 md:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 inline-block text-white"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
