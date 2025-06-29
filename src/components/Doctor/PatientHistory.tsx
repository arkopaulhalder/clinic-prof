import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Eye, Calendar, FileText, Pill, Activity, Phone, Mail, MapPin, AlertTriangle, Users } from 'lucide-react';
import { Patient, MedicalRecord, Prescription } from '../../types';
import { format } from 'date-fns';

const PatientHistory: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showPatientDetails, setShowPatientDetails] = useState(false);

  // Mock data
  useEffect(() => {
    const mockPatients: Patient[] = [
      {
        id: 'p1',
        firstName: 'Rajesh',
        lastName: 'Kumar',
        email: 'rajesh.kumar@email.com',
        phone: '+91 98765 43210',
        dateOfBirth: '1985-06-15',
        gender: 'male',
        address: {
          street: '123 MG Road',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400001'
        },
        emergencyContact: {
          name: 'Priya Kumar',
          phone: '+91 98765 43211',
          relationship: 'Wife'
        },
        medicalHistory: ['Hypertension', 'Type 2 Diabetes', 'High Cholesterol'],
        allergies: ['Penicillin', 'Shellfish'],
        currentMedications: ['Metformin 500mg', 'Lisinopril 10mg', 'Atorvastatin 20mg'],
        bloodGroup: 'O+',
        insuranceInfo: {
          provider: 'Star Health Insurance',
          policyNumber: 'SH123456789',
          groupNumber: 'GRP001'
        },
        createdAt: '2023-01-15T10:00:00Z',
        updatedAt: '2024-01-15T14:30:00Z'
      },
      {
        id: 'p2',
        firstName: 'Priya',
        lastName: 'Sharma',
        email: 'priya.sharma@email.com',
        phone: '+91 87654 32109',
        dateOfBirth: '1978-03-22',
        gender: 'female',
        address: {
          street: '456 Park Street',
          city: 'Delhi',
          state: 'Delhi',
          zipCode: '110001'
        },
        emergencyContact: {
          name: 'Amit Sharma',
          phone: '+91 87654 32108',
          relationship: 'Husband'
        },
        medicalHistory: ['Asthma', 'Seasonal Allergies'],
        allergies: ['Pollen', 'Dust mites'],
        currentMedications: ['Albuterol inhaler', 'Claritin 10mg'],
        bloodGroup: 'A+',
        insuranceInfo: {
          provider: 'HDFC ERGO Health',
          policyNumber: 'HDFC987654321',
          groupNumber: 'GRP002'
        },
        createdAt: '2023-03-10T09:15:00Z',
        updatedAt: '2024-01-10T11:20:00Z'
      },
      {
        id: 'p3',
        firstName: 'Anita',
        lastName: 'Singh',
        email: 'anita.singh@email.com',
        phone: '+91 76543 21098',
        dateOfBirth: '1990-08-12',
        gender: 'female',
        address: {
          street: '789 Brigade Road',
          city: 'Bangalore',
          state: 'Karnataka',
          zipCode: '560001'
        },
        emergencyContact: {
          name: 'Vikram Singh',
          phone: '+91 76543 21097',
          relationship: 'Brother'
        },
        medicalHistory: [],
        allergies: ['Shellfish'],
        currentMedications: [],
        bloodGroup: 'B+',
        createdAt: '2023-08-20T16:45:00Z',
        updatedAt: '2023-12-15T13:10:00Z'
      }
    ];

    setPatients(mockPatients);
    setFilteredPatients(mockPatients);
  }, []);

  // Filter patients based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = patients.filter(patient =>
        patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm)
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients(patients);
    }
  }, [searchTerm, patients]);

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getLastVisitDate = (patientId: string) => {
    // Mock last visit dates
    const lastVisits: { [key: string]: string } = {
      'p1': '2024-01-15',
      'p2': '2024-01-10',
      'p3': '2023-12-15'
    };
    return lastVisits[patientId] || 'No visits';
  };

  const getFollowUpStatus = (patientId: string) => {
    // Mock follow-up status
    const followUps: { [key: string]: string } = {
      'p1': 'Due in 2 weeks',
      'p2': 'Completed',
      'p3': 'Not required'
    };
    return followUps[patientId] || 'Unknown';
  };

  const exportPatientRecord = (patient: Patient) => {
    // Mock export functionality
    const data = {
      patient: patient,
      exportDate: new Date().toISOString(),
      exportedBy: 'Dr. Sarah Johnson'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${patient.firstName}_${patient.lastName}_medical_record.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const PatientDetailsModal = ({ patient }: { patient: Patient }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-[#D0D0D0] bg-[#EDF9FC]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-[#143D6F] rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#4A4A4A]">
                  {patient.firstName} {patient.lastName}
                </h2>
                <p className="text-[#AFAFAF]">
                  Age {calculateAge(patient.dateOfBirth)} • {patient.gender} • {patient.bloodGroup}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPatientDetails(false)}
              className="text-[#AFAFAF] hover:text-[#4A4A4A] text-2xl transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#EDF9FC] p-4 rounded-lg border border-[#D0D0D0]">
              <h3 className="text-lg font-semibold text-[#4A4A4A] mb-3">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-[#AFAFAF]" />
                  <span className="text-[#4A4A4A]">{patient.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-[#AFAFAF]" />
                  <span className="text-[#4A4A4A]">{patient.email}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-[#AFAFAF] mt-1" />
                  <div className="text-[#4A4A4A]">
                    <div>{patient.address.street}</div>
                    <div>{patient.address.city}, {patient.address.state} {patient.address.zipCode}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#EDF9FC] p-4 rounded-lg border border-[#D0D0D0]">
              <h3 className="text-lg font-semibold text-[#4A4A4A] mb-3">Emergency Contact</h3>
              <div className="space-y-2">
                <div className="text-[#4A4A4A] font-medium">{patient.emergencyContact.name}</div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-[#AFAFAF]" />
                  <span className="text-[#4A4A4A]">{patient.emergencyContact.phone}</span>
                </div>
                <div className="text-[#AFAFAF]">Relationship: {patient.emergencyContact.relationship}</div>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="text-lg font-semibold text-[#E53935] mb-3 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Allergies
              </h3>
              {patient.allergies.length > 0 ? (
                <div className="space-y-1">
                  {patient.allergies.map((allergy, index) => (
                    <div key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                      {allergy}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-red-600">No known allergies</p>
              )}
            </div>

            <div className="bg-[#D6EAF8] p-4 rounded-lg border border-[#D0D0D0]">
              <h3 className="text-lg font-semibold text-[#143D6F] mb-3 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Medical History
              </h3>
              {patient.medicalHistory.length > 0 ? (
                <div className="space-y-1">
                  {patient.medicalHistory.map((condition, index) => (
                    <div key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {condition}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#143D6F]">No medical history</p>
              )}
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-[#A8D5BA] mb-3 flex items-center">
                <Pill className="w-5 h-5 mr-2" />
                Current Medications
              </h3>
              {patient.currentMedications.length > 0 ? (
                <div className="space-y-1">
                  {patient.currentMedications.map((medication, index) => (
                    <div key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {medication}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-green-600">No current medications</p>
              )}
            </div>
          </div>

          {/* Insurance Information */}
          {patient.insuranceInfo && (
            <div className="bg-[#EDF9FC] p-4 rounded-lg border border-[#D0D0D0]">
              <h3 className="text-lg font-semibold text-[#4A4A4A] mb-3">Insurance Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#AFAFAF]">Provider</label>
                  <div className="text-[#4A4A4A]">{patient.insuranceInfo.provider}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#AFAFAF]">Policy Number</label>
                  <div className="text-[#4A4A4A]">{patient.insuranceInfo.policyNumber}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#AFAFAF]">Group Number</label>
                  <div className="text-[#4A4A4A]">{patient.insuranceInfo.groupNumber}</div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4 border-t border-[#D0D0D0]">
            <button
              onClick={() => exportPatientRecord(patient)}
              className="bg-[#143D6F] hover:bg-[#0F2A4F] text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export Record</span>
            </button>
            <button className="bg-[#A8D5BA] hover:bg-green-600 text-[#4A4A4A] hover:text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Schedule Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-[#4A4A4A]">Patient History</h1>
          <p className="text-[#AFAFAF] mt-1">View and manage patient medical records</p>
        </div>
        <button className="bg-[#143D6F] hover:bg-[#0F2A4F] text-white px-4 lg:px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Export All Records</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-[#D0D0D0]">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AFAFAF] w-5 h-5" />
              <input
                type="text"
                placeholder="Search patients by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full border border-[#D0D0D0] rounded-lg focus:ring-2 focus:ring-[#143D6F] focus:border-transparent bg-white text-[#4A4A4A] placeholder-[#AFAFAF]"
              />
            </div>
          </div>
          <button className="flex items-center justify-center space-x-2 bg-[#EDF9FC] hover:bg-[#D6EAF8] text-[#4A4A4A] px-6 py-3 rounded-lg font-medium transition-colors border border-[#D0D0D0]">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Patient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-[#D0D0D0] hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-[#143D6F] rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-white">
                  {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#4A4A4A]">
                  {patient.firstName} {patient.lastName}
                </h3>
                <p className="text-[#AFAFAF]">
                  Age {calculateAge(patient.dateOfBirth)} • {patient.gender}
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#AFAFAF]">Last Visit:</span>
                <span className="text-sm font-medium text-[#4A4A4A]">
                  {format(new Date(getLastVisitDate(patient.id)), 'MMM dd, yyyy')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#AFAFAF]">Follow-up:</span>
                <span className="text-sm font-medium text-[#4A4A4A]">
                  {getFollowUpStatus(patient.id)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#AFAFAF]">Conditions:</span>
                <span className="text-sm font-medium text-[#4A4A4A]">
                  {patient.medicalHistory.length || 'None'}
                </span>
              </div>
            </div>

            {/* Medical Highlights */}
            <div className="space-y-2 mb-4">
              {patient.allergies.length > 0 && (
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-[#E53935]" />
                  <span className="text-sm text-[#E53935] font-medium">
                    {patient.allergies.length} allerg{patient.allergies.length === 1 ? 'y' : 'ies'}
                  </span>
                </div>
              )}
              {patient.currentMedications.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Pill className="w-4 h-4 text-[#A8D5BA]" />
                  <span className="text-sm text-green-600 font-medium">
                    {patient.currentMedications.length} medication{patient.currentMedications.length === 1 ? '' : 's'}
                  </span>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setSelectedPatient(patient);
                  setShowPatientDetails(true);
                }}
                className="flex-1 bg-[#143D6F] hover:bg-[#0F2A4F] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
              >
                <Eye className="w-4 h-4" />
                <span>View Details</span>
              </button>
              <button
                onClick={() => exportPatientRecord(patient)}
                className="bg-[#EDF9FC] hover:bg-[#D6EAF8] text-[#4A4A4A] px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-[#D0D0D0]"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-[#AFAFAF] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[#4A4A4A] mb-2">No patients found</h3>
          <p className="text-[#AFAFAF]">Try adjusting your search criteria.</p>
        </div>
      )}

      {/* Patient Details Modal */}
      {showPatientDetails && selectedPatient && (
        <PatientDetailsModal patient={selectedPatient} />
      )}
    </div>
  );
};

export default PatientHistory;