// backend/models/productModel.js
const { Pool } = require("pg");
const pool = require("../config/db");

const createProduct = async (name, price, description, category) => {
  const result = await pool.query(
    "INSERT INTO products (name, price, description, category) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, price, description, category]
  );
  return result.rows[0];
};

const getProducts = async () => {
  const result = await pool.query("SELECT * FROM products");
  return result.rows;
};

const getProductById = async (id) => {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return result.rows[0];
};

const updateProduct = async (id, name, price, description, category) => {
  const result = await pool.query(
    "UPDATE products SET name = $1, price = $2, description = $3, category = $4 WHERE id = $5 RETURNING *",
    [name, price, description, category, id]
  );
  return result.rows[0];
};

const deleteProduct = async (id) => {
  const result = await pool.query(
    "DELETE FROM products WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
