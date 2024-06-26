import { v4 as uuidv4 } from "uuid";
import { client } from "../db.js";

// Create Order for Logged-in Users
export const createOrder = async (req, res) => {
  const { items, totalAmount, status } = req.body;
  const userId = req.user.id;
  const orderId = uuidv4();
  const orderStatus = status || "Pending";

  try {
    const orderQuery = `
      INSERT INTO orders (id, user_id, total_amount, status)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;
    const orderValues = [orderId, userId, totalAmount, orderStatus];
    const orderResult = await client.query(orderQuery, orderValues);

    const orderItemsQuery = `
      INSERT INTO orderItems (id, order_id, product_id, quantity, price)
      VALUES ($1, $2, $3, $4, $5);
    `;
    for (const item of items) {
      const orderItemId = uuidv4();
      const orderItemValues = [
        orderItemId,
        orderId,
        item.id,
        item.quantity,
        item.price,
      ];
      await client.query(orderItemsQuery, orderItemValues);
    }

    res.status(201).json({ id: orderResult.rows[0].id });
  } catch (error) {
    console.error("Failed to create order:", error.message, error.stack);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Create Guest Order
export const createGuestOrder = async (req, res) => {
  const { items, totalAmount, shipping, billing } = req.body;
  const orderId = uuidv4();
  const orderStatus = "Pending";

  try {
    const orderQuery = `
      INSERT INTO orders (id, total_amount, status, is_guest)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;
    const orderValues = [orderId, totalAmount, orderStatus, true];
    const orderResult = await client.query(orderQuery, orderValues);

    const orderItemsQuery = `
      INSERT INTO orderItems (id, order_id, product_id, quantity, price)
      VALUES ($1, $2, $3, $4, $5);
    `;
    for (const item of items) {
      const orderItemId = uuidv4();
      const orderItemValues = [
        orderItemId,
        orderId,
        item.id,
        item.quantity,
        item.price,
      ];
      await client.query(orderItemsQuery, orderItemValues);
    }

    const shippingId = uuidv4();
    await client.query(
      `INSERT INTO addresses (id, order_id, type, address_line1, address_line2, city, state, postal_code, country)
       VALUES ($1, $2, 'shipping', $3, $4, $5, $6, $7, $8);`,
      [
        shippingId,
        orderId,
        shipping.addressLine1,
        shipping.addressLine2,
        shipping.city,
        shipping.state,
        shipping.postalCode,
        shipping.country,
      ]
    );

    if (billing) {
      const billingId = uuidv4();
      await client.query(
        `INSERT INTO addresses (id, order_id, type, address_line1, address_line2, city, state, postal_code, country)
         VALUES ($1, $2, 'billing', $3, $4, $5, $6, $7, $8);`,
        [
          billingId,
          orderId,
          billing.addressLine1,
          billing.addressLine2,
          billing.city,
          billing.state,
          billing.postalCode,
          billing.country,
        ]
      );
    }

    res.status(201).json({ id: orderResult.rows[0].id });
  } catch (error) {
    console.error("Failed to create guest order:", error.message, error.stack);
    res.status(500).json({ error: "Failed to create guest order" });
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
  const SQL = `
    SELECT o.id, o.total_amount, o.status, o.created_at,
           json_agg(json_build_object('id', oi.id, 'name', p.name, 'quantity', oi.quantity, 'price', oi.price, 'image', p.image)) as items
    FROM orders o
    JOIN orderItems oi ON o.id = oi.order_id
    JOIN products p ON oi.product_id = p.id
    WHERE o.id = $1
    GROUP BY o.id;
  `;
  try {
    const result = await client.query(SQL, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Failed to fetch order:", error);
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

// Get Guest Order By ID
export const getGuestOrderById = async (req, res) => {
  const { id } = req.params;
  const SQL = `
    SELECT o.id, o.total_amount, o.status, o.created_at,
           json_agg(json_build_object('id', oi.id, 'name', p.name, 'quantity', oi.quantity, 'price', oi.price, 'image', p.image)) as items
    FROM orders o
    JOIN orderItems oi ON o.id = oi.order_id
    JOIN products p ON oi.product_id = p.id
    WHERE o.id = $1 AND o.is_guest = true
    GROUP BY o.id;
  `;
  try {
    const result = await client.query(SQL, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Failed to fetch guest order:", error);
    res.status(500).json({ error: "Failed to fetch guest order" });
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
