"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border-b border-white/10"></div>
      <div className="max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-2xl font-bold text-[#1E6091] hover:text-[#1E6091]/80 transition-colors"
            >
              MedShadow
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-[#1E6091] hover:text-[#1E6091]/80 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link 
              href="/opportunities" 
              className="px-4 py-2 text-[#1E6091] font-medium hover:text-[#1E6091]/80 hover:bg-white/10 rounded-full transition-all"
            >
              Opportunities
            </Link>
            <Link 
              href="/facilities" 
              className="px-4 py-2 text-[#1E6091] font-medium hover:text-[#1E6091]/80 hover:bg-white/10 rounded-full transition-all"
            >
              Facilities
            </Link>
            {session ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="px-4 py-2 text-[#1E6091] font-medium hover:text-[#1E6091]/80 hover:bg-white/10 rounded-full transition-all"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 text-[#1E6091] font-medium hover:text-[#1E6091]/80 hover:bg-white/10 rounded-full transition-all"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/auth/signin" 
                  className="px-4 py-2 text-[#1E6091] font-medium hover:text-[#1E6091]/80 hover:bg-white/10 rounded-full transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="ml-2 bg-[#E76F51] hover:bg-[#E76F51]/90 px-6 py-2 rounded-full text-white font-medium shadow-sm hover:shadow-md transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-0 py-4 bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20">
            <nav className="flex flex-col space-y-1">
              <Link 
                href="/opportunities" 
                className="px-4 py-3 text-[#1E6091] font-medium hover:text-[#1E6091]/80 hover:bg-white/50 transition-all"
              >
                Opportunities
              </Link>
              <Link 
                href="/facilities" 
                className="px-4 py-3 text-[#1E6091] font-medium hover:text-[#1E6091]/80 hover:bg-white/50 transition-all"
              >
                Facilities
              </Link>
              {session ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="px-4 py-3 text-[#1E6091] font-medium hover:text-[#1E6091]/80 hover:bg-white/50 transition-all"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="px-4 py-3 text-left text-[#1E6091] font-medium hover:text-[#1E6091]/80 hover:bg-white/50 transition-all"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/auth/signin" 
                    className="px-4 py-3 text-[#1E6091] font-medium hover:text-[#1E6091]/80 hover:bg-white/50 transition-all"
                  >
                    Sign In
                  </Link>
                  <div className="px-4 pt-2">
                    <Link
                      href="/auth/signup"
                      className="block bg-[#E76F51] hover:bg-[#E76F51]/90 px-6 py-3 rounded-full text-white font-medium text-center shadow-sm hover:shadow-md transition-all"
                    >
                      Sign Up
                    </Link>
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 