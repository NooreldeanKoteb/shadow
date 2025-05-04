import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { UserRole } from '@/types/user';

interface NavbarUserDropdownProps {
  user: {
    role: UserRole;
    profileImage?: string;
    _id: string;
  };
}

export default function NavbarUserDropdown({ user }: NavbarUserDropdownProps) {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Check if we're on a profile page and if it's the user's own profile
  const isOnProfilePage = pathname.startsWith('/profiles/student/') && !pathname.includes('/edit');
  const isOwnProfile = isOnProfilePage && pathname.split('/').pop() === user._id;
  const isEditProfilePage = pathname === '/profiles/student/edit' || pathname === '/profiles/facility/edit';

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="focus:outline-none"
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[#FCA311] shadow-sm">
          <Image
            src={user.profileImage || '/images/default-avatar.jpg'}
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 min-w-[10rem] bg-white border border-gray-200 rounded-lg shadow-lg z-[99999] p-2">
          {!isOwnProfile && (
            <Link
              href={user.role === UserRole.STUDENT ? '/profiles/student/me' : '/profiles/facility/me'}
              className="block w-full text-left px-3 py-2 rounded hover:bg-blue-50"
            >
              My Profile
            </Link>
          )}
          {!isEditProfilePage && (
            <Link
              href={user.role === UserRole.STUDENT ? '/profiles/student/edit' : '/profiles/facility/edit'}
              className="block w-full text-left px-3 py-2 rounded hover:bg-blue-50"
            >
              Edit Profile
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="block w-full text-left px-3 py-2 rounded text-red-600 hover:underline hover:bg-red-50"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
} 