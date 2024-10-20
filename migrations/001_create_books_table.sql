CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  category VARCHAR(255),
  summary TEXT,
  cover_image_url VARCHAR(255),
  purchase_url VARCHAR(255)
);
