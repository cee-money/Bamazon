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
        console.log(`\nProducts for purchase:\n----------------------------------------------------------------------`)
        for (var i = 0; i < results.length; i++) {
        console.log(`ID: ${results[i].id} | Item: ${results[i].product_name} | Dept: ${results[i].department_name} | Price: $${results[i].price}`);
        }
        console.log(`----------------------------------------------------------------------\n`);

    inquirer.prompt([
        {
            name: "id",
            type: "list",
            message: "Select the product ID that you would like to purchase:",
            choices: [`ID: ${results[0].id} | Item: ${results[0].product_name}`, `ID: ${results[1].id} | Item: ${results[1].product_name}`, `ID: ${results[2].id} | Item: ${results[2].product_name}`, `ID: ${results[3].id} | Item: ${results[3].product_name}`, `ID: ${results[4].id} | Item: ${results[4].product_name}`, `ID: ${results[5].id} | Item: ${results[5].product_name}`, `ID: ${results[6].id} | Item: ${results[6].product_name}`, `ID: ${results[7].id} | Item: ${results[7].product_name}`, `ID: ${results[8].id} | Item: ${results[8].product_name}`, `ID: ${results[9].id} | Item: ${results[9].product_name}`]

        },
        {
            name: "quantity",
            type: "input",
            message: "How many units of the product would you like to purchase?",
            //validate if a number
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
    //read the stock quantity for the product they selected
    //if user input <= stock quantity, then place order and deduct stock accordingly, log price to customer which will be unit cost times the user input quantity
    //if user input > stock quantity, then log Insufficient quantity and cancel order



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