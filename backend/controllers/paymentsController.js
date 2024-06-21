// backend/controllers/paymentsController.js
import { client } from "../db.js";
import { v4 as uuidv4 } from "uuid";

export const savePaymentInfo = async (req, res) => {
  const userId = req.user.id;
  const { cardNumber, cardHolderName, expirationDate, cvv } = req.body;

  const paymentId = uuidv4();

  const paymentSQL = `
    INSERT INTO payments (id, user_id, card_number, card_holder_name, expiration_date, cvv)
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT (user_id) DO UPDATE
    SET card_number = EXCLUDED.card_number, card_holder_name = EXCLUDED.card_holder_name, expiration_date = EXCLUDED.expiration_date, cvv = EXCLUDED.cvv;
  `;

  const paymentValues = [
    paymentId,
    userId,
    cardNumber,
    cardHolderName,
    expirationDate,
    cvv,
  ];

  try {
    await client.query(paymentSQL, paymentValues);
    res.status(200).json({ message: "Payment information saved successfully" });
  } catch (error) {
    console.error("Failed to save payment information:", error);
    res.status(500).json({ error: "Failed to save payment information" });
  }
};
