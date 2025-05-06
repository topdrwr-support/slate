import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { events, talent, brands } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { format, parseISO } from 'date-fns';
import { BellIcon, StarIcon, SearchIcon, CheckIcon, EyeIcon, XIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EventCard from '@/components/common/EventCard';
import ProfileCard from '@/components/common/ProfileCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'brand':
        return <BrandDashboard />;
      case 'talent':
        return <TalentDashboard />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      {renderDashboard()}
    </div>
  );
};

const TalentDashboard: React.FC = () => {
  const notifications = [
    {
      id: '1',
      type: 'contact',
      brandName: 'Nike',
      brandImage: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
      message: 'wants to discuss a potential partnership',
      date: '2025-03-15T10:00:00Z'
    },
    {
      id: '2',
      type: 'rsvp',
      brandName: 'Louis Vuitton',
      brandImage: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
      message: 'invited you to Paris Fashion Week 2025',
      date: '2025-03-14T15:30:00Z'
    }
  ];

  const recentBrands = brands.slice(0, 3);

  return (
    <div className="space-y-6">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <Button variant="outline" size="sm">
            <BellIcon className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        </div>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id}>
              <CardContent className="flex items-center gap-4 p-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={notification.brandImage} alt={notification.brandName} />
                  <AvatarFallback>{notification.brandName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <p>
                    <span className="font-medium">{notification.brandName}</span>
                    {' '}{notification.message}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(parseISO(notification.date), 'MMM d, yyyy')}
                  </p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Recently Added Brands</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentBrands.map((brand) => (
            <ProfileCard
              key={brand.id}
              profile={brand}
              type="brand"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

const BrandDashboard: React.FC = () => {
  const notifications = [
    {
      id: '1',
      type: 'accept',
      talentName: 'French Montana',
      talentImage: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
      message: 'accepted your partnership request',
      date: '2025-03-15T10:00:00Z'
    },
    {
      id: '2',
      type: 'rsvp',
      talentName: 'Pharrell Williams',
      talentImage: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg',
      message: 'confirmed attendance to your event',
      date: '2025-03-14T15:30:00Z'
    }
  ];

  const recentTalent = talent.slice(0, 3);
  const watchlistEvents = events.slice(0, 3);

  return (
    <div className="space-y-6">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <Button variant="outline" size="sm">
            <BellIcon className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        </div>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id}>
              <CardContent className="flex items-center gap-4 p-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={notification.talentImage} alt={notification.talentName} />
                  <AvatarFallback>{notification.talentName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <p>
                    <span className="font-medium">{notification.talentName}</span>
                    {' '}{notification.message}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(parseISO(notification.date), 'MMM d, yyyy')}
                  </p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Recently Added Talent</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentTalent.map((person) => (
            <ProfileCard
              key={person.id}
              profile={person}
              type="talent"
            />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Event Watchlist</h2>
          <Button variant="outline" size="sm">
            <StarIcon className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {watchlistEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              showActions={true}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const [featuredTab, setFeaturedTab] = useState('talent');
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredTalent, setFeaturedTalent] = useState(talent.slice(0, 3));
  const [featuredBrands, setFeaturedBrands] = useState(brands.slice(0, 3));
  const [featuredEvents, setFeaturedEvents] = useState(events.slice(0, 3));
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [denyDialogOpen, setDenyDialogOpen] = useState(false);
  const [denyMessage, setDenyMessage] = useState('');

  const userRequests = [
    {
      id: '1',
      brandName: 'Nike Sports',
      logo: 'https://images.pexels.com/photos/1432675/pexels-photo-1432675.jpeg',
      dateApplied: '2025-03-15',
      category: 'Sports & Athletics',
      description: 'Global sports brand seeking to connect with athletes and influencers.',
    },
    {
      id: '2',
      brandName: 'Luxury Fashion Co',
      logo: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg',
      dateApplied: '2025-03-14',
      category: 'Fashion & Apparel',
      description: 'Premium fashion house looking to collaborate with high-end talent.',
    },
    {
      id: '3',
      brandName: 'Tech Innovations',
      logo: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
      dateApplied: '2025-03-13',
      category: 'Technology',
      description: 'Leading tech company seeking partnerships with digital creators.',
    },
  ];

  const eventRequests = [
    {
      id: '1',
      title: 'Summer Fashion Showcase',
      image: 'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg',
      date: '2025-06-15',
      hostName: 'Fashion Forward',
      description: 'An exclusive runway show featuring upcoming summer collections from emerging designers.',
      location: 'New York City',
      category: 'Fashion',
    },
    {
      id: '2',
      title: 'Tech Innovation Summit',
      image: 'https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg',
      date: '2025-07-20',
      hostName: 'Tech Ventures',
      description: 'A gathering of industry leaders showcasing the latest in technology and digital innovation.',
      location: 'San Francisco',
      category: 'Technology',
    },
    {
      id: '3',
      title: 'Athletic Excellence Awards',
      image: 'https://images.pexels.com/photos/163444/pexels-photo-163444.jpeg',
      date: '2025-08-10',
      hostName: 'Sports Elite',
      description: 'Annual awards ceremony celebrating outstanding achievements in sports.',
      location: 'Los Angeles',
      category: 'Sports',
    },
  ];

  const filteredItems = () => {
    const term = searchTerm.toLowerCase();
    switch (featuredTab) {
      case 'talent':
        return talent.filter(t => 
          t.name.toLowerCase().includes(term) || 
          t.category.toLowerCase().includes(term)
        );
      case 'brands':
        return brands.filter(b => 
          b.name.toLowerCase().includes(term) || 
          b.category.toLowerCase().includes(term)
        );
      case 'events':
        return events.filter(e => 
          e.title.toLowerCase().includes(term) || 
          e.hostName.toLowerCase().includes(term)
        );
      default:
        return [];
    }
  };

  const toggleFeatured = (id: string) => {
    switch (featuredTab) {
      case 'talent':
        setFeaturedTalent(current => 
          current.find(t => t.id === id)
            ? current.filter(t => t.id !== id)
            : [...current, talent.find(t => t.id === id)!]
        );
        break;
      case 'brands':
        setFeaturedBrands(current =>
          current.find(b => b.id === id)
            ? current.filter(b => b.id !== id)
            : [...current, brands.find(b => b.id === id)!]
        );
        break;
      case 'events':
        setFeaturedEvents(current =>
          current.find(e => e.id === id)
            ? current.filter(e => e.id !== id)
            : [...current, events.find(e => e.id === id)!]
        );
        break;
    }
  };

  const isItemFeatured = (id: string) => {
    switch (featuredTab) {
      case 'talent':
        return featuredTalent.some(t => t.id === id);
      case 'brands':
        return featuredBrands.some(b => b.id === id);
      case 'events':
        return featuredEvents.some(e => e.id === id);
      default:
        return false;
    }
  };

  const handleDenyEvent = () => {
    console.log('Event denied:', selectedEvent?.title);
    console.log('Denial message:', denyMessage);
    setDenyMessage('');
    setDenyDialogOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{events.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Brands</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{brands.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Talent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{talent.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Connections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">124</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Featured Content Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={featuredTab} onValueChange={setFeaturedTab}>
            <TabsList className="w-full">
              <TabsTrigger value="talent" className="flex-1">Talent</TabsTrigger>
              <TabsTrigger value="brands" className="flex-1">Brands</TabsTrigger>
              <TabsTrigger value="events" className="flex-1">Events</TabsTrigger>
            </TabsList>

            <div className="mt-4">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={`Search ${featuredTab}...`}
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <ScrollArea className="h-[300px] mt-4">
              <div className="space-y-2">
                {filteredItems().map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={item.image} />
                        <AvatarFallback>
                          {('title' in item ? item.title : item.name).charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {'title' in item ? item.title : item.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {'hostName' in item ? item.hostName : item.category}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={isItemFeatured(item.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFeatured(item.id)}
                    >
                      {isItemFeatured(item.id) ? (
                        <>
                          <CheckIcon className="h-4 w-4 mr-1" />
                          Featured
                        </>
                      ) : (
                        "Feature"
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Tabs>
        </CardContent>
      </Card>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">User Requests</h2>
        <ScrollArea className="w-full">
          <div className="flex space-x-4 pb-4">
            {userRequests.map((request) => (
              <Card key={request.id} className="w-[300px] flex-none">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={request.logo} alt={request.brandName} />
                      <AvatarFallback>{request.brandName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{request.brandName}</h3>
                      <p className="text-sm text-muted-foreground">{request.category}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{request.description}</p>
                  <div className="text-xs text-muted-foreground">
                    Applied: {format(parseISO(request.dateApplied), 'MMM d, yyyy')}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="w-full" variant="outline">
                      <CheckIcon className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" className="w-full" variant="outline">
                      <XIcon className="h-4 w-4 mr-1" />
                      Deny
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Event Requests</h2>
        <ScrollArea className="w-full">
          <div className="flex space-x-4 pb-4">
            {eventRequests.map((event) => (
              <Card key={event.id} className="w-[300px] flex-none">
                <div className="h-40 relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute bottom-2 right-2"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <EyeIcon className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {format(parseISO(event.date), 'MMM d, yyyy')} • {event.location}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Hosted by {event.hostName}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <Dialog open={!!selectedEvent && !denyDialogOpen} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              Review event details and approve or deny the listing
            </DialogDescription>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="space-y-4">
              <div className="aspect-video overflow-hidden rounded-lg">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <h4 className="font-semibold mb-1">Event Details</h4>
                <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-muted-foreground">
                    {format(parseISO(selectedEvent.date), 'MMM d, yyyy')}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">{selectedEvent.location}</p>
                </div>
                <div>
                  <p className="font-medium">Host</p>
                  <p className="text-muted-foreground">{selectedEvent.hostName}</p>
                </div>
                <div>
                  <p className="font-medium">Category</p>
                  <p className="text-muted-foreground">{selectedEvent.category}</p>
                </div>
              </div>
              
              <div className="flex gap-2 mt-6">
                <Button className="w-full">
                  <CheckIcon className="h-4 w-4 mr-1" />
                  Approve Event
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setDenyDialogOpen(true)}
                >
                  <XIcon className="h-4 w-4 mr-1" />
                  Deny Event
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={denyDialogOpen} onOpenChange={setDenyDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Deny Event Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for denying this event request. This message will be sent to the event host.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="deny-message">Message to Host</Label>
              <Textarea
                id="deny-message"
                placeholder="Enter your message explaining why the event was denied..."
                value={denyMessage}
                onChange={(e) => setDenyMessage(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setDenyDialogOpen(false);
                setDenyMessage('');
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDenyEvent}
              disabled={!denyMessage.trim()}
            >
              Send & Deny
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;