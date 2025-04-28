'use client';
export const dynamic = "force-dynamic";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

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
}

interface Application {
  _id: string;
  opportunity: Opportunity;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected' | 'onboarding';
  createdAt: string;
  updatedAt: string;
  nextSteps?: {
    type: 'document' | 'form' | 'task' | 'meeting';
    title: string;
    description: string;
    deadline?: string;
    completed?: boolean;
  }[];
  notifications?: {
    _id: string;
    message: string;
    date: string;
    read: boolean;
    type: 'info' | 'success' | 'warning' | 'error';
  }[];
}

// Mock data for development
const mockApplications: Application[] = [
  {
    _id: '1',
    opportunity: {
      _id: '1',
      title: 'Cardiology Shadowing',
      facility: 'Cleveland Clinic',
      facilityLogo: '/images/cleveland-logo.jpg',
      specialty: 'Cardiology',
      location: 'Cleveland, OH',
      type: 'Shadowing',
      duration: '4 weeks'
    },
    status: 'accepted',
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-20T14:30:00Z',
    nextSteps: [
      {
        type: 'document',
        title: 'Background Check Authorization',
        description: 'Please complete and submit the background check authorization form',
        deadline: '2024-03-01T23:59:59Z',
        completed: false
      },
      {
        type: 'document',
        title: 'Immunization Records',
        description: 'Upload your current immunization records',
        deadline: '2024-03-01T23:59:59Z',
        completed: true
      }
    ],
    notifications: [
      {
        _id: 'n1',
        message: 'Congratulations! Your application has been accepted.',
        date: '2024-02-20T14:30:00Z',
        read: false,
        type: 'success'
      },
      {
        _id: 'n2',
        message: 'Please complete your onboarding documents within the next 10 days.',
        date: '2024-02-20T14:31:00Z',
        read: false,
        type: 'info'
      }
    ]
  },
  {
    _id: '2',
    opportunity: {
      _id: '2',
      title: 'Emergency Medicine Rotation',
      facility: 'General Hospital',
      facilityLogo: '/images/general-logo.jpg',
      specialty: 'Emergency Medicine',
      location: 'Boston, MA',
      type: 'Rotation',
      duration: '2 weeks'
    },
    status: 'reviewing',
    createdAt: '2024-02-10T15:00:00Z',
    updatedAt: '2024-02-12T09:00:00Z',
    notifications: [
      {
        _id: 'n3',
        message: 'Your application is being reviewed by the department head.',
        date: '2024-02-12T09:00:00Z',
        read: true,
        type: 'info'
      }
    ]
  }
];

export default function ApplicationsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'accepted' | 'completed'>('all');
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

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
      
      // Fetch user details and applications
      fetchUserDetails(token);
      fetchApplications(token);
    } catch (error) {
      console.error('Error parsing token:', error);
      router.push('/auth/signin');
    }
  }, [router]);

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
    }
  };

  const fetchApplications = async (token: string) => {
    try {
      // In a real app, this would fetch from your API
      // For now, using mock data
      setApplications(mockApplications);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewing':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'onboarding':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredApplications = applications.filter(app => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return app.status === 'pending' || app.status === 'reviewing';
    if (activeTab === 'accepted') return app.status === 'accepted' || app.status === 'onboarding';
    if (activeTab === 'completed') return false; // Add logic for completed applications
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F3F6FA] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FCA311]"></div>
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
            <Image src={user?.profileImage || '/images/default-avatar.jpg'} alt={user?.name || 'User profile'} fill className="object-cover" />
          </button>
          {userDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 min-w-[10rem] bg-white border border-gray-200 rounded-lg shadow-lg z-[99999] p-2">
              <Link href="/profiles/student/me" className="block w-full text-left px-3 py-2 rounded hover:bg-blue-50">My Profile</Link>
              <Link href="/profiles/student/edit" className="block w-full text-left px-3 py-2 rounded hover:bg-blue-50">Edit Profile</Link>
              <button className="block w-full text-left px-3 py-2 rounded text-red-600 hover:underline hover:bg-red-50" onClick={() => {/* sign out logic here */}}>Sign Out</button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="mt-16 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#14213D]">My Applications</h1>
          <p className="text-gray-600">Track your applications and complete any required next steps</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`pb-4 px-1 ${activeTab === 'all' ? 'border-b-2 border-[#FCA311] text-[#14213D] font-medium' : 'text-gray-500 hover:text-gray-700'}`}
            >
              All Applications
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`pb-4 px-1 ${activeTab === 'pending' ? 'border-b-2 border-[#FCA311] text-[#14213D] font-medium' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab('accepted')}
              className={`pb-4 px-1 ${activeTab === 'accepted' ? 'border-b-2 border-[#FCA311] text-[#14213D] font-medium' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Accepted
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`pb-4 px-1 ${activeTab === 'completed' ? 'border-b-2 border-[#FCA311] text-[#14213D] font-medium' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Completed
            </button>
          </nav>
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          {filteredApplications.map((application) => (
            <div key={application._id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              {/* Application Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                      <Image
                        src={application.opportunity.facilityLogo || '/images/hospital-default.jpg'}
                        alt={application.opportunity.facility}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#14213D]">{application.opportunity.title}</h3>
                      <p className="text-gray-600">{application.opportunity.facility} • {application.opportunity.location}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500 mt-1">Applied {formatDate(application.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Next Steps (if any) */}
              {application.nextSteps && application.nextSteps.length > 0 && (
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Next Steps</h4>
                  <div className="space-y-4">
                    {application.nextSteps.map((step, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-start space-x-3">
                          <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                            {step.completed ? (
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <span className="w-3 h-3 rounded-full bg-blue-600" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{step.title}</p>
                            <p className="text-sm text-gray-500">{step.description}</p>
                          </div>
                        </div>
                        {step.deadline && (
                          <span className="text-sm text-gray-500">
                            Due {formatDate(step.deadline)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notifications (if any) */}
              {application.notifications && application.notifications.length > 0 && (
                <div className="p-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Recent Updates</h4>
                  <div className="space-y-4">
                    {application.notifications.map((notification) => (
                      <div key={notification._id} className={`p-4 rounded-lg ${
                        notification.type === 'success' ? 'bg-green-50' :
                        notification.type === 'warning' ? 'bg-yellow-50' :
                        notification.type === 'error' ? 'bg-red-50' :
                        'bg-blue-50'
                      }`}>
                        <div className="flex items-start">
                          <div className={`mt-0.5 w-4 h-4 rounded-full flex-shrink-0 ${
                            notification.type === 'success' ? 'bg-green-400' :
                            notification.type === 'warning' ? 'bg-yellow-400' :
                            notification.type === 'error' ? 'bg-red-400' :
                            'bg-blue-400'
                          }`} />
                          <div className="ml-3">
                            <p className="text-sm text-gray-900">{notification.message}</p>
                            <p className="text-sm text-gray-500 mt-1">{formatDate(notification.date)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {filteredApplications.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No applications found for this filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 