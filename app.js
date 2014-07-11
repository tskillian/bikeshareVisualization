var express = require("express");
var logfmt = require("logfmt");
var parse = require("csv-parse");
var CsvToJsonConverter = require("csvtojson").core.Converter;
var fs = require("fs");
var app = express();

var dataLoc = "./data/testData.csv"; // small subset of 2014-1st-quarter.csv to expedite testing

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {

    res.send('Hello World!');
});

app.get('/data', function(req, res) {
    var csvConverter = new CsvToJsonConverter({ constructResult: true });
    csvConverter.on("end_parsed", function (data){
       res.json(data)
    });
    fs.createReadStream(dataLoc).pipe(csvConverter);
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});