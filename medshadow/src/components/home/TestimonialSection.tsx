"use client";

import React from 'react';
import Image from 'next/image';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "MedShadow connected me with a cardiology shadowing opportunity at Cleveland Clinic that completely changed my career path. The application process was seamless, and the experience was invaluable.",
    name: "Sarah Johnson",
    title: "Medical Student, Johns Hopkins University",
    image: "/images/testimonial-student.jpg"
  },
  {
    quote: "As a busy hospital administrator, finding qualified students for shadowing was always difficult. MedShadow streamlined our process and helped us connect with motivated students.",
    name: "Dr. Michael Chen",
    title: "Chief of Surgery, Mayo Clinic",
    image: "/images/testimonial-doctor.jpg"
  },
  {
    quote: "The structured program and professional connections I made through MedShadow helped guide my specialty choice. I'm now pursuing pediatric oncology thanks to my shadowing experience.",
    name: "James Wilson",
    title: "Pre-Med Student, Stanford University",
    image: "/images/testimonial-student2.jpg"
  }
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-[#E5E7EB] text-[#4B5563] rounded-full text-sm font-medium mb-4">
              Success stories
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#14213D]">What Our Users Say</h2>
          </div>
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-neutral-200">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3">
                <div className="relative w-48 h-48 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <Image
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <svg className="h-12 w-12 text-[#FCA311]/30 mb-6" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-xl md:text-2xl font-medium text-[#14213D] mb-6">
                  {testimonials[activeIndex].quote}
                </p>
                <div>
                  <h4 className="font-semibold text-[#14213D]">{testimonials[activeIndex].name}</h4>
                  <p className="text-[#4B5563]">{testimonials[activeIndex].title}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-[#FCA311]' : 'bg-[#E5E7EB]'}`}
                aria-current={index === activeIndex}
                aria-label={`Testimonial ${index + 1}`}
                onClick={() => setActiveIndex(index)}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection; 