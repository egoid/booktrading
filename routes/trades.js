'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Book = require('../models/books')
var Trade = require('../models/trades')


router.post('/', function(req, res){
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

router.put('/', function(req, res){

  Trade.findById(req.body._id, function(err, trade) {
    if (err) return res.status(400).send(err);
    trade.bids.push(req.body.bid);
    trade.save();
    res.status(200).send(trade);
  })
  
});

router.delete('/', function(req, res){
  var bidId = req.body.bidId,
      ownerId = req.cookies.id,
      tradeId = req.body.tradeId;
    
  Trade.findById(tradeId, function(err, trade) {
    if (err) return res.status(400).send(err);
    var offeredId = trade.offer;

    Book.findById(offeredId, function(err, offeredBook){

      Book.findById(bidId, function(err, bidBook) {
        if (err) return res.status(400).send(err);
        var bidderId = bidBook.owner;

        //need to swap books, so we need to find the actual owner & bidder from the IDs

        User.findById(ownerId, function(err, owner){
          if (err) return res.status(400).send(err);
          User.findById(bidderId, function(err, bidder){

            // we finally have all 5 documents we need:
            // offeredBook, bidBook, owner, bidder, trade

            swap(offeredBook, bidBook, owner, bidder, trade, res);

          })
        })
      })
    })
  })
})

// first, change the owners of each book
// we need to delete offeredBook from owner, add bidBook to owner
// we need to delete bidBook from bidder, add offeredBook to bidder
// finally, we need to delete trade
function swap(offeredBook, bidBook, owner, bidder, trade, res) {
  offeredBook.owner = bidder._id;
  bidBook.owner = owner._id;

  owner.books.splice(owner.books.indexOf(offeredBook._id), 1);
  owner.books.push(bidBook._id);
  bidder.books.splice(bidder.books.indexOf(bidBook._id), 1);
  bidder.books.push(offeredBook._id);

  Trade.findByIdAndRemove(trade._id);

  res.send();
}




module.exports = router;













