import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./user/user.routes";
import formRoutes from "./form/form.routes";
import staticContentRoutes from "./content/content.routes"; // Import your static content routes
import { errorHandler } from "./common/middleware/errorhandler.middleware";
import { logger } from "./common/middleware/logger.middleware";
import { notFoundHandler } from "./common/middleware/not-found.middleware";
import { IUser } from "./user/user.dto"; // Import the IUser interface
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';

// Load environment variables
dotenv.config();

// Extend the Express Request interface globally to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Make sure 'user' is typed as IUser (without password)
    }
  }
}

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger); // Log every request

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/users", userRoutes); // User routes for authentication and user management
app.use("/api/forms", formRoutes); // Form routes for CMS form generation
app.use("/api/static-content", staticContentRoutes); // Add static content routes here

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// 404 handler for unmatched routes
app.use(notFoundHandler);
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only frontend on localhost:5173
  })
);

// Global error handler
app.use(errorHandler);

// Export app for server or testing
export default app;
