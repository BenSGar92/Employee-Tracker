const mysql = require('mysql');
const inquirer = require('inquirer');

//this is given an object and the following syntax
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
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
//this one is finished----------------------------------------
function viewAllEmployees() {
    const stringQuery = "SELECT first_name, last_name, role.title, role.salary, department.department FROM employee INNER JOIN role ON employee.role_id = role.title_id INNER JOIN department ON employee.department_id = department.id";
    connection.query(stringQuery, function(err, res) {
        if (err) throw err;
        else console.table(res);
        inquire();
    })
}
//this one is finished------------------------------------------
function viewAllEmployeesByDepartment() {
    inquirer.prompt([
        {
            type: "list",
            message: "What department would you like to view?",
            name: "department",
            choices: ["Sales", "Engineering", "Finance", "Legal"]
        }
    ]).then(answer => {
        if (answer.department === "Sales") {
            connection.query('SELECT first_name, last_name, department.department FROM employee INNER JOIN department ON employee.department_id = department.id WHERE department.department = "Sales"', function(err, res) {
                if (err) throw err;
                console.table(res);
                inquire();
            })
        }
        else if (answer.department === "Engineering") {
            connection.query('SELECT first_name, last_name, department.department FROM employee INNER JOIN department ON employee.department_id = department.id WHERE department.department = "Engineering"', function(err, res) {
                if (err) throw err;
                console.table(res);
                inquire();
            })
        }
        else if (answer.department === "Finance") {
            connection.query('SELECT first_name, last_name, department.department FROM employee INNER JOIN department ON employee.department_id = department.id WHERE department.department = "Finance"', function(err, res) {
                if (err) throw err;
                console.table(res);
                inquire();
            })
        }
        else if (answer.department === "Legal") {
            connection.query('SELECT first_name, last_name, department.department FROM employee INNER JOIN department ON employee.department_id = department.id WHERE department.department = "Legal"', function(err, res) {
                if (err) throw err;
                console.table(res);
                inquire();
            })
        }     
    })
}

function viewAllEmployeesByManager() {
    //need to assign manager ids and such before writing this function
}


//This add employee function is finished except for adding a manager
//for the list prompts I added an object into the choices so it will save the choice to a number which is technically the id's for connecting the tables
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
            type: "list",
            message: "What is the employees role?",
            name: "role",
            choices: [
                {
                    name: ["Sales Associate"],
                    value: ["2"]
                },
                {
                    name: ["Software Engineer"],
                    value: ["4"]
                },
                {
                    name: ["Accountant"],
                    value: ["5"]
                },
                {
                    name: ["Lawyer"],
                    value: ["7"]
                }
            ]
        },
        {
            type: "list",
            message: "What is the employees role?",
            name: "department",
            choices: [
                {
                    name: ["Sales"],
                    value: ["1"]
                },
                {
                    name: ["Engineer"],
                    value: ["2"]
                },
                {
                    name: ["Finance"],
                    value: ["3"]
                },
                {
                    name: ["Legal"],
                    value: ["4"]
                }
            ]
        },
        {
            type: "input",
            message: "Who is the employees manager?",
            name: "manager"
        }
    ]).then(answer => {
        connection.query('INSERT INTO employee SET ?', {first_name:answer.first_name, last_name:answer.last_name, role_id:answer.role, department_id:answer.department, manager_id:answer.manager}, function (err, res) {
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
                else console.log("Employee Successfully Removed!");
                inquire();
            })
        })
    })
}

function updateRole() {
    // connection.query('SELECT first_name, last_name, id FROM employee', function(err, res) {
    //     console.table(res);
    //     if (err) throw err;
    //     const employee = res
    //     const employeeArr = []
    //     for (var i = 0; i < employee.length; i++) {
    //     //this loop variable will store both the name and the id, the id is how we will capture and delete the row while the name will be used in the inquirer prompt
    //     const loop = {
    //         name:(res[i].first_name + ' ' + res[i].last_name),
    //         value: res[i].id
    //         }
    //     employeeArr.push(loop);
    //     }
        
    //     inquirer.prompt([{
    //         type: "list",
    //         message: "Please choose an employee to update.",
    //         choices: employeeArr,
    //         name: "update"
    //         }]).then(choice => {
    //             //I need to figure out what to do with my role_id to then be able to change roles for employees
    //             //then I will have another inquirer prompt to let the user choose which role to be added to the employee
    //             connection.query('UPDATE employee SET role="" WHERE id = ' + choice.update, function(err, res) {
    //             if (err) throw err;
    //             else console.log("Employee Successfully Updated!");
    //             inquire();
    //         })
    //     })
    // })
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