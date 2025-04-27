"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  profileImage?: string;
  school?: string;
  graduationYear?: string;
  degree?: string;
  major?: string;
  bio?: string;
  location?: string;
  interests?: string[];
}

export default function StudentProfile() {
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!params?.id) {
          throw new Error('No profile ID provided');
        }
        
        // If viewing your own profile (params.id === 'me'), fetch from /api/user/profile
        // Otherwise, fetch from /api/user/profile/[id]
        const endpoint = params.id === 'me' ? '/api/user/profile' : `/api/user/profile/${params.id}`;
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        setError('Failed to load profile');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [params?.id]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    if (userDropdownOpen) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [userDropdownOpen]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F3F6FA] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FCA311]"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-[#F3F6FA] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Not Found</h2>
          <p className="text-gray-600">The requested profile could not be loaded.</p>
          <Link href="/dashboard/student" className="mt-4 inline-block text-[#FCA311] hover:underline">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F6FA]">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-[99999] bg-white border-b border-gray-200 flex items-center justify-between px-4 py-2 shadow-md">
        <div className="flex items-center space-x-3">
          <Image src="/images/logo-mayo.png" alt="MedShadow Logo" width={40} height={40} className="rounded" />
          <span className="font-bold text-lg text-[#14213D] tracking-tight">MedShadow</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="/dashboard/student" className="text-[#14213D] hover:text-[#FCA311] font-medium">Dashboard</Link>
          <Link href="/applications" className="text-[#14213D] hover:text-[#FCA311] font-medium">Applications</Link>
          <Link href="/deadlines" className="text-[#14213D] hover:text-[#FCA311] font-medium">Deadlines</Link>
          <Link href="/resources" className="text-[#14213D] hover:text-[#FCA311] font-medium">Resources</Link>
        </nav>
        <div className="flex items-center space-x-3 relative z-[99999]" ref={userDropdownRef}>
          <button className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[#FCA311] shadow-sm focus:outline-none mr-4" onClick={() => setUserDropdownOpen((o) => !o)} aria-label="User menu">
            <Image src={user.profileImage || '/images/default-avatar.jpg'} alt={user.name} fill className="object-cover" />
          </button>
          {userDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 min-w-[10rem] bg-white border border-gray-200 rounded-lg shadow-lg z-[99999] p-2">
              <Link href={`/profiles/student/${user._id}`} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-50">My Profile</Link>
              <Link href="/profiles/student/edit" className="block w-full text-left px-3 py-2 rounded hover:bg-blue-50">Edit Profile</Link>
              <button className="block w-full text-left px-3 py-2 rounded text-red-600 hover:underline hover:bg-red-50" onClick={() => {/* sign out logic here */}}>Sign Out</button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="mt-16">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-[#14213D] to-[#1A365D] text-white">
          <div className="absolute inset-0 z-0 mix-blend-overlay opacity-10">
            <Image
              src="/images/hero-bg.png"
              alt="Medical background"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10 container mx-auto px-4 py-12">
            <div className="flex items-center space-x-6">
              <div className="relative w-32 h-32">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src={user.profileImage || '/images/default-avatar.jpg'}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{user.name}</h1>
                <p className="text-white/80">{user.school} • {user.location}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="md:flex">
              {/* Left Column */}
              <div className="md:w-1/3 bg-gray-50 p-6 border-r border-gray-200">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-[#14213D] mb-4">Education</h2>
                  <div className="space-y-2">
                    <p className="font-medium">{user.school}</p>
                    <p className="text-gray-600">{user.degree}</p>
                    <p className="text-gray-600">{user.major}</p>
                    <p className="text-gray-600">Expected Graduation: {user.graduationYear}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-[#14213D] mb-4">Contact</h2>
                  <div className="space-y-2">
                    <p className="text-gray-600">{user.location}</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-[#14213D] mb-4">Interests</h2>
                  <div className="flex flex-wrap gap-2">
                    {user.interests?.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="md:w-2/3 p-6">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-[#14213D] mb-4">About</h2>
                  <p className="text-gray-600 whitespace-pre-wrap">{user.bio}</p>
                </div>

                {/* Additional sections can be added here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 