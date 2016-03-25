$(function(){
  buildGrid();
  init();
})

var width  = 5;
var height = 10;
var total  = width * height


function buildGrid(){
  $("body").append("<ul class='grid'></ul>");
  for (var i = 0; i < total; i++) {
    $(".grid").append("<li></li>")
  }
}

function init(){
  var $lis = $("li"); // HTMLCollection, like an Array
  drop();
}

function drop(){
  var $lis = $("li");

  // Pick one of the top row
  var nextIndex = Math.floor(Math.random()*width); // From 0 to width
  var prevIndex;


  // Create a setInterval to run repeatedly
  var dropInterval = setInterval(function(){
    // Choose the next li
    var prevLi = $lis[prevIndex]
    var nextLi = $lis[nextIndex];
    
    // Colour that li
    if (prevLi) $(prevLi).removeClass("color");
    $(nextLi).addClass("color")

    // Assign the previous and next indexes
    prevIndex = nextIndex;
    nextIndex = nextIndex + width;

    // If it hits the bottom, then stop
    if (nextIndex > total-1)  {
      drop();
      return clearInterval(dropInterval)
    };
  }, 200)
 
}