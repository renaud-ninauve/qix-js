var http = require("http");
var express = require("express");
var path = require("path");
var fs = require("fs");
var morgan = require("morgan");

var app = express()

app.use(morgan("combined"));
var staticPath = path.join(__dirname, "static");
app.use(express.static(staticPath));

app.use(function(req, res, next) {
    res.status(404).end("Not Found");
});

app.listen(3000, function() {
    console.log("started on port 3000");
});

