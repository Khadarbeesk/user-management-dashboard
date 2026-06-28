// src/utils/validators.js

export const validateUser = (user) => {
  const errors = {};

  // First Name
  if (!user.firstName.trim()) {
    errors.firstName = "First Name is required";
  }

  // Last Name
  if (!user.lastName.trim()) {
    errors.lastName = "Last Name is required";
  }

  // Email
  if (!user.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(user.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Department
  if (!user.department.trim()) {
    errors.department = "Department is required";
  }

  return errors;
};