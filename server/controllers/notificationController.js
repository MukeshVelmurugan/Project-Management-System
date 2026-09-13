import { Task, Project } from "../models/index.js";

export const getNotifications = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tasks = await Task.findAll({
      include: {
        model: Project,
        where: {
          userId: req.user.id,
        },
        attributes: ["id", "name"],
      },
      order: [["dueDate", "ASC"]],
    });

    const notifications = [];

    tasks.forEach((task) => {
      if (!task.dueDate || task.status === "Completed") return;

      const due = new Date(task.dueDate);
      due.setHours(0, 0, 0, 0);

      const diff = Math.floor(
        (due - today) / (1000 * 60 * 60 * 24)
      );

      if (diff < 0) {
        notifications.push({
          id: task.id,
          type: "overdue",
          title: task.name,
          message: `Overdue by ${Math.abs(diff)} day(s)`,
          project: task.Project.name,
          dueDate: task.dueDate,
        });
      } else if (diff === 0) {
        notifications.push({
          id: task.id,
          type: "today",
          title: task.name,
          message: "Due Today",
          project: task.Project.name,
          dueDate: task.dueDate,
        });
      } else if (diff <= 3) {
        notifications.push({
          id: task.id,
          type: "upcoming",
          title: task.name,
          message: `Due in ${diff} day(s)`,
          project: task.Project.name,
          dueDate: task.dueDate,
        });
      }
    });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};