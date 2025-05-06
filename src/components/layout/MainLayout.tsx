import React from 'react';
import { Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '@/components/ui/theme-provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserRole } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import AdminNavigation from './navigation/AdminNavigation';
import BrandTalentNavigation from './navigation/BrandTalentNavigation';

const MainLayout: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  // If not authenticated, redirect to home
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If authenticated and on home page, redirect to dashboard
  if (isAuthenticated && location.pathname === '/') {
    return <Navigate to="/dashboard" replace />;
  }

  // Render appropriate navigation based on user role
  const renderNavigation = () => {
    if (!user) return null;
    
    switch (user.role as UserRole) {
      case 'admin':
        return <AdminNavigation />;
      case 'brand':
      case 'talent':
        return <BrandTalentNavigation userRole={user.role as 'brand' | 'talent'} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="font-bold text-lg tracking-tight" onClick={() => navigate('/dashboard')}>
              SLATE
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  {theme === 'dark' ? (
                    <MoonIcon className="h-5 w-5" />
                  ) : (
                    <SunIcon className="h-5 w-5" />
                  )}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="ghost" 
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main content with navigation */}
      <div className="flex flex-1 relative">
        {/* Side navigation - Desktop */}
        <div className="hidden md:block w-64 border-r p-4 h-[calc(100vh-3.5rem)] sticky top-14 shrink-0">
          {renderNavigation()}
        </div>
        
        {/* Main content */}
        <main className="flex-1 container mx-auto px-4 py-6 pb-20 md:pb-6">
          <Outlet />
        </main>
        
        {/* Mobile navigation - Fixed at bottom */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-40 pb-safe">
          {renderNavigation()}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;