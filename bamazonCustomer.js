var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var divider = `\n----------------------------------------------------------------------\n`


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
        console.log(`\nProducts for purchase:\n`)

        var table = new Table({
            head: [`ID #`, `Item Name`, `Department`, `Price`]
          , colWidths: [7, 25, 25, 10]
        });

        for (var i = 0; i < results.length; i++) {

            table.push(
                [results[i].id, results[i].product_name, results[i].department_name, `$${results[i].price}`]
            );
        }
        console.log(table.toString());
        console.log(divider);

        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "What is the ID # of the product you would like to purchase:",
                validate: function(value) {
                    if (isNaN(value)) {
                        console.log(`Please input a number`);
                        return false;
                    }
                    return true
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "How many units of that product would you like?",
                validate: function(value) {
                    if (isNaN(value)) {
                        console.log(`Please input a number`);
                        return false;
                    }
                    return true
                }
            }
            ]).then(function(answers) {
                // console.log(answers);
                placeOrder(answers);
            });
    });
};

function placeOrder(answers) {

    console.log(`${divider}\u231B  Processing your order... \n`);
    var query = "SELECT id, product_name, price, stock_quantity FROM products WHERE ? ";
    
    connection.query(query, {id: answers.id}, function(err, res) {
        if (err) throw err;

        var res = res[0];

        // console.log(`Item: ${answers.id}`);
        // console.log(res.id);
        // console.log(res.stock_quantity);

        if (answers.quantity > res.stock_quantity) {
            console.log(`Insufficient stock. Your order has been canceled.`);
            return;
        } else {
            updateStock(answers);
            console.log(`Your order for ${answers.quantity} unit(s) of ${res.product_name} has been placed.\nYour total was $` + (res.price * answers.quantity));  
        }
    })
};

function updateStock(answers) {
    
    connection.query("UPDATE products SET ? WHERE ?",
        [ { stock_quantity: stock_quantity - answers.quantity }, { id: answers.id } ],
        function(error) {
          if (error) throw err;
      
          console.log(res.stock_quantity)            
        }
    );
};


    


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
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store //
