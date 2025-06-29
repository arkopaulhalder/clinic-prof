import React, { useState, useEffect } from 'react';
import { FileText, Plus, Search, Filter, Download, Eye, Calendar, Award, Upload, X, Save } from 'lucide-react';
import { format } from 'date-fns';

interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate?: string;
  certificateNumber: string;
  attachmentUrl?: string;
}

interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  type: 'consultation' | 'lab-report' | 'imaging' | 'procedure';
  title: string;
  description: string;
  findings: string;
  recommendations: string;
  attachments: string[];
}

const MedicalRecords: React.FC = () => {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showCertificationForm, setShowCertificationForm] = useState(false);
  const [newCertification, setNewCertification] = useState<Partial<Certification>>({
    name: '',
    issuingOrganization: '',
    issueDate: '',
    expiryDate: '',
    certificateNumber: ''
  });

  // Mock data
  useEffect(() => {
    const mockRecords: MedicalRecord[] = [
      {
        id: '1',
        patientId: 'p1',
        patientName: 'John Doe',
        date: '2024-01-15',
        type: 'consultation',
        title: 'Routine Cardiac Checkup',
        description: 'Annual cardiovascular assessment for patient with history of hypertension',
        findings: 'Blood pressure: 140/90 mmHg, Heart rate: 72 bpm, ECG shows normal sinus rhythm',
        recommendations: 'Continue current medication, reduce sodium intake, follow up in 3 months',
        attachments: ['ecg_report.pdf', 'blood_test_results.pdf']
      },
      {
        id: '2',
        patientId: 'p2',
        patientName: 'Sarah Johnson',
        date: '2024-01-10',
        type: 'lab-report',
        title: 'Diabetes Management Lab Results',
        description: 'Quarterly HbA1c and lipid profile for diabetes monitoring',
        findings: 'HbA1c: 7.2%, Total cholesterol: 180 mg/dL, LDL: 110 mg/dL, HDL: 45 mg/dL',
        recommendations: 'Adjust insulin dosage, dietary counseling, increase physical activity',
        attachments: ['lab_results_q1_2024.pdf']
      },
      {
        id: '3',
        patientId: 'p3',
        patientName: 'Michael Brown',
        date: '2024-01-08',
        type: 'imaging',
        title: 'Chest X-Ray Follow-up',
        description: 'Follow-up chest imaging after pneumonia treatment',
        findings: 'Clear lung fields, no signs of consolidation or pleural effusion',
        recommendations: 'Complete recovery confirmed, no further imaging needed',
        attachments: ['chest_xray_followup.jpg']
      }
    ];

    const mockCertifications: Certification[] = [
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
    ];

    setMedicalRecords(mockRecords);
    setCertifications(mockCertifications);
  }, []);

  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || record.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'consultation':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'lab-report':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'imaging':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'procedure':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
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
      
      setCertifications(prev => [...prev, certification]);
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
          <h1 className="text-3xl font-bold text-gray-900">Medical Records & Certifications</h1>
          <p className="text-gray-600 mt-1">Manage patient records and professional certifications</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowCertificationForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Certification</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>New Record</span>
          </button>
        </div>
      </div>

      {/* Doctor Certifications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Award className="w-6 h-6 mr-2 text-blue-600" />
              Professional Certifications
            </h2>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {certifications.length} certifications
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
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
                    <span className="text-gray-900">{format(new Date(cert.issueDate), 'MMM dd, yyyy')}</span>
                  </div>
                  {cert.expiryDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Expires:</span>
                      <span className="text-gray-900">{format(new Date(cert.expiryDate), 'MMM dd, yyyy')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Certificate #:</span>
                    <span className="text-gray-900 text-xs">{cert.certificateNumber}</span>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                    View
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

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search medical records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="consultation">Consultation</option>
            <option value="lab-report">Lab Report</option>
            <option value="imaging">Imaging</option>
            <option value="procedure">Procedure</option>
          </select>
          
          <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors">
            <Filter className="w-5 h-5" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Medical Records */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Patient Medical Records</h2>
        </div>
        <div className="p-6">
          {filteredRecords.length > 0 ? (
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <div
                  key={record.id}
                  className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{record.title}</h3>
                        <p className="text-gray-600">{record.patientName} • {format(new Date(record.date), 'MMM dd, yyyy')}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 text-sm rounded-full border ${getTypeColor(record.type)}`}>
                        {record.type.replace('-', ' ')}
                      </span>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                      <p className="text-sm text-gray-700">{record.description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Findings</h4>
                      <p className="text-sm text-gray-700">{record.findings}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Recommendations</h4>
                      <p className="text-sm text-gray-700">{record.recommendations}</p>
                    </div>
                  </div>
                  
                  {record.attachments.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Attachments</h4>
                      <div className="flex flex-wrap gap-2">
                        {record.attachments.map((attachment, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm flex items-center space-x-1"
                          >
                            <FileText className="w-4 h-4" />
                            <span>{attachment}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No medical records found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or add a new record.</p>
            </div>
          )}
        </div>
      </div>

      {/* Certification Form Modal */}
      {showCertificationForm && <CertificationForm />}
    </div>
  );
};

export default MedicalRecords;