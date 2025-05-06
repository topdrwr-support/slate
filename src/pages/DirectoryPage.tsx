import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { talent, brands, getBrandProfileById } from '@/lib/mock-data';
import { Talent, Brand, UserRole } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import ProfileCard from '@/components/common/ProfileCard';
import DirectoryFilters, { DirectoryFilterValues } from '@/components/common/DirectoryFilters';
import { PlusIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  userType: z.enum(['brand', 'talent']),
  brandName: z.string().optional(),
  contactName: z.string().min(2, 'Name must be at least 2 characters'),
  contactEmail: z.string().email('Invalid email address'),
  contactTitle: z.string().optional(),
  contactRelation: z.string().optional(),
  logo: z.string().url().optional(),
  headshot: z.string().url().optional(),
  category: z.string().min(1, 'Please select a category'),
});

const DirectoryPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'brands' | 'talent'>('talent');
  const [filteredTalent, setFilteredTalent] = useState<Talent[]>(talent);
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>(brands);
  const [filters, setFilters] = useState<DirectoryFilterValues>({
    search: '',
    view: 'grid',
  });
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userType: 'brand',
      brandName: '',
      contactName: '',
      contactEmail: '',
      contactTitle: '',
      contactRelation: '',
      logo: '',
      headshot: '',
      category: '',
    },
  });

  useEffect(() => {
    let result = [...talent];
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(searchLower) ||
          t.description.toLowerCase().includes(searchLower) ||
          t.category.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.category && filters.category !== 'All Categories') {
      result = result.filter((t) => t.category === filters.category);
    }
    
    if (filters.sortBy === 'popular') {
      result.sort((a, b) => (b.brandPartners?.length || 0) - (a.brandPartners?.length || 0));
    } else {
      result.sort((a, b) => b.id.localeCompare(a.id));
    }
    
    setFilteredTalent(result);
  }, [filters]);
  
  useEffect(() => {
    let result = [...brands];
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(searchLower) ||
          b.description.toLowerCase().includes(searchLower) ||
          b.category.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.category && filters.category !== 'All Categories') {
      result = result.filter((b) => b.category === filters.category);
    }
    
    if (filters.sortBy === 'popular') {
      result.sort((a, b) => (b.talentPartners?.length || 0) - (a.talentPartners?.length || 0));
    } else {
      result.sort((a, b) => b.id.localeCompare(a.id));
    }
    
    setFilteredBrands(result);
  }, [filters]);
  
  const handleFilterChange = (newFilters: DirectoryFilterValues) => {
    setFilters(newFilters);
  };
  
  const resetFilters = () => {
    setFilters({ search: '', view: filters.view });
  };
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('Form submitted:', data);
    setIsAddUserOpen(false);
    setCurrentStep(1);
    form.reset();
  };

  const renderCreateUserStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant={form.watch('userType') === 'brand' ? 'default' : 'outline'}
                className="w-full h-24 flex flex-col items-center justify-center"
                onClick={() => form.setValue('userType', 'brand')}
              >
                <span className="text-lg font-semibold">Brand</span>
                <span className="text-sm text-muted-foreground">Create a brand account</span>
              </Button>
              <Button
                type="button"
                variant={form.watch('userType') === 'talent' ? 'default' : 'outline'}
                className="w-full h-24 flex flex-col items-center justify-center"
                onClick={() => form.setValue('userType', 'talent')}
              >
                <span className="text-lg font-semibold">Talent</span>
                <span className="text-sm text-muted-foreground">Create a talent account</span>
              </Button>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setCurrentStep(2)}>Next</Button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {form.watch('userType') === 'brand' ? (
                <>
                  <FormField
                    control={form.control}
                    name="brandName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email (Work Email)</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Job Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand Logo URL</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand Category</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : (
                <>
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Talent Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactRelation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Relation to Talent</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="headshot"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Talent Headshot URL</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Talent Category</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                  Back
                </Button>
                <Button type="submit">Create User</Button>
              </div>
            </form>
          </Form>
        );
      
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Directory</h1>
          <p className="text-muted-foreground">
            {user?.role === 'admin' 
              ? 'Manage brands and talent in the platform.'
              : 'Discover and connect with talent.'}
          </p>
        </div>
        
        {user?.role === 'admin' && (
          <Button onClick={() => setIsAddUserOpen(true)}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Add New
          </Button>
        )}
      </div>
      
      <div className="space-y-6">
        {user?.role === 'admin' ? (
          <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as 'brands' | 'talent')}>
            <TabsList className="w-full">
              <TabsTrigger value="talent" className="flex-1">Talent</TabsTrigger>
              <TabsTrigger value="brands" className="flex-1">Brands</TabsTrigger>
            </TabsList>
            
            <TabsContent value="talent">
              <DirectoryFilters
                type="talent"
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={resetFilters}
              />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filteredTalent.map((person) => (
                  <ProfileCard
                    key={person.id}
                    profile={person}
                    type="talent"
                    view={filters.view}
                  />
                ))}
              </div>
              
              {filteredTalent.length === 0 && (
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium">No talent found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="brands">
              <DirectoryFilters
                type="brand"
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={resetFilters}
              />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filteredBrands.map((brand) => (
                  <ProfileCard
                    key={brand.id}
                    profile={brand}
                    type="brand"
                    view={filters.view}
                  />
                ))}
              </div>
              
              {filteredBrands.length === 0 && (
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium">No brands found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <>
            <DirectoryFilters
              type="talent"
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={resetFilters}
            />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredTalent.map((person) => (
                <ProfileCard
                  key={person.id}
                  profile={person}
                  type="talent"
                  view={filters.view}
                />
              ))}
            </div>
            
            {filteredTalent.length === 0 && (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">No talent found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to find what you're looking for.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new brand or talent profile.
            </DialogDescription>
          </DialogHeader>
          {renderCreateUserStep()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DirectoryPage;