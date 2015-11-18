'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Book = require('../models/books')
var Trade = require('../models/trades')


router.post('/', function(req,res){
  var trade = new Trade();
  trade.owner = req.cookies.id;
  trade.offer = req.body.offer;

  console.log('trade:', trade);

  trade.save(function(err, savedTrade){
    if (err) return res.status(400).send(err);
    res.status(200).send(savedTrade);
  })

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
