'use client';

import Link from 'next/link';
import OpportunityDetails from './OpportunityDetails';
import type { Opportunity } from './StudentDashboardClient';

interface MainContentProps {
  selectedOpportunity: Opportunity | null;
  user: { name?: string } | null;
}

export default function MainContent({ selectedOpportunity, user }: MainContentProps) {
  if (!selectedOpportunity) {
    return (
      <div className="flex-1 p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-[#14213D] mb-4">
            Welcome, <span className="text-[#FCA311]">{user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : ''}</span>!
          </h1>
          <h2 className="text-lg font-semibold mb-2">Select an opportunity to view details</h2>
          <p className="text-gray-500 mb-8">Browse the list on the left and click an opportunity to see more information.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-[#14213D] mb-3">Quick Actions</h2>
              <ul className="space-y-2 text-left">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-[#FCA311]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                  <Link href="/opportunities" className="font-medium hover:opacity-80 transition-colors">Search for opportunities</Link>
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-[#FCA311]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <Link href="/opportunities/saved" className="font-medium hover:opacity-80 transition-colors">Save interesting opportunities</Link>
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-[#FCA311]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <Link href="/applications" className="font-medium hover:opacity-80 transition-colors">Track your applications</Link>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-[#14213D] mb-3">Getting Started</h2>
              <ul className="space-y-2 text-left">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-[#FCA311]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <Link href="/profiles/student/me" className="font-medium hover:opacity-80 transition-colors">Complete your profile</Link>
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-[#FCA311]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <Link href="/profiles/student/me#preferences" className="font-medium hover:opacity-80 transition-colors">Add your preferences</Link>
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-[#FCA311]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <Link href="/settings/notifications" className="font-medium hover:opacity-80 transition-colors">Set up notifications</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto ml-6">
        {selectedOpportunity && <OpportunityDetails opportunity={selectedOpportunity} />}

    </div>
  );
}