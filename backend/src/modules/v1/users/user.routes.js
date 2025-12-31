const router = require("express").Router();

const controller = require("./user.controller");

const auth = require("./../../../core/middleware/auth");
const isAdmin = require("./../../../core/middleware/isAdmin");

router.route("/").get(auth, isAdmin, controller.getAll);

router
  .route("/:id")
  .get(auth, isAdmin, controller.getOne)
  .delete(auth, isAdmin, controller.deleteOne)
  .put(auth, isAdmin, controller.updateOne);

module.exports = router;
