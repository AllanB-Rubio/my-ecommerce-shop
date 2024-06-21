import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { client } from "../db.js";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET || "hello_jwt_secret";

// Register User
export const registerUser = async (req, res) => {
  const { username, email, password, firstName, lastName, phoneNumber } =
    req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = uuidv4();

  const SQL = `
    INSERT INTO "user" (id, username, email, password, first_name, last_name, phone_number)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const values = [
    userId,
    username,
    email,
    hashedPassword,
    firstName,
    lastName,
    phoneNumber,
  ];

  try {
    const result = await client.query(SQL, values);
    const user = result.rows[0];
    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "1h" });
    res.status(201).json({ user, token });
  } catch (error) {
    console.error("Registration failed:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const SQL = `SELECT * FROM "user" WHERE email = $1;`;
  try {
    const result = await client.query(SQL, [email]);
    const user = result.rows[0];

    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: user.id }, jwtSecret);
    res.json({ token, user });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

// Get User Profile
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
