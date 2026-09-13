import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const AuditLog = sequelize.define("AuditLog", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  tableName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default AuditLog;