const mysql = require('mysql');
const inquirer = require('inquirer');

//this is given an object and the following syntax
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'lexussc400',
    database: 'employeeDB'
});

connection.connect((err) => {
    if (err) throw err;

    console.log('connected as id ' + connection.threadId);

    //add functions in here (remember to use connection.end())
    inquire();
});

function inquire() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: ["View All Employees", "View All Employees by Department", "View All Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles"]
        },
    ])
}