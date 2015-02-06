var express = require("express");
var http = require("http");

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
