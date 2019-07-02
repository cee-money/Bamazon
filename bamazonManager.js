// Requiring various NPMs
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var divider = `\n----------------------------------------------------------------------\n`

// Preparing to connect to the bamazon database
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});

// Upon connecting to the bamazon database, call the userPrompt function
connection.connect(function(err) {
      if (err) throw err;
    //   console.log(`\nconnected as id ${connection.threadId}\n`);
    userPrompt();
}); 

// Prompts the user to choose what action they'd like to take and the switchcase will run the corresponding function
function userPrompt() {
    inquirer.prompt ([
        {
            name: "action",
            type: "list",
            message: "Welcome! What would you like to do:",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(function(answer) {
        switch (answer.action) {
            case "View Products for Sale":
              displayAllProd();
              break;
      
            case "View Low Inventory":
              lowInv();
              break;
      
            case "Add to Inventory":
              addInv();
              break;
      
            case "Add New Product":
              addProd();
              break;
      
            case "Exit":
              connection.end();
              break;
            }
    });
}

// Displays product from the bamazon database in a table 
function displayAllProd() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(`\nAll products:\n`)

        var table = new Table({
            head: [`ID #`, `Item Name`, `Department`, `Price`, `Stock`]
          , colWidths: [7, 25, 25, 10, 7]
        });

        for (var i = 0; i < res.length; i++) {

            table.push([res[i].id, res[i].product_name, res[i].department_name, `$${res[i].price}`, res[i].stock_quantity]);
        }
        console.log(table.toString());
        console.log(`\n----------------------------------------------------------------------\n`);
        userPrompt();
    });
};

// Displays all items whose stock has fallen below 5 units
function lowInv() {
    console.log(`\n----------------------------------------------------------------------\n`);
    connection.query("SELECT * FROM products WHERE stock_quantity < 5 ", function(err, res) {
        if (err) throw err;

        if (res.length > 0) {
            for (var i = 0; i < res.length; i++){
                console.log(`\n${res[i].product_name}`);
            }
        } else {
            console.log(`No items have low inventory at this time.\n`);
        }
        console.log(`\n----------------------------------------------------------------------\n`)
        userPrompt();
    }) 
};

// Displays all item ID's and names, takes user input of what item ID they want to add stock to, and adds stock to bamazon database for that item
function addInv() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        var table = new Table({
            head: [`ID #`, `Item Name`]
          , colWidths: [7, 25]
        });

        for (var i = 0; i < res.length; i++) {

            table.push([res[i].id, res[i].product_name,]);
        }

        console.log(table.toString());
    
        inquirer.prompt ([
            {
                name: "item",
                type: "input",
                message: "What is the ID # of the product to which you would like to add inventory?",
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
                message: "How many units would you like to add?",
                validate: function(value) {
                    if (isNaN(value)) {
                        console.log(`Please input a number`);
                        return false;
                    }
                    return true;
                }
            }

        ]).then(function(answers) {

                var query = "UPDATE products SET ? WHERE ? ";
                var newQty = parseInt(res[0].stock_quantity) + parseInt(answers.quantity);

                connection.query(query, [ {stock_quantity: newQty}, {id: answers.item} ], function(err) {
                        if (err) throw err;
                        console.log(`\n----------------------------------------------------------------------\n\nUpdated stock to ${newQty}.\n\n----------------------------------------------------------------------\n`);    
                        userPrompt();        
                });
        })
    });
};

// Collects all necessary information from user to add item to bamazon database and appends the new item as a new row in the products table
function addProd() {
    inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the product you are adding?"
      },
      {
        type: "input",
        name: "dept",
        message: "In what department does it belong?"
      },
      {
        type: "input",
        name: "price",
        message: "How much the product cost?",
      },
      {
        type: "input",
        name: "stock",
        message: "How many units of the new product are there?",
        validate: function(value) {
            if (isNaN(value)) {
                console.log(`Please input a number`);
                return false;
            }
            return true;
        }
      }
    ]).then(function(answers) {
      connection.query("INSERT INTO products SET ?",
        {
          product_name: answers.name,
          department_name: answers.dept,
          price: parseFloat(answers.price),
          stock_quantity: answers.stock
        },
        function(err) {
          console.log("Item successfully added!");
          userPrompt();
        }
      );
    });
};