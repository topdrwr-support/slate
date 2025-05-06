import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { events } from '@/lib/mock-data';
import { format, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const EventDetailsPage: React.FC = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [showAttendDialog, setShowAttendDialog] = useState(false);
  const [showCollaborateDialog, setShowCollaborateDialog] = useState(false);
  
  const event = events.find(e => e.id === eventId);

  const handleAttendRequest = () => {
    console.log('Attend request submitted');
    setShowAttendDialog(false);
  };

  const handleCollaborateRequest = () => {
    console.log('Collaborate request submitted');
    setShowCollaborateDialog(false);
  };
  
  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate('/events')} className="mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Button>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Event Not Found</h1>
          <p className="text-muted-foreground">The event you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => navigate('/events')} className="mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Events
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square relative overflow-hidden rounded-lg">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover object-center"
          />
          <Badge 
            className="absolute top-4 right-4" 
            variant="secondary"
          >
            {format(parseISO(event.date), 'M/d/yy')}
          </Badge>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={event.hostImage} alt={event.hostName} />
                  <AvatarFallback>{event.hostName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{event.hostName}</p>
                  <p className="text-sm text-muted-foreground">Host</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-5 w-5" />
              <span>{format(parseISO(event.date), 'EEEE, MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span>{event.location}</span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">About this Event</h2>
            <p className="text-muted-foreground">{event.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Event Type</h2>
            <Badge variant="outline">{event.eventType}</Badge>
          </div>

          <div className="space-y-3">
            <Button 
              className="w-full" 
              size="lg"
              onClick={() => setShowAttendDialog(true)}
            >
              Request to Attend
            </Button>
            <Button 
              className="w-full" 
              variant="outline" 
              size="lg"
              onClick={() => setShowCollaborateDialog(true)}
            >
              Request to Collaborate
            </Button>
          </div>
        </div>
      </div>

      {/* Attend Request Dialog */}
      <AlertDialog open={showAttendDialog} onOpenChange={setShowAttendDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Attendance Request</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to confirm your request to attend {event.title}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAttendRequest}>
              Yes, submit request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Collaborate Request Dialog */}
      <AlertDialog open={showCollaborateDialog} onOpenChange={setShowCollaborateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Collaboration Request</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to confirm your request to collaborate on {event.title}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleCollaborateRequest}>
              Yes, submit request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EventDetailsPage;