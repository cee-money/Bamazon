# Bamazon

Bamazon is an Amazon-like storefront built using MySQL and node.js. This is a CLI app and thus is not deployed - this is a link to a demo video below. Bamazon takes in orders from customers and depletes stock from the store's inventory (stored in a MySql database). It also has a manager view which allows for adding stock and new products to the database.

Link to video walk-through: https://drive.google.com/file/d/1lzUOhhZGlyVDBbpODcI_SuJ6x99l_aa4/view?usp=sharing


App overview:

Be sure to enter npm i into your command line prior to running the application.

One file is bamazonCustomer.js. Running this file will first display all of the items available for sale, then prompt users with two messages:

    * The first asks the ID of the product the customer would like to buy.
    * The second message asks how many units of the product they would like.

Once the customer has placed the order, bamazonCustomer.js checks if the store has enough of the product to meet the customer's request.

    * If not, it logs "Insufficient quantity!", and cancels the order.
    * If the store does have enough of the product, the customer's order gets fulfilled, meaning the stock quantities in the database get updated accordingly.

Once the stock update goes through, the customer is shown the total cost of their purchase.

A second file is bamazonManager. js. Running this files shows a list of options for the manager to choose from:

    * View Products for Sale
    * View Low Inventory
    * Add to Inventory
    * Add New Product

If a manager selects View Products for Sale, the app lists every available item: the item IDs, names, prices, and quantities.

If a manager selects View Low Inventory, then it lists all items with an inventory count lower than five units.

If a manager selects Add to Inventory, bamazon.Manager.js displays prompts that let the manager "add more" of any item currently in the store.

If a manager selects Add New Product, it allows the manager to add a completely new product to the store.


New technology implemented:
* CLI-Table NPM
* MySql NPM





