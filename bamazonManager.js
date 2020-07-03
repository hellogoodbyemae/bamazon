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
  managementView();
});

function managementView() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Products for Sale":
        displayInventory();
        break;

      case "View Low Inventory":
        inventoryLow();
        break;

      case "Add to inventory":
        inventoryAdd();
        break;

      case "Add New Product":
        newProduct();
        break;

      case "exit":
        connection.end();
        break;
      }
    });
}

function displayInventory() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.table(res);
    managementView();
  })
}

function inventoryLow() {
  connection.query("SELECT * FROM products WHERE stock_quantity BETWEEN 1 AND 50", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.table(res);
    }
    managementView();
  })
}

// function inventoryAdd() {
//   inquirer
//     .prompt([
//       {
//         name: "item",
//         type: "list",
//         message: "What item would you like to increase inventory for?"
//       },
//       {
//         name: "stock",
//         type: "input",
//         message: "How many are you adding?",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       }
//     ])
//     .then(function(answer) {
//       connection.query(
//         "UPDATE products SET ? WHERE ?",
//         [
//           {
//             product_name: answer.item
//           },
//           {
//             stock_quantity: answer.stock
//           }
//         ],
//         function(err) {
//           if (err) throw err;
//           console.log("Your item was updated successfully!");
//           managementView();
//         }
//       );
//     });
// }

function newProduct() {
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the item you would like to add?"
      },
      {
        name: "department",
        type: "input",
        message: "What department does this item belong in?"
      },
      {
        name: "price",
        type: "input",
        message: "How much does this cost?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "stock",
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
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.item,
          department_name: answer.department,
          price: answer.price,
          stock_quantity: answer.stock
        },
        function(err) {
          if (err) throw err;
          console.log("Your item was created successfully!");
          managementView();
        }
      );
    });
}