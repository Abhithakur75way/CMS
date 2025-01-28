import swaggerJsdoc from "swagger-jsdoc";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Documentation",
      version: "1.0.0",
      description: "API documentation for your application",
    },
    servers: [
      {
        url: "http://localhost:8000", // Replace with your server URL
      },
    ],
  },
  apis: ["./src/**/*.routes.ts"], // Adjust the path to match your routes files
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
