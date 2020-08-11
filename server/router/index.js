const authRoutes = require("./auth.routes");

const Router = (app) => {
    app.use(`${process.env.REACT_APP_BASE_API_URL}/auth`, authRoutes);
};

module.exports = Router;