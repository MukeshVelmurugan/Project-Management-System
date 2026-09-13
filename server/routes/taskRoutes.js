import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  completeTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.use(protect);

router.route("/")
  .get(getTasks)
  .post(createTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

router.put("/:id/complete", completeTask);

export default router;