-- in terminal:
-- psql < onthisday_til_db_schema.sql
-- psql onthisday_til_db

-- DROP DATABASE IF EXISTS  onthisday_til_db;
-- DROP DATABASE IF EXISTS  onthisday_til_test_db;

-- CREATE DATABASE onthisday_til_db;
-- CREATE DATABASE onthisday_til_test_db;

-- \c onthisday_til_db
-- \c onthisday_til_test_db

CREATE TABLE users (
  user_id INTEGER PRIMARY KEY,
  username VARCHAR(25) NOT NULL,
  password TEXT NOT NULL,
  date_reg TEXT NOT NULL, 
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE pages (
  page_id INTEGER PRIMARY KEY, 
  page_url TEXT NOT NULL,
  wikibase_item TEXT
);

CREATE TABLE facts (
  fact_id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  fact_date DATE,
  page_id INTEGER NOT NULL REFERENCES pages ON DELETE CASCADE
);

CREATE TABLE favorite (
  user_id INTEGER REFERENCES users ON DELETE CASCADE,
  fact_id INTEGER REFERENCES facts ON DELETE CASCADE,
  PRIMARY KEY (user_id, fact_id)
);

