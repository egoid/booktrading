'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Book Trading' });
});

router.post('/login', function(req,res){
  var user = req.body;
  User.find({username: user.username}, function(err, foundUser){
    if (err) return res.status(400).send(err);
    if (user.password === foundUser[0].password) {
      res.send('logged in as ' + foundUser[0].username)
    } else {
      res.send('fail')
    }
  });
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


module.exports = router;
