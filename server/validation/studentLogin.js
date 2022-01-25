const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateStudentLoginInput = (data) => {
  let errors = {};
  data.registrationNumber = !isEmpty(data.registrationNumber)
    ? data.registrationNumber
    : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.registrationNumber, { min: 12, max: 12 })) {
    errors.registrationNumber =
      "Registration number must be 12 characters long";
  }

  if (Validator.isEmpty(data.registrationNumber)) {
    errors.registrationNumber = "Registration number is a required field";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateStudentLoginInput;
