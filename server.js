var express = require('express');
var app = express();
var fs = require("fs");

// List Movie

app.get('/listMovies', function (req, res) {
   fs.readFile( __dirname + "/" + "movies.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

// Add Movie

var movie = {
    "movie6" : {
        "title" : "Weathering With You",
        "director" : "Makoto Shinkai",
        "genre" : "Animation",
        "link": "https://www.imdb.com/title/tt9426210/",
        "id": 6
    }
 }
 
 app.post('/addMovie', function (req, res) {
   // First read existing movies.
   fs.readFile( __dirname + "/" + "movies.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      data["movie6"] = movie["movie6"];
      console.log( data );
      res.end( JSON.stringify(data));
   });
})

// Delete Movie

var id = 2;

app.delete('/deleteMovie', function (req, res) {
   // First read existing movies.
   fs.readFile( __dirname + "/" + "movies.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data["movie" + 2];
       
      console.log( data );
      res.end( JSON.stringify(data));
   });
})

// Show Detail

app.get('/:id', function (req, res) {
   // First read existing movies.
   fs.readFile( __dirname + "/" + "movies.json", 'utf8', function (err, data) {
      var movies = JSON.parse( data );
      var movie = movies["movie" + req.params.id] 
      console.log( movie );
      res.end( JSON.stringify(movie));
   });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})