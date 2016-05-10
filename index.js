var express = require('express');
var mongoose = require('mongoose');

var bookRouter = require('./routes/bookRoutes');

var db = mongoose.connect('mongodb://localhost/bookAPI');
var app = express();

app.use('/books', bookRouter);

app.listen(3000, function () {
  console.log('listening on port 3000');
});

