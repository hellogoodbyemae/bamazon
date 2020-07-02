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

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  displayInventory();
});

var query = "select * from products";

function displayInventory() {
  connection.query(query, function(err, res) {
    if (err) throw err;
    else {
      console.table(res);
    }
    customerShop();
  })
}

// function updateInventory() {

// }

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
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      connection.query(query, function(err, res) {
        if (err) throw err;
        inquirer
          .prompt({
              name: "options",
              type: "list",
              message: "What would you like to do next?",
              choices: ["CONTINUE SHOPPING", "EXIT"]
          })
          .then(function(answer) {
            if (answer.options === "CONTINUE SHOPPING") {
              customerShop();
            }
            else {
              
              connection.end();
            }
          })
      });
    });
}