const mysql = require('mysql');

// create the connection with database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // My MySQL User name，root is default name
  password: '', // My MySQL password
  database: 'crowdfunding_db'
});

// connect to MySQL server
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

