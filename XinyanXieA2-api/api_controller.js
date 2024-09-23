// Import Express and create a router instance
const express = require('express');
const router = express.Router();
// Import the database connection
const db = require('./crowdfunding_db');

// Middleware to enable Cross-Origin Requests (CORS)
router.use(function(req, res, next) {
  // Allow requests from any origin
  res.header("Access-Control-Allow-Origin", "*");
  // Define which headers are allowed in requests
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // Proceed to the next middleware function
  next();
});

// Endpoint to get all active fundraisers including their categories
router.get('/fundraisers/active', (req, res) => {
  // SQL query to select active fundraisers and their category names
  const sql = 'SELECT F.*, C.NAME AS CATEGORY_NAME FROM FUNDRAISER F INNER JOIN CATEGORY C ON F.CATEGORY_ID = C.CATEGORY_ID WHERE F.IS_ACTIVE = 1';
  // Execute the query
  db.query(sql, (err, result) => {
    // Handle any errors, send a server error response
    if (err) res.status(500).send('Server error');
    // Send the result as JSON
    res.json(result);
  });
});

// Endpoint to get all categories
router.get('/categories', (req, res) => {
  // SQL query to select everything from the CATEGORY table
  const sql = 'SELECT * FROM CATEGORY';
  // Execute the query
  db.query(sql, (err, result) => {
    // Handle any errors, send a server error response
    if (err) res.status(500).send('Server error');
    console.log(result);
    // Send the result as JSON
    res.json(result);
  });
});

// Endpoint to search for active fundraisers with optional filters (city, organizer, categoryId)
router.get('/fundraisers/search', (req, res) => {
  // Destructure query parameters
  const { city, organizer, categoryId } = req.query;
  // Base SQL query
  let sql = 'SELECT F.*, C.NAME AS CATEGORY_NAME FROM FUNDRAISER F INNER JOIN CATEGORY C ON F.CATEGORY_ID = C.CATEGORY_ID WHERE F.IS_ACTIVE = 1';
  
  // Array to hold any conditions for the WHERE clause
  const conditions = [];
  // Add conditions based on the presence of query parameters
  if (city) conditions.push(`F.CITY = '${city}'`);
  if (organizer) conditions.push(`F.ORGANIZER = '${organizer}'`);
  if (categoryId) conditions.push(`F.CATEGORY_ID = ${categoryId}`);

  // If there are any conditions, append them to the SQL query
  if (conditions.length > 0) {
    sql += ' AND ' + conditions.join(' AND ');
  }

  // Execute the query
  db.query(sql, (err, result) => {
    // Handle any errors, send a server error response
    if (err) res.status(500).send('Server error');
    res.json(result);
  });
});

// Endpoint to get detailed information about a specific fundraiser by ID
router.get('/fundraisers/:id', (req, res) => {
  // Extract the ID from the request parameters
  const { id } = req.params;
  // SQL query to select a fundraiser by its ID including its category name
  const sql = 'SELECT F.*, C.NAME AS CATEGORY_NAME FROM FUNDRAISER F INNER JOIN CATEGORY C ON F.CATEGORY_ID = C.CATEGORY_ID WHERE F.FUNDRAISE_ID = ?';
  // Execute the query with the provided ID
  db.query(sql, [id], (err, result) => {
    // Handle any errors, send a server error response
    if (err) res.status(500).send('Server error');
    // If a fundraiser is found, send it as JSON; otherwise, send a not found response
    else if (result.length > 0) res.json(result[0]);
    else res.status(404).send('Fundraiser not found');
  });
});

// Export the router to be used in other parts of the application
module.exports = router;