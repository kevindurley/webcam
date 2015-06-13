var http = require("http");
var url = require('url');
var fs = require('fs');
var path = require('path');
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.set('port', process.env.PORT || 3200);

// static content
app.use(express.static(path.join(__dirname, 'static')));

app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(bodyParser.json({limit: '50mb'}));

var server = http.createServer(app);

// Require Router
require('./config/routes.js')(app);

// Start Application
server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
