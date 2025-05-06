import React from 'react';
import { UsersIcon, CalendarIcon, HandshakeIcon } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: 'Access',
      description: 'Join our curated community of high-profile brands and elite talent, each vetted to ensure exceptional quality.',
      icon: <UsersIcon className="h-10 w-10" />,
    },
    {
      title: 'Connect',
      description: 'Discover exclusive events and partnership opportunities tailored to your profile and interests.',
      icon: <CalendarIcon className="h-10 w-10" />,
    },
    {
      title: 'Elevate',
      description: 'Form meaningful partnerships that drive cultural impact and create lasting value.',
      icon: <HandshakeIcon className="h-10 w-10" />,
    },
  ];

  return (
    <section className="py-10 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The SLATE Experience</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We've reimagined how brands and talent connect, creating an exclusive ecosystem for meaningful collaborations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-card rounded-xl p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="mx-auto rounded-full bg-primary/10 p-3 w-16 h-16 flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                  {/* Arrow icon here */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;