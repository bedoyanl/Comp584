const { defineConfig } = require("@vue/cli-service");
const { configure } = require("./src/server/config/server-config");
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        onBeforeSetupMiddleware: (devServer) => {
            configure(devServer.app);
        },
    },
});
