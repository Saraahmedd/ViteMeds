export const validateEmail = (email) => {
  // Simple email validation (you may use a more sophisticated validation library)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phoneNumber) => {
  // Validate phone number length
  return phoneNumber.length === 10;
};

export const validatePassword = (password) => {
  // Validate password (at least 8 characters, 1 uppercase, 1 digit)
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};
