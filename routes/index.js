const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// View All Departments
router.get('/departments', (req, res) => {
    const sql = `SELECT * FROM departments;`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
    });
});

// View All Roles
router.get('/roles', (req, res) => {
    const sql = `SELECT * FROM roles;`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
    });
});

// View All Employees
router.get('/employees', (req, res) => {
    const sql = `SELECT * FROM employees;`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
    });
});

// Add a Department
router.post('/department', ({ body }, res) => {
    const sql = `INSERT INTO departments (name) VALUES (?)`;
    const params = [body.name];

    db.query(sql, params, (err, rows) => {
        if (err) throw err;
        console.table(rows);
    });
});

// Add a Role
router.post('/role', ({ body }, res) => {
    const sql = `INSERT INTO roles (first_name, last_name, industry_connected) VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, rows) => {
        if (err) throw err;
        console.table(rows);
    });
});


// Add an Employee
router.post('/employee', ({ body }, res) => {
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, rows) => {
        if (err) throw err;
        console.table(rows);
    });
});

// Update an Employee Role
router.put('/employee/:id', (req, res) => {
    const sql = `UPDATE cemployees SET role = ? 
                 WHERE id = ?`;
    const params = [req.body.role, req.params.id];
    
    db.query(sql, params, (err, rows) => {
        if (err) throw err;
        console.table(rows);
    });
});

module.exports = router;