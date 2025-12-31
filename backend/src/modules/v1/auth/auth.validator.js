const { body, checkExact } = require("express-validator");

exports.signUpValidator = () => {
  return [
    body(["name", "lastName"])
      .isString()
      .withMessage("name or lastName Type is Not valid !!")
      .isLength({ min: 3, max: 20 })
      .withMessage(
        "name and lastName has to be minimum 3 and maximum 20 characters"
      ),

    body("username")
      .isString()
      .withMessage("username Type is Not valid !!")
      .isLength({ min: 6, max: 25 })
      .withMessage("username has to be minimum 6 and maximum 25 characters"),

    body("email").isEmail().withMessage("email Format is Not valid !!"),

    // body("phone")
    //   .isMobilePhone(["fa-IR"])
    //   .withMessage("phone number is not valid !!"),

    body("password")
      .isString()
      .withMessage("password type is not valid !!")
      .isLength({ min: 6, max: 24 })
      .withMessage("password has to be minimum 6 and maximum 24 characters"),

    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("confirmPassword is not equal to password !!");
      } else return true;
    }),

    // checkExact(),
  ];
};

exports.logInValidator = () => {
  return [
    body(["identifier", "password"])
      .exists()
      .isEmpty()
      .isString()
      .withMessage("Wrong identifier Type !!"),

    checkExact(),
  ];
};
