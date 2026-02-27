const router = require("express").Router();

const controller = require("./auth.controller");
const { signUpValidator, logInValidator } = require("./auth.validator");

const validate = require("./../../../core/middleware/validate");
const auth = require("./../../../core/middleware/auth");

router.route("/signup").post(signUpValidator(), validate, controller.signUp);
router.route("/login").post(logInValidator(), validate, controller.logIn);
router.route("/refresh").post(controller.getAccessToken);
router.route("/me").get(auth, controller.getMe);
router.route("/logout").post(controller.logOut);

module.exports = router;
