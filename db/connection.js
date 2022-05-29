const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'Starfrog@29',
        database: 'employeeTracker'
    },
    console.log('Connected to the employeeTracker database.')
);

module.exports = db;