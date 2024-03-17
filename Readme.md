## README.md

### Project Overview
This API provides endpoints to perform CRUD (Create, Read, Update, Delete) operations on user data. It includes functionalities such as user registration, retrieval, update, and deletion.
 
## File Structure

- **server.js**: Entry point for the server.
- **controllers/user.controller.js**: Controller handling user-related operations.
- **models/user.model.js**: MongoDB model for user data.
- **routes/user.routes.js**: Express routes for user endpoints.
- **utils/ApiResponse.js**: Utility class for creating standardized API responses.
- **utils/ApiError.js**: Utility class for creating custom API errors.

This file structure organizes the components of the Node.js application into separate modules for better code organization and maintainability.

### Features
1. **GET api/users**: Retrieve all users.
2. **GET api/users/{userId}**: Get specific user data.
3. **POST api/users**: Create a new user record.
4. **PUT api/users/{userId}**: Update existing user data.
5. **DELETE api/users/{userId}**: Delete a user from the database.

### User Object Properties
- **id**: Unique identifier generated on the server side (string, uuid).
- **username**: User's name (string, required).
- **age**: User's age (number, required).
- **hobbies**: User's hobbies (array of strings or empty array, required).

### Environment Configuration
- The port on which the application runs is stored in a `.env` file for easy configuration.

### Bonus Points
1. Two modes of running the application:
   - Development mode using nodemon or ts-node-dev (`npm run start:dev`).
   - Production mode with a build process and bundled file execution (`npm run start:prod`).

2. Proper testing and validations are implemented for the APIs to ensure reliability and data integrity.

### Setup Instructions
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up environment variables in a `.env` file.
4. Run the application in development mode: `npm run start:dev`.
5. For production deployment, build the application and run it using `npm run start:prod`.

### Testing
- Testing scripts and procedures should be detailed here to ensure proper validation of APIs.

### Author
- subhransu sekhar mohanty

### License
This project is licensed under the ISC License.

Feel free to customize this README template to suit your specific project requirements and details.
