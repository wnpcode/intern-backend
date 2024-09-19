const express = require("express");
const mongoose = require("mongoose");
// const products_routes = require("./src/routes/products.js");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan"); //import morgan
// const jwt = require("jsonwebtoken");

require("dotenv").config();
const app = express();

const users_routes = require("./src/routes/users.js");
const theaters_routes = require("./src/routes/theaters.js");
const auth_routes = require("./src/routes/auth.js");
const { authenticateToken } = require("./src/middlewares/authMiddleware.js");
// swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Test REST",
      description: "coba cak indra",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
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
      ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; } .swagger-ui .copy-to-clipboard {right:0;opblock-control-arrow} .opblock-control-arrow {border:none;background:none;}",
    customCssUrl: CSS_URL,
  })
);

// cors
app.use(cors());
app.use(morgan("tiny")); // log the request for debugging

// const logger = async (req, res, next) => {
//   console.log(req.url);
//   console.log(req.params);
//   console.log(req.query);
//   next();
// };
// app.use(logger);

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

app.use(express.json()); // parse json body content

// routes
// app.use("/products", products_routes);
app.use("/auth", auth_routes);
app.use("/users", authenticateToken, users_routes);
app.use("/theaters", authenticateToken, theaters_routes);

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
