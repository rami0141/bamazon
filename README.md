# bamazon

Bamazon is an Amazon-like storefront build using node.js, mySQL and inquirer. The app will take in orders from customers and deplete stock from the store's inventory.

CUSTOMER VIEW
Created a MySQL Database called bamazon.
Then created a Table inside of that database called products.

The products table has each of the following columns:
*item_id (unique id for each product)
*product_name (Name of product)
*department_name
*price (cost to customer)
*stock_quantity (how much of the product is available in stores)


Populated this database with over 10 different products. 

Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. 
Include the ids, names, and prices of products for sale.

The app should then prompt users with two messages.
The first message asks them the ID of the product they would like to buy.
The second message asks how many units of the product they would like to buy.

Once the customer has placed the order, the application checks if the store has enough of the product to meet the customer's request.

If not, the app will log the phrase "Insufficient quantity!", and then prevent the order from going through.

