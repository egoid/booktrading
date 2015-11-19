'use strict';

$(document).ready(init);

function init(){

  $('#addBook').click(addBook);
  $('#bookList').on('click', '.del', remove);
  $('#bookList').on('click', '.offer', offer);
  $('#showTrades').click(showTrades);
  $('#tradesList').on('click', '.bid', showBiddable);
  $('#tradesList').on('click', '.offer', makeBid);
  $('#myListings').on('click', '.accept', acceptBid)
}

function acceptBid(){
  var bidId = $(this).siblings('.id').text();
  var tradeId = $(this).parent().parent().siblings('.id').text();

  $.ajax({
    url: '/trades',
    method: 'DELETE',
    data: {bidId: bidId, tradeId: tradeId}
  })
  .done(function(message){
    console.log(message)
    location.reload();
  })
  .fail(function(err){
    console.log('error finalizing bid', err)
  })

}

function showTrades(){
  $('#tradesList').slideToggle();
}

function showBiddable(){
  console.log('bid!');

  $(this).siblings('ul').remove();

  var $yourBooks = $('#bookList').clone().removeAttr('id');
  $yourBooks.find('.del').remove();
  $(this).after($yourBooks);
}

function makeBid(){

  var bookToOffer = $(this).siblings('.id').text();
  var tradeId = $(this).parent().parent().siblings('.id').text();

  // want to put bookToOffer in the 'bids' of the trade with tradeId

  $.ajax({
    url: '/trades',
    method: 'PUT',
    data: {bid: bookToOffer, _id: tradeId}
  })
  .done(function(message){
    console.log(message)
    location.reload();
  })
  .fail(function(err){
    console.log('error offering bid', err)
  })

}

function offer(){
  console.log('offering for trade');

  var bookToOffer = $(this).siblings('.id').text();

  $.post('/trades', {offer: bookToOffer})
  .done(function(trade){
    console.log('saved trade:', trade)
    location.reload();
  })
  .fail(function(err){
    console.log('error posting trade:', err)
  });
}

function remove(){
  // ALSO NEEDS TO DELETE ANY TRADES WITH THIS BOOK

  var idToDel = $(this).siblings('.id').text();
  $.ajax({
    url: '/books',
    method: 'DELETE',
    data: {_id: idToDel}
  })
  .done(function(message){
    console.log(message)
  })
  .fail(function(err){
    console.log(err)
  })
}

function addBook(){
  var author = $('#author').val();
  var title = $('#title').val();

  $.post('/books', {author: author, title: title})
  .done(function(book){
    var $newBook = $('<li>').text('"' + title + '" by ' + author)
    $newBook.append( $('<button>').addClass('offer').text('Offer For Trade') )
            .append( $('<button>').addClass('del').text('Delete') )
            .append( $('<span>').addClass('id').text(book._id) );
    $newBook.appendTo('#bookList');
  })
  .fail(function(err) {
    console.log(err)
  });

}