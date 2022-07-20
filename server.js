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