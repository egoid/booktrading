'use strict';

function routes(passport, bcrypt) { 
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
    res.clearCookie('id');
    req.logout();
    res.redirect('/');
  });


  router.post('/login', passport.authenticate('local'), function(req,res){
    var user = req.body;
    User.find({username: user.username}, function(err, foundUser){
      if (err) return res.status(400).send(err);
      
      res.cookie('id', foundUser[0]._id.toString());
      res.redirect('profile');
      
    });
  })


  router.post('/register', function(req,res){
    if (req.body.password === req.body.password2) {
      // register user

      // hash password
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {

          // Store hash in your password DB. 
          var user = new User();
          user.username = req.body.username;
          user.password = hash;
          user.save();
          res.redirect('/?signedup');
        });
      });

    }
  })

  router.get('/profile', function(req, res){
    var userId = req.cookies.id;
    if (!userId) return res.redirect('/');

    User.findById(userId, function(err, foundUser){
      if (err) return res.status(400).send(err);
      Trade.find({owner: {$ne: userId}}, function(err, tradesList){
        if (err) return res.status(400).send(err);
        Trade.find({owner: userId}, function(err, myListings){
          if (err) return res.status(400).send(err);
          foundUser.password = null; // don't leak the password!
          res.render('profile', {user: foundUser,
                                 tradesList: tradesList,
                                 myListings: myListings});
        }).populate('offer bids');
      }).populate('offer');
    }).populate('books');
  })

  return router;
}


module.exports = routes;
