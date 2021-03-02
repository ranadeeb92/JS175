const {body} = require("express-validator");

const validateName = (name) => {
  return body(name)
    .trim()
    .isLength({min : 1})
    .withMessage(`${name.split('N')[0]} name is required.`)
    .bail()
    .isLength({max : 25})
    .withMessage(`${name.split('N')[0]} name is too long. Maximum length is 25 characters`)
    .isAlpha()
    .withMessage(`${name.split('N')[0]} name contains invalid characters. The name must be alphabetic`)
}

const validatePhoneNumber = () => {
  return  body("phoneNumber")
    .trim()
    .isLength({min : 1})
    .withMessage("Phone number is required")
    .bail()
    .isMobilePhone("en-US")
    .withMessage("Invalid phone number format. Use ###-###-####")
} 

module.exports = {
  validateName,
  validatePhoneNumber
}