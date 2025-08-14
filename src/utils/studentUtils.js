// Utility functions for student data transformation

const courses = [
  'Computer Science',
  'Software Engineering',
  'Data Science',
  'Artificial Intelligence',
  'Cybersecurity',
  'Web Development',
  'Mobile Development',
  'Business Administration',
  'Digital Marketing',
  'Finance',
  'Accounting',
  'Management',
  'Engineering - Civil',
  'Engineering - Mechanical',
  'Engineering - Electrical',
  'Engineering - Chemical',
  'Medicine',
  'Nursing',
  'Pharmacy',
  'Dentistry',
  'Mathematics',
  'Statistics',
  'Physics',
  'Chemistry',
  'Biology',
  'Environmental Science',
  'Psychology',
  'Sociology',
  'Political Science',
  'Economics',
  'Literature',
  'Linguistics',
  'History',
  'Philosophy',
  'Art & Design',
  'Music',
  'Theater Arts',
  'Communications'
];

const statuses = ['Active', 'Inactive', 'Graduated', 'Suspended', 'On Leave'];

/**
 * Transform user data from DummyJSON API to student format
 * @param {Array} users - Array of user objects from API
 * @returns {Array} Array of transformed student objects
 */
export const transformUsersToStudents = (users) => {
  return users.map((user, index) => {
    // Generate a unique student ID
    const studentId = `STU${String(user.id).padStart(6, '0')}`;
    
    // Assign random course and status with weighted distribution
    const course = courses[Math.floor(Math.random() * courses.length)];
    
    // Weight status distribution: 70% Active, 15% Graduated, 10% Inactive, 5% others
    const statusWeights = [70, 85, 95, 100]; // Cumulative weights
    const rand = Math.random() * 100;
    let status;
    if (rand < statusWeights[0]) status = 'Active';
    else if (rand < statusWeights[1]) status = 'Graduated';
    else if (rand < statusWeights[2]) status = 'Inactive';
    else status = Math.random() > 0.5 ? 'Suspended' : 'On Leave';
    
    return {
      id: user.id,
      studentId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      age: user.age,
      course,
      status,
      image: user.image,
      // Additional student-specific fields
      address: formatAddress(user.address),
      enrollmentDate: generateRandomDate(),
      gender: user.gender || 'Not specified',
      emergencyContact: generateEmergencyContact(user.firstName, user.lastName),
      emergencyPhone: generatePhoneNumber(),
      dateOfBirth: calculateDateOfBirth(user.age)
    };
  });
};

/**
 * Format address from user object
 * @param {Object} address - Address object from API
 * @returns {string} Formatted address string
 */
const formatAddress = (address) => {
  if (!address) return 'Address not provided';
  
  const parts = [
    address.address,
    address.city,
    address.state,
    address.postalCode
  ].filter(part => part && part.trim());
  
  return parts.join(', ') || 'Address not provided';
};

/**
 * Generate a random enrollment date within the last 4 years
 * @returns {string} Date in YYYY-MM-DD format
 */
const generateRandomDate = () => {
  const end = new Date();
  const start = new Date(end.getFullYear() - 4, 0, 1);
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return randomDate.toISOString().split('T')[0];
};

/**
 * Generate emergency contact name based on student name
 * @param {string} firstName 
 * @param {string} lastName 
 * @returns {string} Emergency contact name
 */
const generateEmergencyContact = (firstName, lastName) => {
  const relationships = ['Parent', 'Guardian', 'Spouse', 'Sibling', 'Relative'];
  const relationship = relationships[Math.floor(Math.random() * relationships.length)];
  
  // Generate a related name
  const firstNames = [
    'John', 'Jane', 'Michael', 'Sarah', 'David', 'Lisa', 'Robert', 'Maria',
    'James', 'Jennifer', 'William', 'Patricia', 'Richard', 'Elizabeth',
    'Joseph', 'Linda', 'Thomas', 'Barbara', 'Christopher', 'Susan'
  ];
  const emergencyFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  
  return `${emergencyFirstName} ${lastName} (${relationship})`;
};

/**
 * Generate a random phone number
 * @returns {string} Phone number
 */
const generatePhoneNumber = () => {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const exchange = Math.floor(Math.random() * 900) + 100;
  const number = Math.floor(Math.random() * 9000) + 1000;
  return `(${areaCode}) ${exchange}-${number}`;
};

/**
 * Calculate date of birth based on age
 * @param {number} age 
 * @returns {string} Date of birth in YYYY-MM-DD format
 */
const calculateDateOfBirth = (age) => {
  const today = new Date();
  const birthYear = today.getFullYear() - age;
  const birthMonth = Math.floor(Math.random() * 12);
  const birthDay = Math.floor(Math.random() * 28) + 1; // Use 28 to avoid invalid dates
  
  const birthDate = new Date(birthYear, birthMonth, birthDay);
  return birthDate.toISOString().split('T')[0];
};

/**
 * Fetch and transform student data from DummyJSON API
 * @returns {Promise<Array>} Promise that resolves to array of student objects
 */
export const fetchStudentData = async () => {
  try {
    const response = await fetch('https://dummyjson.com/users?limit=50');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return transformUsersToStudents(data.users);
  } catch (error) {
    console.error('Error fetching student data:', error);
    throw error;
  }
};

/**
 * Create a mock student for demo purposes
 * @returns {Object} Student object
 */
export const createMockStudent = () => {
  const firstNames = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Avery', 'Blake', 'Cameron'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const age = Math.floor(Math.random() * 15) + 18; // 18-32 years old
  
  return {
    id: Date.now(),
    studentId: `STU${Date.now().toString().slice(-6)}`,
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
    phone: generatePhoneNumber(),
    age,
    course: courses[Math.floor(Math.random() * courses.length)],
    status: 'Active', // Default new students to Active
    image: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&size=200`,
    address: `${Math.floor(Math.random() * 9999) + 1} Main St, Anytown, State ${Math.floor(Math.random() * 99999) + 10000}`,
    enrollmentDate: new Date().toISOString().split('T')[0], // Today's date for new students
    gender: ['Male', 'Female', 'Other'][Math.floor(Math.random() * 3)],
    emergencyContact: generateEmergencyContact(firstName, lastName),
    emergencyPhone: generatePhoneNumber(),
    dateOfBirth: calculateDateOfBirth(age)
  };
};

/**
 * Validate student data
 * @param {Object} student - Student object to validate
 * @returns {Object} Validation result with isValid boolean and errors array
 */
export const validateStudent = (student) => {
  const errors = [];
  
  if (!student.firstName || student.firstName.trim().length < 2) {
    errors.push('First name must be at least 2 characters long');
  }
  
  if (!student.lastName || student.lastName.trim().length < 2) {
    errors.push('Last name must be at least 2 characters long');
  }
  
  if (!student.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)) {
    errors.push('Valid email address is required');
  }
  
  if (!student.phone || student.phone.length < 10) {
    errors.push('Valid phone number is required');
  }
  
  if (!student.age || student.age < 16 || student.age > 100) {
    errors.push('Age must be between 16 and 100');
  }
  
  if (!student.course) {
    errors.push('Course selection is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Generate student statistics
 * @param {Array} students - Array of student objects
 * @returns {Object} Statistics object
 */
export const generateStudentStats = (students) => {
  const stats = {
    total: students.length,
    byStatus: {},
    byCourse: {},
    byGender: {},
    averageAge: 0,
    ageRange: { min: 0, max: 0 }
  };
  
  let totalAge = 0;
  let minAge = Infinity;
  let maxAge = -Infinity;
  
  students.forEach(student => {
    // Status statistics
    stats.byStatus[student.status] = (stats.byStatus[student.status] || 0) + 1;
    
    // Course statistics
    stats.byCourse[student.course] = (stats.byCourse[student.course] || 0) + 1;
    
    // Gender statistics
    stats.byGender[student.gender] = (stats.byGender[student.gender] || 0) + 1;
    
    // Age statistics
    totalAge += student.age;
    minAge = Math.min(minAge, student.age);
    maxAge = Math.max(maxAge, student.age);
  });
  
  stats.averageAge = students.length > 0 ? Math.round(totalAge / students.length) : 0;
  stats.ageRange = { min: minAge === Infinity ? 0 : minAge, max: maxAge === -Infinity ? 0 : maxAge };
  
  return stats;
};

export default {
  transformUsersToStudents,
  fetchStudentData,
  createMockStudent,
  validateStudent,
  generateStudentStats
};

// Fetch and transform students data
export const fetchStudentsData = async () => {
  try {
    const response = await fetch('https://dummyjson.com/users');
    const data = await response.json();
    
    return data.users.map(transformUserToStudent);
  } catch (error) {
    console.error('Error fetching students data:', error);
    throw new Error('Failed to fetch students data');
  }
};

// Generate sample data for demonstration
export const generateSampleStudents = () => {
  const sampleUsers = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe", 
      email: "john.doe@example.com",
      phone: "+1-234-567-8901",
      age: 20,
      image: "https://ui-avatars.com/api/?name=John+Doe&background=random"
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com", 
      phone: "+1-234-567-8902",
      age: 22,
      image: "https://ui-avatars.com/api/?name=Jane+Smith&background=random"
    },
    {
      id: 3,
      firstName: "Mike",
      lastName: "Johnson",
      email: "mike.johnson@example.com",
      phone: "+1-234-567-8903", 
      age: 21,
      image: "https://ui-avatars.com/api/?name=Mike+Johnson&background=random"
    }
  ];

  return sampleUsers.map(transformUserToStudent);
};
