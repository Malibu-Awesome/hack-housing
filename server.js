var express = require("express");
var http = require("http");
var io = require('socket.io')(http);

//SERVER SETUP
var app = express();

app.set("port", process.env.PORT || 4000);

var server = http.createServer(app);
server.listen(app.get("port"), function () {
    console.log("Server start on:" + app.get("port"));
});
//END SERVER SETUP

//SOCKET.IO SETUP
app.get('/', function(req, res){
  res.sendfile('app/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


//ROUTES
require("./api/routes/oneRoute")(app);
require("./api/routes/geoRoute").findAddress(app);

app.use(express.static(__dirname + "/dist"));
