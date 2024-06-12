import { v4 as uuidv4 } from "uuid";
import { client } from "../db.js";

// Create Review
export const createReview = async (req, res) => {
  const { productId, userId, rating, review } = req.body;
  const SQL = `
    INSERT INTO reviews (id, product_id, user_id, rating, review, created_at)
    VALUES ($1, $2, $3, $4, $5, NOW())
    RETURNING *;
  `;
  const values = [uuidv4(), productId, userId, rating, review];
  try {
    const result = await client.query(SQL, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create review" });
  }
};

// Get All Reviews
export const getReviews = async (req, res) => {
  const SQL = "SELECT * FROM reviews WHERE deleted_at IS NULL;";
  try {
    const result = await client.query(SQL);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

// Get Review By ID
export const getReviewById = async (req, res) => {
  const { id } = req.params;
  const SQL = "SELECT * FROM reviews WHERE id = $1 AND deleted_at IS NULL;";
  try {
    const result = await client.query(SQL, [id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch review" });
  }
};

// Update Review
export const updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, review } = req.body;
  const SQL = `
    UPDATE reviews
    SET rating = $2, review = $3, modified_at = NOW()
    WHERE id = $1 AND deleted_at IS NULL
    RETURNING *;
  `;
  const values = [id, rating, review];
  try {
    const result = await client.query(SQL, values);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update review" });
  }
};

// Delete Review
export const deleteReview = async (req, res) => {
  const { id } = req.params;
  const SQL =
    "UPDATE reviews SET deleted_at = NOW() WHERE id = $1 RETURNING *;";
  try {
    const result = await client.query(SQL, [id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete review" });
  }
};
