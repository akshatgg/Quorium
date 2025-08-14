import React from 'react';

const Dashboard = ({ studentCount, students = [] }) => {
  // Calculate statistics
  const activeStudents = students.filter(student => student.status === 'Active').length;
  const inactiveStudents = students.filter(student => student.status === 'Inactive').length;
  const graduatedStudents = students.filter(student => student.status === 'Graduated').length;
  const totalCourses = [...new Set(students.map(student => student.course))].length;

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

  const recentActivities = [
    { action: 'New student registered', name: 'John Doe', time: '2 hours ago', type: 'success' },
    { action: 'Course enrollment', name: 'Jane Smith', time: '4 hours ago', type: 'info' },
    { action: 'Profile updated', name: 'Mike Johnson', time: '6 hours ago', type: 'warning' },
    { action: 'Student graduated', name: 'Sarah Wilson', time: '1 day ago', type: 'success' }
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
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'info' ? 'bg-blue-500' :
                  activity.type === 'warning' ? 'bg-amber-500' : 'bg-gray-500'
                }`}>
                  {activity.type === 'success' ? '✓' :
                   activity.type === 'info' ? 'ℹ' :
                   activity.type === 'warning' ? '⚠' : '•'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {activity.name}
                  </p>
                </div>
                <div className="text-xs text-gray-400 whitespace-nowrap">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                ➕
              </div>
              <div>
                <p className="font-medium text-gray-900">Add New Student</p>
                <p className="text-sm text-gray-500">Register a new student</p>
              </div>
            </button>
            
            <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 group">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                📊
              </div>
              <div>
                <p className="font-medium text-gray-900">Generate Report</p>
                <p className="text-sm text-gray-500">Export student data</p>
              </div>
            </button>
            
            <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group">
              <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-200">
                ⚙️
              </div>
              <div>
                <p className="font-medium text-gray-900">Settings</p>
                <p className="text-sm text-gray-500">Configure system</p>
              </div>
            </button>
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
