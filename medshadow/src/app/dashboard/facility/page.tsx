'use client';
export const dynamic = "force-dynamic";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
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
  applicationsCount?: number;
  createdAt?: string;
}

interface Application {
  _id: string;
  status: string;
  student: {
    name: string;
  };
  opportunity: {
    title: string;
  };
  createdAt: string;
}

export default function FacilityDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

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
      
      // Verify this is a facility
      if (userData.role !== 'facility') {
        router.push('/dashboard');
        return;
      }
      
      // Fetch user details
      fetchUserDetails(token);
      
      // Fetch opportunities and applications
      fetchOpportunities(token);
      fetchApplications(token);
    } catch (error) {
      console.error('Error parsing token:', error);
      router.push('/auth/signin');
    }
  }, [router]);

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

  const fetchOpportunities = async (token: string) => {
    try {
      const response = await fetch('/api/opportunities/facility', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setOpportunities(data.opportunities || []);
      }
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    }
  };

  const fetchApplications = async (token: string) => {
    try {
      const response = await fetch('/api/applications/facility', {
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

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-darker">Facility Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-neutral-dark">Welcome, {user?.name}</span>
            <Link 
              href="/profiles/facility" 
              className="btn-primary hover:bg-opacity-90 transition-colors"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Actions Card */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-neutral-darker">Quick Actions</h2>
            <div className="space-y-3">
              <Link 
                href="/opportunities/create" 
                className="block w-full bg-primary bg-opacity-10 hover:bg-opacity-20 text-primary font-medium py-2 px-4 rounded-md text-center transition-colors"
              >
                Create New Opportunity
              </Link>
              <Link 
                href="/applications" 
                className="block w-full bg-secondary bg-opacity-10 hover:bg-opacity-20 text-secondary font-medium py-2 px-4 rounded-md text-center transition-colors"
              >
                Review Applications
              </Link>
              <Link 
                href="/opportunities/manage" 
                className="block w-full bg-accent bg-opacity-10 hover:bg-opacity-20 text-accent font-medium py-2 px-4 rounded-md text-center transition-colors"
              >
                Manage Opportunities
              </Link>
            </div>
          </div>

          {/* Active Opportunities Card */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-neutral-darker">Active Opportunities</h2>
            {opportunities.length > 0 ? (
              <ul className="space-y-3">
                {opportunities.slice(0, 3).map((opp: Opportunity) => (
                  <li key={opp._id} className="border-b border-neutral-lighter pb-2">
                    <div className="font-medium text-neutral-darker">{opp.title}</div>
                    <div className="text-sm text-neutral-dark">
                      {opp.type} • {opp.applicationsCount || 0} applications
                    </div>
                    <div className="text-xs text-neutral-dark">
                      Posted: {opp.createdAt ? new Date(opp.createdAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-neutral-dark">No active opportunities</p>
            )}
            <Link 
              href="/opportunities/manage" 
              className="mt-4 inline-block text-primary hover:text-opacity-80 transition-colors"
            >
              Manage all opportunities →
            </Link>
          </div>

          {/* Recent Applications Card */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-neutral-darker">Recent Applications</h2>
            {applications.length > 0 ? (
              <ul className="space-y-3">
                {applications.slice(0, 3).map((app: Application) => (
                  <li key={app._id} className="border-b border-neutral-lighter pb-2">
                    <div className="font-medium text-neutral-darker">{app.student.name || 'N/A'}</div>
                    <div className="text-sm text-neutral-dark">
                      {app.opportunity.title || 'N/A'}
                    </div>
                    <div className="text-xs text-neutral-dark">
                      Applied: {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-neutral-dark">No recent applications</p>
            )}
            <Link 
              href="/applications" 
              className="mt-4 inline-block text-primary hover:text-opacity-80 transition-colors"
            >
              Review all applications →
            </Link>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6 text-neutral-darker">Analytics Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-primary bg-opacity-5">
              <div className="text-sm text-primary font-medium">Total Opportunities</div>
              <div className="text-2xl font-bold text-neutral-darker">{opportunities.length}</div>
            </div>
            <div className="card bg-secondary bg-opacity-5">
              <div className="text-sm text-secondary font-medium">Total Applications</div>
              <div className="text-2xl font-bold text-neutral-darker">{applications.length}</div>
            </div>
            <div className="card bg-accent bg-opacity-5">
              <div className="text-sm text-accent font-medium">Acceptance Rate</div>
              <div className="text-2xl font-bold text-neutral-darker">
                {applications.length > 0 
                  ? `${Math.round((applications.filter((app: Application) => app.status === 'accepted').length / applications.length) * 100)}%` 
                  : '0%'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 