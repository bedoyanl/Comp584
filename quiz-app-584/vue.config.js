const { defineConfig } = require("@vue/cli-service");
const conf = require("./src/server/config/server-config");
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        onBeforeSetupMiddleware: (devServer) => {
            conf(devServer.app);
        },
    },
});
