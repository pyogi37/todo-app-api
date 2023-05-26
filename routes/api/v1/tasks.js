const express = require("express");
const router = express.Router();
const tasksApi = require("../../../controllers/api/v1/tasks_api");
const passport = require("passport");

// Create a new task for a user
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  tasksApi.createTask
);

// Delete a task by ID
router.delete(
  "/delete/:taskId",
  passport.authenticate("jwt", { session: false }),
  tasksApi.deleteTask
);

// Update a task by ID
router.put(
  "/update/:taskId",
  passport.authenticate("jwt", { session: false }),
  tasksApi.updateTask
);

// Mark a task as done
router.patch(
  "/update/:taskId/done",
  passport.authenticate("jwt", { session: false }),
  tasksApi.markTaskAsDone
);

// Mark a task as undone
router.patch(
  "/update/:taskId/undone",
  passport.authenticate("jwt", { session: false }),
  tasksApi.markTaskAsUndone
);

module.exports = router;
