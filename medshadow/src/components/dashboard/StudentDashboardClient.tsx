'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DropdownFilter from '@/components/DropdownFilter';
import MainContent from '@/components/dashboard/MainContent';
import Sidebar from '@/components/dashboard/Sidebar';
import { UserRole } from '@/types/user';
import NavbarUserDropdown from '@/components/layout/NavbarUserDropdown';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  profileImage?: string;
}

export interface Opportunity {
  _id: string;
  title: string;
  facility: string | { name: string; location?: string; contact?: string };
  facilityLogo?: string;
  specialty: string;
  location: string | { coordinates: { lat: number; lng: number }; address: string; city: string; state: string; zipCode: string };
  type: string;
  duration: string;
  image?: string;
  savedAt?: string;
  description?: string;
  requirements?: string[];
  benefits?: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  isPopular?: boolean;
  deadlineSoon?: boolean;
  postedAt?: string;
}

interface Application {
  _id: string;
  opportunity: Opportunity;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

interface StudentDashboardClientProps {
  user: User;
  name: string;
  _id: string;
}

export default function StudentDashboardClient({ user }: StudentDashboardClientProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [savedOpportunities, setSavedOpportunities] = useState<Opportunity[]>([]);
  const [allOpportunities, setAllOpportunities] = useState<Opportunity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([]);
  const [filterType, setFilterType] = useState<string[]>([]);
  const [filterSpecialty, setFilterSpecialty] = useState<string[]>([]);
  const [filterLocation, setFilterLocation] = useState<string[]>([]);
  const [filterDuration, setFilterDuration] = useState<string[]>([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [sortOption, setSortOption] = useState<'distance' | 'date' | ''>('');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch applications, saved opportunities, and all opportunities
    fetchApplications();
    fetchSavedOpportunities();
    fetchAllOpportunities();
  }, []);

  // Add effect to filter opportunities based on search and filters
  useEffect(() => {
    let filtered = [...allOpportunities];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(opp => {
        const facilityName = typeof opp.facility === 'string' ? opp.facility : opp.facility?.name || '';
        const locationStr = typeof opp.location === 'string' ? opp.location : `${opp.location.city}, ${opp.location.state}`;
        return opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          facilityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opp.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
          locationStr.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    // Apply type filter
    if (filterType.length > 0) {
      filtered = filtered.filter(opp => filterType.includes(opp.type));
    }

    // Apply specialty filter
    if (filterSpecialty.length > 0) {
      filtered = filtered.filter(opp => filterSpecialty.includes(opp.specialty));
    }

    // Apply location filter
    if (filterLocation.length > 0) {
      filtered = filtered.filter(opp => {
        const locationStr = typeof opp.location === 'string' ? opp.location : `${opp.location.city}, ${opp.location.state}`;
        return filterLocation.includes(locationStr);
      });
    }

    // Apply duration filter
    if (filterDuration.length > 0) {
      filtered = filtered.filter(opp => filterDuration.includes(opp.duration));
    }

    // Apply sorting
    if (sortOption === 'date') {
      filtered.sort((a, b) => new Date(b.postedAt || '').getTime() - new Date(a.postedAt || '').getTime());
    }

    setFilteredOpportunities(filtered);
  }, [searchQuery, filterType, filterSpecialty, filterLocation, filterDuration, sortOption, allOpportunities]);

  const fetchAllOpportunities = async () => {
    try {
      const response = await fetch('/api/opportunities');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data.opportunities) {
          setAllOpportunities(data.data.opportunities);
          setFilteredOpportunities(data.data.opportunities);
        } else {
          console.error('Unexpected API response format:', data);
        }
      }
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications');
      if (response.ok) {
        const data = await response.json();
        setApplications(data.applications || []);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSavedOpportunities = async () => {
    try {
      const response = await fetch('/api/opportunities/saved');
      if (response.ok) {
        const data = await response.json();
        setSavedOpportunities(data.opportunities || []);
      }
    } catch (error) {
      console.error('Error fetching saved opportunities:', error);
    }
  };

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
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FCA311]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F6FA] px-0 md:px-8 py-0 md:py-8">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-[99999] bg-white border-b border-gray-200 flex items-center justify-between px-4 py-2 shadow-md">
        <div className="flex items-center space-x-3">
          <Image src="/images/logo-mayo.png" alt="MedShadow Logo" width={40} height={40} className="rounded" />
          <span className="font-bold text-lg text-[#14213D] tracking-tight">MedShadow</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="/applications" className="text-[#14213D] hover:text-[#FCA311] font-medium">Applications</Link>
          <Link href="/profiles/student/me" className="text-[#14213D] hover:text-[#FCA311] font-medium">Profile</Link>
        </nav>
        <div className="flex items-center space-x-3 relative z-[99999]" ref={userDropdownRef}>
          <NavbarUserDropdown user={{ role: user.role as UserRole, profileImage: user.profileImage, _id: user._id, name: user.name }} />
        </div>
        <button className="md:hidden ml-2 p-2" onClick={() => setShowSidebar(!showSidebar)} aria-label="Open sidebar">
          <svg className="w-6 h-6 text-[#14213D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </header>

      {/* Search/filter bar directly under header */}
      <div className="w-full bg-white shadow-lg p-4 flex flex-col gap-4 sticky top-[64px] z-[99998] mb-4 overflow-visible rounded-lg">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
          <div className="flex flex-1 items-center bg-[#F8FAFC] rounded-lg border border-gray-300 px-3 py-2">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" /></svg>
            <input type="text" className="flex-1 bg-transparent outline-none" placeholder="Search opportunities..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <button className="bg-[#FCA311] hover:bg-[#FCA311]/90 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow">Search</button>
        </div>
        <div className="flex flex-nowrap gap-2 md:gap-4 w-full">
          <DropdownFilter
            label="Type"
            options={['Shadowing','Rotation','Volunteering','Internship']}
            selected={filterType}
            setSelected={setFilterType}
          />
          <DropdownFilter
            label="Specialty"
            options={['Cardiology','Emergency Medicine','Pediatrics','Neurology','Orthopedics','Oncology','Family Medicine','Radiology','Critical Care','Dermatology']}
            selected={filterSpecialty}
            setSelected={setFilterSpecialty}
          />
          <DropdownFilter
            label="Location"
            options={['Cleveland, OH', 'Boston, MA', 'Philadelphia, PA', 'Chicago, IL', 'Denver, CO', 'Memphis, TN', 'Austin, TX', 'San Francisco, CA', 'New York, NY', 'Los Angeles, CA']}
            selected={filterLocation}
            setSelected={setFilterLocation}
          />
          <DropdownFilter
            label="Duration"
            options={['1 week','2 weeks','3 weeks','4 weeks','6 weeks','8 weeks','12 weeks','Weekly']}
            selected={filterDuration}
            setSelected={setFilterDuration}
          />
          {/* Add more DropdownFilter components for Distance and Date Range as needed */}
        </div>
      </div>

      {/* Main Content: Sidebar + Main Area */}
      <main className="flex-1 flex flex-col md:flex-row pt-8">
        <Sidebar
          applicationsCount={applications.length}
          savedCount={savedOpportunities.length}
          sortOption={sortOption}
          setSortOption={setSortOption}
          sortedOpportunities={filteredOpportunities}
          selectedOpportunity={selectedOpportunity}
          setSelectedOpportunity={setSelectedOpportunity}
          sortDropdownOpen={sortDropdownOpen}
          setSortDropdownOpen={setSortDropdownOpen}
        />

        <MainContent selectedOpportunity={selectedOpportunity} user={user} />
      </main>
    </div>
  );
} 