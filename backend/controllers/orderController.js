import { v4 as uuidv4 } from "uuid";
import { client } from "../db.js";

// Create Order
export const createOrder = async (req, res) => {
  const { userId, totalAmount, status } = req.body;
  const SQL = `
    INSERT INTO orders (id, user_id, total_amount, status)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [uuidv4(), userId, totalAmount, status];
  try {
    const result = await client.query(SQL, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Get All Orders
export const getOrders = async (req, res) => {
  const SQL = "SELECT * FROM orders WHERE deleted_at IS NULL;";
  try {
    const result = await client.query(SQL);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Get Order By ID
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  const SQL = "SELECT * FROM orders WHERE id = $1 AND deleted_at IS NULL;";
  try {
    const result = await client.query(SQL, [id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

// Get Orders by User ID
export const getOrdersByUserId = async (req, res) => {
  const userId = req.user.id; // Use the authenticated user's ID
  const SQL = `
    SELECT o.id, o.total_amount, o.status, o.created_at,
           json_agg(json_build_object('id', oi.id, 'name', p.name, 'quantity', oi.quantity, 'price', oi.price)) as items
    FROM orders o
    JOIN orderItems oi ON o.id = oi.order_id
    JOIN products p ON oi.product_id = p.id
    WHERE o.user_id = $1
    GROUP BY o.id
    ORDER BY o.created_at DESC;
  `;
  try {
    const result = await client.query(SQL, [userId]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Update Order
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { totalAmount, status } = req.body;
  const SQL = `
    UPDATE orders
    SET total_amount = $2, status = $3, modified_at = NOW()
    WHERE id = $1 AND deleted_at IS NULL
    RETURNING *;
  `;
  const values = [id, totalAmount, status];
  try {
    const result = await client.query(SQL, values);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update order" });
  }
};

// Delete Order
export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const SQL = "UPDATE orders SET deleted_at = NOW() WHERE id = $1 RETURNING *;";
  try {
    const result = await client.query(SQL, [id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order" });
  }
};
