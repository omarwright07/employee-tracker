const db = require('./db/connection.js');
const { promptUser } = require('./lib/employeeTracker.js');

// Connect to the Database
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    console.log('');
    // Call function to initialize app
    promptUser();
});


// db.query(`SELECT * FROM departments`, (err, rows) => {
//     console.table(rows);
//     console.log(rows);
// });

// db.query(`SELECT roles.id, roles.name, roles.salary, departments.name AS department_name FROM roles INNER JOIN departments ON roles.department_id = departments.id;`, (err, rows) => {
//     console.table(rows);
// });

// db.query(`SELECT roles.*, departments.name AS department_name FROM roles INNER JOIN departments ON roles.department_id = departments.id;`, (err, rows) => {
//     console.table(rows);
// });

// db.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.name AS role_name, employees.manager_id FROM employees INNER JOIN roles ON employees.role_id = roles.id;`, (err, rows) => {
//     console.table(rows);
// });