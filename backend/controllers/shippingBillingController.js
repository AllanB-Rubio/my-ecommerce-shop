// src/controllers/shippingBillingController.js
import { client } from "../db.js";
import { v4 as uuidv4 } from "uuid";

// Create or Update Shipping Address
export const saveShippingAddress = async (req, res) => {
  const {
    userId,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
  } = req.body;
  const id = uuidv4();

  const SQL = `
    INSERT INTO shipping_addresses (id, user_id, address_line1, address_line2, city, state, postal_code, country)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ON CONFLICT (user_id) DO UPDATE SET
    address_line1 = EXCLUDED.address_line1,
    address_line2 = EXCLUDED.address_line2,
    city = EXCLUDED.city,
    state = EXCLUDED.state,
    postal_code = EXCLUDED.postal_code,
    country = EXCLUDED.country
    RETURNING *;
  `;
  const values = [
    id,
    userId,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
  ];

  try {
    const result = await client.query(SQL, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Failed to save shipping address:", error);
    res.status(500).json({ error: "Failed to save shipping address" });
  }
};

// Create or Update Billing Address
export const saveBillingAddress = async (req, res) => {
  const {
    userId,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
  } = req.body;
  const id = uuidv4();

  const SQL = `
    INSERT INTO billing_addresses (id, user_id, address_line1, address_line2, city, state, postal_code, country)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ON CONFLICT (user_id) DO UPDATE SET
    address_line1 = EXCLUDED.address_line1,
    address_line2 = EXCLUDED.address_line2,
    city = EXCLUDED.city,
    state = EXCLUDED.state,
    postal_code = EXCLUDED.postal_code,
    country = EXCLUDED.country
    RETURNING *;
  `;
  const values = [
    id,
    userId,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
  ];

  try {
    const result = await client.query(SQL, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Failed to save billing address:", error);
    res.status(500).json({ error: "Failed to save billing address" });
  }
};
