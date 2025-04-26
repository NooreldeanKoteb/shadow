"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import Image from 'next/image';
import DropdownFilter from '@/components/DropdownFilter';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  profileImage?: string;
}

interface Opportunity {
  _id: string;
  title: string;
  facility: string;
  facilityLogo?: string;
  specialty: string;
  location: string;
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

const mockRecommendedOpportunities: Opportunity[] = [
  {
    _id: '1',
    title: 'Cardiology Shadowing',
    facility: 'Cleveland Clinic',
    facilityLogo: '/images/cleveland-logo.jpg',
    specialty: 'Cardiology',
    location: 'Cleveland, OH',
    type: 'Shadowing',
    duration: '4 weeks',
    image: '/images/cardiology.jpg',
    description: 'Shadow a leading cardiologist and learn about advanced cardiac care, patient interaction, and the latest in heart health research. Includes hands-on observation in both clinic and hospital settings.',
    requirements: [
      'Current undergraduate or pre-med student',
      'Interest in cardiology or internal medicine',
      'Proof of immunizations',
      'Background check'
    ],
    benefits: [
      'Certificate of completion',
      'Letter of recommendation',
      'Networking with top cardiologists'
    ],
    isNew: true,
    isPopular: true,
    deadlineSoon: false,
    postedAt: '2024-06-01'
  },
  {
    _id: '2',
    title: 'Emergency Medicine Rotation',
    facility: 'General Hospital',
    facilityLogo: '/images/general-logo.jpg',
    specialty: 'Emergency Medicine',
    location: 'Boston, MA',
    type: 'Rotation',
    duration: '2 weeks',
    image: '/images/emergency.jpg',
    description: 'Participate in a fast-paced emergency department. Observe trauma care, rapid diagnostics, and multidisciplinary teamwork. Ideal for students interested in acute care.',
    requirements: [
      'Junior or senior undergraduate standing',
      'CPR certification',
      'Background check',
      'COVID-19 vaccination'
    ],
    benefits: [
      'Hands-on experience',
      'Mentorship from ER physicians',
      'Exposure to a variety of cases'
    ],
    isFeatured: true,
    isPopular: true,
    deadlineSoon: false,
    postedAt: '2024-05-15'
  },
  {
    _id: '3',
    title: 'Pediatrics Volunteering',
    facility: "Children's Hospital",
    facilityLogo: '/images/childrens-logo.jpg',
    specialty: 'Pediatrics',
    location: 'Philadelphia, PA',
    type: 'Volunteering',
    duration: 'Weekly',
    image: '/images/pediatrics.jpg',
    description: 'Volunteer in the pediatric ward, supporting play therapy, patient comfort, and family communication. Great for those interested in child health and development.',
    requirements: [
      'Love for working with children',
      'Background check',
      'Minimum 3-month commitment'
    ],
    benefits: [
      'Community service hours',
      'Experience with pediatric patients',
      'Volunteer appreciation events'
    ],
    isPopular: true,
    deadlineSoon: false,
    postedAt: '2024-04-01'
  },
  {
    _id: '4',
    title: 'Neurology Shadowing',
    facility: 'University Medical Center',
    facilityLogo: '/images/university-logo.jpg',
    specialty: 'Neurology',
    location: 'Chicago, IL',
    type: 'Shadowing',
    duration: '3 weeks',
    image: '/images/neurology.jpg',
    description: 'Observe neurologists as they diagnose and treat disorders of the brain and nervous system. Includes exposure to EEG, MRI, and patient rounds.',
    requirements: [
      'Interest in neuroscience',
      'Background check',
      'HIPAA training'
    ],
    benefits: [
      'Shadowing hours for med school',
      'Access to neurology seminars',
      'Networking with residents'
    ],
    isPopular: true,
    deadlineSoon: false,
    postedAt: '2024-03-15'
  },
  {
    _id: '5',
    title: 'Orthopedic Surgery Rotation',
    facility: 'Memorial Hospital',
    facilityLogo: '/images/memorial-logo.jpg',
    specialty: 'Orthopedics',
    location: 'Denver, CO',
    type: 'Rotation',
    duration: '6 weeks',
    image: '/images/orthopedics.jpg',
    description: 'Join the orthopedic surgery team for a comprehensive rotation. Scrub in for surgeries, assist with patient consults, and learn about musculoskeletal injuries.',
    requirements: [
      'Senior undergraduate or post-bac',
      'Interest in surgery',
      'Proof of immunizations',
      'Background check'
    ],
    benefits: [
      'Surgical observation hours',
      'Mentorship from surgeons',
      'Potential for research involvement'
    ],
    isPopular: true,
    deadlineSoon: false,
    postedAt: '2024-02-01'
  },
  {
    _id: '6',
    title: 'Pediatric Oncology Shadowing',
    facility: 'St. Jude Hospital',
    facilityLogo: '/images/stjude-logo.jpg',
    specialty: 'Oncology',
    location: 'Memphis, TN',
    type: 'Shadowing',
    duration: '4 weeks',
    image: '/images/oncology.jpg',
    description: 'Shadow pediatric oncologists and learn about cancer care for children. Includes time in clinic, infusion center, and tumor board meetings.',
    requirements: [
      'Interest in oncology or pediatrics',
      'Background check',
      'TB test'
    ],
    benefits: [
      'Exposure to pediatric oncology',
      'Certificate of completion',
      'Networking with cancer researchers'
    ],
    isPopular: true,
    deadlineSoon: false,
    postedAt: '2024-01-15'
  },
  // Additional mock opportunities for visualization
  {
    _id: '7',
    title: 'Family Medicine Internship',
    facility: 'Community Health Center',
    facilityLogo: '/images/hospital-default.jpg',
    specialty: 'Family Medicine',
    location: 'Austin, TX',
    type: 'Internship',
    duration: '8 weeks',
    image: '/images/medical-default.jpg',
    description: 'Intern with a family medicine team, assisting with patient intake, health education, and chronic disease management. Ideal for students interested in primary care.',
    requirements: [
      'Pre-med or public health major',
      'Background check',
      'Flu shot'
    ],
    benefits: [
      'Internship credit',
      'Hands-on patient experience',
      'Letter of recommendation'
    ],
    isPopular: true,
    deadlineSoon: false,
    postedAt: '2023-12-01'
  },
  {
    _id: '8',
    title: 'Radiology Shadowing',
    facility: 'Metro Imaging Center',
    facilityLogo: '/images/hospital-default.jpg',
    specialty: 'Radiology',
    location: 'San Francisco, CA',
    type: 'Shadowing',
    duration: '2 weeks',
    image: '/images/medical-default.jpg',
    description: 'Shadow radiologists and technologists in a busy imaging center. Learn about X-ray, CT, and MRI interpretation and patient care.',
    requirements: [
      'Interest in imaging sciences',
      'Background check',
      'HIPAA training'
    ],
    benefits: [
      'Exposure to radiology',
      'Networking with radiologists',
      'Observation certificate'
    ],
    isPopular: true,
    deadlineSoon: false,
    postedAt: '2023-11-15'
  },
  {
    _id: '9',
    title: 'Surgical ICU Volunteering',
    facility: 'City Hospital',
    facilityLogo: '/images/hospital-default.jpg',
    specialty: 'Critical Care',
    location: 'New York, NY',
    type: 'Volunteering',
    duration: 'Weekly',
    image: '/images/medical-default.jpg',
    description: 'Volunteer in the surgical ICU, supporting nurses and patients. Help with patient comfort, family communication, and unit organization.',
    requirements: [
      'Interest in critical care',
      'Background check',
      'Minimum 6-month commitment'
    ],
    benefits: [
      'Experience in ICU setting',
      'Volunteer hours',
      'Exposure to critical care medicine'
    ],
    isPopular: true,
    deadlineSoon: false,
    postedAt: '2023-10-01'
  },
  {
    _id: '10',
    title: 'Dermatology Research Assistant',
    facility: 'Skin Health Institute',
    facilityLogo: '/images/hospital-default.jpg',
    specialty: 'Dermatology',
    location: 'Los Angeles, CA',
    type: 'Internship',
    duration: '12 weeks',
    image: '/images/medical-default.jpg',
    description: 'Assist with clinical research in dermatology. Collect data, interact with patients, and learn about skin disease management and research protocols.',
    requirements: [
      'Interest in research',
      'Background check',
      'Basic computer skills'
    ],
    benefits: [
      'Research experience',
      'Potential for publication',
      'Mentorship from dermatologists'
    ],
    isPopular: true,
    deadlineSoon: false,
    postedAt: '2023-09-15'
  }
];

// Helper: Haversine formula for distance in miles
function calculateDistance(loc1: {lat: number, lng: number}, loc2: {lat: number, lng: number}) {
  const toRad = (x: number) => x * Math.PI / 180;
  const R = 3958.8; // Radius of Earth in miles
  const dLat = toRad(loc2.lat - loc1.lat);
  const dLng = toRad(loc2.lng - loc1.lng);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(loc1.lat)) * Math.cos(toRad(loc2.lat)) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [savedOpportunities, setSavedOpportunities] = useState<Opportunity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>(mockRecommendedOpportunities);
  const [filterType, setFilterType] = useState<string[]>([]);
  const [filterSpecialty, setFilterSpecialty] = useState<string[]>([]);
  const [filterLocation, setFilterLocation] = useState<string[]>([]);
  const [filterDuration, setFilterDuration] = useState<string[]>([]);
  const [filterDistance, setFilterDistance] = useState<number>(50);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [filterDateRange, setFilterDateRange] = useState<{start: string, end: string}>({start: '', end: ''});
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [sortOption, setSortOption] = useState<'distance' | 'date' | ''>('');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/signin');
      return;
    }

    // Get user data from token
    try {
      const userData = JSON.parse(atob(token.split('.')[1]));
      
      // Verify this is a student
      if (userData.role !== 'student') {
        router.push('/dashboard');
        return;
      }
      
      // Fetch user details
      fetchUserDetails(token);
      
      // Fetch applications and saved opportunities
      fetchApplications(token);
      fetchSavedOpportunities(token);
    } catch (error) {
      console.error('Error parsing token:', error);
      router.push('/auth/signin');
    }
  }, [router]);
  
  useEffect(() => {
    // Filter opportunities based on search query and filters
    let filtered = mockRecommendedOpportunities;
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const lowercaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        opportunity => 
          opportunity.title.toLowerCase().includes(lowercaseQuery) ||
          opportunity.facility.toLowerCase().includes(lowercaseQuery) ||
          opportunity.specialty.toLowerCase().includes(lowercaseQuery) ||
          opportunity.location.toLowerCase().includes(lowercaseQuery) ||
          opportunity.type.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Apply type filter
    if (filterType.length > 0) {
      filtered = filtered.filter(opportunity => 
        filterType.includes(opportunity.type.toLowerCase())
      );
    }
    
    // Apply specialty filter
    if (filterSpecialty.length > 0) {
      filtered = filtered.filter(opportunity => 
        filterSpecialty.includes(opportunity.specialty.toLowerCase())
      );
    }
    
    // Apply location filter
    if (filterLocation.length > 0) {
      filtered = filtered.filter(opportunity => 
        filterLocation.includes(opportunity.location.toLowerCase())
      );
    }
    
    // Apply duration filter
    if (filterDuration.length > 0) {
      filtered = filtered.filter(opportunity => 
        filterDuration.includes(opportunity.duration.toLowerCase())
      );
    }
    
    // Apply distance filter
    if (userLocation && filterDistance < 100) {
      filtered = filtered.filter(opportunity => {
        // For demo, parse lat/lng from location string if present, else skip
        // Example: 'Cleveland, OH' => use a mock lat/lng map
        const locationMap: Record<string, {lat: number, lng: number}> = {
          'Cleveland, OH': {lat: 41.4993, lng: -81.6944},
          'Boston, MA': {lat: 42.3601, lng: -71.0589},
          'Philadelphia, PA': {lat: 39.9526, lng: -75.1652},
          'Chicago, IL': {lat: 41.8781, lng: -87.6298},
          'Denver, CO': {lat: 39.7392, lng: -104.9903},
          'Memphis, TN': {lat: 35.1495, lng: -90.0490},
          'Austin, TX': {lat: 30.2672, lng: -97.7431},
          'San Francisco, CA': {lat: 37.7749, lng: -122.4194},
          'New York, NY': {lat: 40.7128, lng: -74.0060},
          'Los Angeles, CA': {lat: 34.0522, lng: -118.2437},
        };
        const oppLoc = locationMap[opportunity.location];
        if (!oppLoc) return true; // If no mapping, don't filter out
        const dist = calculateDistance(userLocation, oppLoc);
        return dist <= filterDistance;
      });
    }
    
    // Apply date range filter
    if (filterDateRange.start && filterDateRange.end) {
      filtered = filtered.filter(opportunity => {
        const postedAt = new Date(opportunity.postedAt || '');
        const start = new Date(filterDateRange.start);
        const end = new Date(filterDateRange.end);
        return postedAt >= start && postedAt <= end;
      });
    }
    
    setFilteredOpportunities(filtered);
  }, [searchQuery, filterType, filterSpecialty, filterLocation, filterDuration, filterDistance, userLocation, filterDateRange]);

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

  const fetchUserDetails = async (token: string) => {
    try {
      const response = await fetch('/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchApplications = async (token: string) => {
    try {
      const response = await fetch('/api/applications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setApplications(data.applications || []);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const fetchSavedOpportunities = async (token: string) => {
    try {
      const response = await fetch('/api/opportunities/saved', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSavedOpportunities(data.opportunities || []);
      }
    } catch (error) {
      console.error('Error fetching saved opportunities:', error);
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FCA311]"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Helper function to reset filters
  const resetFilters = () => {
    setFilterType([]);
    setFilterSpecialty([]);
    setFilterLocation([]);
    setFilterDuration([]);
    setFilterDistance(50);
    setFilterDateRange({start: '', end: ''});
    setSearchQuery('');
  };

  // Helper: get facility initials
  function getInitials(name: string) {
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 3)
      .toUpperCase();
  }

  let sortedOpportunities = [...filteredOpportunities];
  if (sortOption === 'date') {
    sortedOpportunities.sort((a, b) => (b.postedAt && a.postedAt) ? new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime() : 0);
  } else if (sortOption === 'distance' && userLocation) {
    const locationMap: Record<string, {lat: number; lng: number}> = {
      'Cleveland, OH': {lat: 41.4993, lng: -81.6944},
      'Boston, MA': {lat: 42.3601, lng: -71.0589},
      'Philadelphia, PA': {lat: 39.9526, lng: -75.1652},
      'Chicago, IL': {lat: 41.8781, lng: -87.6298},
      'Denver, CO': {lat: 39.7392, lng: -104.9903},
      'Memphis, TN': {lat: 35.1495, lng: -90.0490},
      'Austin, TX': {lat: 30.2672, lng: -97.7431},
      'San Francisco, CA': {lat: 37.7749, lng: -122.4194},
      'New York, NY': {lat: 40.7128, lng: -74.0060},
      'Los Angeles, CA': {lat: 34.0522, lng: -118.2437},
    };
    sortedOpportunities.sort((a, b) => {
      const aLoc = locationMap[a.location as keyof typeof locationMap];
      const bLoc = locationMap[b.location as keyof typeof locationMap];
      if (!aLoc || !bLoc) return 0;
      const aDist = calculateDistance(userLocation, aLoc);
      const bDist = calculateDistance(userLocation, bLoc);
      return aDist - bDist;
    });
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
          <Link href="/dashboard/student" className="text-[#14213D] hover:text-[#FCA311] font-medium">Dashboard</Link>
          <Link href="/opportunities" className="text-[#14213D] hover:text-[#FCA311] font-medium">Opportunities</Link>
          <Link href="/applications" className="text-[#14213D] hover:text-[#FCA311] font-medium">Applications</Link>
        </nav>
        <div className="flex items-center space-x-3 relative z-[99999]" ref={userDropdownRef}>
          <button className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[#FCA311] shadow-sm focus:outline-none mr-4" onClick={() => setUserDropdownOpen((o) => !o)} aria-label="User menu">
            <Image src={user?.profileImage || '/images/default-avatar.jpg'} alt={user?.name || 'User profile'} fill className="object-cover" />
          </button>
          {userDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 min-w-[10rem] bg-white border border-gray-200 rounded-lg shadow-lg z-[99999] p-2">
              <Link href="/profiles/student/edit" className="block w-full text-left px-3 py-2 rounded hover:bg-blue-50">Edit Profile</Link>
              <button className="block w-full text-left px-3 py-2 rounded text-red-600 hover:underline hover:bg-red-50" onClick={() => {/* sign out logic here */}}>Sign Out</button>
            </div>
          )}
        </div>
        <button className="md:hidden ml-2 p-2" onClick={() => setShowSidebar(!showSidebar)} aria-label="Open sidebar">
          <svg className="w-6 h-6 text-[#14213D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </header>
      {/* Search/filter bar directly under header */}
      <div className="w-full bg-white shadow-lg p-4 flex flex-col gap-4 sticky top-[64px] z-[99998] mb-4 mt-20 overflow-visible rounded-lg">
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
            options={Array.from(new Set(mockRecommendedOpportunities.map(o=>o.location)))}
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
        
        {/* Sidebar (filters + list) */}
        <aside className={`w-full md:w-1/3 lg:w-1/4 bg-transparent border-r-2 border-blue-100 md:sticky md:top-16 z-20 transition-all duration-200 shadow-none ${showSidebar ? 'block' : 'hidden md:block'}`}>
          {/* Collapsible Stats/Quick Actions */}
          <div className="md:hidden flex justify-between items-center px-4 py-2 border-b border-blue-100 bg-blue-50">
            <span className="font-semibold text-[#14213D]">Stats & Quick Actions</span>
            <button onClick={() => setShowStats(!showStats)} className="text-[#FCA311] font-bold text-lg">{showStats ? '−' : '+'}</button>
          </div>
          <div className={`px-4 py-2 space-y-4 ${showStats ? 'block' : 'hidden'} md:block`}> {/* Always show on desktop */}
            {/* Stats/Quick Actions here (collapsed by default on mobile) */}
            <div className="grid grid-cols-2 gap-2 text-xs mb-2">
              <Link href="/applications" className="bg-white border rounded p-2 text-center shadow-sm hover:bg-blue-50 transition-colors cursor-pointer block">
                <div className="font-bold text-[#FCA311]">4</div>
                <div>Applied</div>
              </Link>
              <Link href="/opportunities/saved" className="bg-white border rounded p-2 text-center shadow-sm hover:bg-blue-50 transition-colors cursor-pointer block">
                <div className="font-bold text-[#14213D]">2</div>
                <div>Saved</div>
              </Link>
            </div>
          </div>
          {/* Result count */}
          <div className="flex items-center justify-between px-4 py-2">
            <div className="text-xs text-gray-500 font-medium">{sortedOpportunities.length} opportunities found</div>
            <div className="relative">
              <button onClick={() => setSortDropdownOpen((o) => !o)} className="p-2 rounded hover:bg-blue-100 transition-colors" aria-label="Sort">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M6 12h12M9 18h6" /></svg>
              </button>
              {sortDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] p-2">
                  <button className={`block w-full text-left px-3 py-2 rounded hover:bg-blue-50 ${sortOption === 'distance' ? 'bg-blue-100 font-semibold' : ''}`} onClick={() => { setSortOption('distance'); setSortDropdownOpen(false); }}>Sort by Distance</button>
                  <button className={`block w-full text-left px-3 py-2 rounded hover:bg-blue-50 ${sortOption === 'date' ? 'bg-blue-100 font-semibold' : ''}`} onClick={() => { setSortOption('date'); setSortDropdownOpen(false); }}>Sort by Date Posted</button>
                </div>
              )}
            </div>
          </div>
          {/* Opportunity List */}
          <div className="overflow-y-auto h-[60vh] px-2 pb-4">
            {sortedOpportunities.length === 0 ? (
              <div className="p-4 text-gray-400 text-center">No opportunities found.</div>
            ) : (
              <ul className="space-y-3">
                {sortedOpportunities.map((opp) => (
                  <li key={opp._id}>
                    <button
                      className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl shadow border border-blue-100 bg-white hover:bg-[#FCA311]/10 transition-colors relative ${selectedOpportunity?._id === opp._id ? 'bg-[#FCA311]/20 border-l-4 border-[#FCA311] shadow-md' : ''}`}
                      onClick={() => setSelectedOpportunity(opp)}
                    >
                      {/* Facility logo or initials */}
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#FCA311] flex items-center justify-center bg-white text-[#FCA311] font-bold text-lg mr-2">
                        {opp.facilityLogo ? (
                          <Image src={opp.facilityLogo} alt={opp.facility} fill className="object-cover rounded-full" />
                        ) : (
                          <span>{getInitials(opp.facility)}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-semibold text-[#14213D] truncate">{opp.title}</span>
                          {opp.isNew && <span className="ml-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">New</span>}
                          {opp.isPopular && <span className="ml-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">Popular</span>}
                          {opp.deadlineSoon && <span className="ml-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-semibold">Deadline Soon</span>}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1 mb-1">
                          <span className="bg-[#FCA311]/10 text-[#FCA311] px-2 py-0.5 rounded text-xs font-medium">{opp.type}</span>
                          <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs font-medium">{opp.specialty}</span>
                          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-medium">{opp.duration}</span>
                    </div>
                        <div className="text-xs text-gray-500 truncate">{opp.location} • Posted {opp.postedAt}</div>
                    </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="flex-1 bg-transparent min-h-[60vh] p-0 md:p-4 flex flex-col">
          {!selectedOpportunity ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
              <Image src="/images/search-icon.svg" alt="Select an opportunity" width={64} height={64} className="mb-4" />
              <h2 className="text-xl font-semibold mb-2">Select an opportunity to view details</h2>
              <p className="text-gray-500">Browse the list on the left and click an opportunity to see more information.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6 w-full h-full flex flex-col relative">
              {/* Title and badges */}
              <div className="flex flex-col md:flex-row md:items-start mb-6 gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#FCA311] shadow-md flex items-center justify-center bg-white text-[#FCA311] font-bold text-2xl">
                  {selectedOpportunity.facilityLogo ? (
                    <Image src={selectedOpportunity.facilityLogo} alt={selectedOpportunity.facility} fill className="object-cover rounded-full" />
                  ) : (
                    <span>{getInitials(selectedOpportunity.facility)}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-[#14213D] mb-1 truncate">{selectedOpportunity.title}</h2>
                  <div className="text-gray-600 mb-1 truncate">{selectedOpportunity.facility} • {selectedOpportunity.location}</div>
                  <div className="flex flex-wrap gap-2 text-xs mb-2">
                    <span className="bg-[#FCA311]/10 text-[#FCA311] px-2 py-1 rounded">{selectedOpportunity.type}</span>
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">{selectedOpportunity.specialty}</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">{selectedOpportunity.duration}</span>
                    {selectedOpportunity.isNew && <span className="ml-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">New</span>}
                    {selectedOpportunity.isFeatured && <span className="ml-1 px-2 py-0.5 rounded-full bg-[#FCA311]/20 text-[#FCA311] text-xs font-semibold">Featured</span>}
                  </div>
                  {/* Action buttons at the top with more spacing and divider */}
                  <div className="flex gap-3 mt-14 mb-8 flex-wrap">
                    <button className="bg-[#FCA311] hover:bg-[#FCA311]/90 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow flex-1">Apply Now</button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow flex-1 flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 5v14l7-7 7 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" /></svg>
                      Save
                    </button>
                  </div>
                  <div className="border-b border-gray-200 mb-6"></div>
                </div>
              </div>
              {/* Sectioned details */}
              <div className="mb-6 border-b border-gray-100 pb-4">
                <h3 className="font-semibold text-[#14213D] mb-1">Description</h3>
                <p className="text-gray-700 whitespace-pre-line">{selectedOpportunity.description || 'No description provided.'}</p>
              </div>
              <div className="mb-6 border-b border-gray-100 pb-4">
                <h3 className="font-semibold text-[#14213D] mb-1">Requirements</h3>
                {selectedOpportunity.requirements && selectedOpportunity.requirements.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-700">
                    {selectedOpportunity.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No requirements listed.</p>
                )}
              </div>
              <div className="mb-6">
                <h3 className="font-semibold text-[#14213D] mb-1">Benefits</h3>
                {selectedOpportunity.benefits && selectedOpportunity.benefits.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-700">
                    {selectedOpportunity.benefits.map((ben, idx) => (
                      <li key={idx}>{ben}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No benefits listed.</p>
                )}
              </div>
            </div>
          )}
        </section>
      </main>
      
      </div>
  );
} 