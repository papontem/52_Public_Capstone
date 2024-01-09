-- in terminal:
-- psql < onthisday_til_seed.sql
-- psql onthisday_til_db

-- \c onthisday_til_db
-- \c onthisday_til_test_db

-- both test users have the password "password"

INSERT INTO users (username, password, email, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'testuser@testuser.com',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'testadmin@testadmin.com',
        TRUE);
