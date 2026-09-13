import sequelize from "../config/db.js";

import User from "./User.js";
import Project from "./Project.js";
import Task from "./Task.js";
import AuditLog from "./AuditLog.js";

// User → Projects
User.hasMany(Project, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Project.belongsTo(User, {
  foreignKey: "userId",
});

// Project → Tasks
Project.hasMany(Task, {
  foreignKey: "projectId",
  onDelete: "CASCADE",
});

Task.belongsTo(Project, {
  foreignKey: "projectId",
});

// User → Audit Logs
User.hasMany(AuditLog, {
  foreignKey: "userId",
});

AuditLog.belongsTo(User, {
  foreignKey: "userId",
});

export {
  sequelize,
  User,
  Project,
  Task,
  AuditLog,
};