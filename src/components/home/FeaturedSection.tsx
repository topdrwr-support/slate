import React from 'react';
import { brands, talent, events } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ChevronRightIcon } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';

const FeaturedSection: React.FC = () => {
  const featuredBrands = brands.slice(0, 6);
  const featuredTalent = talent.slice(0, 6);
  const featuredEvents = events.slice(0, 6);

  return (
    <section className="py-10">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured on SLATE</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with industry-leading brands and exceptional talent from around the world.
          </p>
        </div>
        
        {/* Featured Brands */}
        <div className="mb-8">
          <div className="flex items-center justify-between md:justify-center mb-6">
            <h3 className="text-xl font-medium md:text-center">Premium Brands</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground md:hidden">
              <span>Scroll to see more</span>
              <ChevronRightIcon className="h-3 w-3" />
            </div>
          </div>
          <ScrollArea className="w-full">
            <div className="flex md:justify-center space-x-4 pb-4">
              {featuredBrands.map((brand) => (
                <Card key={brand.id} className="w-[280px] flex-none">
                  <div className="aspect-square overflow-hidden">
                    {brand.image && (
                      <img 
                        src={brand.image} 
                        alt={brand.name} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                      />
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src={brand.image} alt={brand.name} />
                        <AvatarFallback>{brand.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{brand.name}</h4>
                        <p className="text-xs text-muted-foreground">{brand.category}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        
        {/* Featured Talent */}
        <div className="mb-8">
          <div className="flex items-center justify-between md:justify-center mb-6">
            <h3 className="text-xl font-medium md:text-center">Elite Talent</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground md:hidden">
              <span>Scroll to see more</span>
              <ChevronRightIcon className="h-3 w-3" />
            </div>
          </div>
          <ScrollArea className="w-full">
            <div className="flex md:justify-center space-x-4 pb-4">
              {featuredTalent.map((person) => (
                <Card key={person.id} className="w-[280px] flex-none">
                  <div className="aspect-square overflow-hidden">
                    {person.image && (
                      <img 
                        src={person.image} 
                        alt={person.name} 
                        className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105" 
                      />
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src={person.image} alt={person.name} />
                        <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{person.name}</h4>
                        <p className="text-xs text-muted-foreground">{person.category}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Previous Events */}
        <div>
          <div className="flex items-center justify-between md:justify-center mb-6">
            <h3 className="text-xl font-medium md:text-center">Previous Events</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground md:hidden">
              <span>Scroll to see more</span>
              <ChevronRightIcon className="h-3 w-3" />
            </div>
          </div>
          <ScrollArea className="w-full">
            <div className="flex md:justify-center space-x-4 pb-4">
              {featuredEvents.map((event) => (
                <Card key={event.id} className="w-[280px] flex-none">
                  <div className="aspect-square overflow-hidden bg-muted relative">
                    {event.image && (
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105" 
                      />
                    )}
                    <Badge 
                      className="absolute bottom-2 left-2 bg-white text-black"
                    >
                      {event.eventType}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-medium line-clamp-1">{event.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {event.date ? format(parseISO(event.date), "MMM d, yyyy") : 'TBD'} • {event.location}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar className="h-6 w-6 border">
                        <AvatarImage src={event.hostImage} alt={event.hostName} />
                        <AvatarFallback>{event.hostName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <p className="text-xs text-muted-foreground">Hosted by {event.hostName}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;