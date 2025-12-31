const router = require("express").Router();
const controller = require("./book.controller");

router.route("/").get(controller.getAll).post(controller.create);

router.route("/:id").get(controller.getOne).delete(controller.deleteOne);

router.route("/search/:term").post(controller.search);

module.exports = router;
