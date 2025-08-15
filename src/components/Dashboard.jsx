import React, { useState } from 'react';

const Dashboard = ({ studentCount, students = [], onNavigate }) => {
  const [showAllUniversities, setShowAllUniversities] = useState(false);
  const [showAllRoles, setShowAllRoles] = useState(false);
  
  // Calculate statistics based on the actual data fields
  const maleStudents = students.filter(student => student.gender === 'male').length;
  const femaleStudents = students.filter(student => student.gender === 'female').length;
  const totalUniversities = [...new Set(students.map(student => student.university))].length;
  const totalRoles = [...new Set(students.filter(s => s.role).map(s => s.role))].length;
  
  // Get all unique universities with student counts
  const universitiesData = students.reduce((acc, student) => {
    const university = student.university || 'Unknown University';
    if (!acc[university]) {
      acc[university] = {
        name: university,
        totalStudents: 0,
        maleStudents: 0,
        femaleStudents: 0
      };
    }
    acc[university].totalStudents += 1;
    if (student.gender === 'male') acc[university].maleStudents += 1;
    if (student.gender === 'female') acc[university].femaleStudents += 1;
    return acc;
  }, {});
  
  // Get all unique roles with student counts
  const rolesData = students.reduce((acc, student) => {
    const role = student.role || 'Unassigned';
    if (!acc[role]) {
      acc[role] = {
        name: role,
        totalStudents: 0,
        companies: new Set()
      };
    }
    acc[role].totalStudents += 1;
    if (student.company?.name) acc[role].companies.add(student.company.name);
    return acc;
  }, {});
  
  // Convert to arrays for rendering
  const universitiesList = Object.values(universitiesData).sort((a, b) => b.totalStudents - a.totalStudents);
  const rolesList = Object.values(rolesData)
    .map(role => ({...role, companyCount: role.companies.size}))
    .sort((a, b) => b.totalStudents - a.totalStudents);

  const stats = [
    {
      title: 'Total Students',
      value: studentCount,
      icon: '👥',
      color: 'blue',
      bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-100',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Male Students',
      value: maleStudents,
      icon: '👨',
      color: 'green',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
      textColor: 'text-green-700',
      borderColor: 'border-green-100',
      change: '+8%',
      changeType: 'increase'
    },
    {
      title: 'Female Students',
      value: femaleStudents,
      icon: '👩',
      color: 'pink',
      bgColor: 'bg-gradient-to-br from-pink-50 to-rose-50',
      textColor: 'text-pink-700',
      borderColor: 'border-pink-100',
      change: '+10%',
      changeType: 'increase'
    },
    {
      title: 'Universities',
      value: totalUniversities,
      icon: '🏛️',
      color: 'purple',
      bgColor: 'bg-gradient-to-br from-purple-50 to-violet-50',
      textColor: 'text-purple-700',
      borderColor: 'border-purple-100',
      change: '+3%',
      changeType: 'increase'
    },
    {
      title: 'User Roles',
      value: totalRoles,
      icon: '👑',
      color: 'cyan',
      bgColor: 'bg-gradient-to-br from-cyan-50 to-blue-50',
      textColor: 'text-cyan-700',
      borderColor: 'border-cyan-100',
      change: '+5%',
      changeType: 'increase'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg p-6 text-gray-800 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-800">
              Welcome to StudentHub Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              Manage your student records efficiently with our comprehensive platform
            </p>
            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
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
      <div className="grid grid-cols-1 gap-6">
        {/* Universities and Roles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* All Universities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Universities</h3>
              <span className="text-sm text-gray-500">{universitiesList.length} universities available</span>
            </div>
            
            <div className="space-y-3">
              {universitiesList.length > 0 ? (
                <>
                  {(showAllUniversities ? universitiesList : universitiesList.slice(0, 5)).map((university, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1 truncate">{university.name}</h4>
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <span className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-1"></div>
                            {university.totalStudents} total
                          </span>
                          <span className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></div>
                            {university.maleStudents} male
                          </span>
                          <span className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mr-1"></div>
                            {university.femaleStudents} female
                          </span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-lg font-semibold text-gray-900">{university.totalStudents}</div>
                        <div className="text-xs text-gray-500">students</div>
                      </div>
                    </div>
                  ))}
                  
                  {universitiesList.length > 5 && (
                    <div className="pt-3 border-t border-gray-100">
                      <button
                        onClick={() => setShowAllUniversities(!showAllUniversities)}
                        className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"
                      >
                        {showAllUniversities ? (
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
                            Show All ({universitiesList.length - 5} more)
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
                  <p className="text-gray-500">No universities available</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Roles */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">User Roles</h3>
              <span className="text-sm text-gray-500">{rolesList.length} roles total</span>
            </div>
            
            <div className="space-y-3">
              {rolesList.length > 0 ? (
                <>
                  {(showAllRoles ? rolesList : rolesList.slice(0, 5)).map((role, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1 truncate">{role.name}</h4>
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <span className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-1"></div>
                            {role.totalStudents} students
                          </span>
                          <span className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-1"></div>
                            {role.companyCount} companies
                          </span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-lg font-semibold text-gray-900">{role.totalStudents}</div>
                        <div className="text-xs text-gray-500">students</div>
                      </div>
                    </div>
                  ))}
                  
                  {rolesList.length > 5 && (
                    <div className="pt-3 border-t border-gray-100">
                      <button
                        onClick={() => setShowAllRoles(!showAllRoles)}
                        className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-cyan-600 bg-cyan-50 border border-cyan-200 rounded-lg hover:bg-cyan-100 hover:border-cyan-300 transition-all duration-200"
                      >
                        {showAllRoles ? (
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
                            Show All ({rolesList.length - 5} more)
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <p className="text-gray-500">No roles available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions and Student Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
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

            {/* Demographics */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Demographics</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Gender Distribution</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: `${(maleStudents / studentCount * 100)}%`}}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{Math.round(maleStudents / studentCount * 100)}% Male</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">University Diversity</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{width: `${Math.min(totalUniversities * 10, 100)}%`}}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{totalUniversities}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">User Role Types</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-cyan-600 h-2 rounded-full" style={{width: `${Math.min(totalRoles * 10, 100)}%`}}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{totalRoles}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Student Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Student Bio Details</h3>
            
            {/* Blood Group Distribution */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Blood Groups</h4>
              <div className="grid grid-cols-4 gap-2">
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => {
                  const count = students.filter(s => s.bloodGroup === group).length;
                  return (
                    <div key={group} className="flex flex-col items-center justify-center p-2 bg-red-50 rounded-md border border-red-100">
                      <span className="text-sm font-semibold text-red-700">{group}</span>
                      <span className="text-xs text-gray-500">{count} students</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Physical Characteristics */}
            <div className="space-y-4">
              {/* Eye Color */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Eye Colors</h4>
                <div className="flex flex-wrap gap-2">
                  {['Blue', 'Green', 'Brown', 'Gray', 'Amber'].map(color => {
                    const count = students.filter(s => s.eyeColor === color).length;
                    if (count === 0) return null;
                    const bgColor = {
                      'Blue': 'bg-blue-100 text-blue-700 border-blue-200',
                      'Green': 'bg-green-100 text-green-700 border-green-200',
                      'Brown': 'bg-amber-100 text-amber-700 border-amber-200',
                      'Gray': 'bg-gray-100 text-gray-700 border-gray-200',
                      'Amber': 'bg-yellow-100 text-yellow-700 border-yellow-200',
                    }[color] || 'bg-gray-100 text-gray-700 border-gray-200';
                    
                    return (
                      <div key={color} className={`px-2 py-1 rounded ${bgColor} text-xs flex items-center`}>
                        <span className="mr-1">{color}</span>
                        <span className="font-semibold">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Hair Color and Type */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Hair Types</h4>
                <div className="flex flex-wrap gap-2">
                  {['Straight', 'Wavy', 'Curly', 'Very curly'].map(type => {
                    const count = students.filter(s => s.hair?.type === type).length;
                    if (count === 0) return null;
                    
                    return (
                      <div key={type} className="px-2 py-1 rounded bg-orange-50 text-orange-700 border border-orange-100 text-xs flex items-center">
                        <span className="mr-1">{type}</span>
                        <span className="font-semibold">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Height and Weight */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Physical Stats</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-cyan-50 rounded-lg border border-cyan-100">
                    <p className="text-xs text-gray-500 mb-1">Average Height</p>
                    <p className="text-lg font-semibold text-cyan-700">
                      {Math.round(students.reduce((acc, s) => acc + (parseFloat(s.height) || 0), 0) / students.length)} cm
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                    <p className="text-xs text-gray-500 mb-1">Average Weight</p>
                    <p className="text-lg font-semibold text-orange-700">
                      {Math.round(students.reduce((acc, s) => acc + (parseFloat(s.weight) || 0), 0) / students.length)} kg
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Information Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gender Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Student Gender Distribution</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-2">
                {maleStudents}
              </div>
              <p className="font-medium text-gray-900">Male Students</p>
              <p className="text-sm text-gray-500">{Math.round(maleStudents / studentCount * 100)}% of total</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-2">
                {femaleStudents}
              </div>
              <p className="font-medium text-gray-900">Female Students</p>
              <p className="text-sm text-gray-500">{Math.round(femaleStudents / studentCount * 100)}% of total</p>
            </div>
          </div>
        </div>
        
        {/* Professional Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Role Distribution</h3>
          
          <div className="space-y-4">
            {/* Top Roles */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Role Distribution</h4>
              <div className="space-y-2">
                {Object.entries(students.reduce((acc, student) => {
                  const role = student.role || 'Unassigned';
                  acc[role] = (acc[role] || 0) + 1;
                  return acc;
                }, {}))
                  .sort((a, b) => b[1] - a[1])
                  .map(([role, count], index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-3">
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-800">{role}</span>
                      </div>
                      <span className="text-sm text-gray-500">{count} students</span>
                    </div>
                  ))}
              </div>
            </div>
            
            {/* Companies by Roles */}
            <div className="pt-4 mt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Companies by Role</h4>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(Object.entries(students.reduce((acc, student) => {
                  if (student.role && student.company?.name) {
                    if (!acc[student.role]) {
                      acc[student.role] = new Set();
                    }
                    acc[student.role].add(student.company.name);
                  }
                  return acc;
                }, {})).reduce((acc, [role, companies]) => {
                  acc[role] = companies.size;
                  return acc;
                }, {}))
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 4)
                  .map(([role, companyCount], index) => (
                    <div key={index} className="p-3 rounded-lg bg-indigo-50 border border-indigo-100">
                      <p className="text-xs text-gray-500">{role}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="font-semibold text-indigo-700">{companyCount}</p>
                        <p className="text-xs text-gray-500">companies</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
