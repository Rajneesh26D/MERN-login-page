const express = require('express'); // Import express to create the server
const app = express(); // Initialize the express application
const bodyParser = require('body-parser'); // Import body-parser to parse incoming request bodies
const cors = require('cors'); // Import CORS to allow cross-origin requests
const AuthRouter = require('./Routes/AuthRouter'); // Import authentication routes
// const ProductRouter = require('./Routes/ProductRouter'); // (Commented out) Import product routes if needed in the future

require('dotenv').config(); // Load environment variables from a .env file
require('./Models/db'); // Initialize the database connection

const PORT = process.env.PORT || 8080; // Use the port from environment variables or fallback to 8080

// Test route to ensure the server is responsive
app.get('/ping', (req, res) => {
    res.send('PONG'); // Respond with 'PONG' when a GET request is made to '/ping'
});

app.use(bodyParser.json()); // Use body-parser to handle JSON request bodies
app.use(cors()); // Enable CORS for all routes

app.use('/auth', AuthRouter); // Mount the AuthRouter on the '/auth' path
// app.use('/products', ProductRouter); // (Commented out) Mount the ProductRouter on '/products' when needed

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`); // Log the port the server is running on
});
