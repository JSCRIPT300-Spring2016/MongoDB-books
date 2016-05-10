var express = require('express');

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
  });

module.exports = router;
