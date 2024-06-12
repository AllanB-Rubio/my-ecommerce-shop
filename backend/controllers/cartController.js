import { v4 as uuidv4 } from "uuid";
import { client } from "../db.js";

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const SQL = `
    INSERT INTO cartItems (id, product_id, quantity)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [uuidv4(), productId, quantity];
  try {
    const result = await client.query(SQL, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

export const getCartItems = async (req, res) => {
  const SQL = "SELECT * FROM cartItems WHERE deleted_at IS NULL;";
  try {
    const result = await client.query(SQL);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
};

export const updateCartItem = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const SQL = `
    UPDATE cartItems SET quantity = $2, modified_at = NOW()
    WHERE id = $1 AND deleted_at IS NULL
    RETURNING *;
  `;
  const values = [id, quantity];
  try {
    const result = await client.query(SQL, values);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update cart item" });
  }
};

export const deleteCartItem = async (req, res) => {
  const { id } = req.params;
  const SQL =
    "UPDATE cartItems SET deleted_at = NOW() WHERE id = $1 RETURNING *;";
  try {
    const result = await client.query(SQL, [id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete cart item" });
  }
};
