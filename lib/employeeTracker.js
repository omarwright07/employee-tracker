const inquirer = require('inquirer');
const db = require('../db/connection');

// Starts the app
// Prompts questions for the employeeTracker database
const promptUser = function () {
    inquirer.prompt(questions.choice)
        .then(answer => {
            switch (answer.choice) {
                case 'View All Departments':
                    viewDepartments();
                    break;
                case 'View All Roles':
                    viewRoles();
                    break;
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'Add a Department':
                    addDepartment();
                    break;
                case 'Add a Role':
                    addRole();
                    break;
                case 'Add an Employee':
                    addEmployee();
                    break;
                case 'Update an Employee Role':
                    updateEmployee();
                    break;
                default:
                    console.clear();
                    db.end();
                    return;
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

// ########################################
// TOOLS
// ########################################

const printTable = function (message, sql, params) {
    db.query(sql, params, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            console.log('');
            console.log('=== ' + message + ' ===');
            console.table(rows);
            console.log('=== ' + message + ' ===');
            console.log('');
            promptUser();
        }
    });
};

const addDataToTable = function (message, sql, params) {
    db.query(sql, params, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            console.log('');
            console.log('=== ' + message + ' Created! ===');
            console.log('');
            promptUser();
        }
    });
};


// ########################################
// VIEW ALL QUERIES -- Done for now
// ########################################


// To VIEW ALL Departments
const viewDepartments = function () {
    const sql = `SELECT * FROM departments;`;
    printTable('VIEW ALL DEPARTMENTS', sql);
};
// To VIEW ALL Role
const viewRoles = function () {
    const sql = `SELECT * FROM roles;`;
    printTable('VIEW ALL ROLES', sql);    
};

// To VIEW ALL Employees
const viewEmployees = function () {
    const sql = `
        SELECT employees.id,
        employees.first_name,
        employees.last_name,
        roles.name AS role_name,
        departments.name AS department_name,
        roles.salary AS role_salary
        FROM employees
        INNER JOIN roles
        ON employees.role = roles.id
        INNER JOIN departments
        ON roles.department = departments.id;
        `;
    printTable('VIEW ALL EMPLOYEES', sql);    
};

// ########################################
// ALL ADD QUERIES
// ########################################

// Prompts questions to ADD a Department
const addDepartment = function () {
    inquirer.prompt(questions.addDepartment)
        .then(answer => {
            console.log(answer);
            const sql = `INSERT INTO departments (name) VALUES (?)`;
            const params = [answer.department];
            addDataToTable('Department', sql, params);
        });
};

// Prompts questions to ADD a Role
const addRole = function () {
    inquirer.prompt(questions.addRole)
        .then(answers => {
            console.log(answers);
            const sql = `INSERT INTO roles (name, salary, department_id) VALUES (?,?,?)`;
            // REPLACE BELOW
            const params = [body.first_name, body.last_name, body.industry_connected];
            printTable('VIEW ALL ROLES', sql, params);
        });
    
};

// Prompts questions to ADD an Employee
const addEmployee = function () {
    inquirer.prompt(questions.addEmployee)
        .then(answers => {
            console.log(answers);
            const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
            // REPLACE BELOW
            const params = [body.first_name, body.last_name, body.industry_connected, body];
            printTable('VIEW ALL ROLES', sql, params);
        });
    
};


// ########################################
// UPDATE QUERIES
// ########################################

// Prompts questions to UPDATE Employee
const updateEmployee = function () {
    inquirer.prompt(questions.updateEmployee)
        .then(answers => {
            console.log(answers);
            const sql = `UPDATE employees SET role = ?
                 WHERE id = ?`;
            // REPLACE BELOW
            const params = [req.body.role, req.params.id];
            printTable('VIEW ALL ROLES', sql, params);
        });
};

// ########################################
// QUESTIONS
// ########################################

const questions = {
    choice: [
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Exit App'
            ]
        }
    ],
    addDepartment: [
        {
            type: 'input',
            name: 'department',
            message: "What is your new Department's Name?",
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log("Please enter a Name!");
                    return false;
                }
            }
        }
    ],
    addRole: [
        {
            type: 'input',
            name: 'roleName',
            message: "What is your new Role's Name?",
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log("Please enter a Name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: "What is your new Role's Salary?",
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log("Please enter a Salary!");
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'roleDepartment',
            message: "What is your new Role's Department?",
            choices: []
        }
    ],
    addEmployee: [
        {
            type: 'input',
            name: 'employeeFirstName',
            message: "What is your new Employee's First Name?",
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log("Please enter a Name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'employeeLastName',
            message: "What is your new Employee's Last Name?",
            validate: input => {
                if (input) {
                    return true;
                } else {
                    console.log("Please enter a Name!");
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: "What is your new Employee's Role?",
            choices: []
        },
        {
            type: 'list',
            name: 'employeeManager',
            message: "Who is your new Employee's Manager?",
            choices: []
        },
    ],
    updateEmployee: [
        {
            type: 'list',
            name: 'employeeId',
            message: "Which Employee are you Updating?",
            choices: []
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: "What is your Employee's New Role?",
            choices: []
        },
    ]
};

// ########################################
// END
// ########################################

module.exports = { promptUser };