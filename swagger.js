const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger.json"; // Path to output Swagger JSON file
const endpointsFiles = ["./index.js"]; // Path to your routes

const doc = {
  info: {
    title: "My API",
    description: "A simple CRUD API",
  },
  //   tags: [
  //     {
  //       name: "users",
  //       description: "Operations related to users",
  //     },
  //     {
  //       name: "products",
  //       description: "Operations related to products",
  //     },
  //   ],
  // host: "localhost:8000", // Change this if you're using a different host
  host: "https://intern-backend-seven.vercel.app/", // Change this if you're using a different host
  schemes: ["http"],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./index"); // Your Express app
});
