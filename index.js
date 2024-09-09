const express = require("express");
const mongoose = require("mongoose");
const app = express();
const products = require("./data.js");
const products_routes = require("./routes/products.js");
const users_routes = require("./routes/users.js");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
// const swaggerFile = require("./swagger.json"); // Your generated Swagger JSON
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Title",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

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
