'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Book = require('../models/books')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Book Trading' });
});


router.get('/logout', (req, res) => {
  // req.logout();
  res.clearCookie('id');
  res.redirect('/');
});

router.post('/login', function(req,res){
  var user = req.body;
  User.find({username: user.username}, function(err, foundUser){
    if (err) return res.status(400).send(err);
    if (user.password === foundUser[0].password) {
      res.cookie('id', foundUser[0]._id.toString());
      res.redirect('profile');
    } else {
      res.send('fail');
    }
  });
})

router.get('/profile', function(req,res){
  var userId = req.cookies.id;
  User.findById(userId, function(err, foundUser){
    if (err) return res.status(400).send(err);
    res.render('profile', {user: foundUser});
  }).populate('books');
})

router.post('/register', function(req,res){
  var user  = req.body
  if (user.password === user.password2) {
    // if passwords match, add new user
    var newUser = new User();
    newUser.username = user.username;
    newUser.password = user.password;
    newUser.save();
    console.log('new user is  '+newUser);    
    res.send(newUser);
  } else {
    res.send('passwords dont match')
  }
})

router.post('/books', function(req,res){
  var userId = req.cookies.id;
  var book = new Book();
  book.title = req.body.title;
  book.author = req.body.author;
  book.save( function(err, book) {
    var bookId = book._id
    User.findById({_id: userId}, function(err, user){
      user.books.push(bookId)
      user.save();
      res.send(book);
    })
  });
});


module.exports = router;
