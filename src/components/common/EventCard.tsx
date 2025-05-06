import React, { useState, useEffect } from 'react';
import { Event } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useAuth } from '@/contexts/AuthContext';

interface EventCardProps {
  event: Event;
  showActions?: boolean;
  onEdit?: (eventId: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ 
  event,
  onEdit
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);
  const [hasSeenTooltip, setHasSeenTooltip] = useState(() => {
    return localStorage.getItem('hasSeenFavoriteTooltip') === 'true';
  });

  useEffect(() => {
    if (user?.favoriteEvents) {
      setIsFavorited(user.favoriteEvents.includes(event.id));
    }
  }, [user, event.id]);

  const handleClick = () => {
    navigate(`/events/${event.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    
    // Save tooltip state
    if (!hasSeenTooltip) {
      localStorage.setItem('hasSeenFavoriteTooltip', 'true');
      setHasSeenTooltip(true);
    }

    // Show success toast
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: isFavorited 
        ? "Event removed from your favorites list"
        : "Event added to your favorites list. View it in My Events.",
    });
  };

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer"
      onClick={handleClick}
    >
      <div className="aspect-square relative overflow-hidden">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <div className="text-muted-foreground">No Image</div>
          </div>
        )}
        <Badge 
          className="absolute top-2 right-2" 
          variant="secondary"
        >
          {format(parseISO(event.date), 'M/d/yy')}
        </Badge>
        
        {!hasSeenTooltip ? (
          <TooltipProvider>
            <Tooltip defaultOpen>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={`absolute bottom-2 left-2 rounded-full ${
                    isFavorited ? 'bg-primary text-primary-foreground' : 'bg-background/80'
                  }`}
                  onClick={handleFavoriteClick}
                >
                  <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Click to save this event to your favorites!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button
            variant="outline"
            size="icon"
            className={`absolute bottom-2 left-2 rounded-full ${
              isFavorited ? 'bg-primary text-primary-foreground' : 'bg-background/80'
            }`}
            onClick={handleFavoriteClick}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
          </Button>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium mb-2 line-clamp-1">{event.title}</h3>
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={event.hostImage} alt={event.hostName} />
            <AvatarFallback>{event.hostName[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground line-clamp-1">
            {event.hostName}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{event.location}</p>
      </CardContent>
    </Card>
  );
};

export default EventCard;