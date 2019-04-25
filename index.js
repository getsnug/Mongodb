var express = require("express");
var colors = require("colors");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');

var playerSchema = mongoose.Schema({
	touch : String,
	gpa: Number,
	name: String,
	sat: Number
});


var Player = mongoose.model('Player', playerSchema);
var promise = mongoose.connect('mongodb://localhost',{
 useMongoClient: true
}, function(err){
	if(err){
		throw err;
	}else{
		console.log("Database connection successful".trap.rainbow);
	}
});

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/create', function(req, res){
	res.sendFile(__dirname + '/create.html');
});

app.get('/find', function(req, res){
	res.sendFile(__dirname + '/find.html');
});

app.get('/delete', function(req, res){
	res.sendFile(__dirname + '/delete.html');
});

app.get('/update', function(req, res){
	res.sendFile(__dirname + '/update.html');
});

app.post('/create', function(req, res){
	Player.create({touch:req.body.touch, name:req.body.name, gpa:req.body.gpa, sat:req.body.SAT}, function(err, data){
		if(err){
			throw(err);
		}
	});
	res.redirect('/');
});



app.post('/find', function(req, res){
	var query = {name:req.body.name};
  Player.find(query, function(err, data){
    if (err) throw err;
		res.send("<p>" + data + "</p>");
	});
});

app.post('/delete', function(req, res){
	var query = {name:req.body.name};
  Player.remove(query, function(err, data){
    if (err) throw err;
	});
	res.redirect('/');
});

app.post('/update', function(req, res){
	var query = {name:req.body.name};
	var replace = {touch:req.body.touch, gpa:req.body.gpa, sat:req.body.SAT}
  Player.update(query, replace, function(err, data){
    if (err) throw err;
	});
	res.redirect('/');
});

app.listen(8000);
