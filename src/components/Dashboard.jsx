import React, { useState } from 'react';

const Dashboard = ({ studentCount, students = [], onNavigate }) => {
  const [showAllCourses, setShowAllCourses] = useState(false);
  
  // Calculate statistics
  const activeStudents = students.filter(student => student.status === 'Active').length;
  const inactiveStudents = students.filter(student => student.status === 'Inactive').length;
  const graduatedStudents = students.filter(student => student.status === 'Graduated').length;
  const totalCourses = [...new Set(students.map(student => student.course))].length;
  
  // Get all unique courses with student counts
  const coursesData = students.reduce((acc, student) => {
    const course = student.course || 'Unknown Course';
    if (!acc[course]) {
      acc[course] = {
        name: course,
        totalStudents: 0,
        activeStudents: 0,
        graduatedStudents: 0
      };
    }
    acc[course].totalStudents += 1;
    if (student.status === 'Active') acc[course].activeStudents += 1;
    if (student.status === 'Graduated') acc[course].graduatedStudents += 1;
    return acc;
  }, {});
  
  const coursesList = Object.values(coursesData).sort((a, b) => b.totalStudents - a.totalStudents);

  const stats = [
    {
      title: 'Total Students',
      value: studentCount,
      icon: '👥',
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Active Students',
      value: activeStudents,
      icon: '✅',
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-200',
      change: '+8%',
      changeType: 'increase'
    },
    {
      title: 'Total Courses',
      value: totalCourses,
      icon: '📚',
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      change: '+3%',
      changeType: 'increase'
    },
    {
      title: 'Graduated',
      value: graduatedStudents,
      icon: '🎓',
      color: 'amber',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      borderColor: 'border-amber-200',
      change: '+15%',
      changeType: 'increase'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome to StudentHub Dashboard
            </h1>
            <p className="text-blue-100 text-lg">
              Manage your student records efficiently with our comprehensive platform
            </p>
            <div className="mt-4 flex items-center space-x-4 text-sm text-blue-100">
              <span>📅 {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
              <span>🕒 {new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="text-6xl opacity-20">🎓</div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} ${stat.borderColor} border rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer group`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-xs font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.changeType === 'increase' ? '↗️' : '↘️'} {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`text-3xl ${stat.textColor} group-hover:scale-110 transition-transform duration-200`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* All Courses */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">All Courses</h3>
            <span className="text-sm text-gray-500">{coursesList.length} courses available</span>
          </div>
          
          <div className="space-y-3">
            {coursesList.length > 0 ? (
              <>
                {(showAllCourses ? coursesList : coursesList.slice(0, 5)).map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1 truncate">{course.name}</h4>
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <span className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-1"></div>
                          {course.totalStudents} total
                        </span>
                        <span className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></div>
                          {course.activeStudents} active
                        </span>
                        <span className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-1"></div>
                          {course.graduatedStudents} graduated
                        </span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-lg font-semibold text-gray-900">{course.totalStudents}</div>
                      <div className="text-xs text-gray-500">students</div>
                    </div>
                  </div>
                ))}
                
                {coursesList.length > 5 && (
                  <div className="pt-3 border-t border-gray-100">
                    <button
                      onClick={() => setShowAllCourses(!showAllCourses)}
                      className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"
                    >
                      {showAllCourses ? (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                          Show Less
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                          Show All ({coursesList.length - 5} more)
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className="text-gray-500">No courses available</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions & Analytics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          
          <div className="space-y-3">
            <button 
              onClick={() => onNavigate && onNavigate('add')}
              className="w-full flex items-center space-x-3 p-3 text-left rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Add New Student</p>
                <p className="text-sm text-gray-500">Register a new student</p>
              </div>
            </button>
            
            <button 
              onClick={() => onNavigate && onNavigate('students')}
              className="w-full flex items-center space-x-3 p-3 text-left rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">View All Students</p>
                <p className="text-sm text-gray-500">Browse student directory</p>
              </div>
            </button>
            
            <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group">
              <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Generate Report</p>
                <p className="text-sm text-gray-500">Export analytics data</p>
              </div>
            </button>
          </div>

          {/* Performance Metrics */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Performance Metrics</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Enrollment Rate</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: `${(activeStudents / studentCount * 100)}%`}}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{Math.round(activeStudents / studentCount * 100)}%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Graduation Rate</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: `${(graduatedStudents / studentCount * 100)}%`}}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{Math.round(graduatedStudents / studentCount * 100)}%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Course Diversity</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: `${Math.min(totalCourses * 10, 100)}%`}}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{totalCourses}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Student Status Overview</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-2">
              {activeStudents}
            </div>
            <p className="font-medium text-gray-900">Active</p>
            <p className="text-sm text-gray-500">Currently enrolled</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-2">
              {inactiveStudents}
            </div>
            <p className="font-medium text-gray-900">Inactive</p>
            <p className="text-sm text-gray-500">On leave/suspended</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-2">
              {graduatedStudents}
            </div>
            <p className="font-medium text-gray-900">Graduated</p>
            <p className="text-sm text-gray-500">Completed studies</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
