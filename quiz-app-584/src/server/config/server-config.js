const cors = require("cors");
const bodyParser = require("body-parser");

const api = require("../api/router");

module.exports = (instance) => {
    instance.use(cors());
    instance.use(bodyParser.json());
    instance.use("/api", api);
};
