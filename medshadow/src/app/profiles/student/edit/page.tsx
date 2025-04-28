'use client';
export const dynamic = "force-dynamic";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';

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
  phone?: string;
  interests?: string[];
}

export default function EditStudentProfile() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    school: '',
    graduationYear: '',
    degree: '',
    major: '',
    bio: '',
    location: '',
    phone: '',
    interests: '',
  });
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Available degree options
  const degreeOptions = [
    "Bachelor of Science (BS)",
    "Bachelor of Arts (BA)",
    "Master of Science (MS)",
    "Master of Arts (MA)",
    "Doctor of Medicine (MD)",
    "Doctor of Osteopathic Medicine (DO)",
    "Doctor of Philosophy (PhD)",
    "Other"
  ];

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
        
        // Initialize form data with user details
        setFormData({
          name: data.user.name || '',
          email: data.user.email || '',
          school: data.user.school || '',
          graduationYear: data.user.graduationYear || '',
          degree: data.user.degree || '',
          major: data.user.major || '',
          bio: data.user.bio || '',
          location: data.user.location || '',
          phone: data.user.phone || '',
          interests: data.user.interests ? data.user.interests.join(', ') : '',
        });
        
        // Set profile image preview if exists
        if (data.user.profileImage) {
          setProfileImagePreview(data.user.profileImage);
        }
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      setErrorMessage('Failed to load profile. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage('');
    setErrorMessage('');
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/signin');
        return;
      }
      
      // Prepare form data
      const interestsArray = formData.interests
        .split(',')
        .map(item => item.trim())
        .filter(item => item !== '');
      
      const requestData = {
        ...formData,
        interests: interestsArray
      };
      
      // Upload profile image if changed
      if (profileImage) {
        // In a real implementation, you would upload the image to a storage service
        // and get back a URL to store in the user profile
        // For now, we'll simulate this
        console.log('Would upload profile image:', profileImage.name);
        // requestData.profileImage = 'url_from_upload_service';
      }
      
      // Send update request
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      
      if (response.ok) {
        setSuccessMessage('Profile updated successfully!');
        // Refresh user data
        fetchUserDetails(token);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSaving(false);
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
          <Link href="/profiles/student/me" className="text-[#14213D] hover:text-[#FCA311] font-medium">Profile</Link>
          <Link href="/applications" className="text-[#14213D] hover:text-[#FCA311] font-medium">Applications</Link>
          <Link href="/deadlines" className="text-[#14213D] hover:text-[#FCA311] font-medium">Deadlines</Link>
          <Link href="/resources" className="text-[#14213D] hover:text-[#FCA311] font-medium">Resources</Link>
        </nav>
        <div className="flex items-center space-x-3 relative z-[99999]" ref={userDropdownRef}>
          <button className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[#FCA311] shadow-sm focus:outline-none mr-4" onClick={() => setUserDropdownOpen((o) => !o)} aria-label="User menu">
            <Image src={profileImagePreview || '/images/default-avatar.jpg'} alt={formData.name || 'User profile'} fill className="object-cover" />
          </button>
          {userDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 min-w-[10rem] bg-white border border-gray-200 rounded-lg shadow-lg z-[99999] p-2">
              <Link href="/profiles/student/me" className="block w-full text-left px-3 py-2 rounded hover:bg-blue-50">My Profile</Link>
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
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Edit Your Profile</h1>
            <p className="text-white/80">Update your personal information and preferences</p>
          </div>
        </div>
        
        <div className="bg-gray-100 min-h-screen">
          <div className="container mx-auto px-4 py-8">
            {/* Success/Error Messages */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-700 rounded-lg">
                {successMessage}
              </div>
            )}
            
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-700 rounded-lg">
                {errorMessage}
              </div>
            )}
            
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="md:flex">
                {/* Profile Image Section */}
                <div className="md:w-1/3 bg-[#14213D] p-8 text-white flex flex-col items-center justify-start">
                  <div className="relative w-40 h-40 group cursor-pointer" onClick={() => document.getElementById('profile-image')?.click()}>
                    <div className="relative w-full h-full rounded-full border-4 border-white shadow-lg">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <Image
                          src={profileImagePreview || '/images/default-avatar.jpg'}
                          alt="Profile"
                          fill
                          className="object-cover"
                        />
                      </div>
                      {/* Persistent Camera Icon */}
                      <div className="absolute bottom-1 right-1 bg-[#FCA311] rounded-full p-2 shadow-lg z-10">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full">
                        <div className="text-white text-center">
                          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm">Change Photo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-1 mt-6">{formData.name}</h2>
                  <p className="text-white/80 mb-6">{formData.email}</p>
                  
                  <input
                    type="file"
                    id="profile-image"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    className="hidden"
                  />
                </div>
                
                {/* Form Section */}
                <div className="md:w-2/3 p-8">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Personal Information */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-[#14213D] pb-2 border-b border-gray-100">
                          Personal Information
                        </h3>
                        
                        <div className="mb-4">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FCA311] focus:border-[#FCA311] transition-colors"
                            required
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FCA311] focus:border-[#FCA311] transition-colors"
                            required
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FCA311] focus:border-[#FCA311] transition-colors"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="City, State"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FCA311] focus:border-[#FCA311] transition-colors"
                          />
                        </div>
                      </div>
                      
                      {/* Education Information */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4 text-[#14213D] pb-2 border-b border-gray-100">
                          Education Information
                        </h3>
                        
                        <div className="mb-4">
                          <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">
                            School/University
                          </label>
                          <input
                            type="text"
                            id="school"
                            name="school"
                            value={formData.school}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FCA311] focus:border-[#FCA311] transition-colors"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
                            Degree
                          </label>
                          <select
                            id="degree"
                            name="degree"
                            value={formData.degree}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FCA311] focus:border-[#FCA311] transition-colors bg-white"
                          >
                            <option value="">Select a degree</option>
                            {degreeOptions.map((degree, index) => (
                              <option key={index} value={degree}>{degree}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-1">
                            Major/Field of Study
                          </label>
                          <input
                            type="text"
                            id="major"
                            name="major"
                            value={formData.major}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FCA311] focus:border-[#FCA311] transition-colors"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-1">
                            Expected Graduation Year
                          </label>
                          <input
                            type="text"
                            id="graduationYear"
                            name="graduationYear"
                            value={formData.graduationYear}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FCA311] focus:border-[#FCA311] transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Additional Information */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4 text-[#14213D] pb-2 border-b border-gray-100">
                        Additional Information
                      </h3>
                      
                      <div className="mb-4">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                          Bio
                        </label>
                        <textarea
                          id="bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Tell us a bit about yourself..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FCA311] focus:border-[#FCA311] transition-colors"
                        ></textarea>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">
                          Medical Interests (comma separated)
                        </label>
                        <input
                          type="text"
                          id="interests"
                          name="interests"
                          value={formData.interests}
                          onChange={handleInputChange}
                          placeholder="e.g. Cardiology, Pediatrics, Neurology"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FCA311] focus:border-[#FCA311] transition-colors"
                        />
                      </div>
                    </div>
                    
                    {/* Submit Buttons */}
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="px-6 py-2.5 bg-[#FCA311] hover:bg-[#FCA311]/90 text-white rounded-lg transition-colors shadow-md flex items-center"
                      >
                        {isSaving ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 