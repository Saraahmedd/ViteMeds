# Project Structure and Configuration Guide

This guide will provide an overview of the file structure and configuration variables to help you navigate and work effectively within the project.

## File Structure

### Scripts

- Contains any custom scripts like seeding db scripts with dummy data.

### Uploads

- Directory for file uploads or related functionality (e.g uploading photos).

### Constants

- Holds enums, and other constants used throughout the application.

### Routes

- Defines API endpoints and their corresponding controllers (aka handlers).

### Models

- Contains Mongoose models (aka tables) representing our application's data structure.

### Controllers

- Houses the logic for handling various API endpoints (this will be called in the routes dir see the link?).

### Email

- Stores templates for email notifications.

### config.env

- Configuration file for environment variables.

### Server.js

- Entry point of the application, where the server is started.

### App.js

- Main application file, setting up middleware and connecting routes.

### Utils

- Utility functions and classes for the application.
  - **AppError.js**: Custom error class, use its constuctor whenever there is an error you figured out, for example passwords do not match.
  - **CatchAsync.js**: Wrapper function to handle async functions and errors.
  - **EmailHandler.js**: Utility for handling emails.
  - **API Features for Mongoose**: Utility for mongoose pipeline operations like filtering, sorting, pagination, and field limiting.

## Configuration Variables

Make sure to configure the following environment variables in your `config.env` file:

- **NODE_ENV**: Set to "development" for the development environment.
- **PORT**: Port on which the server will run (e.g., 8000).
- **DATABASE**: MongoDB database connection URI.
- **DATABASE_PASSWORD**: Password for the MongoDB database.
- **JWT_SECRET**: Secret key for JWT token generation.
- **JWT_EXPIRES_IN**: JWT token expiration time (e.g., "90d" for 90 days).
- **JWT_COOKIES_EXPIRES_IN**: JWT cookie expiration time (e.g., "90").
- **EMAIL_USERNAME**: SMTP email username.
- **EMAIL_PASSWORD**: SMTP email password.
- **EMAIL_PORT**: SMTP email port.
- **EMAIL_HOST**: SMTP email host.
- **EMAIL_FROM**: Default "from" email address for outgoing emails.
- **SENDGRID_USERNAME**: SendGrid API username.
- **SENDGRID_PASSWORD**: SendGrid API password.
- **STRIPE_SECRET_KEY**: Stripe secret API key.
- **STRIPE_WEBHOOK_SECRET**: Stripe webhook secret.

## Usage Guidelines

- **Use `catchAsync` for Error Handling**: Wrap all asynchronous handlers in controllers using the `catchAsync` utility.

### It takes an arrow ASYNC function as parameter and catches any unexpected errors in that function. Also you can return errors safely inside that function, they will be caught. I suggest however to use

### next(new AppError(name,code)) when returning a new AppError, this will let the errorController middleware to handle the response for you. This way we won't have repeated try catch blocks

- **Error Handling**: When encountering errors, use `next(new AppError(message, statusCode))` to pass the error to the error handler. The error controller will handle these errors automatically. Be mindful of potential future specific error handling needs, such as JWT errors. We will need to handle them in errorController in the future.

################################ handlerFactory.js

## CRUD Operations with Handler Factory

The `handlerFactory` provides pre-built controller functions for common CRUD operations, simplifying the process of creating, reading, updating, and deleting records.

### Creating a New Example

To create a new example, use the `createExample` function from the `handlerFactory`. This function allows you to handle `POST` requests for creating new records in the database.

```javascript
const Example = require("../models/exampleModel");
const factory = require("./handlerFactory");

exports.createExample = factory.createOne(Example);
```

### Getting All Examples

Retrieve all examples from the database using the `getAllExamples` function from the `handlerFactory`. This function supports basic filtering, sorting, pagination, and field limiting.

```javascript
const Example = require("../models/exampleModel");
const factory = require("./handlerFactory");

exports.getAllExamples = factory.getAll(Example);
```

### Getting a Single Example

Retrieve a single example based on the provided ID using the `getExample` function from the `handlerFactory`.

```javascript
const Example = require("../models/exampleModel");
const factory = require("./handlerFactory");

exports.getExample = factory.getOne(Example);
```

### Updating an Example

Update an example based on the provided ID with the data from the `req.body` using the `updateExample` function from the `handlerFactory`.

```javascript
const Example = require("../models/exampleModel");
const factory = require("./handlerFactory");

exports.updateExample = factory.updateOne(Example);
```

### Deleting an Example

Delete an example based on the provided ID using the `deleteExample` function from the `handlerFactory`.

```javascript
const Example = require("../models/exampleModel");
const factory = require("./handlerFactory");

exports.deleteExample = factory.deleteOne(Example);
```

## Important Usage Guidelines

- **Usage Caution**: While the `handlerFactory` simplifies basic CRUD operations, complex operations may require additional handling. Always review and tailor the operations based on the specific use case.

- **Data Validation and DB Checks**: The Mongoose model should handle data validation and database checks (e.g., unique fields). No need to re-implement these checks, except for extreme cases.

- **Request Body Attributes**: Ensure that the attributes in the `req.body` match the attribute names in the JSON object for the model. Adjust the request body accordingly.

- **Pre-processing and Filtering**: Before using the `handlerFactory`, consider filtering out unnecessary fields from the `req.body`. Avoid using the factory blindly and customize as needed for your specific requirements.

By following these guidelines and understanding the provided `handlerFactory`, you can efficiently handle basic CRUD operations in our project. Always exercise caution and tailor the functions based on the specific needs of your application. Happy coding!

Certainly! Here's a README file that explains how to use the `APIFeatures` class and how to structure your API request URLs according to the regular expressions used in the provided methods.

---

# APIFeatures Class

The `APIFeatures` class is a utility for building query pipelines to handle API requests with functionalities like filtering, sorting, limiting fields, and pagination.

## Usage

1. **Import the `APIFeatures` class:**

   Import the `APIFeatures` class into your file where you intend to use it.

   ```javascript
   const APIFeatures = require("./path/to/APIFeatures");
   ```

2. **Instantiate the `APIFeatures` class:**

   Create a new instance of the `APIFeatures` class, passing the base query object and the request query string as parameters.

   ```javascript
   const features = new APIFeatures(Model.find(filter), req.query);
   ```

3. **Filtering:**

   Use the `filter` method to filter the query based on the request query parameters.

   - Filtering uses comparison operators: `$eq`, `$gt`, `$gte`, `$lt`, `$lte`.

   **URL Example:**

   ```
   /api/endpoint?price[gte]=1000&rating[gte]=4
   ```

4. **Sorting:**

   Utilize the `sort` method to sort the query results based on the specified sorting parameters.

   - Multiple sorting parameters can be comma-separated.

   **URL Example:**

   ```
   /api/endpoint?sort=price,-rating
   ```

5. **Limiting Fields:**

   Apply the `limitFields` method to select specific fields from the query result based on the request.

   - Specify fields to include or exclude using the `fields` parameter.

   **URL Example:**

   ```
   /api/endpoint?fields=name,price
   ```

6. **Pagination:**

   Use the `paginate` method to handle pagination, specifying the page number and the limit of results per page.

   - Defaults to page 1 and limit 100 if not specified.

   **URL Example:**

   ```
   /api/endpoint?page=2&limit=10
   ```

7. **Execute the Query:**

   After chaining the desired methods, access the modified query using `features.query`.

   ```javascript
   const doc = await features.query;
   ```

8. **Complete Example:**

   ```javascript
   let filter = {};
   if (req.params.tourId) filter = { tour: req.params.tourId };

   const features = new APIFeatures(Model.find(filter), req.query)
     .filter()
     .sort()
     .limitFields()
     .paginate();

   const doc = await features.query;
   ```

---

Feel free to adapt this README according to your project structure and specific API endpoints.

## Lastly: dont open any PR unless you tested it manually, dont request to merge untestable code. Use prettier to format your files as well, please.
