const mysql = require('mysql');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
	host:"localhost",
	port: 3306,
	//username
	user: "root",
	//your password
	password: "",
	database: "bamazonDB"
});

connection.connect(function(err){
	if (err) throw err;
  //console.log('connected as id: ' + connection.threadId);
  displayItems();
});

//Function that will display all items available for sale
function displayItems() {
  inquirer
    .prompt({
      name: "view",
      type: "confirm",
      message: "Would you like to view our inventory?",
    })
    .then(function(answer){
      // if the answer is "yes" then it will show all products
      if (answer.view) {
        var query = connection.query("SELECT * FROM products", function(err, res){
          if (err) throw err;
            console.log("__________________________________________________________________________________________")
            console.log("_____________________________________PRODUCTS_____________________________________________");
          for (var i = 0; i < res.length; i++) {
            // listing all of the items in each categories
            console.log("ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + " || Stock: " + res[i].stock_quantity);
            console.log("__________________________________________________________________________________________");  
          }
            console.log("\n---------START SHOPPING---------------------------------------------------------------\n");  
            startShopping();    
  
        }) 
      } 
        else {
          // if "no" then it will end the app
          console.log("Please come back later!! Bye");
          connection.end();
        }
    });
}
	

// function that prompts user to start shopping
function startShopping() {
  inquirer
    .prompt([
      	{
        name: "product_ID",
        type: "input",
        message: "What is the ID of the product you would like to buy? ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;

          	}
          		// if a number is not 1-11, it will return the following:
          		return "Please enter a valid ID";
        	}
      	}, {
        name: "how_many",
        type: "input",
        message: "How many units of the product would you like to buy? ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;

          	}
          		//if a number is not 1-20, it will return the following:
          		return "Please enter a valid amount!";
        	}
      	}
    ])
    // if store has enough product
    //if yes, store fulfills the customer's order
    .then(function(answer) {
    	var query = "SELECT * FROM products WHERE ?";
    	connection.query(query, { item_id: answer.product_ID }, function(err, res) {
    		console.log("__________________________________________________________________________________________");	
    		// not enough product, then it will "insufficient quantity"
    		if(answer.how_many > res[0].stock_quantity) {
    			console.log("\nInsufficient quantity!");
    			console.log("\nProduct: " + res[0].product_name + "\n0nly " + res[0].stock_quantity + " in stock");
    			console.log("Please come back later!");
    			console.log("__________________________________________________________________________________________");
    			console.log("__________________________________________________________________________________________");
          connection.end();

    		}
        // if there is enough product, it will tell the customer their total
        else {
          console.log("\nProduct: " + res[0].product_name);
          console.log("Price per unit: $" + res[0].price);
          var total = res[0].price * answer.how_many;
          console.log("You want " + answer.how_many + " units");
          console.log("Your total is $" + total);
          console.log("Please pay now...");
          console.log("__________________________________________________________________________________________");
          //new inventory quantity stored in a variable
          var newStock = res[0].stock_quantity - answer.how_many;
          //updating the database
          connection.query('UPDATE products SET Stock_quantity = stock_quantity - ' + answer.how_many + ' WHERE item_id = ' + answer.product_ID);
          console.log("Updated Stock Inventory" + newStock);
        }
        keepShopping();
      });
  });
} 

// var newStock = res[0].stock_quantity - answer.how_many;

// connection.query("UPDATE products SET stock_quantity = " + newStock + "WHERE item_id = " + answer.how_many, function(err, res) {
//   if (err) throw err;
//   console.log("Your order has been processed");
// });

 // // updating database
 //          connection.query("UPDATE * FROM products SET ? WHERE ?", [{ 
 //            stock_quantity: res[0].stock_quantity - answer.how_many 
 //          }, {
 //            item_id: answer.product_ID
 //            }]),

//function that promps user to keep shopping

function keepShopping() {
    inquirer
    .prompt({
      name: "more_shopping",
      type: "confirm",
      message: "Want to keep shopping?",
    })
    .then(function(answer){
      if(answer.more_shopping){
        startShopping();
      }
      else {
        console.log("Please visit us again soon!");
        console.log("Thank you for shopping at Bamazon!");
        connection.end();
      }
    });
};