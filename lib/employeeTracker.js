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
            console.log('=== ' + message + ' Added! ===');
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
    // const sql = `SELECT * FROM roles;`;
    const sql = `
        SELECT roles.id,
        roles.name,
        roles.salary,
        departments.name AS department
        FROM roles
        INNER JOIN departments
        ON roles.department = departments.id;
        `;
    printTable('VIEW ALL ROLES', sql);
};

// To VIEW ALL Employees
const viewEmployees = function () {
    const sql = `
        SELECT employees.id,
        employees.first_name,
        employees.last_name,
        roles.name AS role,
        departments.name AS department,
        roles.salary AS salary,
        employees.manager AS manager
        FROM employees
        LEFT JOIN roles
        ON employees.role = roles.id
        LEFT JOIN departments
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
            const sql = `INSERT INTO departments (name) VALUES (?)`;
            const params = [answer.department];
            addDataToTable('Department', sql, params);
        });
};

// Prompts questions to ADD a Role
const addRole = function () {
    inquirer.prompt(questions.addRole)
        .then(answers => {
            const sql = `SELECT * FROM departments;`;
            const params = [answers.roleName, answers.roleSalary];
            // Getting Departments from Datatable
            db.query(sql, params, (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    let departments = [];
                    rows.forEach((department) => { departments.push(department.name) });
                    // Prompt for Role's Department
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'roleDepartment',
                                message: "What is your new Role's Department?",
                                choices: departments
                            }
                        ])
                        .then((answer) => {
                            let departmentID;
                            rows.forEach((department) => {
                                if (answer.roleDepartment == department.name) {
                                    departmentID = department.id;
                                }
                            });
                            params.push(departmentID);
                            let sql = `INSERT INTO roles (name, salary, department) VALUES (?,?,?)`;
                            addDataToTable('Role', sql, params);
                        })
                }
            });

        });

};

// Prompts questions to ADD an Employee
const addEmployee = function () {
    inquirer.prompt(questions.addEmployee)
        .then(answers => {
            const sql = `
            SELECT * FROM roles;
            `;
            const params = [answers.employeeFirstName, answers.employeeLastName];
            // Getting Roles from Datatable
            db.query(sql, params, (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    let roles = []
                    rows.forEach((role) => { roles.push(role.name) });
                    // Prompt for Employee's Role
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'employeeRole',
                                message: "What is your new Employee's Role?",
                                choices: roles
                            },
                        ])
                        .then((answer) => {
                            let roleID;
                            rows.forEach((role) => {
                                if (answer.employeeRole == role.name) {
                                    roleID = role.id;
                                }
                            });
                            params.push(roleID);

                            // Getting Manager from Datatable
                            const sql = `SELECT * FROM employees;`;
                            db.query(sql, params, (err, rows) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    let managers = rows.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id }));
                                    managers.push({ name: 'N/A', value: null })
                                    // Prompt for Employee's Manager
                                    inquirer
                                        .prompt([
                                            {
                                                type: 'list',
                                                name: 'employeeManager',
                                                message: "Who is your new Employee's Manager?",
                                                choices: managers
                                            },
                                        ])
                                        .then((answer) => {
                                            params.push(answer.employeeManager);
                                            let sql = `INSERT INTO employees (first_name, last_name, role, manager) VALUES (?,?,?,?)`;
                                            addDataToTable('Employee', sql, params);
                                        });

                                };
                            });
                        });
                };
            });
        });
};


// ########################################
// UPDATE QUERIES
// ########################################

// Prompts questions to UPDATE Employee
const updateEmployee = function () {
    let sql = `
            SELECT * FROM employees;
            `;
    // Getting Employees from Datatable
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            let employees = rows.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id }));
            // Prompt for Employee's Id
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'employeeId',
                        message: "Which Employee are you Updating?",
                        choices: employees
                    }
                ])
                .then(answer => {
                    console.log(answer);
                    const params = [answer.employeeId];
                    console.log(params);
                    sql = `
                    SELECT * FROM roles;                    
                    `;
                    // Getting Roles from Datatable
                    db.query(sql, (err, rows) => {
                        if (err) {
                            console.log(err);
                        } else {
                            let roles = rows.map(({ id, name }) => ({ name: name, value: id }));
                            // Prompt for Employee's Id
                            inquirer
                                .prompt([{
                                    type: 'list',
                                    name: 'employeeRole',
                                    message: "What is your Employee's New Role?",
                                    choices: roles
                                },])
                                .then(answer => {
                                    sql = `
                                    UPDATE employees 
                                    SET role = ${answer.employeeRole}
                                    WHERE id = ?
                                    `;
                                    addDataToTable('Updated Role', sql, params);
                                })

                        }
                    });
                });
        };
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
        }
    ]
};

// ########################################
// END
// ########################################

module.exports = { promptUser };