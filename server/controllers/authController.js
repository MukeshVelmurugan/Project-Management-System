import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import generateToken from "../utils/generateToken.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      token: generateToken(user.id),
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    res.json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      token: generateToken(user.id),
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// LOGOUT
export const logout = (req, res) => {
  res.json({
    message: "Logged out successfully",
  });
};