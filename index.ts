var express = require("express");
var http = require("http");
var enforce = require("express-sslify");

var app = express();

app.use(enforce.HTTPS());

app.get("/", (req: any, res: any) => {
  res.send("Hello Brain");
});

app.listen(process.env.PORT || 6444);
