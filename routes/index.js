'use strict';

var express = require('express');
var router = express.Router();

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
    res.send(user);
  } else {
    res.send('passwords dont match')
  }
})


module.exports = router;
