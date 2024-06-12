import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { client } from "../db.js";

// Create User
export const createUser = async (req, res) => {
  const { username, email, password, firstName, lastName, phoneNumber } =
    req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const SQL = `
    INSERT INTO "user" (id, username, email, password, first_name, last_name, phone_number)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const values = [
    uuidv4(),
    username,
    email,
    hashedPassword,
    firstName,
    lastName,
    phoneNumber,
  ];
  try {
    const result = await client.query(SQL, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

// Get All Users
export const getUsers = async (req, res) => {
  const SQL = 'SELECT * FROM "user" WHERE deleted_at IS NULL;';
  try {
    const result = await client.query(SQL);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Get User By ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  const SQL = 'SELECT * FROM "user" WHERE id = $1 AND deleted_at IS NULL;';
  try {
    const result = await client.query(SQL, [id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// Update User
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, firstName, lastName, phoneNumber } =
    req.body;
  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
  const SQL = `
    UPDATE "user"
    SET username = $2, email = $3, password = $4, first_name = $5, last_name = $6, phone_number = $7, modified_at = NOW()
    WHERE id = $1 AND deleted_at IS NULL
    RETURNING *;
  `;
  const values = [
    id,
    username,
    email,
    hashedPassword,
    firstName,
    lastName,
    phoneNumber,
  ];
  try {
    const result = await client.query(SQL, values);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const SQL = 'UPDATE "user" SET deleted_at = NOW() WHERE id = $1 RETURNING *;';
  try {
    const result = await client.query(SQL, [id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
