import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { events } from '@/lib/mock-data';
import { Event, EventType } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import EventCard from '@/components/common/EventCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, parseISO, isAfter, isBefore, startOfToday, isWithinInterval, endOfDay, startOfDay } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';

const EventsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'my-events'>('upcoming');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState('');
  const [eventType, setEventType] = useState<EventType | 'all'>('all');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [sortBy, setSortBy] = useState<'recent' | 'popular'>('recent');

  // Filter events based on user role
  const getRoleFilteredEvents = () => {
    if (!user) return [];
    
    switch (user.role) {
      case 'admin':
        return events;
      case 'brand':
        return events.filter(event => event.hostType === 'talent');
      case 'talent':
        return events.filter(event => event.hostType === 'brand');
      default:
        return [];
    }
  };

  useEffect(() => {
    const today = startOfToday();
    let result = getRoleFilteredEvents();
    
    // Apply tab filter
    if (activeTab === 'upcoming') {
      result = result.filter(event => isAfter(parseISO(event.date), today));
    } else if (activeTab === 'past') {
      result = result.filter(event => isBefore(parseISO(event.date), today));
    } else if (activeTab === 'my-events') {
      result = result.filter(
        event => 
          (event.hostType === 'brand' && user?.role === 'brand' && event.hostId === user.id) ||
          (event.hostType === 'talent' && user?.role === 'talent' && event.hostId === user.id)
      );
    }
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        event =>
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower) ||
          event.location.toLowerCase().includes(searchLower) ||
          event.hostName.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply event type filter
    if (eventType !== 'all') {
      result = result.filter(event => event.eventType === eventType);
    }
    
    // Apply date range filter
    if (startDate || endDate) {
      result = result.filter(event => {
        const eventDate = parseISO(event.date);
        if (startDate && endDate) {
          return isWithinInterval(eventDate, {
            start: startOfDay(startDate),
            end: endOfDay(endDate)
          });
        } else if (startDate) {
          return isAfter(eventDate, startOfDay(startDate)) || 
                 eventDate.getTime() === startOfDay(startDate).getTime();
        } else if (endDate) {
          return isBefore(eventDate, endOfDay(endDate)) || 
                 eventDate.getTime() === endOfDay(endDate).getTime();
        }
        return true;
      });
    }
    
    // Apply sorting
    if (sortBy === 'popular') {
      result.sort((a, b) => 
        (b.applications.length + b.rsvps.length) - (a.applications.length + a.rsvps.length)
      );
    } else {
      result.sort((a, b) => b.id.localeCompare(a.id)); // Most recent first
    }
    
    setFilteredEvents(result);
  }, [activeTab, search, eventType, startDate, endDate, sortBy, user]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">
            {user?.role === 'admin' 
              ? 'Manage and oversee all platform events'
              : user?.role === 'brand'
              ? 'Discover talent-hosted events and opportunities'
              : 'Explore brand events and partnership opportunities'}
          </p>
        </div>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as 'upcoming' | 'past' | 'my-events')}>
        <div className="flex flex-col items-center gap-4 mb-6">
          <TabsList className="w-full justify-center">
            <TabsTrigger value="upcoming" className="flex-1">Upcoming</TabsTrigger>
            <TabsTrigger value="past" className="flex-1">Past</TabsTrigger>
            {user?.role !== 'admin' && (
              <TabsTrigger value="my-events" className="flex-1">My Events</TabsTrigger>
            )}
          </TabsList>

          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="search"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-[300px]"
              />
              
              <div className="flex gap-4 w-full sm:w-auto">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full sm:w-[200px] justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "MMM d, yyyy") : <span>Start Date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full sm:w-[200px] justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "MMM d, yyyy") : <span>End Date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={eventType} onValueChange={(value) => setEventType(value as EventType | 'all')}>
                <SelectTrigger className="w-full sm:w-[300px]">
                  <SelectValue placeholder="All Event Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Event Types</SelectItem>
                  <SelectItem value="Product Launch">Product Launch</SelectItem>
                  <SelectItem value="Activation">Activation</SelectItem>
                  <SelectItem value="Party">Party</SelectItem>
                  <SelectItem value="Concert">Concert</SelectItem>
                  <SelectItem value="Podcast">Podcast</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'recent' | 'popular')}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recently Added</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(startDate || endDate) && (
            <div className="w-full flex justify-end">
              <Button 
                variant="ghost"
                onClick={() => {
                  setStartDate(undefined);
                  setEndDate(undefined);
                }}
              >
                Clear Dates
              </Button>
            </div>
          )}
        </div>
        
        <TabsContent value="upcoming">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))}
          </div>
          
          {filteredEvents.length === 0 && (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium">No upcoming events found</h3>
              <p className="text-muted-foreground">
                Check back later or adjust your filters.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))}
          </div>
          
          {filteredEvents.length === 0 && (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium">No past events found</h3>
              <p className="text-muted-foreground">
                Adjust your filters to see more events.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="my-events">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))}
          </div>
          
          {filteredEvents.length === 0 && (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium">You haven't created any events yet</h3>
              <p className="text-muted-foreground">
                Create your first event to start connecting with {user?.role === 'brand' ? 'talent' : 'brands'}.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsPage;