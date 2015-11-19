'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Book = require('../models/books');
var Trade = require('../models/trades');

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
    Trade.find({owner: {$ne: userId}}, function(err, tradesList){
      if (err) return res.status(400).send(err);
      Trade.find({owner: userId}, function(err, myListings){
        if (err) return res.status(400).send(err);
        res.render('profile', {user: foundUser,
                               tradesList: tradesList,
                               myListings: myListings});
      }).populate('offer bids');
    }).populate('offer');
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
    res.redirect('/');
  } else {
    res.send('passwords dont match')
  }
})


module.exports = router;
