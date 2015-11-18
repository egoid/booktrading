'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');


var User;

var userSchema = Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});



User = mongoose.model('User', userSchema);
module.exports = User;