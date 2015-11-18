'use strict';

$(document).ready(init);

function init(){

  $('#addBook').click(addBook)

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
