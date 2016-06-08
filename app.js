$(document).ready(function(){
  toDoList.init();
});

var toDoList = {
  url: "http://tiny-tiny.herokuapp.com/collections/winstonstodo",
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
      $('form ul').append(`<li>${newText.todo}</li>`);
      $(this).children('input').val('');
    }),
    //clears all the new text -- need to make it clear completed
    $('#clearButton').on('click', function (element,idx,arr) {
    location.reload();
  })
},

/* ajax functions do not work */
  createToDo: function (newText) {
    $.ajax({
      url: toDoList.url,
      method: 'POST',
      data: newText,
      success: function (data){
        console.log(" YAAY NEW TODO", data);
      },
      error: function (err){
        console.error("OH NOOOOO", err);
      }
    })
  },

  updateToDo: function () {
    $.ajax({
      url: toDoList.url + "/" + '',
      method:'PUT',
      data: newText,
      success: function (){

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
        console.log("GOT TODODS", data);
        data.forEach(function(element) {
            $('form ul').append(`<li>${element.todo}</li>`);
        })
      },
      error: function (err){
        console.error("OH NOOOOO", err);
      }
    })
  },

  deleteToDo: function () {
    $.ajax({
      url: '',
      method:'DELETE',
      success: function (){

      },
      error: function (err){
        console.error("OH NOOOOO", err);
      }
    })
  },

};
