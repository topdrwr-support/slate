import React from 'react';
import { ShieldCheckIcon, SparklesIcon, RefreshCwIcon, HeartIcon } from 'lucide-react';

const WhySlate: React.FC = () => {
  const benefits = [
    {
      title: 'Curated Network',
      description: 'Access an invite-only community of vetted brands and elite talent, ensuring quality connections.',
      icon: <ShieldCheckIcon className="h-6 w-6" />,
    },
    {
      title: 'Cultural Impact',
      description: 'Create meaningful partnerships that shape and define cultural moments.',
      icon: <SparklesIcon className="h-6 w-6" />,
    },
    {
      title: 'Seamless Access',
      description: 'Navigate opportunities effortlessly with our intuitive platform designed for tastemakers.',
      icon: <RefreshCwIcon className="h-6 w-6" />,
    },
    {
      title: 'Exclusive Opportunities',
      description: 'Discover partnership possibilities not available through traditional channels.',
      icon: <HeartIcon className="h-6 w-6" />,
    },
  ];

  return (
    <section className="py-10 bg-black text-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The SLATE Difference</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            We're redefining how cultural connections are made, offering unprecedented access to opportunities that matter.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="p-6 border border-gray-800 rounded-xl hover:border-gray-700 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="rounded-full bg-gray-800 p-3 w-12 h-12 flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySlate;