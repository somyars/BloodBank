const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db.js');
var userController = require('./controllers/userController.js');
var cors = require('cors');																																					

const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

var app = express();
app.use(bodyParser.json());
app.use(cors());
/*var corsOptions = {
  origin: 'http://localhost:4200' ,
}*/

app.use(jwt());

app.listen(3000, () => console.log('Server started at port : 3000'));

app.use('/users', userController);
