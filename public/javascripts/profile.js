'use strict';

$(document).ready(init);

function init(){

  $('#addBook').click(addBook);
  $('.del').click(remove)

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
