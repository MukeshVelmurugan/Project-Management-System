import bcrypt from "bcrypt";
import { User } from "../models/index.js";

export const getProfile = async (req, res) => {
  res.json(req.user);
};

export const updateProfile = async (req, res) => {
  const { fullName, email } = req.body;

  await req.user.update({ fullName, email });

  res.json(req.user);
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findByPk(req.user.id);

  const match = await bcrypt.compare(currentPassword, user.password);

  if (!match)
    return res.status(400).json({ message: "Current password is incorrect" });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: "Password updated successfully" });
};