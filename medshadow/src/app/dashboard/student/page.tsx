'use client';
export const dynamic = "force-dynamic";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import Image from 'next/image';
import DropdownFilter from '@/components/DropdownFilter';
import MainContent from '@/components/dashboard/MainContent';
import OpportunityDetails from '@/components/dashboard/OpportunityDetails';
import Sidebar from '@/components/dashboard/Sidebar';
import OpportunityList from '@/components/dashboard/OpportunityList';
import StatsQuickActions from '@/components/dashboard/StatsQuickActions';
import SortDropdown from '@/components/dashboard/SortDropdown';
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
          <Link href="/applications" className="text-[#14213D] hover:text-[#FCA311] font-medium">Applications</Link>
          <Link href="/profiles/student/me" className="text-[#14213D] hover:text-[#FCA311] font-medium">Profile</Link>
        </nav>
        <div className="flex items-center space-x-3 relative z-[99999]" ref={userDropdownRef}>
          {user && <NavbarUserDropdown user={{ role: user.role as UserRole, profileImage: user.profileImage, _id: user._id }} />}
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
        <Sidebar
          applicationsCount={applications.length}
          savedCount={savedOpportunities.length}
          sortOption={sortOption}
          setSortOption={setSortOption}
          sortedOpportunities={sortedOpportunities}
          selectedOpportunity={selectedOpportunity}
          setSelectedOpportunity={setSelectedOpportunity}
          sortDropdownOpen={sortDropdownOpen}
          setSortDropdownOpen={setSortDropdownOpen}
        />

        <MainContent selectedOpportunity={selectedOpportunity} />
      </main>
      
      </div>
  );
} 