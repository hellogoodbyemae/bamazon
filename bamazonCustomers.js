var mysql = require("mysql");
var inquirer = require("inquirer");
var consoletable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "f!d3litY",
  database: "bamazon_DB"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  displayInventory();
});

var query = "select * from products";

function displayInventory() {
  connection.query(query, function (err, res) {
    if (err) throw err;
    else {
      console.table(res);
    }
    customerShop();
  })
}

function customerShop() {
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the item you would like to purchase?"
      },
      {
        name: "amount",
        type: "input",
        message: "How many?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function (answer) {
      connection.query(query, function (err, res) {
        if (err) throw err;
        inquirer
          .prompt({
            name: "options",
            type: "list",
            message: "What would you like to do next?",
            choices: ["CONTINUE SHOPPING", "EXIT"]
          })
          .then(function (answer) {
            if (answer.options === "CONTINUE SHOPPING") {
              function updateInventory() {
                var oldQuantity = 0;
                var newQuantity = 0;
                var id;

                connection.query(
                  "SELECT products SET ? WHERE ?",
                  {
                    item_id: answers.id
                  },
                  (err, res, fields) => {
                    if (err) throw err;
                    else {
                      oldQuantity = res[0].stock_quantity;
                      newQuantity = oldQuantity - answer.amount;
                      id = answers.id;
                      if (newQuantity > -1) {
                        connection.query("UPDATE products SET ? WHERE ?"),
                          [{
                            stock_quantity: newStock
                          },
                          {
                            item_id: answers.id
                          }]
                      }
                      else {
                        console.log(res.affectedRows + " products updated!\n");
                      }
                    }

                    displayInventory();
                    customerShop();
                  }
                );
              }
              customerShop();
            }
            else {

              connection.end();
            }
          })
      });
    });

}