import React, { useState, useEffect } from 'react';

const StudentsList = ({ students, onDeleteStudent, onEditStudent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  const [detailedStudents, setDetailedStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const studentsPerPage = 12;

  // Fetch detailed student data from DummyJSON API
  useEffect(() => {
    const fetchDetailedData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        
        // Transform the data to include all details
        const transformedStudents = data.users.map((user, index) => ({
          id: user.id,
          studentId: `STU${String(user.id).padStart(6, '0')}`,
          firstName: user.firstName,
          lastName: user.lastName,
          maidenName: user.maidenName,
          age: user.age,
          gender: user.gender,
          email: user.email,
          phone: user.phone,
          username: user.username,
          birthDate: user.birthDate,
          image: user.image,
          bloodGroup: user.bloodGroup,
          height: user.height,
          weight: user.weight,
          eyeColor: user.eyeColor,
          hair: user.hair,
          ip: user.ip,
          address: user.address,
          macAddress: user.macAddress,
          university: user.university,
          bank: user.bank,
          company: user.company,
          ein: user.ein,
          ssn: user.ssn,
          userAgent: user.userAgent,
          crypto: user.crypto,
          role: user.role,
          // Additional student-specific fields
          course: getRandomCourse(),
          enrollmentDate: generateRandomDate(),
          gpa: (Math.random() * 2 + 2).toFixed(2), // GPA between 2.0-4.0
          emergencyContact: `Emergency Contact ${index + 1}`,
          emergencyPhone: generatePhoneNumber()
        }));
        
        setDetailedStudents(transformedStudents);
      } catch (error) {
        console.error('Error fetching detailed data:', error);
        // Fallback to basic students data
        setDetailedStudents(students);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailedData();
  }, [students]);

  // Helper functions
  const getRandomCourse = () => {
    const courses = [
      'Computer Science', 'Software Engineering', 'Data Science', 'Business Administration',
      'Digital Marketing', 'Web Development', 'Cybersecurity', 'Artificial Intelligence'
    ];
    return courses[Math.floor(Math.random() * courses.length)];
  };

  // Status functionality has been removed to focus on actual API data

  const generateRandomDate = () => {
    const end = new Date();
    const start = new Date(end.getFullYear() - 4, 0, 1);
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString().split('T')[0];
  };

  const generatePhoneNumber = () => {
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const exchange = Math.floor(Math.random() * 900) + 100;
    const number = Math.floor(Math.random() * 9000) + 1000;
    return `+1-${areaCode}-${exchange}-${number}`;
  };

  // Filter and sort students
  const filteredStudents = (detailedStudents.length > 0 ? detailedStudents : students)
    .filter(student => {
      const matchesSearch = 
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.course && student.course.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (student.university && student.university.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (student.company?.name && student.company.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        student.studentId.toString().includes(searchTerm);
      
      const matchesRole = filterRole === 'All' || student.role === filterRole;
      
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = `${a.firstName} ${a.lastName}`.toLowerCase();
          bValue = `${b.firstName} ${b.lastName}`.toLowerCase();
          break;
        case 'email':
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case 'course':
          aValue = (a.course || '').toLowerCase();
          bValue = (b.course || '').toLowerCase();
          break;
        case 'university':
          aValue = (a.university || '').toLowerCase();
          bValue = (b.university || '').toLowerCase();
          break;
        case 'studentId':
          aValue = parseInt(a.studentId.replace('STU', ''));
          bValue = parseInt(b.studentId.replace('STU', ''));
          break;
        case 'age':
          aValue = a.age;
          bValue = b.age;
          break;
        default:
          aValue = a[sortBy];
          bValue = b[sortBy];
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Calculate pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // Status badge functionality removed as requested

  const getRoleBadge = (role) => {
    const roleConfig = {
      'admin': { 
        bg: 'bg-purple-50', 
        text: 'text-purple-700', 
        border: 'border-purple-200',
        dotColor: 'bg-purple-400'
      },
      'user': { 
        bg: 'bg-blue-50', 
        text: 'text-blue-700', 
        border: 'border-blue-200',
        dotColor: 'bg-blue-400'
      },
      'moderator': { 
        bg: 'bg-green-50', 
        text: 'text-green-700', 
        border: 'border-green-200',
        dotColor: 'bg-green-400'
      }
    };
    
    const config = roleConfig[role] || { 
      bg: 'bg-gray-50', 
      text: 'text-gray-700', 
      border: 'border-gray-200',
      dotColor: 'bg-gray-400'
    };
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}>
        <span className={`w-2 h-2 rounded-full mr-2 ${config.dotColor}`}></span>
        {role || 'user'}
      </span>
    );
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const SortIcon = ({ field }) => {
    if (sortBy !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return sortOrder === 'asc' ? (
      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  // Detailed Student Modal Component
  const StudentDetailModal = ({ student, isOpen, onClose }) => {
    if (!isOpen || !student) return null;

    return (
      <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[85vh] overflow-hidden">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img 
                  src={student.image} 
                  alt={student.firstName} 
                  className="w-12 h-12 rounded-lg object-cover border border-gray-200" 
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {student.firstName} {student.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Student ID: {student.studentId}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                ×
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 max-h-[calc(85vh-140px)] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Personal Information */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h4 className="text-base font-semibold text-gray-900">Personal Information</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Full Name:</span>
                    <span className="text-gray-900 font-medium">{student.firstName} {student.lastName}</span>
                  </div>
                  {student.maidenName && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Maiden Name:</span>
                      <span className="text-gray-900">{student.maidenName}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Username:</span>
                    <span className="text-gray-900 font-mono text-xs">{student.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age:</span>
                    <span className="text-gray-900">{student.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gender:</span>
                    <span className="text-gray-900">{student.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Birth Date:</span>
                    <span className="text-gray-900">{new Date(student.birthDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Blood Group:</span>
                    <span className="text-red-600 font-semibold">{student.bloodGroup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Height:</span>
                    <span className="text-gray-900">{student.height} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight:</span>
                    <span className="text-gray-900">{student.weight} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Eye Color:</span>
                    <span className="text-gray-900 capitalize">{student.eyeColor}</span>
                  </div>
                  {student.hair && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hair:</span>
                      <span className="text-gray-900 capitalize">{student.hair.color} ({student.hair.type})</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Academic Information */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <h4 className="text-base font-semibold text-gray-900">Academic Information</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Student ID:</span>
                    <span className="text-blue-600 font-semibold font-mono text-xs">{student.studentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">University:</span>
                    <span className="text-gray-900 text-right">{student.university}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Course:</span>
                    <span className="text-gray-900">{student.course}</span>
                  </div>
                  {/* Status field removed as requested */}
                  {student.gpa && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">GPA:</span>
                      <span className="text-green-600 font-semibold">{student.gpa}</span>
                    </div>
                  )}
                  {student.enrollmentDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Enrollment:</span>
                      <span className="text-gray-900">{new Date(student.enrollmentDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Role:</span>
                    <span className="text-gray-900 capitalize">{student.role}</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h4 className="text-base font-semibold text-gray-900">Contact Information</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="text-blue-600 text-xs break-all">{student.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="text-gray-900 font-mono text-xs">{student.phone}</span>
                  </div>
                  {student.address && (
                    <div>
                      <div className="text-gray-600 mb-1">Address:</div>
                      <div className="bg-white rounded p-2 border text-xs">
                        <div className="text-gray-900">{student.address.address}</div>
                        <div className="text-gray-700">{student.address.city}, {student.address.state} {student.address.postalCode}</div>
                        <div className="text-gray-700">{student.address.country}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Company Information */}
              {student.company && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h4 className="text-base font-semibold text-gray-900">Company Information</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Company:</span>
                      <span className="text-gray-900 font-medium text-right">{student.company.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Department:</span>
                      <span className="text-gray-900 text-right">{student.company.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Title:</span>
                      <span className="text-gray-900 text-right">{student.company.title}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Financial Information */}
              {student.bank && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <h4 className="text-base font-semibold text-gray-900">Financial Information</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Card Type:</span>
                      <span className="text-gray-900 font-medium">{student.bank.cardType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Card Number:</span>
                      <span className="text-gray-600 font-mono text-xs">****-****-****-{student.bank.cardNumber.slice(-4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expires:</span>
                      <span className="text-gray-900 font-mono text-xs">{student.bank.cardExpire}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Currency:</span>
                      <span className="text-green-600 font-semibold">{student.bank.currency}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Technical Information */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <h4 className="text-base font-semibold text-gray-900">Technical Information</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">IP Address:</span>
                    <span className="text-gray-900 font-mono text-xs">{student.ip}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">MAC Address:</span>
                    <span className="text-gray-900 font-mono text-xs">{student.macAddress}</span>
                  </div>
                  {student.ssn && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">SSN:</span>
                      <span className="text-gray-600 font-mono text-xs">***-**-{student.ssn.slice(-3)}</span>
                    </div>
                  )}
                  {student.ein && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">EIN:</span>
                      <span className="text-gray-900 font-mono text-xs">{student.ein}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="flex justify-end px-6 py-4 bg-gray-50 border-t border-gray-200 space-x-3">
            {onEditStudent && (
              <button
                onClick={() => {
                  onEditStudent(student);
                  onClose();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Edit Student</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const StudentCard = ({ student }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-gray-300 hover:-translate-y-1">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <img
            className="h-20 w-20 rounded-2xl object-cover border-4 border-white shadow-lg"
            src={student.image}
            alt={`${student.firstName} ${student.lastName}`}
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 truncate mb-1">
                {student.firstName} {student.lastName}
              </h3>
              <p className="text-sm text-gray-500 font-medium">{student.course}</p>
            </div>
            {getRoleBadge(student.role)}
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-center text-gray-600">
                <div className="w-5 h-5 bg-gray-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-medium text-gray-700 font-mono text-xs">{student.studentId}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <div className="w-5 h-5 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <span className="truncate">{student.university}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <div className="w-5 h-5 bg-gray-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <span className="truncate text-blue-600">{student.email}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <div className="w-5 h-5 bg-yellow-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-3 h-3 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <span className="font-mono text-sm">{student.phone}</span>
              </div>

              {student.company && (
                <div className="flex items-center text-gray-600">
                  <div className="w-5 h-5 bg-orange-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-3 h-3 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="truncate">{student.company.name}</span>
                </div>
              )}

              {student.gpa && (
                <div className="flex items-center text-gray-600">
                  <div className="w-5 h-5 bg-green-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="font-mono font-bold text-green-600">{student.gpa} GPA</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center text-xs text-gray-500 space-x-3">
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span>Age {student.age}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                  <span>{student.gender}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => {
                  setSelectedStudent(student);
                  setShowDetailModal(true);
                }}
                className="flex-1 min-w-0 inline-flex items-center justify-center px-3 py-2 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 hover:border-emerald-300 transition-all duration-200"
              >
                <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>View</span>
              </button>
              {onEditStudent && (
                <button
                  onClick={() => onEditStudent(student)}
                  className="flex-1 min-w-0 inline-flex items-center justify-center px-3 py-2 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"
                >
                  <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Edit</span>
                </button>
              )}
              <button
                onClick={() => onDeleteStudent(student.id)}
                className="flex-1 min-w-0 inline-flex items-center justify-center px-3 py-2 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-all duration-200"
              >
                <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-16">
          <div className="text-center">
            <div className="relative mx-auto w-16 h-16 mb-6">
              <div className="absolute inset-0 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Student Information</h3>
            <p className="text-gray-600">Fetching comprehensive student data from our database...</p>
            <div className="mt-6 flex justify-center space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}

      {!loading && (
        <>
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
              <div>
                <h2 className="text-3xl font-bold mb-2 text-gray-900">Student Directory</h2>
                <p className="text-gray-600 text-lg">
                  Complete student records with comprehensive information
                </p>
                <div className="flex items-center mt-3 space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>30 Total Students</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Male/Female Students</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span>Various Roles</span>
                  </div>
                </div>
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-xl p-1 border border-gray-200">
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'table' 
                      ? 'bg-white text-gray-900 shadow-sm border border-gray-200' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Table</span>
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'cards' 
                      ? 'bg-white text-gray-900 shadow-sm border border-gray-200' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 000 2h.01a1 1 0 100-2H3zM6 4a1 1 0 000 2h6a1 1 0 100-2H6zM3 10a1 1 0 100 2h.01a1 1 0 100-2H3zM6 10a1 1 0 100 2h6a1 1 0 100-2H6zM3 16a1 1 0 100 2h.01a1 1 0 100-2H3zM6 16a1 1 0 100 2h6a1 1 0 100-2H6z" />
                  </svg>
                  <span className="font-medium">Cards</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Search */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Search Students
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name, email, course, university, company..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 text-sm placeholder-gray-400"
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Role Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Role Filter
                </label>
                <select
                  value={filterRole}
                  onChange={(e) => {
                    setFilterRole(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 text-sm"
                >
                  <option value="All">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 text-sm"
                >
                  <option value="name">Name</option>
                  <option value="studentId">Student ID</option>
                  <option value="email">Email</option>
                  <option value="course">Course</option>
                  <option value="university">University</option>
                  <option value="age">Age</option>
                </select>
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Order
                </label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 text-sm"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
            
            {searchTerm && (
              <div className="mt-6 flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    Found {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''} matching "{searchTerm}"
                  </span>
                </div>
                <button
                  onClick={() => setSearchTerm('')}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          {viewMode === 'table' ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th 
                        className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-all duration-200"
                        onClick={() => handleSort('studentId')}
                      >
                        <div className="flex items-center space-x-2">
                          <span>Student ID</span>
                          <SortIcon field="studentId" />
                        </div>
                      </th>
                      <th 
                        className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-all duration-200"
                        onClick={() => handleSort('name')}
                      >
                        <div className="flex items-center space-x-2">
                          <span>Student</span>
                          <SortIcon field="name" />
                        </div>
                      </th>
                      <th 
                        className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-all duration-200"
                        onClick={() => handleSort('email')}
                      >
                        <div className="flex items-center space-x-2">
                          <span>Contact</span>
                          <SortIcon field="email" />
                        </div>
                      </th>
                      <th 
                        className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-all duration-200"
                        onClick={() => handleSort('university')}
                      >
                        <div className="flex items-center space-x-2">
                          <span>University</span>
                          <SortIcon field="university" />
                        </div>
                      </th>
                      <th 
                        className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-all duration-200"
                        onClick={() => handleSort('course')}
                      >
                        <div className="flex items-center space-x-2">
                          <span>Academic</span>
                          <SortIcon field="course" />
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentStudents.map((student, index) => (
                      <tr key={student.id} className={`hover:bg-gray-50 transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-gray-700 bg-gray-100 border border-gray-200">
                            {student.studentId}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="relative">
                              <img
                                className="h-12 w-12 rounded-xl object-cover border-2 border-white shadow-md"
                                src={student.image}
                                alt={`${student.firstName} ${student.lastName}`}
                              />
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-bold text-gray-900">
                                {student.firstName} {student.lastName}
                              </div>
                              <div className="text-xs text-gray-500 flex items-center space-x-2">
                                <span>Age {student.age}</span>
                                <span>•</span>
                                <span>{student.gender}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <div className="text-sm text-blue-600 font-medium">{student.email}</div>
                            <div className="text-xs text-gray-500 font-mono">{student.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <div className="text-sm font-medium text-gray-900">{student.university}</div>
                            {student.address && (
                              <div className="text-xs text-gray-500">{student.address.city}, {student.address.country}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <div className="text-sm font-medium text-gray-900">{student.course}</div>
                            {student.gpa && (
                              <div className="text-xs text-green-600 font-bold">GPA: {student.gpa}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getRoleBadge(student.role)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {student.company ? (
                            <div className="space-y-1">
                              <div className="text-sm font-medium text-gray-900">{student.company.name}</div>
                              <div className="text-xs text-gray-500">{student.company.title}</div>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400 italic">Not specified</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => {
                                setSelectedStudent(student);
                                setShowDetailModal(true);
                              }}
                              className="inline-flex items-center p-2 text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 hover:border-emerald-300 transition-all duration-200"
                              title="View Details"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            {onEditStudent && (
                              <button
                                onClick={() => onEditStudent(student)}
                                className="inline-flex items-center p-2 text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 hover:border-indigo-300 transition-all duration-200"
                                title="Edit Student"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                            )}
                            <button
                              onClick={() => onDeleteStudent(student.id)}
                              className="inline-flex items-center p-2 text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-all duration-200"
                              title="Delete Student"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {currentStudents.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="text-sm text-gray-600 font-medium">
                  Showing <span className="font-bold text-gray-900">{indexOfFirstStudent + 1}</span> to{' '}
                  <span className="font-bold text-gray-900">{Math.min(indexOfLastStudent, filteredStudents.length)}</span> of{' '}
                  <span className="font-bold text-indigo-600">{filteredStudents.length}</span> students
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm'
                    }`}
                  >
                    First
                  </button>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1;
                      const isCurrentPage = page === currentPage;
                      const showPage = 
                        page === 1 || 
                        page === totalPages || 
                        (page >= currentPage - 1 && page <= currentPage + 1);
                      
                      if (!showPage) {
                        if (page === currentPage - 2 || page === currentPage + 2) {
                          return (
                            <span key={page} className="px-2 text-gray-400">
                              ...
                            </span>
                          );
                        }
                        return null;
                      }
                      
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isCurrentPage
                              ? 'bg-gray-800 text-white shadow-lg'
                              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 shadow-sm'
                    }`}
                  >
                    Last
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredStudents.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-16">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {searchTerm ? 'No students found' : 'No students available'}
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  {searchTerm 
                    ? `We couldn't find any students matching "${searchTerm}". Try adjusting your search criteria or filters.`
                    : 'It looks like there are no students in the system yet. Get started by adding your first student.'
                  }
                </p>
                <div className="flex items-center justify-center space-x-4">
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gray-700 hover:bg-gray-800 transition-all duration-200 shadow-lg"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Clear Search
                    </button>
                  )}
                  <button
                    onClick={() => setFilterRole('All')}
                    className="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Student Detail Modal */}
      <StudentDetailModal 
        student={selectedStudent}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </div>
  );
};

export default StudentsList;
