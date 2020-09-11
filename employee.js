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
    ]).then(choice => {
        if (choice.choice === "View All Employees") {
            viewAllEmployees();
        } else if (choice.choice === "View All Employees by Department") {
            viewAllEmployeesByDepartment();
        } else if (choice.choice === "View All Employees by Manager") {
            viewAllEmployeesByManager();
        } else if (choice.choice === "Add Employee") {
            addEmployee();
        } else if (choice.choice === "Remove Employee") {
            removeEmployee();
        } else if (choice.choice === "Update Employee Role") {
            updateRole();
        } else if (choice.choice === "Update Employee Manager") {
            updateManager();
        } else if (choice.choice === "View All Roles") {
            viewAllRoles();
        }
    })
}

function viewAllEmployees() {
    const employee = "SELECT * FROM employee"
    connection.query(employee, function(err, res) {
        if (err) throw err;
        console.table(res);
        inquire();
    }) 
}

function viewAllEmployeesByDepartment() {
    const department = "SELECT * FROM department"
    connection.query(department, function(err, res) {
        if (err) throw err;
        console.table(res);
        inquire();
    })
}

function viewAllEmployeesByManager() {
    //need to assign manager ids and such before writing this function
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employees first name?",
            name: "first_name"
        },
        {
            type: "input",
            message: "What is the employees last name?",
            name: "last_name"
        },
        {
            type: "input",
            message: "What is the employees role?",
            name: "role"
        },
        {
            type: "input",
            message: "Who is the employees manager?",
            name: "manager"
        }
    ]).then(answer => {
        connection.query('INSERT INTO employee SET ?', {first_name:answer.first_name, last_name:answer.last_name, role_id:answer.role, manager_id:answer.manager}, function (err, res) {
            if (err) throw err;
            // console.table(res);
            inquire();
          });
    })
}

function removeEmployee() {
    //this will query the employee table and return the 3 parameters below
    connection.query('SELECT first_name, last_name, id FROM employee', function(err, res) {
        console.table(res);
        if (err) throw err;
        const employee = res
        const employeeArr = []
        for (var i = 0; i < employee.length; i++) {
        //this loop variable will store both the name and the id, the id is how we will capture and delete the row while the name will be used in the inquirer prompt
        const loop = {
            name:(res[i].first_name + ' ' + res[i].last_name),
            value: res[i].id
            }
        employeeArr.push(loop);
        }
        
        inquirer.prompt([{
            type: "list",
            message: "Please choose an employee to remove.",
            choices: employeeArr,
            name: "remove"
            }]).then(choice => {
                connection.query('DELETE FROM employee WHERE id = ' + choice.remove, function(err, res) {
                if (err) throw err;
                // console.table(res);
                inquire();
            })
        })
    })
}

function updateRole() {
    // connection.query('UPDATE role SET title="" WHERE department=""')
}

function updateManager() {
    // connection.query('UPDATE employee SET manager_id="" WHERE...')
}

function viewAllRoles() {
    const role = "SELECT * FROM role"
    connection.query(role, function(err, res) {
        if (err) throw err;
        console.table(res);
        inquire();
    }) 
}