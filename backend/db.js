import pkg from "pg";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pkg;

const client = new Client({
  connectionString:
    process.env.DATABASE_URL || "postgres://localhost/e_commerce_project",
});

const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS cartItems;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS orderItems;
    DROP TABLE IF EXISTS orders;

    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS product_inventories;
    DROP TABLE IF EXISTS product_categories;

    DROP TABLE IF EXISTS user_payments;
    DROP TABLE IF EXISTS user_addresses;

    DROP TABLE IF EXISTS admin_user;
    DROP TABLE IF EXISTS "user";

    CREATE TABLE "user" (
        id UUID PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        phone_number VARCHAR(15),
        created_at TIMESTAMP DEFAULT NOW(),
        modified_at TIMESTAMP DEFAULT NOW(),
        deleted_at TIMESTAMP
    );

    CREATE TABLE admin_user (
        id UUID PRIMARY KEY,
        username VARCHAR(255),
        password VARCHAR(255),
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        permissions TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        modified_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE product_categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        modified_at TIMESTAMP DEFAULT NOW(),
        deleted_at TIMESTAMP
    );

    CREATE TABLE product_inventories (
        id SERIAL PRIMARY KEY,
        quantity INT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        modified_at TIMESTAMP DEFAULT NOW(),
        deleted_at TIMESTAMP
    );

    CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        SKU VARCHAR(255),
        price NUMERIC(10, 2) NOT NULL,
        inventory_id INT REFERENCES product_inventories(id) ON DELETE CASCADE,
        category_id INT REFERENCES product_categories(id) ON DELETE SET NULL,
        image VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW(),
        modified_at TIMESTAMP DEFAULT NOW(),
        deleted_at TIMESTAMP
    );

    CREATE TABLE orders (
        id UUID PRIMARY KEY,
        user_id UUID REFERENCES "user"(id) ON DELETE CASCADE,
        total_amount NUMERIC(10, 2) NOT NULL,
        status VARCHAR(50),
        created_at TIMESTAMP DEFAULT NOW(),
        modified_at TIMESTAMP DEFAULT NOW(),
        deleted_at TIMESTAMP
    );

    CREATE TABLE orderItems (
        id UUID PRIMARY KEY,
        order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
        product_id INT REFERENCES products(id) ON DELETE CASCADE,
        quantity INT NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        modified_at TIMESTAMP DEFAULT NOW(),
        deleted_at TIMESTAMP
    );

    CREATE TABLE reviews (
        id UUID PRIMARY KEY,
        user_id UUID REFERENCES "user"(id),
        product_id INT REFERENCES products(id),
        rating INT,
        review TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        modified_at TIMESTAMP DEFAULT NOW(),
        deleted_at TIMESTAMP 
    );

    CREATE TABLE cartItems (
        id UUID PRIMARY KEY,
        product_id INT REFERENCES products(id),
        quantity INT,
        created_at TIMESTAMP DEFAULT NOW(),
        modified_at TIMESTAMP DEFAULT NOW(),
        deleted_at TIMESTAMP
    );
  `;

  await client.query(SQL);

  // Insert initial categories and inventories
  const category1 = await client.query(
    `INSERT INTO product_categories (name, description) VALUES ('Shirts', 'Various types of shirts') RETURNING id;`
  );
  const category2 = await client.query(
    `INSERT INTO product_categories (name, description) VALUES ('T-Shirts', 'Various types of t-shirts') RETURNING id;`
  );
  const category3 = await client.query(
    `INSERT INTO product_categories (name, description) VALUES ('Formal Wear', 'Various types of formal wear') RETURNING id;`
  );

  const inventory1 = await client.query(
    `INSERT INTO product_inventories (quantity) VALUES (100) RETURNING id;`
  );
  const inventory2 = await client.query(
    `INSERT INTO product_inventories (quantity) VALUES (200) RETURNING id;`
  );
  const inventory3 = await client.query(
    `INSERT INTO product_inventories (quantity) VALUES (150) RETURNING id;`
  );

  // Insert initial products
  const insertProducts = `
    INSERT INTO products (name, description, SKU, price, inventory_id, category_id, image)
    VALUES
      ('Stylish Shirt', 'A very stylish shirt.', 'SHIRT001', 29.99, ${inventory1.rows[0].id}, ${category1.rows[0].id}, '/images/shirt.jpg'),
      ('Casual T-Shirt', 'A very casual t-shirt.', 'TSHIRT001', 19.99, ${inventory2.rows[0].id}, ${category2.rows[0].id}, '/images/shirt.jpg'),
      ('Formal Shirt', 'A very formal shirt.', 'F_SHIRT001', 39.99, ${inventory3.rows[0].id}, ${category3.rows[0].id}, '/images/shirt.jpg');
  `;
  await client.query(insertProducts);
};

// User Functions
const createUser = async (
  username,
  email,
  password,
  firstName,
  lastName,
  phoneNumber
) => {
  const SQL = `
    INSERT INTO "user" (id, username, email, password, first_name, last_name, phone_number)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const values = [
    uuidv4(),
    username,
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
  ];
  const result = await client.query(SQL, values);
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const SQL = 'SELECT * FROM "user" WHERE email = $1 AND deleted_at IS NULL;';
  const result = await client.query(SQL, [email]);
  return result.rows[0];
};

const getUserById = async (id) => {
  const SQL = 'SELECT * FROM "user" WHERE id = $1 AND deleted_at IS NULL;';
  const result = await client.query(SQL, [id]);
  return result.rows[0];
};

export { createTables, createUser, getUserByEmail, getUserById, client };
