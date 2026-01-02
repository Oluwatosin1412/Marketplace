
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Bell, Menu, User, LogOut, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
      // This would need to be passed as a prop or use context to set activeTab to "overview"
      window.location.reload(); // Temporary solution
    }
  };

  return (
    <header className="backdrop-blur-md bg-white/90 shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <button 
            onClick={handleMobileHeaderClick}
            className="flex items-center space-x-2 md:space-x-3 md:pointer-events-none"
          >
            <div className="relative">
              <ShoppingBag className="h-8 w-8 md:h-10 md:w-10 text-blue-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
            </div>
            <div className="block">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FUTO Marketplace
              </h1>
              <p className="text-xs text-gray-500 hidden md:block">Campus Commerce Hub</p>
            </div>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative hover:bg-blue-50">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-blue-50">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-red-50 text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative"
            >
              <Menu className="h-6 w-6" />
              <Bell className="absolute -top-1 -right-1 h-3 w-3 text-red-500" />
            </Button>
            
            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
              <div className="absolute right-4 top-16 bg-white rounded-lg shadow-lg border border-gray-200 py-2 w-48 z-50">
                <Button variant="ghost" size="sm" className="w-full justify-start px-4 py-2 hover:bg-blue-50">
                  <Bell className="h-4 w-4 mr-3" />
                  Notifications
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start px-4 py-2 hover:bg-blue-50">
                  <User className="h-4 w-4 mr-3" />
                  Profile
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start px-4 py-2 hover:bg-red-50 text-red-600">
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
