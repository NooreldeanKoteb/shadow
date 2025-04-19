import React from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Connect with Medical Shadowing Opportunities
            </h1>
            <p className="text-xl mb-8">
              Find and apply for medical shadowing, rotation, and volunteering opportunities at hospitals and doctor's offices.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/auth/signup?type=student"
                className="btn-primary"
              >
                Join as a Student
              </Link>
              <Link
                href="/auth/signup?type=facility"
                className="btn-secondary"
              >
                Join as a Facility
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-neutral-lighter">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How MedShadow Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="text-primary text-4xl mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
              <p className="text-neutral-dark">
                Sign up as a student or medical facility and create your detailed profile.
              </p>
            </div>
            <div className="card">
              <div className="text-primary text-4xl mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Find Opportunities</h3>
              <p className="text-neutral-dark">
                Browse and search for shadowing opportunities based on your preferences.
              </p>
            </div>
            <div className="card">
              <div className="text-primary text-4xl mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Connect & Apply</h3>
              <p className="text-neutral-dark">
                Apply to opportunities and connect directly with medical facilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Opportunities Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Opportunities</h2>
            <Link href="/opportunities" className="text-primary hover:text-secondary transition-colors">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Placeholder for featured opportunities */}
            <div className="card overflow-hidden">
              <div className="h-48 bg-neutral-lighter"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Cardiology Shadowing</h3>
                <p className="text-neutral-dark mb-4">Dallas Medical Center</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-semibold">Dallas, TX</span>
                  <Link
                    href="/opportunities/1"
                    className="btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            <div className="card overflow-hidden">
              <div className="h-48 bg-neutral-lighter"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Pediatrics Rotation</h3>
                <p className="text-neutral-dark mb-4">Chicago Children's Hospital</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-semibold">Chicago, IL</span>
                  <Link
                    href="/opportunities/2"
                    className="btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            <div className="card overflow-hidden">
              <div className="h-48 bg-neutral-lighter"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Emergency Medicine</h3>
                <p className="text-neutral-dark mb-4">Northwestern Memorial Hospital</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-semibold">Chicago, IL</span>
                  <Link
                    href="/opportunities/3"
                    className="btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Medical Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students who have found valuable medical shadowing opportunities through MedShadow.
          </p>
          <Link
            href="/auth/signup"
            className="btn-accent text-lg"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
