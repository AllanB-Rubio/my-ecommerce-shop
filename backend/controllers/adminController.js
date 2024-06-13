import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { client } from "../db.js";

// Create Admin User
export const createAdminUser = async (req, res) => {
  const { username, password, firstName, lastName, permissions } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const SQL = `
    INSERT INTO admin_user (id, username, password, first_name, last_name, permissions)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [
    uuidv4(),
    username,
    hashedPassword,
    firstName,
    lastName,
    permissions,
  ];
  try {
    const result = await client.query(SQL, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create admin user" });
  }
};

// Get All Admin Users
export const getAdminUsers = async (req, res) => {
  const SQL = "SELECT * FROM admin_user WHERE deleted_at IS NULL;";
  try {
    const result = await client.query(SQL);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch admin users" });
  }
};

// Update Admin User
export const updateAdminUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, firstName, lastName, permissions } = req.body;
  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

  let SQL = `
    UPDATE admin_user
    SET username = $2, first_name = $3, last_name = $4, permissions = $5, modified_at = NOW()
  `;
  const values = [id, username, firstName, lastName, permissions];

  if (hashedPassword) {
    SQL += `, password = $6`;
    values.push(hashedPassword);
  }

  SQL += `
    WHERE id = $1 AND deleted_at IS NULL
    RETURNING *;
  `;

  try {
    const result = await client.query(SQL, values);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update admin user" });
  }
};

// Delete Admin User
export const deleteAdminUser = async (req, res) => {
  const { id } = req.params;
  const SQL =
    "UPDATE admin_user SET deleted_at = NOW() WHERE id = $1 RETURNING *;";
  try {
    const result = await client.query(SQL, [id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete admin user" });
  }
};

// Get Admin User by Username
export const getAdminUserByUsername = async (username) => {
  const SQL =
    "SELECT * FROM admin_user WHERE username = $1 AND deleted_at IS NULL;";
  try {
    const result = await client.query(SQL, [username]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Failed to fetch admin user");
  }
};
