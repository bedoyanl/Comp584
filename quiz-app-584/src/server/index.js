const express = require("express");
const conf = require("./config/server-config");
const history = require("connect-history-api-fallback");
const { resolve } = require("path");

// Instance
const instance = express();
const { port } = conf; // Use the port from the configuration

// API
conf(instance);

// UI
const publicPath = resolve(__dirname, "../../dist");
const staticConf = { maxAge: "1y", etag: false };

instance.use(express.static(publicPath, staticConf));
instance.use("/", history());

// Start server
instance.listen(port, () => {
    console.log(`Listening on port ${port}`);
});