var express = require('express')
var app = express();
var productdb = require('./productdb');
var route = require('./productroute');
const bodyParser = require('body-parser');

app.use(express.static(`${__dirname}/imageupload`));
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
app.use('/',route);
app.use(express.json());

var server = app.listen(3000, function() {});