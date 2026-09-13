import { AuditLog } from "../models/index.js";

const createAudit = async (userId, action, tableName) => {
  try {
    await AuditLog.create({
      userId,
      action,
      tableName,
    });
  } catch (error) {
    console.log("Audit Error:", error.message);
  }
};

export default createAudit;