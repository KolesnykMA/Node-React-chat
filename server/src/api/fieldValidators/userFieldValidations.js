function validateEmailExists(userEmail) {
  const user = UserService.search({email: userEmail});
  return user || null;
}

function validatePhoneExists(phone) {
  const user = UserService.search({phoneNumber: phone});
  return user || null;
}

function validateEmailDomain(email) {
  const emailRegex = /@gmail\.com$/;
  return emailRegex.test(email);
}

function validateEmailLength(email) {
  return email.length >= 16;
}

function validatePhoneNumber(phoneNumber) {
  const phoneRegex = /^\+?3?8?(0\d{9})$/;
  return phoneRegex.test(phoneNumber) && phoneNumber.indexOf('+') > -1;
}

function validatePassword(password) {
  return password.length >= 3;
}