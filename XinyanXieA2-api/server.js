// Import the express module to create a web server
const express = require('express');
// Create an instance of express
const app = express();
// Define the port number on which the server will listen
const port = 3000;

// Import the API routes from the 'api_controller' module
const apiRoutes = require('./api_controller');

// Set a directory for static files (HTML, CSS, JS, etc.)
app.use(express.static('XinyanXieA2-clientside'));

// Mount the API routes with the base path '/api'
app.use('/api', apiRoutes);

// Start the server and listen on the specified port
// Print a message to the console once the server is up and running
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});