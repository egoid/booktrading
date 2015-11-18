'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Book = require('../models/books')



router.post('/', function(req,res){
  var trade = req.body;

  console.log('trade:', trade);

  res.send('trade received');

  // User.find({username: user.username}, function(err, foundUser){
  //   if (err) return res.status(400).send(err);
  //   if (user.password === foundUser[0].password) {
  //     res.cookie('id', foundUser[0]._id.toString());
  //     res.redirect('profile');
  //   } else {
  //     res.send('fail');
  //   }
  // });
})


module.exports = router;
