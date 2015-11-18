'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Book Trading' });
});

router.post('/login', function(req,res){
  var user = req.body
  if (user.username === 'codinghouse@codinghouse.co' && user.password ==='werock') {
    res.send('win')
  } else {
    res.send('fail')
  }
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
