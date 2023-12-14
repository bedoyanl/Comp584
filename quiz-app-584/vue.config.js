// Importing the defineConfig function from the "@vue/cli-service" package
const { defineConfig } = require("@vue/cli-service");

// Importing the configure function from the server configuration file
const { configure } = require("./src/server/config/server-config");

// Exporting a configuration object using defineConfig
module.exports = defineConfig({
    // Setting transpileDependencies to true to transpile dependencies
    transpileDependencies: true,

    // Configuring the development server
    devServer: {
        // Executing onBeforeSetupMiddleware callback before setting up middleware
        onBeforeSetupMiddleware: (devServer) => {
            // Configuring the Express.js instance with middleware (CORS, body-parser, and API router)
            configure(devServer.app);
        },
    },
});
