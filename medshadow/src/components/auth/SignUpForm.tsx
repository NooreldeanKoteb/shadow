"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserRole } from '@/types/user';

interface SignUpFormProps {
  userType: 'student' | 'facility';
}

const SignUpForm: React.FC<SignUpFormProps> = ({ userType }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: userType as UserRole,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // Registration
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Show success message
      setSuccess('Account created successfully! Please sign in to continue.');
      
      // Redirect to sign-in after a short delay
      setTimeout(() => {
        router.push(`/auth/signin?email=${encodeURIComponent(formData.email)}`);
      }, 2000);
      
    } catch (error: any) {
      setError(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    signIn('google', { 
      callbackUrl: '/dashboard',
      role: formData.role,
    });
  };

  return (
    <div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 px-4 py-3 rounded-lg mb-6">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#4B5563] mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#FCA311] focus:ring focus:ring-[#FCA311]/20 transition-all duration-200"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#4B5563] mb-1.5">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#FCA311] focus:ring focus:ring-[#FCA311]/20 transition-all duration-200"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-[#4B5563] mb-1.5">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#FCA311] focus:ring focus:ring-[#FCA311]/20 transition-all duration-200"
          />
          <p className="mt-1.5 text-xs text-[#4B5563]/80">
            Password must be at least 8 characters long with a mix of uppercase, lowercase, numbers, and special characters.
          </p>
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#4B5563] mb-1.5">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#FCA311] focus:ring focus:ring-[#FCA311]/20 transition-all duration-200"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#14213D] hover:bg-[#1A365D] text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg flex justify-center items-center mt-6"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Creating Account...</span>
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-[#4B5563]">or continue with</span>
          </div>
        </div>
        
      <div className="mt-4">
        <button
          onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg py-2.5 px-4 bg-white hover:bg-gray-50 shadow-sm text-[#4B5563] transition-all duration-200"
        >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="#4285F4" />
            </svg>
            <span>Sign up with Google</span>
        </button>
        </div>
      </div>
      
      <p className="mt-8 text-center text-sm text-[#4B5563]">
        Already have an account?{' '}
        <Link href="/auth/signin" className="font-medium text-[#FCA311] hover:text-[#FCA311]/80">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm; 