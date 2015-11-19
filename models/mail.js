'use strict';

var apiKey = process.env.MAILGUN
var domain = process.env.DOMAIN

var mg = require('mailgun-js')({apiKey: apiKey , domain:domain});

var User = require('./user');

var sender = 'asdf'


var mailer = {
  sendWelcome: function(user, cb){
    var data = {
      from:'',
      to:'',
      subject:'',
      text:''
    }
    mg.messages().send(data,cb);
  },
  massMessage: function(data, cb){
    User.find({}, function(err, users){
      async.each(users, function(user, asyncCb){
        mailer.sendWelcome(user, function(err,body){
          asyncCb()
        });
      }, cb);
    });
  }
};

module.exports = mailer;
