
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Bell, Menu, User, LogOut, ShoppingBag, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NotificationsDropdown } from "@/components/NotificationsDropdown";

interface DashboardHeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const DashboardHeader = ({ mobileMenuOpen, setMobileMenuOpen }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  const handleMobileHeaderClick = () => {
    if (window.location.pathname === '/') {
      navigate('/auth/login');
    } else {
      window.location.reload();
    }
  };

  return (
    <header className="backdrop-blur-md bg-background/90 shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <button 
            onClick={handleMobileHeaderClick}
            className="flex items-center space-x-2 md:space-x-3 md:pointer-events-none"
          >
            <div className="relative">
              <ShoppingBag className="h-8 w-8 md:h-10 md:w-10 text-primary" />
              <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
            </div>
            <div className="block">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FUTO Marketplace
              </h1>
              <p className="text-xs text-muted-foreground hidden md:block">Campus Commerce Hub</p>
            </div>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle />
            <NotificationsDropdown />
            <Button variant="ghost" size="sm" className="hover:bg-accent" onClick={() => navigate('/settings')}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-accent">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-destructive/10 text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <NotificationsDropdown />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            
            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
              <div className="absolute right-4 top-16 bg-popover rounded-lg shadow-lg border border-border py-2 w-48 z-50">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start px-4 py-2 hover:bg-accent"
                  onClick={() => navigate('/settings')}
                >
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start px-4 py-2 hover:bg-accent">
                  <User className="h-4 w-4 mr-3" />
                  Profile
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start px-4 py-2 hover:bg-destructive/10 text-destructive">
                  <LogOut className="h-4 w-4 mr-3" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
