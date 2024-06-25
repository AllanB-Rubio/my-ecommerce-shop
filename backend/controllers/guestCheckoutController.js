// backend/controllers/guestCheckoutController.js
import { createOrder, createOrderItem } from "../models/orderModel";
import { createAddress } from "../models/addressModel";

export const createGuestOrder = async (req, res) => {
  try {
    const { items, totalAmount, shipping, billing } = req.body;

    // Save the shipping and billing addresses
    const shippingAddress = await createAddress(shipping);
    const billingAddress = await createAddress(billing);

    // Create the order
    const order = await createOrder(null, totalAmount, "pending", true);

    // Save order items
    for (const item of items) {
      await createOrderItem(
        order.id,
        item.productId,
        item.quantity,
        item.price
      );
    }

    res.status(201).json(order);
  } catch (error) {
    console.error("Failed to create guest order", error);
    res.status(500).json({ error: "Failed to create guest order" });
  }
};
