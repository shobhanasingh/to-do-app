To-Do App

This project showcases a robust backend that combines essential features like secure authentication, input validation, and clean API design

Features

RESTful API built with Express.js

MongoDB database with Mongoose for CRUD operations

JWT-based user authentication and authorization

Input validation using express-validator

Centralized error handling middleware

Organized and modular project structure

Environment variable configuration using .env file

Task filtering and sorting capabilities

Serialization of responses for cleaner API output

Installation

Clone the repository

git clone https://github.com/shobhanasingh/to-do-app.git
cd to-do-app
Install dependencies


npm install
Setup environment variables
Create a .env file in the root folder with the following variables:


PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Start the server

npm start
Usage
Register and login users

Create, read, update, and delete To-Do tasks

Filter tasks by status, date, or priority

Secure routes with JWT authentication

Technologies Used

Node.js

Express.js

MongoDB & Mongoose

JSON Web Tokens (JWT)

express-validator

dotenv

Contributing
Contributions are welcome! Please fork the repository and create a pull request for review.

