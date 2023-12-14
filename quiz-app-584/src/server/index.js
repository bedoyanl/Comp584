// Importing necessary modules for setting up a Node.js server with Express
const express = require("express"); // Express is a web application framework for Node.js
const { configure, port } = require("./config/server-config"); // Importing the server configuration from "./config/server-config"
const history = require("connect-history-api-fallback"); // Middleware for supporting HTML5 History API
const { resolve } = require("path"); // Node.js path module for working with file and directory paths

// Creating an Express instance
const instance = express();

// Configuring the Express instance with CORS, body-parser, and the API router
configure(instance);

// Defining the path to the public directory containing the UI files (e.g., Vue.js dist directory)
const publicPath = resolve(__dirname, "../../dist");

// Configuration options for serving static files
const staticConf = { maxAge: "1y", etag: false };

// Serving static files from the publicPath with specified configuration
instance.use(express.static(publicPath, staticConf));

// Using connect-history-api-fallback middleware to support HTML5 History API and handle client-side routing
instance.use("/", history());

// Starting the server and listening on the specified port
instance.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
