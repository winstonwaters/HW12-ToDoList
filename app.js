$(document).ready(function(){
  toDoList.init();
});

var toDoList = {
  url: "http://tiny-tiny.herokuapp.com/collections/winstonstodo",
  toDoArr: [],
  init: function() {
    toDoList.styling();
    toDoList.events();
  },
  styling: function () {
    toDoList.getToDo();
  },
  events: function () {

    // creating a new form item and saving it on page
    $('form').on('submit', function(event){
      event.preventDefault();
      var newText = {
        todo: $(this).children('input').val()
      }
      toDoList.createToDo(newText)
      $(this).children('input').val('');
    }),

    //clears all the new text -- need to make it clear completed
    $('ul').on('click', 'a', function (event){
      event.preventDefault();
        var deleteToDoId = $(this).parent().data('id');
        console.log("cleared", deleteToDoId);
        $(this).parent().remove();
        toDoList.deleteToDo(deleteToDoId);
    });

    $('body').on('focusout','li',function (event) {
      event.preventDefault();
      var updateId = $(this).data('id');
      var updatedContent = {
        todo: $(this).text(),
        _id: updateId
      };
      console.log("OUR CONTENT", updatedContent);
      toDoList.updateToDo(updatedContent);
    })


    //update a todo item
    $(document).on('dblclick', 'li', function (event){
      event.preventDefault();
      var updateId = $(this).data('id');
      $(this).text('').append('<input data-id="' +updatedId +'" name="update">');
    })

},

// AJAX getting the data from the server

  createToDo: function (newText) {
    $.ajax({
      url: toDoList.url,
      method: 'POST',
      data: newText,
      success: function (data){
        console.log(" YAAY NEW TODO", data);
        // make checkbox but returns as an empty object
        $('form ul').append(`<li data-id="${data._id}"><a href="">&#10003;</a>${data.todo}</li>`);
        toDoList.toDoArr.push(data);
      },
      error: function (err){
        console.error("keep trying", err);
      }
    })
  },

  updateToDo: function (newText) {
    $.ajax({
      url: toDoList.url + "/" + newText._id,
      method:'PUT',
      data: newText,
      success: function (data){
        console.log("I HAVE BEEN UDPATED", data);
        $edit = $('form ul').html("")
        toDoList.getToDo();
      },
      error: function (err){
        console.error("OH NOOOOO", err);
      }
    })
  },

  getToDo: function () {
    $.ajax({
      url: toDoList.url,
      method:'GET',
      success: function (data){
        $('form ul').html("")
        data.forEach(function(element) {
          console.log(element);
            $('form ul').append(`<li contenteditable="" data-id="${element._id}"><a href="">&#10003;</a>${element.todo}</li>`);
        })
      },
      error: function (err){
        console.error("OH NOOOOO", err);
      }
    })
  },

  deleteToDo: function (toDoId) {
    // find item to delete from our to do list data
    var deleteUrl = toDoList.url + '/' + toDoId;
    $.ajax({
      url: deleteUrl,
      method:'DELETE',
      success: function (){
        console.log("WE DELETED SOMETHING");
        toDoList.getToDo();
      },
      error: function (err){
        console.error("nopeeeee", err);
      }
    })
  },

};
