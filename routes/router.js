const express = require('express');
const router = express.Router();

// require middleware and api
const api = require('../controllers/controllers')
const middleware = require('../middleware/middleware')

// Get Data Route
router.get('/comments', middleware.validateFileExist, api.getData);

// Update Route with middleware that validates id and comment both are neccessary to have and also checks extra field
router.put('/update', middleware.validateFields(['id', 'comment']), middleware.validateFileExist, api.updateData)

// Add Route with middleware that validates id and comment both are neccessary to have and also checks extra field
router.post('/add', middleware.validateFields(['id', 'comment']), middleware.validateFileExist, api.addData);

// Delete Route
router.delete('/delete/:id', middleware.validateFileExist, api.deleteData);


module.exports = router;
