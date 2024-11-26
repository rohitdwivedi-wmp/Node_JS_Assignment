const helperFunctions = require('../helperFunctions/helperFuntions')

/**
 * Update Comment
 * @param {*} req - req object
 * @param {*} res - res object
 * @returns - JSON response with success or error message
 */
const getData = (req, res) => {
    const data = helperFunctions.readData().data;  // Getting data in the form of array
    return res.status(200).json(data);
};



/**
 * Update Comment
 * @param {*} req - expected to contain id and comment both
 * @param {*} res - used to send back HTTP status and message
 * @returns - JSON response with success or error message
 */
const updateData = (req, res) => {
    try {
        const data = helperFunctions.readData().data;
        const index = data.findIndex(item => item.id == req.body.id); // index of id in data array
        if (index === -1) {
            return res.status(404).json({ message: `No comment found with id: ${req.body.id}` });
        }
        data[index].comment = req.body.comment; // updating the comment
        helperFunctions.writeData(data);
        res.status(200).json({ error: false, message: "Comment updated successfully" });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal Server Error!!" });
    }
};



/**
 * Add Comment
 * @param {*} req - expected to contain id and comment both
 * @param {*} res - used to send back HTTP status and message
 * @returns - JSON response with success or error message
 */
const addData = (req, res) => {
    try {
        let data = helperFunctions.readData().data;  // Read data from file in the form of array
        let index = data.findIndex(item => item.id === req.body.id);  // Find the index of the item with the given id
        if (index !== -1) {
            // If ID already exists, return a 409 Conflict error
            return res.status(409).json({ message: `Id already exists.` });
        }
        
        // If ID doesn't exist, push new data to the array
        data.push({ "id" : req.body.id, "comment" : req.body.comment });
        helperFunctions.writeData(data);  // Write updated data to file
        
        // Return success response
        res.status(200).json({ error: false, message: "Comment added successfully" });
    } catch (error) {
        // Catch any internal errors and send a 500 Internal Server Error response
        res.status(500).json({ error: true, message: "Server Error", error: error.message });
    }
};


/**
 * Delete Comment by Id
 * @param {*} req - expected to contain id 
 * @param {*} res - used to send back HTTP status and message
 * @returns - JSON response with success or error message
 */
const deleteData = (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ error: true, message: "Id is required!!" });
    }
    if (isNaN(req.params.id)) {
        return res.status(400).json({ error: true, message: "Id must be a number!!" });
    }
    let data = helperFunctions.readData().data; // Getting data in the form of array
    const index = data.findIndex(item => item.id == req.params.id); // index of id in data array
    if (index === -1) {
        return res.status(404).json({ message: `No comment found with id: ${req.params.id}` });
    }
    try {
        data = data.filter(item => item.id != req.params.id); // filtered out the comment of specific id
        helperFunctions.writeData(data); // writing data into the file
        res.status(200).json({ error: false, message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: true, message: "Server Error!!" });
    }
};

module.exports = {
    getData, updateData, addData, deleteData
};

