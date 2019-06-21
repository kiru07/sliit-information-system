const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
var routes = require('./routes');
const fileUpload = require('express-fileupload');
const PORT = 4000;

app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json()); app.use(cors()); 
app.use(fileUpload());

app.use('/public', express.static(__dirname + '/public'));
app.use((req,res,next) => { 
    res.setHeader('Access-Control-Allow-Origin','*'); 
    res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type'); 
    res.setHeader('Access-Control-Allow-Credentials',true); 
    next(); 
});

// Route all requests to the routes.js file
app.use('/api',routes);

// Connect with mongodb
mongoose.connect('mongodb://127.0.0.1:27017/sliit_information_system', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

// Backend server is lisenting to the port PORT
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});