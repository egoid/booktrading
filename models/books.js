'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Book;

var bookSchema = Schema({
  title: { type: String, required: true },
  author: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' }
});



Book = mongoose.model('Book', bookSchema);
module.exports = Book;