import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Calendar, Users, Clock, X, Camera } from 'lucide-react';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();
  
  const userName = 'Dr. Sarah Johnson';
  const userEmail = 'sarah.johnson@abhicure.com';
  const userSpecialization = 'Cardiology';
  const userProfilePhoto = 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop';

  const doctorMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/doctor/dashboard', description: 'Overview & patient queue' },
    { icon: Calendar, label: 'Calendar', path: '/doctor/schedule', description: 'Appointments & schedule' },
    { icon: Users, label: 'Patient History', path: '/doctor/patients', description: 'Patient records' },
    { icon: Clock, label: 'Availability', path: '/doctor/availability', description: 'Manage schedule' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg border-r border-[#D0D0D0] h-full flex flex-col">
      {/* Profile Section - Top Left (No Logo, No "Doctor Portal" text) */}
      <div className="p-6 border-b border-[#D0D0D0] bg-[#EDF9FC]">
        <div className="flex items-center justify-between mb-4">
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 text-[#AFAFAF] hover:text-[#4A4A4A] transition-colors ml-auto"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {/* Doctor Profile Section - Clickable to navigate to profile page */}
        <NavLink 
          to="/doctor/profile"
          onClick={onClose}
          className="block bg-white p-4 rounded-lg border border-[#D0D0D0] shadow-sm hover:shadow-md transition-all duration-200 hover:bg-[#D6EAF8]"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="relative">
              <img
                src={userProfilePhoto}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
              />
              <div className="absolute bottom-0 right-0 bg-[#143D6F] text-white p-1 rounded-full shadow-lg">
                <Camera className="w-2.5 h-2.5" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#4A4A4A] truncate">{userName}</p>
              <p className="text-xs text-[#AFAFAF] truncate">{userSpecialization}</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-[#D6EAF8] hover:bg-[#143D6F] hover:text-white text-[#143D6F] px-3 py-2 rounded-lg text-sm font-medium transition-colors">
              View Profile
            </div>
          </div>
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 px-4">
        <div className="space-y-2">
          {doctorMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`group flex flex-col px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-[#D6EAF8] text-[#143D6F] shadow-sm border-l-4 border-[#143D6F]'
                    : 'text-[#4A4A4A] hover:bg-[#EDF9FC] hover:text-[#143D6F]'
                }`}
              >
                <div className="flex items-center">
                  <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-[#143D6F]' : 'text-[#AFAFAF] group-hover:text-[#143D6F]'}`} />
                  <span>{item.label}</span>
                </div>
                <span className={`text-xs ml-8 mt-1 ${isActive ? 'text-[#143D6F]' : 'text-[#AFAFAF]'}`}>
                  {item.description}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* User info at bottom */}
      <div className="p-4 border-t border-[#D0D0D0] bg-[#EDF9FC]">
        <div className="text-center">
          <p className="text-xs text-[#AFAFAF]">{userEmail}</p>
          <p className="text-xs text-[#AFAFAF]">Online • Available</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;