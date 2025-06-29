import React, { useState } from 'react';
import { Bell, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [notifications] = useState([
    { id: 1, message: 'New appointment scheduled', time: '2 min ago', unread: true },
    { id: 2, message: 'Patient Rajesh Kumar arrived', time: '5 min ago', unread: true },
    { id: 3, message: 'Lab results available', time: '10 min ago', unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-white shadow-sm border-b border-[#D0D0D0] px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-[#4A4A4A] hover:text-[#143D6F] hover:bg-[#D6EAF8] rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo for mobile - Increased size */}
          <div className="lg:hidden flex items-center">
            <img 
              src="/abhicure_logo copy.jpg" 
              alt="AbhiCure Logo" 
              className="h-14 w-auto object-contain"
            />
          </div>

          {/* Desktop logo - Significantly increased size */}
          <div className="hidden lg:flex items-center">
            <img 
              src="/abhicure_logo copy.jpg" 
              alt="AbhiCure Logo" 
              className="h-20 w-auto object-contain"
            />
          </div>
        </div>

        {/* Right section - Only Notifications */}
        <div className="flex items-center">
          {/* Notifications */}
          <div className="relative">
            <button className="relative p-2 text-[#4A4A4A] hover:text-[#143D6F] hover:bg-[#D6EAF8] rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#E53935] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;