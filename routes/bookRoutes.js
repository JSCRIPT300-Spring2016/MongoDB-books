var express = require('express');
var bodyParser = require('body-parser');

var urlEncoded = bodyParser.urlencoded({ extend: false });

var Book = require('../models/bookModel');

var router = express.Router();

router.route('/')
  .get(function (request, response) {
    Book.find(function (error, results) {
      if (error) {
        response.status(500).send(error);
      } else {
        response.send(results);
      }
    });
  })
  .post(urlEncoded, function (request, response) {
    var book = new Book(request.body);

    book.save(function (error, book) {
      if (error) {
        response.status(500).send(error);
      } else {
        response.status(201).send(book);
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
  })
  .put(urlEncoded, function (request, response) {
    var bookId = request.params.bookId;
    var update = {
      title: request.body.title,
      author: request.body.author,
      genre: request.body.genre,
      read: request.body.read
    };
    // this could also be var update = request.body;

    Book.findByIdAndUpdate(bookId, update, function (error, affected, result) {
      if (error) {
        response.status(500).send(error);
      } else {
        // this will default to a 200 status
        response.send(result);
      }
    });
  })
  .delete(function (request, response) {
    var bookId = request.params.bookId;

    Book.findByIdAndRemove(bookId, function (error) {
      if (error) {
        response.status(500).send(error);
      } else {
        response.status(204).send('removed');
      }
    });
  });

module.exports = router;
