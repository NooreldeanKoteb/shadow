"use client";

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

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [savedOpportunities, setSavedOpportunities] = useState([]);

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
          <h1 className="text-3xl font-bold text-neutral-darker">Student Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-neutral-dark">Welcome, {user?.name}</span>
            <Link 
              href="/profiles/student" 
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
                href="/opportunities" 
                className="block w-full bg-primary bg-opacity-10 hover:bg-opacity-20 text-primary font-medium py-2 px-4 rounded-md text-center transition-colors"
              >
                Browse Opportunities
              </Link>
              <Link 
                href="/applications" 
                className="block w-full bg-secondary bg-opacity-10 hover:bg-opacity-20 text-secondary font-medium py-2 px-4 rounded-md text-center transition-colors"
              >
                View Applications
              </Link>
              <Link 
                href="/opportunities/saved" 
                className="block w-full bg-accent bg-opacity-10 hover:bg-opacity-20 text-accent font-medium py-2 px-4 rounded-md text-center transition-colors"
              >
                Saved Opportunities
              </Link>
            </div>
          </div>

          {/* Applications Card */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-neutral-darker">Recent Applications</h2>
            {applications.length > 0 ? (
              <ul className="space-y-3">
                {applications.slice(0, 3).map((app: any) => (
                  <li key={app._id} className="border-b border-neutral-lighter pb-2">
                    <div className="font-medium text-neutral-darker">{app.opportunity.title}</div>
                    <div className="text-sm text-neutral-dark">
                      Status: <span className={`font-medium ${
                        app.status === 'pending' ? 'text-yellow-600' : 
                        app.status === 'accepted' ? 'text-secondary' : 
                        'text-accent'
                      }`}>{app.status}</span>
                    </div>
                    <div className="text-xs text-neutral-dark">
                      Applied: {new Date(app.createdAt).toLocaleDateString()}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-neutral-dark">No applications yet</p>
            )}
            <Link 
              href="/applications" 
              className="mt-4 inline-block text-primary hover:text-opacity-80 transition-colors"
            >
              View all applications →
            </Link>
          </div>

          {/* Saved Opportunities Card */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-neutral-darker">Saved Opportunities</h2>
            {savedOpportunities.length > 0 ? (
              <ul className="space-y-3">
                {savedOpportunities.slice(0, 3).map((opp: any) => (
                  <li key={opp._id} className="border-b border-neutral-lighter pb-2">
                    <div className="font-medium text-neutral-darker">{opp.title}</div>
                    <div className="text-sm text-neutral-dark">
                      {opp.type} • {opp.duration}
                    </div>
                    <div className="text-xs text-neutral-dark">
                      Saved: {new Date(opp.savedAt).toLocaleDateString()}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-neutral-dark">No saved opportunities</p>
            )}
            <Link 
              href="/opportunities/saved" 
              className="mt-4 inline-block text-primary hover:text-opacity-80 transition-colors"
            >
              View all saved opportunities →
            </Link>
          </div>
        </div>

        {/* Recommended Opportunities Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6 text-neutral-darker">Recommended Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Example opportunities - replace with actual data */}
            <div className="card hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-neutral-darker">Cardiology Shadowing</h3>
              <p className="text-neutral-dark mb-4">Shadow a cardiologist at City Hospital</p>
              <Link 
                href="/opportunities/1" 
                className="btn-secondary w-full text-center"
              >
                View Details
              </Link>
            </div>
            <div className="card hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-neutral-darker">Emergency Medicine Rotation</h3>
              <p className="text-neutral-dark mb-4">2-week rotation at General Hospital</p>
              <Link 
                href="/opportunities/2" 
                className="btn-secondary w-full text-center"
              >
                View Details
              </Link>
            </div>
            <div className="card hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2 text-neutral-darker">Pediatrics Volunteering</h3>
              <p className="text-neutral-dark mb-4">Weekly volunteering at Children's Hospital</p>
              <Link 
                href="/opportunities/3" 
                className="btn-secondary w-full text-center"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 