DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR (50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);

-- Create a MySQL Database called bamazon.
-- Then create a Table inside of that database called products.
-- The products table should have each of the following columns:

--     item_id (unique id for each product)
--     product_name (Name of product)
--     department_name
--     price (cost to customer)
--     stock_quantity (how much of the product is available in stores)


-- Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).


