'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var bcrypt = require('bcryptjs');
var User = require('./models/users');



var mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost/booktrading';

var mongoose = require('mongoose');
mongoose.connect(mongoUrl, function(err){
  if(err) return console.log('Error connecting to Mongodb:', err);
  console.log('Connected to MongoDB:', mongoUrl);
});

var routes = require('./routes/index');
var books = require('./routes/books');
var trades = require('./routes/trades');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));






app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: true }));
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('\nIn Strategy:')
    console.log(username, password);

    // // simplest possible:
    // if (username.match(/nicholas/) && password === "cheetah") {
    //   // All good, send a cookie
    //   return done(null, {username: username});
    // } else {
    //   // Tell the user invalid username or password
    //   return done(null, false);
    // }



    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
    
  }
));

passport.serializeUser(function(obj, done) {
  console.log('\nIn serializeUser:', obj)
  done(null, obj);
});

passport.deserializeUser(function(obj, done) {
  console.log('\nIn deserializeUser:')
  done(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());




app.use('/', routes(passport, bcrypt));
app.use('/books', books);
app.use('/trades', trades);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
