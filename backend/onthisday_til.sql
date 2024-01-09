\echo 'Delete and recreate the On This Day Today I Learned db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE onthisday_til_db;
CREATE DATABASE onthisday_til_db;
\connect onthisday_til_db

\i onthisday_til_db-schema.sql
\i onthisday_til_db-seed.sql

\echo 'Delete and recreate On This Day Today I Learned test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE onthisday_til_test_db;
CREATE DATABASE onthisday_til_test_db;
\connect onthisday_til_test_db

\i onthisday_til_db-schema.sql