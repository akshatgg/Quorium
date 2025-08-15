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

/**
 * Transform user data from DummyJSON API to student format
 * @param {Array} users - Array of user objects from API
 * @returns {Array} Array of transformed student objects
 */
const transformUsersToStudents = (users) => {
  return users.map((user) => {
    // Generate a unique student ID using the API's ID
    const studentId = `STU${String(user.id).padStart(6, '0')}`;
    
    // Use only the fields directly from the API, no random data
    return {
      // Core user data
      id: user.id,
      studentId,
      firstName: user.firstName,
      lastName: user.lastName,
      maidenName: user.maidenName,
      age: user.age,
      gender: user.gender,
      email: user.email,
      phone: user.phone,
      username: user.username,
      password: user.password,
      birthDate: user.birthDate,
      image: user.image,
      
      // Physical characteristics
      bloodGroup: user.bloodGroup,
      height: user.height,
      weight: user.weight,
      eyeColor: user.eyeColor,
      hairColor: user.hair?.color,
      hairType: user.hair?.type,
      
      // Address information
      address: formatAddress(user.address),
      ip: user.ip,
      macAddress: user.macAddress,
      
      // Education and work
      university: user.university,
      company: user.company?.name,
      department: user.company?.department,
      jobTitle: user.company?.title,
      
      // Financial data
      bankCardNumber: user.bank?.cardNumber,
      bankCardExpire: user.bank?.cardExpire,
      bankCardType: user.bank?.cardType,
      
      // Other data
      ein: user.ein,
      ssn: user.ssn,
      userAgent: user.userAgent,
      crypto: user.crypto ? {
        coin: user.crypto.coin,
        wallet: user.crypto.wallet,
        network: user.crypto.network
      } : null,
      role: user.role
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
    // Fetch all 30 users from the API
    const response = await fetch('https://dummyjson.com/users');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Fetched ${data.users.length} users from API`);
    
    // Pass the raw user data to the transform function
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
    image: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&size=200`,
    address: `${Math.floor(Math.random() * 9999) + 1} Main St, Anytown, State ${Math.floor(Math.random() * 99999) + 10000}`,
    enrollmentDate: new Date().toISOString().split('T')[0], // Today's date for new students
    gender: ['Male', 'Female', 'Other'][Math.floor(Math.random() * 3)],
    emergencyContact: generateEmergencyContact(firstName, lastName),
    emergencyPhone: generatePhoneNumber(),
    dateOfBirth: calculateDateOfBirth(age),
    role: ['user', 'admin', 'moderator'][Math.floor(Math.random() * 3)]
  };
};

// Export only the required functions
export default {
  fetchStudentData,
  createMockStudent
};
