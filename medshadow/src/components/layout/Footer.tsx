"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-darker text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MedShadow</h3>
            <p className="text-neutral-lighter">
              Connecting students with medical shadowing, rotation, and volunteering opportunities.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-neutral-lighter hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/opportunities" className="text-neutral-lighter hover:text-white transition-colors">
                  Opportunities
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-lighter hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-lighter hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-neutral-lighter">
              <li>Email: info@medshadow.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Medical Center Dr, Suite 100</li>
              <li>Chicago, IL 60601</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-dark mt-8 pt-6 text-center text-neutral-lighter">
          <p>&copy; {currentYear} MedShadow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 