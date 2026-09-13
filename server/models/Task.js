import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
  },

  priority: {
    type: DataTypes.ENUM(
      "Low",
      "Medium",
      "High"
    ),
    defaultValue: "Medium",
  },

  status: {
    type: DataTypes.ENUM(
      "Pending",
      "In Progress",
      "Completed"
    ),
    defaultValue: "Pending",
  },

  dueDate: {
    type: DataTypes.DATEONLY,
  },
}, {
  timestamps: true,
});

export default Task;