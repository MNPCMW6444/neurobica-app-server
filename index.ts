var express = require("express");
var http = require("http");
var enforce = require("express-sslify");

var app = express();

app.use(enforce.HTTPS());

http.createServer(app).listen(app.get("port"), function () {
  console.log("Express server listening on port " + app.get("port"));
});
