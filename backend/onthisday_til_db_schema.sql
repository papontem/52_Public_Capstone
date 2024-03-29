-- in terminal:
-- psql < onthisday_til_db_schema.sql
-- psql onthisday_til_db

-- DROP DATABASE IF EXISTS  onthisday_til_db;
-- DROP DATABASE IF EXISTS  onthisday_til_test_db;

-- CREATE DATABASE onthisday_til_db;
CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  date_reg DATE NOT NULL, 
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE pages (
  page_id INTEGER PRIMARY KEY, 
  page_url TEXT NOT NULL,
  wikibase_item TEXT
);

CREATE TABLE facts (
  fact_id SERIAL PRIMARY KEY,
  text_title TEXT NOT NULL,
  fact_date DATE NOT NULL,
  page_id INTEGER NOT NULL REFERENCES pages ON DELETE CASCADE
);

CREATE TABLE favorites (
  username VARCHAR(25) REFERENCES users ON DELETE CASCADE,
  fact_id INTEGER REFERENCES facts ON DELETE CASCADE,
  PRIMARY KEY (username, fact_id)
);

