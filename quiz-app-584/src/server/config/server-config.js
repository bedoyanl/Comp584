const cors = require("cors");
const bodyParser = require("body-parser");

const api = require("../api/router");

const port = 8080;

function configure(instance) {
    instance.use(cors());
    instance.use(bodyParser.json());
    instance.use("/api", api);
}

module.exports = {
    configure,
    port,
};
