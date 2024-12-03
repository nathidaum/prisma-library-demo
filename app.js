require("dotenv").config();
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// Middleware setup
app.use(express.json());

// Routes
app.use("/", require("./routes/index.routes")); // Ensure index.routes.js exports a router
app.use("/movies", require("./routes/movie.routes")); // Ensure movies.routes.js exports a router
app.use("/directors", require("./routes/director.routes")); // Ensure directors.routes.js exports a router

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;