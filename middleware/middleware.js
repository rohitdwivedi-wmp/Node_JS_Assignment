const fs = require('fs'); // Importing the 'fs' module to interact with the file system
const path = require('path'); // Importing the 'path' module to handle and transform file paths

const dataFilePath = path.join(__dirname, '../Data/Data.json'); // Define the path to the data file (Data.json)


/**
 * Middleware to validate if the data file exists before proceeding.
 * This middleware checks whether the specified file exists in the file system. 
 * If the file is missing, it sends a 404 Not Found response.
 * If the file exists, it proceeds to the next middleware or route handler.
 * 
 * @param {*} req - The request object. Contains details about the HTTP request.
 * @param {*} res - The response object. Used to send the HTTP response back to the client.
 * @param {*} next - The next middleware function to pass control to if the file exists.
 * @returns - A response with status 404 if the file does not exist. If the file exists, proceeds to the next middleware.
 */
const validateFileExist = (req, res, next) => {
    // Check if the file exists at the specified path
    if (!fs.existsSync(dataFilePath)) {
        // If the file doesn't exist, return an error response with 404 status
        return res.status(404).json({ error: true, message: `File not found at path: ${dataFilePath}` });
    }
    next(); // If the file exists, continue to the next middleware or handler
};


/**
 * Middleware to validate that the required fields are present and only expected fields are included in the request body.
 * It ensures that all the fields in the `expectedFields` array are present and checks that no unexpected fields are included.
 * 
 * @param {Array} expectedFields - An array of strings representing the valid fields expected in the request body.
 * @returns {Function} A middleware function that validates the request body.
 *                     If there are missing or unexpected fields, it sends a 400 Bad Request response.
 *                     Otherwise, it calls `next()` to proceed to the next middleware or route handler.
 */
const validateFields = (expectedFields) => {
    return (req, res, next) => {
        // Check if all expected fields are present in the request body
        const missingFields = expectedFields.filter(field => !req.body.hasOwnProperty(field));

        if (missingFields.length > 0) {
            // Return a 400 error if any expected fields are missing
            return res.status(400).json({ error: true, message: `Missing fields: ${missingFields.join(', ')}` });
        }

        // Get all the field names in the request body
        const unexpectedFields = Object.keys(req.body).filter(key => !expectedFields.includes(key));
        
        // If there are unexpected fields, return a 400 Bad Request error
        if (unexpectedFields.length > 0) {
            return res.status(400).json({
                message: "Unnecessary fields in request body",
                details: `Unexpected fields: ${unexpectedFields.join(', ')}`
            });
        }

        // Validate the data types for each field
        if (typeof req.body.id !== 'number') {
            return res.status(400).json({ error: true, message: "Field 'id' must be a number" });
        }

        if (typeof req.body.comment !== 'string') {
            return res.status(400).json({ error: true, message: "Field 'comment' must be a string" });
        }

        // Proceed to the next middleware or route handler if validation passes
        next();
    };
};


// Exporting the middlewares so they can be used in the routes
module.exports = { validateFileExist, validateFields };