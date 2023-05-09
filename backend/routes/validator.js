const { body } = require("express-validator");

const signup = [
  body("username", "Please enter valid username").exists().trim().notEmpty(),
  body("email", "Please enter valid email")
    .exists()
    .trim()
    .notEmpty()
    .isEmail()
    .normalizeEmail(),
  body(
    "password",
    `Password should be Between 8-16 characters long. And it should contain Atleast One Number, One Special Character, One Uppercase and One Lowercase.`
  )
    .exists()
    .trim()
    .notEmpty()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[|)(@\<{}>[\]/$!%*?:;.,=&_#~"'`^+-])[A-Za-z\d|)(@\<{}>[\]/$!%*?:;.,=&_#~"'`^+-]{8,16}$/
    ),
];

const login = [
  body("username", "Please enter valid username").exists().trim().notEmpty(),
  body("email", "Please enter a valid email")
    .exists()
    .trim()
    .notEmpty()
    .isEmail()
    .normalizeEmail(),
  body("password", "Password is required.").exists().trim().notEmpty(),
];

module.exports = {
  signup,
  login,
};
