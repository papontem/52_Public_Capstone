-- both test users have the password "password"

INSERT INTO users (username, password, date_reg, email, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        '01/01/2024',
        'testuser@testuser.com',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        '01/01/2024',
        'testadmin@testadmin.com',
        TRUE);
