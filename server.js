const express = require('express');
const app = express();
// const db = require('./db/connection');
// const apiRoutes = require('./routes/apiRoutes');
const PORT = process.env.PORT || 3001;
const Tracker = require('./lib/Tracker.js');

// Connect to the Database
// db.connect(err => {
//     if (err) throw err;
//     console.log('Database connected.');
//     app.listen(PORT, () => {
//         console.log(`Server running on port ${PORT}`);
//     })
// })

// Call function to initialize app
new Tracker().initializeTracker();