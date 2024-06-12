import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail, getUserById } from "../db.js";
import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET || "hello_jwt_secret";

export const registerUser = async (req, res) => {
  console.log("Register request received:", req.body);

  const { username, email, password, firstName, lastName, phoneNumber } =
    req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(
      username,
      email,
      hashedPassword,
      firstName,
      lastName,
      phoneNumber
    );
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
};

export const loginUser = async (req, res) => {
  console.log("Login request received:", req.body);

  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "1h" });
      res.status(200).json({ token, user });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to login user" });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.user.id; // Assumes user ID is attached to the request by the authentication middleware

  try {
    const user = await getUserById(userId); // Fetch user details from the database
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};
