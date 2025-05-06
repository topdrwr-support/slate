import React, { useState } from 'react';
import { Brand, Talent } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ProfileCardProps {
  profile: Brand | Talent;
  type: 'brand' | 'talent';
  view?: 'grid' | 'list';
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, type, view = 'grid' }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    navigate(`/directory/${type}/${profile.id}`);
  };

  const handleImageError = () => {
    console.error(`Failed to load image for ${profile.name}`);
    setImageError(true);
  };

  if (view === 'grid') {
    return (
      <Card 
        className="overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer"
        onClick={handleClick}
      >
        <div className="aspect-square relative overflow-hidden">
          {profile.image && !imageError ? (
            <img
              src={profile.image}
              alt={profile.name}
              className="w-full h-full object-cover object-center"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </div>
        <CardHeader className="p-3">
          <CardTitle className="text-base truncate">{profile.name}</CardTitle>
          <p className="text-sm text-muted-foreground truncate">{profile.category}</p>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-md flex cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-48 h-48 relative overflow-hidden">
        {profile.image && !imageError ? (
          <img
            src={profile.image}
            alt={profile.name}
            className="w-full h-full object-cover object-center"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <User className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="flex flex-col flex-grow p-4">
        <CardTitle className="text-xl mb-2">{profile.name}</CardTitle>
        <div className="text-sm text-muted-foreground mb-4">
          {profile.category}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">{profile.description}</p>
      </div>
    </Card>
  );
};

export default ProfileCard;