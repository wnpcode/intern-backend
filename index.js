const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const users_routes = require("./src/routes/users.js");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Test REST",
      version: "1.0.0",
    },
  },
  // apis: ["./src/routes/*.js"],
  apis: [path.join(__dirname, "/src/routes/*.js")],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, {
    customCss:
      ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
    customCssUrl: CSS_URL,
  })
);

const logger = (req, res, next) => {
  console.log(req.url);
  console.log(req.params);
  console.log(req.query);
  next();
};

mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => app.listen(8000))
  .catch((err) => console.log(Error));

// Handle connection events
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to the database");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

app.use(logger);
app.use(express.json()); // parse json body content

// routes
// app.use("/products", products_routes);
app.use("/users", users_routes);

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("SIGINT signal received: closing MongoDB connection");
  await mongoose.connection.close();
  console.log("MongoDB connection closed");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received: closing MongoDB connection");
  await mongoose.connection.close();
  console.log("MongoDB connection closed");
  process.exit(0);
});
