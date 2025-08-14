import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import StudentsList from './components/StudentsList';
import AddStudent from './components/AddStudent';
import { fetchStudentData, createMockStudent } from './utils/studentUtils';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch from API
        const fetchedStudents = await fetchStudentData();
        setStudents(fetchedStudents);
        
      } catch (apiError) {
        console.warn('API fetch failed, generating sample data:', apiError);
        
        // Generate sample students if API fails
        const sampleStudents = Array.from({ length: 25 }, () => createMockStudent());
        setStudents(sampleStudents);
        
        // Set a non-blocking error message
        setError('Using sample data - API unavailable');
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  const handleAddStudent = (newStudent) => {
    setStudents(prev => [newStudent, ...prev]);
    
    // Clear API error message when adding new student
    if (error === 'Using sample data - API unavailable') {
      setError(null);
    }
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
      setStudents(prev => prev.filter(student => student.id !== studentId));
    }
  };

  const handleEditStudent = (updatedStudent) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-24 w-24 border-4 border-blue-200 mx-auto"></div>
            <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-600 mx-auto absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading StudentHub</h2>
            <p className="text-gray-600">Fetching student data...</p>
            <div className="mt-4 flex justify-center space-x-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard studentCount={students.length} students={students} />;
      case 'students':
        return (
          <StudentsList 
            students={students} 
            onDeleteStudent={handleDeleteStudent}
            onEditStudent={handleEditStudent}
          />
        );
      case 'add':
        return (
          <AddStudent 
            onAddStudent={handleAddStudent} 
            existingStudents={students}
          />
        );
      default:
        return <Dashboard studentCount={students.length} students={students} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Error Banner */}
      {error && error !== 'Using sample data - API unavailable' && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-1 text-sm text-red-700">{error}</div>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  onClick={() => setError(null)}
                  className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* API Warning Banner */}
      {error === 'Using sample data - API unavailable' && (
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-800">Demo Mode</h3>
              <div className="mt-1 text-sm text-amber-700">
                Using sample data. Add new students to see the system in action.
              </div>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  onClick={() => setError(null)}
                  className="inline-flex bg-amber-50 rounded-md p-1.5 text-amber-500 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-amber-50 focus:ring-amber-600"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderActiveTab()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">StudentHub</h3>
              <p className="text-gray-600 text-sm">
                A comprehensive student management system built with modern web technologies.
                Manage student records efficiently with our intuitive interface.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>📊 Interactive Dashboard</li>
                <li>👥 Student Directory</li>
                <li>➕ Easy Registration</li>
                <li>🔍 Advanced Search & Filters</li>
                <li>📱 Responsive Design</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Statistics</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Total Students:</span>
                  <span className="font-medium text-blue-600">{students.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Students:</span>
                  <span className="font-medium text-green-600">
                    {students.filter(s => s.status === 'Active').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total Courses:</span>
                  <span className="font-medium text-purple-600">
                    {new Set(students.map(s => s.course)).size}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-500 text-sm">
                © 2025 StudentHub. Built with React & Tailwind CSS.
              </div>
              <div className="mt-4 md:mt-0 flex space-x-6 text-sm text-gray-500">
                <span>🚀 Version 1.0.0</span>
                <span>💡 Demo Mode</span>
                <span>📅 {new Date().getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
