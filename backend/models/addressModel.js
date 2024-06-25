// backend/models/addressModel.js
import { client } from "../db.js";
import { v4 as uuidv4 } from "uuid";

export const createAddress = async (addressData) => {
  const SQL = `
    INSERT INTO addresses (id, user_id, address_line1, address_line2, city, state, postal_code, country, created_at, modified_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
    RETURNING *;
  `;
  const values = [
    uuidv4(),
    addressData.userId,
    addressData.addressLine1,
    addressData.addressLine2,
    addressData.city,
    addressData.state,
    addressData.postalCode,
    addressData.country,
  ];
  const result = await client.query(SQL, values);
  return result.rows[0];
};
