import { Project, Task, AuditLog } from "../models/index.js";
import { Op } from "sequelize";

export const getDashboard = async (req, res) => {
  try {

    const totalProjects = await Project.count({
      where: { userId: req.user.id },
    });

    const inProgressProjects = await Project.count({
      where: {
        userId: req.user.id,
        status: "In Progress",
      },
    });

    const projectIds = (
      await Project.findAll({
        where: { userId: req.user.id },
        attributes: ["id"],
      })
    ).map((p) => p.id);

    const totalTasks = await Task.count({
      where: {
        projectId: {
          [Op.in]: projectIds,
        },
      },
    });

    const completedTasks = await Task.count({
      where: {
        projectId: {
          [Op.in]: projectIds,
        },
        status: "Completed",
      },
    });

    const pendingTasks = await Task.count({
      where: {
        projectId: {
          [Op.in]: projectIds,
        },
        status: {
          [Op.ne]: "Completed",
        },
      },
    });

    const logs = await AuditLog.findAll({
      where: {
        userId: req.user.id,
      },
      limit: 5,
      order: [["createdAt", "DESC"]],
    });

    res.json({
      totalProjects,
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressProjects,
      logs,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};