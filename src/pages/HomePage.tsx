import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import FeaturedSection from '@/components/home/FeaturedSection';
import WhySlate from '@/components/home/WhySlate';
import CallToAction from '@/components/home/CallToAction';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    position: '',
    workEmail: '',
  });

  // If authenticated, redirect to dashboard
  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRequestFormOpen(false);
    setIsThankYouOpen(true);
    setFormData({
      fullName: '',
      company: '',
      position: '',
      workEmail: '',
    });
  };

  const handleRequestAccess = () => {
    setIsRequestFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-14 items-center justify-between">
            <div className="font-bold text-lg tracking-tight">SLATE</div>
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-14">
        {/* Hero Section */}
        <Hero onGetStarted={handleRequestAccess} />
        
        {/* Featured Section */}
        <FeaturedSection />
        
        {/* How It Works */}
        <HowItWorks />

        {/* Featured Image Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#9089fc] via-[#ff80b5] to-[#9089fc] opacity-90"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-white space-y-6">
                <p className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                  Invite-only access to the world's most distinguished creators and brands.
                </p>
              </div>
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <img
                  src="https://res.cloudinary.com/deom0oxlc/image/upload/v1746471149/MONTANA_MONSTER_yoskqb.jpg"
                  alt="French Montana x Monster Energy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Why SLATE */}
        <WhySlate />
        
        {/* Call to Action */}
        <CallToAction onJoin={handleRequestAccess} />
      </main>
      
      {/* Request Access Form Dialog */}
      <Dialog open={isRequestFormOpen} onOpenChange={setIsRequestFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Request Access</DialogTitle>
            <DialogDescription>
              Fill out the form below to request access to SLATE.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workEmail">Work Email</Label>
              <Input
                id="workEmail"
                name="workEmail"
                type="email"
                value={formData.workEmail}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">Submit Request</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Thank You Dialog */}
      <Dialog open={isThankYouOpen} onOpenChange={setIsThankYouOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Thank You</DialogTitle>
            <DialogDescription>
              Your request is under review. We will contact you upon acceptance.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      
      {/* Footer */}
      <footer className="bg-black text-white py-10">
        <div className="container px-4 mx-auto">
          <div>
            <h3 className="text-xl font-bold mb-4">SLATE</h3>
            <p className="text-gray-400">
              Connecting premium brands with elite talent for exceptional partnerships.
            </p>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2025 SLATE. All rights reserved.</p>
            <p className="mt-1">A TOP DRWR Company.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;