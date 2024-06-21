// backend/controllers/addressController.js
import { client } from "../db.js";
import { v4 as uuidv4 } from "uuid";

export const saveAddresses = async (req, res) => {
  const userId = req.user.id;
  const { shipping, billing } = req.body;

  if (!shipping || !billing) {
    return res
      .status(400)
      .json({ error: "Shipping and billing addresses are required" });
  }

  const shippingId = uuidv4();
  const billingId = uuidv4();

  const shippingSQL = `
    INSERT INTO shipping_addresses (id, user_id, address_line1, address_line2, city, state, postal_code, country)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ON CONFLICT (user_id) DO UPDATE
    SET address_line1 = EXCLUDED.address_line1, address_line2 = EXCLUDED.address_line2, city = EXCLUDED.city, state = EXCLUDED.state, postal_code = EXCLUDED.postal_code, country = EXCLUDED.country;
  `;
  const billingSQL = `
    INSERT INTO billing_addresses (id, user_id, address_line1, address_line2, city, state, postal_code, country)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ON CONFLICT (user_id) DO UPDATE
    SET address_line1 = EXCLUDED.address_line1, address_line2 = EXCLUDED.address_line2, city = EXCLUDED.city, state = EXCLUDED.state, postal_code = EXCLUDED.postal_code, country = EXCLUDED.country;
  `;

  const shippingValues = [
    shippingId,
    userId,
    shipping.addressLine1,
    shipping.addressLine2,
    shipping.city,
    shipping.state,
    shipping.postalCode,
    shipping.country,
  ];
  const billingValues = [
    billingId,
    userId,
    billing.addressLine1,
    billing.addressLine2,
    billing.city,
    billing.state,
    billing.postalCode,
    billing.country,
  ];

  try {
    console.log("Shipping values:", shippingValues);
    console.log("Billing values:", billingValues);
    await client.query("BEGIN");
    await client.query(shippingSQL, shippingValues);
    await client.query(billingSQL, billingValues);
    await client.query("COMMIT");
    res.status(200).json({ message: "Addresses saved successfully" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Failed to save addresses:", error);
    res.status(500).json({ error: "Failed to save addresses" });
  }
};
