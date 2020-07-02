DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("queen mattress", "bedroom", 899.99, 45);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("night stand", "bedroom", 199.99, 145);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("5pc bed set", "bedroom", 49.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("picture frame", "decor", 9.99, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("wall clock", "decor", 63.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("welcome mats", "decor", 5.99, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("island with 2 stools", "kitchen", 1112.99, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("refrigerator", "kitchen", 1999.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("microwave", "kitchen", 299.99, 45);