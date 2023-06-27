SELECT * FROM user WHERE LENGTH(email) = panjang_karakter;
SELECT * FROM region WHERE LENGTH(id) = 5 AND id LIKE '11%';
SELECT * FROM region WHERE LENGTH(id) = 8 AND id LIKE '11.01%';

ALTER TABLE Users RENAME TO users;

CREATE TABLE religi (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name varchar(100)
);
INSERT INTO religi (name) VALUES ('Kristen');
INSERT INTO religi (name) VALUES ('Protestan');
INSERT INTO religi (name) VALUES ('Hindu');
INSERT INTO religi (name) VALUES (' Buddha');
INSERT INTO religi (name) VALUES ('Konghucu');