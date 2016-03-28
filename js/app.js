$(function(){
  buildGrid();
  init();
})

var width  = 10;
var height = 20;
var total  = width * height
var block  = document.getElementsByClassName("color");
var moves  = []

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

function checkForFullRow(){
  // Check if you have a full row in moves
  console.log(moves);
}

function drop(){
  // Get all lis
  var $lis = $("li");

  // Pick one of the top row
  var nextIndex = Math.floor(Math.random()*width); // From 0 to width
  // Choose the previous row (at the start it's undefined)
  var prevIndex;

  var colors = ['red', 'green', 'blue', 'yellow'];
  var randomColor = colors[Math.floor(Math.random() * colors.length)];

  // Create a setInterval to run repeatedly
  var dropInterval = setInterval(function(){
    // Choose the next li
    var prevLi = $lis[prevIndex]
    var nextLi = $lis[nextIndex];  
    
    // If next li has a class of `.played`, then stop and drop another
    if ($(nextLi).hasClass("played"))  {
      // Add moves to an array of moves
      moves.push(prevIndex);
      randomColor = colors[Math.floor(Math.random() * colors.length)];
      checkForFullRow()
      drop();
      return clearInterval(dropInterval)
    }

    // Colour that li
    $(nextLi)
      .addClass(randomColor)
      .addClass("played");
    
    if (prevLi) {
      $(prevLi)
      .removeClass(randomColor)
      .removeClass("played");
    }

    // Assign the previous and next indexes
    prevIndex = nextIndex;
    nextIndex = nextIndex + width;

    if (nextIndex > total-1) {
      // Add moves to an array of moves
      moves.push(prevIndex);
      checkForFullRow()
      drop();
      return clearInterval(dropInterval)
    };
  }, 50)

  document.addEventListener('keydown', function(move) {
    move.preventDefault();
    if(move.keyCode == 37) {
      //left
      nextIndex -=1;
    } else if(move.keyCode == 39) {
      //right
      nextIndex +=1;
    }
  });
}