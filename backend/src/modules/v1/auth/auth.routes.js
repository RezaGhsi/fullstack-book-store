const router = require("express").Router();

const controller = require("./auth.controller");
const { signUpValidator, logInValidator } = require("./auth.validator");

const validate = require("./../../../core/middleware/validate");
const auth = require("./../../../core/middleware/auth");
const { checkExact } = require("express-validator");

router.route("/signup").post(signUpValidator(), validate, controller.signUp);
router.route("/login").post(logInValidator(), validate, controller.logIn);

module.exports = router;
