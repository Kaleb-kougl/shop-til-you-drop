USE shopping_app;

INSERT INTO carts (item, price, quantity, username)
VALUES ('apple', 2.25, 4, 'jake@aol.com'),
('cheese', 1.1, 3, 'jake@aol.com'),
('bread', 2.5, 2, 'harold@gmail.com'),
('peanut butter', 1.3, 4, 'harold@gmail.com'),
('jelly', 2.3, 3, 'harold@gmail.com'),
('tea', 1.32, 20, 'francis@gmail.com'),
('coffee', 2.7, 12, 'francis@gmail.com'),
('acai berries', 3.2, 10, 'haverford@ymail.com'),
('blackberries', 2.4, 12, 'haverford@ymail.com'),
('pie crust', 3.2, 7, 'haverford@ymail.com');

INSERT INTO users (email, password)
VALUES ('jake@aol.com', 'abc123'),
('harold@gmail.com', 'sandwich'),
('francis@gmail.com', 'drank213'),
('haverford@ymail.com', 'password');

INSERT INTO demos (phone, address)
VALUES (334321345, '222 Sesame st, Chicago, IL'),
(123456789, '123 Brodaway Ave, Chicago, IL'),
(987654321, '465 Washington, Chicago, IL'),
(222333444, '321 Squash Chicago, IL');
