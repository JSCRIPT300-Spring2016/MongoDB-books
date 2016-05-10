var express = require('express');

var Book = require('../models/bookModel');

var router = express.Router();

router.route('/')
  .get(function (request, response) {

    var query = {
      author: request.query.author
    };


    Book.find(function (error, results) {
      if (error) {
        response.status(500).send(error);
      } else {
        response.send(results);
      }
    });
  });

router.route('/:bookId')
  .get(function (request, response) {
    var bookId = request.params.bookId;

    Book.findById(bookId, function (error, result) {
      if (error) {
        response.status(500).send(error);
      } else {
        response.send(result);
      }
    });
  });

module.exports = router;
