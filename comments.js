// create a web server
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

var comments = [];

app.get('/comments', function(req, res) {
  res.send(comments);
});

app.get('/comments/new', function(req, res) {
  res.send('<form method="post" action="/comments">' +
           '<input type="text" name="comment">' +
           '<input type="submit" value="Submit">' +
           '</form>');
});

app.post('/comments', function(req, res) {
  comments.push(req.body.comment);
  res.redirect('/comments');
});

app.listen(3000, function() {
  console.log('Server listening on port 3000');
});