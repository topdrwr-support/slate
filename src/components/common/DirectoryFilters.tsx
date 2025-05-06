import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SearchIcon, LayoutGridIcon, LayoutListIcon } from 'lucide-react';

export type DirectoryFilterValues = {
  search: string;
  category?: string;
  sortBy?: 'recent' | 'popular';
  view?: 'grid' | 'list';
};

interface DirectoryFiltersProps {
  type: 'brand' | 'talent';
  filters: DirectoryFilterValues;
  onFilterChange: (filters: DirectoryFilterValues) => void;
  onReset: () => void;
}

// Categories for filtering
const brandCategories = [
  'All Categories',
  'Technology',
  'Fashion',
  'Sports',
  'Entertainment',
  'Food & Beverage',
  'Automotive',
  'Health & Wellness',
  'Finance',
  'Retail',
];

const talentCategories = [
  'All Categories',
  'Acting',
  'Music',
  'Sports',
  'Fashion',
  'Influencer',
  'Art',
  'Culinary',
  'Business',
  'Technology',
];

const DirectoryFilters: React.FC<DirectoryFiltersProps> = ({
  type,
  filters,
  onFilterChange,
  onReset,
}) => {
  const categories = type === 'brand' ? brandCategories : talentCategories;

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  // Handle category selection changes
  const handleCategoryChange = (value: string) => {
    onFilterChange({
      ...filters,
      category: value === 'All Categories' ? undefined : value,
    });
  };

  // Handle sort by changes
  const handleSortChange = (value: string) => {
    onFilterChange({
      ...filters,
      sortBy: value as 'recent' | 'popular',
    });
  };

  // Handle view changes
  const handleViewChange = (view: 'grid' | 'list') => {
    onFilterChange({
      ...filters,
      view,
    });
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="relative">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={`Search ${type === 'brand' ? 'brands' : 'talent'}...`}
          className="pl-8"
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        <Select
          value={filters.category || 'All Categories'}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select
          value={filters.sortBy || 'recent'}
          onValueChange={handleSortChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Recently Added</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={filters.view === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => handleViewChange('grid')}
          >
            <LayoutGridIcon className="h-4 w-4" />
          </Button>
          <Button
            variant={filters.view === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => handleViewChange('list')}
          >
            <LayoutListIcon className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="ghost" onClick={onReset}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default DirectoryFilters;