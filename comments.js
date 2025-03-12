// Create web server
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Set view engine to ejs
app.set('view engine', 'ejs');

// Set path to static files
app.use(express.static(path.join(__dirname, 'public')));

// Render index.ejs
app.get('/', function(req, res) {
  res.render('index');
});

// Render comments.ejs
app.get('/comments', function(req, res) {
  res.render('comments');
});

// Read comments.json and render comments.ejs
app.get('/comments', function(req, res) {
  fs.readFile('comments.json', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var obj = JSON.parse(data);
      res.render('comments', { comments: obj });
    }
  });
});

// Write comments to comments.json and render comments.ejs
app.post('/comments', urlencodedParser, function(req, res) {
  fs.readFile('comments.json', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var obj = JSON.parse(data);
      obj.push(req.body);
      var json = JSON.stringify(obj);
      fs.writeFile('comments.json', json, 'utf8', function(err) {
        if (err) {
          console.log(err);
        } else {
          res.render('comments', { comments: obj });
        }
      });
    }
  });
});

// Start server on port 8080
app.listen(8080, function() {
  console.log('Server started on http://localhost:8080');
});