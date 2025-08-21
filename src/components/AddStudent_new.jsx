import React, { useState } from 'react';

const AddStudent = ({ onAddStudent, existingStudents = [] }) => {
  const [formData, setFormData] = useState({
    // Basic Information
    firstName: '',
    lastName: '',
    maidenName: '',
    age: '',
    gender: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    birthDate: '',
    image: '',
    bloodGroup: '',
    height: '',
    weight: '',
    eyeColor: '',
    // Hair Information
    hairColor: '',
    hairType: '',
    // Address Information
    address: '',
    city: '',
    state: '',
    stateCode: '',
    postalCode: '',
    country: '',
    // Network Information
    ip: '',
    macAddress: '',
    // Education
    university: '',
    course: '',
    status: 'Active',
    // Bank Information
    cardExpire: '',
    cardNumber: '',
    cardType: '',
    currency: '',
    iban: '',
    // Company Information
    companyDepartment: '',
    companyName: '',
    companyTitle: '',
    companyAddress: '',
    companyCity: '',
    companyState: '',
    companyStateCode: '',
    companyPostalCode: '',
    companyCountry: '',
    // Additional Information
    ein: '',
    ssn: '',
    userAgent: '',
    // Crypto Information
    cryptoCoin: '',
    cryptoWallet: '',
    cryptoNetwork: '',
    role: 'student'
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  
  const courses = [
    'Computer Science', 'Software Engineering', 'Data Science', 'Artificial Intelligence',
    'Cybersecurity', 'Web Development', 'Mobile Development', 'Business Administration',
    'Digital Marketing', 'Finance', 'Accounting', 'Management', 'Engineering - Civil',
    'Engineering - Mechanical', 'Engineering - Electrical', 'Engineering - Chemical',
    'Medicine', 'Nursing', 'Pharmacy', 'Dentistry', 'Mathematics', 'Statistics',
    'Physics', 'Chemistry', 'Biology', 'Environmental Science', 'Psychology'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.birthDate) newErrors.birthDate = 'Birth date is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.university.trim()) newErrors.university = 'University is required';
    if (!formData.course) newErrors.course = 'Course is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Check for duplicate email
    if (formData.email && existingStudents.some(student => student.email === formData.email)) {
      newErrors.email = 'A student with this email already exists';
    }

    // Check for duplicate username
    if (formData.username && existingStudents.some(student => student.username === formData.username)) {
      newErrors.username = 'This username is already taken';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const newStudent = {
        id: Date.now(),
        studentId: `STU${String(Date.now()).slice(-6)}`,
        ...formData,
        hair: {
          color: formData.hairColor,
          type: formData.hairType
        },
        address: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          stateCode: formData.stateCode,
          postalCode: formData.postalCode,
          country: formData.country
        },
        bank: {
          cardExpire: formData.cardExpire,
          cardNumber: formData.cardNumber,
          cardType: formData.cardType,
          currency: formData.currency,
          iban: formData.iban
        },
        company: {
          department: formData.companyDepartment,
          name: formData.companyName,
          title: formData.companyTitle,
          address: {
            address: formData.companyAddress,
            city: formData.companyCity,
            state: formData.companyState,
            stateCode: formData.companyStateCode,
            postalCode: formData.companyPostalCode,
            country: formData.companyCountry
          }
        },
        crypto: {
          coin: formData.cryptoCoin,
          wallet: formData.cryptoWallet,
          network: formData.cryptoNetwork
        },
        enrollmentDate: new Date().toISOString().split('T')[0]
      };

      await onAddStudent(newStudent);
      
      // Clear form
      setFormData({
        firstName: '', lastName: '', maidenName: '', age: '', gender: '', email: '',
        phone: '', username: '', password: '', birthDate: '', image: '', bloodGroup: '',
        height: '', weight: '', eyeColor: '', hairColor: '', hairType: '', address: '',
        city: '', state: '', stateCode: '', postalCode: '', country: '', ip: '',
        macAddress: '', university: '', course: '', status: 'Active', cardExpire: '',
        cardNumber: '', cardType: '', currency: '', iban: '', companyDepartment: '',
        companyName: '', companyTitle: '', companyAddress: '', companyCity: '',
        companyState: '', companyStateCode: '', companyPostalCode: '', companyCountry: '',
        ein: '', ssn: '', userAgent: '', cryptoCoin: '', cryptoWallet: '',
        cryptoNetwork: '', role: 'student'
      });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

    } catch (error) {
      console.error('Error adding student:', error);
      alert('Failed to add student. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearForm = () => {
    setFormData({
      firstName: '', lastName: '', maidenName: '', age: '', gender: '', email: '',
      phone: '', username: '', password: '', birthDate: '', image: '', bloodGroup: '',
      height: '', weight: '', eyeColor: '', hairColor: '', hairType: '', address: '',
      city: '', state: '', stateCode: '', postalCode: '', country: '', ip: '',
      macAddress: '', university: '', course: '', status: 'Active', cardExpire: '',
      cardNumber: '', cardType: '', currency: '', iban: '', companyDepartment: '',
      companyName: '', companyTitle: '', companyAddress: '', companyCity: '',
      companyState: '', companyStateCode: '', companyPostalCode: '', companyCountry: '',
      ein: '', ssn: '', userAgent: '', cryptoCoin: '', cryptoWallet: '',
      cryptoNetwork: '', role: 'student'
    });
    setErrors({});
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-gray-900">Add New Student</h2>
            <p className="text-gray-600 text-lg">
              Fill out the comprehensive form below to register a new student in the system
            </p>
            <div className="flex items-center mt-3 space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Comprehensive Registration</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>All Details Captured</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="text-6xl text-gray-300">📝</div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Student added successfully!
              </h3>
              <div className="mt-1 text-sm text-green-700">
                The new student has been registered in the system.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'basic', label: 'Basic Info', icon: '👤' },
              { id: 'personal', label: 'Personal Details', icon: '📋' },
              { id: 'address', label: 'Address', icon: '🏠' },
              { id: 'education', label: 'Education', icon: '🎓' },
              { id: 'company', label: 'Company', icon: '🏢' },
              { id: 'financial', label: 'Financial', icon: '💳' },
              { id: 'technical', label: 'Technical', icon: '💻' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 ${
                      errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 ${
                      errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                </div>

                {/* Maiden Name */}
                <div>
                  <label htmlFor="maidenName" className="block text-sm font-medium text-gray-700 mb-2">
                    Maiden Name
                  </label>
                  <input
                    type="text"
                    id="maidenName"
                    name="maidenName"
                    value={formData.maidenName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="Enter maiden name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter email address"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 ${
                      errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                {/* Username */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 ${
                      errors.username ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter username"
                  />
                  {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Personal Details Tab */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Age */}
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 ${
                      errors.age ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter age"
                  />
                  {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
                </div>

                {/* Gender */}
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 ${
                      errors.gender ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
                </div>

                {/* Birth Date */}
                <div>
                  <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Birth Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 ${
                      errors.birthDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.birthDate && <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>}
                </div>

                {/* Blood Group */}
                <div>
                  <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Group
                  </label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                  >
                    <option value="">Select blood group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                {/* Height */}
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="Enter height in cm"
                  />
                </div>

                {/* Weight */}
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="Enter weight in kg"
                  />
                </div>

                {/* Eye Color */}
                <div>
                  <label htmlFor="eyeColor" className="block text-sm font-medium text-gray-700 mb-2">
                    Eye Color
                  </label>
                  <input
                    type="text"
                    id="eyeColor"
                    name="eyeColor"
                    value={formData.eyeColor}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="Enter eye color"
                  />
                </div>

                {/* Hair Color */}
                <div>
                  <label htmlFor="hairColor" className="block text-sm font-medium text-gray-700 mb-2">
                    Hair Color
                  </label>
                  <input
                    type="text"
                    id="hairColor"
                    name="hairColor"
                    value={formData.hairColor}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="Enter hair color"
                  />
                </div>

                {/* Hair Type */}
                <div>
                  <label htmlFor="hairType" className="block text-sm font-medium text-gray-700 mb-2">
                    Hair Type
                  </label>
                  <select
                    id="hairType"
                    name="hairType"
                    value={formData.hairType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                  >
                    <option value="">Select hair type</option>
                    <option value="Straight">Straight</option>
                    <option value="Wavy">Wavy</option>
                    <option value="Curly">Curly</option>
                    <option value="Kinky">Kinky</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Address Tab */}
          {activeTab === 'address' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Address Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Street Address */}
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 ${
                      errors.address ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter street address"
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="Enter city"
                  />
                </div>

                {/* State */}
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="Enter state"
                  />
                </div>

                {/* State Code */}
                <div>
                  <label htmlFor="stateCode" className="block text-sm font-medium text-gray-700 mb-2">
                    State Code
                  </label>
                  <input
                    type="text"
                    id="stateCode"
                    name="stateCode"
                    value={formData.stateCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="Enter state code (e.g., CA)"
                  />
                </div>

                {/* Postal Code */}
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="Enter postal code"
                  />
                </div>

                {/* Country */}
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="Enter country"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Education Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* University */}
                <div>
                  <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-2">
                    University <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 ${
                      errors.university ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter university name"
                  />
                  {errors.university && <p className="mt-1 text-sm text-red-600">{errors.university}</p>}
                </div>

                {/* Course */}
                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
                    Course <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 ${
                      errors.course ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select course</option>
                    {courses.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                  {errors.course && <p className="mt-1 text-sm text-red-600">{errors.course}</p>}
                </div>

                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Graduated">Graduated</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>

                {/* Role */}
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                  >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Company Tab */}
          {activeTab === 'company' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Company Name */}
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="Enter company name"
                  />
                </div>

                {/* Department */}
                <div>
                  <label htmlFor="companyDepartment" className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    id="companyDepartment"
                    name="companyDepartment"
                    value={formData.companyDepartment}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="Enter department"
                  />
                </div>

                {/* Job Title */}
                <div>
                  <label htmlFor="companyTitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="companyTitle"
                    name="companyTitle"
                    value={formData.companyTitle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="Enter job title"
                  />
                </div>

                {/* Company Address */}
                <div className="md:col-span-2">
                  <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Address
                  </label>
                  <input
                    type="text"
                    id="companyAddress"
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="Enter company address"
                  />
                </div>

                {/* Company City */}
                <div>
                  <label htmlFor="companyCity" className="block text-sm font-medium text-gray-700 mb-2">
                    Company City
                  </label>
                  <input
                    type="text"
                    id="companyCity"
                    name="companyCity"
                    value={formData.companyCity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="Enter company city"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Financial Tab */}
          {activeTab === 'financial' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Financial Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card Number */}
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="Enter card number"
                  />
                </div>

                {/* Card Type */}
                <div>
                  <label htmlFor="cardType" className="block text-sm font-medium text-gray-700 mb-2">
                    Card Type
                  </label>
                  <select
                    id="cardType"
                    name="cardType"
                    value={formData.cardType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                  >
                    <option value="">Select card type</option>
                    <option value="Visa">Visa</option>
                    <option value="Mastercard">Mastercard</option>
                    <option value="American Express">American Express</option>
                    <option value="Discover">Discover</option>
                    <option value="Elo">Elo</option>
                  </select>
                </div>

                {/* Card Expiry */}
                <div>
                  <label htmlFor="cardExpire" className="block text-sm font-medium text-gray-700 mb-2">
                    Card Expiry (MM/YY)
                  </label>
                  <input
                    type="text"
                    id="cardExpire"
                    name="cardExpire"
                    value={formData.cardExpire}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="MM/YY"
                  />
                </div>

                {/* Currency */}
                <div>
                  <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <input
                    type="text"
                    id="currency"
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="Enter currency (e.g., USD)"
                  />
                </div>

                {/* EIN */}
                <div>
                  <label htmlFor="ein" className="block text-sm font-medium text-gray-700 mb-2">
                    EIN
                  </label>
                  <input
                    type="text"
                    id="ein"
                    name="ein"
                    value={formData.ein}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="Enter EIN"
                  />
                </div>

                {/* SSN */}
                <div>
                  <label htmlFor="ssn" className="block text-sm font-medium text-gray-700 mb-2">
                    SSN
                  </label>
                  <input
                    type="text"
                    id="ssn"
                    name="ssn"
                    value={formData.ssn}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="Enter SSN"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Technical Tab */}
          {activeTab === 'technical' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Technical Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* IP Address */}
                <div>
                  <label htmlFor="ip" className="block text-sm font-medium text-gray-700 mb-2">
                    IP Address
                  </label>
                  <input
                    type="text"
                    id="ip"
                    name="ip"
                    value={formData.ip}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="Enter IP address"
                  />
                </div>

                {/* MAC Address */}
                <div>
                  <label htmlFor="macAddress" className="block text-sm font-medium text-gray-700 mb-2">
                    MAC Address
                  </label>
                  <input
                    type="text"
                    id="macAddress"
                    name="macAddress"
                    value={formData.macAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="Enter MAC address"
                  />
                </div>

                {/* Crypto Coin */}
                <div>
                  <label htmlFor="cryptoCoin" className="block text-sm font-medium text-gray-700 mb-2">
                    Crypto Coin
                  </label>
                  <input
                    type="text"
                    id="cryptoCoin"
                    name="cryptoCoin"
                    value={formData.cryptoCoin}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="Enter crypto coin (e.g., Bitcoin)"
                  />
                </div>

                {/* Crypto Network */}
                <div>
                  <label htmlFor="cryptoNetwork" className="block text-sm font-medium text-gray-700 mb-2">
                    Crypto Network
                  </label>
                  <input
                    type="text"
                    id="cryptoNetwork"
                    name="cryptoNetwork"
                    value={formData.cryptoNetwork}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="Enter crypto network"
                  />
                </div>

                {/* Crypto Wallet */}
                <div className="md:col-span-2">
                  <label htmlFor="cryptoWallet" className="block text-sm font-medium text-gray-700 mb-2">
                    Crypto Wallet Address
                  </label>
                  <input
                    type="text"
                    id="cryptoWallet"
                    name="cryptoWallet"
                    value={formData.cryptoWallet}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
                    placeholder="Enter crypto wallet address"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={clearForm}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Clear Form
            </button>
            <div className="flex space-x-4">
              {activeTab !== 'basic' && (
                <button
                  type="button"
                  onClick={() => {
                    const tabs = ['basic', 'personal', 'address', 'education', 'company', 'financial', 'technical'];
                    const currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex > 0) {
                      setActiveTab(tabs[currentIndex - 1]);
                    }
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Previous
                </button>
              )}
              {activeTab !== 'technical' && (
                <button
                  type="button"
                  onClick={() => {
                    const tabs = ['basic', 'personal', 'address', 'education', 'company', 'financial', 'technical'];
                    const currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex < tabs.length - 1) {
                      setActiveTab(tabs[currentIndex + 1]);
                    }
                  }}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                >
                  Next
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                } text-white`}
              >
                {isSubmitting ? 'Adding Student...' : 'Add Student'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
