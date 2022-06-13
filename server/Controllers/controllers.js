const mongoose = require("mongoose");
const Task = require("../Models/Schema");

const getAllTasks = async (req, res) => {
  let tasks = await Task.find({});
  res.status(200).json({ tasks });
};

const createTask = async (req, res) => {
  if (req.body.name) {
    let task = await Task.create(req.body);
    res.status(201).json({ task });
  } else res.status(400).json({ error: "Enter a task" });
};

const getOneTask = async (req, res) => {
  let task = await Task.find({ _id: req.params.id });

  res.status(200).json({ task });
};

const updateTask = async (req, res) => {
  try {
    let task = await Task.findOne({ _id: req.params.id });

    let { name = null } = req.body;

    if (name !== null) {
      task.name = name;
      await task.save();
      res.send("patching working");
      return;
    }

    task.completed = !task.completed;
    await task.save();
    res.send("patching working");
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (req, res) => {
  let task = await Task.deleteOne({ _id: req.params.id });
  res.send("delete working");
};

module.exports = {
  getAllTasks,
  createTask,
  getOneTask,
  updateTask,
  deleteTask,
};
