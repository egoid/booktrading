'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Book = require('../models/books')
var Trade = require('../models/trades')

router.post('/', function(req,res){
  var userId = req.cookies.id;
  var book = new Book();
  book.title = req.body.title;
  book.author = req.body.author;
  book.owner = userId;
  book.save( function(err, book) {
    var bookId = book._id
    User.findById({_id: userId}, function(err, user){
      if (err) return res.status(400).send(err);
      user.books.push(bookId)
      user.save();
      res.status(200).send(book);
    })
  });
});

router.delete('/', function(req,res){
  console.log('req.body._id:', req.body)

  Books.findOne(req.body._id , function(err,data){
    console.log(data)
  })
  // Books.findById(req.body._id , function(err , data){
  //   console.log(data + ' this is the data')
  //   if (err) return res.status(400).send(err);
  //   res.status(200).send('successful delete');
  // })
})


module.exports = router;
