DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INT(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
	price Decimal(10,4) NULL,
    stock_quantity INT(11) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('lotion', 'beauty', 6.25, 1200);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('make-up', 'beauty', 12.15, 170);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('shampoo', 'beauty', 9.25, 120);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('snickers', 'food', 1.25, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('chips', 'food', 4.50, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('microwave', 'kitchen', 55.55, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('espresso machine', 'kitchen', 110.25, 33);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Instinct Dog Food', 'pets', 19.25, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('toys', 'pets', 2.55, 120);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('laptop', 'Tech', 569.99, 20);	
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Xbox', 'Tech', 300.99, 13);	