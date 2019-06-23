const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
var routes = require('./routes');
const fileUpload = require('express-fileupload');

// deployment
// require('dotenv').config()
// require('./server/db-con');
// const PORT = process.env;

const PORT =  4000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); app.use(cors());
app.use(fileUpload({ createParentPath: true }));

app.use('/public', express.static(__dirname + '/public'));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Route all requests to the routes.js file
app.use('/api', routes);

// Connect with mongodb locally
mongoose.connect('mongodb://127.0.0.1:27017/sliit_information_system', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

// var mongoClient = require("mongodb").MongoClient;
// mongoClient.connect("mongodb://sliit:G3FIrIHb3KQ34BQz7HsMw9y9skb3jey3OagHjxTNdsXAvo39KkJyFMGZKYCWzzGsIFyTTvx8PlHCSDgVlgFkqw%3D%3D@sliit.documents.azure.com:10255/?ssl=true", function (err, client) {
//   client.close();
// });

// Backend server is lisenting to the port PORT
app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});