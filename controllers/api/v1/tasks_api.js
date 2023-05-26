const Task = require("../../../models/task");

module.exports.createTask = async (req, res) => {
  try {
    const { content, category, due_date } = req.body;
    let user = req.user;

    const newTask = await Task.create({
      content,
      category,
      due_date,
      user,
      done: false,
    });

    return res.status(201).json({
      message: "Task created successfully",
      data: {
        task: newTask,
      },
    });
  } catch (error) {
    console.log("*********", error);
    return res.status(500).json({ error: error.message });
  }
};

// Delete a task by ID
module.exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    let task = await Task.findById(taskId);

    if (task.user == req.user.id) {
      // Find and delete the task by ID
      const deletedTask = await Task.findByIdAndDelete(taskId);

      if (!deletedTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      return res.status(200).json({ message: "Task deleted successfully" });
    } else {
      return res.json(401, {
        message: "you cannot delete this task",
      });
    }
  } catch (error) {
    console.log("*********", error);
    return res.status(500).json({ error: error.message });
  }
};

// Update a task by ID
module.exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { content, category, due_date } = req.body;

    let task = await Task.findById(taskId);

    if (task.user == req.user.id) {
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { content, category, due_date },
        { new: true }
      );

      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      return res.status(200).json({
        message: "Task updated",
        data: {
          task: updatedTask,
        },
      });
    } else {
      return res.json(401, {
        message: "you cannot update this task",
      });
    }
    // Find and update the task by ID
  } catch (error) {
    console.log("*********", error);
    return res.status(500).json({ error: error.message });
  }
};

// Mark a task as done
module.exports.markTaskAsDone = async (req, res) => {
  try {
    const { taskId } = req.params;
    let task = await Task.findById(taskId);

    if (task.user == req.user.id) {
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { done: true },
        { new: true }
      );

      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      return res.status(200).json({
        message: "Task mark as done",
        data: {
          task: updatedTask,
        },
      });
    } else {
      return res.json(401, {
        message: "you cannot update this post",
      });
    }

    // Find and update the task by ID
  } catch (error) {
    console.log("*********", error);
    return res.status(500).json({ error: error.message });
  }
};

// Mark a task as undone
module.exports.markTaskAsUndone = async (req, res) => {
  try {
    const { taskId } = req.params;
    let task = await Task.findById(taskId);

    if (task.user == req.user.id) {
      // Find and update the task by ID
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { done: false },
        { new: true }
      );

      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      return res.status(200).json({
        message: "Task mark as undone",
        data: {
          task: updatedTask,
        },
      });
    } else {
      return res.json(401, {
        message: "you cannot delete this post",
      });
    }
  } catch (error) {
    console.log("*********", error);
    return res.status(500).json({ error: error.message });
  }
};
