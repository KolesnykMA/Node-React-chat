const UserService = require('../services/userService');

const validateCreateUser = (req, res, next) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    const newPhoneNumber = !isNaN(phoneNumber) ? phoneNumber.toString() : phoneNumber;

    if (!firstName || !lastName || !email || !newPhoneNumber || !password) {
      throw new validationError('Missing first name or last name or email or phone or password');
    }
    const newEmail = email.toLowerCase();
    if (validateEmailExists(newEmail)) {
      throw new validationError('User with email exists');
    }
    if (!validateEmailDomain(newEmail)) {
      throw new validationError('Email is not gmail');
    }
    if (!validateEmailLength(newEmail)) {
      throw new validationError('Email name minimum lenghth is 6 charachters');
    }
    if(validatePhoneExists(newPhoneNumber)) {
      throw new validationError('User with phone exists');
    }
    if (!validatePhoneNumber(newPhoneNumber)) {
      throw new validationError('Phone must be in +380xxxxxxxxx format');
    }
    if (!validatePassword(password)) {
      throw new validationError('Password minimum length is 3 charachters');
    }
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: newEmail,
      phoneNumber: newPhoneNumber,
      password: password
    }
    res.validationData = newUser;
  } catch (error) {
    res.err = error;
  }
  next();
}

const validateUpdateUser = (req, res, next) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    const userId = req.params.id;
    const currentUser = UserService.search({id: userId});
    let newEmail = '';

    if (!currentUser) {
      throw new validationError('User not found');
    }

    // if (!firstName || !lastName || !email || !newPhoneNumber || !password) {
    //   throw new validationError('Missing first name or last name or email or phone or password');
    // }

    if (email) {
      newEmail = email.toLowerCase();
      if (validateEmailExists(newEmail) && newEmail !== currentUser.email) {
        throw new validationError('User with email exists');
      }
      if (!validateEmailDomain(newEmail)) {
        throw new validationError('Email is not gmail');
      }
      if (!validateEmailLength(newEmail)) {
        throw new validationError('Email name minimum lenghth is 6 charachters');
      }
    }
    if (phoneNumber) {
      const newPhoneNumber = !isNaN(phoneNumber) ? phoneNumber.toString() : phoneNumber;
      if(validatePhoneExists(newPhoneNumber) && newPhoneNumber !== currentUser.phoneNumber) {
        throw new validationError('User with phone exists');
      }
      if (!validatePhoneNumber(newPhoneNumber)) {
        throw new validationError('Phone must be in +380xxxxxxxxx format');
      }
    }

    if (password && !validatePassword(password)) {
      throw new validationError('Password minimum length is 3 charachters');
    }
    const newUser = {
      firstName: firstName || currentUser.firstName,
      lastName: lastName || currentUser.lastName,
      email: newEmail || currentUser.email,
      phoneNumber: phoneNumber || currentUser.phoneNumber,
      password: password || currentUser.password
    }
    res.validationData = newUser;
  } catch (error) {
    res.err = error;
  }
  next();
}

const validateGetUser = (req, res, next) => {
  // try {
    const userId = req.params.id;
    const currentUser = UserService.getById({ _id: userId });

    if (!currentUser) {
      throw new searchError('USER_NOT_FOUND');
    }
  // }catch (error) {
  //   res.err = error;
  // }
  next();
}


module.exports = {
  validateGetUser
};