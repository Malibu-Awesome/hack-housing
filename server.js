var path = require("path");
var express = require("express");
var exphbs = require("express-handlebars");
var app = express();

// setup transparent jsx requires
require('node-jsx').install({extension: ['js']});

//SERVER SETUP

app.set("port", process.env.PORT || 4000);

app.use(".hbs", exphbs({ extname: ".hbs"}));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/templates"));


//STATIC ROUTES
app.use(express.static(__dirname + "/dist"));
//app.use(express.static(__dirname + "/app"));


//ROUTES
app.get("/", function (req, res) {
  return res.render("index", {});
});

require("./api/routes/oneRoute")(app);
require("./api/routes/geoRoute").findAddress(app);

app.listen(app.get("port"), function () {
    console.log("Server start on:" + app.get("port"));
});
