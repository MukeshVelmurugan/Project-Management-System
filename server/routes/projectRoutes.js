import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.use(protect);

router.route("/")
  .get(getProjects)
  .post(createProject);

router.route("/:id")
  .get(getProject)
  .put(updateProject)
  .delete(deleteProject);

export default router;