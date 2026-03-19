-- Roles
INSERT IGNORE INTO roles(name) VALUES ('USER');
INSERT IGNORE INTO roles(name) VALUES ('ADMIN');

-- Admin
INSERT IGNORE INTO users (username, password, full_name, email, phone, address, status)
VALUES (
'admin1',
'$2a$10$7QJ8k9kR3vPzFz0Vw9Yz3e8XJ8vY0Z1kT7b3x0QzF5z9Wk1Ue2h2G', -- password 123456 đã encode
'Admin One',
'admin1@gmail.com',
'0912345678',
'Ha Noi',
'ACTIVE'
);

-- User
INSERT IGNORE INTO users (username, password, full_name, email, phone, address, status)
VALUES (
'user1',
'$2a$10$7QJ8k9kR3vPzFz0Vw9Yz3e8XJ8vY0Z1kT7b3x0QzF5z9Wk1Ue2h2G',
'User One',
'user1@gmail.com',
'0912345670',
'Ha Noi',
'ACTIVE'
);

-- Map roles
INSERT IGNORE INTO user_roles(user_id, role_id) VALUES (1,2); -- admin1 -> ADMIN
INSERT IGNORE INTO user_roles(user_id, role_id) VALUES (2,1); -- user1 -> USER