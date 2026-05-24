const express = require("express");
const Task = require("../models/task");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      completed: req.body.completed,
    });

    req.app.locals.logger.info(`Task created: ${task._id}`);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
