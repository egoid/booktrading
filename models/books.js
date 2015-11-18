'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Book;

var bookSchema = Schema({
  title: { type: String, required: true },
  author: String
});



Book = mongoose.model('Book', bookSchema);
module.exports = Book;