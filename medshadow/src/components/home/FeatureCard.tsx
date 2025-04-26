import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, link }) => {
  return (
    <div className="group">
      <div className="card bg-[#F8FAFC] p-8 text-center rounded-xl border border-neutral-200 shadow-sm group-hover:shadow-md group-hover:border-[#FCA311]/30 transition-all duration-300 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FCA311] to-[#FCA311]/60"></div>
        <div className="relative w-20 h-20 mx-auto mb-6 bg-white rounded-full p-4 shadow-sm">
          <div className="absolute inset-0 bg-[#FCA311]/10 rounded-full group-hover:bg-[#FCA311]/20 transition-colors duration-300"></div>
          <Image
            src={icon}
            alt={title}
            fill
            className="object-contain p-4"
          />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-[#14213D] group-hover:text-[#1A365D] transition-colors">{title}</h3>
        <p className="text-[#4B5563] mb-6">
          {description}
        </p>
        <div className="mt-4 pt-4 border-t border-neutral-200">
          <Link href={link} className="inline-flex items-center text-[#FCA311] font-medium group-hover:text-[#E76F51] transition-colors">
            <span className="mr-2">Learn more</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.16663 7.00008H12.8333M12.8333 7.00008L6.99996 1.16675M12.8333 7.00008L6.99996 12.8334" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard; 