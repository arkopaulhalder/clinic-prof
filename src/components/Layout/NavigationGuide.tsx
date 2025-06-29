import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { X, ArrowRight, Info } from 'lucide-react';

const NavigationGuide: React.FC = () => {
  const [showGuide, setShowGuide] = useState(false);
  const [hasSeenGuide, setHasSeenGuide] = useState(false);
  const location = useLocation();

  const guides = {
    '/doctor/dashboard': {
      title: 'Welcome to Your Dashboard',
      description: 'Here you can see your daily overview, next patient, and quick actions.',
      tips: [
        'Check your next patient widget for immediate attention',
        'View today\'s appointment statistics',
        'Use quick action buttons for common tasks'
      ]
    },
    '/doctor/schedule': {
      title: 'Manage Your Schedule',
      description: 'View and manage your appointments in daily or weekly view.',
      tips: [
        'Switch between day and week views',
        'Filter appointments by status',
        'Contact patients directly from appointment cards'
      ]
    },
    '/doctor/patients': {
      title: 'Patient History',
      description: 'Access comprehensive patient records and medical history.',
      tips: [
        'Search patients by name, email, or phone',
        'Click on patient cards for detailed medical history',
        'Export patient records when needed'
      ]
    },
    '/doctor/queue': {
      title: 'Patient Queue Management',
      description: 'Manage your waiting patients and appointment flow.',
      tips: [
        'Reorder patients in the queue as needed',
        'Mark patients as attended when consultation is complete',
        'Reschedule or cancel appointments directly'
      ]
    },
    '/doctor/medical-records': {
      title: 'Medical Records & Certifications',
      description: 'Manage patient medical records and your professional certifications.',
      tips: [
        'Add new medical certifications',
        'View and manage patient medical records',
        'Filter records by type and date'
      ]
    },
    '/doctor/availability': {
      title: 'Availability Management',
      description: 'Set your working hours and manage your schedule preferences.',
      tips: [
        'Configure working hours for each day',
        'Set break times and appointment durations',
        'Request leave for specific dates'
      ]
    },
    '/doctor/profile': {
      title: 'Doctor Profile',
      description: 'Manage your professional information and credentials.',
      tips: [
        'Keep your profile information up to date',
        'Add educational qualifications and certifications',
        'Set consultation fees for different types of appointments'
      ]
    }
  };

  useEffect(() => {
    const guideKey = `guide-seen-${location.pathname}`;
    const seen = localStorage.getItem(guideKey);
    
    if (!seen && guides[location.pathname as keyof typeof guides]) {
      setShowGuide(true);
      setHasSeenGuide(false);
    } else {
      setShowGuide(false);
      setHasSeenGuide(true);
    }
  }, [location.pathname]);

  const handleCloseGuide = () => {
    const guideKey = `guide-seen-${location.pathname}`;
    localStorage.setItem(guideKey, 'true');
    setShowGuide(false);
    setHasSeenGuide(true);
  };

  const currentGuide = guides[location.pathname as keyof typeof guides];

  if (!currentGuide) return null;

  return (
    <>
      {/* Guide toggle button for users who have seen the guide */}
      {hasSeenGuide && (
        <button
          onClick={() => setShowGuide(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#143D6F] hover:bg-[#0F2A4F] text-white p-3 rounded-full shadow-lg transition-colors"
          title="Show navigation guide"
        >
          <Info className="w-5 h-5" />
        </button>
      )}

      {/* Navigation guide modal */}
      {showGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#D6EAF8] rounded-full flex items-center justify-center">
                  <Info className="w-4 h-4 text-[#143D6F]" />
                </div>
                <h3 className="text-lg font-bold text-[#4A4A4A]">{currentGuide.title}</h3>
              </div>
              <button
                onClick={handleCloseGuide}
                className="text-[#AFAFAF] hover:text-[#4A4A4A] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-[#4A4A4A] mb-4">{currentGuide.description}</p>

            <div className="space-y-3 mb-6">
              <h4 className="font-semibold text-[#4A4A4A] text-sm">Quick Tips:</h4>
              {currentGuide.tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <ArrowRight className="w-4 h-4 text-[#A8D5BA] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#4A4A4A]">{tip}</span>
                </div>
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleCloseGuide}
                className="flex-1 bg-[#143D6F] hover:bg-[#0F2A4F] text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Got it!
              </button>
              <button
                onClick={() => setShowGuide(false)}
                className="px-4 py-2 text-[#AFAFAF] hover:text-[#4A4A4A] transition-colors"
              >
                Remind me later
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavigationGuide;