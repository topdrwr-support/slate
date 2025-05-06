import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getBrandProfileById, slateProfile } from '@/lib/mock-data';
import { Brand, Talent } from '@/lib/types';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { PlusIcon, MinusIcon, SaveIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Get profile data based on user role
  const getProfileData = () => {
    if (!user) return null;
    
    if (user.role === 'brand') {
      return slateProfile; // Use SLATE profile for brand user
    }
    
    if (user.role === 'talent') {
      return getBrandProfileById(user.id);
    }
    
    // Admin has no profile data
    return {
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
    };
  };
  
  const profileData = getProfileData();
  
  // Form state for editing
  const [formData, setFormData] = useState({
    name: profileData?.name || '',
    location: (profileData as Brand | Talent)?.location || '',
    category: (profileData as Brand | Talent)?.category || '',
    description: (profileData as Brand | Talent)?.description || '',
    pastEvents: (profileData as Brand | Talent)?.pastEvents || [],
    partners: 'brandPartners' in (profileData as any || {}) 
      ? (profileData as Talent).brandPartners 
      : (profileData as Brand)?.talentPartners || [],
    visibleTo: (profileData as Brand | Talent)?.visibleTo || [],
  });
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  // Handle adding a past event
  const handleAddPastEvent = () => {
    setFormData({
      ...formData,
      pastEvents: [...formData.pastEvents, ''],
    });
  };
  
  // Handle removing a past event
  const handleRemovePastEvent = (index: number) => {
    const updatedEvents = [...formData.pastEvents];
    updatedEvents.splice(index, 1);
    setFormData({
      ...formData,
      pastEvents: updatedEvents,
    });
  };
  
  // Handle updating a past event
  const handleUpdatePastEvent = (index: number, value: string) => {
    const updatedEvents = [...formData.pastEvents];
    updatedEvents[index] = value;
    setFormData({
      ...formData,
      pastEvents: updatedEvents,
    });
  };
  
  // Handle adding a partner
  const handleAddPartner = () => {
    setFormData({
      ...formData,
      partners: [...formData.partners, ''],
    });
  };
  
  // Handle removing a partner
  const handleRemovePartner = (index: number) => {
    const updatedPartners = [...formData.partners];
    updatedPartners.splice(index, 1);
    setFormData({
      ...formData,
      partners: updatedPartners,
    });
  };
  
  // Handle updating a partner
  const handleUpdatePartner = (index: number, value: string) => {
    const updatedPartners = [...formData.partners];
    updatedPartners[index] = value;
    setFormData({
      ...formData,
      partners: updatedPartners,
    });
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated profile data:', formData);
    setIsEditing(false);
  };
  
  // Render profile view (non-editing state)
  const renderProfileView = () => {
    if (!profileData) return null;
    
    return (
      <Card>
        <CardHeader className="relative pb-0">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <Avatar className="h-24 w-24 border-2">
              <AvatarImage src={profileData.image} alt={profileData.name} />
              <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl">{profileData.name}</CardTitle>
              
              {user?.role !== 'admin' && (
                <CardDescription className="flex items-center gap-2 mt-1">
                  {(profileData as Brand | Talent).location}
                  {' • '}
                  {(profileData as Brand | Talent).category}
                </CardDescription>
              )}
            </div>
            
            <Button 
              variant="outline" 
              className="absolute top-4 right-4" 
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6 space-y-6">
          {user?.role !== 'admin' && (
            <>
              <div>
                <h3 className="text-lg font-medium mb-2">About</h3>
                <p className="text-muted-foreground">
                  {(profileData as Brand | Talent).description}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Past Events</h3>
                {(profileData as Brand | Talent).pastEvents.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {(profileData as Brand | Talent).pastEvents.map((event, index) => (
                      <Badge key={index} variant="secondary">{event}</Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No past events.</p>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">
                  {user?.role === 'brand' ? 'Talent Partners' : 'Brand Partners'}
                </h3>
                {('talentPartners' in profileData ? profileData.talentPartners : (profileData as Talent).brandPartners).length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {('talentPartners' in profileData ? profileData.talentPartners : (profileData as Talent).brandPartners).map((partner, index) => (
                      <Badge key={index} variant="secondary">{partner}</Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No partners yet.</p>
                )}
              </div>
            </>
          )}
          
          {user?.role === 'admin' && (
            <div>
              <h3 className="text-lg font-medium mb-2">Admin Information</h3>
              <p className="text-muted-foreground">
                Email: {profileData.email}
              </p>
              <p className="text-muted-foreground">
                Role: {profileData.role}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };
  
  // Render profile edit form
  const renderProfileEditForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your profile information.</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            
            {user?.role !== 'admin' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">About</Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Past Events</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddPastEvent}
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Add Event
                    </Button>
                  </div>
                  
                  {formData.pastEvents.map((event, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={event}
                        onChange={(e) => handleUpdatePastEvent(index, e.target.value)}
                        placeholder="Event name"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemovePastEvent(index)}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>
                      {user?.role === 'brand' ? 'Talent Partners' : 'Brand Partners'}
                    </Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddPartner}
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Add Partner
                    </Button>
                  </div>
                  
                  {formData.partners.map((partner, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={partner}
                        onChange={(e) => handleUpdatePartner(index, e.target.value)}
                        placeholder="Partner name"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemovePartner(index)}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              <SaveIcon className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </form>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          View and manage your profile information.
        </p>
      </div>
      
      {isEditing ? renderProfileEditForm() : renderProfileView()}
    </div>
  );
};

export default ProfilePage;