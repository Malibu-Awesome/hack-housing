var express = require("express");
var http = require("http");
var request = require('request');

var apiKey = 'AIzaSyA7tOZNjgHPNh5a-zL1Mo9EFIysbwUU4s4&sensor=false';

//"Request" - GET Request
var headers = {
  'User-Agent'                  : 'Super Agent/0.0.1',
  'Access-Control-Allow-Origin' : 'http://localhost:4000',
  'Content-Type'                : 'application/x-www-form-urlencoded'
};

var options = {
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyA7tOZNjgHPNh5a-zL1Mo9EFIysbwUU4s4&sensor=false',
  method: 'GET',
  headers: headers
};

request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
});

//SERVER SETUP
var app = express();

app.set("port", process.env.PORT || 4000);

var server = http.createServer(app);
server.listen(app.get("port"), function () {
    console.log("Server start on:" + app.get("port"));
});
//END SERVER SETUP

//ROUTES
require("./api/routes/oneRoute")(app);

app.use(express.static(__dirname + "/dist"));
