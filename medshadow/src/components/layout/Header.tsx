"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

interface HeaderProps {
  hideUserMenu?: boolean;
}

const Header: React.FC<HeaderProps> = ({ hideUserMenu = false }) => {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderAuthButton = () => {
    // Show loading state
    if (status === 'loading') {
      return (
        <div className="bg-[#FCA311] text-white rounded px-6 py-2 font-medium ml-2 flex items-center h-10 opacity-50">
          Loading...
        </div>
      );
    }

    // Show dashboard button if authenticated
    if (session?.user) {
      return (
        <Link 
          href="/dashboard" 
          className="bg-[#FCA311] text-white rounded px-6 py-2 font-medium ml-2 flex items-center h-10 hover:bg-[#FCA311]/90 transition-colors"
        >
          Dashboard
        </Link>
      );
    }

    // Show sign in button if not authenticated
    return (
      <Link 
        href="/auth/signin" 
        className="bg-[#FCA311] text-white rounded px-6 py-2 font-medium ml-2 flex items-center h-10 hover:bg-[#FCA311]/90 transition-colors"
      >
        Sign In
      </Link>
    );
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[99999] flex items-center justify-between px-6 md:px-10 py-2 transition-all duration-300 ${scrolled ? 'bg-white/70 backdrop-blur border-b border-gray-200 shadow-md' : 'bg-transparent'}`}>
      <Link href="/" className="flex items-center space-x-3 group">
        <Image src="/images/logo-mayo.png" alt="MedShadow Logo" width={40} height={40} className="rounded" />
        <span className="font-bold text-lg text-[#14213D] tracking-tight group-hover:text-[#FCA311] transition-colors">MedShadow</span>
      </Link>
      {/* Desktop navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        <Link href="/opportunities" className="text-[#14213D] hover:text-[#FCA311] font-medium px-2 py-2 flex items-center">Opportunities</Link>
        <Link href="/facilities" className="text-[#14213D] hover:text-[#FCA311] font-medium px-2 py-2 flex items-center">Facilities</Link>
        {!hideUserMenu && renderAuthButton()}
      </nav>
      {/* Mobile menu button */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#14213D] hover:text-[#FCA311] focus:outline-none">
          <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-0 py-4 bg-white shadow-lg border-b border-gray-200 z-[99999]">
          <nav className="flex flex-col space-y-1 px-4">
            <Link href="/opportunities" className="py-3 text-[#14213D] font-medium hover:text-[#FCA311] transition-all">Opportunities</Link>
            <Link href="/facilities" className="py-3 text-[#14213D] font-medium hover:text-[#FCA311] transition-all">Facilities</Link>
            {!hideUserMenu && (
              <Link 
                href={session?.user ? "/dashboard" : "/auth/signin"} 
                className="block bg-[#FCA311] text-white rounded px-6 py-3 font-medium mt-2 text-center hover:bg-[#FCA311]/90 transition-colors"
              >
                {status === 'loading' ? 'Loading...' : (session?.user ? 'Dashboard' : 'Sign In')}
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header; 