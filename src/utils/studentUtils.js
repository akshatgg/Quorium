// Utility functions for student data transformation

const transformUsersToStudents = (users) => {
  return users.map((user) => {
    const studentId = `STU${String(user.id).padStart(6, '0')}`;
    
    return {
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

      bloodGroup: user.bloodGroup,
      height: user.height,
      weight: user.weight,
      eyeColor: user.eyeColor,
      hairColor: user.hair?.color,
      hairType: user.hair?.type,

      address: formatAddress(user.address),
      ip: user.ip,
      macAddress: user.macAddress,

      university: user.university,
      company: user.company?.name,
      department: user.company?.department,
      jobTitle: user.company?.title,

      bankCardNumber: user.bank?.cardNumber,
      bankCardExpire: user.bank?.cardExpire,
      bankCardType: user.bank?.cardType,

      ein: user.ein,
      ssn: user.ssn,
      userAgent: user.userAgent,
      crypto: user.crypto
        ? {
            coin: user.crypto.coin,
            wallet: user.crypto.wallet,
            network: user.crypto.network,
          }
        : null,
      role: user.role,
    };
  });
};

const formatAddress = (address) => {
  if (!address) return 'Address not provided';
  
  const parts = [
    address.address,
    address.city,
    address.state,
    address.postalCode,
  ].filter(part => part && part.trim());
  
  return parts.join(', ') || 'Address not provided';
};

export const fetchStudentData = async () => {
  try {
    const response = await fetch('https://dummyjson.com/users');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Fetched ${data.users.length} users from API`);
    
    return transformUsersToStudents(data.users);
  } catch (error) {
    console.error('Error fetching student data:', error);
    throw error;
  }
};

export default {
  fetchStudentData,
};
