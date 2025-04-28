import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              MedShadow
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-neutral-dark hover:text-primary focus:outline-none"
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
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-neutral-dark hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/opportunities" className="text-neutral-dark hover:text-primary transition-colors">
              Opportunities
            </Link>
            
            {!isLoading && (
              <>
                {user ? (
                  <>
                    <Link 
                      href={user.role === 'student' ? '/student/dashboard' : '/facility/dashboard'} 
                      className="text-neutral-dark hover:text-primary transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="btn-primary"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" className="text-neutral-dark hover:text-primary transition-colors">
                      Login
                    </Link>
                    <Link href="/auth/register" className="btn-primary">
                      Register
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-2">
            <Link href="/" className="block text-neutral-dark hover:text-primary px-3 py-2 rounded-md transition-colors">
              Home
            </Link>
            <Link href="/opportunities" className="block text-neutral-dark hover:text-primary px-3 py-2 rounded-md transition-colors">
              Opportunities
            </Link>
            
            {!isLoading && (
              <>
                {user ? (
                  <>
                    <Link 
                      href={user.role === 'student' ? '/student/dashboard' : '/facility/dashboard'} 
                      className="block text-neutral-dark hover:text-primary px-3 py-2 rounded-md transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="btn-primary w-full mt-2"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" className="block text-neutral-dark hover:text-primary px-3 py-2 rounded-md transition-colors">
                      Login
                    </Link>
                    <Link href="/auth/register" className="btn-primary w-full mt-2">
                      Register
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
} 