// Requiring various NPMs
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

// Preparing to connect to the bamazon database
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

// Upon connecting to the bamazon database, run the displayAllProd function
connection.connect(function(err) {
      if (err) throw err;
      // console.log(`\nconnected as id ${connection.threadId}\n`);
      displayAllProd();

}); 

// Displays product from the bamazon database in a table and runs inquirer to receive input from the customer in order to place their order
function displayAllProd() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(`\nProducts for purchase:\n`)

        var table = new Table({
            head: [`ID #`, `Item Name`, `Department`, `Price`]
          , colWidths: [7, 25, 25, 10]
        });

        for (var i = 0; i < res.length; i++) {

            table.push([res[i].id, res[i].product_name, res[i].department_name, `$${res[i].price}`]);
        }
        console.log(table.toString());
        console.log(`\n----------------------------------------------------------------------\n`);

        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "What is the ID # of the product you would like to purchase?",
                validate: function(value) {
                    if (isNaN(value)) {
                        console.log(`Please input a number`);
                        return false;
                    }
                    return true;
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
                    return true;
                }
            }
            ]).then(function(answers) {
                // console.log(answers);
                placeOrder(answers);
            });
    });
};

// Checks the bamazon database to ensure adequate stock to fill customer's order request and either cancels or places order
function placeOrder(answers) {

    console.log(`\n----------------------------------------------------------------------\n\u231B  Processing your order...`);
    var query = "SELECT id, product_name, price, stock_quantity FROM products WHERE ? ";
    
    connection.query(query, {id: answers.id}, function(err, res) {
        if (err) throw err;

        var res = res[0];

        // console.log(`Item: ${answers.id}`);
        // console.log(res.id);
        // console.log(res.stock_quantity);

        if (answers.quantity > res.stock_quantity) {
            console.log(`Insufficient stock. Your order has been canceled.`);
            orderAgain();
            return;
        } else {
            updateStock(answers);

            //if order is placed because there is sufficient stock, the stock is then decremented from the bamazon database
            function updateStock(answers) {

                var query = "UPDATE products SET ? WHERE ? ";
                var newQty = res.stock_quantity - answers.quantity;
            
                connection.query(query, [ {stock_quantity: newQty}, {id: answers.id} ], function(err) {
                      if (err) throw err;
                    //   console.log(`Updated stock.`);            
                    }
                );
            };
            console.log(`\n----------------------------------------------------------------------\nYour order for ${answers.quantity} unit(s) of the ${res.product_name} has been placed.\nYour total was $` + (res.price * answers.quantity) + `\n----------------------------------------------------------------------\n`);  
            orderAgain();
        }
    })
};



function orderAgain() {
    inquirer.prompt([
        {
            name: "order",
            type: "confirm",
            message: "\nWould you like to place another order?"
        }
        ]).then(function(answer) {
           if (answer.order) {
                displayAllProd();
           } else {
                connection.end();
           }
        });
};
