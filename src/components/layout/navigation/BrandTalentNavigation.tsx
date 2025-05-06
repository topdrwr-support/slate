import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboardIcon, UsersIcon, CalendarIcon, UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface BrandTalentNavigationProps {
  userRole: 'brand' | 'talent';
}

const BrandTalentNavigation: React.FC<BrandTalentNavigationProps> = ({ userRole }) => {
  const location = useLocation();
  
  // Navigation items for brand/talent
  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboardIcon className="h-5 w-5" />,
    },
    {
      name: 'Directory',
      path: '/directory',
      icon: <UsersIcon className="h-5 w-5" />,
    },
    {
      name: 'Events',
      path: '/events',
      icon: <CalendarIcon className="h-5 w-5" />,
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: <UserIcon className="h-5 w-5" />,
    },
  ];

  // Desktop navigation
  const desktopNav = (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            )
          }
        >
          {item.icon}
          <span>{item.name}</span>
        </NavLink>
      ))}
    </nav>
  );

  // Mobile navigation
  const mobileNav = (
    <div className="flex justify-around py-2">
      {navItems.map((item) => (
        <Button
          key={item.path}
          variant="ghost"
          size="sm"
          asChild
          className={cn(
            'flex flex-col items-center h-auto py-1',
            location.pathname === item.path && 'bg-muted'
          )}
        >
          <NavLink to={item.path}>
            {item.icon}
            <span className="text-xs mt-1">{item.name}</span>
          </NavLink>
        </Button>
      ))}
    </div>
  );

  return (
    <>
      <div className="hidden md:block">
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-1">{userRole === 'brand' ? 'Brand Portal' : 'Talent Portal'}</h3>
          <p className="text-xs text-muted-foreground">
            {userRole === 'brand' 
              ? 'Manage your brand presence'
              : 'Manage your talent profile'}
          </p>
        </div>
        {desktopNav}
      </div>
      <div className="md:hidden">{mobileNav}</div>
    </>
  );
};

export default BrandTalentNavigation;