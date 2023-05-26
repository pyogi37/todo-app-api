const express = require("express");
const router = express.Router();
const usersApi = require("../../../controllers/api/v1/users_api");
const passport = require("passport");

router.post("/create-session", usersApi.createSession);
router.post("/create", usersApi.create);
router.get(
  "/tasks",
  passport.authenticate("jwt", { session: false }),
  usersApi.getAllTasksByUser
);
router.get(
  "/tasks/:category",
  passport.authenticate("jwt", { session: false }),
  usersApi.getUserTasksByCategory
);

module.exports = router;
