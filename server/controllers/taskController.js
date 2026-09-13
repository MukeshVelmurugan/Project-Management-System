import { Task, Project } from "../models/index.js";
import { Op } from "sequelize";
import createAudit from "../utils/createAudit.js";

// CREATE TASK
export const createTask = async (req, res) => {

  const task = await Task.create(req.body);

  await createAudit(
    req.user.id,
    `Created Task: ${task.name}`,
    "Tasks"
  );

  res.status(201).json(task);
};

// GET TASKS
export const getTasks = async (req, res) => {

  const { status, priority, search } = req.query;

  const where = {};

  if (status) where.status = status;

  if (priority) where.priority = priority;

  if (search) {
    where.name = {
      [Op.like]: `%${search}%`,
    };
  }

  const tasks = await Task.findAll({
    where,
    include: {
      model: Project,
      where: {
        userId: req.user.id,
      },
      attributes: ["id", "name"],
    },
    order: [["createdAt", "DESC"]],
  });

  res.json(tasks);
};

// UPDATE TASK
export const updateTask = async (req, res) => {

  const task = await Task.findByPk(req.params.id, {
    include: {
      model: Project,
    },
  });

  if (!task)
    return res.status(404).json({
      message: "Task not found",
    });

  if (task.Project.userId !== req.user.id)
    return res.status(403).json({
      message: "Unauthorized",
    });

  await task.update(req.body);

  res.json(task);
};

// DELETE TASK
export const deleteTask = async (req, res) => {

  const task = await Task.findByPk(req.params.id, {
    include: Project,
  });

  const taskName = task.name;

  await task.destroy();

  await createAudit(
    req.user.id,
    `Deleted Task: ${taskName}`,
    "Tasks"
  );

  res.json({
    message: "Task Deleted",
  });
};

// COMPLETE TASK
export const completeTask = async (req, res) => {

  const task = await Task.findByPk(req.params.id);

  task.status = "Completed";

  await task.save();

  await createAudit(
    req.user.id,
    `Completed Task: ${task.name}`,
    "Tasks"
  );

  res.json(task);
};