// backend/models/orderModel.js
import { client } from "../db.js";
import { v4 as uuidv4 } from "uuid";

export const createOrder = async (userId, totalAmount, status, isGuest) => {
  const SQL = `
    INSERT INTO orders (id, user_id, total_amount, status, created_at, modified_at, is_guest)
    VALUES ($1, $2, $3, $4, NOW(), NOW(), $5)
    RETURNING *;
  `;
  const values = [uuidv4(), userId, totalAmount, status, isGuest];
  const result = await client.query(SQL, values);
  return result.rows[0];
};

export const getOrderById = async (id) => {
  const SQL = "SELECT * FROM orders WHERE id = $1;";
  const result = await client.query(SQL, [id]);
  return result.rows[0];
};

export const createOrderItem = async (orderId, productId, quantity, price) => {
  const SQL = `
    INSERT INTO orderItems (id, order_id, product_id, quantity, price, created_at, modified_at)
    VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
    RETURNING *;
  `;
  const values = [uuidv4(), orderId, productId, quantity, price];
  const result = await client.query(SQL, values);
  return result.rows[0];
};
