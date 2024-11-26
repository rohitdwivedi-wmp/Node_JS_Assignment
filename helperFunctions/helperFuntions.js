const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '../Data/Data.json');

/**
 * Reads the contents of the Data.json file and parses it into a JavaScript object.
 * If the file is missing or not in valid JSON format, it returns an error response with a proper status code.
 * 
 * @param {*} req - The request object (not used in this function).
 * @param {*} res - The response object, used for error handling and sending the response.
 * 
 * @returns {Object} - Returns either the data or an error message.
 *    - { error: false, data: <data> } on success.
 *    - { error: true, message: <message>, details: <error details> } on failure (either file read or JSON parsing error).
 */
const readData = (req, res) => {
    try {
        // Read file content
        const bufferData = fs.readFileSync(dataFilePath);
        try {
            // Parse JSON
            const data = JSON.parse(bufferData);
            return { error: false, data };
        } catch (jsonError) {
            // Handle JSON parsing errors
            return res.status(400).json({
                error: true,
                message: "Invalid JSON syntax in file",
                details: jsonError.message
            });
        }
    } catch (fsError) {
        // Handle file system errors
        return res.status(500).json({
            error: true,
            message: "Error reading file",
            details: fsError.message
        });
    }
};


/**
 * Writes the provided data to the Data.json file.
 * If an error occurs while writing, it sends a response with an appropriate status code.
 * 
 * @param {Array} data - The data that needs to be written to the file. Expected to be in an array format.
 * @param {Object} res - The response object used to send a response back to the client in case of an error.
 * 
 * @returns {void} - No return value. If an error occurs, it sends a response with a 500 Internal Server Error status.
 */
const writeData = (data, res) => {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 3));
    } catch (fsError) {
        // Send error response with a 500 status code if file write fails
        return res.status(500).json({
            error: "Error writing data to file",
            details: fsError.message
        });
    }
};

module.exports = { readData, writeData };
