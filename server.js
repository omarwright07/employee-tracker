const express = require('express');
const app = express();
const db = require('./db/connection.js');
const apiRoutes = require('./routes/index.js');

const PORT = process.env.PORT || 3001;
const Tracker = require('./lib/Tracker.js');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Connect to the Database
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
})

db.query(`SELECT * FROM departments`, (err, rows) => {
    console.table(rows);
});

db.query(`SELECT roles.id, roles.name, roles.salary, departments.name AS department_name FROM roles INNER JOIN departments ON roles.department_id = departments.id;`, (err, rows) => {
    console.table(rows);
});

db.query(`SELECT roles.*, departments.name AS department_name FROM roles INNER JOIN departments ON roles.department_id = departments.id;`, (err, rows) => {
    console.table(rows);
});

db.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.name AS role_name, employees.manager_id FROM employees INNER JOIN roles ON employees.role_id = roles.id;`, (err, rows) => {
    console.table(rows);
});

// Call function to initialize app
// new Tracker().initializeTracker();