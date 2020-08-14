const authRoutes = require("./auth.routes");
const apiUrlRoutes = require("./apiUrl.routes.js");

const Router = (app) => {
    app.use(`${process.env.BASE_API_URL}/auth`, authRoutes);
    app.use(apiUrlRoutes);
};

module.exports = Router;