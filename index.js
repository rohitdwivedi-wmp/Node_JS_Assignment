const express = require('express');
const app = express();
const router = require('./routes/router');

require('dotenv').config();  // Load environment variables
const port = process.env.PORT || 8080;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Router Module for handling the route
app.use('/api',router);

// for all invalid routes
app.all('*',(req,res)=>{
    res.status(404).send("Route Not Found!!")
})


app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})


