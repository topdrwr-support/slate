import React from 'react';
import { Button } from '@/components/ui/button';

interface CallToActionProps {
  onJoin: () => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ onJoin }) => {
  return (
    <section className="py-10">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Ready to Shape Culture?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join SLATE's exclusive network and connect with the cultural leaders defining tomorrow's opportunities.
          </p>
          <Button 
            onClick={onJoin}
            className="bg-black hover:bg-zinc-800 text-white" 
            size="lg"
          >
            Request Access
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;