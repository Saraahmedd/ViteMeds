export const validateEmail = (email) => {
  // Simple email validation (you may use a more sophisticated validation library)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phoneNumber) => {
  // Validate phone number length
  return phoneNumber.length === 11;
};
export const validateOTP = (OTP) => {
  // Validate phone number length
  return OTP.length === 6;
};
export const validatePassword = (password) => {
  // Validate password (at least 8 characters, 1 uppercase, 1 digit)
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

export function formatDateToDDMMYYYY(isoDate) {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based, so add 1.
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
