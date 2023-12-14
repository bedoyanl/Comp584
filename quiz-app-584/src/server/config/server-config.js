// Importing necessary modules for configuring a Node.js server
const cors = require("cors"); // CORS (Cross-Origin Resource Sharing) middleware for handling cross-origin HTTP requests
const bodyParser = require("body-parser"); // Body-parser middleware for parsing incoming request bodies

// Importing the router module from the "../api" directory
const api = require("../api/router");

// Defining the port on which the server will listen for incoming requests
const port = 8080;

// Function to configure an Express.js instance with CORS, body-parser, and the API router
function configure(instance) {
    // Enabling CORS to allow cross-origin requests
    instance.use(cors());

    // Using body-parser middleware to parse incoming JSON request bodies
    instance.use(bodyParser.json());

    // Mounting the API router under the "/api" endpoint
    instance.use("/api", api);
}

// Exporting an object containing the configure function and the specified port
module.exports = {
    configure,
    port,
};
