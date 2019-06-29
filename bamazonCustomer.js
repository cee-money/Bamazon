// Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
// The app should then prompt users with two messages.

// The first should ask them the ID of the product they would like to buy.

// The second message should ask how many units of the product they would like to buy.

// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

// However, if your store does have enough of the product, you should fulfill the customer's order.
//     This means updating the SQL database to reflect the remaining quantity.
//     Once the update goes through, show the customer the total cost of their purchase.

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
      if (err) throw err;
      // console.log(`\nconnected as id ${connection.threadId}\n`);
      displayAllProd();

    }); 

function displayAllProd() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
        console.log(`ID: ${results[i].id} | Item: ${results[i].product_name} | Dept: ${results[i].department_name} | Price: ${results[i].price}`);
        }
        console.log("-----------------------------------");

    inquirer.prompt([
        {
            name: "id",
            type: "list",
            message: "Select the product ID that you would like to purchase?",
            choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            name: "quantity",
            type: "input",
            message: "How many units of the product would you like to purchase?",
        }
        ]).then(function(answers) {
            console.log(answers);
            // placeOrder(answers.id, answers.quantity);
        });
    });

}
  


    // function placeOrder(id, qty) {

    //     console.log("Processing your order \n");
    //     var query = connection.query(
    //         "INSERT INTO greatbay SET ?",
    //         {
    //             category: category,
    //             name: name,
    //             bid: bid
    //         },
    //         function(err, res){
    //             if(err) throw err;
    //             console.log(`\n${res.affectedRows} Your order has been placed!\n`);
    //         }
    //     );
    //     console.log(query.sql);
    // };



// ----------------------------------------------------

// Challenge #2: Manager View (Next Level)

// Create a new Node application called bamazonManager.js. Running this application will:


// List a set of menu options:
    // View Products for Sale
    // View Low Inventory
    // Add to Inventory
    // Add New Product
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.