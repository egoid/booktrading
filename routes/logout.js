'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/users');


router.get("/logout", (req, res) => {
  // req.logout();
  res.redirect('/');
});

module.exports = router;
