'use strict';

$(document).ready(init);

function init(){

  $('#addBook').on('click', addBook);
  $('#bookList').on('click', '.del', remove);
  $('#bookList').on('click', '.offer', offer);

}

function offer(){
  console.log('offering for trade');

  var bookToOffer = $(this).siblings('.id').text();

  $.post('/trades', {offer: bookToOffer})
  .done(function(){
    console.log('book posted for offer')
  })
}

function remove(){
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
    $('<li>').text(title + ' by ' + author).appendTo('#bookList')
  })
  .fail(function(err) {
    console.log(err)
  });

}
