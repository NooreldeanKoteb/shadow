import React from 'react';

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  {
    value: '5,000+',
    label: 'Students Placed'
  },
  {
    value: '350+',
    label: 'Partner Facilities'
  },
  {
    value: '40+',
    label: 'Medical Specialties'
  },
  {
    value: '98%',
    label: 'Satisfaction Rate'
  }
];

const StatsSection = () => {
  return (
    <section className="py-24 bg-[#14213D] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-white/10 text-white/90 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
            By the numbers
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why MedShadow Works</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Our platform has successfully connected thousands of students with prestigious medical institutions
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#FCA311] mb-2">{stat.value}</div>
              <p className="text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 