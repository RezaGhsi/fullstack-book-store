const router = require("express").Router();

const controller = require("./user.controller");
const userValidator = require("./user.validator");
const validate = require("./../../../core/middleware/validate");

router
  .route("/")
  .get(controller.getAll)
  .post(userValidator(), validate, controller.create);

router
  .route("/:id")
  .get(controller.getOne)
  .delete(controller.deleteOne)
  .put(controller.updateOne);

module.exports = router;
