import { Project } from "../models/index.js";
import { Op } from "sequelize";
import createAudit from "../utils/createAudit.js";

// ================= CREATE PROJECT =================
export const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      userId: req.user.id,
    });

    await createAudit(
      req.user.id,
      `Created Project: ${project.name}`,
      "Projects"
    );

    res.status(201).json(project);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET ALL PROJECTS =================
export const getProjects = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    // Search, Filter & Sort
    const { status, search, sort } = req.query;

    const where = {
      userId: req.user.id,
    };

    if (status) where.status = status;

    if (search) {
      where.name = {
        [Op.like]: `%${search}%`,
      };
    }

    let order = [["createdAt", "DESC"]];

    if (sort === "oldest") {
      order = [["createdAt", "ASC"]];
    }

    if (sort === "status") {
      order = [["status", "ASC"]];
    }

    const { count, rows } = await Project.findAndCountAll({
      where,
      limit,
      offset,
      order,
    });

    res.json({
      projects: rows,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalProjects: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET SINGLE PROJECT =================
export const getProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= UPDATE PROJECT =================
export const updateProject = async (req, res) => {

  const project = await Project.findOne({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
  });

  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  await project.update(req.body);

  await createAudit(
    req.user.id,
    `Updated Project: ${project.name}`,
    "Projects"
  );

  res.json(project);
};

// ================= DELETE PROJECT =================
export const deleteProject = async (req, res) => {

  const project = await Project.findOne({
    where: {
      id: req.params.id,
      userId: req.user.id,
    },
  });

  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  const name = project.name;

  await project.destroy();

  await createAudit(
    req.user.id,
    `Deleted Project: ${name}`,
    "Projects"
  );

  res.json({
    message: "Project Deleted",
  });
};