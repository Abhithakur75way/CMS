Content Management System (CMS) Project

Overview

This project is a full-fledged Content Management System (CMS) designed to manage and serve static content such as images, videos, and dynamic forms. It features user authentication, role-based access control, and an intuitive user interface for managing content.

Features

User Authentication: Secure login and registration with token-based authentication.

Role-Based Access Control: Different roles (Admin, User) with specific permissions.

Static Content Management: Create, update, and delete static content including images and videos.

Form Management: Administer dynamic forms for data collection.

Rate Limiting: Prevent excessive API calls with rate-limiting middleware.

Swagger Documentation: Interactive API documentation for seamless integration.

Technologies Used

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT for Authentication

Swagger for API Documentation

Frontend

React.js

Material-UI

React-Hook-Form for Form Management

Yup for Validation

Middleware

multer: File Upload

Rate Limiter: Protect endpoints from abuse

Installation

Clone the repository:

git clone https://github.com/your-repo/cms-project.git
cd cms-project

Install dependencies:

npm install

Set up environment variables:
Create a .env file in the root directory with the following variables:

PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Run the application:

npm run dev

API Documentation

Visit the Swagger UI at http://localhost:<PORT>/api-docs for interactive API documentation.

Entity Relationship Diagram

Refer to the provided ER diagram for a visual representation of the system architecture.

Contributing

Fork the repository

Create a new branch for your feature/bugfix

Commit your changes

Open a pull request



