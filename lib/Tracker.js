const { prompts } = require('inquirer');
const inquirer = require('inquirer');
const questions = require('./questions.js');

function Tracker() {
    this.employees = [];
}

// Starts the app
// Prompts questions for the Tracker
Tracker.prototype.initializeTracker = function () {
    inquirer.prompt(questions.choice)
        .then(answer => {
            console.log(answer);
            switch (answer.choice) {
                case 'View All Departments':
                    this.viewDepartments();
                    break;
                case 'View All Roles':
                    this.viewRoles();
                    break;
                case 'View All Employees':
                    this.viewEmployees();
                    break;
                case 'Add a Department':
                    this.addDepartment();
                    break;
                case 'Add a Role':
                    this.addRole();
                    break;
                case 'Add an Employee':
                    this.addEmployee();
                    break;
                case 'Update an Employee Role':
                    this.updateEmployee();
                    break;
                default:
                    return;
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

// All View Methods
// To VIEW ALL Departments
Tracker.prototype.viewDepartments = function () {
    this.initializeTracker();
};

// To VIEW ALL Role
Tracker.prototype.viewRoles = function () {
    this.initializeTracker();
};

// To VIEW ALL Employees
Tracker.prototype.viewEmployees = function () {
    this.initializeTracker();
};

// All ADD Prompts
// Prompts questions to ADD a Department
Tracker.prototype.addDepartment = function () {
    // console.log(this.employees);
    inquirer.prompt(questions.addDepartment)
        .then(answers => {
            console.log(answers);
            this.initializeTracker();
        });
};

// Prompts questions to ADD a Role
Tracker.prototype.addRole = function () {
    inquirer.prompt(questions.addRole)
        .then(answers => {
            console.log(answers);
            this.initializeTracker();
        });
};

// Prompts questions to ADD an Employee
Tracker.prototype.addEmployee = function () {
    inquirer.prompt(questions.addEmployee)
        .then(answers => {
            console.log(answers);
            this.initializeTracker();
        });
};

// All UPDATE Prompts
// Prompts questions to UPDATE Employee
Tracker.prototype.updateEmployee = function () {
    inquirer.prompt(questions.updateEmployee)
        .then(answers => {
            console.log(answers);
            this.initializeTracker();
        });
};

module.exports = Tracker;