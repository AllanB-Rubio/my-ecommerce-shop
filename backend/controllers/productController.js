import { v4 as uuidv4 } from "uuid";
import { client } from "../db.js";

// Create a new product
export const createProduct = async (req, res) => {
  const { name, description, SKU, price, inventoryId, categoryId, image } =
    req.body;
  const SQL = `
    INSERT INTO products (id, name, description, SKU, price, inventory_id, category_id, image)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
  `;
  const values = [
    uuidv4(),
    name,
    description,
    SKU,
    price,
    inventoryId,
    categoryId,
    image,
  ];
  try {
    const result = await client.query(SQL, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  const SQL = "SELECT * FROM products WHERE deleted_at IS NULL;";
  try {
    const result = await client.query(SQL);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;
  const SQL = "SELECT * FROM products WHERE id = $1 AND deleted_at IS NULL;";
  try {
    const result = await client.query(SQL, [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, SKU, price, inventoryId, categoryId, image } =
    req.body;
  const SQL = `
    UPDATE products SET name = $2, description = $3, SKU = $4, price = $5, inventory_id = $6, category_id = $7, image = $8, modified_at = NOW()
    WHERE id = $1 AND deleted_at IS NULL
    RETURNING *;
  `;
  const values = [
    id,
    name,
    description,
    SKU,
    price,
    inventoryId,
    categoryId,
    image,
  ];
  try {
    const result = await client.query(SQL, values);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const SQL =
    "UPDATE products SET deleted_at = NOW() WHERE id = $1 RETURNING *;";
  try {
    const result = await client.query(SQL, [id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
