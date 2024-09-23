// Import the mysql module to interact with MySQL database
const mysql = require('mysql');
// Import the database configuration details from db_detail.js file
const dbConfig = require('./db_detail');

// Create a connection to the database using the configuration details
const db = mysql.createConnection({
  host: dbConfig.host, 
  user: dbConfig.user, 
  password: dbConfig.password,
  database: dbConfig.database 
});

// Connect to the database, and handle any errors that occur
db.connect(err => {
  if (err) {
    // If an error occurs, log it to the console and return to stop further execution
    return console.error('error: ' + err.message);
  }
  // If the connection is successful, log a confirmation message
  console.log('Connected to the MySQL server.');
});

// Export the database connection so it can be used in other parts of the application
module.exports = db;