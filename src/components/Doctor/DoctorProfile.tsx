import React, { useState } from 'react';
import { User, Camera, Save, Edit, Phone, Mail, MapPin, Award, GraduationCap, Languages, DollarSign, Plus, X, Upload, Download, Eye } from 'lucide-react';

interface DoctorProfileData {
  fullName: string;
  medicalRegistrationNumber: string;
  specialization: string;
  yearsOfExperience: number;
  contactNumber: string;
  email: string;
  profilePhoto: string;
  educationalQualifications: string[];
  hospitalAffiliations: string[];
  languagesSpoken: string[];
  consultationFees: {
    inPerson: number;
    online: number;
    followUp: number;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  bio: string;
  certifications: string[];
}

interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate?: string;
  certificateNumber: string;
  attachmentUrl?: string;
}

const DoctorProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showCertificationForm, setShowCertificationForm] = useState(false);
  const [profileData, setProfileData] = useState<DoctorProfileData>({
    fullName: 'Dr. Sarah Johnson',
    medicalRegistrationNumber: 'MR123456789',
    specialization: 'Cardiology',
    yearsOfExperience: 12,
    contactNumber: '+91 98765 43210',
    email: 'sarah.johnson@abhicure.com',
    profilePhoto: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    educationalQualifications: [
      'MBBS - All India Institute of Medical Sciences (2012)',
      'MD Internal Medicine - Post Graduate Institute (2015)',
      'DM Cardiology - Sanjay Gandhi Postgraduate Institute (2018)'
    ],
    hospitalAffiliations: [
      'Apollo Hospital - Senior Cardiologist',
      'Fortis Healthcare - Consulting Physician',
      'Max Healthcare - Board Member'
    ],
    languagesSpoken: ['English', 'Hindi', 'Bengali'],
    consultationFees: {
      inPerson: 1500,
      online: 1000,
      followUp: 800
    },
    address: {
      street: '123 Medical Plaza, Sector 18',
      city: 'Gurgaon',
      state: 'Haryana',
      zipCode: '122001'
    },
    bio: 'Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in treating cardiovascular diseases. She specializes in preventive cardiology, heart failure management, and interventional procedures.',
    certifications: [
      'Board Certified in Cardiology',
      'Advanced Cardiac Life Support (ACLS)',
      'Interventional Cardiology Certification',
      'Nuclear Cardiology Certification'
    ]
  });

  const [professionalCertifications, setProfessionalCertifications] = useState<Certification[]>([
    {
      id: '1',
      name: 'Board Certification in Cardiology',
      issuingOrganization: 'American Board of Internal Medicine',
      issueDate: '2018-06-15',
      expiryDate: '2028-06-15',
      certificateNumber: 'ABIM-CARD-2018-001234'
    },
    {
      id: '2',
      name: 'Advanced Cardiac Life Support (ACLS)',
      issuingOrganization: 'American Heart Association',
      issueDate: '2023-03-20',
      expiryDate: '2025-03-20',
      certificateNumber: 'AHA-ACLS-2023-567890'
    },
    {
      id: '3',
      name: 'Interventional Cardiology Fellowship',
      issuingOrganization: 'Mayo Clinic',
      issueDate: '2019-07-01',
      certificateNumber: 'MC-IC-2019-789012'
    }
  ]);

  const [newCertification, setNewCertification] = useState<Partial<Certification>>({
    name: '',
    issuingOrganization: '',
    issueDate: '',
    expiryDate: '',
    certificateNumber: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const specializations = [
    'Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology',
    'General Practice', 'Neurology', 'Oncology', 'Orthopedics',
    'Pediatrics', 'Psychiatry', 'Pulmonology', 'Radiology'
  ];

  const languages = [
    'English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi',
    'Gujarati', 'Kannada', 'Malayalam', 'Punjabi', 'Urdu', 'Assamese'
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Full name validation (letters and spaces only)
    if (!profileData.fullName.match(/^[a-zA-Z\s]+$/)) {
      newErrors.fullName = 'Full name should contain only letters and spaces';
    }

    // Medical registration number validation (alphanumeric)
    if (!profileData.medicalRegistrationNumber.match(/^[a-zA-Z0-9]+$/)) {
      newErrors.medicalRegistrationNumber = 'Registration number should be alphanumeric';
    }

    // Years of experience validation (numeric)
    if (profileData.yearsOfExperience < 0 || profileData.yearsOfExperience > 50) {
      newErrors.yearsOfExperience = 'Years of experience should be between 0 and 50';
    }

    // Indian phone number validation
    if (!profileData.contactNumber.match(/^\+91\s\d{5}\s\d{5}$/)) {
      newErrors.contactNumber = 'Please enter a valid Indian phone number (+91 XXXXX XXXXX)';
    }

    // Email validation
    if (!profileData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setIsEditing(false);
      // Here you would typically save to backend
      console.log('Profile saved:', profileData);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: (prev[field as keyof DoctorProfileData] as string[]).map((item, i) => 
        i === index ? value : item
      )
    }));
  };

  const addArrayItem = (field: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: [...(prev[field as keyof DoctorProfileData] as string[]), '']
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setProfileData(prev => ({
      ...prev,
      [field]: (prev[field as keyof DoctorProfileData] as string[]).filter((_, i) => i !== index)
    }));
  };

  const handleAddCertification = () => {
    if (newCertification.name && newCertification.issuingOrganization && 
        newCertification.issueDate && newCertification.certificateNumber) {
      const certification: Certification = {
        id: Date.now().toString(),
        name: newCertification.name!,
        issuingOrganization: newCertification.issuingOrganization!,
        issueDate: newCertification.issueDate!,
        expiryDate: newCertification.expiryDate,
        certificateNumber: newCertification.certificateNumber!
      };
      
      setProfessionalCertifications(prev => [...prev, certification]);
      setNewCertification({
        name: '',
        issuingOrganization: '',
        issueDate: '',
        expiryDate: '',
        certificateNumber: ''
      });
      setShowCertificationForm(false);
    }
  };

  const CertificationForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Add New Certification</h3>
          <button
            onClick={() => setShowCertificationForm(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Certification Name *
            </label>
            <input
              type="text"
              value={newCertification.name || ''}
              onChange={(e) => setNewCertification(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter certification name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Issuing Organization *
            </label>
            <input
              type="text"
              value={newCertification.issuingOrganization || ''}
              onChange={(e) => setNewCertification(prev => ({ ...prev, issuingOrganization: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter issuing organization"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue Date *
              </label>
              <input
                type="date"
                value={newCertification.issueDate || ''}
                onChange={(e) => setNewCertification(prev => ({ ...prev, issueDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <input
                type="date"
                value={newCertification.expiryDate || ''}
                onChange={(e) => setNewCertification(prev => ({ ...prev, expiryDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Certificate Number *
            </label>
            <input
              type="text"
              value={newCertification.certificateNumber || ''}
              onChange={(e) => setNewCertification(prev => ({ ...prev, certificateNumber: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter certificate number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Certificate
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 pt-6">
          <button
            onClick={handleAddCertification}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Add Certification</span>
          </button>
          <button
            onClick={() => setShowCertificationForm(false)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Doctor Profile</h1>
          <p className="text-gray-600 mt-1">Manage your professional information and credentials</p>
        </div>
        <div className="flex items-center space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Edit className="w-5 h-5" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      {/* Profile Photo and Basic Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-start space-x-6">
          <div className="relative">
            <img
              src={profileData.profilePhoto}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.fullName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="text-lg font-semibold text-gray-900">{profileData.fullName}</p>
                )}
                {errors.fullName && (
                  <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical Registration Number *
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.medicalRegistrationNumber}
                    onChange={(e) => handleInputChange('medicalRegistrationNumber', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.medicalRegistrationNumber ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter registration number"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.medicalRegistrationNumber}</p>
                )}
                {errors.medicalRegistrationNumber && (
                  <p className="text-red-600 text-sm mt-1">{errors.medicalRegistrationNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialization *
                </label>
                {isEditing ? (
                  <select
                    value={profileData.specialization}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {specializations.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-gray-900">{profileData.specialization}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience *
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={profileData.yearsOfExperience}
                    onChange={(e) => handleInputChange('yearsOfExperience', Number(e.target.value))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.yearsOfExperience ? 'border-red-300' : 'border-gray-300'
                    }`}
                    min="0"
                    max="50"
                  />
                ) : (
                  <p className="text-gray-900">{profileData.yearsOfExperience} years</p>
                )}
                {errors.yearsOfExperience && (
                  <p className="text-red-600 text-sm mt-1">{errors.yearsOfExperience}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Phone className="w-5 h-5 mr-2" />
          Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Number *
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={profileData.contactNumber}
                onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.contactNumber ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="+91 XXXXX XXXXX"
              />
            ) : (
              <p className="text-gray-900">{profileData.contactNumber}</p>
            )}
            {errors.contactNumber && (
              <p className="text-red-600 text-sm mt-1">{errors.contactNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            {isEditing ? (
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter email address"
              />
            ) : (
              <p className="text-gray-900">{profileData.email}</p>
            )}
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <input
                type="text"
                value={profileData.address.street}
                onChange={(e) => handleInputChange('address', { ...profileData.address, street: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Street address"
              />
              <input
                type="text"
                value={profileData.address.city}
                onChange={(e) => handleInputChange('address', { ...profileData.address, city: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="City"
              />
              <input
                type="text"
                value={profileData.address.state}
                onChange={(e) => handleInputChange('address', { ...profileData.address, state: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="State"
              />
              <input
                type="text"
                value={profileData.address.zipCode}
                onChange={(e) => handleInputChange('address', { ...profileData.address, zipCode: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="PIN Code"
              />
            </div>
          ) : (
            <p className="text-gray-900">
              {profileData.address.street}, {profileData.address.city}, {profileData.address.state} {profileData.address.zipCode}
            </p>
          )}
        </div>
      </div>

      {/* Professional Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Educational Qualifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <GraduationCap className="w-5 h-5 mr-2" />
            Educational Qualifications
          </h2>
          <div className="space-y-3">
            {profileData.educationalQualifications.map((qualification, index) => (
              <div key={index} className="flex items-center space-x-2">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={qualification}
                      onChange={(e) => handleArrayChange('educationalQualifications', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter qualification"
                    />
                    <button
                      onClick={() => removeArrayItem('educationalQualifications', index)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <p className="text-gray-900">• {qualification}</p>
                )}
              </div>
            ))}
            {isEditing && (
              <button
                onClick={() => addArrayItem('educationalQualifications')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Add Qualification
              </button>
            )}
          </div>
        </div>

        {/* Hospital Affiliations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Hospital Affiliations
          </h2>
          <div className="space-y-3">
            {profileData.hospitalAffiliations.map((affiliation, index) => (
              <div key={index} className="flex items-center space-x-2">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={affiliation}
                      onChange={(e) => handleArrayChange('hospitalAffiliations', index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter affiliation"
                    />
                    <button
                      onClick={() => removeArrayItem('hospitalAffiliations', index)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <p className="text-gray-900">• {affiliation}</p>
                )}
              </div>
            ))}
            {isEditing && (
              <button
                onClick={() => addArrayItem('hospitalAffiliations')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Add Affiliation
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Languages and Consultation Fees */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Languages Spoken */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Languages className="w-5 h-5 mr-2" />
            Languages Spoken
          </h2>
          {isEditing ? (
            <div className="space-y-2">
              {languages.map(language => (
                <label key={language} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={profileData.languagesSpoken.includes(language)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleInputChange('languagesSpoken', [...profileData.languagesSpoken, language]);
                      } else {
                        handleInputChange('languagesSpoken', profileData.languagesSpoken.filter(l => l !== language));
                      }
                    }}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{language}</span>
                </label>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {profileData.languagesSpoken.map(language => (
                <span
                  key={language}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {language}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Consultation Fees */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Consultation Fees
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                In-Person Consultation
              </label>
              {isEditing ? (
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={profileData.consultationFees.inPerson}
                    onChange={(e) => handleInputChange('consultationFees', {
                      ...profileData.consultationFees,
                      inPerson: Number(e.target.value)
                    })}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              ) : (
                <p className="text-gray-900">₹{profileData.consultationFees.inPerson.toLocaleString('en-IN')}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Online Consultation
              </label>
              {isEditing ? (
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={profileData.consultationFees.online}
                    onChange={(e) => handleInputChange('consultationFees', {
                      ...profileData.consultationFees,
                      online: Number(e.target.value)
                    })}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              ) : (
                <p className="text-gray-900">₹{profileData.consultationFees.online.toLocaleString('en-IN')}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Follow-up Consultation
              </label>
              {isEditing ? (
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={profileData.consultationFees.followUp}
                    onChange={(e) => handleInputChange('consultationFees', {
                      ...profileData.consultationFees,
                      followUp: Number(e.target.value)
                    })}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              ) : (
                <p className="text-gray-900">₹{profileData.consultationFees.followUp.toLocaleString('en-IN')}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bio and Certifications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Professional Bio</h2>
        {isEditing ? (
          <textarea
            value={profileData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Write a brief professional bio..."
          />
        ) : (
          <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
        )}

        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Certifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {profileData.certifications.map((cert, index) => (
            <div key={index} className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={cert}
                    onChange={(e) => handleArrayChange('certifications', index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter certification"
                  />
                  <button
                    onClick={() => removeArrayItem('certifications', index)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    ×
                  </button>
                </>
              ) : (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  ✓ {cert}
                </span>
              )}
            </div>
          ))}
        </div>
        {isEditing && (
          <button
            onClick={() => addArrayItem('certifications')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-3"
          >
            + Add Certification
          </button>
        )}
      </div>

      {/* Professional Certifications & Awards Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Award className="w-6 h-6 mr-2 text-blue-600" />
              Professional Certifications & Awards
            </h2>
            {isEditing && (
              <button
                onClick={() => setShowCertificationForm(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Certification</span>
              </button>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionalCertifications.map((cert) => (
              <div key={cert.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  {cert.expiryDate && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      new Date(cert.expiryDate) > new Date() 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {new Date(cert.expiryDate) > new Date() ? 'Valid' : 'Expired'}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{cert.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{cert.issuingOrganization}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Issued:</span>
                    <span className="text-gray-900">{new Date(cert.issueDate).toLocaleDateString()}</span>
                  </div>
                  {cert.expiryDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Expires:</span>
                      <span className="text-gray-900">{new Date(cert.expiryDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Certificate #:</span>
                    <span className="text-gray-900 text-xs">{cert.certificateNumber}</span>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certification Form Modal */}
      {showCertificationForm && <CertificationForm />}
    </div>
  );
};

export default DoctorProfile;