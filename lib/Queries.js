const db = require('../db/connection');

function Queries() {
    this.printTable = function(sql, params) {
        db.query(sql, params, (err, rows) => {
            if (err) throw err;
            console.log('===');
            console.table(rows);
            console.log(`===`);
        });
    }
    // All VIEW Queries
    // View All Departments
    this.viewAllDepartments = function () {
        const sql = `SELECT * FROM departments;`;
        this.printTable(sql);
    };
    // View All Roles
    this.viewAllRoles = function () {
        const sql = `SELECT * FROM roles;`;

        db.query(sql, (err, rows) => {
            if (err) throw err;
            console.table(rows);
        });
    };
    // View All Employees
    this.viewAllEmployees = function () {
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

        db.query(sql, (err, rows) => {
            if (err) throw err;
            console.log(`====================================================================================`);
            console.table(rows);
        });
    };

    // All ADD Queries
    // Add a Department
    this.addDepartment = function () {
        const sql = `INSERT INTO departments (name) VALUES (?)`;
        // REPLACE BELOW
        const params = [body.name];

        db.query(sql, params, (err, rows) => {
            if (err) throw err;
            console.table(rows);
        });
    };
    // Add a Role
    this.addRoles = function () {
        const sql = `INSERT INTO roles (name, salary, department_id) VALUES (?,?,?)`;
        // REPLACE BELOW
        const params = [body.first_name, body.last_name, body.industry_connected];

        db.query(sql, params, (err, rows) => {
            if (err) throw err;
            console.table(rows);
        });
    };
    // Add an Employee
    this.addEmployee = function () {
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        // REPLACE BELOW
        const params = [body.first_name, body.last_name, body.industry_connected, body];

        db.query(sql, params, (err, rows) => {
            if (err) throw err;
            console.table(rows);
        });
    };
    // Update an Employee Role
    this.updateEmployee = function () {
        const sql = `UPDATE employees SET role = ? 
                 WHERE id = ?`;
        const params = [req.body.role, req.params.id];

        db.query(sql, params, (err, rows) => {
            if (err) throw err;
            console.table(rows);
        });
    };
};

















module.exports = Queries;