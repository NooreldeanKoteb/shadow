'use client';

import Navbar from '@/components/layout/Navbar';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const resources = [
  {
    title: 'AAMC Student Resources',
    description: 'Official resources for medical students, including MCAT, AMCAS, and more.',
    link: 'https://students-residents.aamc.org/',
  },
  {
    title: 'Student Doctor Network',
    description: 'Forums, articles, and tools for premeds and med students.',
    link: 'https://www.studentdoctor.net/',
  },
  {
    title: 'Meddit (Reddit)',
    description: 'A supportive Reddit community for medical students.',
    link: 'https://www.reddit.com/r/medicalschool/',
  },
  {
    title: 'Khan Academy Medicine',
    description: 'Free video tutorials for medical concepts and USMLE prep.',
    link: 'https://www.khanacademy.org/science/health-and-medicine',
  },
];

const forumPosts = [
  { author: 'Alice', title: 'How did you find your first shadowing opportunity?', replies: 12 },
  { author: 'Bob', title: 'Tips for balancing rotations and studying?', replies: 8 },
  { author: 'Carol', title: 'Best resources for USMLE Step 1?', replies: 15 },
  { author: 'David', title: 'How to approach cold-emailing physicians?', replies: 5 },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Student Resources</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {resources.map((res) => (
            <a
              key={res.title}
              href={res.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-xl shadow-card p-6 hover:shadow-lg transition-shadow border border-gray-100"
            >
              <h2 className="text-xl font-semibold text-primary mb-2">{res.title}</h2>
              <p className="text-gray-700 mb-2">{res.description}</p>
              <span className="text-sm text-blue-600 hover:underline">Visit Resource →</span>
            </a>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Student Forum</h2>
        <div className="bg-white rounded-xl shadow-card p-6 border border-gray-100">
          <ul className="divide-y divide-gray-200">
            {forumPosts.map((post, idx) => (
              <li key={idx} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <span className="font-semibold text-[#14213D]">{post.author}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-800">{post.title}</span>
                </div>
                <span className="text-sm text-gray-500 mt-2 md:mt-0">{post.replies} replies</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 