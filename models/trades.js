'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Trade;

var tradeSchema = Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  offer: { type: Schema.Types.ObjectId, ref: 'Book', unique: true },
  bids: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});



Trade = mongoose.model('Trade', tradeSchema);
module.exports = Trade;