const router = require("express").Router();
const controller = require("./category.controller");

router.route("/").get(controller.getAll).post(controller.create);

module.exports = router;
