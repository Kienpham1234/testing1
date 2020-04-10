var express = require('express');
var mongo = require('mongodb');

var app = express();
app.use(express.json());
var bodyParser = require('body-parser');
const MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/final";


// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})
//show mongodb document on localhost
app.get('/api/prof', (req, res) => {
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("final");
	  dbo.collection("prof").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log("************Prof documents***********");
		console.log(result);
		res.send(result);
		db.close();
	  });
	});
});
// get information that user type in
app.get('/process_get', function (req, res) {
    // Prepare output in JSON format
    response = {
        name:req.query.name,
        age:req.query.age,
        course:req.query.course
    };
    console.log(response);
    res.end(JSON.stringify(response));
 })
 

//insert what user type in, however, information send back to console and do not insert to Mongo data
app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
    name:req.query.name,
    age:req.query.age,
    course:req.query.course
};
   console.log(response);
   res.end(JSON.stringify(response));
})


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
