
# Node JS Assignment





## Description

This project is a Node.js RESTful API application designed to manage data stored in a local JSON file (Data.json). It provides a simple way to perform CRUD (Create, Read, Update, Delete) operations on the data through structured API endpoints. The project is built using the Express.js framework and emphasizes clean code, modular architecture, and middleware-based validation.

The core features of this project include:

**1. Data Management:** Allows adding, deleting, and validating records in the JSON file.

**2. Middleware:** Implements robust middleware for:
- Ensuring the existence of the JSON file.
- Validating the presence and data types of required fields.
- Detecting unnecessary fields in the input payload.

**3. Error Handling:** Structured responses with appropriate HTTP status codes and error messages for better debugging and client interaction.

**4. Configuration:** Uses environment variables to manage application configuration such as the server port.

**5. Scalability:** Designed to be extensible with a modular structure, making it easy to add new features.


## Features

- Perform CRUD operations on JSON data stored in Data.json.
- Middleware to validate fields, check file existence, and handle errors.
- Validation for input types (e.g., id as a number, comment as a string).
- Structured responses with proper status codes.
- Easy configuration using environment variables.


## Prerequisites

- [Node.js](https://nodejs.org/en) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later)
## Installation

### Clone the repository
```bash
  git clone https://github.com/rohitdwivedi-wmp/Node_JS_Assignment
  cd node-js-assignment
```

### Install dependencies
```bash
  npm install
```


### Start the application
```bash
  npm start
```


    
## Dependencies
The project uses the following dependencies:

- **dotenv:** Used to manage environment variables securely.
- **express:** A framework for building RESTful APIs and handling HTTP requests.
- **fs:** Provides file system operations for reading and writing data.
- **nodemon:** Automatically restarts the server during development for a smoother workflow.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

**`PORT`** 3000 - 8000 reccomended to use.


## API Reference

### Get all comments

```http
  GET /api/items
```

| Parameter  | Description|
|:------ | :--- |
|NA|Fetches all comments from the database|

![GET Comments](https://i.ibb.co/RvRwykF/Screenshot-from-2024-11-26-10-45-14.png)

### Add comment

```http
  POST /api/add
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id in body to add |
| `comment` | `string` | **Required**. Comment in body to add |

![ADD Comment](https://i.ibb.co/k9H0GNs/Screenshot-from-2024-11-26-10-47-15.png)

### Update comment
```http
  PUT /api/update
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id in body to add |
| `comment` | `string` | **Required**. Comment in body to add |

![UPDATE Comment](https://i.ibb.co/CV749Mp/Screenshot-from-2024-11-26-10-47-51.png)

### Delete comment
```http
  DELETE /api/delete/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of comment in parameter to delete |

![Delete Comment](https://i.ibb.co/k3rdr6V/Screenshot-from-2024-11-26-10-48-17.png)


## Authors

- [@Rohit Kumar Dwivedi](https://github.com/rohitdwivedi-wmp)


